---
date: 2024-11-02 00:18
head_image: https://raw.githubusercontent.com/Xzonn/PokemonGen4FontPatch/refs/heads/master/assets/images/social.png
head_image_height: 384
head_image_width: 768
info: 显示中文。
last_modified_at: 2024-11-03 12:07
links: 
- - https://github.com/Xzonn/PokemonGen4FontPatch
  - 项目地址
- - Pokemon-DP-Chinese-Localization-Based-on-Pret-Project.html
  - 基于pret项目的《宝可梦 钻石／珍珠》汉化
tags: DS 作品发布 宝可梦
title: 《宝可梦》第四世代字库扩容补丁
---
本项目用于对《宝可梦》第四世代游戏的字库进行扩容，以支持更多的汉字和符号。本补丁不包含汉化文本，如需汉化文本请使用**[《宝可梦》第四世代汉化修正补丁](/PokemonChineseTranslationRevise/)**。

## 这是什么？

这是《宝可梦》第四世代汉化修正补丁中与字库相关的部分，用于扩容游戏的字库以支持汉字。由于第四世代原版游戏的字库空间有限，而汉化所需的汉字在2000字以上，原有的可执行文件无法满足要求。因此，需要通过[修改可执行文件的方法]({% link _posts/2023-09-19-Pokemon-DP-Chinese-Localization-Based-on-Pret-Project.md %})，使其支持更大的字库。第五世代的日文版游戏提供了汉字版本，因此不再需要这个补丁。

这个补丁对于大多数人来说没有什么用，因为我制作好的修正补丁已经满足大多数人的需求了。但是有些人希望汉化其他语言版本的宝可梦游戏，这时就需要用到这个补丁了。

**注意：本补丁并不一定适用于所有语言版本的游戏。如果基于[pret项目](https://github.com/pret)修改过代码，那么与字库相关的函数位置可能会发生改变。**

## 使用方法
### `arm9.bin` 补丁

1. 提取`arm9.bin`，可使用[ndstool](https://github.com/devkitPro/ndstool)或[CrystalTile2](https://www.romhacking.net/utilities/818/)。**注意：《心金／魂银》的`arm9.bin`被压缩过，需要对其进行解压缩。可使用[ndspy](https://github.com/RoadrunnerWMC/ndspy)或CrystalTile2自带的解压功能。**
2. 根据游戏版本和语言版本导航到对应的目录下，并对前一步提取的`arm9.bin`应用相应的IPS补丁，可使用[Lunar IPS](https://www.romhacking.net/utilities/240/)或[Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/)。
3. 将`arm9.bin`重新导入游戏ROM，可使用ndstool或CrystalTile2。**注意：如果对《心金／魂银》的`arm9.bin`重新压缩，可能需要同步修改[arm9.bin中存储的文件大小](https://github.com/Xzonn/PokemonChineseTranslationRevise/issues/16)。**

### 字体补丁

（二者选其一）

1. 根据游戏版本和语言版本导航到对应的目录下，采用[NitroPatcher](https://github.com/Xzonn/NitroPatcher)应用相应的XZP补丁。
2. 也可使用[PCTRTools](https://github.com/Xzonn/PCTRTools)自行创建字体并导入，但请确保使用[《宝可梦》第四世代汉化修正补丁所用的码表](https://github.com/Xzonn/PokemonChineseTranslationRevise/blob/master/files/CharTable.txt)。
