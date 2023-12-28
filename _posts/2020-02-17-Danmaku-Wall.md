---
date: 2020-02-17 19:48
info: 宗旨：让使用电脑全屏演示的老师能够与同学们实时互动。
last_modified_at: 2020-08-02 11:24
tags: 作品发布 技术指南
title: 酷Q 弹幕墙插件
wechat_link: https://mp.weixin.qq.com/s/kskgb-AIWp0rVEEhn3i4KA
---
<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：酷Q服务已停止。本文仅做留档用。</p></div>

## 前言

今天（2020/02/17）是北大2020年春季学期开学的日子，由于疫情影响，大部分课采取了网络教学的方式。但我在上课的时候发现，当老师全屏演示的时候，他将无法及时看到同学们情况的反馈。正好我想到我曾经开发过的酷Q弹幕墙插件，而且上学期结束时也有老师问我能不能在这学期开课的时候尝试用弹幕墙增加同学们的互动热情，因此我在今晚略微修改了一下代码以适应教学需求，同时写下这篇文档帮助想要使用的老师快速掌握用法。

{% include figure.html src="7440dcaa115def87d2f67498b7d8c5de.png" alt="弹幕墙预览" width="640" height="360" %}

## 准备工作

- 本插件基于酷Q，这是一个与QQ相关的软件，因此使用者需要先[注册一个可以正常使用的QQ号](https://zc.qq.com/chs/index.html)。为降低风险，可以注册一个新的账号专门供弹幕墙使用。
- 在手机或电脑的QQ或TIM软件上，设置验证方式为“允许任何人”或“需要正确回答问题”。
  - 手机QQ的设置方式：“设置”→“隐私”→“加我为好友时的验证设置”→“允许任何人”或“需要正确回答问题”。
  - 电脑QQ的设置方式：“设置”→“权限设置”→“防骚扰”→“请选择适合你的验证方式”→“允许任何人”或“需要正确回答问题”。
- *（可选）创建一个QQ群，所有发送弹幕者加入该群，并记住群号。*

## 下载地址

- 北大网盘：<https://disk.pku.edu.cn/link/2B5DA42DFCC428E28A24D6857E65B18D>。
- GitHub：<https://github.com/Xzonn/DanmakuWall/releases/latest/>。（仅包含插件）

如果您之前**没有使用过**酷Q，可以直接从北大网盘下载“弹幕墙（已包含酷Q）.zip”文件，解压后即可使用。

如果您之前**使用过**酷Q，可以仅下载插件，并按照压缩包中的说明将插件保存在相应位置。

## 使用方式

### 1. 打开插件

{% include figure.html src="ec5600ec1bb076b8952116bf3f724493.png" alt="应用管理页面" width="595" height="453" %}

将压缩包解压，双击“酷Q Air”文件夹下的“CQA.exe”运行程序，输入QQ号和密码登录。

登录成功后，右键单击右下角任务栏的“酷Q Air”图标（![酷Q Air\|none](9c5c16e5a127a8aaaaf72bf79faebe0d.png)），选择“应用”→“应用管理”。

在弹出的窗口中选中“QQ 弹幕墙”（未开启时应为灰色），然后在右侧选择“启用”。

*（此处建议将其它插件均设为“禁用”，以防冲突。）*

如果屏幕上方飘过“弹幕墙已经开启！”，说明开启成功。

如果软件卡死，请尝试删除配置文件，或重新下载本插件。

### 2. 设置

{% include figure.html src="37ce589316b8676c6e7ec9e2ffd2e918.png" alt="设置页面" width="382" height="277" %}

在右侧的“菜单”→“设置”中可以设置管理员（输入QQ号）、需要显示弹幕的QQ群（QQ群号）、是否显示图片、是否显示昵称，也可查看帮助文档。

目前管理员的权限仅有显示、关闭、清屏三种。输入指令的方式为“# *＜指令＞*”，如：

```
# 显示
# 关闭
# 清屏
```

如果设置了需要显示弹幕的QQ群，那么该群中的所有信息都会被显示出来。

### 3. 发送者使用方式

有两种使用方式：

- 直接向弹幕墙开启的QQ号发送私信。
- 在上述第2步设置的QQ群中发送消息。

## 其它

本插件基于[酷Q](https://cqp.cc/)，及其开发SDK：[Native.Framework](https://github.com/Jie2GG/Native.Framework)。

本插件开放源代码，地址：<https://github.com/Xzonn/DanmakuWall>。

如有使用方面的问题，可在本页面下方的[留言区](#xz-content-comment)中留言，或在GitHub上[提交Issue](https://github.com/Xzonn/DanmakuWall/issues)。

<div class="alert alert-danger" role="alert"><p><strong>提醒</strong>：酷Q服务已停止。本文仅做留档用。</p></div>