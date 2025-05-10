---
date: 2025-05-10 16:56
head_image: https://i0.hdslb.com/bfs/new_dyn/d0d85e8c6a58b249347551366d086b7816114399.jpg
head_image_height: 1080
head_image_width: 1920
info: 对名字拼音排序。
last_modified_at: 2025-05-11 00:44
links: 
  - - https://github.com/Xzonn/DSLEChsLocalization
    - GitHub上本作的汉化项目
tags: DS 汉化笔记
title: 《数码宝贝物语 遗失的进化》汉化笔记（一）：按拼音排序
---
《数码宝贝物语 遗失的进化》的汉化做完了，分享一下我遇到的问题和解决方案。

## PAK文件提取

第一步还是拆包，在`data/`文件夹下可以找到一些有用的文件：

- `FONT_NFTR.PAK`：字库文件。从文件名也能看出来，这个游戏的字库使用了`.nftr`格式，这是NDS游戏里很常见的格式，有很多现成的工具可以用。
- `MSG/MESPAK00.PAK`等：文本文件，共有6个。
- `BG_NCGR.PAK`、`BG_NCLR.PAK`、`BG_NSCR.PAK`：背景图像文件。NCGR是图像数据，NCLR是调色板数据，NSCR是图像的显示信息。这三种格式也是NDS游戏里很常见的格式。
- `SPR_NANR.PAK`、`SPR_NCBR.PAK`、`SPR_NCER.PAK`、`SPR_NCGR.PAK`、`SPR_NCLR.PAK`：精灵图像文件。NCER是精灵图的显示信息，NCBR是图像数据。同样是NDS游戏里很常见的格式。

