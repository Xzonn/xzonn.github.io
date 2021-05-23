---
date: 2020-03-07 22:14
info: 利用云服务器结合python脚本实现搜索功能及PDF渲染功能。
last_modified_at: 2020-08-02 18:06
tags: 网站日志
title: 新功能上线：学习资料库搜索及服务器渲染PDF
---
## 前言

[上次更新](/posts/Update-3-0.html)提到了阿里云的“[学生‘在家实践’计划](https://developer.aliyun.com/adc/student/)”。有了一台自己的服务器，只有静态网页似乎有点浪费，因此我玩出了一些新花样。

## 学习资料库搜索
<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：本页面已关闭，并将在不久之后移除。</p></div>

{% include figure.html src="https://file.moetu.org/images/2020/03/07/a790fa9a92669f9aac086cc38ef8272473fe3f2b07037787.png" alt="网页版搜索" width="640" height="360" %}

我的[学习资料库](/posts/Study.html)储存了不少文件，我自己在电脑上查找可以用Everything，但是在网盘里查找似乎就有些费劲了。因此我写了个简单的搜索系统，可以搜索收录了学习资料的课程，也可以搜索单个文件。由于数据量不大，我也没怎么去考虑优化问题，直接用了一个SQLite数据库保存所有的文件并归类了课程信息。

<!--[» 点击这里可以前往搜索页面 «](/tools/Study-Search.html)-->

{% include figure.html src="https://file.moetu.org/images/2020/03/07/6b0de472202b8f73984a79a16f625b9ee3162da39c4a0d45.png" alt="公众号搜索" width="560" height="700" %}

另外，结合我的公众号，我还提供了简单的对话式搜索方式，方法很简单，向公众号（*微信号：Xzonn_*）后台发送“学习”进入学习模式，然后发送指令即可，例如：“课程 环”即可查找信息中带有“环”的所有课程。

顺带一提，我的公众号还写了个自动回复的脚本，输入“聊天”即可进入聊天模式。源代码也很简单：

```python
message.replyText(message.Content.replace("我", "{YOU}").replace("你", "我").replace("{YOU}", "你").replace("吗", "").replace("？", "。"))
```

{% include figure.html src="https://file.moetu.org/images/2020/03/07/cb472f085051d72a956def72c1ea4e53a4ef7e913aabb671.png" alt="服务器渲染的PDF效果" width="640" height="360" %}

## 服务器渲染PDF

我搭建网站最初的目的就是想在手机和电脑上查看学习资料，而想要把电子设备上的资料转移到纸上就需要打印。最初我使用的是Chrome自带的打印功能，但是Chrome毕竟只是个浏览器，许多打印的规范它并不支持（*当然这些规范好像目前也没有浏览器能支持*）。于是后来我参考了一篇文章：《[一本由译者自己排版的书：谈谈HTML+CSS在中文图书排版中的实际运用](https://gitbook.cn/books/595074f5b4d2717e5559d671/index.html)》，开始选用[Prince](https://www.princexml.com/)作为PDF渲染的工具。

由于Prince是有Ubuntu版本的，因此事情就变得比较简单了。我先在服务器端生成网页，然后用[PhantomJS](https://phantomjs.org/)渲染JavaScript，再用Prince将生成的HTML转为PDF。当然中间需要写一些脚本来实现，这里不再赘述。目前我设定的策略是每小时自动构建一次网站（*可以在“[关于本站](/posts/About.html)”页面看到当前版本的构建时间*），然后用python脚本检查是否有改动，将有改动的网页重新生成PDF。由于目前还是试验阶段，可能会出现很多错误，之后我再着手纠正。

顺带一提，PDF使用的中文字体是[汉仪字库](http://hanyi.com.cn/)的字体，按照[个人非商用](http://hanyi.com.cn/faq-doc-1)授权，英文字体为Open Sans、STIX-Web和Times New Roman。其实中文字体我本来想用思源系列字体的，因为开源字体不受限制，但是似乎思源字体生成的PDF较大，于是我就选用了汉仪的字体。

## 网站备案

最后说一下网站备案和搭建的经历。

由于服务器在国内，需要进行备案，因此我并没有在开通服务器的第一时间就部署我的网站。备案的流程应该还算简单，需要的资料基本上就是个人信息和身份证照片，并没有要求我在某个地标拍照，可能是流程简化了。

备案之后就可以用域名正常访问服务器了。此外，一些服务也要求网站必须备案，例如微信的“JS接口安全域名”。（*这里吐槽一句，我本来以为备案之后就可以自定义微信分享时的文字和图片，结果这个权限需要通过“微信认证”，而主体为个人的微信号又不能申请认证，于是我也不知道这个功能有什么用*）有了备案之后，通过微信访问网站也不会提示“非微信官方网页”了。

顺带一提，有了云服务器之后可以设置消息自动转发到服务器上（*这个倒是不需要备案，只要服务器有公网IP即可*），可以参考这篇文章：《[Python 用 Flask 从零搭建微信公众号后台 菜鸟入门级](https://zhuanlan.zhihu.com/p/46720483)》。

备案结束之后，我把网站的网址迁移到了新的域名（*xzonn.top*）下，并将GitHub Pages的网址重定向到了新域名下，因此现在访问原域名（*xzonn.github.io*）会自动跳转到新域名。

## 网站搭建

云服务器的操作系统有很多选择，我基于一些考量选择了Ubuntu。原因包括：

第一，首先要排除Windows。虽然Windows有可视化窗口，也可以远程连接，但这毕竟是台服务器，要可视化窗口除了浪费内存之外没啥大用，命令行我也一样会使。

第二，我没有选择CentOS。我对Ubuntu和CentOS都不太熟悉，虽然有些网站建议服务器选择CentOS，但我考虑到我只有一台Windows 10的笔记本，搭建本地调试的环境装双系统不方便，而Ubuntu可以以WSL的形式运行。事实证明，WSL还是很方便的，因为它可以和Windows互通文件系统，很多在Windows下配置很麻烦的软件放到Ubuntu里面就很简单了，`apt-get install`一下即可。

服务器程序我选择了Nginx而不是Apache，主要是因为我之前在Windows上搭建过Nginx，有点基础。

另外，为了能让我的网站在地址栏前面有把小锁（*其实就是HTTPS*），我还查找了免费的证书——[Let<span lang="en">’</span>s Encrypt](https://letsencrypt.org/zh-cn/docs/)，虽然有效期只有3个月但是似乎可以自动续期，比较方便。

最后顺带一提，服务器出口带宽只有1&nbsp;Mbps，也就是128&nbsp;KB/s，我已经把所有能引用的链接都放在外站了，希望不会太慢（*只要访问人数不多应该问题不大*）。