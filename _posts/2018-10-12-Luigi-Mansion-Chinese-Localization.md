---
class: auto-numbering
date: 2018-10-12 12:00
head_image: c091b864abea3849f4b78f2eef48cb0e.png
head_image_height: 256
head_image_width: 512
info: 3DS《路易吉洋馆》汉化：从开坑到弃坑。
last_modified_at: 2024-03-26 12:47
logs: 
  - 2024-03-26：更新字库说明。
tags: 3DS 任天堂 汉化笔记
title: 3DS《路易吉洋馆》汉化笔记
---
<div style="font-size: 200%; font-weight: bold; text-align: center;"><a href="/LuigiMansion/">→汉化发布页←</a></div>

## 说明
<span lang="ja">『**ルイージマンション**』</span>（参考译名：《**路易吉洋馆**》，英文名：***Luigi's Mansion***）是2001年于GameCube平台发售的游戏，并于2018年在3DS平台发售了重制版。其续作《**路易吉洋馆2**》（繁体：《**路易吉洋樓2**》，日文：<span lang="ja">『**ルイージマンション２**』</span>）于2013年发售，港台版自带简繁中文支持。

由于重制版并未提供官方简体中文，因此开设汉化项目，旨在对本游戏提供爱好者的汉化工作。本项目基于日本发行版汉化。

**声明：本人对游戏软件仅做研究用途，本人不提供软件本体，也从未对软件本体进行非法传播，更未对其用作商业用途。如因非法传播造成法律纠纷，概与本人无关。特此声明。**

## 图片
本游戏中需要汉化的图片仅有标题界面的“ルイージマンション”，而标题图片存储于`/Region_JP/Japanese/UITitle.gar`文件中。利用Kuriimu系列的Karameru软件可以打开该文件，但在不修改任何文件的情况下直接保存并在实机测试时会报错。对比一下两个文件可以看出，保存后的文件比原文件大小更大，因此推测是在保存过程中偏移量（Offset）出现了变化。由于导入图片时文件大小不变，偏移量也不变，因此我用Python写了一个简单粗暴的脚本，直接读取偏移量并修改相应数据。实机测试后发现没有报错，并且标题可以正常显示为修改后的图片。

``` python
with open("UITitle.gar.bak", "rb") as f:
  ori = list(f.read())

with open("I_Logo_00.ctxb", "rb") as f:
  logo = f.read()

ori[0x013800: 0x033880] = logo

with open("UITitle.gar", "wb") as f:
  f.write(bytes(ori))
```

由于标题页面是有动画的，即“Luigi”的“i”和“Mansion”的“a”上的两只眼睛会动，为了保证“眼睛”的位置不变，需要保证英文的位置不变。而原标题的日文“ルイージマンション”覆盖了英文“Luigi Mansion”，修改起来比较困难，因此我提取了北美发行版中的英文标题，简单修改后与日版标题的英文对齐，并在两行字中间加入了“路易吉洋馆”的标题。

## 文本
本游戏中的所有文本存储于`/Region_JP/Japanese/main.gmsg`文件中，而Kuriimu对此文件的支持不佳。在网络上查找资料后发现该格式曾在同一开发商制作的《*塞尔达传说 梅祖拉的面具 3D*》（下称 **MM3D**）中使用。对比两游戏的文件二进制文件，发现MM3D中的版本数据是`01 00 00 00`，而本作版本数据是`03 00 00 00`，即两个文件的格式并不完全相同。但是，这对之后的工作仍有启发。

再次翻看`main.gmsg`的内容，发现从位置`0xe414`处开始，数据很有规律，如`PRESS`、`BUTTON`、`2001 - 2018 Nintendo`等，猜测这部分开始是文本内容，且为UTF-16-LE编码。随后向上搜索`14 E4 00 00`（偏移量，小端序），在位置`0x5bc4`处发现了这个数据，简单查看了一下周围的数据，内容大概为：`01 00 00 00 7F 00 00 00 14 E4 00 00 26 00 00 00`，猜测这是4个`int`数据，分别代表编号、*（未知）*、偏移量、文本长度。按照这个逻辑，我用Python脚本尝试对文本导出，得到了比较好的结果。随后我修改了几个文字后导入并在实机测试，发现可以显示。

其中一句文本如下：

``` plaintext
Cスティックで\x7f\x16にゅうりょく\x00入力\x7f\x17した\x7f\x16ほうこう\x00方向\x7f\x17に\x7f\x01\x7f\x16まわ\x00回\x7f\x17ります。\x7f\x01\x7f\x16うえ\x00上\x7f\x17に\x7f\x16にゅうりょく\x00入力\x7f\x17すると\x7f\x16うえ\x00上\x7f\x17を\x7f\x16む\x00向\x7f\x17き\x7f\x01\x7f\x16した\x00下\x7f\x17に\x7f\x16にゅうりょく\x00入力\x7f\x17すると\x7f\x16した\x00下\x7f\x17を\x7f\x16む\x00向\x7f\x17きます。\x7f\x00
```

经过对比后发现，`\x7f\x16`和`\x7f\x17`是用来标记汉字假名注音的，而`\x7f\x01`是换行符，`\x7f\x00`是结尾符。为了方便汉化，我将所有的假名注音删去，得到了初步处理后的文本。随后我在简单分词后尝试机翻，但导入并实机测试时出现了死机问题。经过排查后，发现控制符`\x7f\x02\x7f\x15\x03\x00`和`\x7f\x15\uffff\uffff`用来标记字体颜色，当两个控制符之间的字符数量增减后会出现问题。因此我想到了最简单的办法，即超出的字数从结尾删掉，不足的字数用全角空格补齐，果然未再出现死机。

