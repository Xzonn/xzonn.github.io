---
date: 2025-06-12 21:02
info: 没研究出来如何让Premiere Pro导出Full色彩范围的视频。
last_modified_at: 2025-06-12 22:21
tags: 杂记
title: Premiere Pro中的颜色范围（Color Range）的失败记录
---
最近我做视频一直在用Premiere Pro + Voukoder Pro的组合，一直没发现问题，直到我今天做了一个白色背景、黑色文字的视频导出后，才发现视频有很严重的偏色。右键打开视频一看，色彩范围是Limited而不是Full，这就导致了视频的色彩范围被压缩，白色（255）变成了灰色（235），黑色（0）变成了灰色（16）。于是，我就开始寻找解决方法。

{% include figure.html src="c03d1247ce2552f1af5f44e4b04c7770.webp" width="640" height="180" alt="原图（左）与导出后的视频截图（右）颜色对比" %}

## 检查Voukoder Pro的设置

先介绍一下[Voukoder Pro](https://www.voukoder.org/)，这是一个导出视频和音频的工具，可以与Premiere Pro等视频编辑软件配合使用。它支持多种编码格式和导出选项。相较于Premiere Pro自带的导出功能，Voukoder Pro提供了更多的自定义选项。

我所用的编码设定是NVENC AV1，因为我现在所用的显卡支持AV1硬编码。在Voukoder Pro的设置中，我强制设置了输入的色彩范围为“Full”，按理来说应该是没问题的才对。

{% include figure.html src="fd3d0a6cdaf0c63a8943c0c1938f9667.webp" width="379" height="444" alt="Voukoder Pro视频输入设置" %}

难不成是NVENC AV1的编码器设置有问题？然而我在NVENC AV1的设置中并没有找到与色彩范围相关的选项。我甚至用IDA Pro查看了一下Voukoder Pro的二进制文件，发现它并没有直接处理色彩范围，而是将色彩范围的设置传递给了FFmpeg。在配置文件（`%LOCALAPPDATA%\VoukoderPro\scenes.json`）种有如下设置：

``` json
{
  "rc": "constqp",
  "qp": 23,
  "g": 60,
  "bf": 0,
  "multipass": 2
}
```

这些参数是直接传给FFmpeg的，而FFmpeg的色彩范围设置是通过`-color_range`参数来控制的。Voukoder Pro并没有在配置文件中显式设置这个参数。既然如此，我就尝试在Voukoder Pro的设置中添加`"color_range": "full"`，然后重新导出视频。结果很意外，虽然视频的色彩范围变成了“Full”，但是偏色更严重了：

{% include figure.html src="dec6c48c159aa5959d4608692035020e.webp" width="320" height="180" alt="手动添加参数之后的视频截图" %}

白色从255变成了218，黑色从0变成了30，显然这应该是又经历了一次色彩范围的压缩。这是怎么回事呢？

## 检查Premiere Pro的设置

既然如此，试试Premiere Pro自带的导出功能吧。我使用了Premiere Pro自带的HEVC编码，勾选了“以最大深度渲染”“使用最高渲染质量”，配置文件选择了“主配置 10”，色彩空间选择了“Rec. 709”。导出设置中并没有找到色彩范围的选项。打开导出后的视频，发现偏色问题解决了，然而色彩范围仍然是“Limited”。

{% include figure.html src="fe0ee00d2c2fb8bccc0bf7f572ccb2b6.webp" width="320" height="180" alt="使用Premiere Pro自带的HEVC编码器导出的视频截图" %}

这下看明白了，Premiere Pro输出的视频流的色彩范围就是“Limited”，如果强制在Voukoder Pro中设置为“Full”，反而会导致色彩范围被压缩。将视频输入中的色彩范围设置为“Auto”并删去手动添加的参数之后，视频偏色问题解决了，但色彩范围还是“Limited”。

我尝试用Google搜索、ChatGPT和DeepSeek等AI工具提问，都没有找到能让Premiere Pro导出“Full”色彩范围视频的解决方案。

## 结语

目前看来，Premiere Pro导出的视频色彩范围只能是“Limited”，如果需要“Full”色彩范围的视频，可能需要使用其他工具或编码器。Voukoder Pro虽然提供了更多的自定义选项，但受限于Premiere Pro提供的视频流，它在处理色彩范围时似乎并没有提供足够的灵活性。
