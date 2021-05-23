---
date: 2018-06-06 12:00
infobox: complete formula
last_modified_at: 2020-01-03 23:02
math: true
tags: 物理 知识点整理
title: 《普通物理·电磁学》知识点整理
---
### 第1章 静电场
#### 1.1 静电的基本现象和基本规律
* 电荷守恒定律：电荷既不能被创造，也不能被消灭。在任何物理过程中，电荷的代数和守恒。
* 库仑定律：$\vec F\_{12} = \cfrac 1 {4\pi \varepsilon} \cfrac{q\_1q\_2} {r\_{12}^2} \hat r\_{12}$。成立条件：静止（点电荷相对静止，相对观察者也静止）、真空（除去其它电荷影响）、点电荷。
* 静电力叠加原理：当几个点电荷同时存在时，施与另外某一点电荷的静电力，等于各个点电荷单独存在时施与该电荷的静电力的矢量和。

#### 1.2 电场和电场强度
* 电场的性质：对位于其中的带电体有力的作用（电场）；带电体在电场中运动时电场力作功（电势）。电场的描述：电场强度矢量$\vec E =  \cfrac{\vec F} {q\_0}$。
* 场强叠加原理：多个点电荷形成的电场在某一点的场强，等于各点电荷单独存在时在该点场强的矢量和。
* 电偶极子的电场：电偶极子：相距很近的等量异号电荷，$\vec p = q\vec L$，方向由负电荷指向正电荷。
  * 轴线延长线上的场强：$E = \cfrac q {4\pi\varepsilon\_0} \cfrac {2rL} {(r^2 - \frac {L^2} 4)^2}$，当$r \gg L$时$E = \cfrac p {2\pi\varepsilon\_0 r^3}$。
  * 中垂面上的场强：$E = - \cfrac {qL} {4\pi\varepsilon\_0 r^3}$。
* 电场线：用于描述场强分布的空间曲线。方向：电场线上每一点的切线方向为该点场强方向。大小：在电场中任一点，取一垂直于该点场强方向的面积元，使通过单位面积的电力线数目，等于该点场强的量值。
  * 性质：电场线起始于正电荷(或无穷远处)，终止于负电荷，不会在没有电荷处中断；两条电场线不会相交；电场线不会形成闭合曲线。
* 电通量$\Phi$：通过任一面积元的电力线条数，$\Delta\Phi = E\Delta S\cos \theta = \vec E \cdot \Delta \vec S$。

#### 1.3 高斯定理
* 高斯定理：通过任意闭合曲面的电通量等于面内电量的代数和，即$\Phi = \unicode{x222F}\_S\vec E \cdot \mathrm d \vec S = \cfrac 1 {\varepsilon\_0} \sum\limits\_{(S内)} q\_i$。前提：库仑定律、场强叠加原理。
* 用高斯定理求电场强度的步骤：分析对称性；根据对称性取高斯面；根据高斯定理求电场强度。
* 无限大带电平板产生的场强$E = \cfrac \sigma {2\varepsilon\_0}$。

#### 1.4 静电力的功 电势
* 静电力的功：点电荷$A\_{AB} = \int\_a^b\cfrac 1 {4\pi\varepsilon\_0} \cfrac{q\_0q}{r^2}\mathrm dr = \cfrac {q\_0q}{4\pi\varepsilon\_0}\left(\cfrac 1 {r\_A} - \cfrac 1 {r\_B}\right)$。静电力是保守力。
* 静电场环路定理：取$A\to B \to A$为闭合路径，静电场中场强沿任意闭合环路的线积分（环流）恒等于零。静电场的环路定理：$\oint\limits\_L \vec E\cdot\mathrm d \vec l = 0$。
* 高斯定理和环路定理是静电场的两个基本定理，静电场有源无旋。
* 静电场是保守场，相应的势能为电势能。静电力做功等于静电势能的减少量。定义静电场中$P$、$Q$两点的电势差$U\_P - U\_Q = \cfrac {W\_{PQ}} q\_0$。一般选取无穷远为电势能零点，$P$点电势值为$U\_P = \int\_P^\infty \vec E\cdot\mathrm d\vec l$。对于有限带电体，一般选无限远为势能零点；对于无限带电体，选有限远为势能零点。实际应用中常取大地、仪器外壳等为势能零点。
* 等势面：在静电场中，电势相等的点所组成的面称为等势面。性质：等势面与电力线处处正交；等势面密集处场强较大，场强指向电势减小的方向。

