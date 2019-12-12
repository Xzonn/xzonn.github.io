---
layout: post
title: 《地震概论》2019年秋季学期（周四班）笔记
tags: 学习资料 通选课 知识点整理 三次元
update: 2019-12-05
---
<style>
    h5 {
        bookmark-level: none;
    }

    .leftToc > li > ul > li > ul {
        display: none;
    }
</style>

## 说明
本资料基于《地震概论》课程2019年秋季学期周四班板书内容整理，感谢蔡开奎、刘毅提供笔记资料。由于本课程内容每次授课都会改变，因此本资料内容不适用于后续学期。

正文中斜体部分为补充说明部分，不在板书内容范围内，仅帮助理解。

由于本人手机像素极低，拍照能力极差，因此对板书的拍照效果差。如有较高质量照片，欢迎提供。

## 课程板书内容
### 第2章 地震波
![地震波的传播](https://s2.ax1x.com/2019/09/28/u1LYtI.png)

- 地震波的传播：<a class="xrefFigure" href="#figure-u1LYtI.png"></a>。
  - *说明：地震波在传播到地表时几乎与地表垂直，以此可分析P波和S波的振动方向。*

![S波的分解](https://s2.ax1x.com/2019/09/28/u1Ltht.png)

![SH波与SV波](https://s2.ax1x.com/2019/09/28/u1OK5n.png)

- S波的分解：<a class="xrefFigure" href="#figure-u1Ltht.png"></a>。
  - *说明：S波可以分解成两个分量，平行于界面的分量为SH波，在入射线和界面法线构成的平面上（入射面）的分量为SV波。*
  - *SH波与SV波：<a class="xrefFigure" href="#figure-u1OK5n.png"></a>。*
- P波和S波的主要差异：
  - P波传播速度比S波快，地震图上先出现P波。
  - P波和S波的质点振动（偏振）方向相互垂直。
  - 一般情况下，三分量地震图上P波的垂直分量相对较强，S波的水平分量相对较强。
  - S波的低频成分比P波丰富。
  - 天然地震的振源破裂通常以剪切破裂和剪切错动为主，震源向外辐射的S波能量比P波的强。
  - P波通过时，质元无转动运动，而有体积变化，P波是一种无旋波。S波通过时，质元有转动，而无体积变化，S波是一种无散的等容波。
- 谚语：“地震不地震，抬头看吊灯”。
  - *说明：地震波中，P波上下振动，S波水平振动。而环境造成的振动不会产生水平方向的振动，因此当吊灯水平振动时，说明有地震发生。*

（中略）

### 第9章 勘探地震学
- 石油勘探的地球物理方法（简称“物探”）：重力勘探、磁性勘探、电法勘探、地震勘探。
  - *说明：物探法主要利用各种物探仪器记录到来自地下的多种信息，然后对底下的构造和岩性特性做出预测，是间接探测方法，勘探范围深、效率高。*
  - *重力勘探：利用岩石密度的差别在地面上测量重力变化。磁性勘探：利用岩石磁性的差别在地面上测量地磁场的变化。电法勘探：利用岩石电阻率的差别在地面上测量电场的变化。地震勘探：利用岩石波阻抗的差别在地面上记录地震波场的变化。*
  - *地震勘探精度高、分辨率高、探测深度大，应用最为广泛，占97%。*
- “怪坡”是假的。
  - *说明：所谓“怪坡”是指物体可以自行上坡的奇异现象。*
- 为什么在求取地下构造信息时，以反射波取代折射波？
  - 折射波在地质条件复杂的情况下, 容易导致解释错误。
    - *说明：约束条件少，解析解数目多。*
  - 反射波信噪⽐⾼，易辨识。
- 地震资料解释的成功率不高，约为25%。
  - *说明：实际应用中应综合前人已经做出的成果、钻井的资料、重力数据、地磁数据、地质资料等来进行解释。*

### 第10章 海啸
- 浅水波：用$$h$$代表海水的深度，$$\lambda$$代表波长，则$$\lambda \gg h$$的这种具有非常长的波长的重力波就叫做海水波。
- 浅水波的传播速度只与海水深度有关，有$$v = \sqrt{gh}$$，其中：$$v$$为波的传播速度，$$g$$为重力加速度，$$h$$为海水深度。
- 海啸的波长约100 miles，传播速度约500 miles/h。
- 计算题：如<a class="xrefFigure" href="#figure-ItS-10-01.svg"></a>，计算浅水波从$$A$$点传播到$$D$$点所用的时间。

![第10章计算题图](/images/ItS-10-01.svg)

计算过程如下：

先证明$$BC$$、$$CD$$段为匀变速直线运动。由公式，$$v = \sqrt{gh}$$，也即：

$$v^2 = gh.$$

两边对$$t$$取微分，得：

$$2v \cfrac {\mathrm dv}{\mathrm dt} = g \cfrac {\mathrm dh}{\mathrm dt},$$

由于倾斜角一定，有：

$$\cfrac {\mathrm dh}{\mathrm dx} = \tan \theta,$$

故：

$$2v \cfrac {\mathrm dv}{\mathrm dt} = g \cfrac {\mathrm dh}{\mathrm dx}\cfrac {\mathrm dx}{\mathrm dt} = g \tan \theta v,$$

两边约去$$v$$后得到：

$$\cfrac {\mathrm dv}{\mathrm dt} = \cfrac {g \tan \theta v} {2},$$

即加速度为定值，故该运动为匀变速直线运动，可用平均速度公式。

求得$$v_A = v_B = \pu{200 m/s}$$，$$v_C = \pu{100 m/s}$$，$$v_D = 0$$。

则$$v_{AB} = \pu{200 m/s}$$，$$v_{BC} = \pu{150 m/s}$$，$$v_{CD} = \pu{50 m/s}$$。

则$$t_{AB} = \pu{1000 s}$$，$$t_{BC} = \pu{2000 s}$$，$$t_{CD} = \pu{600 s}$$。

总时长为3600 s = 1 h。

## 课程作业
### 1. 直达波、反射波和首波
##### 题干
**证明：当震中距$$X$$大于一定值$$X_M$$时，首波将最先到达，并求出$$X_M$$。**（题图见<a class="xrefFigure" href="#figure-QG2fW4.jpg"></a>）

![作业1题图](https://s2.ax1x.com/2019/12/05/QG2fW4.jpg)

##### 提示
直达波走时：

$$T_1 = \cfrac {X} {v_1},$$

首波走时：

$$T_2 = \cfrac {X - 2h\tan\theta_c} {v_2} + \cfrac {2h~/ \cos\theta_c} {v_1},$$

其中$$h$$为第一层的厚度。

本题要证明的是：存在$$X_m$$，当$$X \ge X_m$$时，$$T_1 \ge T_2$$，也即$$T_1 - T_2 \ge 0$$。

##### 解答
**证明**：设震源深度为$$h$$，地壳厚度为$$H$$，震中距为$$X$$。考虑$$X \gg h$$时的近似情况。

对于直达波，其走时为

$$T_1 = \cfrac {X} {v_1}.$$

对于首波，其在$$v_1$$介质中的走时为

$$T_{2,~1} = \cfrac {2h / \cos\theta_c} {v_1},$$

在$$v_2$$介质中的走时为

$$T_{2,~2} = \cfrac {X - 2h\tan\theta_c} {v_2},$$

其中，

$$\sin\theta_c = \cfrac {v_1}{v_2},~\cos\theta_c = \sqrt{\cfrac {v_2^2 - v_1^2} {v_2^2}},$$

则

$$T_2 = \cfrac {X - 2h\tan\theta_c} {v_2} + \cfrac {2h~/ \cos\theta_c} {v_1}.$$

出现首波的条件为$$T_1 \ge T_2$$，此时

$$X \cfrac {v_2 - v_1}{v_1v_2} \ge 2H \cfrac {v_2 - v_1 \sin\theta_c}{v_1v_2\cos\theta_c},$$

解得

$$X_M = 2H \sqrt {\cfrac {v_2 + v_1} {v_2 - v_1}}.$$

故当$$X \ge X_m$$时，首波最先到达。

### 2. 弹性波在介面上的反、透射
##### 题干
**利用费尔马原理证明存在波型转换时的Snell定律：**

$$\cfrac {\sin\theta_{\alpha1}} {v_{\alpha1}} = \cfrac {\sin\theta_{\beta1}} {v_{\beta1}} = \cfrac {\sin\theta_{\alpha2}} {v_{\alpha2}} = \cfrac {\sin\theta_{\beta2}} {v_{\beta2}}.$$

（题图见<a class="xrefFigure" href="#figure-ItS-HW-02.svg"></a>）

![作业2题图](/images/ItS-HW-02.svg)

##### 提示
第一个等号的证明参考讲义：Fermat原理 → Snell定律 (1)，只需将走时改为

$$t = \cfrac {\sqrt {h^2 + x^2}}{v_{\alpha1}} + \cfrac{\sqrt{r^2 + (L - x)^2}}{v_{\beta1}}.$$

第二个等号和第三个等号的证明参考讲义：Fermat原理 → Snell定律 (2)，注意P波速度在第一层和第二层分别为$$v_{\alpha1}$$和$$v_{\alpha2}$$，S波速度在第二层为$$v_{\beta2}$$。

##### 解答
对于折射波，走时为：

$$t = \cfrac {\sqrt {h^2 + x^2}}{v_{\alpha1}} + \cfrac{\sqrt{r^2 + (L - x)^2}}{v_{\beta1}}.$$

令$$t$$对$$x$$求导，得：

$$\cfrac {\mathrm dt}{\mathrm dx} = \cfrac {x}{v_{\alpha1}\sqrt{h^2 + x^2}} - \cfrac {L - x}{v_{\alpha2}\sqrt{r^2 + (L - x)^2}},$$

其中，

$$\cfrac {x}{\sqrt{h^2 + x^2}} = \sin\theta_{\alpha1}, ~ \cfrac {L - x}{\sqrt{r^2 + (L - x)^2}} = \sin\theta_{\alpha2}.$$

当$$\cfrac {\mathrm dt}{\mathrm dx} = 0$$时$$t$$存在极值，此时有

$$\cfrac {\sin\theta_{\alpha1}} {v_{\alpha1}} - \cfrac {\sin\theta_{\alpha2}} {v_{\alpha2}} = 0,$$

也即

$$\cfrac {\sin\theta_{\alpha1}} {v_{\alpha1}} = \cfrac {\sin\theta_{\alpha2}} {v_{\alpha2}}.$$

同理可证明其他两等式。