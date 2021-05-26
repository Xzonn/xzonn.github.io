---
class: navigation-limit-2
date: 2017-11-06 12:00
infobox: complete
last_modified_at: 2020-01-03 23:23
math: true
tags: 知识点整理 编程
title: 《计算概论》知识点整理
---
## 一、硬件和软件
### 1. 计算机系统组成
{% include figure.html src="https://file.moetu.org/images/2020/02/20/93dcd54dc6f1f4966ecd5e509d2eecdfb8a902e1a7ed9d4a.png" alt="计算机系统组成" width="360" height="240.58" %}

### 2. 计算机发展的几个阶段
<table class="text-center table">
<thead>
<tr><th>&#160;</th><th>年代</th><th>元件</th><th>软件</th><th>应用</th></tr>
</thead>
<tbody>
<tr><td>第一代</td><td>1946－1958</td><td>电子管</td><td>汇编语言</td><td>科学计算</td></tr>
<tr><td>第二代</td><td>1959－1964</td><td>晶体管</td><td>高级语言</td><td>数据处理工业控制</td></tr>
<tr><td>第三代</td><td>1965－1970</td><td>集成电路</td><td>操作系统</td><td>文字处理图形处理</td></tr>
<tr><td>第四代</td><td>1971－？</td><td>大规模集成电路</td><td>数据库、网络等</td><td>社会的各个领域</td></tr>
<tr><td>第五代</td><td colspan="4">将采集、存储、处理、通信同人工智能结合在一起的智能计算机系统</td></tr>
</tbody>
</table>

### 3. 冯·诺依曼理论
* 美籍匈牙利数学家冯·诺依曼提出计算机基本结构和工作方式的设想，为计算机的诞生和发展提供了理论基础。理论要点：
  * 计算机硬件设备由存储器、运算器、控制器、输入设备和输出设备5部分组成。
  * 存储程序思想——把计算过程描述为由许多命令按一定顺序组成的程序，然后把程序和数据一起输入计算机，计算机对已存入的程序和数据处理后，输出结果。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/7ff0197ed5c93c10fc9c293d13d6e9213436f60463712a0c.png" alt="冯·诺依曼理论" width="360" height="200.99" %}

### 4. CPU
* 主频：指计算机主时钟在一秒钟内发出的脉冲数，在很大程度上决定了计算机的运算速度。单位为MHz。
* 字长：计算机能够直接处理的二进制数据的位数，决定地址总线、数据总线、控制总线的宽度。单位为位（bit，b），如8位、16位、32位、64位等。

### 5. 存储系统
<table class="table">
<tbody>
<tr><th style="font-size: 5em;" rowspan="5">↑</th><td>通用寄存器</td></tr>
<tr><td>高速缓存</td></tr>
<tr><td>主存储器</td></tr>
<tr><td>联机外存</td></tr>
<tr><td>脱机外存</td></tr>
</tbody>
</table>

* 中央处理器能直接访问的存储器称为内部存储器，它包括快速缓冲存储器（Cache）和主存储器，中央处理器不能直接访问的存储器称为外部存储器，外部存储器中的信息必须调入内存后才能为中央处理器处理。
* 主存储器按读写功能，可分只读存储器（ROM）和随机存储器（RAM）两种。
* 外存储器也称为辅助存储器，一般容量较大，速度比主存较慢。
* 微型机的存储器用来存放程序和数据，存储器容量的大小、存取数据速度的快慢将直接影响到微型机系统的性能。
* 优盘：EEPROM。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/976961e6d880cbf2b576e059200ca6a4d2faa40050e8cee7.png" alt="存储器" width="360" height="178.78" %}

### 6. 总线
* 按功能和传输信息的种类分为：
  * 数据总线（DB）：用于CPU与内存或I/O接口之间的数据传递，它的条数取决于CPU的字长，信息传送是双向的。
  * 地址总线（AB）：用于传送存储单元或I/O接口的地址信息，它的条数决定了计算机内存的大小。（16条地址总线内存大小为2<sup>16</sup>）。
  * 控制总线（CB）：传送控制器的各种控制信息，它的条数由CPU的字长决定，信息传送是单向的，只由CPU发出。