### 第2章 静电场中的导体和电介质
#### 2.1 导体和电介质
* 电磁场与物质的相互作用源于物质固有的电结构。虽然所有固体都包含大量电子，但导电性能差异很大。导体中存在着大量的自由电荷，绝缘体基本上没有参与导电的自由电子。

#### 2.2 静电场中的导体
* 当一带电体系中电荷静止不动，从而电场的分布不随时间变化时，称该带电体系达到静电平衡。导体静电平衡的充要条件：导体内部场强处处为零。
* 静电平衡导体的基本性质：
  * 导体是一个等势体，导体表面是等势面。电场线不能从导体的一端出发终止于另一端。
  * 导体表面处的电场强度的方向处处与导体表面垂直，场强大小与该处导体表面的电荷面密度成正比。
  * 电荷只分布在导体表面，导体内部无电荷。
* 孤立导体表面电荷与曲率半径有关，尖锐处面密度较大。尖端放电可制造范德格拉夫起电机、
* 导体空腔与静电屏蔽：
  * 静电平衡条件下，腔内无带电体，则空腔内表面不带电，电荷只分布在空腔外表面，空腔内处处场强为零，整个空腔为等势体。将带电体与导体空腔内表面接触， 可将全部可移动电荷收集到导体表面。可验证电力平方反比律。
  * 静电平衡条件下，腔内有带电体，则空腔内表面所带电荷与空腔内电荷的代数和为零。
  * 空腔提供了一个静电屏蔽的条件，不论导体壳本身是否带电，还是外界是否存在电场，都不影响腔内的场强分布。
  * 腔内电荷感应出外表面电荷，对外部区域有影响。若外表面接地，外表面无电荷分布，内部带电体对外部的影响消失。

#### 2.3 电容器的电容
* 孤立导体的电容$C = \cfrac QU$，其中$Q$为带电荷量，$U$为电势（无限远处为电势零点）。
* 电容器及其电容：导体附近有其它导体存在，则导体的电势不仅与它本身所带的电量有关，而且还与其它导体的形状和相对位置有关。用闭合的导体壳$B$把带电体$A$包围起来，此时$U\_A$与$U\_B$差值不受外界影响且正比于$q\_A$，比值不变，$C\_{AB} = \cfrac {q\_A} {U\_A - U\_B}$。
  * 平行板电容器：板的线度远大于板间距离，$C = \cfrac {\varepsilon\_0 S} d$。
  * 同心球形电容器：$E = 4\pi\varepsilon\_0 \cfrac {R\_AR\_B} {R\_B - R\_A}$。
* 电容器的串并联：
  * 串联：$\cfrac 1 C = \cfrac 1 {C\_1} + \cfrac 1 {C\_2} + \cdots + \cfrac 1 {C\_n}$。串联的等效电容比各电容器的电容都小，但耐压值是各电容器的总和。
  * 并联：$C = C\_1 + C\_2 + \cdots + C\_n$。并联的等效电容为各电容器的电容之和，同时各电容器承受的电压相同，仍均为总电压。

#### 2.4 电介质的极化
* 电介质的极化：平行板电容器中插入电介质板，电势差减小，电容增大。电介质在外场中产生附加场，削弱原来的电场。
* 极化的微观机制：
  * 有极分子：正电荷中心与负电荷中心不重合。电场作用下分子固有电矩收到力矩作用，方向转向与外电场方向趋于一致。
  * 无极分子：正电荷中心与负电荷中心重合。电场作用下正负电荷中心不再重合，出现分子电矩。
  * 极化效果：介质表面和内部（介质不均匀）出现极化电荷，削弱内部电场，但$E \neq 0$。
