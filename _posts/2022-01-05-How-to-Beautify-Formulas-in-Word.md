---
class: auto-numbering
date: 2022-01-05 12:25
head_image: https://mmbiz.qpic.cn/mmbiz_jpg/Qh7FH95PRnuloHxksOxTetZaQtOicZ5boXOu9szzEziaUHWtyO0PeHg3PB5xv1oWUlVfib6ITYKhqpkia3CuEpma9w/0
head_image_height: 544
head_image_width: 1280
info: Cambria Math，对不起。
last_modified_at: 2022-01-05 14:25
math: true
references: 
- - https://www.zhihu.com/question/20820433/answer/16290544
  - Office 2010 自带公式编辑器的公式字体怎么修改？
- - https://zhuanlan.zhihu.com/p/30985960
  - TeX Live中的Unicode Math字体
- - https://firamath.github.io/opentype-math-fonts.html
  - OpenType math fonts
tags: 技术指南
title: 如何在Word中修改公式字体
---
<style>
  .times {
    font-family: "Times New Roman", Times, serif;
  }

  .cambria {
    font-family: "Cambria Math", Cambria, serif;
  }

  .stix {
    font-family: "STIX Math", STIX, "Times New Roman", Times, serif;
  }

  .stix-2 {
    font-family: "STIX Two Math", "STIX Two", "Times New Roman", Times, serif;
  }

  .xits {
    font-family: "XITS Math", XITS, "Times New Roman", Times, serif;
  }
</style>

