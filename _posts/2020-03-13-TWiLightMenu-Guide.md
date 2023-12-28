---
date: 2020-03-13 12:43
head_image: https://raw.githubusercontent.com/DS-Homebrew/TWiLightMenu/master/logo.png
head_image_height: 400
head_image_width: 1440
info: 适用于中文DS玩家的使用指南。包含了金手指、游戏封面、宽屏的使用方法。
last_modified_at: 2020-03-13 19:18
links: 
- - https://wiki.ds-homebrew.com/zh-CN/twilightmenu/
  - TWiLight Menu++官方中文文档
tags: DS 任天堂 技术指南
title: TWiLight Menu++中文使用指南（部分翻译）
---

## 前言

*本文翻译自 **[TWiLight Menu++ Wiki](https://github.com/DS-Homebrew/TWiLightMenu/wiki)**，原文最后更新于2020-03-08 03:49 (CST)。*

*本文仅为探讨相关软件的技术实现，并不提供ROM来源。如有能力，请支持正版游戏。*

TWiLight Menu++是一款开源软件，可以在任天堂DSi、3DS及DS烧录卡中运行，其目的在于升级／替代原有的DSi界面。通过该软件可以运行任天堂的DS、GBA、GBC、GB、SFC、FC等掌机和主机游戏，以及世嘉的GameGear/Master System、Mega Drive/Genesis等游戏，同时支持DSTWO和RocketVideo Technology。<span class="footnote">参考资料：RocketRobz, et al. [TWiLight Menu++/Readme.md](https://github.com/DS-Homebrew/TWiLightMenu) [EB/OL]. (2019-12-26) [2020-03-13].</span>

对于一些玩家来说，这款软件的最大用途就是不需要游戏卡带即可游玩DS游戏，而它的一些特性（如金手指、游戏封面、宽屏等）也很有趣。然而金手指和宽屏特性的开启是依赖于ROM的，开发者团队添加了对官方ROM的支持，但对于游玩汉化版的广大中文玩家来说却需要一些其它操作才能享受到这些特性。

本文将对该软件的Wiki进行部分翻译，并对我个人遇到的问题及解决思路单独列出，供广大玩家参考。如有翻译不当之处，还请不吝赐教。

软件的发布地址为：<https://github.com/DS-Homebrew/TWiLightMenu/releases/latest>。请尽可能从该地址下载最新版本，以免出现错误。

## 安装

*原文链接：[How to install TWiLight Menu](https://github.com/DS-Homebrew/TWiLightMenu/wiki/How-to-install-TWiLight-Menu)*

<div class="alert alert-warning">
  <p><strong>警告</strong>：如果使用64&nbsp;GB及以上大小的SD卡，请将<code>Save FAT table cache</code>选项关闭，否则SD卡可能会损坏，这是由于nds-bootstrap保存FAT表的错误导致的。</p><p>如果该选项已关闭且SD卡发生损坏，那么可能是由于libnds或libfat引起的。</p>
</div>

<div class="alert alert-info">
  <p><strong>提醒3DS/2DS用户</strong>：如果之前使用了TWLoader，请使用CIA管理器（如<a href="https://github.com/Steveice10/FBI/releases">FBI</a>）卸载TWLoader。</p>
</div>

<div class="alert alert-info">
  <p><strong>提醒烧录卡用户</strong>：如果需要锁定TWL时钟频率和／或VRAM加速烧录卡游戏，请先通过主机的SD卡启动TWiLight Menu++，并将<code>SCFG access in Slot-1</code>选项开启。</p>
</div>

### DSi用户，已有Unlaunch和／或HiyaCFW

1. 操作同“[3DS用户，手动操作](#3ds用户手动操作)”的第1 ~ 5步。
2. 将`DSi&3DS - SD card users`目录下的`boot.nds`文件解压到SD卡的根目录。
3. 将`DSi - CFW users/SDNAND root`目录下的所有文件或文件夹解压到SD卡的根目录。
4. *（此步对于未安装HiyaCFW的Unlaunch用户）*进入Unlaunch菜单的“选项”，将`No button`设置为`TWLMENUPP`。

### 3DS用户，通过Universal-Updater

1. 安装[Universal-Updater](https://github.com/Universal-Team/Universal-Updater/releases)（通过安装3dsx或cia文件）。
2. 下载`NTR/TWL`脚本。根据屏幕上的提示操作。
3. 进入脚本列表，选择刚刚下载的脚本，然后选择想要下载的内容。

### 3DS用户，手动操作

1. 如果SD卡根目录下有`_nds`文件夹，那么将其删除。
2. 下载[最新版本](https://github.com/DS-Homebrew/TWiLightMenu/releases/latest)的7z文件。
3. 将`_nds`文件夹解压到SD卡的根目录。
4. 将`DSi&3DS - SD card users`目录下的`_nds`文件夹解压到SD卡的根目录。
5. 将`DSi&3DS - SD card users`目录下的`boot.nds`文件解压到SD卡的根目录。
6. 将`3DS - CFW users`目录下的所有cia文件解压到SD卡的任意位置。
7. 在3DS/2DS主机上安装第上一步的两个cia文件。

### 烧录卡用户

1. 下载[最新版本](https://github.com/DS-Homebrew/TWiLightMenu/releases/latest)的7z文件。
2. 将`_nds`文件夹解压到烧录卡SD卡的根目录。
3. 将`Flashcard users`目录下的`_nds`文件夹解压到烧录卡SD卡的根目录。

#### 自动载入TWiLight Menu++

1. 将`Flashcard users/Autoboot/(烧录卡种类)`目录下的所有文件或文件夹解压到烧录卡SD卡的根目录。（如果没有找到你的烧录卡，可以跳过此步。）
2. **对于老DS/DSLite用户**：进入DS菜单的“设置”，打开“自动启动”（auto-start），这样烧录卡即可自动启动。

## 设置金手指

*原文链接：[FAQs > Q: How do I use cheats?](https://github.com/DS-Homebrew/TWiLightMenu/wiki/FAQs#q-how-do-i-use-cheats)*

下载`usrcheat.dat`格式的金手指数据库，然后保存到SD卡的`/_nds/TWiLightMenu/extras`目录下。最新的数据库可以从[DeadSkullzJr的帖子](https://gbatemp.net/threads/deadskullzjrs-flashcart-cheat-databases.488711/)获取<sup>[译注1](#note-1)</sup>。

<div class="card mb-3" id="note-1">
<div class="card-header text-bg-primary">译注1</div>
<div class="card-body" markdown="1">
{% include figure.html src="3c87733772c71896f2bf29c013c31a92.png" alt="用r4cce修改金手指代码" width="602" height="452" %}

“<span lang="en">DeadSkullzJr's NDS Cheat Databases</span>”是由国外玩家[DeadSkullzJr](https://github.com/DeadSkullzJr/)等人整理的金手指数据库，目前仍在更新，囊括了非常多的DS游戏。然而我在使用这个数据库的时候，发现TWiLight Menu++没有办法读取汉化版游戏的金手指。在查阅资料后我得出了结论：

金手指数据库中区分每个游戏时需要比对游戏代码和ROM的校验值。对于汉化游戏来说，游戏代码与原版相同，但校验值可能会发生变化。当游戏代码相同而校验值不同时，对于R4等烧录卡及DeSmuME模拟器仍可以使用金手指，但TWiLight Menu++则不可以使用。因此，如果需要在TWiLight Menu++中使用金手指，则需要修改金手指数据库中的校验值。

首先需要查看ROM的游戏代码。可以使用DeSmuME载入游戏，然后从菜单的“File” → “ROM Info”页面的右上角“Game Code: <i>XXXX</i>”中可以看到游戏代码。其中最后一位表示游戏的版本，日版为J，韩版为K，神游版为C，等等。

然后使用“[r4cce](http://hp.vector.co.jp/authors/VA013928/soft_en.html)”软件（此软件有汉化版，可自行查找）打开金手指数据库，找到原版游戏所在的位置（可按名字查找，也可按游戏代码查找），复制并粘贴。然后选择粘贴得到的一行，确认右侧的“游戏ID”第一个输入框与上文所述汉化版游戏代码相同。此时点击第二个输入框右侧的“...”，在打开的对话框中找到汉化版游戏ROM并确认，第二个输入框中的代码会修改为汉化版ROM的校验值。此时将数据库保存为“usrcheat.dat”格式即可按照上文所述的方法使用。

如果不想自己动手操作或是不习惯看英文，也可在国内的网站查找中文金手指数据库。
</div>
</div>

## 设置游戏封面

1. 确保已在TWiLight Menu++中打开显示游戏封面的选项。
2. 从[GameTDB](https://www.gametdb.com/DS/Downloads#cover_packs)网站下载png版本的封面包。
3. 将所有png文件解压到SD卡的`/_nds/TWiLightMenu/boxart`目录下。
4. 你的DS游戏现在应该可以显示封面了。

<table class="table float-right no-table">
  <caption class="caption-table" id="table-boxart-size">自制封面分辨率</caption>
  <thead>
    <tr><th>ROM类型</th><th>分辨率</th></tr>
  </thead>
  <tbody>
    <tr><td>NDS/DSi</td><td>128 × 115</td></tr>
    <tr><td>GBA/GBC/GB/FDS</td><td>115 × 115</td></tr>
    <tr><td>NES/GEN/MD/SFC/MS/GG</td><td>84 × 115</td></tr>
    <tr><td>SNES</td><td>158 × 115</td></tr>
  </tbody>
</table>

### 自己制作封面

将所有自制封面保存到SD卡的`/_nds/TWiLightMenu/boxart`目录下。封面文件必须为png格式。<span class="footnote">译者注：如果你使用Windows操作系统，请务必开启“文件扩展名”的显示。</span>

文件名可以是游戏的代码<sup>[译注1](#note-1)</sup>（如`CPUJ.png`）或是游戏ROM的文件名（如`精灵宝可梦 白金.nds.png`）。

png文件的分辨率如<a class="xref-table" href="#table-boxart-size"></a>所示。

封面可以在GameTDB网站的“DS Covers (png)”分类下找到。

## 设置宽屏

*原文链接：[Playing in Widescreen](https://github.com/DS-Homebrew/TWiLightMenu/wiki/Playing-in-Widescreen)*

需要一台任天堂3DS/2DS（新旧均可），以及一台64位Windows电脑。<span class="footnote">译者注：此特性需要已安装[Luma3DS](https://github.com/AuroraWright/Luma3DS/)以及GodMod9的主机，如果不确定，请在开机时按住“START”检查是否进入GodMod9，或在开机时按住“SELECT”检查是否进入Luma3DS的设置页面。</span>

### 准备工作

1. 如果TWiLight Menu++版本不是最新，需要手动更新到最新版本。<br/>如果旧版本已经是v9.0.0以上可以跳过此步。
2. 确保Luma固件文件`boot.firm`位于SD卡根目录。

### 第1步 GodMod9

<span class="footnote">译者注：在开机时按住“START”进入GodMod9。</span>

1. 进入`SYSNAND CTRNAND`。
2. 选择`title`。
3. 选择`00040138`。
4. 选择`#0000102`。（对于新3DS，#代表2；对于老3DS，#代表0。）
5. 选择`content`。
6. 选择`000000##.app`。（##代表可以找到的最大数字。）
7. 选择`NCCH image options...`。
8. 选择`Mount image to drive`。
9. 如果被询问是否进入路径，选择“是”。
10. 选择`exefs.bin`。
11. 选择`copy to 0:/gm9/out`。
12. 关机。

### 第2步 创建宽屏TwlBg并使用

1. 从[这个帖子](https://gbatemp.net/threads/sharp-ds-i-mode-scaling-filters.542694/page-25#post-8752015)下载TWL Patcher。
2. 将SD卡的`/gm9/out/`目录下的`exefs.bin`文件复制到与`mkpatch_b.exe`同一个目录下。
3. 将`exefs.bin`重命名为`section0.bin`。
4. 打开记事本。
5. 在记事本中写入：`mkpatch_b asd 1010`。
6. 将上述文本保存在与`mkpatch_b.exe`同一个文件夹下，文件名为`wide.bat`。
7. 运行`wide.bat`。
8. 在SD卡的`/_nds/TWiLightMenu/`目录下创建名为`TwlBg`的文件夹。
9. 将第7步生成的`TwlBg.cxi`文件移动到第8步创建的`TwlBg`文件夹下。
10. 将`TwlBg.cxi`重命名为`Widescreen.cxi`。
11. 在Luma3DS的设置中，开启`external FIRMs and modules`。<span class="footnote">译者注：在开机时按住“SELECT”进入设置页面。</span>
12. 在TWiLight Menu++的设置中，转到`Games/Apps settings`页面，将`Screen Aspect Ratio`设置为`16:10`。

之后即可享受16:10的DS游戏<sup>[译注2](#note-2)</sup>。

<div class="card mb-3" id="note-2">
<div class="card-header text-bg-primary">译注2</div>
<div class="card-body" markdown="1">
{% include figure.html src="46fd3b67398273a094d4b7d441865eec.png" alt="读取ROM的CRC16值" width="640" height="273.02" %}

与金手指类似，宽屏补丁也需要对比游戏代码和ROM的校验值，因此如果需要使用宽屏则也需要做一些工作。

宽屏补丁的位置在SD卡的`/_nds/TWiLightMenu/widescreen/`目录下，命名方式为“<i>游戏代码</i>-<i>CRC16</i>.bin”。游戏代码可按照[译注1](#note-1)的说明获取，而CRC16可以用16进制编辑器（如[HxD](https://mh-nexus.de/en/hxd/)）打开ROM，读取0x015E ~ 0x015F处的内容（小端序）。

如<a class="xref-figure" href="#figure-46fd3b67398273a094d4b7d441865eec10db190fd8b2dcaa.png"></a>所示，该ROM的0x015E ~ 0x015F的数据为`04 2D`，游戏代码为`CPUJ`，则补丁的文件名为`CPUJ-2D04.bin`。注意CRC16是没有用0补齐的。

如果某游戏的汉化版没有可用的宽屏补丁而原版有，那么可以尝试将原版的宽屏补丁复制一份并改成汉化版对应的文件名使用。另外，`/_nds/TWiLightMenu/apfix/`目录下的ips补丁的命名方式同理。

我个人在使用的时候发现，开启宽屏效果之后仅仅是把上屏原有的4:3比例强制拉伸到了16:10，不知是因为我的方法有问题还是本来就是这个样子。
</div>
</div>

## 总结

总体来看，TWiLight Menu++的使用还是比较方便的，金手指、游戏封面、宽屏都可以设置，对于汉化版ROM可能需要一些操作：

- 金手指可以直接搜索汉化版可用的金手指，或者尝试用国外的数据库修改游戏ID使用。
- 游戏封面可以直接从数据库下载，也可自己添加。
- 宽屏和游戏补丁可以将原版的补丁复制一份并修改文件名。

此外，Wiki原文还介绍了一些特性，我个人感觉比较小众，因此不再翻译，如有需求可以[查看原文](https://github.com/DS-Homebrew/TWiLightMenu/wiki)。