* 极化强度矢量$\vec P$：单位体积内电偶极矩的矢量和，描述介质在外电场作用下被极化的强弱程度。$\vec P = \cfrac {\sum{\vec p\_{分子}}} {\Delta V}$。
* 极化后果：出现宏观的极化电荷$q'$。均匀介质分布在介质表面，非均匀介质分布在整个介质中。极化过程中：极化电荷与外场相互影响、相互制约，达到平衡。平衡时总电场$\vec E = \vec E\_0 + \vec E'$决定了介质的极化程度。
* 极化强度矢量$\vec P$经面元$\mathrm d\vec S$的通量等于因极化穿出该面元的极化电荷总量，$\mathrm dq' = \vec P\cdot\mathrm d\vec S$。取任一闭合曲面$S$，以外法线方向为正，根据电荷守恒定律，穿出的极化电荷等于净余的等量异号极化电荷$-\sum q'$，即$\unicode{x222F}\_S \vec P \cdot\mathrm d\vec S = \sum\limits\_{穿出} q' = -\sum\limits\_{S内} q'$。
* 均匀介质中$\sigma\_e' = \vec P\cdot \vec n = P\_n$，则$\mathrm dq' = \sigma\_e'\mathrm dS$。
* 对于多数各向同性电介质，电场强度不是很大时$\vec P = \chi\_e\varepsilon\_0 \vec E$，其中$\chi\_e$为电极化率。相对介电常数$\varepsilon\_r = 1 + \chi\_e$。

#### 2.5 有电介质存在时的静电场
* 极化电荷激发的附加电场$E'$满足高斯定理和环路定理，$\unicode{x222F}\_S\vec E'\cdot\mathrm d\vec S = \cfrac 1 {\varepsilon\_0} \sum\limits\_{S内}q'$，$\oint \vec E'\cdot\mathrm d\vec l = 0$。
* 电介质存在时总场强满足高斯定理和环路定理，$\unicode{x222F}\_S\vec E\cdot\mathrm d\vec S + \unicode{x222F}\_S\cfrac {\vec P}{\varepsilon\_0}\cdot\mathrm d\vec S = \cfrac 1 {\varepsilon\_0} \sum\limits\_{S内} q\_0$。定义辅助的物理量电位移矢量$\vec D = \varepsilon\_0 \vec E + \vec P$，则$\unicode{x222F}\_S\vec D\cdot\mathrm d\vec S = \sum\limits\_{S内} q\_0$。
* 利用$\vec D$的高斯定理可以求解某些对称性电场分布，$\unicode{x222F}\_S\vec D\cdot\mathrm d\vec S = \sum\limits\_{S内} q\_0$，$\vec D = \varepsilon\_0 \varepsilon\_r \vec E$，$\vec P = (\varepsilon\_r - 1)\varepsilon\_0\vec E$，$\sigma\_e' = \vec P\cdot \vec n = P\_n$。对于平行板$D = \sigma\_0$。

#### 2.6 带电体系的静电能
* 静电能：带电体系的形成克服电场力作功，能量转换为带电体系具有的静电势能。自能：形成各带电体时克服电场力做功互能：各个已形成的带电体从相距很远处移近到一定距离时，克服彼此之间的电场力所作功。
* 多个点电荷静电能$W = \frac 12 \sum\limits\_{i = 1}^n q\_iU\_i$。电荷连续分布时$W = \frac 12 \int U\mathrm dq$，其中$U$为带电体全部电荷产生的电场在$\mathrm dq$处的电势。
* 电容器储能：电容器充电过程外力克服电场力做功是电容器体系积累静电能。$W = \cfrac 1 C\int\_0^Q q\mathrm dq = \cfrac {Q^2}{2C} = \frac 12 QU$，电容器储能就是电容器电荷体系的静电能。
* 静电能仅存在于包含电荷的体积或面积，在其他地方积分等于零。电能密度$\omega\_e = \frac 12 \vec D\cdot \vec E$，静电能$W\_e = \frac 12 \iiint\vec D\cdot \vec E\mathrm dV$。

