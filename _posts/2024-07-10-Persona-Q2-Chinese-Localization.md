---
date: 2024-07-10 11:38
head_image: 5c52b3c327fc15bb18174c55784b4787.webp
head_image_height: 480
head_image_width: 1200
info: 格式复杂。
last_modified_at: 2024-07-28 14:23
tags: 3DS Atlus 汉化笔记
title: 《女神异闻录Q2 迷宫电影院》汉化笔记
---
《女神异闻录Q2 迷宫电影院》（简称“PQ2”）发售以来已经将近6年了，这期间一直没有汉化。最近经人介绍，我参考了前辈们的经验，研究了一下本作的文件结构，在这里也分享一下我的经验。

{% include video.html bvid="BV15m421V7Bt" title="3DS《女神异闻录Q2 新电影迷宫》汉化预览" %}

## 拆包/打包
3DS游戏的拆包其实没什么难的，一般情况下要完成汉化只需要修改romfs里的文件，而romfs使用Citra模拟器就能提取，然后只需要利用Luma的重定向补丁功能即可。当然，之所以我说是“一般情况”，是因为本作属于“不一般情况”——首先，部分文本是在可执行文件（`code.bin`）中的，而可执行文件位于exefs里，Citra提取不了，还是需要[3dstool](https://github.com/dnasdw/3dstool)。

除此之外，可能是为了节省空间，romfs里只有3个cpk文件，这是Criware的打包格式。这3个文件分别是`data.cpk`、`patch101.cpk`和`patch102.cpk`，其中`data.cpk`是游戏本体，而`patch101.cpk`和`patch102.cpk`是更新文件。更新文件中包含的文件会覆盖游戏本体的文件，而游戏本体有2 GiB以上，更新文件只有几个MiB，所以很容易就想到，可以先把所有的cpk解包，然后筛选需要汉化的文件，修改后统一放到更新文件里，最后再打包，这样可以减小打包的工作量。

到这里还算简单，而且打包好的文件放在Citra的补丁文件夹中也能被正常识别，但是——实机运行会死机。分析了一下，既然Citra能运行，说明整个流程是没有问题的；而实机运行会死机，推测是修改后的文件太大了，导致了某种内存溢出。所以，对于实际运行，似乎只能放弃这种方法，改为把所有的文件都放到游戏本体里，然后打包。

## 字库
本作的字库是3DS游戏常见的`.bcfnt`文件格式，这个文件格式处理起来都有现成的工具，我选用了[3dstools](https://github.com/ObsidianX/3dstools)，因为这个工具是拿python写的，修改起来比较方便。只不过游戏使用的编码方案是Shift-JIS，而3dstools默认是UTF-16-LE，所以需要稍微修改一下。

在字体方面，原版的字体选用了Fontworks公司开发的[<span lang="ja">ハミング</span>](https://fontplus.jp/font-list/hummingstd-b)系列字体，而方正字库恰好和Fontworks合作开发了[方正FW轻吟体](https://www.foundertype.com/index.php/FontInfo/index/id/4985)，可以直接拿来用。略微有些美中不足的就是，方正FW轻吟体的部分字形仍然是日本标准，例如“今”中的点是横着写的，而大陆标准是从左上到右下的点。

## 文本/图片
本作的文本可谓是地狱。这些文本以不同的格式分散在了不同的文件里，而每个文件的后缀名和打包方式也不完全一样，修改起来非常费力。

最初我参考了[lraty-li](https://github.com/lraty-li)的方法，采用[Atlus-Script-Tools](https://github.com/tge-was-taken/Atlus-Script-Tools)对游戏脚本反编译后，修改文本再重新编译。但是这样会遇到一些问题——部分脚本反编译出来的结果有问题，无法被重新导入。之后我分析了文件结构，发现并不需要做反编译这件事——因为我所需要的只是修改文本，而不用修改游戏的逻辑。因此，我改用了[PersonaEditor](https://github.com/Meloman19/PersonaEditor)，这个工具可以直接修改文本，而不用反编译。

除此之外，PersonaEditor还提供了对归档文件解包/打包的功能，这对于汉化来说也很有帮助。前文已经说过，有些文本是被打包进了归档文件中，而通过PersonaEditor遍历文件夹下的文件，可以方便地提取需要编辑的文本，同时也可以导出需要修改的图片。不过，PersonaEditor对于PQ2文件格式的支持不完全，cgfx、ctpx和spr3格式无法支持。而我又懒得重头开始写工具处理，因此我又引用了[Kuriimu](https://github.com/IcySon55/Kuriimu)的库，对这些格式进行处理。

当然，还有一些文本是硬编码在`code.bin`里的，还有一些特殊格式的文件，这些文件都可以用python来处理。

## 总结
总结一下，本作的汉化工作主要分为以下几个步骤：

- 解包`patch102.cpk`，作为补丁包的基底。
- 采用修改后的PersonaEditor提取需要编辑的文本和图片，并用python脚本处理其他格式的文件。
- 根据已翻译的文本生成字库，同时生成简体中文汉字到Shift-JIS的映射表。
- 根据映射表导入文本。
- 导入图片。
- 将修改后的文件与`patch102.cpk`中原有的文件一起打包，生成补丁。
