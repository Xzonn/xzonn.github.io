---
date: 2024-11-04 15:34
head_image: a0dcbda7806913ed7a5298a44ccd3abd.webp
head_image_height: 324.5
head_image_width: 469
info: 打个补丁。
last_modified_at: 2024-11-05 12:17
links: 
- - https://github.com/Xzonn/NitroPatcher
  - 项目地址
tags: DS 作品发布
title: NitroPatcher：NDS ROM 补丁工具
---
**NitroPatcher**是一个基于[NitroHelper](https://github.com/Xzonn/NitroHelper)的NDS ROM补丁工具。

其实质是通过替换NDS ROM所包含的文件来实现汉化、修改等功能。本工具支持[Xdelta](https://en.wikipedia.org/wiki/Xdelta)补丁。

替代[《宝可梦》第四、第五世代汉化修正工具](https://github.com/Xzonn/PCTRTools)中的补丁应用工具。

## 应用补丁
### GUI（图形化界面）
#### Windows版（WPF）

支持Windows平台。

需要[.NET Framework 4.7](https://dotnet.microsoft.com/zh-cn/download/dotnet-framework/net47)或更高版本的运行时（Runtime）。Windows 10/11应该已经预装了.NET Framework 4.7。Windows 7可能需要安装 [KB976932](https://www.catalog.update.microsoft.com/Search.aspx?q=KB976932)、[KB4503548](https://www.catalog.update.microsoft.com/Search.aspx?q=KB4503548)更新。

根据图形界面的提示操作即可，或者参照[视频教程](https://www.bilibili.com/video/BV1oH1xYXEdb/t=69)。

#### Windows/Android版（MAUI）

[{% include image.html src="https://get.microsoft.com/images/zh-cn%20dark.svg" width="232" height="68" %}](https://apps.microsoft.com/detail/9NPLXRZ04F04?mode=direct)
{: .plainlinks }

支持Windows/Android平台。

Windows平台需从[Microsoft Store](https://www.microsoft.com/store/apps/9NPLXRZ04F04)下载安装，需要Windows 10 17763.0或更高版本。

Android平台理论上最低支持Android 5.0（API 21），但仅在Android 12.0（API 31）上进行了测试。

根据图形界面的提示操作即可。

### CLI（命令行界面）

支持Windows、Linux、macOS平台。

需要[.NET 6.0 运行时](https://dotnet.microsoft.com/zh-cn/download/dotnet/6.0)（Runtime）。

用法：

```
NitroPatcherCli 原始ROM 补丁包 输出ROM
```

## 创建补丁
### 基本用法

使用[ndstool](https://github.com/devkitPro/ndstool)分别提取原始ROM和修改后的ROM的文件系统，例如：

```
ndstool -x example.nds -9 "arm9.bin" -7 "arm7.bin" -y9 "overarm9.bin" -y7 "overarm7.bin" -d "data" -y "overlay" -t "banner.bin" -h "header.bin"
```

然后筛选出具有差异的文件，将所有文件打包为`.zip`压缩包（需注意arm9.bin等文件需要在根目录下）。

### 额外功能
#### 添加MD5校验码

可在补丁包的根目录下创建名为`md5.txt`的文件，在文件中包含原始ROM的MD5校验码。在应用补丁时，补丁工具会自动计算原始ROM和修改后的ROM的MD5校验码，并与`md5.txt`中的校验码进行比对。

如果有原始ROM有多个版本（例如，对未汉化的ROM和已汉化的ROM使用同一个补丁），可以在`md5.txt`中添加多个校验码，每行一个。以“#”为首的行及空行会被忽略。

[这里提供了一个示例](https://github.com/Xzonn/PokemonChineseTranslationRevise/blob/9f0632f22c3982bd2ce541c6c902dee54bd0db1a/original_files/DP/D/md5.txt)。

#### 使用Xdelta补丁

可以在补丁包的根目录下创建名为`xdelta`的文件夹，然后计算原始ROM和修改后的ROM之间的差异，并将差异文件保存到`xdelta`文件夹中。例如，若对`data/some/sub/folder/pack.pak`这个文件计算了Xdelta补丁，则补丁位置应为`xdelta/data/some/sub/folder/pack.pak`。

此功能对于ROM中包含较大文件（例如开发商自定义的打包格式）的情况非常有用。

[这里提供了一个批量计算脚本](https://github.com/Xzonn/EO3ChsLocalization/blob/8517972a855d1243886d59dcad3596eae832c424/scripts/create_xdelta.py)。
