---
class: auto-numbering
css: bilibili
date: 2019-11-20 12:00
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRnuloHxksOxTetZaQtOicZ5boXOu9szzEziaUHWtyO0PeHg3PB5xv1oWUlVfib6ITYKhqpkia3CuEpma9w/0
head_image_height: 544
head_image_width: 1280
info: 用截图插入公式，或许不是优雅的选择。
js: bilibili
last_modified_at: 2022-01-05 14:23
tags: 技术指南
title: 如何在微信推送中优雅地插入公式
wechat_link: https://mp.weixin.qq.com/s/mYzdirgQjLwqXrfpri8lgw
---

## 前言
推送讲座早在 10 月 19 日就举办过了，但是一直没有出总结。最近趁着我自己开了个公众号，我也抽出一点时间把讲座的内容整理一下，以方便广大没能来听讲座的朋友们。

这次讲座的视频：

<div class="bilibiliBox" data-aid="71734762" data-page="1"></div>

这次讲座的资料：

<https://disk.pku.edu.cn/link/FCF574B48CDACAE55D68195FD733FFD0>

在培训时，我留下了一个技术难题：如何在微信推送中插入公式？当时我并没有得出很好的解决方法，唯一的方法就是——截图。但是，当我偶然网上冲浪时，才发现了插入公式的（或许是最佳的）解决方案。

## 排版工具的新选择——Markdown Nice
对于微信推送，网络上有许多排版工具。

最简单的排版工具就是微信自带的排版工具，其功能大多都是基础功能，适合喜欢自己创作的高端玩家。另外，由于微信自带的排版工具是富文本编辑，因此可以直接从别的排版工具复制粘贴过来。

我个人使用的排版工具就是“[秀米](https://xiumi.us/)”，这也是我大一刚入学的时候就从前学术部部长观音姐姐那里学到的。本公众号最近的几篇文章也都是用秀米排版的。秀米为用户提供了各种各样的模板，既有基础模板可供创作发挥，也有已经修饰过的模板可直接使用，而且还会根据不同的时间提供最新的时令模板。对于个人公众号和环院学生会公众号来说绰绰有余了。

但是今天我要介绍的主角不是秀米，而是我在整理资料的时候发现的另一个排版工具：[Markdown Nice](https://www.mdnice.com/)。它使用Markdown语法进行编辑，其预览结果可以直接复制粘贴到微信自带的排版工具中，适合那些喜欢Markdown做笔记写文章的朋友。最重要的是，它可以直接输入公式，并复制粘贴到微信自带的排版工具中。而且，渲染出的公式是svg矢量图，无论如何缩放都不会糊，目前来看是我能找到的最佳解决方式。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/bd1a2f87762fdabdcf277e8433bf0c94be7e02c85ba70e88.png" alt="Markdown Nice公式渲染示例" width="640" height="480" %}

我个人认为，这个排版工具的显示效果还是不错的。那么问题来了：公式要如何输入呢？

## 公式的输入方式
如<a class="xref-figure" href="#figure-bd1a2f87762fdabdcf277e8433bf0c94be7e02c85ba70e88.png"></a><h-hws hidden=""> </h-hws>所示，Markdown Nice中的公式需要放在美元符号“\$”之间，若为一个美元符号“\$”则是行内公式（即文字和公式在同一行），若为两个美元符号“\$\$”则是块公式（即公式单独成行并居中）。而美元符号之间的代码则是通过“MathJax”渲染的，其语法类似于TeX，但并不完全相同。如果你有TeX输入公式的基础，那么上手MathJax并不算难。<span class="footnote">MathJax中可使用的TeX命令可在如下网页中找到：<http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm></span>

当然，对于完全没有学过TeX语法（而且可能也不想学）的朋友，其实还有一些比较简单的方法。

参见：[何在Word中修改公式字体]({% link _posts/2022-01-05-How-to-Beautify-Formulas-in-Word.md %}#tex公式的获取)

## 后记
虽然写了这么多，但是我觉得在公众号中输入公式可能不是什么硬性需求（或许也就是学生会学术部的“环迹”等栏目需要吧）。当然，如果我之后分享学习资料的话也不会选择直接输入公式，而是会分享截图或者pdf文件。

最后送给大家一句话：Practice makes perfect, 熟能生巧，只看不练永远是学不会的。