### 第3章 直流电
* 非静电力：能不断分离正负电荷，使正电荷逆静电场力方向运动。电源是提供非静电力的装置。非静电电场强度$\vec E\_k$：单位电荷所受的静电力。
* 电源电动势：单位正电荷从负极经电源内部移至正极所受的非静电力，$\mathcal E = \int\_-^+ \vec E\_k \cdot\mathrm d\vec l$。方向：由电源负极经由内电路指向正极的方向。
* 电流：单位时间内通过截面$S$的电荷量，$I=\cfrac {\mathrm dq}{\mathrm dt}$。正电荷运动方向的电流取正值。
* 电流密度$\vec j$：通过该点单位垂直截面的电流大小，$\mathrm dI = \vec j\cdot\mathrm d\vec S$。
* 电荷守恒定律：鼓励系统总电荷量保持不变，则闭合曲面内净流出的电荷量等于内部电荷量减少，即$\unicode{x222F}\_S \vec j\cdot\mathrm d\vec S = -\cfrac {\mathrm dq}{\mathrm dt}$。
* 导体内各处电流密度不随时间变化的电流称为稳恒电流。

### 第4章 恒定磁场
#### 4.1 电流的磁效应
* 安培分子电流假说：磁现象的本质是电流，物质的磁性来源于其中的分子电流。物质是否具有磁性，以及磁性的强弱取决于其中分子电流排列的整齐程度。越混乱磁性越弱，越整齐磁性越强。
* 磁感应强度$\vec B$：当正电荷垂直于特定直线运动时，受力为$\vec F\_{\text{max}}$，将$\vec B$方向设为该店的$\vec F\_{\text{max}}\times\vec v$的方向，$B = \cfrac {F\_m} {qv}$。
* 毕奥萨伐尔定律：电流元在空间产生的磁场$\mathrm d\vec B = \cfrac {\mu\_0} {4\pi} \cfrac{I\mathrm d\vec l \times \vec r}{r^3}$。
  * 无限长载流直导线的磁场：$B = \cfrac {\mu\_0}{2\pi} \cfrac I {r\_0}$。
  * 载流圆线圈轴线上的磁场：$B = \cfrac {\mu\_0}{2\pi} \cfrac{\pi R^2I}{(R^2 + x^2)^{3/2}}$。
  * 无限长载流直螺线管轴线上的磁场：$B = \mu\_0nI$。

#### 4.2 磁场的高斯定理和安培环路定理
* 磁感应线：与电流套连，闭合曲线（不存在磁单极子），互不相交，与电流成右手螺旋。
* 磁通量：$\mathrm d\Phi = \vec B \cdot \mathrm d\vec S$。磁感应线穿入$\Phi\_m > 0$，穿出$\Phi\_m < 0$。
* 磁场高斯定理：穿过任意闭合曲面$S$的总磁通量必然为零，即$\unicode{x222F}\_S\vec B \cdot \mathrm d\vec S = 0$。
* 安培环路定理：磁感应强度$\vec B$沿任一闭合路径的积分的值，等于$\mu\_0$乘以该闭合路径所包围的各电流的代数和，即$\oint\_L \vec B \cdot \mathrm d\vec l = \mu\_0 \sum I\_i$。电流$I$的正负规定：积分路径的绕行方向与电流成右手螺旋关系时$I$为正值。
  * 任意形状稳恒电流，安培环路定理都成立。
  * 环流虽然仅与所围电流有关，但磁场却是所有电流在空间产生磁场的叠加。
  * 安培环路定理仅仅适用恒定电流产生的恒定磁场，恒定电流本身总是闭合的，因此安环路定理仅仅适用闭合的载流导线。
