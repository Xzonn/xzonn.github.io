---
date: 2020-01-21 18:24
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRns3Qicq9gpFHguTT9qAibiaKuUxW81bnnkkEbeUBxvTBvmx0tYuib9fDXaYyiczGB765dAR8y9DGHgsBDQ/0
head_image_height: 546
head_image_width: 1280
info: Xzonn的技能小讲座第4讲。
last_modified_at: 2022-04-27 09:56
links: 
- - http://openstd.samr.gov.cn/bzgk/gb/
  - 国家标准全文公开系统
- - https://www.mee.gov.cn/ywgz/fgbz/bz/
  - 生态环境标准
logs: 
- 2021-05-25：更新代码。
- 2022-04-27：方法已失效。
tags: 技术指南
title: 如何下载一篇国标？
wechat_link: https://mp.weixin.qq.com/s/iIIwUZupCn3M_mCYNzJSbg
---
<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：由于网站格式更新，方法已失效。本文仅做留档用。</p></div>

## 1

有些时候，我们需要查阅国家标准来完成课程任务或设计实验方案。例如，在《环境监测实验》课程中，为了测定水体中的金属元素，我们需要查找对应的国家标准，以确定采用何种仪器、何种标准物质、标准曲线的范围等。当然，生态环境类的国家标准很容易查找并下载——生态环境部官网上提供了许多标准全文，基本满足需要。

{% include figure.html src="c936a89b4afda9a906867b1a34697a28.png" alt="生态环境标准<br/>（网址：https://www.mee.gov.cn/ywgz/fgbz/bz/）" width="640" height="360" %}

然而，环境学科是一门交叉学科，很多时候我们不仅需要生态环境类的标准，还需要其他方面的标准。例如，在《环境研究方法》课程中，为了确定家用电器的能耗，我们查找了GB 21456-2014《家用电磁灶能效限定值及能效等级》。如果只是需要在线观看的话，百●●库、道●●巴等网站上基本可以找到全文。但是在线观看毕竟不方便，下载或是打印才是比较理想的方案。

## 2

互联网上有很多网站提供国标的下载，然而上述两个网站的下载需要权限甚至需要付费，还有些网站我绕了半天也没找到下载链接。好在，国家标准委提供了“国家标准全文公开系统”，在这里可以查看并下载大部分的公开标准文本（注：网站下方有提示，“食品安全、环境保护、工程建设方面的国家标准未纳入本系统”，并提供了对应的链接）。

{% include figure.html src="b078332e876f0a1472df355f404449d9.png" alt="国家标准全文公开系统查看页面" width="640" height="360" %}

{% include figure.html src="3cecef47ad02cfc707b6ae2682e9f777.png" alt="国家标准全文公开系统下载页面" width="640" height="355" %}

通过该网站下载到的pdf文件经过了特殊的加密，需要Adobe Acrobat搭配网站提供的“FileOpen”插件（注：插件同时提供了Windows、Mac和Linux版本）才能打开，且不能复制文本。

{% include figure.html src="6510b2c34abf601c2cf026ae8e27e1b7.png" alt="下载得到的加密后的pdf" width="640" height="360" %}

当然，也不是没有办法将其转变为无需插件就能打开的pdf：在已经安装了插件的电脑上选择“打印”（<kbd>Ctrl + P</kbd>），然后从打印机中选择“Microsoft Print to PDF”并保存即可。这种方法实际上是把原本的pdf的文本转换成了矢量图形再打印，因此新生成的pdf虽然没有加密，但也无法复制文本。当然这也可以解决：使用Adobe Acrobat提供的“增强扫描”→“识别文本”功能，可以将矢量图形再转成文字。

{% include figure.html src="ded5cafe5f87b2668ff583651690a8f2.png" alt="使用Adobe Acrobat识别文本" width="640" height="360" %}

