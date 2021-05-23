---
date: 2020-02-02 11:33
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRnuTaCZzkk8vk5TGhAhzR9nUy1iaPNXmBRjjPKuApwQBCcMSibnOEQJpCib1LmEc3N1nLficbnNdBqALlQ/0
head_image_height: 544
head_image_width: 1276
info: Xzonn的技能小讲座第5讲。
last_modified_at: 2020-02-15 14:24
tags: 技术指南
title: 如何获取电子教材？
wechat_link: https://mp.weixin.qq.com/s/QMMHTNPba5_N4OyBoE0d-A
---
## 1

2020年的寒假似乎有些漫长，为了让寒假变得充实，许多同学下定决心在家自学，然而没有教材成为了一大难题。好在，在2020年的今天，无纸化学习并非不可能。

前天（2020/01/31）北京大学学生发展支持（SDS）推出了6篇推送，其中一篇介绍了电子书的获取方法，例如阅读软件、网络资源、国家图书馆等，详见《[云成长，待春归｜叮咚~你收到了一份假期学习资源清单](https://mp.weixin.qq.com/s/_QpfF_0DeHr4otqM6_pqBw)》（顺带一提，这篇推送还介绍了其他学习资源，可以好好阅读一下）。然而，教材类图书毕竟受众较少，很多阅读软件不会提供；一些教材可能在互联网上有非正版扫描pdf资源，但也不很全面。这时就需要求助北大图书馆了。

或许很少有人知道，北大自建了一个数据库，名为“[北京大学电子教参服务平台](http://162.105.138.126/Usp/)”（该平台仅可校内访问，如在校外访问请使用虚拟专用网络），这个平台甚至连个域名都没有，只有一串IP地址。但不管怎么说，里面收录的教材还是很齐全的，截至目前（2020/02/01）共有18,309条检索结果（不同课程推荐的同一书目会被记作多条检索结果），包括了全校32个开课院系（如果我没数错的话）开设的课程，环院共有125条检索结果。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/3d8b86dc663773cca42ecf87eaf61bb96ded5e9d9447427e.png" alt="北京大学电子教参服务平台" width="640" height="360" %}

该平台的使用方法很简单，右上角输入课程或教材的名称搜索，或通过左侧索引目录查找。这里的书目一部分是来自图书馆藏书的扫描版（一些书的封面上甚至可以看到条形码），还有一部分来自北大购买的其他数据库（如“阿帕比数字资源平台”“读秀知识库（超星）”等），均提供在线阅读和“借阅”服务。其中来自其他数据库的图书可能会有目录，扫描版图书基本没有目录。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/92759f4170306cdcc603adf0ed38f728f62fda534f928937.png" alt="在线阅读服务" width="640" height="360" %}

尽管有“借阅”服务，但该服务需要下载特殊软件，且一定时间后还需要重新借阅，似乎有些不太方便。于是我又萌生了通过技术手段把它下载到本地的想法。

## 2

[上篇文章](/posts/How-to-Download-Chinese-Standard.html)我曾经说过：既然是在线阅读，那就一定能获取源文件。

> “Xzonn规则”第一条：只要能用Chrome看的东西都能扒出来源文件和源代码。

由于不同种类的图书在线阅读的网页不同，因此需要通过不同方式分析。

首先是扫描版的图书和阿帕比数字资源平台的图书，两者使用的是同一系统。调出开发者工具重载页面一看，源文件实际是图片，其URL虽然很长，但同一图书不同页面的URL只改变了页码部分。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/1556cab854054179d1b48fa77d2f43a309aad5e0c3e1fd10.png" alt="用开发者工具查看扫描版图书在线阅读页面" width="640" height="260.58" %}

类似如下：

```
http://162.105.138.126/OnLineReader/command/imagepage.ashx?objID=...&pageid=1&ServiceType=...
```

（有省略）可以看出，`pageid=1`即代表了页码。有了这个规律，接下来就是批量下载了，我直接使用了python的requests库实现批量下载：

```python
import re
import requests

BASE_URL = '...';
PATTERN = re.compile(r'(?<=&pageid=)\d+(?=&)');

i = 1;
while True:
    r = requests.get(PATTERN.sub(str(i), BASE_URL));
    if r.ok and len(r.content) > 0:
        with open("%03d.png" % i, "wb") as f:
            f.write(r.content);
        print(i);
        i += 1;
    else:
        break;
```

这里使用了正则表达式，之后我可能会单独写篇文章探讨一下，这里不是重点不再赘述。注意此处使用了`len(r.content) > 0`与否来判断是否超出页码范围，超出范围的部分返回长度为0。

而读秀知识库（超星）平台与上述类似，区别有两处：第一，图片链接多了一步302重定向，因此需要查找原始网址；第二，该平台超出页码范围会返回有错误说明的图片，因此需要修改终点判定方式。此处不再给出代码，读者可自行尝试。

下载下来的一堆图片可以用Adobe Acrobat的“合并文件”功能存为一个pdf文件，然后用“增强扫描”→“识别文本”功能将图片转为可选中的文本，详见[上篇文章](/posts/How-to-Download-Chinese-Standard.html)。另外，可以用“组织页面”→“更多”→“页面标签”功能修改页码，留待之后再说。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/e35fb4644d871f9caa9f00ba4e3d32bc444a5a85127f4c4d.png" alt="合并为一个pdf文件" width="640" height="273.02" %}

## 3

多说几句。北大其实不仅提供了电子教参，还提供了其他中西文电子书资源。在北大图书馆网站的首页就可以看到：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/df0283cbaebf8becc9ecf9ab3f4654b507e04c2a36116923.png" alt="北大图书馆电子期刊／图书导航" width="640" height="360" %}

然而根据我个人的体验，这个检索系统的搜索结果页面似乎很难载入，至少我试了几次还没载入过。因此，我个人建议点击上图“新手指南”中的“中外文电子图书资源简介”，这里盘点了提供中外文电子图书的数据库名称，然后可以直接从各个数据库内检索。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/e2127bc8f1509e13f8c426b2603735b3f28b2bdc55c410aa.png" alt="中外文电子图书资源简介" width="640" height="904.92" %}

例如在“‘读在燕园’”互联网数字图书馆检索“化学”：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/c706d5aead1273b16527b24fa852e34b4f1519da400786aa.png" alt="在“‘读在燕园’”互联网数字图书馆检索“化学”" width="640" height="360" %}

## 4

再多说几句。说实话，北大提供的学习资源不少，但我基本没有了解使用过。我得知教参服务平台的契机是我复习的时候想要查阅教材而没有在网络上找到资源，于是去了图书馆想要借阅纸本，发现纸本封面上写着“有电子版”，询问了工作人员才得知。如果有机会的话，我倒是希望仔细了解一下北大购买了哪些有趣的数据库。

这个寒假我打算多写几篇乱七八糟的文章，自我学习，也帮助大家学习。

## 5

总结一下我今天写了啥：

1. 假期学习资源请参考SDS的推送：《[云成长，待春归｜叮咚~你收到了一份假期学习资源清单](https://mp.weixin.qq.com/s/_QpfF_0DeHr4otqM6_pqBw)》。
2. 北京大学电子教参服务平台提供了许多课程的教材电子资源，可以在线阅读或借阅。
3. 北大还提供了其他丰富的中外文电子图书资源，等待大家探索。