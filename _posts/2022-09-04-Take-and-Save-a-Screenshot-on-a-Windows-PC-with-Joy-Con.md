---
date: 2022-09-04 15:53
head_image: 72680fb66a9297a84f962648bec1c0fd.jpg
head_image_height: 1080
head_image_width: 1920
info: 一键完成。
last_modified_at: 2022-09-04 21:07
tags: Switch 作品发布
title: 用Joy-Con在Windows电脑上捕获并保存截图
---
简而言之，[JoyConScreenShot](https://github.com/Xzonn/JoyConScreenShot)软件通过调用Xbox Game Bar软件，可以在按下Joy-Con的截图键时捕获当前运行的游戏或软件的截图并保存，或录制之前30秒的视频。

为方便介绍，除非另有说明，本文的“Joy-Con”均同时包含Switch Pro手柄。

## 灵感来源
在Nintendo Switch和Steam平台上都有“一键截图”功能，只需按下Joy-Con手柄或是Switch Pro手柄的“截图”键就可以直接截图并保存下来，非常方便，而Switch上甚至可以长按截图键录制之前30秒的游戏视频。然而最近我接触了Windows电脑上的Xbox游戏（准确来说应该是Microsoft Store应用），却发现这些游戏无法识别Joy-Con手柄和Switch Pro手柄；Steam虽然可以将这些游戏作为“非Steam游戏”添加并启动，但无法像普通的Win32游戏一样映射手柄按键和提供截图功能。

手柄按键映射比较好解决，例如[BetterJoy](https://github.com/Davidobot/BetterJoy)、[XJoy](https://github.com/DuroSoft/XJoy)都可以将Joy-Con映射为一个虚拟的Xbox 360手柄；但截图功能的实现就比较复杂了。虽然Windows 10系统自带了[“截图和草图”](https://apps.microsoft.com/store/detail/snipping-tool/9MZ95KL8MR0L)软件，按`PrintScreen`键就可以调出，但调出后仍需要选择截图范围，无法一键实现“截图&保存”功能，在打游戏的时候非常不方便。

好在，Windows 10系统还包含了一个[“Xbox Game Bar”](https://apps.microsoft.com/store/detail/xbox-game-bar/9NZKPSTSNW4P)软件，默认按`Windows + G`键可以调出，有些类似于Steam的游戏内按`Shift + Tab`调出的界面。这个软件可以通过`Windows + Alt + PrintScreen`键捕获活跃窗口的截图并直接保存，且可以通过`Windows + Alt + G`键录制之前30秒的视频（初次使用可能需要设置）。加上BetterJoy和XJoy都是开源软件，只需要研究一下源代码就可以明白是如何读取Joy-Con的输入并映射成虚拟手柄的。因此想到，可以通过监听Joy-Con的截图键，当截图键按下时间较短时模拟`Windows + Alt + PrintScreen`键捕获截图，按下时间较长时模拟`Windows + Alt + G`键录制视频。

## 解决方案
首先需要了解软件是如何读取Joy-Con的输入的。Joy-Con手柄可以通过蓝牙与Windows电脑连接，然后被识别为HID设备（人体学接口设备）。HID的相关处理使用了[HidLibrary](https://github.com/mikeobrien/HidLibrary)。每个设备均具有制造商ID（Vendor ID）和产品ID（Product ID），而Joy-Con的制造商为任天堂，其制造商ID为`0x057e`，产品ID为`0x2006`（左Joy-Con）、`0x2007`（右Joy-Con）、`0x2009`（Switch Pro手柄）。通过遍历所有HID设备并比对制造商ID和产品ID可以筛选出所有Joy-Con。

Joy-Con的状态可以通过读取设备信息来获取。GitHub上有对Nintendo Switch的逆向分析，名为[“Nintendo_Switch_Reverse_Engineering”](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering)，其中具体介绍了Joy-Con作为HID设备的数据格式及其含义，详情可以[在此链接](https://github.com/dekuNukem/Nintendo_Switch_Reverse_Engineering/blob/master/bluetooth_hid_notes.md)查看。按键的相关数据在标准报告的第4字节的`0x20`（`0b00100000`）位，只需读取这一位的数据即可。另外需要注意的是ID为`0x3f`的报告数据结构与标准报告不同，其按键数据为第2字节。

在获取到按键状态后，就可以模拟Windows的按键了。按键相关处理使用了[WindowsInput](https://github.com/MediatedCommunications/WindowsInput)。根据按键时间的不同，对按键较短（0.8秒以内）的情况视为捕获截图，按下`Windows + Alt + PrintScreen`键；按键较长的情况视为捕获视频，按下`Windows + Alt + G`键。

## 源代码
[JoyConScreenShot](https://github.com/Xzonn/JoyConScreenShot)，按[GPL-3.0](https://github.com/Xzonn/JoyConScreenShot/blob/master/LICENSE.md)授权。