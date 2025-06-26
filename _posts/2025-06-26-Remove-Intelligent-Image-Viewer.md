---
date: 2025-06-26 23:37
head_image: d02bdc87a357b7626e200ec6c4800256.webp
head_image_height: 567
head_image_shown: false
head_image_width: 1008
info: 删注册表。
last_modified_at: 2025-06-26 23:44
tags: 技术指南
title: 删除某网盘附带的“智能看图”
---
某网盘更新到7.58版本之后附带了一个“智能看图”软件，关联了一堆常见图片格式。这个软件的名字前面加了个空格，所以在默认程序列表里很靠前。目前该网盘里没有删除这个功能的设置，所以需要手动编辑一下注册表，删除以下项目：

```
HKEY_CLASSES_ROOT\BaiduNetdiskImageViewerAssociations
HKEY_CURRENT_USER\Software\Baidu\BaiduNetdiskImageViewer
HKEY_CURRENT_USER\Software\RegisteredApplications\BaiduNetdiskImageViewer
```

程序目录位于该网盘的安装目录内，默认为：

```
%APPDATA%\baidu\BaiduNetdisk\module\ImageViewer
```

不知道一个网盘软件为什么要捆绑一个看图软件，干好自己的事不行吗？另一个网盘甚至直接把客户端捆绑了浏览器，我用Chrome或者Edge不好吗，用你那破浏览器干啥？