* 按照总线所连的部件分为：
  * 内部总线：用于同一部件的内部连接，如CPU与内部连接各寄存器和运算器部件的总线。
  * 系统总线：是指主板上连接计算机各个部件的总线，如CPU与内存、I/O通道之间的互相连接。
  * 扩展总线（外部总线）：负责主机与外部设备之间的通信（微机作为一种设备，通过该总线与其他设备进行信息与数据的交换）。例如IDE接口, SCSI，USB，IEEE1394。
* 典型总线：ISA，PCI，AGP。
* 
### 7. 软件
* 计算机软件可分为系统软件和应用软件两大类。
  * 系统软件：用来支持应用软件的开发和运行的，主要是操作系统软件，如DOS、Windows95/98/2000、Unix、Linux、WindowsNT。
  * 应用软件：为了某个应用目的而编写的软件，主要有文字处理软件、电子表格软件、数据库管理软件等。

## 二、计算机网络基础
### 1. 分类
* 按地理范围分类
  * 局域网（LAN）：地理范围一般几百米到十公里之内，属于小范围内的连网。如一个建筑物内、一个学校内、一个工厂的厂区内等。局域网的组建简单灵活，使用方便。
  * 城域网（MAN）：地理范围可从几十公里到上百公里，可覆盖一个城市或地区，是一种中等形式的网络。
  * 广域网（WAN）：地理范围一般在几千公里左右，属于大范围连网。如几个城市，一个或几个国家。是网络系统中的最大型的网络，能实现大范围的资源共享，如国际性的Internet网络。
* 按拓扑结构分类：算机网络的物理连接形式叫做网络的物理拓扑结构。
  * 总线拓扑结构：是一种共享通路的物理结构。这种结构中总线具有信息的双向传输功能，普遍用于局域网的连接。
  * 星型拓扑结构：是一种以中央节点为中心，把若干外围节点连接起来的辐射式互联结构。这种结构适用于局域网。
  * 环型拓扑结构：是将网络节点连接成闭合结构。信号顺着一个方向从一台设备传到另一台设备，每一台设备都配有一个收发器，信息在每台设备上的延时时间是固定的。特别适用于实时控制的局域网系统。

### 2. 局域网的连接
{% include figure.html src="https://file.moetu.org/images/2020/02/20/04c0899f29efea556ad42337e289d7c1d1a11952dce027f5.png" alt="局域网的连接" width="303" height="182" %}

### 3. OSI的七层体系结构
<table class="table">
<tbody>
<tr><th style="font-size: 7em;" rowspan="7">↑</th><td>应用层 HTTP、FTP</td></tr>
<tr><td>表示层</td></tr>
<tr><td>会话层</td></tr>
<tr><td>运输层 TCP、UDP</td></tr>
<tr><td>网络层 IP</td></tr>
<tr><td>数据链路层 HDLC</td></tr>
<tr><td>物理层</td></tr>
</tbody>
</table>

### 4. 计算机通信技术
* 电路交换
* 分组（包）交换

### 5. TCP/IP网络协议
* TCP/IP的网络体系结构
  * 网络接口层
  * 网络层
  * 传输层
  * 应用层
