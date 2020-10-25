---
css: bilibili
date: 2019-11-26 12:00
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRnuXsKbo6P2vzJ5gyibs6g4lF7VEU4vMicFmaTeul8xt9NyUG5AibhKCscKV5lK4OfJkTOaBhK9VWyQgQ/0
info: EndNote 其实也是可以管理中文文献的。
js: bilibili
last_modified_at: 2020-10-25 23:34
tags: 三次元 技术指南
title: 用 EndNote 管理中文文献
wechat_link: https://mp.weixin.qq.com/s/gTwaB7uqqNfTbg0UgsL4zw
---
## 0. 前言
一个月前（2019 年 10 月 20 日）环院学生会邀请了 2019 级博士生陈龙师兄介绍了 EndNote 软件的食用指南，想必各位都有不少收获。如果想回顾这场讲座的内容，请移步哔哩哔哩<sup class="ref-endnote"><a href="#ref-chen-long"></a></sup>：

<div class="bilibiliBox" data-aid="71909726" data-page="1"></div>

作为本科生，我个人平时写课程论文时的参考文献还是以中文文献为主的。奈何 EndNote 对中文文献管理的支持并不算太好，想要用 EndNote 管理中文文献可能还需要花费一点功夫。最近趁着 18 本的小朋友在写《环境科学》文字报告、19 本的小朋友在准备《环境问题》课堂展示，我也分享一些个人使用 EndNote 管理中文文献的经验，希望对大家有所帮助。

## 1. 为啥要用 EndNote
第一，**EndNote 可以管理文献**。如果把文献实体化为一本本书，那么知网等数据库就像是北京大学图书馆，里面的藏书非常丰富。但我们在写论文、作报告的时候并不会把数据库里所有的文献都阅读一遍（就像我们不会把北大图书馆的书都搬出来一样，当然，如果能周读文献 3000 页当我没说），而是会选取对报告内容有用的文献进行阅读（就像我们从图书馆中借书后放在自己的书架上一样）。此时，EndNote 就像书架一样，可以用来分类管理我们选取的文献。

第二，**EndNote 可以管理文献插入文章中的格式**。对于本科生来说，大部分课程论文、报告等对于参考文献的引用格式要求都是 GB/T 7714-2015《信息与文献 参考文献著录规则》。尽管许多数据库（如知网）和搜索引擎（如百度学术）都直接提供了符合 GB/T 7714-2015 标准的引用格式，但它们提供的格式还是有略微不同（例如百度学术会在逗号后面加空格，而知网不会），对于追求格式规范的朋友来说还是不够完美。另外，在正文中插入参考文献时需要用对文献进行标号（[1]、[2]、[3]等），如果用手动标号的方法，一旦之后对文本顺序进行调整，后果不堪设想。（我知道 Word 可以插入尾注，也能插入引文，但是效果都不咋好）

虽然我只能想到这两条理由，但是我觉得足够了。原因说得再多都是废话，下面才是真正有用的东西。

## 2. EndNote 的安装
**注：以下操作均基于 64 位 Windows 10 操作系统，本人使用的 EndNote 版本为 EndNote X9.2。其他操作系统或软件版本操作方法应该类似。**

“北京大学正版软件共享平台”（http://software.pku.edu.cn/）上已经提供了正版 EndNote 的下载，也提供了安装说明。在下载压缩包后需将 .msi 文件和 License.dat 文件放在同一个文件夹中（后者是许可证文件，用于正版软件激活），随后打开 .msi 文件，按照说明安装即可。**注意：程序默认安装位置是“C:\Program Files (x86)\EndNote X9”，如果此处修改了安装位置，请先记下来以便后续操作。**

安装完毕后，打开软件。初次使用时需要创建一个“Library”，这便相当于前文所说的“书架”，之后导入的所有数据都会存放在 Library 中。此时在 Library 所在的文件夹中还会出现一个名为“\*.Data”（\* 代表文件名）的文件夹，里面存放了数据文件，不可删除。

## 3. 将文献导入 EndNote
### 3.1. 从数据库或搜索引擎导入
许多数据库或搜索引擎都提供了可用于导入 EndNote 的文件。以知网为例，搜索页面的每个条目前都有复选框，当选中复选框后单击右侧“已选文献”，页面右下角会出现“已选文献”文本框。点击“导出/参考文献”后，再从左边的列表中找到“EndNote”，点击“导出”，即可得到一个 .txt 文件。百度学术等网站的导出方式类似。

