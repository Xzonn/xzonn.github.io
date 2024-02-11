<div class="alert alert-success" markdown="1" style="text-align: center; font-size: 150%;">
**[Chinese localization is in recruitment!](https://xzonn.top/ChokuretsuChsLocalization/)**
</div>

Recently, my enthusiasm for localizing games into Chinese has been high. There are several Suzumiya Haruhi games that have not been translated into Chinese, including two works released by Sega, "Suzumiya Haruhi no Chokuretsu" (*The Series of Haruhi Suzumiya*) and "Heiretsu" (*Parallel*). A senior once wrote an article titled ["NDS《凉宫春日的直列》的一些破解信息"](https://blog.csdn.net/LuckilyYu/article/details/5424928) (Some Hacking Information on NDS game "Suzumiya Haruhi no Chokuretsu"), but due to its age, CSDN has started charging fees, and the entire article cannot be read.

However, I found an [English patch](https://haroohie.club/chokuretsu/) created by [Haroohie Translation Club](https://haroohie.club/), and the [build code](https://github.com/haroohie-club/ChokuretsuTranslationUtility) is open source. I pulled it to my local disk and tried it out. The code is very functional and can be directly used to create Chinese patches. Of course, there is still a certain difference in the focus of work between English and Chinese localization, so it cannot be directly copied. However, the experience gained by the predecessors is still worth learning and borrowing from. In the spirit of mutual communication, I will write down my research results and share them with everyone.

{% include video.html bvid="BV1Yu4y1L7FZ" title="A Haruhi game from 14 years ago? Unboxing, trial playing, and localization recruitment for &quot;Suzumiya Haruhi no Chokuretsu &amp; Heiretsu&quot;" %}

## Import and Export Tools
The import and export tool, [ChokuretsuTranslationUtility](https://github.com/haroohie-club/ChokuretsuTranslationUtility), created by Haroohie Translation Club, has quite complete functions. But the import and export format of texts is in the `. resx` format, which I am not used to, so I added the function of importing/exporting in the `. json` format. The modified code can be found in [here](https://github.com/Xzonn/ChokuretsuTranslationUtility).

In addition to importing and exporting text, this tool also supports importing and exporting images, which can be used directly.

## Font
First, let me briefly introduce the file structure of the game ROM:

``` plaintext
├── dat.bin
├── evt.bin
├── grp.bin
├── scn.bin
├── snd.bin
├── bgm
│   ├── BGM001.bin
│   ├── BGM002.bin
│   ├── ...
│   └── BGM034.bin
├── movie
│   ├── MOVIE00.mods
│   └── MOVIE01.mods
└── vce
 ├── ANZ_ANOTHER00.bin
 ├── ANZ_ANOTHER01.bin
 ├── ...
 └── TRY_WRITE00.bin
```

From the file name, it can be roughly seen that `dat. bin` stores data files, `evt. bin` stores game storyline related scripts, and `grp. bin` stores image files. These three files are actually archive files, which stores a large number of small files. Other files related to audio or video. To modify the font used in this game, I need to edit the character table and the image of it. The character table is the `0x71`st file in `dat. bin`, and the image is the `0xE50`th file in `grp. bin`.

### Character Table
I extracted the character table file using the command-line tool "ChokuretsuTranslationCLI" in the ChokuretsuTranslationUtility, and opened it with HxD:

``` plaintext
Offset(h) 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F

00000000 01 00 00 00 38 11 00 00 14 00 00 00 14 00 00 00 ....8...........
00000010 01 00 00 00 81 97 81 41 81 42 81 44 81 45 81 46 .....—.A.B.D.E.F
00000020 81 48 81 49 81 51 81 58 81 5B 81 5C 81 60 81 63 .H.I.Q.X.[.\.`.c
00000030 81 65 81 66 81 67 81 68 81 69 81 6A 81 73 81 74 .e.f.g.h.i.j.s.t
00000040 81 75 81 76 81 77 81 78 81 79 81 7A 81 7B 81 7C .u.v.w.x.y.z.{.|
```

The first `0x14` bytes are obviously the file header, where `0x04-0x07` is the size of the file (these bytes need to be modified after expanding the character table). From `0x14` to the last is all the characters contained in the font image, in order. UTF-16-LE encoding was first considered for these 2-byte characters, but it was found to be garbled. So I tried Shift-JIS encoding and found that it was consistent with the extracted image. The I opened it with VS Code directly and change the encoding to Shift-JIS, and I got characters included in the file:

``` plaintext
＠、。．・：？！＿々ー―～…‘’“”（）《》「」『』【】＋－×＝°％＆☆■♪０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚぁあぃい...
```

Because the imported text is Simplified Chinese, I need to find a way to map Simplified Chinese characters to Shift-JIS code. I originally wanted to directly use the GB18030 encoding, but found that GB18030 contained far more Chinese characters than Shift-JIS, so I gave up. The final solution is to count the number of Simplified Chinese characters in the translated text, sort them according to the number of use, and then check whether they are in the original character table in turn. If yes, the original Shift-JIS code is directly used; If not, replace it with Japanese Kanji that does not appear in the translated text. This ensures that as many characters as possible can be displayed correctly. Finally, the correspondence table was saved as a `.json` file for use when importing text.

The processing idea of the character table is similar to that of the English project, but Chinese localization needs to use far more characters than English. I extracted all the text and tested it with the machine translation. The required Chinese characters are about 3,000 words, while the original character table only contains about 2,200 words. The solution is either to simplify the use of words, or to expand the capacity of the character table. (By the way, the whole text of the game is about 800,000 words in Japanese, including many branches. So, if someone just wants to clear the game, it is very simple because there are only five chapters. But it will take a long time to play all the branches. Of course, it is also a hell for translation, and it took me 3 days to finish the machine translation.)

### Font Image
With a character table and correspondence table, generating images becomes much simpler. The font size is 14px, which is exactly suitable for Chinese pixel fonts (you can refer to the article ["小点阵字体速览"](https://zhuanlan.zhihu.com/p/142419693) (Small Pixel Font Overview) written by a senior 星夜之幻 (Xingyezhihuan)). I used SimSun, which is bundled with Windows, to generate 13x14px characters. As for creating an automatically building workflow, the file `C:/Windows/Fonts/simsun.ttc` can be used.

However, there is a small issue here. As the line height of the text in the game is exactly 14px, using a 14px font will result in sticky text between the top and bottom lines. This problem needs to be solved by modifying the executable file of the game.

Additionally, due to the insufficient number of characters in the original character table that I mentioned earlier, the generated font image also needs to be larger than the original image. The original image size was 16x35328. If the image was imported directly using ChokuretsuTranslationCLI, only the top part of the image will be imported. The solution, without modifying the code, is to manually generate an empty binary file to import, and then import the image. Then, ChokuretsuTranslationCLI will process the image with the new size.

## Images
Modifying images is very easy, just simply exporting, modifying, and importing them. However, there are some differences in the sorting of exported tiles compared to the actual displayed image, which require manual processing. The steps are relatively simple, so I won't go into further detail.

## Executable File
Before delving deeper, I had limited knowledge about the executable files of NDS games. However, as I delved deeper into this game and [the Chinese localization revision project for the Pokémon Gen IV](/Pokemon Chinese Translation Revision/), at least it was able to solve the problems I encountered in a straightforward manner.

Firstly, I'll briefly explain the executable files of the NDS game. They are divided into two parts: arm9 and arm7, which are further divided into the main program (`arm9.bin/arm7.bin`) and overlay programs (`overlay9_xxxx.bin/overlay7_xxxx.bin`). Taking arm9 as an example, the general part of the program is saved in `arm9.bin`, which will be loaded into the main memory at game startup (starting from `0x0200000000`); And `overlay9_xxxx. bin` is dynamically loaded into memory as needed. All binary files are ARM machine code, so if I want to modify the logic of the game, it is necessary to modify the machine code. This requires the use of disassembly tools.

Referring to the article written by Haroohie Translation Club -- ["Chokuretsu ROM Hacking Challenges Part 2 – Archive Archaeology"](https://haroohie.club/blog/2022-11-02-chokuretsu-archives), IDA can be used with [a plugin](https://github.com/kynex7510/nds_ida) to disassemble NDS ROM files. (By the way, the original author only implemented the disassembly function of `arm9. bin` and did not implement the function of `overay9_xxxx.bin`. I added the disassembly function of 'overay9_xxxx.bin` on the basis of the original author, see [here](https://github.com/Xzonn/NdsIda). The disassembly function of arm7 was not done since there is currently no need for it. If there is a need, we can discuss it further.)

### Font Line Height
In the [build repository](https://github.com/haroohie-club/ChokuretsuTranslationBuild) of Haroohie Translation Club, I found that the [`src/symbols.x`](https://github.com/haroohie-club/ChokuretsuTranslationBuild/blob/main/src/symbols.x) file contains some functions that the team has already named:

``` javascript
MI_DmaCopy32 = 0x02006ED0;
MIi_CpuClearFast = 0x0200738C;
GX_SetBankForBG = 0x0200277C;
GX_SetGraphicsMode = 0x020025B8;
arc_loadFileAndResolvePointers = 0x02033FC4;
scene_renderDialogue = 0x0202D41C;
```

The function `scene_renderDialogue` looks very useful, take a look at IDA:

{% include figure.html src="9fdd24ec0a61e2cb5dc2c6c79175556b.png" alt="The result of disassembly" width="1920" height="1033" %}

这里大概能看出来`cmp r2, #0`、`cmp r2, #0x60`、`cmp r2, #0xa`、`cmp r2, #0x23`是在比较，正好`U+000A`是换行符，而对应的分支里面有个`mov r0, #0x0e`。`0x0e`刚好又是十进制的`14`，前面说过游戏中文字的行高是14，这不是正好对上了吗？修改一下，改成`0x10`（十进制的`16`），回到游戏里一看，没错！就这样歪打正着地解决了。

{% include figure.html src="b0356179c4370109ed7d6c208694face.png" alt="修改行高的结果" width="256" height="384" %}

### 字库扩容
这个问题困扰了我挺久，单纯修改码表大小没用，必须得同时修改图片大小才能让游戏中正常显示。但是，如果让图片包含大约2500个汉字（仅扩容300字），导入到游戏里就会出错，具体表现为游戏在厂商图标显示完毕后白屏。这显然应该是图片太大导致内存不够用了，但我一开始没有想到较好的解决办法。尽管我在字库图片读取、文本显示等多个地方都打了断点，但是还是没琢磨清楚该怎么改。

这个时候我碰巧又看了Haroohie Translation Club的构建项目，发现了[一个提交](https://github.com/haroohie-club/ChokuretsuTranslationBuild/commit/f8884a8057f38a9f6b0f384acf7bf3f95541a096)：

``` plaintext
commit f8884a8057f38a9f6b0f384acf7bf3f95541a096
Author: jonko0493 <email>
Date: Tue Oct 10 03:51:20 2023 -0700

 Print debug logs to no$ console
```

拉下来在本地构建一下，把可执行文件相关的修改导入进去，然后拿DeSmuME打开ROM文件：

{% include figure.html src="d7cad39c3bd74eea4c659c0ba3c2e4b6.png" alt="DeSmuME的控制台" width="932" height="883" %}

好家伙，真的把日志输出到模拟器的控制台里了。这下就好办了，生成一个超级大的图片，导入到游戏里，发现报错内存不够了：

``` plaintext
memory is not enough[32256Byte]
--memory report start--
--use
list: 0 addr:021A2230 size: 16
list: 1 addr:021A2240 size: 32
list: 2 addr:021A2260 size: 224
...
list: 23 addr:02217CB0 size: 32256
--free
list: 24 addr:0221FAB0 size: 11152
use memory size : 514176 503KB
free memory size : 11152 11KB
--memory report end--
```

计算了一下，内存分配的最终地址是`0x0221FAB0 + 0x2B90 = 0x02222640`（十进制的`11152`即为`0x2B90`），拿DeSmuME的内存工具设一下写入断点，发现写入的时候控制台的最后一行文本是这样的：

``` plaintext
gwork : s: 20e2660 e: 2242664: sz: 140000
```

拿IDA找这个字符串，然后跳转到调用的位置，发现了如下汇编代码：

``` plaintext
loc_202A980:
LDR R1, =dword_20A9AC8
MOV R0, #0x140000
LDR R2, [R1,#8]
ORR R2, R2, #1
STR R2, [R1,#8]
BL sub_2024750
MOV R1, R0
LDR R4, =dword_20A9AAC
LDR LR, =dword_20A9AB4
LDR R12, =dword_20A9AB0
LDR R0, =aGworkSXEXSzX ; "gwork : s: %x e: %x: sz: %x\n"
ADD R2, R1, #0x140000
MOV R3, #0x140000
STR R1, [R4]
STR R1, [LR]
STR R1, [R12]
BL dbg_print20228DC
```

第一个`#0x140000`应该是和内存分配有关的，后面两个`#0x140000`是和调试信息输出有关的。因为想要把字库容量扩容到3000字左右，计算了一下，将这几个数字改为`#0x160000`即可满足需求。

此外，在另一个地方也发现了这个`#0x140000`：

``` plaintext
sub_202E158:
LDR R0, =dword_20A9AB0
LDR R1, =dword_20C0D38
LDR R3, [R0]
LDR R2, =dword_20A9AC8
ADD R12, R3, #0x1400
LDR R3, [R1]
STR R12, [R0]
STR R12, [R2]
STR R3, [R1,#4]
MOV R12, #0
STR R12, [R3,#0xC]
LDR R3, [R1,#4]
LDR R0, =dword_20A9AAC
STR R12, [R3,#0x10]
LDR R12, [R2]
LDR R3, [R1,#4]
STR R12, [R3,#4]
LDR R0, [R0]
LDR R2, [R2]
ADD R3, R0, #0x140000
LDR R0, [R1,#4]
SUB R1, R3, R2
STR R1, [R0,#8]
POP {R3,PC}
```

也同样修改为`#0x160000`。

## 结语
总体来说，我的研究成果基本上都是基于前辈们已有的结果，几个问题的解决方式也算是歪打正着，不过也算是有所收获。后续的工作主要就是翻译了，不过，研究如何汉化可比翻译文本有意思多了。

汉化相关的构建脚本已在GitHub上开源。