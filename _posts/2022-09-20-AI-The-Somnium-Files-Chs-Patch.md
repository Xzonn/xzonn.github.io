---
date: 2022-09-20 14:01
head_image: https://s2.loli.net/2022/09/27/4k8qK3Iyl7XETAN.jpg
head_image_height: 1695
head_image_width: 1924
info: 用简体中文的字形游玩官方繁体中文的游戏。
last_modified_at: 2022-10-24 23:18
logs: 
- 2022-10-24：更新自动化实现的简单说明。
tags: 作品发布 技术指南
title: 《AI：梦境档案》简体中文字体替换补丁
---
<div markdown="1" style="text-align: center; font-size: 150%;">
**[百度网盘链接](https://pan.baidu.com/s/1eRwH9p6eIArFemHcDQ90CQ)（提取码：aisf）**
</div>

## 前言
《AI：梦境档案》有官方繁体中文而没有官方简体中文，虽然也能看懂，但有时候也会有些字不认识，因此想到可以通过替换游戏内字体文件的方式来实现“伪·简体中文”：也就是把繁体中文的字形换成简体中文的字形，而对应的码位不变，即“繁体源码、简体显示”。

由于技术和精力有限，仍有部分图片形式的繁体中文字符没有替换，基本不影响剧情理解。同时，由于仅仅是替换了字体而没有替换文本，简体中文与繁体中文用语存在差异的内容会被保留。

**2022-09-23更新（2.0版本）**：修改了部分字体，修正了部分字符错位的情况；改用自制的补丁工具以同时兼容微软商店（Microsoft Store）版本和Steam版本。

**2022-10-05更新（3.0版本）**：参考其乐论坛 [@weiyun](https://keylol.com/suid-213219) 大佬的帖子（<https://keylol.com/t810311-1-1>），修改了部分用词，以更贴合简体中文语境。

**使用方法**：打开补丁工具，选择游戏所在的文件夹，然后选择“应用补丁”。

**禁止商用。转载请保留作者名（Xzonn）、本页链接及以上说明。**

{% include video.html bvid="BV1At4y1P7B7" %}

## 实现方法
### 文件导出
本作使用了[Unity](https://unity3d.com/)引擎，因此可以用[AssetStudio](https://github.com/Perfare/AssetStudio)或[UABE](https://github.com/SeriousCache/UABE)（Unity Asset Bundle Extractor）提取游戏资源文件。不过AssetStudio不能将修改过的文件重新导入回原始资源文件，因此之后的操作中主要使用UABE，而AssetStudio则用作查看字体的贴图。

在资源文件中，很容易找到字体文件的路径为：`AI_TheSomniumFiles_Data/StreamingAssets/AssetBundles/StandaloneWindows64/fonts`。使用UABE打开后首先提示该文件被压缩，需要解压缩。解压后打开可以发现，其中包含了两个文件：`CAB-f862fe844235967e981e152eea7ad062`、`CAB-f862fe844235967e981e152eea7ad062.resS`。前者包含了Assets（资产）的文件结构及其主要内容，后者包含了Texture（材质）的资源。

分析Assets文件结构发现，每个字体都包含了3个文件，即1个MonoBehaviour（单一行为，此处可理解为字体的定义文件）、1个Material（材料）、1个Texture2D（2D材质）。测试后发现Material无需修改，只需导出MonoBehaviour和Texture2D即可。使用UABE自带的Export Dump功能可导出为json文件。

{% include figure.html src="fe1c1d7002029868e1eece11abd86dc8.png" alt="使用UABE打开fonts文件" width="676" height="422.5" %}

首先分析MonoBehaviour。筛选了前文得到的MonoBehaviour，去除掉日文字体和不包含中文文字的文件，得到29项：

``` text
dft_b5#26.asset-CAB_f862fe844235967e981e152eea7ad062--3361429164030892843.json
dft_b5#30.asset-CAB_f862fe844235967e981e152eea7ad062--4355910184992745866.json
dft_b7#24.asset-CAB_f862fe844235967e981e152eea7ad062--6047518436597869575.json
dft_b7#26.asset-CAB_f862fe844235967e981e152eea7ad062-7936785455451375190.json
dft_b7#28.asset-CAB_f862fe844235967e981e152eea7ad062--8170225940684350813.json
dft_b7#30.asset-CAB_f862fe844235967e981e152eea7ad062-5407504514241869484.json
dft_b7#50.asset-CAB_f862fe844235967e981e152eea7ad062-8384263393322420190.json
dft_hf3#24.asset-CAB_f862fe844235967e981e152eea7ad062-4863943044767706056.json
dft_hf3#26.asset-CAB_f862fe844235967e981e152eea7ad062-5476177434847178638.json
dft_hf3#36.asset-CAB_f862fe844235967e981e152eea7ad062-4567338084056147488.json
dft_hf3#42.asset-CAB_f862fe844235967e981e152eea7ad062--4016366452013596102.json
dft_hf3#48.asset-CAB_f862fe844235967e981e152eea7ad062-1880520068846167386.json
dft_n3#60.asset-CAB_f862fe844235967e981e152eea7ad062--4440016187044779938.json
dft_r3#24.asset-CAB_f862fe844235967e981e152eea7ad062-5976280438868969006.json
dft_r3#28.asset-CAB_f862fe844235967e981e152eea7ad062-1939100146168758046.json
dft_r3#30.asset-CAB_f862fe844235967e981e152eea7ad062-7277988734504662905.json
dft_r3#32.asset-CAB_f862fe844235967e981e152eea7ad062-5655890657774999066.json
dft_r3#40.asset-CAB_f862fe844235967e981e152eea7ad062-1753701667319609149.json
dft_tx3#40.asset-CAB_f862fe844235967e981e152eea7ad062-2093448914096152843.json
dft_zy5#120.asset-CAB_f862fe844235967e981e152eea7ad062--3489376512864417562.json
dft_zy5#35.asset-CAB_f862fe844235967e981e152eea7ad062--6998899465224161238.json
dft_zy5#36.asset-CAB_f862fe844235967e981e152eea7ad062--1594231637563651247.json
dft_zy5#38.asset-CAB_f862fe844235967e981e152eea7ad062-2572855806901824804.json
dft_zy5#48.asset-CAB_f862fe844235967e981e152eea7ad062--6923704172224664348.json
dft_zy5#49.asset-CAB_f862fe844235967e981e152eea7ad062-1282500139198380118.json
dft_zy5#59.asset-CAB_f862fe844235967e981e152eea7ad062-2351751605974238604.json
dft_zy5#70.asset-CAB_f862fe844235967e981e152eea7ad062-8728989180979062597.json
investigation.asset-CAB_f862fe844235967e981e152eea7ad062--4099891622051165189.json
ui.asset-CAB_f862fe844235967e981e152eea7ad062--8527428372681959288.json
```

其中重要的部分如下：

``` json
{
        "0 FaceInfo m_fontInfo": 
        {
            "1 string Name": "DFHeiMedium-B5",
            "0 float PointSize": 26,
            "0 float Scale": 1,
            "0 int CharacterCount": 464,
            "0 float LineHeight": 26,
            "0 float Baseline": 0,
            "0 float Ascender": 20.875,
            "0 float CapHeight": 0,
            "0 float Descender": -5.1875,
            "0 float CenterLine": 0,
            "0 float SuperscriptOffset": 20.875,
            "0 float SubscriptOffset": -3.42773438,
            "0 float SubSize": 0.5,
            "0 float Underline": -3.42773438,
            "0 float UnderlineThickness": 1.26953125,
            "0 float strikethrough": 0,
            "0 float strikethroughThickness": 0,
            "0 float TabWidth": 130,
            "0 float Padding": 5,
            "0 float AtlasWidth": 1024,
            "0 float AtlasHeight": 1024
        },
        "0 PPtr<$Texture2D> atlas": 
        {
            "0 int m_FileID": 0,
            "0 SInt64 m_PathID": "-1036945409226832550"
        },
        "0 TMP_Glyph m_glyphInfoList":  {
            "0 Array Array": [
                {"0 TMP_Glyph data": 
                {
                    "0 int id": 10,
                    "0 float x": 6,
                    "0 float y": 1029,
                    "0 float width": 0,
                    "0 float height": 0,
                    "0 float xOffset": 0,
                    "0 float yOffset": 0,
                    "0 float xAdvance": 26,
                    "0 float scale": 1
                }},
                {"0 TMP_Glyph data": 
                {
                    "0 int id": 13,
                    "0 float x": 6,
                    "0 float y": 1029,
                    "0 float width": 0,
                    "0 float height": 0,
                    "0 float xOffset": 0,
                    "0 float yOffset": 0,
                    "0 float xAdvance": 26,
                    "0 float scale": 1
                }},
                ...]}}
```

可以明白`m_fontInfo`部分是字体信息的定义，`atlas`部分是字体对应的Texture2D的路径，`m_glyphInfoList`部分则是字体包含的字符码位（`id`），以及字符在Texture2D中显示的位置、大小。首先想到了可以直接截取Texture2D找到对应的字符，但是我尝试了很久都没有找到准确的规律。于是想到新办法：直接安装一个Unity，然后生成字体并替换。

关于Texture2D文件，导出的json文件类似于如下代码：

``` json
{
    "0 Texture2D Base": {
        "1 string m_Name": "DFT_B5#26-tex",
        "0 int m_ForcedFallbackFormat": 4,
        "1 bool m_DownscaleFallback": false,
        "0 int m_Width": 512,
        "0 int m_Height": 1024,
        "0 int m_CompleteImageSize": 524288,
        "0 int m_TextureFormat": 1,
        "0 int m_MipCount": 1,
        "1 bool m_IsReadable": false,
        "0 int m_ImageCount": 1,
        "0 int m_TextureDimension": 2,
        "0 GLTextureSettings m_TextureSettings": {
            "0 int m_FilterMode": 1,
            "0 int m_Aniso": 1,
            "0 float m_MipBias": 0,
            "0 int m_WrapU": 0,
            "0 int m_WrapV": 0,
            "0 int m_WrapW": 0
        },
        "0 int m_LightmapFormat": 0,
        "0 int m_ColorSpace": 0,
        "1 TypelessData image data": [],
        "0 StreamingInfo m_StreamData": {
            "0 unsigned int offset": 262144,
            "0 unsigned int size": 524288,
            "1 string path": "archive:/CAB-f862fe844235967e981e152eea7ad062/CAB-f862fe844235967e981e152eea7ad062.resS"
        }
    }
}
```

可以明白`m_Width`和`m_Height`分别是Texture2D图片的宽度和高度，`m_StreamData`则是原始数据在resS文件中的位移量（`offset`）和大小（`size`）。此处的`size`恰好等于`m_Width`×`m_Height`，即每个像素点一个字节，很容易联想到这代表了图片Alpha通道的值。通过使用Python处理并与AssetStudioGUI导出的图片比对发现，像素点保存的顺序是从左到右、从下到上，也即x方向正常，y方向反转。

### 重新生成
在走了许多弯路后，最终我发现本作的字体都是由[TextMesh Pro](https://docs.unity3d.com/Packages/com.unity.textmeshpro@1.2/manual/index.html)插件生成的。本作使用的Unity版本是2017.x版本（版本号可以通过AssetStudioGUI打开Assets文件后从标题栏得到），我找到了这一版本的[安装说明](https://forum.unity.com/threads/useful-information-download-links.458634/)，但链接已经失效。尝试升级到Unity 2018.x版本（我使用的是最新版2018.4.36f1），结果自带的TextMesh Pro版本（1.4.2）导入到游戏中后不兼容（关于“不兼容”的解释见下文）。根据安装说明中的内容猜测，本作的TextMesh Pro版本为1.2.x，因此尝试在Package Manager中降级到1.2.4版本，竟然成功了！

使用Unity新建一个项目，导入字体。前文得到的29个文件中的字体均以“DF”命名，即[华康](https://www.dynacw.com.tw/)公司的字体，列表如下：

``` text
DFHeiBold-B5
DFHeiMedium-B5
DFHsiuW3-B5
DFLiSong-Lt
DFTieXianW3-B5
DFYuanLight-B5
DFZhouXing W3
DFZongYiW5-B5
```

使用字形接近的简体中文字体替换掉对应的字体。

各文件中包含的字符码位用Python提取后转换为Unicode字符，并用[繁化姬](https://docs.zhconvert.org/api/convert/)提供的API进行简繁转换。因为部分码表中包含了假名，会被繁化姬识别为日文字符，因此需要在API的参数中指定忽略日文；同时注意到一些字符属于异体字或外文标点，因此在使用繁化姬转换后仍需手动转换一些字符。API的传入参数类似于：

``` python
{
  "text": text,
  "converter": "Simplified",
  "modules": json.dumps({
    "*": 0,
  }),
  "jpTextConversionStrategy": "none",
  "jpStyleConversionStrategy": "none"
}
```

有了字体和码表，就可以用Unity的TextMesh Pro生成新的MonoBehaviour和Texture2D了。选择“Window”→“TextMeshPro”→“Font Asset Creator”，选择字体和码表，然后指定材质的长宽。此处发现部分文件的长宽出现了“768”和“3072”这种不在列表中的值，推测是修改了Unity项目文件夹下的`Library/PackageCache/com.unity.textmeshpro@1.2.4/Scripts/Editor/TMPro_FontAssetCreatorWindow.cs`文件（第78行起）：

``` cs
private string[] FontResolutionLabels = { "8", "16", "32", "64", "128", "256", "512", "768", "1024", "2048", "3072", "4096", "8192" };
private int[] FontAtlasResolutions = { 8, 16, 32, 64, 128, 256, 512, 768, 1024, 2048, 3072, 4096, 8192 };
```

{% include figure.html src="f982792793631a520b66874951a930c6.png" alt="使用TextMesh Pro生成新的Asset" width="550" height="407" %}

保存生成后的Asset，这个文件可以直接以文本文件形式打开，为yaml格式，其中也包含了`m_fontInfo`等信息：

``` yaml
m_fontInfo:
  Name: DFHeiW7-A
  PointSize: 24
  Scale: 0
  CharacterCount: 94
  LineHeight: 24
  Baseline: 0
  Ascender: 20.625
  CapHeight: 0
  Descender: -3.375
  CenterLine: 0
  SuperscriptOffset: 20.625
  SubscriptOffset: -3.1640625
  SubSize: 0.5
  Underline: -3.1640625
  UnderlineThickness: 1.171875
  strikethrough: 6.2727275
  strikethroughThickness: 1.171875
  TabWidth: 0
  Padding: 5
  AtlasWidth: 256
  AtlasHeight: 512
atlas: {fileID: 28979585569362550}
m_glyphInfoList:
- id: 37
  x: 237
  y: 388
  width: 11.8125
  height: 19.125
  xOffset: 0.0625
  yOffset: 18.1875
  xAdvance: 12
  scale: 1
- id: 40
  x: 39
  y: 151
  width: 5.8125
  height: 22.25
  xOffset: 5.4375
  yOffset: 19.75
  xAdvance: 12
  scale: 1
...
```

同时包含了Texture2D的字节序列：

``` yaml
_typelessdata: 00000000000000000000000000000...
```

于是可以再写一个Python脚本，替换掉之前导出的MonoBehaviour的json文件的对应值，对于每个字符不替换字符码位，只替换x、y、width、height等信息；同时替换掉resS文件中对应的Texture2D原始数据。替换完成后，使用UABE的“Import Dump”功能导入回`AI_TheSomniumFiles_Data/StreamingAssets/AssetBundles/StandaloneWindows64/fonts`文件并替换原文件即可。

（对上文“不兼容”的解释：TextMesh Pro的1.4.x版本与1.2.x版本的字段名不一样，因此无法精确替换，导入后游戏中表现为字符显示不完全。）

但在替换了这一文件后我发现，部分菜单内容的字体被替换了，但对话字体没有修改，仍为繁体中文。

### 进阶操作
进一步研究发现，`AI_TheSomniumFiles_Data/resources.assets`文件中也有字体文件。但与前文的`fonts`文件不同的是，直接用UABE导出`resources.assets`的文件结构不全。用[HxD](https://mh-nexus.de/en/hxd/)查看文件头后发现，`fonts`文件包含了MonoBehaviour的字段名，而`resources.assets`未包含，推测UABE无法推断MonoBehaviour的文件结构而发生导出错误。好在UABE可以直接导出原始数据的bin文件，即“Export Raw”，而将导出的bin文件改名后导入到`fonts`文件替换掉已有的字体，再导出为json，不就可以修改了吗？尝试了一下，真的可以这样做。

`resources.assets`中多包含了2个字体：

``` text
DFFangSongW6-B5
DFYuanW5-GB
```

按照类似的操作生成新的Asset并导入回原游戏，成功！

不过即使替换了`resources.assets`和`fonts`两个文件，仍然有一部分界面是繁体中文，这些字可能是以图片的形式保存的，修改起来比较麻烦，而且不影响主要剧情的阅读，因此不再修改了，有兴趣的读者可以自己尝试。

### 自动化操作
有了完整的工具链，接下来就可以研究一下如何进行自动化操作了。得益于AssetStudioGUI的开源，我可以迅速地了解文件的结构。尽管该软件只有对源文件的解析功能而无法将重新生成修改后的文件，但是通过我个人的分析和简化，将解析步骤逆向操作，便能实现生成功能。具体的文件结构比较复杂，可以参考源代码。

解析得到数据结构后，就可以对字体进行生成和替换了。TextMesh Pro 1.2.x版本使用一个外部dll（`TMPro_Plugin.dll`）生成字体，对应的操作均可以在Unity工程文件夹的cs文件内找到，因此不再赘述。

此外，参考了其乐论坛 [@weiyun](https://keylol.com/suid-213219) 大佬的帖子（<https://keylol.com/t810311-1-1>），游戏中的文本也可以进行解析。由于繁体中文和简体中文的用语有许多差别（例如“網路”→“网络”），因此有必要替换此类文本。文本替换同样需要数据文件的解析，步骤同上。

自动化生成补丁的源代码已公布在GitHub上，请参考：<https://github.com/Xzonn/AITSFChsPatchCreate>。