2024-03-26更新：深入研究发现，实际上有些控制符是需要对齐到4字节（2字符）的，导致没有处理控制符时会死机。原本的处理方式是添加全角空格，并强制全角空格宽度为0，这会导致字体渲染存在挤压的问题。因此我确认了需要对齐的控制符，并在导入时对其进行了处理。实际上在1.0.0版本发布时就已经解决了这个问题，只是没有更新汉化笔记。

## 字库
本游戏中的字库存储于`/Region_JP/Fonts/main.gzf`和`/Region_JP/Fonts/location.gzf`。利用Kuriimu系列的Kukkii软件可以打开该文件，但图片显示出现错误。<del>分析源代码后发现，该字库文件的图片应强制设为`LA44`格式，在此格式下可以正常导出字库内的图片。</del>同时，利用Kukkii源代码中对GZF格式的支持，我得到了所有字符数据的存储位置，并用Python脚本提取。

<del>然而，导入过程出现了问题：游戏并不会读取文件中存储的图片偏移量，而是默认读取`0x1780`处的图片数据。因此，这限制了字库能存储的字符数量，即496个。</del>

<del>2019-02-15更新：本人碰巧拆包了《*永恒绿洲*》（Ever Oasis），发现其字库也是`.gzf`格式，查了一下开发商，竟然也是GREZZO……这个游戏使用的字库容量比本作的字库容量更大，有1968个字符，因此字库问题大概可以解决了……</del>

2024-03-26更新：

再度研究了字库文件，实际上Kukkii中关于`.gzf`文件的支持是不完善的，而这个软件的继承者Kuriimu2也没有对`.gzf`文件提供支持，所以还是得自己研究。翻看[Kukkii中关于`.gzf`文件的代码](https://github.com/IcySon55/Kuriimu/blob/master/src/Cetera/Font/GZF.cs)，其中对头文件格式的结构定义是这样的：

``` csharp
public class Header
{
    public Magic magic;
    public int version;
    public ushort imgInfoOffset;
    public ushort unk1;
    public int entryLength;

    public int imgCount;
    public int entryCount;
    public uint unk2;
    public uint unk3;

    public Format format;

    public byte pad1;
    public short unk4;
    public short unk5;
    public short unk6;

    public int unk7;
}
```

根据我对《路易吉洋馆》日版、美版、欧版、韩版的研究，我将部分变量重命名：

``` csharp
public class Header
{
    public Magic magic;
    public int version;
    public ushort imgInfoOffset;
    public ushort imgLength;
    public ushort entryLength;
    public ushort unk1; // Always 0

    public int imgCount;
    public int entryCount;
    public uint unk2; // Always 0xff0a
    public GZFImageFormat format;

    public uint fontSize;
    public ushort unk4;
    public ushort unk5;
    public ushort tileWidth;
    public ushort tileHeight;
}

public enum GZFImageFormat : ushort
{
    L4 = 8,
    L8 = 6,
}
```

其中`GZFImageFormat.L4`表示每个像素占4 bit（半个字节），`GZFImageFormat.L8`表示每个像素占8 bit（一个字节）。根据这个结构，我可以提取出字库中的所有字符图片，并用Python脚本导出。完整的文件结构可以参考[更新后的脚本](https://github.com/Xzonn/LuigiMansion/blob/master/scripts/gzf.py)。我也测试了修改图片和包含字符的数量，发现可以正常显示，说明我之前的推测可能是错误的（或许是我当时的导入脚本没有修改某些变量？）。

## 汉化预览
{% include figure.html src="9f9902a4bc809b069f20954f9b71a0e6.png" alt="标题界面" width="400" height="480" %}

{% include figure.html src="03fa9bfb435915290a85a935650dbd04.png" alt="选择存档界面" width="400" height="480" %}

{% include figure.html src="cbda96053ce9b31ae627b27992b5ff5b.png" alt="存档操作界面" width="400" height="480" %}

{% include figure.html src="149a4d3e85f46f847d176841a4dafc77.png" alt="游戏界面" width="400" height="480" %}

{% include video.html aid="45332875" page="1" %}

## 汉化进度
- 2018-10-12：
  - 开始项目，尝试汉化北美发行版，但因问题太多而搁置。
- 2018-11-11：
  - 尝试汉化日本发行版。
- 2018-12-02：
  - 日版文本、字库问题得到一定程度解决，交由组长VLSMB后续分配任务。
- 2018-12-05：
  - 发布[开坑说明／日文翻译招募贴](https://tieba.baidu.com/p/5969451467)。
- 2019-01-08：
  - 标题图片问题解决。
- 2019-02-15：
  - 字库问题基本解决。
- 2019-03-04：
  - 发布机翻汉化预览视频。
- 2019-03-16：
  - 发布汉化预览兼通关流程视频：开始游戏、探索区域１。
- 2019-03-22：
  - 发布汉化预览兼通关流程视频：探索区域２。
- 2019-03-24：
  - 发布汉化成果。

## 致谢
* 感谢[IcySon55](https://github.com/IcySon55)的[Kuriimu](https://github.com/IcySon55/Kuriimu)项目及该项目的贡献者。
* 感谢超巨星汉化组的组长VLSMB及本汉化组的所有成员。
