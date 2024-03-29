---
class: auto-numbering
date: 2019-03-02 12:00
head_image: 48f542abdecfe0d46966b557d0b6f6b0.png
head_image_height: 384
head_image_width: 256
infobox: incomplete pokemon pokemonGlitch
last_modified_at: 2020-01-03 23:02
tags: DS 任天堂 宝可梦
title: 《精灵宝可梦》地图图块漏洞
---
{% include figure.html src="48f542abdecfe0d46966b557d0b6f6b0.png" alt="漏洞触发后的效果" width="256" height="384" %}

## 概述
**地图图块漏洞**是存在于第四世代《精灵宝可梦》系列游戏中的游戏漏洞。此漏洞在英文玩家中也被称为“Tweaking”。该漏洞通过快速切换地图图块，使游戏产生载入错误，并可以使玩家进入原本无法进入的区域，走出地图并进入“谜之空间”。此漏洞最早由 GameSpot 论坛的用户 Holepunch 发现，但原贴如今已经不存在。

## 漏洞原理
在全部第四世代游戏中，所有的地图都以 32 × 32 格大小的区块存储。游戏同时可以读取 4 个区块，即玩家所在的区块以及相邻的 3 个区块。在区块中间具有不可见的“载入线”，当玩家通过这条线时，下一个区块将会被读取。当玩家以最高速骑着自行车通过载入线时，游戏载入区块的速度慢于玩家通过的速度，这样会触发“竞争冒险”机制，可能会使游戏冻结、出现不可见的墙、出现黑色区域、出现白色区域、Z 轴改变、载入其他区块等。

消除载入错误的方法包括正常通过新的载入线，或是打开任意菜单后返回等。此时区块将被重新读取。

此外，通过跑步、冲浪等也可以触发此漏洞。

## 触发方式
{% include figure.html src="cd4b3a2ec058fec68bde3e5d168ef2f9.png" alt="图例" width="200" height="200" %}

以右图为例，蓝色的线代表载入线（即图块的中线），数字代表玩家所在的区域。在下述方式中，所有图案均可以翻转或旋转。

### 同方向替换
“3124343”（高速自行车）：以发现者 Zorch 命名，也是最初发现的可靠的触发方式。此方式使玩家右侧的区块以黑色区域载入到玩家左侧。它被之后发现的“Shortzorch”法替代。

“42121”（高速自行车）：被称为“Shortzorch”，同上。

“31213”（高速自行车，白金／心金／魂银）：使玩家右侧的区块以可见的形式载入到玩家左侧。在钻石／珍珠中，由于自行车速度不同，此方法会使游戏冻结。

“42131”（低速自行车、跑步、冲浪，白金／心金／魂银）：低速自行车使玩家右侧的区块变为黑色、可行走的区域并有一部分或没有 NPC，跑步使玩家右侧的区块变为不可行走但可见的区域并有一部分或没有 NPC，冲浪使玩家右侧的区块变为可行走、可见的区域并有一部分或没有 NPC。还可以用跑步以“1242131”的方式触发相同的效果。

“421312D21”（高速自行车）：使玩家下方的区块以可见的形式载入到玩家上方。“D”表示“2”右侧的一格。

### 对角线替换
“12421”（低速自行车）：使玩家左上方的区块以可见的形式载入到玩家右上方。

“1242131”或“13431”（低速自行车）：使玩家左下方的区块以可见的形式载入到玩家右下方。当以“1242131”方式时还会使玩家上方的区块不可行走。

## 拓展
### 捷径
这一漏洞可以使一些可行走的区块被载入到原来不可行走的区块的位置，因此可以产生一些捷径，例如在《心金／魂银》中在２７号道路的岩壁上加在可行走区块，使无需秘传学习器０７便跳过都城瀑布等。在一些被 NPC 阻挡的建筑的图块，玩家可以通过改变 Z 轴通过 NPC 正常占据的图块。这可以使玩家在《钻石／珍珠／白金》中于拿到第一个徽章前即进入祝庆电视台获得神秘礼物，或者在《心金／魂银》中于呆呆兽之井剧情前即打败桧皮道馆（但玩家仍需要完成次剧情并打败兰斯，之后才能在桐树林触发大葱鸭的剧情）。

