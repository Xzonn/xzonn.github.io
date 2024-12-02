---
date: 2023-11-06 22:05
head_image: e7fc8fe18df5ee4f638996a6df6e67ae.webp
info: 自力更生。
last_modified_at: 2024-12-02 21:42
links: 
  - - https://github.com/Xzonn/JellyfinPluginDouban
    - JellyfinPluginDouban
  - - https://kk.sb/2023/use-jellyfin-to-organize-anime-library.htm
    - 使用 Jellyfin 搭建二次元媒体库
references: 
  - - https://github.com/caryyu/jellyfin-plugin-opendouban
    - jellyfin-plugin-opendouban
  - - https://github.com/kookxiang/jellyfin-plugin-bangumi
    - jellyfin-plugin-bangumi
tags: 作品发布
title: Jellyfin 豆瓣元数据插件
---
[电脑组装了半年了]({% link _posts/2023-05-28-DIY-My-Computer.md %})，硬盘里也存了不少番剧、日剧和电影，所以我打算整理一下，搭个媒体库。原本是想用Emby，但是这玩意稍微搞点啥操作都要会员，搞不懂了，又不用你家服务器还要开会员？后来发现Emby原来是开源的，后来闭源了，而[Jellyfin](https://jellyfin.org/)就是从Emby最后一个开源版本演化过来的。开源软件，好！闭源软件，不好！

不过Jellyfin只是个媒体库平台，视频还是需要自己提供，并且需要对视频按照文件夹分类。分好类之后还需要想办法收集元数据，这样才能在Jellyfin里看到漂亮的封面和简介。Jellyfin官方提供了一个[TMDB](https://www.themoviedb.org/)网站的元数据插件，但因为众所周知的原因不太好用。也有人开发了用于豆瓣的元数据插件[jellyfin-plugin-opendouban](https://github.com/caryyu/jellyfin-plugin-opendouban)，我试了一下还不错，不过因为要起一个Docker，稍微有些麻烦。于是我参考了这个插件以及bgm.tv的元数据插件[jellyfin-plugin-bangumi](https://github.com/kookxiang/jellyfin-plugin-bangumi)，自己写了一个[豆瓣元数据](https://github.com/Xzonn/JellyfinPluginDouban)插件出来。

## 功能和特性
相较于[jellyfin-plugin-opendouban](https://github.com/caryyu/jellyfin-plugin-opendouban)，本插件增加了一些功能和特性以增强体验：

- 无需额外运行Docker容器，对Windows用户更友好。
- 搜索时根据“电影”或“电视剧”分类进行排序，避免关联到不恰当的条目。例如，当前（2023年11月6日）直接[搜索《名侦探柯南》](https://www.douban.com/search?cat=1002&q=%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97)得到的第一条结果是电影《名侦探柯南 黑铁的鱼影》而不是动画《名侦探柯南》，这可能是考虑到了最新作电影更有人气而将搜索顺位提前，但是对于收集元数据来说很不方便。而进行排序后，如果指定视频类型为“节目”，则会将分类为“电视剧”的条目排在前面，就可以得到正确的结果。
- 对元数据中标题的处理更加准确。当影视的译名中存在空格时，原插件无法准确识别原名和译名的分割，而本插件通过其他标签辅助判断，能够推断出准确的原名和译名。
- 使用内置Api和[AnitomySharp](https://github.com/chu-shen/AnitomySharp)根据文件名判断视频标题，搜索结果更加准确。
- 增加了对单集剧集的元数据的支持。但据我个人的使用经验，豆瓣的单集剧集的条目内容良莠不齐，有些集数的介绍甚至是对剧情的吐槽，所以请自行选择是否开启。
- 支持访问速率控制，并且内置了缓存机制，避免频繁访问豆瓣服务器导致被封禁。

{% include figure.html src="7fd1e025c4f1502aff165f0ca0373310.jpg" alt="获取元数据后的效果" %}

## 安装方式
<div class="alert alert-success" markdown="1" style="font-size: 120%;">
**注意**：Jellyfin 10.9.x版本和10.10.x版本的插件互相不兼容。对于Jellyfin 10.9.11版本，请使用本插件的2.x版本；对于Jellyfin 10.10.0及以上版本，请使用本插件的3.x版本。
</div>

### 插件库
- 打开控制台，选择`插件`→`存储库`→`添加`。
- 在`存储库 URL`处填入：[`https://xzonn.top/JellyfinPluginDouban/manifest.json`](https://xzonn.top/JellyfinPluginDouban/manifest.json)。
- 在插件目录中找到Douban插件，选择安装。
- 重启Jellyfin。

### 手动安装
- 下载插件压缩包，将dll文件解压至 `<Jellyfin 数据目录>/Plugins/Douban`。
- 重启Jellyfin。

## 已知问题
### 关于速率限制
由于豆瓣目前已经没有公开的api，所有请求均基于直接获取相关网页，过快的访问速率可能会被视为恶意爬取软件而被封禁。为了尽可能避免被封禁，请尝试调整设置选项：

1. 增加每两次请求之间的时间间隔。默认设置为2秒。
2. 填入Cookie。请使用浏览器打开[豆瓣电影](https://movie.douban.com/)并登录，然后按<kbd>F12</kbd>打开控制台，选择`Network`，刷新页面，选择`movie.douban.com`，在右侧的`Headers`中找到`Cookie`，复制其内容并填入设置选项中。

此外，在不带Referer获取豆瓣的图片时会被限速至10KB/s左右，这可能会导致获取元数据时超时，部分剧集无法正常显示。本插件默认设置中取消了“在影视页面获取演职员照片”的勾选，这可以防止Jellyfin在获取影视元数据时大量获取演职员的图片导致超时。

速率限制可以通过搭建反代来回避，插件自带了一个反向代理，可在设置选项中修改“豆瓣图片服务器”使用。例如，如果服务器地址为`http://localhost:8096/`，则本插件的反代地址为`http://localhost:8096/Plugins/Douban/Image?url=`（注意最后有一个等号 `=`）。

也可以自行搭建反代，以下是一个简单的nginx本地搭建反代的配置文件示范：

``` nginx
server {
  listen 80;
  listen [::]:80;
  charset utf8;
  server_name doubanio.localhost;
  location / {
    proxy_pass https://img2.doubanio.com;
    proxy_set_header Host img2.doubanio.com; 
    proxy_set_header Referer https://movie.douban.com/;
  }
}
```

### 部分影视无数据
豆瓣限制了部分影视仅在登录状态下可见（[例](https://movie.douban.com/subject/26752722/)），这可能导致部分影视无法获取到元数据。如果遇到这种情况，请登录并填入Cookie（参见[上一步](#关于速率限制)），或者手动填写豆瓣ID。

### 季的内容为空
由于Jellyfin自身的缺陷，如果将视频文件直接存放在一级子目录下（例如`/（根目录）/剧名/[XXSub] Bangumi Name - 01.mp4`），Jellyfin会自动生成一个季，导致插件的解析出现错误。3.3.1版本已尝试修复了此问题，但仍可能存在问题。建议将视频文件存放在季的子目录下（例如`/（根目录）/剧名/第1季/[XXSub] Bangumi Name - 01.mp4`，[参考资料](https://www.himiku.com/archives/deploy-a-more-comfortable-animation-library-with-jellyfin-and-bangumi.html)）。

## 更新日志
[见此](https://github.com/Xzonn/JellyfinPluginDouban/blob/master/ChangeLog.md)。

## 写在最后
感谢两个插件的作者对本插件的启发。