* 传输层协议
  * UDP（User Datagram Protocol）→FTP：无连接消息传送协议，类似邮局传送邮件；数据丢失不处理
  * TCP（Transmission Control Protocol）：有连接的流传送协议；建立连接3次握手，关闭连接4次握手![TCP\|1.5](https://file.moetu.org/images/2020/02/20/8f3486a1cbc60c021bed7ea281994fa6aee6098518df0c9c.png)
* TCP/IP功能

{% include figure.html src="https://file.moetu.org/images/2020/02/20/925013653ec0a504f76f033b9c4075860985358674fc8e6b.png" alt="TCP/IP网络协议" width="360" height="198.73" %}

## 三、信息存储与管理
### 1. 十进制数转换成二进制数（整数）
* 把十进制数转换为二进制数的方法是：整数转换用“除2取余法”；小数转换用“乘2取整法”。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/0734c17f59410083bbfcc8a2554bb9e89da4c6d4605ba8d9.png" alt="十进制数转换成二进制数（整数）" width="360" height="267.54" %}

### 2. 十进制数转换成二进制数（小数）
* 将0.745<sub>10</sub>转换成四位二进制小数，转换过程如下：
<table class="table">
<tbody>
<tr><td>0.745 × 2 = 1.490</td><td>取出整数1 (最高位)</td></tr>
<tr><td>0.490 × 2 = 0.980</td><td>取出整数0</td></tr>
<tr><td>0.980 × 2 = 1.960</td><td>取出整数1</td></tr>
<tr><td>0.960 × 2 = 1.920</td><td>取出整数1 (最低位)</td></tr>
<tr><td>0.920</td><td>转换结束</td></tr>
</tbody>
</table>
* 这里，第四次乘积的小数部分不为0，但已满足题目所要求的精度，所以， 0.745<sub>10</sub> ≈ 0.1011<sub>2</sub>。显然，在转换过程中，做的乘法次数越多，结果就越精确。

### 3. 带符号数的表示方法
* 原码：原码就是用最高位表示数的正、负号，0表示正，1表示负，而数值部分用最高位以后的若干位来表示。
  * 二进制数$+0a\_1a\_2\dots a\_{n-1}$的原码为$0a\_1a\_2\dots a\_{n-1}$。
  * 二进制数$-0a\_1a\_2\dots a\_{n-1}$的原码为$1a\_1a\_2\dots a\_{n-1}$。
* 例如：
  * 二进制数`+1000110`的原码表示为: `01000110`。
  * 二进制数`-1000110`的原码表示为: `11000110`。
* 补码：正数的补码和其原码相同；负数的补码是它的原码除符号位外逐位取反（即0变1，1变0），最后在末位加1。
  * 二进制数$+0a\_1a\_2\dots a\_{n-1}$的补码为$0a\_1a\_2\dots a\_{n-1}$。
  * 二进制数$-0a\_1a\_2\dots a\_{n-1}$的补码为$1\overline{a\_1}\overline{a\_2}\dots\overline{a\_{n-1}}+1$。
* 例如：
  * 二进制数`+1000110`的补码表示为: `01000110`。
  * 二进制数`-1000110`的补码表示为: `10111010`。

### 4. 定点数和浮点数
* 通常采取两种简单的约定：一种是约定所有机器数的小数的小数点位置隐含在机器数的最低位之后，叫定点纯整机器数，简称定点整数。另一种约定所有机器数的小数点隐含在符号位之后、有效部分最高位之前，叫定点纯小数机器数，简称定点小数。无论是定点整数，还是定点小数，都可以有原码、反码和补码三种形式。
* 计算机多数情况下采作浮点数表示数值，它与科学计数法相似，把一个二进制数通过移动小数点位置表示成阶码和尾数两部分：$$N=2^E\times S$$其中：$E$是$N$的阶码，是有符号的整数，$S$是$N$的尾数，是数值的有效数字部分，一般规定取二进制定点纯小数形式。

### 5. ASCII码（美国标准信息交换代码）
* 将每个字符用7位的二进制数来表示，共有128种状态。

### 6. 汉字信息编码
* 汉字输入码：大体可分为区位码（数字码）、音码、形码、音形码。
* 汉字交换码：指不同的具有汉字处理功能的计算机系统之间在交换汉字信息时所使用的代码标准，我国使用GB2312-80作为标准。
* 字形存储码：指供计算机显示或打印用的二进制信息，也称字模，通常采用点阵字模。