* 安培定律：$\mathrm d\vec F = I\mathrm d\vec I \times \vec B$。两个电流元之间相互作用力不遵守牛顿第三定律。
  * 任意平面载流导线在均匀磁场中所受的力，与其始点和终点相同的载流直导线所受的磁场力相同。
* 洛伦兹力：$\vec F = q\vec v \times \vec B$。特征：不对运动电荷作功，不改变带电粒子的速率和动能，只改变带电粒子的运动方向使之偏转。
* 安培力是运动电荷受到的磁场力的集体宏观表现。
* 霍尔效应：在通有电流的导体板上，垂直于板面施加一磁场，则平行磁场的两面出现电势差的现象。当磁场不太强时$U = R\_H\cfrac {BI} d$，其中$R\_H$为霍尔系数，仅与材料有关。$R\_H = \cfrac 1 {nq}$。通过测量霍尔系数可以确定导电体中载流子浓度和电荷性质。
* 带电粒子在匀强磁场中的运动（忽略重力）：$\vec v$与$\vec B$平行时$F = 0$，粒子匀速直线运动；$\vec v$与$\vec B$垂直时$F = qvB$，粒子匀速圆周运动，$R = \cfrac {mv} {qB}$，$T = \cfrac {2\pi m}{qB}$；$\vec v$与$\vec B$斜交时粒子作螺旋运动。
* 带电粒子在非匀强磁场中的运动（磁约束原理）：强磁场可约束带电粒子在一根磁感应线附近，可以用来约束高温气体。
* 回旋加速器：用来获得高能带电粒子。回旋频率$f = \cfrac {qB} {2\pi m}$，粒子动能$E\_k = \cfrac 12 mv^2 = \cfrac {q^2B^2R\_0^2}{2m}$。质谱仪：用物理方法分析同位素。

### 第5章 磁介质
#### 5.1 磁介质的磁化
* 磁化：磁场对磁场中的物质的作用称为磁化。磁介质：在磁场中影响原磁场的物质称为磁介质。
* 根据$B'$的方向和大小将磁介质分类为：
  * 顺磁质：$B'$与$B\_0$同向，即$B > B\_0$，如锰、镉、铝等。抗磁质：$B'$与$B\_0$反向，即$B < B\_0$，如汞、铋、铜等。上述两类$B' \ll B\_0$，统称为弱磁物质。
  * 铁磁质：$B \gg B\_0$，具有所谓“磁滞”现象的一类磁介质。如铁、钴、镍及其合金等。
* 分子电流：分子中所有电子的运动形成分子电流，可看成是一个小的载流圆线圈。
* 分子磁矩：轨道磁矩：各个电子绕核转动的轨道圆电流。自旋磁矩：电子绕自转轴转动的自旋圆电流。无外场时，两者之和称为分子磁矩$P\_m$。抗磁物质两者相互加强形成分子磁矩，抗磁物质两者相互抵消没有分子磁矩。

