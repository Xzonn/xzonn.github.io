---
date: 2023-02-24 21:43
head_image: 218a17f49457714e7dcc6e5c563ccf94.webp
info: 夏日重现。
last_modified_at: 2024-04-15 00:45
links: 
- - https://summertimerendering.mages.co.jp/game/
  - 游戏官网
- - https://github.com/Xzonn/STRAHChsLocalization
  - 汉化相关代码
tags: Switch 汉化笔记
title: 《夏日重现 Another Horizon》文本汉化笔记
---
<div class="alert alert-success" markdown="1" style="text-align: center; font-size: 150%;">
**[汉化发布页](https://xzonn.top/STRAHChsLocalization/)**
</div>

去年看完了《夏日重现》的动画，也很早就知道本作要有改编的Switch/PS4平台文字冒险游戏，但是不用想也知道一定是没有中文的。于是在游戏发售后，我开始琢磨怎么汉化。

<div class="alert alert-warning" markdown="1">
**注意：本文介绍的内容仅用作技术交流，汉化方式为重定向补丁，请支持正版。**
</div>

## 字体
{% include figure.html src="d6ae46d8399a484aab8c60160b90b76d.webp" alt="romfs的文件结构" %}

拆开游戏一看，“Data”“StreamingAssets”几个文件夹直接蹦了出来，一看就知道是Unity做的游戏。字体文件可以很快从`Data/level1`和`Data/StreamingAssets/Switch/AssetBundles/data/fonts.unity3d`文件中找到，拿[AssetStudio](https://github.com/Perfare/AssetStudio)看了一下，没有用TextMesh Pro插件，而是直接把2个otf文件（分别是同一字体的两个字重）打包进去了。于是很容易就想到拿中文字体替换掉，但是AssetStudio只能导出不能导入，因此换用另一个工具[Asset Bundle Extractor](https://github.com/SeriousCache/UABE)（UABE）导入。

首先处理的是`fonts.unity3d`文件，没想到UABE打不开它，可能是太久没更新不支持最新的文件格式。于是我只好找出来之前搞火纹结合用的工具，先把`CAB-...`这个文件提取出来，再拿UABE打开，替换完之后再导入回去。这个工具只能处理bundle文件，被我扔到GitHub上[开源](https://github.com/Xzonn/BundleHelper)了。

在替换字体文件的时候，出了点小插曲。我发现替换字体后游戏会卡在初始界面，说明是打包后的文件有问题。在经过漫长的测试后，我发现这两个字体的总大小必须和原来两个字体的总大小完全一致，大了小了都不行。小一点的字体文件倒是可以在最后补0解决问题的，但比它大的字体文件就不好办了。因为游戏里有“澪”这个字，一些只有“简体”字库的字体不支持显示。最终我选了几千个常用字，找了个大字符集字体做了个子集化字体导入进去了。

这个问题直到之后我才解决——我发现用我自己的打包工具创建的新文件无法被AssetStudio读取，通过不断打断点才发现，打包替换包含文件的时候我忘了更新文件大小，导致文件大小不一致……最终我通过[加了一行代码](https://github.com/Xzonn/BundleHelper/blob/master/BundleHelper/BundleWriter.cs#L216)解决了问题。

## 文本
首先想到文本在Unity的文件里，但是计数后发现数量太少，支撑不起一个文字冒险游戏。于是继续寻找，找到了`Data/StreamingAssets/scrpt.cpk`这个文件。这个文件是[Criware](https://www.cri-mw.co.jp/)的打包格式，可以拿[CriPakTools](https://github.com/wmltogether/CriPakTools)解包和打包。但是实际测试下来打包之后的文件游戏无法读取，检查了代码之后猜测是补齐方式有问题，因此我[fork了一份](https://github.com/Xzonn/CriPakTools)修改了代码，总算是能用了。

解包后发现里面有很多文件，但是都是加密的，看起来不是很好处理。拿文本编辑器打开之后长这样：

``` text
.bmEHM..[.RO<hbOGE..*(*:XXEI;<HOGEJ- (i.YMKhbOGE..*(*:YYEI;<HOGEJ- (i._MjoHO:I;<HOE...E_.meeGEHOE'qiX]S:*_EI;<HOGEJ- :..Z0&UJCjo..HOE'/0VU.i*_EhbOG8.;bOGG
..G..3bmEHOGGsq7_WU7.WG.;bOGEHM""i.X_8$YMKh<.HOGG-(8U..7.WGeeGEk.eeGEJ.....H4joHOGE.~,=EIeeGE..J') JCjo..HOE71:EI;<HOGEJ:4,.;bOG8DbmE.....e.M]Em;bOGEH.jo..HOGEJ...S.ROE6+=86bw:;EIeeGE..HOE....G..XbmEHOG..;bOGEH.jo..HOGEJ...S.ROE6+=8)ie<0/!:0WU.i:*41)=3G.;bOGEHOGGZ_.
E_H\jo..HO.IeeGE...bmEHOGE....
```
{% include figure.html src="edce9bad2762b3bb7214bd6825b368fa.webp" alt="scrpt.cpk中的文件" width="444.5" height="237.5" %}

可以看出来有些结构是重复出现的，例如`HOGE`；但是并不知道该如何解密，于是这件事暂时搁置了。直到我用Google搜索“scrpt.cpk”，发现了一个名为“[YC_English](https://github.com/Thesola10/YC_English)”的项目——这个项目是外国友人搞的《[摇曳露营△ Have a nice day!](https://game.mages.co.jp/yurucamp/)》的英文化项目，看了下代码，无论是文件结构还是命名方式都很像，加上这两部作品都是MAGES.发行的，不难猜测应该是用了同一种加密方式。果然，加密方式是按位异或，核心代码如下：

``` python
# From: https://github.com/Thesola10/YC_English/blob/master/inucode.py
def repeated_key_xor(infile, outfile, key):
    inf = open(infile, "rb+")
    pt = inf.read()
    len_key = len(key)
    encoded = []

    for i in range(0, len(pt)):
        if pt[i] == key[i % len_key]:
            encoded.append(pt[i])
            continue
        else:
            encoded.append(pt[i] ^ key[i % len_key])
```

用来异或的key是`hogehoge66`，我用这个方式试着解密了一下，得到了可读的json文件：

``` json
{
  "bgm": [
    "BGM_07",
    "BGM_11",
    "BGM_16",
    "BGM_17"
  ],
  "bgp": [
    "BG_024_B0",
    "BG_102_A0",
...
```

看来这个key是祖传的。至于为啥用这个key，查了一下，[似乎是日本程序员测试的时候喜欢用“hoge”命名。](https://nlab.itmedia.co.jp/nl/articles/1506/19/news043.html)于是剩下的步骤就是从json文件里解析出来需要翻译的文本然后处理了。

关于这个加密方式，我后来又找到了新的突破口。在我终于想起来看一下片尾动画之后，我发现本作的开发商叫做[vridge](https://www.vridge.co.jp/)，官网上还挂着本作和《摇曳露营△ Have a nice day!》的介绍，这下没错了。而他们还开发过一些为数不多的Windows游戏，比如一个叫“[Our Battle Has Just Begun!](https://store.steampowered.com/app/1833730/)”的他们自己发行的小游戏。去[SteamDB](https://steamdb.info/depot/1833731/)上查了一下，果然文件名和文件结构也是类似的。而这个游戏没用[il2cpp](https://zhuanlan.zhihu.com/p/19972689)，这样就能直接喂给[ILSpy](https://github.com/icsharpcode/ILSpy)了。喂出来一看，果然是异或加密，核心代码如下：

``` csharp
public static void Decrypt(byte[] buffer, int offset, int count, string szPassword)
{
    byte[] bytes = Encoding.UTF8.GetBytes(szPassword);
    if (bytes == null || bytes.Length == 0)
    {
        return;
    }
    int num = bytes.Length;
    for (int i = offset; i < offset + count; i++)
    {
        byte b = bytes[i % num];
        if (buffer[i] != 0 && buffer[i] != b)
        {
            buffer[i] ^= b;
        }
    }
}
```

对比前面的python代码，发现python代码其实没有处理`pt[i] == 0`的情况。但实际上如果`pt[i] == 0`，解密后的代码也会有一个`0x00`字节，这样的话json文件就会出现解析错误，所以这个判断确实可以忽略。

（2024-04-14更新）其实我在翻译完了上面的这些文本之后发现还有一些文本是日文，而且这些文本会以我导入的字体显示，说明不是图片形式的文本。我猜测这些文本是硬编码在了可执行文件中，于是开始在exefs里寻找，可是找了半天也没找到。最后才发现——嘿！这文本确实是硬编码的，但是不在exefs里，而在我一直忽略的`global-metadata.dat`这个文件里。文件结构也不难，可以参考[Il2CppDumper](https://github.com/Perfare/Il2CppDumper)的代码。这个文件里包含了很多信息，但我其实只需要里面硬编码的文本，简单处理一下就好了。

## 机翻
导出文本之后，还要对文本进行翻译。粗略算了一下，需要翻译的文本大概有42万个字符（VS Code数据），全靠人工翻译不太现实，就需要用到机翻了。关于机翻的方式我在[另一篇文章]({% link _posts/2023-03-29-Paranormasight-Translation.md %})中已经提过，这里就不重复了。

{% include figure.html src="26f1c19f4094a37e30e3c33c30ff4d91.webp" alt="导入后的效果" %}

与之类似，《摇曳露营△ Have a nice day!》也能用这种方式来翻译，不过我没接触过《摇曳露营△》这部作品，这个项目就留给各位读者了。

## 图片
（2024-04-14更新）关于图片形式的文本，我一直没研究，一方面是技术方面的问题，另一方面是因为人名太多，也不方便搞成批处理脚本。

关于技术问题，原本的AssetStudio读取本作的一些图片会出现问题，显示出的事带有杂色块的图片，而UABEA则能够正常读取。我分析了UABEA的代码，发现他们对Nintendo Switch平台的图片做了[特殊处理](https://github.com/nesrak1/UABEA/blob/239a112cc31cb46f9da235471a7b4d74894640fb/TexturePlugin/Texture2DSwitchDeswizzler.cs)，这似乎是Switch平台的Unity游戏特有的图片处理方法。于是我把这部分代码[移植回了AssetStudio](https://github.com/Xzonn/AssetStudio/commit/863ed0c499ad131166bf5c14b6b2f728d3f8d1cb)，发现确实能够正常读取图片了。

另外，对于Sprite的处理，实际上是对Texture2D画了一个矩形边界，根据矩形边界读取对应的图片。因此如果要修改Sprite，只需要根据边界修改Texture2D的内容即可。

至于人名太多，这个我懒得处理了，反正我也通关了，如果有人感兴趣修改这些图片的话可以联系我。