然后，从文件资源管理器中，右键单击从网站上导出的数据文件，从“打开方式”中选择“EndNote X9...”即可导入此文件。

或者，也可从 EndNote 软件菜单栏中选择File → Import → File，在“Import File”中选择对应的文件，在“Import Option”中选择“EndNote Import”即可。

此种方法导入的文献并不会附带文献原文 pdf，需要手动添加。方法是选中单篇文献，点击右侧预览框上方的“曲别针”图标，然后选择对应的 pdf。

### 3.2. 从 pdf 导入
这个方法其实是我现学现卖的。一般从外文数据库下载的 pdf 文件都会保留 DOI（Digital Object Identifier，数字对象标识符）信息，此时将 pdf 导入 EndNote 后，软件会从数据库查找文献的信息并存入 Library 中。导入方法与上文类似。

此种方法导入的文献会自动附带导入的 pdf 文件，但是对于大部分中文期刊来说并不适用。

### 3.3. 手动输入
一般来说，如果需要对网页进行引用，则需要手动输入。此处也以网络文献为例讲解手动输入的方法：

从 EndNote 软件菜单栏中选择References → New Reference，然后从出现的表单中进行填写。首先在第一行“Reference Type”中选择“Web Page”，然后依次填写以下项：

- Author：作者。
- Title：标题。
- Access Date：获取日期，YYYY-MM-DD 格式（如：2019-11-25）。
- Last Update Date：最后更新日期，YYYY-MM-DD 格式，可留空。
- Type of Medium：文献类型，参考 GB/T 7714-2015。常用：电子公告 EB（一般我不知道该用什么就用它）；报纸 N；数据库 DB。
- URL：网址。

其他项可填可不填，GB/T 7714-2015 中未对其他项进行要求。输入完毕后，保存关闭即可。

## 4. 在 Word 中使用 EndNote
### 4.1. 插入参考文献引用
安装 EndNote 后，Word 的菜单栏会出现一个名为“EndNote X9”的选项卡。从此选项卡中可以直接插入参考文献引用。如果已在 EndNote 软件中选中要插入的文献，可直接选择Insert Citation → Insert Selected Citation(s)。否则，则选择Insert Citation → Insert Citation，从打开的对话框中搜索所需的文献。

插入引用后，软件会自动在文档最后插入所有被引用的参考文献。从选项卡上方的“Style”下拉菜单可以选择参考文献列表的格式，需要注意的是 GB/T 7714-2015 格式并不在默认的格式中，需要手动添加（见下文）。

如果在正文中修改了文献引用顺序，或对引用有所增添，可选择“Update Citations and Bibliography”，软件会自动更新标号。

### 4.2. 修改参考文献列表的格式
由于 EndNote 默认格式中没有 GB/T 7714-2015 格式，而官网给出的格式也有一些问题，所以建议大家直接下载本人修改过的版本：

<https://disk.pku.edu.cn/link/83E76C0C7A4A826203DC45394CB4A282>

还记得前文所述的安装位置吗？将“Chinese Std GBT7714 (numeric) Copy.ens”文件复制到安装位置文件夹下的“Styles”文件夹下（如果是默认安装路径，则应为“C:\Program Files (x86)\EndNote X9\Styles”），然后即可从上文所述的样式列表中找到这一格式。（如果下拉菜单中无此格式，则需选择“Select Another Style”，然后从对话框中搜索）

需要注意的是，该格式默认在作者超过 3 位时对第 4 位及以后的作者名用“等”代替，而引用英文文献时应换为“et al”。这可以在 EndNote 菜单栏中的 Edit → Output Styles → Edit "Chinese Std GBT7714 (numeric) Copy" → Bibliography → Author Lists 中修改，但不支持中英文同时存在的情况。如有这种需求，建议在正文定稿后复制全部参考文献列表，然后手动修改。

## 5. 后记
本文写得有些仓促，内容可能也不算太完善，希望大家多多交流，共同进步。

## 参考文献
1. {: #ref-chen-long }陈龙. Endnote 使用经验分享 [Z/OL]. (2019-10-20) [2019-11-25]. <https://www.bilibili.com/video/av71909726/>.
{: .endnoteRefList .square}