**一句话总结：下载一个支持OpenType Math的字体（如[SITX](https://www.stixfonts.org/)、[XITS](https://github.com/aliftype/xits)等），然后安装在电脑中，即可在Word中设置默认字体。**

## 修改默认字体
2019年的时候我曾经介绍过[如何在微信推送中插入公式]({% link _posts/2019-11-20-How-to-Insert-Formulas-in-Wechat-Articles.md %})。不过做微信推送毕竟是小众需求，更多时候插入公式还是在Word里。但是，Word中公式的默认字体是一个名叫“<span class="cambria">Cambria Math</span>”的字体，虽然也不算太丑，但是和常用的英文字体“<span class="times">Times New Roman</span>”比起来还是有很大区别，让强迫症看着很难受。

{% include figure.html src="226bef39e05e666ad4617fc9dec101cf.svg" alt="<span class=\"cambria\">Cambria Math</span> & <span class=\"times\">Times New Roman</span>" width="952.92188" height="104.57228" %}

手动将公式的字体改为<span class="times">Times New Roman</span>没有任何效果，而且在Word的公式设置中也无法将默认字体设置为<span class="times">Times New Roman</span>。网上有些建议是这样的：先选中公式里的所有文字，然后点击菜单栏中的“转换 → 文本”，再对文本设置<span class="times">Times New Roman</span>字体，然后再将文本设置为斜体。但是这样做有一定缺陷：一方面，对于每个公式要二次处理，非常麻烦；另一方面，对于一些同时包含了斜体和非斜体的公式（例如包含了单位），单独区分更加麻烦。

{% include figure.html src="c52d89348223e68da2ecc56b783d21cd.png" alt="将公式转换为文本" width="1162" height="532" %}

Word的公式选项里其实有“默认字体”这个选项，但很多人的电脑里可能只有<span class="cambria">Cambria Math</span>这一个选项。查找[资料](https://www.zhihu.com/question/20820433/answer/16290544)后发现，Word公式的“默认字体”需要支持OpenType Math，而<span class="times">Times New Roman</span>是不支持这个特性的，因此除非修改<span class="times">Times New Roman</span>字体源文件，否则是无法直接在Word里将其选择为默认字体的。

{% include figure.html src="f5e296dc573a6752b46135034ecc0de5.png" alt="Word中对公式的设置" width="355" height="645" %}

作为替代，可以从网上找到其他与<span class="times">Times New Roman</span>设计较为接近的字体，至少从观感上来看可以保持一致。有人对支持OpenType Math的字体进行了[统计](https://firamath.github.io/opentype-math-fonts.html)，这里我推荐三种字体：[SITX](https://www.stixfonts.org/)（包括第1版和第2版）和[XITS](https://github.com/aliftype/xits)。

{% include figure.html src="44f28e5e56c87e7e282d71d49f1cf132.svg" alt="<span class=\"cambria\">Cambria Math</span> & <span class=\"times\">Times New Roman</span> & <span class=\"stix\">STIX</span> & <span class=\"stix-2\">STIX Two</span> & <span class=\"xits\">XITS</span>" width="952.92188" height="297.40428" %}

这三种字体都比较接近<span class="times">Times New Roman</span>，尽管还有一些差距（例如对<span class="times">z</span>的处理）。我个人使用的是<span class="stix">STIX</span>。在安装了字体之后就可以在公式选项中选择对应的字体，这样之后插入的公式就不用再受<span class="cambria">Cambria Math</span>的折磨了。如果点击右下角的“默认值”，就可以让以后创建的文档都以这个设置为默认值创建公式。

{% include figure.html src="87486b45a93b9344dbdf34d8afd53623.png" alt="用<span class=\"stix\">STIX</span>（上）和<span class=\"cambria\">Cambria Math</span>（下）排版公式" width="310.8" height="260.8" %}

## 其他设置
在Word的公式设置中，还有一些其他有趣的选项。例如，如果将“复制公式时”的选项改为“MathML”，那么在复制Word的公式粘贴到纯文本编辑器中就会显示为MathML格式，类似于：

```xml
<mml:math xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"><mml:mi>x</mml:mi><mml:mo>=</mml:mo><mml:mfrac><mml:mrow><mml:mo>-</mml:mo><mml:mi>b</mml:mi><mml:mo>±</mml:mo><mml:msqrt><mml:msup><mml:mrow><mml:mi>b</mml:mi></mml:mrow><mml:mrow><mml:mn>2</mml:mn></mml:mrow></mml:msup><mml:mo>-</mml:mo><mml:mn>4</mml:mn><mml:mi>a</mml:mi><mml:mi>c</mml:mi></mml:msqrt></mml:mrow><mml:mrow><mml:mn>2</mml:mn><mml:mi>a</mml:mi></mml:mrow></mml:mfrac></mml:math>
```

如果改为“线性模式”，那么复制粘贴后得到的格式与所选的显示方式有关，若为Unicode，则得到Unicode格式的公式，类似于：

```
x=(-b±√(b^2-4ac))/2a
```

若为LaTeX，则为$$\LaTeX$$格式的公式，类似于：

```
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
```

Unicode格式更适合人类阅读，$$\LaTeX$$格式则更适合支持TeX的公式编辑器。

此外，在“数学符号自动更正”中，如果选中“在公示区以外使用‘数字符号自动更正’规则”，那么可以在正文中输入语句自动识别为符号，例如输入`\alpha`然后按下空格，就会被自动转换为α符号。

## TeX公式的获取
在Word中，选择LaTeX格式后可以直接将TeX公式输入并回车，软件将会自动转换为公式。但其对语句的支持并不完整，例如`\dfrac`无法识别为分式，需要手动转为`\cfrac`。获取公式的方法我在之前的文章中讲过，移动过来：

### 手写公式
网络上有很多工具可以直接识别手写公式并转换为TeX代码，而后将TeX代码复制粘贴到Markdown Nice中即可。例如 [MyScript](https://webdemo.myscript.com/views/math/index.html)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/fd17795c7261de0fceb678e7de0a53a55bcf59e23461a915.png" alt="MyScript手写识别示例" width="640" height="300" %}

顺带一提，上述网站除了可以转换为TeX代码外，还可以转换为MathML代码；而MathML代码在粘贴到Word中并选择“只保留文本 (T)”后可以转换为Word内置的公式格式。

如果只是某个字符或命令忘记了，也可以试试另一个工具[Detexify](http://detexify.kirelabs.org/classify.html)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/c13095690b8788057062af278fae18d4b888c26b91a6eece.png" alt="Detexify手写识别示例" width="640" height="300" %}

### 截图识别
如果不想手写公式，也可以直接拿别人写好的公式截图识别。例如[Mathpix Snip](https://mathpix.com/)：

{% include figure.html src="https://file.moetu.org/images/2020/02/20/48e4b64868e87aa432695b24c67b5ed2bc16639d029c427a.png" alt="Mathpix Snip截图识别示例" width="642" height="582" %}

该软件在多平台有客户端，需要注册账号后使用。我个人在注册账号时先后尝试了北大邮箱、126邮箱，但都无法立刻收到验证邮件；而Gmail可以立刻收到验证邮件，可能是因为邮件服务器在国外吧。

### 从别的网页查找代码
许多网页上的公式就是由MathJax渲染出来的（例如我的小站），如果你在某个网页上看到了公式，并且在网页加载过程中左下角出现了灰色文本框，说明这个公式很有可能是MathJax渲染出来的。此时可以右键单击公式 → Show Math As → TeX Commands，即可查看TeX代码。<span class="footnote">我的小站需要用“查看源代码”功能才能找到公式的TeX代码。</span>

{% include figure.html src="https://file.moetu.org/images/2020/02/20/0eb009e6852d029d8b6a73494f224be3b3c6993b36c579fb.png" alt="网页查找代码示例" width="640" height="300" %}

另外，如果右键单击公式 → Show Math As → MathML Code，则可以得到MathML代码，类似“手写公式”中的介绍，此代码也可复制到Word中显示。

### 用TeX编辑器写公式
网页上也有一些TeX编辑器，有些仅仅能实时渲染，有些提供了工具栏，方便输入。比较常见的TeX编辑器：[知乎](https://zhuanlan.zhihu.com/write)。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/f022f8cbf8d490b936882ce6fe15aa956b72f673c887128e.png" alt="知乎公式编辑器示例" width="640" height="300" %}

另外，如果对TeX语法感兴趣，可以查找一些教程，例如：[知乎问题：知乎上的公式是怎么打出来的？](https://www.zhihu.com/question/31298277)

### 从Word中粘贴公式
从Word中复制粘贴公式也是可以得到TeX代码的，参见上一段的介绍。

{% include figure.html src="https://file.moetu.org/images/2020/02/20/b4c4263f8e48685b6d02798479fcc7590faacf1f1695bd88.png" alt="用Word粘贴TeX代码" width="640" height="300.18" %}