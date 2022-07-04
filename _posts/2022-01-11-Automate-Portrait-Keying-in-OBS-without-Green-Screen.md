---
class: auto-numbering
date: 2022-01-11 09:56
head_image: https://images.xzonn.top/github/92d8a2e6743c175fb8753b2a69fac79b.png
head_image_height: 1141
head_image_width: 1623
info: 利用腾讯会议的“虚拟背景”功能，无绿幕零成本自动抠人像。
last_modified_at: 2022-02-14 17:12
tags: 技术指南
title: 在OBS中不使用绿幕完成自动抠人像
---
在使用[OBS](https://obsproject.com/)直播或录屏的时候，有时会有主播出镜的需求。为了避免人像的背景对视频其他内容产生干扰，自动抠人像便非常有必要。传统的抠人像方法是在人物背后放置一张绿幕，然后使用颜色键将背景去除设为透明，但这需要购买并设置绿幕，比较麻烦。好在，借助[腾讯会议](https://meeting.tencent.com/)等软件的虚拟背景功能，与OBS相结合，可以达到无绿幕零成本自动抠人像的效果。

## 设置腾讯会议
腾讯会议在疫情期间被广泛用作会议、上课等用途，而“虚拟背景”是该软件提供的一个功能，可以自动识别摄像头捕捉到的人物面部，然后去除多余的背景。恰好这一功能是免费的，只需设置一下就可以被OBS所利用。

腾讯会议的安装比较简单，在[官网](https://meeting.tencent.com/)下载后按照说明安装即可。安装完毕后打开，按照提示登录，然后点击初始界面右上角的齿轮图标进入设置，选择“虚拟背景和美颜”，然后自定义图片为纯绿色的图片即可。如果找不到的话，可以用我这张图：

{% include figure.html src="https://images.xzonn.top/github/f13b001cc7b4090cab1c604b01902835.png" alt="纯绿色的图片" width="640" height="360" %}

设置完毕后，就可以在预览画面中看到背景为绿色的人像。

{% include figure.html src="https://images.xzonn.top/github/44eb59803e3d68366ecb66fcdad0b8b4.png" alt="设置完成后的预览效果" width="640" height="553.7" %}

这个视频预览窗口可能无法被OBS正常读取，因此可以使用“快速会议”功能，创建一个只有自己的会议。此时需要打开摄像头（可以不打开麦克风），在窗口中会显示人像和绿色的背景，此时腾讯会议的设置就完成了。

{% include figure.html src="https://images.xzonn.top/github/ac38e47e392037678e8f8d63da699ad0.png" alt="创建快速会议" width="640" height="426.7" %}

为了减少之后的工作量，请尽可能不要开启腾讯会议中其他的功能，以免后续设置OBS时窗口出现问题。同样，请不要让腾讯会议的窗口最小化。

## 设置OBS
OBS的安装也比较简单，同样可以在[官网](https://obsproject.com/)下载然后按照说明安装。初次使用时会弹出安装向导，可以根据自己的需求（直播或是录屏）进行设置。

设置完成后，在左下角的“来源”区添加一个“窗口采集”，然后选择“新建”，命名为自己喜欢的名字。

{% include figure.html src="https://images.xzonn.top/github/6814d83a116a98d3938693e0ff2cf354.png" alt="添加窗口采集" width="640" height="449.9" %}

{% include figure.html src="https://images.xzonn.top/github/9c8ecf15d6f96f2ae2f11760ad28f7d8.png" alt="新建来源" width="532" height="517" %}

在窗口中选择“腾讯会议”，取消勾选“显示鼠标指针”，然后确认。

{% include figure.html src="https://images.xzonn.top/github/568ed120fe967976f819a1e0f49b8e48.png" alt="添加腾讯会议" width="640" height="504.8" %}

为了去除腾讯会议的UI，需要对画面进行裁剪，方法是对OBS预览中的该区域点击右键，选择“变换”→“编辑变换”，然后输入裁剪范围。我推荐的数值是：左右300，上下100。

{% include figure.html src="https://images.xzonn.top/github/58f7513e14e12247f08b11dc5e822d1c.png" alt="选择编辑变换" width="640" height="449.9" %}

{% include figure.html src="https://images.xzonn.top/github/64d3683ed225f2192ef2f7755438b1f3.png" alt="输入裁剪范围" width="640" height="449.9" %}

完成后确认，然后再次右键，选择“滤镜”，添加“色度键”，其默认值即为“绿色”。

{% include figure.html src="https://images.xzonn.top/github/8d8df8884eee574685afcf560916cce8.png" alt="添加色度键" width="640" height="560.5" %}

完成后确认，画布中就会出现包含透明背景的人像了。然后根据需要添加其他源（如显示器采集、窗口采集、视频采集设备）等，即可开始直播或录屏。

{% include figure.html src="https://images.xzonn.top/github/92d8a2e6743c175fb8753b2a69fac79b.png" alt="自动抠人像效果" width="640" height="449.9" %}