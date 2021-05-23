---
class: auto-numbering
css: bilibili
date: 2019-11-20 12:00
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRnuloHxksOxTetZaQtOicZ5boXOu9szzEziaUHWtyO0PeHg3PB5xv1oWUlVfib6ITYKhqpkia3CuEpma9w/0
head_image_height: 544
head_image_width: 1280
info: 用截图插入公式，或许不是优雅的选择。
js: bilibili
last_modified_at: 2020-11-13 13:18
math: true
tags: 技术指南
title: 如何在微信推送中优雅地插入公式
wechat_link: https://mp.weixin.qq.com/s/mYzdirgQjLwqXrfpri8lgw
---

## 前言
推送讲座早在 10 月 19 日就举办过了，但是一直没有出总结。最近趁着我自己开了个公众号，我也抽出一点时间把讲座的内容整理一下，以方便广大没能来听讲座的朋友们。

这次讲座的视频：

<div class="bilibiliBox" data-aid="71734762" data-page="1"></div>

这次讲座的资料：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/a5d3fba4f661b6d4c3f40735a32de60af5379a34875fbdd9.png" alt="微信推送讲座资料" width="300" height="300" %}

<https://disk.pku.edu.cn/link/6B621DA345631AB22EE397C91C79E1EC>

在培训时，我留下了一个技术难题：如何在微信推送中插入公式？当时我并没有得出很好的解决方法，唯一的方法就是——截图。但是，当我偶然网上冲浪时，才发现了插入公式的（或许是最佳的）解决方案。

## 排版工具的新选择——Markdown Nice
对于微信推送，网络上有许多排版工具。

最简单的排版工具就是微信自带的排版工具，其功能大多都是基础功能，适合喜欢自己创作的高端玩家。另外，由于微信自带的排版工具是富文本编辑，因此可以直接从别的排版工具复制粘贴过来。

我个人使用的排版工具就是“[秀米](https://xiumi.us/)”，这也是我大一刚入学的时候就从前学术部部长观音姐姐那里学到的。本公众号最近的几篇文章也都是用秀米排版的。秀米为用户提供了各种各样的模板，既有基础模板可供创作发挥，也有已经修饰过的模板可直接使用，而且还会根据不同的时间提供最新的时令模板。对于个人公众号和环院学生会公众号来说绰绰有余了。

但是今天我要介绍的主角不是秀米，而是我在整理资料的时候发现的另一个排版工具：[Markdown Nice](https://www.mdnice.com/)。它使用Markdown语法进行编辑，其预览结果可以直接复制粘贴到微信自带的排版工具中，适合那些喜欢Markdown做笔记写文章的朋友。最重要的是，它可以直接输入公式，并复制粘贴到微信自带的排版工具中。而且，渲染出的公式是svg矢量图，无论如何缩放都不会糊，目前来看是我能找到的最佳解决方式。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/bd1a2f87762fdabdcf277e8433bf0c94be7e02c85ba70e88.png" alt="Markdown Nice公式渲染示例" width="640" height="480" %}

我个人认为，这个排版工具的显示效果还是不错的。那么问题来了：公式要如何输入呢？

## 公式的输入方式
如<a class="xref-figure" href="#figure-bd1a2f87762fdabdcf277e8433bf0c94be7e02c85ba70e88.png"></a><h-hws hidden=""> </h-hws>所示，Markdown Nice中的公式需要放在美元符号“\\\$”之间，若为一个美元符号“\\\$”则是行内公式（即文字和公式在同一行），若为两个美元符号“\\\$\\\$”则是块公式（即公式单独成行并居中）。而美元符号之间的代码则是通过“MathJax”渲染的，其语法类似于TeX，但并不完全相同。如果你有TeX输入公式的基础，那么上手MathJax并不算难。<span class="footnote">MathJax中可使用的TeX命令可在如下网页中找到：<http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm></span>

当然，对于完全没有学过TeX语法（而且可能也不想学）的朋友，其实还有一些比较简单的方法。

###1. 手写公式
网络上有很多工具可以直接识别手写公式并转换为TeX代码，而后将TeX代码复制粘贴到Markdown Nice中即可。例如 [MyScript](https://webdemo.myscript.com/views/math/index.html)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/fd17795c7261de0fceb678e7de0a53a55bcf59e23461a915.png" alt="MyScript手写识别示例" width="640" height="300" %}

顺带一提，上述网站除了可以转换为TeX代码外，还可以转换为MathML代码；而MathML代码在粘贴到Word中并选择“只保留文本 (T)”后可以转换为Word内置的公式格式。

如果只是某个字符或命令忘记了，也可以试试另一个工具[Detexify](http://detexify.kirelabs.org/classify.html)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/c13095690b8788057062af278fae18d4b888c26b91a6eece.png" alt="Detexify手写识别示例" width="640" height="300" %}

###2. 截图识别
如果不想手写公式，也可以直接拿别人写好的公式截图识别。例如[Mathpix Snip](https://mathpix.com/)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/48e4b64868e87aa432695b24c67b5ed2bc16639d029c427a.png" alt="Mathpix Snip截图识别示例" width="640" height="580.19" %}

该软件在多平台有客户端，需要注册账号后使用。我个人在注册账号时先后尝试了北大邮箱、126邮箱，但都无法立刻收到验证邮件；而Gmail可以立刻收到验证邮件，可能是因为邮件服务器在国外吧。

###3. 从别的网页查找代码
许多网页上的公式就是由MathJax渲染出来的（例如我的小站），如果你在某个网页上看到了公式，并且在网页加载过程中左下角出现了灰色文本框，说明这个公式很有可能是MathJax渲染出来的。此时可以右键单击公式 → Show Math As → TeX Commands，即可查看TeX代码。<span class="footnote">我的小站需要用“查看源代码”功能才能找到公式的TeX代码。</span>

{% include figure.html src="https://file.moetu.org/images/2020/02/20/0eb009e6852d029d8b6a73494f224be3b3c6993b36c579fb.png" alt="网页查找代码示例" width="640" height="300" %}

另外，如果右键单击公式 → Show Math As → MathML Code，则可以得到MathML代码，类似“2.1. 手写公式”中的介绍，此代码也可复制到Word中显示。

###4. 用TeX编辑器写公式
网页上也有一些TeX编辑器，有些仅仅能实时渲染，有些提供了工具栏，方便输入。比较常见的TeX编辑器：[知乎](https://zhuanlan.zhihu.com/write)。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/f022f8cbf8d490b936882ce6fe15aa956b72f673c887128e.png" alt="知乎公式编辑器示例" width="640" height="300" %}

另外，如果对TeX语法感兴趣，可以查找一些教程，例如：[知乎问题：知乎上的公式是怎么打出来的？](https://www.zhihu.com/question/31298277)

###5. 从Word中粘贴公式
理论上说从Word中复制粘贴公式也是可以得到TeX代码的（至少从我的电脑上是可以的），但是我在别人的电脑（n = 2）上并没有得到同样的效果，之后我摸索一下再说吧。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/b4c4263f8e48685b6d02798479fcc7590faacf1f1695bd88.png" alt="我的Word为什么和你们不一样" width="640" height="300.18" %}

## 后记
虽然写了这么多，但是我觉得在公众号中输入公式可能不是什么硬性需求（或许也就是学生会学术部的“环迹”等栏目需要吧）。当然，如果我之后分享学习资料的话也不会选择直接输入公式，而是会分享截图或者pdf文件。

最后送给大家一句话：Practice makes perfect, 熟能生巧，只看不练永远是学不会的。