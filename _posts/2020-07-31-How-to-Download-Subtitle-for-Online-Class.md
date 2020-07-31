---
date: 2020-07-31 16:38
info: 把字幕整理起来，就得到了老师上课的文字实录。
last_modified_at: 2020-07-31 18:31
tags: 三次元 技术指南
title: 如何下载网课的字幕
---
<div class="alert alert-info" role="alert"><p><strong>提醒</strong>：本文所述的所有操作均需浏览器支持才能进行。对于一些仅能通过客户端观看的网课，本文的方法不适用。此外，对于在2020年仍然使用Flash播放器的网站，本文的方法也不适用，由于Adobe Flash Player将于2020年12月31日停止支持，因此请尽早停用Flash。</p>
<p>此外，本文使用Google Chrome作为讲解，其他浏览器操作大致相同，不再赘述。</p></div>

## 1 前言

上个学期，由于一场公共卫生事件，许多课程不得不开展线上教学，这也使得“网课”成为了一大话题。有些课程是实时教学，这些课暂时不讨论；而另一些课程则采用了录播的形式，教学内容提前录制好并上传，学生只需要在线学习或者下载学习即可。相比于面对面教学来说，这种录播的形式一般都有三个特点：能够回放，方便复习；能够快进，方便复习；能够调节播放速度，方便复习。

首先先介绍一下网课如何调节播放速度。在浏览器按<kbd>F12</kbd>打开控制台，切换到“Console”，输入如下代码并回车运行：

```javascript
tmp = document.getElementsByTagName("video");
for (let i = 0; i < tmp.length; i++) {
    tmp[i].playbackRate = 16;
}
```

简单解释一下发生了什么。第1行获取页面内所有`<video>`标签，第2到4行循环，第3行将每个标签的播放速度均设为16。16是当前Google Chrome 84.0.4147.105版本支持的最大速度，超过此速度控制台会直接报错。Mozilla Firefox支持的最大速度可能也是16<span class="footnote">参考自[相关源代码](https://dxr.mozilla.org/mozilla-central/source/dom/html/HTMLMediaElement.cpp)</span>，但超过此值不会报错。

这个方法我发到树洞（[#1194483](https://pkuhelper.pku.edu.cn/hole/##1194483)）之后得到了惊人的收藏量。当然，还是要提醒大家切勿贪图快，在16倍速下基本上已经啥也听不出来了。毕竟，网课的最终目的还是学到知识。

## 2 下载

回归标题。网课除了上述三个特点之外，还有一个不常见的优点：网课可以有字幕。有些网课的字幕是内嵌在视频里的，这种情况不讨论；还有些网课的字幕是外挂的，即视频与字幕分离。内嵌的好处是兼容性好，只要视频能播放就能显示字幕；外挂的好处则是方便修改，由于字幕文件比较小，也方便传输。

不同的平台对外挂字幕的处理方式不同，例如智慧树和网易公开课使用了`.vtt`格式，这是一种标准格式，可以直接在常用的播放器中加载。哔哩哔哩、学堂在线则是使用了`.json`格式，这是一种网络传输中常用的数据存储格式，方便网络程序读取，但需要手动处理才能用于播放器。

一般来说，为了方便加载，字幕文件都是单独的文件。如果是直接嵌在网页的HTML中，则可以直接查看网页源代码。对于单独的文件，仍然是在浏览器中按<kbd>F12</kbd>打开控制台，切换到“Network”标签，然后重新加载页面。在该标签下查看各加载项，可以先尝试筛选常见的格式（如`.vtt`、`.json`、`.xml`等）。如果找到了对应的文件，双击文件名可以新窗口打开并下载，如<a class="xref-figure" href="#figure-01fbdf33d6d168d2e365b1d3e982495ac9ebad1611df09b1.png"></a> 所示。

![定位字幕文件](https://file.moetu.org/images/2020/07/31/01fbdf33d6d168d2e365b1d3e982495ac9ebad1611df09b1.png)

另外，一些视频文件也可以通过这种方法下载，只需要查找常见的视频格式（一般是`.mp4`、`.ts`等）即可。

## 3 处理

`.vtt`文件可以直接在播放器中加载，无需再次处理。`.json`文件则需要经过处理，不同平台的文件格式不同，但文件结构大都比较清晰，以学堂在线的字幕格式为例，如<a class="xref-figure" href="#figure-c32c47acadfd648d4d72cde2a59f642d87ec046256405f76.png"></a> 所示，`start`、`end`、`text`分别对应每句话的开始、结束、内容，之后的处理也基于此。

![学堂在线字幕格式](https://file.moetu.org/images/2020/07/31/c32c47acadfd648d4d72cde2a59f642d87ec046256405f76.png)

此处还是用Python，将其处理成`.vtt`格式。随手写一段代码：

```python
#!/usr/bin/python3

import json

def time2Code(time):
    time = int(time)
    h = time // (1000 * 60 * 60)
    m = time % (1000 * 60 * 60) // (1000 * 60)
    s = time % (1000 * 60) // 1000
    ms = time % 1000
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"

with open("filename.json", encoding="utf-8") as f:
    # 此处需要改成输入的 .json 文件的路径
    data = json.load(f)

with open("filename.vtt", "w", encoding="utf-8") as f:
    # 此处需要改成输出的 .vtt 文件的路径
    f.write("WEBVTT\n")
    for i, s, e, t in zip(range(len(data["start"])), data["start"], data["end"], data["text"]):
        f.write(f"\n{i}\n{time2Code(s)} --> {time2Code(e)}\n{t}\n")
```

另外，也可以将字幕文件合并成一个文本文件，这样就得到了老师讲课的文字实录。但是需要注意的是，字幕一般不加标点符号，需要手动添加；此外字幕有时比较口语化，可以根据自己的需要进一步整理。