目前为止，大部分的需求都已经解决了——下载、打印、复制文本。但是，还有一些问题：有些标准在该网站中仅可在线阅读，即强制性国家标准中的采标（注：采用了国际国外组织标准并转化为我国的国标）和推荐性国家标准中的非采标。而推荐性国家标准中的采标在该网站上连在线阅读也没有，不过我个人认为这种标准直接去找采用的国际标准原文比较好。对于仅可在线阅读的标准，那就需要进一步的操作了。

## 3

既然是在线阅读，那就一定能获取源文件。

> “Xzonn规则”第一条：只要能用Chrome看的东西都能扒出来源文件和源代码。

查看源文件的方法比较简单，在页面上按<kbd>F12</kbd>或<kbd>Ctrl + Shift + I</kbd>调出开发者工具，然后重新载入页面，在“Network”选项卡中监视想要的文件即可。

然而，上面说的都是理论，实际操作起来就有点麻烦了。该网站使用的是即将结束寿命的Flash，而Flash是没有办法直接用Chrome调试的。而查看了“Network”中的文件后，我虽然发现了标准的源文件，然而这个文件并不是pdf，也不是前文所述的加密的pdf。于是下一步就变成了修改Flash代码的工作。

要想修改Flash代码，首先得确认修改后的文件能够被浏览器读取。经过尝试后发现，将该网页保存为本地文件并修改源代码中Flash文件的地址是不可行的，“异位修复”失败，只能尝试“原位修复”。在查阅了很多资料后，我采用了nginx重定向的方法，即在本地搭建nginx服务器，将Flash文件重定向到本地文件，其他文件直接从远程服务器获取。

nginx的下载和配置比较简单，直接从官网上下载压缩包，解压后修改“conf/nginx.conf”文件，在默认文件的`http { ... }`中加入如下代码并保存：

```
    server {
        listen 80;
        server_name c.gb688.cn;

        location /bzgk/js/FileOpen.swf {
            alias FileOpen.swf;
        }

    	location / {
            proxy_pass http://202.99.59.44/;
        }
    }
```

然后将原始的Flash文件（地址：<http://c.gb688.cn/bzgk/js/FileOpen.swf>）下载并和“nginx.exe”文件放在同一个目录，文件名保留默认的“FileOpen.swf”。双击运行nginx.exe。

再将“hosts”文件（注：Windows系统下默认位置为“C:\Windows\System32\drivers\etc”）最后追加一行并保存：

```
127.0.0.1 c.gb688.cn
```

注意：修改hosts后，每次访问该网站的请求都会重定向到本地，如果nginx没有打开，可能会出现连接错误。可以设置nginx自动启动（可自行搜索教程），或手动删除hosts中加入的该行。

尝试在浏览器中打开该网站的在线预览页面，如果顺利打开，说明配置可能成功了。如果不放心，可以试试用其他的swf文件代替“FileOpen.swf”，然后打开页面查看Flash文件是否真的被替换了。

{% include figure.html src="a64f2381ad6cd320a834c0a247af40a2.png" alt="修改后的页面，用于测试设置是否正确" width="640" height="300" %}

配置成功后，下一步就可以修改Flash文件了。由于Flash文件是编译后的文件，因此需要对其进行反编译。此处使用的软件是“JPEXS Free Flash Decompiler”，该软件是免费开源软件，可在GitHub下载（地址：<https://github.com/jindrapetrik/jpexs-decompiler/>）。

用该软件打开前述下载的原始Flash文件“FileOpen.swf”，从左侧的树状图中找到“FileOpen.swf”→“脚本”→“FOViewer”，单击打开。此时在中间部分显示源代码，找到函数`function setCredentials()`的定义（注：未修改过的文件位于2094行，按<kbd>Ctrl + G</kbd>可以跳转到指定行号）。该函数的代码类似如下：

```java
...

      private function setCredentials(param1:String = null) : void
      {
         var _loc2_:Number = NaN;
         trace("setCredentials: " + param1);
         this._permSelect = false;
         ...
      }

...
```

在该函数内部点击鼠标，此时右侧显示汇编代码，类似如下：