这类捷径在全部第四世代游戏中均可用。

### 谜之空间漏洞
谜之空间漏洞仅在《珍珠／钻石》中有效。玩家需要将含有可通过区域的区块载入到原本含有建筑的区块上，并移动到建筑物入口的上方一格。随后重新载入区域并向下进入建筑，此时玩家将进入到正常地图的下方，与四天王房间冲浪漏洞类似。通过这种方法可以进入新月岛或花之乐园捕捉达克莱伊／谢米。

在前往新月岛或花之乐园时，玩家需要在谜之空间保存游戏，这可能会使玩家被困在错误的地图中无法出来。最坏的情况是，游戏在读取存档时立即重启，玩家必须创建新的存档。一种方法是在保存存档前查看菜单中的其它选项后返回，如果游戏冻结，则可以保护存档不受损失。

在捕捉达克莱伊／谢米的方法被发现后，许多玩家开始尝试前往初始之间捕捉阿尔宙斯。但直到 2017 年，朋友公园返回漏洞被发现后，捕捉阿尔宙斯才成为了现实。

由于溢出，移动 65536 步以上会使游戏不再载入黑色的区域，而是会载入正常的区域，这被称作是“假神奥”或“假城都／关都”。

在《白金／心金／魂银》中，谜之空间中有许多看不见的墙，这会使玩家陷在谜之空间中，因此这一漏洞在这三部游戏中难以实现，除非使用特殊手段。

#### 捕捉阿尔宙斯
利用“朋友公园返回漏洞”可以捕捉阿尔宙斯。<sup>[[4](#ref-4)]</sup>步骤如下（原文如此，详细说明请参考原贴）：

```
=======
Step 1
=======
1 S
17 W
14 N
2015 W
512 S
Save & Reset

=======
Step 2
=======
32 E
384 S
32 W
1792 S
128 W
32 S
192 W
64 S
160 W

=======
Step 3
=======
96 S
96 E
32 S
63 E
1 N
63 E (or 64 E if you've already been to Pal Park before)
191 N
1 N (注1)

=======
Step 4
=======
192 E
66 S
1 N

=======
Step 5
=======
192 W
64 N
64 W
32 N
128 W
64 N
64 W
96 N
226 E
Start -> RETIRE

=======
Step 6
=======
34 S
33 W
128 S
160 W
160 S
160 E
31 S
1 S
64 E
166 N
1 N
Start -> RETIRE

------
注1：根据本人测试，如果玩家已经进入过朋友公园，此处不需要向上 1 格。
```

## 参考视频
{% include video.html aid="44978212" page="1" %}

{% include video.html aid="44978212" page="2" %}

{% include video.html aid="47147308" page="1" %}

## 参考资料
1. <span id="ref-1"></span>Bulbapedia. Tweaking[OL]. (2018-05-04) [2019-03-02]. <https://bulbapedia.bulbagarden.net/w/index.php?title=Tweaking&oldid=2772930>.
2. <span id="ref-2"></span>Johnstone. POKEMON GLITCHES: The Tweaking Glitch (Part 1) - Darkrai and Shaymin[V/OL]. (2018-01-20) [2019-03-02]. <https://www.youtube.com/watch?v=b15M3VU_MPA>.
3. <span id="ref-3"></span>Ganix. Void Glitch - How to Catch Arceus in Pokemon D/P[V/OL]. (2017-01-22) [2019-03-23]. <https://www.youtube.com/watch?v=VrhHXG3cuAw>.
4. <span id="ref-4"></span>Cryo. Obtaining Arceus via the Void Glitch[EB/OL]. (2017-01-10) [2019-03-23]. <https://forums.glitchcity.info/index.php?topic=7770.0>.
{: .list-endnote .square }