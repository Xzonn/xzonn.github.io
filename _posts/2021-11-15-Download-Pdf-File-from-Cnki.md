---
class: auto-numbering
date: 2021-11-15 16:14
head_image: 5ce33e735d637decf48b2cb2c2637f54.png
info: 让浏览器访问硕博论文时自动跳转到中国知网“海外版”。
last_modified_at: 2023-06-16 22:59
logs: 
- 2022-03-26：修复正则表达式匹配不全的问题。
tags: 技术指南
title: 关于我在中国知网下载硕博论文pdf格式文件这件事
wechat_link: https://mp.weixin.qq.com/s/w8KTRrs5akWCQ8nCWnreIg
---
<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：由于网站格式更新，方法已失效。本文仅做留档用。</p></div>

**2023-06-02更新**：目前知网“海外版”屏蔽了中国大陆的IP访问，并且中国大陆的高校无法使用机构登录。但是目前中国大陆版本的知网已经开始提供PDF下载链接。

## 前言
众所周知，中国知网（CNKI）为了推广自家的“caj”格式，故意不提供硕博论文的pdf格式下载。点开硕博论文的介绍页，里面提供的只有“caj”格式的“整本下载”，而没有pdf格式。至于这个“caj”格式，除了知网自家的阅读器之外根本打不开，给学术研究造成了极大不便。此前曾有人编写了[下载pdf的脚本](https://greasyfork.org/scripts/18842)，可以在硕博论文的介绍页提供“pdf下载”的按钮，但在知网网站更新后已失效，而作者的[个人网站](http://blog.yuelong.info/post/cnki-pdf-js.html)也已无法打开。

在简单搜索后，我发现了一个新思路：虽然[中国知网](https://www.cnki.net/)在官网上提供的是“caj”格式，但是中国知网还有个[“海外版”](https://chn.oversea.cnki.net/)，在这个“海外版”中不仅没有了烦人的广告，连论文下载都变得听话了很多，虽然仍然有阴魂不散的“caj”格式，但至少提供了一个下载pdf格式的链接，而北京大学图书馆也拥有“海外版”的下载权限。不过以我个人的体验来看，“海外版”在中国大陆的访问速度并不算快，因此我想到可以使用“海内版”查文献、“海外版”下载硕博论文。

**注意：能够下载pdf文件的前提是拥有下载权限，这篇文章不是在教怎么白嫖文献。**

{% include figure.html src="aeece7ff01d2c143688ed818bd47ee47.png" width="960" height="540" alt="中国知网" %}

{% include figure.html src="5ce33e735d637decf48b2cb2c2637f54.png" width="960" height="540" alt="中国知网“海外版”" %}

{% include figure.html src="a73c659c14539733d7aaf8011d3ab68a.png" width="801" height="88" alt="中国知网的下载按钮" %}

{% include figure.html src="febe086cb1ad4d24c844151bce3a2c28.png" width="917" height="88" alt="中国知网“海外版”的下载按钮" %}

## 手动修改URL
简单探索一下可以发现，对于同一篇硕博论文，中国知网的链接与“海外版”的链接格式是相同的，仅仅是域名不同。例如，对于某篇论文，其在中国知网上的链接是：

```
https://kns.cnki.net/kcms/detail/detail.aspx?dbcode=CDFD&dbname=CDFD1214&filename=1014124155.nh&uniplatform=NZKPT&v=NJHJizxoAuPQFhVvCSqHauxz8fdIJxmKbAjmhVNHHzRp6W8VeQT6ysHFH2BYxedD
```

而其在海外版的链接是：

```
https://chn.oversea.cnki.net/kcms/detail/detail.aspx?dbcode=CDFD&dbname=CDFD1214&filename=1014124155.nh&uniplatform=NZKPT&v=NJHJizxoAuPQFhVvCSqHauxz8fdIJxmKbAjmhVNHHzRp6W8VeQT6ysHFH2BYxedD
```

也就是将开头的`https://kns.cnki.net/`替换为了`https://chn.oversea.cnki.net/`。虽然方法很简单，但在大量查阅论文时手动修改还是比较麻烦的，因此需要探索一下自动跳转的方式。

## 使用“Header Editor”实现自动跳转
[Header Editor](https://he.firefoxcn.net/)是一个浏览器扩展，可以修改请求头、响应头或进行重定向。此处我们可以制定一个简单的重定向规则，将硕博论文的详情页直接重定向到“海外版”中国知网。扩展的安装方式请参考官网给出的链接。

在扩展中增加一条规则，命名为“中国知网海外版”，规则类型为“重定向请求”，匹配类型为“正则表达式”，匹配规则为：

```
^https?://kns\.cnki\.net/(.*=(?:CMFD|CDFD)&.*)$
```

执行类型为“常规”，重定向至：

```
https://chn.oversea.cnki.net/$1
```

随后保存。如果一切正常，那么现在访问中国知网的硕博论文详情页已经可以自动跳转到海外版的网站了。

{% include figure.html src="b9aa4241c15b96b04716d9d7df5d14c4.png" width="960" height="540" alt="Header Editor的设置" %}

如果添加有问题，可以尝试扩展的“导出和导入”选项卡中的“下载规则”，输入：

```
https://pastebin.com/raw/MxVbMrZa
```

然后按照提示保存即可。

## 使用用户脚本替换搜索页链接
在浏览器中有些扩展可以提供用户脚本以便实现附加功能。[Tampermonkey](https://www.tampermonkey.net/)是一个常见的加载用户脚本的扩展，因此只需要编写一个脚本就可以替换搜索页的链接。扩展的安装方式请参考官网给出的链接。

脚本的思路比较简单，即在访问知网的搜索页面并点击链接时，自动识别该链接是否是硕博论文，如果是则修改链接地址到“海外版”。核心代码如下：

```javascript
let changeLink = function (e) {
    let target = e.target;
    while (target.tagName.toLowerCase() != "a") {
        if (target.tagName.toLowerCase() == "body") {
            return;
        }
        target = target.parentNode;
    }
    if (target.href && target.href.match(/^https?:\/\/kns\.cnki\.net\/(.*=(?:CMFD|CDFD)(?:&.*)?)$/)) {
        target.href = target.href.replace(/^https?:\/\/kns\.cnki\.net\/(.*=(?:CMFD|CDFD)(?:&.*)?)$/, "https://chn.oversea.cnki.net/$1");
    }
};
document.body.addEventListener("mousedown", changeLink);
document.body.addEventListener("click", changeLink);
```

我已经发布在了[Greasy Fork](https://greasyfork.org/zh-CN)，网址：<https://greasyfork.org/scripts/435530>。

## 后记
“海外版”的存在，让下载pdf格式的硕博论文成为了可能。希望互联网上能够少一些私有格式，多一些通用标准，让“网上冲浪”减少一些阻碍。

**再次提醒：能够下载pdf文件的前提是拥有下载权限，这篇文章不是在教怎么白嫖文献。**

<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：由于网站格式更新，方法已失效。本文仅做留档用。</p></div>