```
...

code
getlocal_0
pushscope
pushnan
setlocal_2
findpropstrict Qname(PackageNamespace(""),"trace")
pushstring "setCredentials: "
getlocal_1
...
```

点击右下方的“Edit P-code”，在`setlocal_2`（注：未修改过的文件位于21行）后插入新的两行：

```
pushstring "93"
setlocal_1
```

保存后，左侧的代码会多出一行，类似如下：

```java
...

      private function setCredentials(param1:String = null) : void
      {
         var _loc2_:Number = NaN;
         param1 = "93";
         trace("setCredentials: " + param1);
         this._permSelect = false;
         ...
      }

...
```

点击软件左上方的保存即可。完整操作见视频：

<!--<video src="http://q4g8ig44u.bkt.clouddn.com/001.mp4" controls></video>-->（视频已失效）

修改完毕后，再次用浏览器打开该网站的在线预览页面，如果无误的话，页面上方的“打印”、“保存”、“选择”图标将变为可选择的状态。此时选择“打印”并保存为pdf，得到的pdf也是转换成矢量图形的pdf。

{% include figure.html src="20cc2e19d47bbcd31f5e6992870a8a47.png" alt="修改前（上）和修改后（下）页面上方图标状态对比" width="640" height="377.50" %}

## 4

折腾了半天，当我准备这篇文章的时候，我才发现原来这个网站为手机提供了阅读器。由于手机上没有Flash播放器，因此这个阅读器是拿JavaScript写的。于是事情就变得简单了起来——Chrome调试JavaScript还是很方便的。简单扒拉了一下代码之后，我找到了突破口：pdf阅读器自带了“download()”函数，直接调用就行了。

仍然是用浏览器打开在线预览页面，按<kbd>F12</kbd>或<kbd>Ctrl + Shift + I</kbd>调出开发者工具，然后在选中左上角的手机图标（![图标\|none](05bc9ef7f397e34f955dcbf1203d9cfb.png)），再刷新页面。此时蓝色的阅读器会变成黑色的阅读器，等待页面全部加载完毕后，在“Console”选项卡中输入如下代码并回车：

```javascript
PDFViewerApplication.download();
```

然后浏览器就会自动下载pdf文件。

{% include figure.html src="697d7f7e79324368cff42368a6b9d1ef.png" alt="一行JavaScript实现下载" width="640" height="300" %}

2021-05-25更新：由于Flash已不再被主流浏览器支持，因此该网站更换了在线PDF阅读器，上述代码已不再起作用，经尝试后可使用以下代码：

```javascript
PDFViewerApplication.pdfDocument.saveDocument(PDFViewerApplication.pdfDocument.annotationStorage).then(function (data) {
    PDFViewerApplication.downloadManager.download(new Blob([data], {
        type: "application/pdf"
    }), PDFViewerApplication.baseUrl, PDFViewerApplication._docFilename, "download");
});
```

输入代码时请确保页面已完全加载。

<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：由于网站格式更新，方法已失效。本文仅做留档用。</p></div>

## 5

总结一下我今天写了啥：

1. 生态环境类的国家标准可以从生态环境部官网下载。
2. 其他国家标准可以在文库网站找到在线阅读版本。
3. “国家标准全文公开系统”可以查看除食品安全、环境保护、工程建设方面的强制性国家标准和非采标推荐性国家标准，其中仅非采标强制性国家标准可下载得到加密的pdf文件，需要安装插件后阅读，但也可以在安装插件的电脑上使用Microsoft Print to PDF转换为无加密的矢量图形pdf；其他标准仅可在线阅读。
4. 矢量图形pdf可以用Adobe Acrobat的识别文本转换成可选择、复制的文字。
5. 通过修改hosts、nginx重定向、修改阅读器Flash文件可以将第3条中只能在线阅读的标准转换为矢量图形pdf，然后通过第4条转换为可选择、复制的文字。
6. 第5条可以用Chrome调出手机版视图后的一句命令代替。