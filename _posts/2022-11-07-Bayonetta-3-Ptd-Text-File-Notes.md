---
date: 2022-11-07 10:12
head_image: https://store-jp.nintendo.com/dw/image/v2/BFGJ_PRD/on/demandware.static/-/Sites-all-master-catalog/ja_JP/dw1c6246c4/products/D70010000046399/heroBanner/9cf0e06bde95c972b7bb681630873994325ebae595d81f00dcb14c57ef543a1b.jpg
info: Analysis of PTD text files of <i>Bayonetta 3</i>.
last_modified_at: 2023-03-17 00:02
links: 
- - https://ninterviews.xzonn.top/switch/axb7a.famitsu.html
  - 充满惊喜的《蓓优妮塔3》 - 任天堂开发者访谈保存计划
tags: Switch 技术指南
title: 《蓓优妮塔3》PTD文本文件分析笔记
---
## 分析过程
提取romfs后得到一些`*.pkz`格式的文件，以“Bayonetta 3 pkz”为关键词搜索可以找到[Timo654](https://gamebanana.com/members/2088296)已经写好的[pkz解包工具](https://gamebanana.com/tools/11041)：

{% include figure.html src="fcf9f0c9b5e43b2798f6c8ab64a11828.png" alt="pkz解包工具" width="640" height="360" %}

由于我只关注游戏文本，观察到romfs中包含文件`Text_000.pkz`，推测为文本文件的压缩包，使用该工具解包得到如下文件结构：

{% include figure.html src="c525b563a1d939db3c6071cda3a8adea.png" alt="压缩包解包后的结构" width="807" height="463.5" %}

用HxD打开bin文件，发现文件头为`50 54 44 00`（`PTD.`），以“Bayonetta 3 ptd”为关键词搜索，未找到相关结果，因此决定自己分析。

{% include figure.html src="4a52276efc85a28e07e4e3e3568fa5a3.png" alt="CHAPTER/chapter01_ev_USen.bin" width="949.5" height="535.5" %}

以上图对应的`CHAPTER/chapter01_ev_USen.bin`为例，前面一些区块明显看出是长度为0x10的条目，计数之后发现类似结构的区段长度为0x6D0，即共有0x6D个条目，恰好对应位置`0x0C-0x0F`的数值`0x6D`，因此得知该位置的数值为条目数量。

{% include figure.html src="110715bb649d7e1666c41d4c2977b878.png" width="949.5" height="535.5" %}

每个条目应该有4个Int32数据，以前文第一条为例，`77 F5 79 01 D0 06 00 00 16 00 00 00 2C 00 00 00`对应`[24769911, 1744, 22, 44]`。第1个值数值比较大，且递增排列，推测是hash，且Int32的hash推测是Crc32。第2个数值相对较小，同样递增，推测是数据的offset。第3个数值和第4个数值比较小，且没有明显的规律，第4个数值是第3个数值的2倍，结合下文的文本分析，推测第3个数值是字符数（char），第4个数值是字节数（byte），通常情况下UTF-16-LE编码的字节数是字符数的2倍。

后面的区域排列也比较规则，推测为文本区域，但里面有很多`0x26`（`&`）填充，且文本区域无法被直接解析。以上图为例，`69 26 56 26 57 26 85 26 6B 26 7C 26 57 26 56 26 5A 26 56 26`对应`i&V&W&…&k&|&W&V&Z&V&`，无法阅读。因此推测可能是所有字节都加了`0x26`。复制出来手动修改，得到了以下数据：

{% include figure.html src="d810c7076bf933d4d5f3310b8f79b6d5.png" width="949.5" height="534" %}

能读了，UTF-16-LE编码，以`00 00`为一条字符串的结尾。前面几条文本全为大写，而且有下划线`_`和数字的组合，推测这部分应该是存储时的键（key），或是变量名，具体值在后面。根据前文的hash序列和这里的字符串可以得到一个hash-key表（中间省略）：

``` json
{
  "0179f577": "C01_EV1040_00080_RODN",
  "037ea18d": "C01_EV1040_00030_RODN",
  "0469e5a2": "C01_EV1000_00460_GIRL",
  ...
  "184cf6b7": "chapter01_ev",
  ...
  "3b8ba7c7": "Text",
  "3bd4b5a9": "C01_EV1000_00390_BAYO",
  "3cc2b4f9": "CharName",
  ...
  "7805ac12": "groupid",
  "7bc23969": "C01_EV1010_00070_GIRL",
  "7d61f15b": "C01_EV1000_00150_GIRL"
}
```

继续向后读，读到了几个熟悉的hash：

{% include figure.html src="33142b598541e75811a108c8ce7c6c1d.png" width="949.5" height="534" %}

`184cf6b7`对应`chapter01_ev`，即不带语言代码`_USen`的文件名，`7805ac12`对应`groupid`。后面连续出现了多个hash，均对应典型的键名，例如`3b12d06a`对应`C01_EV1000_00010_ENZO`等，推测是文本的键名顺序。文本键名长度为0x1A4，共有0x69个键名，对应字节序列`12 AC 05 78`后面的`69 00 00 00`。后面一个可读的hash是`3b8ba7c7`，对应`Text`。后面又出现了`3cc2b4f9`，对应`CharName`，接续在后面的也是`69 00 00 00`，恰好与groupid的数目相对应。与前文类似的结构，共有0x69个条目，每个条目长度0x10。条目数据后面是文本数据：

{% include figure.html src="9f2291c9d65f808a336ef6f8db7acdd0.png" width="949.5" height="534" %}

以同样的方式解析，并与CharName的hash对应，再按`groupid`排序，即得到文件中包含的文本数据：

``` text
C01_EV1000_00010_ENZO	亲爱的……\n艾多……！艾多娜……
C01_EV1000_00020_RODN	他刚才想要跑出去，但被我拼命拦住了。
C01_EV1000_00030_RODN	毕竟……他还没把账结清呢。
C01_EV1000_00040_RODN	这里应该能暂时撑一阵……
C01_EV1000_00050_RODN	不过也撑不了太久。
...
```

再后面又是一些hash，不过文本已经提取出来了，就忽略了。

## 导出脚本
[GitHub Gist](https://gist.github.com/Xzonn/ace69d191064c356bc873206640c76b4)

``` python
#!/usr/bin/python3
# -*- coding: UTF-8 -*-

import io
import os
import struct
import json

def decode_string(byte_array):
  byte_array = list(map(lambda x: (x - 0x26 + 0x100) % 0x100, byte_array))
  assert byte_array[-2:] == [0, 0]
  return bytes(byte_array[:-2]).decode("utf-16-le", "replace")

def hash_format(f):
  _hash, = struct.unpack("<I", f.read(4))
  return f"{_hash:08x}"

def export_ptd(f: io.BufferedReader):
  assert f.read(4) == b"PTD\0"
  _1, _2, hash_count, hash_data_pos, _4, string_data_pos = struct.unpack("<6I", f.read(24))
  assert _1 == 0x02
  assert _2 == 0x26
  assert _4 == 0x01
  data = {
    "_1": _1,
    "_2": _2,
    "hash_count": hash_count,
    "hash_data_pos": hash_data_pos,
    "_4": _4,
    "string_data_pos": string_data_pos,
    "hash_table": {},
    "texts": {}
  }

  # hash 表
  hash_name_pos = hash_data_pos + hash_count * 0x10
  for i in range(hash_count):
    f.seek(hash_data_pos + i * 0x10)
    hash = hash_format(f)
    name_pos, char_length, byte_length = struct.unpack("<3I", f.read(12))
    assert byte_length == char_length * 2
    f.seek(hash_name_pos)
    name = decode_string(f.read(byte_length))
    hash_name_pos = f.tell()
    data["hash_table"][hash] = name
  assert string_data_pos == f.tell()
  # assert "3b8ba7c7" in data["hash_table"]
  # assert data["hash_table"]["3b8ba7c7"]["name"] == "Text"

  # 文件信息
  hash = hash_format(f)
  has_groupid, __2, __3, text_pos = struct.unpack("<4I", f.read(16))
  assert has_groupid in [0, 1]
  assert __2 == 0x14
  assert __3 == 0x02

  # groupid
  if "7805ac12" in data["hash_table"]:
    hash = hash_format(f)
    assert hash == "7805ac12"
    groupid_count, __2 = struct.unpack("<2I", f.read(8))
    assert __2 == 0x0c
    groupids = list(map(lambda x: data["hash_table"][hash_format(f)], range(groupid_count)))
    # data["groupids"] = groupids
  else:
    # 没有 groupid，无文本
    assert has_groupid == 0
    pass
  
  # Text
  hash = hash_format(f)
  assert hash == "3b8ba7c7"
  text_count, __2 = struct.unpack("<2I", f.read(8))
  if has_groupid == 0:
    assert text_count == 0
  else:
    assert text_count > 0
    assert groupid_count == text_count
  assert __2 == 0x18

  # CharName
  hash = hash_format(f)
  assert hash == "3cc2b4f9"
  __1, __2 = struct.unpack("<2I", f.read(8))
  assert __1 == text_count

  text_data_pos = f.tell()
  text_pos = text_data_pos + text_count * 0x10
  for i in range(text_count):
    f.seek(text_data_pos + i * 0x10)
    hash = hash_format(f)
    name_pos, char_length, byte_length = struct.unpack("<3I", f.read(12))
    assert byte_length == char_length * 2
    f.seek(text_pos)
    text = decode_string(f.read(byte_length))
    text_pos = f.tell()
    data["texts"][data["hash_table"][hash]] = text
  
  if has_groupid == 1:
    data["texts"] = {
      k: data["texts"][k] for k in sorted(data["texts"].keys(), key=groupids.index)
    }
  return data

if __name__ == "__main__":
  writers = { lang: open(f"{lang}.txt", "w", -1, "utf8") for lang in ["CNzh", "TWzh", "USen", "JPja"] }

  for root, dirs, files in os.walk("Text_000"):
    for file in files:
      with open(os.path.join(root, file), "rb") as f:
        if not file.endswith(".bin"):
          continue

        data = export_ptd(f)

      with open(os.path.join(root, file.replace(".bin", ".json")), "w", -1, "utf8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

      file_path = "/".join(os.path.join(root, file).replace("\\", "/").split("/")[-2:])
      *_, lang = file_path.split(".")[0].split("_")
      file_name = "_".join(_)
      if lang in writers:
        writers[lang].write(f"{file_name}\n")
        for name, text in data["texts"].items():
          text = text.replace("\t", "\\t").replace("\r\n", "\\n").replace("\n", "\\n")
          writers[lang].write(f"{name}\t{text}\n")

  for lang in writers:
    writers[lang].close()
```

**2023-03-17更新**：《蓓优妮塔 起源：瑟蕾莎与迷失的恶魔》使用了同样的文本格式，只不过简体中文的代码是`CSzk`，繁体中文的代码是`TWzk`，怀疑是打错了`zh`和`zk`……