这些文件都是以`.PAK`结尾的，看来是一种打包格式。好在这种格式[已经有人研究出来了工具](https://gbatemp.net/threads/digimon-story-lost-evolution-project.284937/page-13)，所以只需要照着转成Python脚本就行了。当然，如果没有现成的工具，也可以看NDS的汇编代码自己手搓一个。这里简单写一下`.PAK`格式的结构：


| 偏移量                   | 大小            | 含义                                         |
| ------------------------ | --------------- | -------------------------------------------- |
| `0x00`                   | `0x04`          | 文件数量                                     |
| `0x04`                   | `0x04`          | 固定为`32 2E 30 31`（`b"2.01"`）             |
| `0x08`                   | `0x08`          | 填充字节                                     |
| `0x10`                   | 文件数量 × 0x10 | 文件信息                                     |
| `0x10 + i * 0x10 + 0x00` | `0x04`          | 偏移量                                       |
| `0x10 + i * 0x10 + 0x04` | `0x04`          | 未压缩的文件大小                             |
| `0x10 + i * 0x10 + 0x08` | `0x04`          | 压缩后的文件大小，未压缩时与前一项相等       |
| `0x10 + i * 0x10 + 0x0C` | `0x04`          | 是否被压缩，最高位为1表示未压缩，0表示已压缩 |
| （不定）                 | （不定）        | 文件数据                                     |
{: .table}

其中压缩数据采用了一种LZ77压缩算法（类似的说明可以参考[之前的笔记]({% link _posts/2025-04-25-Super-Princess-Peach-Chinese-Localization-4.md %})），其解压代码如下：

``` python
def decompress_lz(input_data: bytes, decompressed_size: int) -> bytes:
  output = bytearray(decompressed_size)
  temp = bytearray(0x1000)
  output_pos = 0
  input_pos = 4

  while input_pos < len(input_data):
    bits = input_data[input_pos]
    input_pos += 1

    for bit in range(8):
      if (bits & 1) == 1:
        b = input_data[input_pos]
        input_pos += 1
        temp[output_pos % 0x1000] = b
        output[output_pos] = b
        output_pos += 1
      else:
        if input_pos + 1 >= len(input_data):
          break
        low = input_data[input_pos]
        high = input_data[input_pos + 1]
        input_pos += 2

        max_length = (high & 0x0F) + 3
        start_pos = low | ((high & 0xF0) << 4)

        for i in range(max_length):
          b = temp[(start_pos + i + 0x12) % 0x1000]
          temp[output_pos % 0x1000] = b
          output[output_pos] = b
          output_pos += 1

      bits >>= 1

  return bytes(output)
```

打包也很简单，根据文件格式反着来就行了。这里我偷了懒，没有写压缩算法，只要在打包的时候把数据标记为未压缩就行了。

## 文本文件提取

从`MSG/MESPAK00.PAK`中提取出来的文本文件是二进制格式，也非常简单：


| 偏移量   | 大小            | 含义                                             |
| -------- | --------------- | ------------------------------------------------ |
| `0x00`   | `0x04`          | 固定为`00 00 00 00`                              |
| `0x04`   | `0x04`          | 文本数量                                         |
| `0x08`   | 文本数量 × 0x04 | 偏移量                                           |
| （不定） | （不定）        | Shift-JIS编码的文本数据，对齐到4字节，以`\0`结尾 |
{: .table}

导入脚本也很简单，只需要生成码表，在导入时简单处理一下编码。关于码表的生成方式[我之前也有写过]({% link _posts/2025-04-13-Super-Princess-Peach-Chinese-Localization-2.md %}#编码方式)，可以参考。生成的码表同时也被用于生成字体。

到目前为止似乎都很简单，但当我把文本导入到游戏中时，发现了问题——修改了文本和字体之后，打开游戏中的菜单查看“持有的数码宝贝”会导致游戏卡住。这是怎么回事呢？上调试吧。

## 卡死原因分析

使用DeSmuME模拟器，通过“Tools”→“Disassmbler”查看汇编代码和寄存器，发现程序一直在`0x20CAB58`到`0x20CAB98`这个范围内运行。这个范围内的汇编代码是这样的：

``` plaintext
loc_20CAB58
MOV             R1, LR, LSL#1
LDRSB           R5, [R3, R1]
ADD             R12, R3, LR, LSL#1
CMP             R4, R5
LDRSBEQ         R2, [R0, #1]
LDRSBEQ         R1, [R12, #1]
CMPEQ           R2, R1
ADDEQ           SP, SP, #0x1E8
MOVEQ           R0, LR
POPEQ           {R3-R5, PC}
CMP             R5, #0x81
LDRSBEQ         R1, [R12, #1]
CMPEQ           R1, #0x40
ADDNE           R1, LR, #1
MOVNE           R1, R1, LSL#16
MOVNE           LR, R1, ASR#16
BNE             loc_20CAB58
```

整个函数的起始地址是`0x20CAB18`，反汇编一下：

``` c
int __fastcall sub_20CAB18(char *a1)
{
  char *v1; // lr
  char *v2; // r12
  int v3; // r3
  char v4; // r1
  char v5; // t1
  char v6; // r1
  int v7; // r4
  int v8; // lr
  int v9; // r5
  bool v10; // zf
  char v12[488]; // [sp+0h] [bp-1F8h] BYREF

  v1 = off_20CABA8;
  v2 = v12;
  v3 = 0xF2;
  do
  {
    v4 = v1[1];
    v5 = *v1;
    v1 += 2;
    --v3;
    v2[1] = v4;
    *v2 = v5;
    v2 += 2;
  }
  while ( v3 );
  v6 = *v1;
  v7 = *a1;
  v8 = 0;
  *v2 = v6;
  while ( 1 )
  {
    v9 = v12[2 * v8];
    v10 = v7 == v9;
    if ( v7 == v9 )
      v10 = a1[1] == v12[2 * v8 + 1];
    if ( v10 )
      break;
    v8 = (__int16)(v8 + 1);
  }
  return v8;
}
```

第一个do-while循环是在复制数据，先忽略掉；后面的循环则是将变量`a1`（寄存器`R0`）的前2个字节和`v12`（长度为0x1E8的字节数组）的每2个字节依次进行比较，`v18`指示`v12`数组中的位置。如果相等就返回`v8`，如果不相等，就继续比较下2个字节。通过“Tools”→“View Memory”可以知道`R0`指向的地址是`8A 61 88 ED 89 DE`，可以猜测是Shift-JIS编码的字符（“蛎逸迦”），对照生成的码表，发现恰好是“亚古兽”，也就是数码宝贝的名字。`v12`指向的地址是`0x27E3280`，跳转过去之后发现是这样的字节序列：

``` plaintext
Offset(h) 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F

00903280  81 40 83 41 82 A0 83 40 82 9F 83 43 82 A2 83 42  .@ƒA‚ ƒ@‚ŸƒC‚¢ƒB
00903290  82 A1 83 45 82 A4 83 94 83 44 82 A3 83 47 82 A6  ‚¡ƒE‚¤ƒ”ƒD‚£ƒG‚¦
009032A0  83 46 82 A5 83 49 82 A8 83 48 82 A7 83 4A 82 A9  ƒF‚¥ƒI‚¨ƒH‚§ƒJ‚©
009032B0  83 4B 82 AA 83 4C 82 AB 83 4D 82 AC 83 4E 82 AD  ƒK‚ªƒL‚«ƒM‚¬ƒN‚.
```

看得出来也是Shift-JIS编码的文本，解码出来是“　アあァぁイいィぃウうヴゥぅエえェぇオおォぉカかガがキきギぎクく……”，也就是平片假名的日文五十音顺序。结合上面的分析可以推测，这个函数是用来将一个字符转换为在五十音中的顺序，而汉化后数码宝贝的名字并非假名，导致一直无法跳出循环。

为了方便说明，先给这个函数命名为`get_char_order`。既然如此，看看英化版是怎么处理的吧：

``` plaintext
MOV             R0, #0xFFFFFFFF
RET
```

好家伙，直接返回了-1，比都不比了，所有字符都一样。我当然也可以直接这么做，反正这个功能也不是很重要。但是，真的没有解决办法吗？

## 按拼音排序

由于日文版中，数码宝贝的名字是用假名表示的，所以直接开辟一块空间来存放假名的顺序是可行的。而在汉化之后，数码宝贝的名字都是汉字，用到的字符种类必然大于原来假名的数量。因此，直接调用原来的比较逻辑不太可行。但也并不是毫无办法——反正汉化要修改码表，如果在创建码表时就将汉字按拼音排序，那么只需要比较汉字的编码就行了。排序可以用pypinyin这个库，就不展开说了。

接下来要做的就是修改原有的函数。前面提到的函数`get_char_order`是用于将字符转换为在五十音中的顺序的，返回值似乎是`__int16`类型，只需要把大端序的Shift-JIS编码转换为小端序的数值即可——真的是这样吗？去这个函数的一处调用处看一下：

``` plaintext
loc_20CAC58
ADD             R0, R9, R1
BL              sub_20CAB18
ADD             R1, R9, R8
STRB            R0, [R1, #0x60]
```

存储返回值用的是`STRB`指令，也就是说只保存1个字节。对于原版游戏来说，能用于命名的字符种类不到256个，所以1个字节就够了。但是汉化之后256个字符肯定不够用，如果改成2个字节又要修改整个函数的调用逻辑。暂时先不动这里，看看能不能找到其他的解决办法。

继续追踪调用`get_char_order`的函数，其起始位置是`0x20CAC0C`，反汇编一下：

``` c
int __fastcall sub_20CAC0C(char *a1, int a2)
{
  int i; // r7
  char *v4; // r9
  int j; // r8
  int v6; // r9
  int v7; // r8
  int v8; // r7
  int result; // r0
  int m; // r2
  int k; // [sp+4h] [bp-B4h]
  char v13[176]; // [sp+8h] [bp-B0h] BYREF

  for ( i = 0; i < a2; ++i )
  {
    v4 = &a1[140 * i];
    for ( j = 0; v4[2 * j]; ++j )
      v4[j + 96] = get_char_order(&v4[2 * j]);
    v4[j + 96] = -1;
  }
  v6 = 0;
  for ( k = a2 - 1; v6 < k; ++v6 )
  {
    v7 = a2 - 1;
    if ( k > v6 )
    {
      do
      {
        v8 = 140 * v7;
        if ( sub_20CABAC(&a1[140 * v7 - 140 + 96], &a1[140 * v7 + 96]) == 1 )
        {
          sub_2008100(&a1[v8], v13, 140);
          sub_2008100(&a1[v8 - 140], &a1[v8], 140);
          sub_2008100(v13, &a1[v8 - 140], 140);
        }
        --v7;
      }
      while ( v7 > v6 );
    }
  }
  result = a2;
  for ( m = 0; m < a2; ++m )
  {
    *(_WORD *)&a1[140 * m + 124] = m;
    result = a2;
  }
  return result;
}
```

在第一个循环中，通过调用`get_char_order`函数将每个字符转换为在五十音中的顺序，存储在`&a1[140 * i + 96]`开始的空间中。第二个循环则是根据字符顺序进行冒泡排序，换数码宝贝的数据。注意到数码宝贝名字的保存地址是`&a1[140 * i]`，因此想到，可以在冒泡排序时直接把名字的保存地址作为参数传给比较函数，就免去了调用`get_char_order`的麻烦。

总结出来，要做的事如下：

1. 删除对`get_char_order`的调用，防止在这里卡死（甚至可以删掉整个循环，因为已经不需要了）。
2. 将传给`sub_20CABAC`的参数修改为数码宝贝名字的保存地址。
3. 修改`sub_20CABAC`函数，直接比较数码宝贝名字的编码。

第1步很简单，将`0x20CAC28`处的`BLE loc_20CAC80`修改为`B loc_20CAC80`即可。

第2步原始汇编代码如下：

``` plaintext
loc_20CACB4
MUL             R7, R8, R11
SUB             R0, R7, #0x8C
ADD             R0, R10, R0
ADD             R1, R10, R7
ADD             R0, R0, #0x60
ADD             R1, R1, #0x60
BL              sub_20CABAC
CMP             R0, #1
BNE             loc_20CAD0C
```

将`ADD R0, R0, #0x60`和`ADD R1, R1, #0x60`改为`NOP`即可。

第3步略微有些麻烦，`sub_20CABAC`还有其他调用，因此不方便直接修改这个函数。好在`get_char_order`这个函数不再需要了，可以借这里的空间来用。修改后的代码：

``` c
int32 compare_digimon_name_new(u8 *a, u8 *b)
{
  u8 **a_loc = &a;
  u8 **b_loc = &b;
  u16 a_char = NNSi_G2dSplitCharShiftJIS(a_loc);
  u16 b_char = NNSi_G2dSplitCharShiftJIS(b_loc);
  while (a_char == b_char)
  {
    if (a_char == 0)
    {
      return 0;
    }
    a_char = NNSi_G2dSplitCharShiftJIS(a_loc);
    b_char = NNSi_G2dSplitCharShiftJIS(b_loc);
  }
  if (a_char < b_char)
  {
    return -1;
  }
  return 1;
}
```

这里的`NNSi_G2dSplitCharShiftJIS`函数是用来加载Shift-JIS编码的字符的，返回值是小端序的数值，并且会移动传入的指针。原本游戏中就有这个函数，位于`0x202EA30`位置。之所以没有用`u16 a_char = a[0] << 8 | a[1]`，是为了兼容英化版的存档（英化版使用了半角字符，占1个字节）。

## 另一处排序

回到`get_char_order`这个函数的调用，除了上面一处调用（用来比较给数码宝贝起的名字）之外，游戏中还有一处调用，是用来在图鉴中比较数码宝贝的名字的。打开DeSmuME，在`0x20CAB18`处下一个断点，然后打开图鉴，发现断点命中了。跳转到调用位置`0x20E9D28`，发现了一处比较复杂的调用逻辑：

``` plaintext
loc_20E9CFC
ADD             R7, SP, #0x20
MOV             R0, R7
BL              NNSi_G2dSplitCharShiftJIS
SUB             R5, R5, #1
B               loc_20E9D3C

loc_20E9D10
CMP             R0, #0xA
BEQ             loc_20E9D34
MOV             R1, R0, ASR#8
STRB            R0, [SP, #1]
MOV             R0, R6
STRB            R1, [SP]
BL              get_char_order
STRB            R0, [R4, R8]
ADD             R8, R8, #1

loc_20E9D34
MOV             R0, R7
BL              NNSi_G2dSplitCharShiftJIS

loc_20E9D3C
CMP             R0, #0
ADDEQ           SP, SP, #4
POPEQ           {R3-R8, LR}
ADDEQ           SP, SP, #0x10
BXEQ            LR
CMP             R8, R5
BCC             loc_20E9D10

loc_20E9D58
ADD             SP, SP, #4
POP             {R3-R8, LR}
ADD             SP, SP, #0x10
BX              LR
```

重点关注`BL get_char_order`前后的语句，发现是通过`NNSi_G2dSplitCharShiftJIS`函数依次将`R7`寄存器指向地址处的字符取出，存放到`SP`栈中，然后调用`get_char_order`函数获得字符的编号，并将编号保存在`R4 + R8`处。但此时只是存储了字符编号，还没有进行比较。在`R4 + R8`处下一个读取断点，发现在`sub_20CABAC`函数内部命中了读取断点。此时`R0`和`R1`寄存器的两个地址恰好是存放字符编号的地址。

在这里，由于`R0`和`R1`寄存器指向的内存地址区域没有保存原始的名字，因此没法直接调用刚才编写的`compare_digimon_name_new`函数。但是，我们可以修改`0x20E9D28`附近的逻辑，把原来`R4 + R8`处存放的字符编号修改为名字的内存地址：

``` plaintext
loc_20E9D18
LDR             R0, [SP, #0x20]
SUB             R0, R0, #2
STRH            R0, [R4]
MOV             R0, R0, LSR#0x10
STRH            R0, [R4, #2]
B               0x20E9D58
```

这里使用了两次`STRH`指令，分别将低16位和高16位存储到`R4`和`R4 + #2`处。之所以没有直接使用`STR`指令，是因为`R4`的地址可能没有对齐到4字节，而`STR`指令的地址必须要对齐到4个字节。随后修改`sub_20CABAC`：

``` plaintext
sub_20CABAC
LDRH            R2, [R0]
LDRH            R0, [R0, #2]
ADD             R0, R2, R0, LSL#16
LDRH            R2, [R1]
LDRH            R1, [R1, #2]
ADD             R1, R2, R1, LSL#16
B               compare_digimon_name_new
```

使用`LDRH`指令读取低16位和高16位，组合成一个32位的地址，然后传给`compare_digimon_name_new`函数进行比较。这样就完成了对图鉴中数码宝贝名字的排序。

## 接下来呢？

实现了按拼音排序，但还有其他问题等着解决。在初期测试的时候，经常会出现莫名其妙的卡死现象，推测是新字库太大导致的。如何压缩字库呢？且听下回分解。