#### 5.2 有磁介质时的磁场
* 磁化电流$I'$：介质对磁场作用的相应。不能传到，束缚在介质内部，可以产生附加场$B'$。
* 磁化强度矢量$\vec M$：单位体积内分子磁矩的矢量和$\vec M = \cfrac 1 {\Delta V} \sum\limits\_{\Delta V内}\vec P\_m$。$\oint\_L \vec M\cdot\mathrm d \vec l = \sum\limits\_{L内} I'$。线性磁介质$\vec M = k\_m \vec B$，其中$k\_m = \cfrac {\chi\_m} {\mu\_0\mu\_r}$。
* 总磁场满足$\oint\_L \vec B\cdot\mathrm d \vec l = \mu\_0\sum\limits\_{L内} (I + I')$，整理得$\oint\_L\left(\cfrac {\vec B}{\mu\_0} - \vec M\right)\cdot \mathrm d \vec l = \sum\limits\_{L内} I$。定义磁场强度$\vec H = \cfrac {\vec B}{\mu\_0} - \vec M$，则$\vec H$沿任一闭合回路$L$的积分等于通过以$L$为周界的曲面$S$的传导电流的代数和。
* 对于各向同性磁介质，$\vec B = \mu\_0\mu\_r\vec H$，其中$\mu\_r = 1 + \chi\_m$。顺磁质$\mu\_r > 1$，抗磁质$\mu\_r < 1$。

#### 5.3 铁磁质
* 铁磁质磁性强，撤销外磁场后仍能保留磁性。温度高于$T\_C$时转化为顺磁质。
* 磁滞回线：未磁化的铁磁质经磁化达到饱和状态后缓慢减小$H$，铁磁质中$B$不按原来的曲线减小，且$H = 0$时$B \neq 0$，称为剩磁。要完全消除剩磁$B$必须加反向磁场，当$B = 0$时磁场的值$H\_C$为铁磁质的矫顽力。按照矫顽力大小分为软磁和硬磁材料两类。

#### 5.4 磁场的边界条件
* 磁感应强度$\vec B$法向分量连续，磁场强度$\vec H$切向分量连续。
* 磁屏蔽：铁磁质能对它所包围的空腔起磁屏蔽的作用，但效果没有静电屏蔽好。

### 第6章 电磁感应
#### 6.1 法拉第电磁感应定律
* 电磁感应是在变化运动过程中出现的非恒定的暂态效应。
* 法拉第电磁感应定律：不论何种原因使通过回路面积的磁通量发生变化时，回路中产生的感应电动势的大小与磁通量对时间的变化率成正比。$\mathcal{E} = -\cfrac {\mathrm d\Phi} {\mathrm dt}$。若为$N$匝线圈，则$\mathcal{E} = -\cfrac {N\mathrm d\Phi} {\mathrm dt} = -\cfrac {\mathrm d\Psi} {\mathrm dt}$，其中$\Psi$称为磁链。
* 楞次定律：闭合回路中感应电流的方向总是使得感应电流所激发的磁场阻碍引起感应电流的磁通量的变化。（另一表述：感应电流的效果总是反抗引起感应电流的原因。）楞次定律是能量守恒的必然结果。
* 涡电流：当大块导体处在变化磁场时，其中产生极强的电流，在导体内部形成闭合回路。应用：高频感应炉、电磁炉、电度表等。变压器减小导体横截面可以减小涡电流。

#### 6.2 感应电动势
* 动生电动势：回路的一部分相对磁场运动或回路面积发生变化致使回路中磁通量变化。非静电力来源：洛伦兹力。在洛伦兹力作用下导体两端出现电荷累积，$\mathcal{E} = -\vec B\cdot \cfrac {\mathrm d\vec S}{\mathrm dt}$。
  * 平动时$\mathrm d\mathcal E = (\vec v \times \vec B) \cdot \mathrm d\vec l$。转动时$\mathrm d\mathcal E = Bl\omega\mathrm dl$。
  * 总的洛伦兹力不对电子做功，起到了传递能量的作用。
* 感生电动势：因磁场变化使回路中磁通量变化。变化的磁场在周围空间激发出涡旋电场，即使不存在导体回路仍存在。
  * 涡旋电场：无源有旋场，电场线闭合，不存在电势。以$\vec E\_旋$表示感生电场的场强，$\mathcal E\_i = \oint\_L \vec E\_旋 \cdot \mathrm d\vec l = -\cfrac {\mathrm d}{\mathrm dt}\iint\_S \vec B\cdot \mathrm d\vec S$。$\vec E\_旋$与$\cfrac {\partial \vec B}{\partial t}\cdot\mathrm d\vec S$构成左旋关系。
  * 一般情形静电场与涡旋电场并存，总电场是两者之和，有源有旋。
* 电子感应加速器：电磁铁在交变电流激发下产生交变磁场在两级间引起涡旋电场泳衣加速电子，同时磁场的洛伦兹力使电子在固定的轨道上回旋。在磁场的变化周期内只有前$1/4$周期可用于加速电子。

#### 6.3 自感
* 自感：回路中电流变化时产生磁通量发生变化，在回路中激发感应电动势的现象。这种感应电动势叫做自感电动势，$\mathcal E\_L = -L \cfrac {\mathrm dI} {\mathrm dt}$，其中$L$为自感系数。
  * 对于长直螺线管，$\Phi = BS = \mu nIS$，$\Psi = N\Phi = \mu n^2IlS$。感应电动势$\mathcal E\_L = -\cfrac {\mathrm d\Psi} {\mathrm dt} = -L \cfrac {\mathrm dI} {\mathrm dt}$，得$L = \mu n^2Sl$，$\Psi = LI$。
* 互感：两线圈相邻，一个线圈中电流变化在另一个线圈中产生感应电动势的现象。线圈1在线圈2中激发的磁链$\Psi\_{12} = M\_{12} I\_1$，线圈2在线圈1中激发的磁链$\Psi\_{21} = M\_{21} I\_2$，可证明$M\_{12} = M\_{21} = M$。
  * 互感电动势：电流$I\_1$的变化在线圈2中产生互感电动势$\mathcal E\_{12} = -\cfrac {\mathrm d\Psi\_{12}}{\mathrm dt} = -M \cfrac {\mathrm dI\_1} {\mathrm dt}$。
* 自感磁能：储存在线圈的磁场中的能量。线圈与直流电源接通后，在由零增大到$I$的过程中电源克服自感电动势做功，即为载流线圈储存的能量。
* 互感磁能：电源克服互感电动势做功。$W\_互 = M\_{12}I\_1I\_2$。
* $k$个载流线圈总磁能$W\_m = \cfrac 12\sum\limits\_{i = 1}^k L\_iI\_i^2 + \cfrac 12 \sum\limits\_{i, j = 1 \\\ ( j \neq i)}^k M\_{ij}I\_iI\_j$。

#### 6.4 磁场的能量
* 由长直螺线管特例导出$H = \cfrac NlI$，$L = \mu\_0\mu\_r \cfrac {N^2} l S$，$W\_m = \frac 12LI^2 = \frac 12 BHSl$。
* 磁场的能量密度$w\_m = \cfrac {W\_m} V = \frac 12 \vec B\cdot \vec H$。磁能定域在磁场中。均匀磁场能量$W\_m = \iiint \cfrac {B^2}{2\mu} \mathrm dV$。对非均匀磁场$W\_m = \frac12\iiint\_V\vec B\cdot \vec H\mathrm dV$。
* 耦合因数：一般来说线圈1产生的磁场通过自身的磁通量$\Phi\_{11}$与通过线圈2的磁通量$\Phi\_{12}$不同，比例系数为$K\_1$，可得$M = \sqrt{K\_1K\_2} \sqrt{L\_1L\_2}$。其中$K = \sqrt{K\_1K\_2}$为两线圈间耦合系数。

### 第8章 麦克斯韦电磁场理论
#### 8.1 位移电流
* 非稳恒情况下，传导电流可能不连续。考虑充放电过程中的直流电源与电容器形成的回路，$H$沿$L$的积分与曲面相关。分析平行板电容器放电过程，电容器放电时传导电流$I\_0 = \cfrac {\mathrm dq}{\mathrm dt} = S \cfrac {\mathrm d\sigma}{\mathrm dt}$。两板间电位移矢量$D = \sigma$，通过截面电位移矢量通量为$\Phi\_D = SD = q$，则$\cfrac {\mathrm d\Phi\_D}{\mathrm dt} = \cfrac {\mathrm dq}{\mathrm dt} = I\_0$。可认为两板间中断的传导电流由$\cfrac {\mathrm d\vec D}{\mathrm dt}$来接替。
* 非稳恒情形下安培环路定律：$\oint\_L \vec H\cdot\mathrm d\vec l = I\_0 + \cfrac {\mathrm d\Phi\_D}{\mathrm dt} = \unicode{x222F}\_S \left(\vec j\_0 + \cfrac {\partial\vec D}{\partial t}\right)\cdot\mathrm d\vec S$，其中$I\_0$为传导电流，$I\_D = \cfrac {\mathrm d\Phi\_D}{\mathrm dt}$为位移电流。全电流$I = I\_0 + I\_D$任何情况都连续。
* 极化电流：存在电介质时，由于电场变化引起介质极化程度的变化所产生的电流，只在非恒定时才存在。变化的电场如同传导电流一样在其周围激发磁场。
* 传导电流与位移电流对磁场环流的贡献等效，传导电流是电荷的流动，产生焦耳热。位移电流是电场的变化，不产生焦耳热。电解质内主要是位移电流，导体中主要是传导电流。

#### 8.2 麦克斯韦方程组
* 积分形式：$\begin{cases}\unicode{x222F}\_S \vec D\cdot\mathrm d\vec S = \sum\limits\_{S内} q\_0, \\\ \oint\_\vec E\cdot\mathrm d\vec l = -\iint\_S \cfrac {\partial \vec B}{\partial t}\cdot\mathrm d\vec S, \\\ \unicode{x222F}_S\vec B \cdot \mathrm d\vec S = 0, \\\ \oint\_L \vec H\cdot\mathrm d\vec l = \unicode{x222F}\_S \left(\vec j\_0 + \cfrac {\partial\vec D}{\partial t}\right)\cdot\mathrm d\vec S. \end{cases}$微分形式$\begin{cases}\nabla\cdot\vec D = \rho\_0, \\\ \nabla\times\vec E = -\cfrac {\partial \vec B}{\partial t}, \\\ \nabla\cdot\vec B = 0,\\\ \nabla\times\vec H = \vec j\_0 + \cfrac {\partial\vec D}{\partial t}.\end{cases}$其中$\begin{cases}\vec D = \varepsilon \vec E = \varepsilon \_r\varepsilon\_0 \vec E, \\\ \vec B = \mu\vec H = \mu\_r\mu\_0\vec H, \\\ \vec j = \sigma\vec E. \end{cases}$。麦克斯韦方程组与介质方程合在一起构成完备的方程组，它们是宏观电动力学的基本方程组，原则上可以解决各种宏观电磁场问题。
* 边界条件：磁介质界面上，$\vec B$法向连续，$\vec H$切向连续。电介质界面上，$\vec D$法向连续，$\vec E$切向连续。

#### 8.3 电磁波
* 电磁场的变化以波的形式传播，已发出去的电磁波即使波源消失，波仍将继续存在井向前传播。赫兹实验证明了电磁波的存在。
* 电磁波的特征：$\begin{cases}\vec E = \vec E\_0 \cos(\omega t - \vec k\cdot\vec r), \\\ \vec H = \vec H\_0 \cos(\omega t - \vec k\cdot \vec r + \phi).\end{cases}$沿$\vec k$方向传播，以$\omega$为角频率，以$\vec E\_0$和$\vec H\_0$为振幅矢量。电磁波是横波。$\cfrac {E\_0}{H\_0} = \sqrt{\cfrac {\mu\_0\mu\_r}{\varepsilon\_0\varepsilon\_r}}$。
* 电磁波的传播速度$v = \cfrac 1 {\sqrt{\varepsilon\_0\varepsilon\_r\mu\_0\mu\_r}}$。光学中介质的折射率$n = \cfrac cv = \sqrt{\varepsilon\_r\mu\_r}$。
* 电磁场的能量密度：$w = \frac 12(\varepsilon\_0\varepsilon\_r E^2 + \mu\_0\mu\_r H^2)$。能流密度$\vec S = \vec w\times\vec v = \vec E\times\vec H$，平均能流密度$\bar S = \frac 12 E\_0H\_0$。
* 电磁场的动量密度$\vec g = \cfrac 1 {c^2}\vec S$。