---
layout: post
title: 《土壤与地下水》期末复习
info: 一小时速成有点不太可能，还是老老实实准备期末复习吧。
infoBox: complete formula
tags: 学习资料 环院专业课 知识点整理 三次元
update: 2019-12-28
---
<style> .chsName { display: inline-block; min-width: 10em; margin-right: 1em; } .engName { font-weight: lighter; font-style: italic; } </style>

## 1 计算
### 1.1 土壤孔隙
- 空隙率（Void Ratio）：孔隙的体积与固体体积之比，$$e = \cfrac {V_v}{V_s}$$。
- 孔隙度（Porosity）：孔隙的体积与总体积之比，$$\varphi = \cfrac {V_v}{V_T}$$。
- 容重（Bulk Density）：干土壤质量与总体积之比，$$\rho_b = \cfrac {M_s}{V_T}$$。
- 颗粒密度（Particle Density）：干土壤质量与固体体积之比，$$\rho_p = \cfrac {M_s}{V_s}$$。
- 换算关系：$$\varphi = \cfrac {V_v}{V_T} = \cfrac {V_T - V_s}{V_T} = 1 - \cfrac {V_s}{V_T} = 1 - \cfrac {M_s / \rho_p}{M_s / \rho_b} = 1 - \cfrac {\rho_b}{\rho_p}$$。

### 1.2 达西定律
![水头|right|180px](https://s2.ax1x.com/2019/11/04/Kv2xxO.png)

- 水力传导系数（Hydraulic Conductivity，$$K$$）：水通过物质的速率，取决于土壤类型、孔隙度、土壤孔隙结构。$$K = \cfrac {k\rho g}{\mu}$$，其中$$k$$是固有渗透率，为介质的固有属性，$$\rho$$为质量密度，$$\mu$$为动力粘度，表征液体粘性的内摩擦系数。
  - Shepherd经验公式：$$K = a(D_{10})^b$$，其中$$a$$和$$b$$是经验系数，$$D_{10}$$是材料10%粒径。
- 达西定律（<span lang="en">Darcy’s Law</span>）：描述液体流过孔隙介质的本构方程。$$Q = -KA\cfrac {\Delta h}{\Delta l}$$，其中$$Q$$为总流量，$$K$$为水力传导系数，$$A$$为截面面积，$$\Delta h$$为水头损失，$$\Delta l$$为距离。
  - 公式中的符号表示$$Q$$为水头减小的方向，即地下水由水头较高的地区流向水头较低的地区。
- 水头（Hydraulic Head，$$h$$）：是造成地下水流动的机械能的量度。
  - $$h = h_p + z$$，其中$$h_p$$是压头（Pressure Head，即液柱的高度），$$z$$是升降头（Elevation Head，即液柱底端的海拔高度）。
  - $$h$$ = 地表水程 - 水深。
- 水力梯度（Hydraulic Gradients，$$I$$）：即地下水位或等势面的梯度。$$I = \cfrac {\Delta h}{\Delta l}$$。

![达西速率与渗流速率\|right\|150px](https://s2.ax1x.com/2019/11/04/Kv2vRK.png)

- 达西速率（Darcy Velocity，$$q$$）与渗流速率（Seepage velocity）：
  - 定义$$q = \cfrac {Q}{A} = -K\cfrac {\Delta h}{\Delta l} = -KI$$，$$q$$称为达西速率。
  - 达西速率是宏观流速，容易测量，是假想的状态，不能反映实际的流体流动状态。渗流速率是微观流速。
  - 从等量关系可以看出$$Q = qA = v_sA_v$$，其中$$v_s$$是渗流速率，$$A_v$$是孔隙的截面积。$$v_s = q\cfrac {A}{A_v} = \cfrac {q}{\varphi}$$。

![总面积与孔隙面积](/images/SaGN-01.svg)

- 达西定律的适用条件：适用于层流状态的任何条件，不适用于湍流。
- 达西定律拓展到三维的情况：
  - 各向同性（Isotropy）：各个方向的数值都相同，$$K$$为标量。此时$$q_x = -K\cfrac{\partial h}{\partial x}$$，$$q_y = -K\cfrac{\partial h}{\partial y}$$，$$q_z = -K\cfrac{\partial h}{\partial z}$$。
  - 各向异性（Anisotropic）：各个方向的数值不同。$$K = \begin{bmatrix} K_{xx} & K_{xy} & K_{xz} \\ K_{yx} & K_{yy} & K_{yz} \\ K_{zx} & K_{zy} & K_{zz} \end{bmatrix}$$。$$q_x = -K_{xx}\cfrac{\partial h}{\partial x} - K_{xy}\cfrac{\partial h}{\partial y} - K_{xz}\cfrac{\partial h}{\partial z}$$，$$q_y = -K_{yx}\cfrac{\partial h}{\partial x} - K_{yy}\cfrac{\partial h}{\partial y} - K_{yz}\cfrac{\partial h}{\partial z}$$，$$q_z = -K_{zx}\cfrac{\partial h}{\partial x} - K_{zy}\cfrac{\partial h}{\partial y} - K_{zz}\cfrac{\partial h}{\partial z}$$。若为各向同性则该式中$$K_{xx} = K_{yy} = K_{zz} > 0$$，其他系数为0。
- 等效水力传导系数（Effective Hydraulic Conductivity，$$K_{\text{eff}}$$）：设土壤上下分层，则：
  - 水平径流（Horizontal flow）：$$Q = Q_1 + Q_2 + \cdots + Q_n$$，则$$K_{\text{eff}} = \cfrac {\sum\limits_{i}^{n} K_iD_i}{\sum\limits_{i}^{n}D_i}$$，其中$$D_i$$为第$$i$$层的高度。
  - 垂直径流（Vertical flow）：$$Q = Q_1 = Q_2 = \cdots = Q_n$$，则$$K_{\text{eff}} = \cfrac {\sum\limits_{i}^{n} L_i}{\sum\limits_{i}^{n}\cfrac{L_i}{K_i}}$$，其中$$L_i$$为第$$i$$层的高度。

### 1.3 连续性方程
- 连续性方程（Continuity Equation）：描述了流体流经多孔介质时质量的守恒。$$\cfrac{\partial^2 h}{\partial x^2} + \cfrac{\partial^2 h}{\partial y^2} + \cfrac{\partial^2 h}{\partial z^2} = 0$$。
  - 原理：单位时间内流入体积元的质量与流出该体积元的质量之差应等于该体积元内质量的增加或减少。
  - 推导：取体积微元$$\mathrm dx\mathrm dy\mathrm dz$$，其在$$x$$方向上单位时间单位截面的流量为$$\cfrac {\partial}{\partial x}(\rho q_x)\mathrm dy\mathrm dz$$，对体积微元$$x$$方向中点处取截面，流入量为$$(\rho q_x)\mathrm dy\mathrm dz - \cfrac {\partial}{\partial x}(\rho q_x)\cfrac {\mathrm dx}{2}\mathrm dy\mathrm dz$$，流出量为$$(\rho q_x)\mathrm dy\mathrm dz + \cfrac {\partial}{\partial x}(\rho q_x)\cfrac {\mathrm dx}{2}\mathrm dy\mathrm dz$$，则在$$x$$方向的流量差为$$- \cfrac {\partial}{\partial x}(\rho q_x)\mathrm dx\mathrm dy\mathrm dz$$。同理对$$y$$方向和$$z$$方向有类似结论，则总流量为$$-\rho \left(\cfrac{\partial q_x}{\partial x} + \cfrac{\partial q_y}{\partial y} + \cfrac{\partial q_z}{\partial z}\right)$$ $$= (-)(-)\rho\left[\cfrac {\partial}{\partial x}\left(K_x\cfrac {\partial h}{\partial x}\right) + \cfrac {\partial}{\partial y}\left(K_y\cfrac {\partial h}{\partial y}\right) + \cfrac {\partial}{\partial z}\left(K_z\cfrac {\partial h}{\partial z}\right)\right]$$ $$= 0$$，对各向同性介质$$K\left(\cfrac{\partial^2 h}{\partial x^2} + \cfrac{\partial^2 h}{\partial y^2} + \cfrac{\partial^2 h}{\partial z^2}\right) = 0$$。
  - 求解：需要一定的边界条件（Boundary Conditions），也称初始条件（Initial Conditions）。以二维为例，可解的边界条件包括：
    - 无流量边界（No-flow Boundaries）：$$\cfrac {\partial h}{\partial x} = 0$$或$$\cfrac {\partial h}{\partial y} = 0$$或$$\cfrac {\partial h}{\partial n} = 0$$。流体与边界平行，等势线与边界垂直。
    - 恒压头边界（Constant-head Boundaries）：$$h =$$常数。流体与边界垂直，等势线与边界平行。
    - 水位边界（Water-table Boundary）：$$h = z$$。在含水层的任何位置，总水头等于压头加升降头，即$$h = h_p + z$$。在水位线上压头$$h_p = 0$$，此时$$h = z$$。

### 1.4 流网理论
![流网|right|180px](/images/SaGN-02.svg)

- 流网理论（Flow Net Theory）：
  - 流网（Flow Net）：由正交的流线和等水头线绘制而成的模式。
    - 流线与等水头线垂直。
    - 流线之间永不相交，等水头线之间也永不相交。
    - 流线与等水头线构成“曲边正方形”，其纵横比或尺寸相同，但流线或等水头线可以弯曲。
  - 基本假设：
    - 静稳条件，无源，二维饱和流动。
    - 各向同性的均匀介质。
    - 边界条件给出，包含以下条件：恒压头边界、水位边界、水头时间固定边界、无流量边界、定流量边界。
  - 绘图方法：
    - 建立边界条件并在边界附近绘制一条或两条流线$$\Psi$$和等水头线$$\Phi$$。
    - 用平滑曲线绘制中间流线和等水头线，在流动方向是直线的情况下，流线应该是等间距的平行线。
    - 大多数情况下绘制5 ~ 10条流线即可。根据流线数量绘制等水头线的数量。

![流线绘制示例](https://s2.ax1x.com/2019/12/28/lecvX6.png)

- 各向同性介质中的流网：
  - 当流线与等水头线的间距相等时，有$$Q = \cfrac {n_f}{n_d} KH$$，其中$$n_f$$是流线的间距数，$$n_d$$是等水头线的间距数。
- 分层介质中的流网：
  - 两介质中的流线方向遵循正切定律：$$\cfrac {K_1}{K_2} = \cfrac {\tan \theta_1}{\tan \theta_2}$$。

### 1.5 水位计算
![水位下降](https://s2.ax1x.com/2019/12/28/legPtH.png)

- 在水泵泵水时，会导致地下水位的下降，称为水位下降（Drawdown）。泵水时水来源于存储区，直到达成新的平衡。
- 朝向井的不稳定径流：$$\cfrac {\partial^2 h}{\partial r^2} + \cfrac {1}{r} \cfrac {\partial h}{\partial r} + \cfrac {e}{T} = \cfrac {S}{T} \cfrac {\partial h}{\partial t}$$，其中$$S$$是储水系数（Storativity，无量纲），$$T$$是渗透率（Transmissivity），$$T = Kb$$，$$b$$是厚度，$$t$$是时间，$$u$$是时间参量（无量纲），$$u = \cfrac {r^2S}{4Tt}$$，$$r$$是与井的径向距离，$$e$$是垂直渗漏率。
- 承压含水层：$$h_0 - h = \cfrac {Q}{4\pi T}\int_u^{+\infty} \cfrac {e^{-u}}{u}\mathrm du = \cfrac {Q}{4\pi T}W(u)$$，其中$$Q$$是泵水速率，$$h_0$$是泵水前的水头，$$W(u)$$是$$u$$的函数。
  - 条件：顶部和底部均是不透水层，没有补给，$$Q$$为常数。
  - 渗透率在$$u$$和$$h_0 - h$$两个方程中均存在，储水量只存在于$$u$$的方程中。
- 稳态的Thiem方程：$$h_0 - h = \cfrac {Q}{2\pi T}\ln\left(\cfrac {R}{r}\right)$$，其中$$R$$是影响半径，即水头仍然是$$h_0$$的距离。
  - 条件：无边界流动到井的稳态径流。在自然状态下不存在，但可以用来近似估计实际状况。假设在距离为$$R$$的周围存在圆形的水头恒定的边界（例如与含水层完全接触的湖泊或河流）推导。
  - 推导：$$Q = K\cdot 2\pi rb\cfrac{\mathrm dh}{\mathrm dr}$$，即$$\mathrm dh = \cfrac {Q}{2\pi Kb} \cfrac {\mathrm dr}{r}$$，积分得$$h_0 - h = \cfrac {Q}{2\pi T}\ln\left(\cfrac {R}{r}\right)$$。
- 非承压含水层：$$\cfrac {h_0^2 - h^2}{2} = \cfrac {Q}{2\pi K}\ln\left(\cfrac {R}{r}\right)$$。
  - 推导：$$Q = K\cdot 2\pi rh\cfrac{\mathrm dh}{\mathrm dr}$$，即$$h\mathrm dh = \cfrac {Q}{2\pi K} \cfrac {\mathrm dr}{r}$$，积分得$$\cfrac {h_0^2 - h^2}{2} = \cfrac {Q}{2\pi K}\ln\left(\cfrac {R}{r}\right)$$。

## 2 名词解释
<div class="noPrint" style="float: right;">[ <a href="javascript:jQuery('dd').slideToggle()">显示／隐藏解释</a> | <a href="javascript:jQuery('.chsName').fadeToggle()">显示／隐藏中文</a> ]</div>

### 第1课

<span class="chsName">关键带</span><span class="engName">Critical Zone</span>
: 地球各个圈层相互作用的地带，“岩石-土壤-生物-水-大气”相互作用带。

<span class="chsName">岩石圈</span><span class="engName">Lithosphere</span>
: 

<span class="chsName">水圈</span><span class="engName">Hydrosphere</span>
: 

<span class="chsName">大气圈</span><span class="engName">Atmosphere</span>
: 

<span class="chsName">生物圈</span><span class="engName">Biosphere</span>
: 

### 第2课

<span class="chsName">土壤</span><span class="engName">Soil</span>
: 土壤是由地表未板结的矿物质、有机物、水分和空气组成的三相多孔体系，矿物质和有机物质组成固相，约占$$50~\%$$，气​​相存在于未被水分占据的土壤空隙中。是成土母质在一定水热条件和生物的作用下，并经过一系列物理、化学和生物化学过程形成的。

<span class="chsName">矿物质</span><span class="engName">Mineral</span>
: 土壤中由母岩风化过程残留或新产生的固态物质，是土壤主要组成部分。

<span class="chsName">原生矿物</span><span class="engName">Primary mineral</span>
: 直接来源于母岩的矿物，主要来源于岩浆岩。是岩浆岩和变质岩的机械破坏和风化过程的产物，未改变化学组成。

<span class="chsName">次生矿物</span><span class="engName">Secondary mineral</span>
: 岩石或母质在地表经风化或生物作用由原生矿物转变而来或重新合成的，主要分布于粘粒。

<span class="chsName">高岭土</span><span class="engName">Kaolinite</span>
: 

<span class="chsName">水云母</span><span class="engName">Hydrous Mica</span>
: 

<span class="chsName">伊利石</span><span class="engName">Illite</span>
: 

<span class="chsName">蛭石</span><span class="engName">Vermiculite</span>
: 

<span class="chsName">蒙脱石</span><span class="engName">Smectite/Montmorillonite</span>
: 

<span class="chsName">土壤生物</span><span class="engName">Soil Organism</span>
: 部分或全部生命过程生活在土壤中的生物。

<span class="chsName">土壤圈</span><span class="engName">Pedosphere</span>
: 由土壤组成的地球的最外层，受土壤形成过程的影响。存在于岩石圈，大气，水圈和生物圈的界面，是它们相互作用的产物。

<span class="chsName">风化</span><span class="engName">Weathering</span>
: 地球表面所有岩石分解的过程。

<span class="chsName">热应力风化</span><span class="engName">Thermal Stress Weathering</span>
: 由于温度的变化，岩石反复膨胀和收缩使岩石崩解的作用。

<span class="chsName">霜冻风化</span><span class="engName">Frost Weathering</span>
: 由于气温的变化，岩石裂隙中的水反复结冰和融化，从而造成岩石裂隙不断扩大，使岩石发生崩解的作用。

<span class="chsName">波浪</span><span class="engName">Ocean Waves</span>
: 沿海地区的地形可能是由波浪作用在地质时期的风化形成的，或者可能在盐风化过程中突然发生的产物。

<span class="chsName">压力释放</span><span class="engName">Pressure Release</span>
: 上覆物质被移走导致下层岩石膨胀或断裂。

<span class="chsName">盐晶体生长</span><span class="engName">Salt-crystal Growth</span>
: 由于岩石裂隙中的盐类反复结晶、潮解，使岩石崩解的作用。

<span class="chsName">生物效应</span><span class="engName">Biological Effects</span>
: 植物的根部长成裂缝并使裂缝张开。

<span class="chsName">溶解</span><span class="engName">Dissolution</span>
: 岩石中矿物溶解于水而产生分解的过程。

<span class="chsName">碳化</span><span class="engName">Carbonation</span>
: 碳酸盐矿物溶于含$$\ce{CO2}$$水溶液。

<span class="chsName">水化</span><span class="engName">Hydration</span>
: 把水分子结合到矿物的晶格中的作用。

<span class="chsName">水解</span><span class="engName">Hydrolysis</span>
: 水分子从晶格中释放。

<span class="chsName">氧化</span><span class="engName">Oxidation</span>
: 

### 第3课

<span class="chsName">土壤结构</span><span class="engName">Soil Structure</span>
: 基于其物理和化学性质最终形成的形状。

<span class="chsName">土壤自然结构体</span><span class="engName">Ped</span>
: 土壤中的土粒在内外因素综合作用下形成大小、形状、性质不同的团聚体。

<span class="chsName">团聚体</span><span class="engName">Aggregates</span>
: 多个颗粒结合而成的结构。

<span class="chsName">静电斥力</span><span class="engName">Electrostatic Repulsive Forces</span>
: 

<span class="chsName">范德华引力</span><span class="engName">Van der Waals Attraction</span>
: 

<span class="chsName">路易斯酸碱作用力</span><span class="engName">Lewis Acid-base Interaction</span>
: 

<span class="chsName">疏水作用</span><span class="engName">Hydrophobic Interaction</span>
: 

<span class="chsName">粒状</span><span class="engName">Granular</span>
: 近似球形的较疏松多孔的小团聚体。

<span class="chsName">块状</span><span class="engName">Blocky</span>
: 立方体型，纵轴与横轴大体相等，内部紧实。

<span class="chsName">柱状</span><span class="engName">Columnar</span>
: 由微小但确定的垂直裂缝分隔成垂直柱或柱的土壤颗粒。

<span class="chsName">棱柱状</span><span class="engName">Prismatic</span>
: 土体中直立、棱角明显的柱状结构。

<span class="chsName">片状</span><span class="engName">Platy</span>
: 水平放置的薄而平的土层，通常存在于密实的土壤中。

<span class="chsName">单粒结构</span><span class="engName">Single Grained</span>
: 土壤被分解成不能粘在一起的单个颗粒，常见于砂土中。

<span class="chsName">巨大结构</span><span class="engName">Massive</span>
: 土壤中没有可见的明显结构，很难分解；出现在非常大的土块中。

<span class="chsName">土壤粒级</span><span class="engName">Soil Separates</span>
: 特定的粒径范围。

<span class="chsName">粘粒</span><span class="engName">Clay</span>
: 粒径$$< \pu{0.002 mm}$$的土壤颗粒。

<span class="chsName">粉粒</span><span class="engName">Silt</span>
: 粒径$$0.002 \sim \pu{0.05 mm}$$的土壤颗粒。

<span class="chsName">沙粒</span><span class="engName">Sand</span>
: 粒径$$0.05 \sim \pu{1 mm}$$的土壤颗粒。

<span class="chsName">石砾</span><span class="engName">Coarse Fragments</span>
: 粒径$$> \pu{1 mm}$$的土壤颗粒。

<span class="chsName">土壤质地</span><span class="engName">Soil Texture</span>
: 各种粒级土粒的配合比例，或占土壤重量的百分数，也叫土壤的机械组成。

<span class="chsName">沙土</span><span class="engName">Sandy Soils</span>
: 

<span class="chsName">壤土</span><span class="engName">Loamy Soils</span>
: 

<span class="chsName">粘土</span><span class="engName">Clayey Soils</span>
: 

### 第4课

<span class="chsName">渗透性</span><span class="engName">Permeability</span>
: 表征介质的传输性质和孔隙的连通性，与水力传导率和渗透率有关。

<span class="chsName">空隙率</span><span class="engName">Void Ratio,$$e$$</span>
: 孔隙的体积与固体体积之比，$$e = \cfrac {V_v}{V_s}$$。

<span class="chsName">孔性／孔隙度</span><span class="engName">Porosity,$$\varphi$$</span>
: 土壤孔隙的数量、大小及其比例，孔隙的体积与总体积之比，$$\varphi = \cfrac {V_v}{V_T}$$。

<span class="chsName">容重</span><span class="engName">Bulk Density,$$\rho_b$$</span>
: 干土壤质量与总体积之比，$$\rho_b = \cfrac {M_s}{V_T}$$。

<span class="chsName">颗粒密度</span><span class="engName">Particle Density,$$\rho_p$$</span>
: 干土壤质量与固体体积之比，$$\rho_p = \cfrac {M_s}{V_s}$$。

<span class="chsName">有效孔隙</span><span class="engName">Effective Porosity</span>
: 有效发生流体流动的总体积分数。

<span class="chsName">土壤水</span><span class="engName">Soil Water</span>
: 土壤中含的水分。

<span class="chsName">内聚力</span><span class="engName">Cohesion</span>
: 水分子间的极性吸引。

<span class="chsName">附着力</span><span class="engName">Adhesion</span>
: 水分子对另一个表面的粘附，是土壤水与土壤颗粒之间的作用力。

<span class="chsName">毛细管作用</span><span class="engName">Capillary Action</span>
: 液体在细管状物体内侧，由液体与物体之间的附着力和因内聚力而产生的表面张力组合，使液体在不需施加外力的情况下，流向细管状物体的现象。

<span class="chsName">重力水</span><span class="engName">Gravitational Water</span>
: 由于重力而在土壤中自由移动的水，存在于大孔隙中。

<span class="chsName">毛细水</span><span class="engName">Capillary Water</span>
: 微孔中的水，是土壤溶液，其中大部分可被植物吸收利用。

<span class="chsName">凝聚水</span><span class="engName">Cohesion Water</span>
: 通过氢键固定，以水膜的形式存在，是植物的主要水源。

<span class="chsName">吸湿性水／粘附水</span><span class="engName">Hygroscopic water/Adhesion water</span>
: 水被土壤紧紧地固定住，不能被根部吸收，$$\Psi = \pu{-31 bar}$$。

<span class="chsName">土壤水势</span><span class="engName">Water Potential,$$\Psi$$</span>
: 每单位水量输送到土壤水中所需的能量，即相对于纯水自由水面土壤水所具有的势能。总水势 = 基质势 + 重力势 + 渗透势。

<span class="chsName">饱和</span><span class="engName">Saturation</span>
: 所有的孔都饱含水，$$\Psi = \pu{0 bar}$$。

<span class="chsName">田间持水量</span><span class="engName">Field Capacity</span>
: 给定土壤可以保留的最大水量，$$\Psi = \pu{-\frac 13 bar}$$。

<span class="chsName">枯萎点</span><span class="engName">Wilting Point</span>
: 土壤干燥到植物不能从土壤颗粒中释吸收剩余的水分时的含水量，$$\Psi = \pu{-15 bar}$$。

<span class="chsName">烤箱干燥</span><span class="engName">Oven Dry</span>
: 土壤在$$\pu{105^\circ C}$$的烤箱中干燥$$\pu{12 h}$$。所有的土壤水都除去了。


### 第5课

<span class="chsName">土壤有机质</span><span class="engName">Soil Organic Matter, SOM</span>
: 土壤中发现的大量碳基化合物。

<span class="chsName">腐殖质</span><span class="engName">Humus</span>
: 当有机物质分解成一种不再进一步分解的稳定物质时，被称为腐殖质。

<span class="chsName">氨化</span><span class="engName">Ammonification</span>
: 

<span class="chsName">硝化</span><span class="engName">Nitrification</span>
: 

<span class="chsName">反硝化</span><span class="engName">Denitrification</span>
: 

<span class="chsName">腐植酸／胡敏酸</span><span class="engName">Humic Acid, HA</span>
: 腐殖质的主要成分，溶于碱，不溶于水和酸。

<span class="chsName">富里酸</span><span class="engName">Fulvic Acid, FA</span>
: 既溶于碱，也溶于水和酸。

<span class="chsName">胡敏素</span><span class="engName">Humin, HM</span>
: 既不溶于碱，也不溶于水和酸。


### 第9课

<span class="chsName">地下水</span><span class="engName">Groundwater</span>
: 埋藏于地表以下土层（岩层）空隙中的水。

<span class="chsName">孔隙水</span><span class="engName">Pore water</span>
: 主要分布于平原、河谷平原和山间盆地的松散沉积地层中，在开发利用上占主要的地位。

<span class="chsName">裂隙水</span><span class="engName">Fissure water</span>
: 主要蕴藏于丘陵山区的基岩风化裂隙或构造裂隙中。

<span class="chsName">岩溶水</span><span class="engName">Karst water</span>
: 赋存于不同埋藏深度的碳酸盐岩层的溶洞、溶隙裂隙中。

<span class="chsName">水位</span><span class="engName">Water Table</span>
: 是地下水压与大气压相等的地方，是地下水正好饱和的深度。随季节、地形和地理结构的变化而变化。

<span class="chsName">非饱和带／包气带</span><span class="engName">Unsaturated Zone/Vadose Zone</span>
: 地表和饱和带之间的部分。其中的水的压头小于大气压，通过粘附作用和毛细管作用的结合而被保留下来，称为土壤水。包括毛细管边缘和局部的滞留地下水。

<span class="chsName">毛细管边缘</span><span class="engName">Capillary Fringe</span>
: 地下水位以上，由于毛细管作用而产生的水流上升，形成的与饱和带有水力联系的接近饱和的湿水层。

<span class="chsName">饱和带</span><span class="engName">Saturated zone</span>
: 地下水位以下的区域，其中在所有的开放空间都充满了压力等于或大于大气压力的水。

<span class="chsName">含水层</span><span class="engName">Aquifer</span>
: 是一种地下含水渗透性或松散的物质，蓄水和输水的地质单位。可以利用水井有效地从其中抽取地下水。

<span class="chsName">隔水层</span><span class="engName">Auitard</span>
: 限制地下水从一个含水层流向另一个含水层的区域。由粘土或无孔岩石组成，具有较低的渗透系数。

<span class="chsName">绝水层</span><span class="engName">Aquifuge</span>
: 完全不透水的隔水层。

<span class="chsName">非承压水层／潜水层</span><span class="engName">Unconfined Aquifer</span>
: 有时也被称为地下水层或潜水含水层，上表面是地下水位，没有隔水层，与大气直接接触。地下水位可以自由升降。

<span class="chsName">承压水层</span><span class="engName">Confined Aquifer</span>
: 两层隔水层之间的含水层。因为有隔水层，在承压水层中的地下水有很高的水压，因此井中的水位会上升到比含水层顶部高的位置。

<span class="chsName">单位产水率</span><span class="engName">Specific Yield,$$S_y$$</span>
: 由于重力作用从岩石中流出的水与总岩石的体积之比。

<span class="chsName">持水率</span><span class="engName">Specific Retention,$$S_r$$</span>
: 岩石在重力作用下能够保持的水体积与岩石总体积之比。

<span class="chsName">水力传导系数</span><span class="engName">Hydraulic Conductivity</span>
: 水通过物质的速率。


### 第10课

<span class="chsName">达西定律</span><span class="engName">Darcy's Law</span>
: 描述液体流过孔隙介质的本构方程，$$Q = -KA\cfrac {\Delta h}{\Delta l}$$。

<span class="chsName">水头</span><span class="engName">Hydraulic Head,$$h$$</span>
: 造成地下水流动的机械能的量度，$$h = h_p + z$$。

<span class="chsName">压头</span><span class="engName">Pressure Head,$$h_p$$</span>
: 液柱的高度。

<span class="chsName">升降头</span><span class="engName">Elevation Head,$$z$$</span>
: 液柱底端的海拔高度。

<span class="chsName">水力梯度</span><span class="engName">Hydraulic Gradients,$$I$$</span>
: 水头的斜率，$$I = \cfrac {\Delta h}{\Delta l}$$。

<span class="chsName">达西速率</span><span class="engName">Darcy Velocity,$$q$$</span>
: 根据达西定律求出的表观速率，$$q = \cfrac {Q}{A}$$。

<span class="chsName">渗流速率</span><span class="engName">Seepage Velocity,$$v_s$$</span>
: 流体在土壤中的实际速率，$$v_s = \cfrac {q}{n}$$。

<span class="chsName">层流</span><span class="engName">Lamina Flow</span>
: 

<span class="chsName">湍流</span><span class="engName">Turbulence Flow</span>
: 当流速很小时，流体分层流动，互不混合，称为层流。当流速增加到很大时，流线不再清楚可辨，流场中有许多小漩涡，称为湍流。

<span class="chsName">各向同性</span><span class="engName">Isotropy</span>
: 各个方向的数值都相同。

<span class="chsName">各向异性</span><span class="engName">Anisotropic</span>
: 各个方向的数值不同。

<span class="chsName">同质</span><span class="engName">Homogeneity</span>
: 

<span class="chsName">异质</span><span class="engName">Heterogeneous</span>
: 如果一种材料或一幅图像具有同质性（或者说是同质的），那么它就是由同样的单元堆砌而成的，或者它各部分的特征都是相同的。如果一种物质至少一种特征的分布明显不均匀，那么它就具有异质性。

<span class="chsName">稳态</span><span class="engName">Steady-state</span>
: 

<span class="chsName">瞬态</span><span class="engName">Transient</span>
: 

<span class="chsName">等效水力传导系数</span><span class="engName">Effective Hydraulic Conductivity,$$K_{\text{eff}}$$</span>
: 

### 第11课

<span class="chsName">连续性方程</span><span class="engName">Equation of Continuity</span>
: 单位时间内流入体积元的质量与流出该体积元的质量之差应等于该体积元内质量的增加或减少。

<span class="chsName">扩散方程</span><span class="engName">Diffusion Equation</span>
: $$K\left(\cfrac{\partial^2 h}{\partial x^2} + \cfrac{\partial^2 h}{\partial y^2} + \cfrac{\partial^2 h}{\partial z^2}\right) = 0$$。

<span class="chsName">无流量边界</span><span class="engName">No-flow Boundaries</span>
: 流体与边界平行，等势线与边界垂直。

<span class="chsName">恒压头边界</span><span class="engName">Constant-head Boundaries</span>
: $$h = 常数$$。流体与边界垂直，等势线与边界平行。

<span class="chsName">水位边界</span><span class="engName">Water-table Boundary</span>
: 在水位线上压头$$h_p = 0$$，此时$$h = z$$。

<span class="chsName">流线</span><span class="engName">Flow Line</span>
: 描述流体流动的平滑曲线。

<span class="chsName">等水头线</span><span class="engName">Equipotential Line</span>
: 将水头相等的各点连接而成的平滑曲线。

<span class="chsName">流网</span><span class="engName">Flow Net</span>
: 由流线和等水头线构成的图形。

<span class="chsName">边界条件</span><span class="engName">Boundary Conditions</span>
: 求解需要的初始条件。

<span class="chsName">平行</span><span class="engName">Parallel</span>
: 

<span class="chsName">垂直</span><span class="engName">Perpendicular</span>

### 第12课

<span class="chsName">流管</span><span class="engName">Stream Tube</span>
: 一组平行的流线构成的假想的管状结构。

<span class="chsName">水位下降</span><span class="engName">Drawdown</span>
: 由于泵水使地下水位下降。

<span class="chsName">平衡</span><span class="engName">Equilibrium</span>
: 

<span class="chsName">渗透率</span><span class="engName">Transmissivity,$$T$$</span>
: $$T = Kb$$。

<span class="chsName">储水系数</span><span class="engName">Storavity</span>
: 

## 3 地下水部分
### 3.1 基本概念
![地下水](https://s2.ax1x.com/2019/12/28/legihd.png)

- 定义：埋藏于地表以下土层（岩层）空隙中的水。地下水是水循环的重要部分，是许多国家饮用水的主要来源。
- 存储：孔隙、裂隙、溶隙。（名，9）
- 地下水位：（名，9）
- 非饱和带／包气带、饱和带：（名，9）
- 含水层、隔水层、绝水层：（名，9）
- 非承压水层／潜水层、承压水层：（名，9）

![地下水分层结构\|233px\|right](https://s2.ax1x.com/2019/12/28/lecX11.png)

- 分类：
  - 包气带水存在于包气带中，可分为非重力水和重力水两种。非重力水包括结合水和毛管水，重力水则指上层滞水。
  - 潜水是指埋藏在饱水带中第一个连续分布的隔水层以上具有自由表面的重力水，一般埋藏不深，便于开采利用。
    - 潜水具有自由水面，当用钻孔揭露潜水含水层时，初见水位与稳定水位相一致。
    - 通过包气带与地表相通，可以接受大气降水的补给。气象因素和地表水文因素的变化将影响潜水的动态。
    - 潜水在重力作用下，由潜水位较高的地方向潜水位较低的地方流动，其速度取决于势能梯度（水力坡度）和含水层的透水性。
    - 潜水的补给：降雨入渗、地表水入渗、越流补给。
    - 潜水的排泄：垂直排泄、水平排泄。条件：地形条件、埋深等。
  - 承压水是指充满于两个隔水层之间的含水层中的地下水。上部隔水层的底面称为隔水顶板，下部隔水层的顶面称隔水底板。
    - 具有连续完整的隔水顶板，而没有自由水面，钻孔中的稳定水位高于初见水位。
    - 补给区与承压水分布区不一致，补给区位于承压分布区的一侧，排泄区在另一侧。
    - 受上部隔水层的限制，水量、水质、水温受气候影响较小，季节性变化和年际变化都不大，它的动态具有相对稳定性。
    - 承压性是承压水的最重要的一个特征。
    - 承压水的补给：主要也是大气降水和地表水。
    - 承压水的排泄：主要以上升泉的形式在排泄区溢出。与地表水体（如河、湖、海洋）相通时即转化成地表水；如与潜水含水层沟通，则以补给潜水方式排泄承压水。
- 含水层的重要属性：孔隙度、渗透性。
  - 较好的含水层应有较高的孔隙度和渗透性。
  - 隔水层是地下水流动的屏障。

### 3.2 地下水移动
- 地下水移动：与岩石和沉积物的性质、地下水的流动势能有关。
  - 单位产水率、持水率：（名，9）
  - $$\varphi = S_y + S_r$$，即孔隙度等于单位产水率与持水率之和。
- 水力传导系数：（计，2；名，9）
- 达西定律：（计，2；名，10）
- 连续性方程：（计，3；名，11）
- 流线、流网：（计，4；名，11 & 12）
- 水位计算：（计，5；名，12）

![地下水流模式\|right\|250px](https://s2.ax1x.com/2019/12/28/lecj6x.png)

- 地下水流模式：
  - 补给区：饱和水流从水位线流出。
  - 排泄区：饱和水流流向水位线。
- 均质含水层中的地下水流动模式：
  - 对应地下水位的等势线反映了升降头。
  - 地下水位之下的等势线是曲线，反映了压力和高度。
  - 自流条件可以由地质或地形控制。

### 3.3 地质条件控制的区域流动
- 地形驱动流动（重力驱动）：
  - 是浅层和深层地下水流动的主导机制。
  - 深层地下水在含水层中的迁移速度为1 ~ 10 m/a，在隔水层中更低。
  - 关键因素：地形、传导性、非均质性、各向异性、盆地的几何形状。
- 自由对流：
  - 循环单元在有或没有区域水平流动的情况下产生，可与重力驱动的流动共存。
  - 受与热、盐度相关的浮力驱动。
  - 迁移速度约为1 m/a。
  - 关键因素：流体密度梯度、干水层厚度、传导性。
- 构造驱动流动：
  - 山区形成期间产生的压缩和逆冲会产生超压。
  - 增生楔（俯冲带）的流域特征，最高流速为0.5 m/a。
- 超压埋藏大陆边缘：
  - 临界压力可以接近覆盖层的重量（岩石静载荷）。
  - 超压经常发生在新形成的、水力传导系数低的盆地。
  - 对超压的贡献还包括：脱水反应、碳氢化合物的生成。
  - 流速一般< 1 cm/a。
- 地震泵送：灾难性断层通风口超压。
- 压力隔室：
  - 永久不渗透的屏障永远保持压力; 密封到隔离的隔间。
  - 大多数水文地质学家都不相信，他们觉得在地质时期总有一些渗透性和流动性。

### 3.4 地下水-湖泊相互作用
- 湖泊类型：
  - 地表水占主导地位：大部分湖水来源于地表水，湖泊有入口和出口（河流）。
  - 地下水占主导地位：大部分湖水来源于地下水。
- 渗流分布：补给湖、排泄湖、流经湖、以上组合。

![排泄湖、补给湖、流经湖\|800px](https://s2.ax1x.com/2019/12/28/legp7D.png)

- 渗流条件：
  - 湖泊沉积物的厚度和渗透性。
  - 湖泊沉积物的水力梯度。
  - 湖泊在区域流动系统的背景下。
- 数学模型：研究以下因素对停滞点的位置和水头值的影响：水位相对于湖面的高度、水力传导系数、含水层的位置大小、湖泊深度。
- 水流（Stream）：
  - 包括地表水（地表径流、直接降水）、地下水（基流，baseflow；通过河床或河岸渗水）。
  - 定义：
    - 流失流（Losing/Influent Stream）：水流供给含水层。
    - 获得流（Gaining/Effluent Stream）：含水层供给水流。
- 泉（Spring）：泉是自然状态下的排泄区。
  - 出现在地下水位接近或等于地表的地区。即使地下水位未到达地表，毛细管力也可将水带到表面。
  - 排泄可能是永久的或暂时的。
  - 排泄量与水位高度有关，受补给的季节变化等影响。

### 3.5 地下水环境背景
- 物理环境：
  - 温度：
    - 地下水的温度变化主要受气温和地温的影响，尤其是地温。
      - 地壳按热力状态从上而下分为变温带、年常温带和增温带。
      - 变温带的地温受气温控制呈周期性的昼夜变化和年变化，随深度的增加，变化幅度很快减小。
      - 常温带的气温的影响趋于0。温略高于年平均气温1 ~ 2 ℃，深度随纬度升高而增加。
      - 增温带是常温带以下的区域，主要受地球内部热力影响，随深度的增加而有规律地升高。温度每增加1度所需要地深度称为地热增温级，受岩石的导热性影响。
    - 地下水的温度一般与地温相同，$$T_H = T_b + \cfrac{H - h}{G}$$，其中$$T_H$$为地下深度$$H$$的地下水温度，$$T_b$$为常温带温度，$$H$$为地下水深度，$$h$$为常温带深度，$$G$$为地热增温级。
  - 颜色：受离子影响。$$\ce{Cu^2+}$$离子蓝色，$$\ce{Fe^3+}$$离子棕色，有机质过多呈黄色。
  - 透明度：受胶体及悬浮物的影响。一般透明，只有含大量有机物或胶体悬浮物时，地下水才会浑浊。
  - 嗅：气味，一般地下水无嗅。地下水的气味主要是其中溶解物质导致。如$$\ce{H2S}$$发出臭鸡蛋味，FeO为铁腥味，腐殖质有鱼腥味。
  - 味：受地下水中其他物质的影响。重碳酸根含量高的水较甜，爽口，氯化物含量较高的水则有咸味，硫酸盐苦。
  - 导电性：和离子浓度有关。
- 化学环境：
  - pH值：大多数地下水pH值在6.5 ～ 8.5之间，北方地区多为7 ～ 8的弱碱性水（主要是受土壤和岩石性质的影响，比如石灰岩为碱性）。
  - 氧化还原电位（$$E_h$$）：主要取决于地下水中氧化物质或还原物质的相对浓度，受温度、水中$$\ce{O2}$$分压和pH值的影响。
  - 溶解氧（DO）：主要取决于地下水的埋藏条件、径流条件、包气带的岩性及通气状况。一般山区和山前水文交替强烈，有机质含量不高，透气性好，DO较高；平原相反。
  - 化学耗氧量（COD）：反映了地下水中还原剂的总量，也反映了地下水中有机物含量的状况，COD与DO呈负相关关系。
  - 硬度：表示地下水中$$\ce{Ca^2+}$$、$$\ce{Mg^2+}$$离子的含量。
    - 分类：
      - 总硬度：$$\ce{Ca^2+}$$、$$\ce{Mg^2+}$$离子的总含量。
      - 暂时硬度：水沸腾后由于形成碳酸盐沉淀而失去的$$\ce{Ca^2+}$$、$$\ce{Mg^2+}$$离子的含量。
      - 永久硬度：水沸腾后仍留在水中的$$\ce{Ca^2+}$$、$$\ce{Mg^2+}$$离子的含量。
    - 根据总硬度可分为极软水、软水、弱硬水、硬水、极硬水。
    - 在人类活动的地区，地下水硬度的增高往往是地下水遭污染的重要标志。自然界的天然环境下水的硬度由山地向平原增高。

### 3.6 地下水成分
- 地下水中元素存在的形式：
  - 气体：
    - $$\ce{O2}$$：主要来源于大气。可以使许多有机物和无机物被氧化并发生物理化学作用。例如$$\ce{O2}$$含量高的情况下，铁会形成高价氧化物，从水中沉淀；反之铁形成低价氧化物，在水中容易迁移。
    - $$\ce{N2}$$：主要来源于大气，也有一部分生物起源。$$\ce{N2}$$不活泼，在较封闭的地下水中存在$$\ce{N2}$$，通常也可说明这种地下水是源于大气降水的。地下水中惰性气体与$$\ce{N2}$$的比例如恒定（0.0118），则说明$$\ce{N2}$$源于大气；如小，则说明水中含有生物起源的$$\ce{N2}$$。
    - $$\ce{H2S}$$：有机来源和无机来源。有机来源是含S的蛋白质分解，无机来源是缺氧条件下硫酸盐还原和火山喷发时逸出。
    - $$\ce{CO2}$$：大气来源（较少）、土壤中生物化学作用分解有机物（主要来源）、深层石灰岩变质。地下水中$$\ce{CO2}$$含量越多，溶解碳酸盐的能力越强。
  - 胶体：化学元素迁移的又一形式 ，当风化作用很强时，土壤和风化壳中几乎所有的固体都处于胶体状态。
  - 常见的正胶体有Fe、Al、Ti等的氢氧化物，负胶体有粘土胶体和腐殖质等。
  - 在湿润地区和富含有机物的酸性水中许多化学元素以胶体迁移为特征，如Mn、As等。
  - 在气候干燥地区的土壤和沉积物中含有大量方解石，水呈弱碱性，不含或几乎不含有机酸，所有这些条件均不利于胶体迁移。
- 地下水常量成分：
  - 阴离子：
    - $$\ce{Cl-}$$：主要来自海相沉积物和动物排泄物、尸体或其他废水。
      - 具有很高的迁移性能。它不形成难溶的矿物，不被胶体体系吸收，也不被生物聚集。
      - 地下水中$$\ce{Cl-}$$的分布很广，几乎存在于所有的地下水中。
      - 随着矿化度的增高，其余阴离子的浓度都基本不变 ，而$$\ce{Cl-}$$则直线上升。
    - $$\ce{SO4^2-}$$：主要来自含硫酸盐的沉积物、硫化矿物的氧化，此外也来自有机物的分解。居民点附近地下水中硫酸根的存在常常和污染有关。
      - 迁移性能也较好，仅次于$$\ce{Cl-}$$，土壤胶体也不吸附，但在天然水中的含量受$$\ce{Ca^2+}$$的限制。
      - 在无氧条件下能被还原成$$\ce{H2S}$$。此外S加入蛋白质和其他许多有机化合物的组织中。这些因素都妨碍$$\ce{SO4^2-}$$在水中的聚集。
    - $$\ce{HCO3-}$$：天然水中的主要形式，$$\ce{CO3^2-}$$很少见，主要由于$$\ce{CaCO3}$$、$$\ce{MgCO3}$$的溶解度很低。来自石灰岩等。
    - $$\ce{SiO3^2-}$$：溶解度很低，另外也容易被胶体吸附。但Si的分布仅次于O，因此也是一个常见离子。
  - 阳离子：
    - $$\ce{Na+}$$：主要来自海相沉积物。在地下水中占首位，迁移能力仅次于$$\ce{Cl-}$$，唯一不足就是容易被胶体吸附。
    - $$\ce{K+}$$：主要来自火成岩的风化（花岗岩中肉红色的钾长石等），溶解度很大，但由于参与了生物过程（植物吸收）、生成不溶于水的矿物（云母）、胶体吸附等原因，地下水中含量远远低于$$\ce{a+}$$和其他阳离子。天然界中发现盐湖，大多是以$$\ce{Na+}$$为主的。
    - $$\ce{Ca^2+}$$：主要来自石灰岩等。具有较高的克拉克值（3.6%），是弱矿化度水中主要的阳离子。随着矿化度的增高，浓度迅速减少。
    - $$\ce{Mg^2+}$$：主要来自白云岩等含镁岩石。几乎在所有地下水中都存在，但较少遇到$$\ce{Mg^2+}$$占优势的水，在低矿化度的水中$$\ce{Ca^2+}$$占优，高矿化度水中$$\ce{Na+}$$占优。
    - Fe：变价，$$\ce{Fe^2+}$$的溶解性高，在酸性条件下迁移能力较强；$$\ce{Fe^3+}$$的溶解性差，但可以以胶体形式迁移。
    - $$\ce{Al^3+}$$：也主要以胶体形式迁移。
  - N的化合物：$$\ce{NH4+}$$、$$\ce{NO3-}$$、$$\ce{NO2-}$$。主要来自动植物起源的各种蛋白质被细菌分解。
    - 大量的$$\ce{NH4+}$$主要存在油田水中，主要是封存的有机物在无氧条件下分解的结果。
    - $$\ce{NO2-}$$不稳定，在氧化条件下会被氧化成$$\ce{NO3-}$$离子。
    - $$\ce{NH4+}$$、$$\ce{NO2-}$$的存在存在表明地下水被污染，而且证明是最近的污染；$$\ce{NO3-}$$是氮化合物氧化的最终产物，通常表明是较远的污染（时间或空间）。
- 地下水微量成分：通常在水中的含量低于10 mg/L的元素称为微量成分。
  - 除去稳定性极高的Pt族元素和人工制造的元素外，自然界几乎所有的元素都会出现在地下水中。
  - 微量元素在地下水中的迁移只有一部分是以溶解态形式迁移，并且由于它们的溶解度很低，仅仅少部分是以自由离子形式迁移，绝大多数是呈络合离子形式迁移，还有一部分是以胶体形式和悬浮颗粒态迁移。其迁移受常量组分的组成和特征决定。酸性条件下有利于重金属元素迁移，中性和弱碱性条件下多以络合物迁移。
  - 尽管微量元素在地下水中含量较低，但水中微量组分的研究无论是从理论方法或是对解决实际问题方面都具有非常重要的意义。在矿藏勘探、提取工业原料、卫生防护方面都有着非常重要的作用。
- 地下水化学分类：
  - 矿化度分类：存在于地下水中的离子、分子和微粒之总含量称为地下水的总矿化度。分为淡水、微咸水、咸水、盐水、卤水。
  - 舒卡列夫分类：阴阳离子毫克当量总和各取100%，将水中含量大于25%毫克当量的离子参加水型命名，从而组成各种不同类型的水。
- 地下水化学成分的形成：现在所遇到的地下水化学成分都是一定的自然历史条件下（特别是深层地下水）在各种影响因素下，由各种作用综合作用的结果。
- 影响因素：
  - 自然地理因素：包括地形、水文、气候、气温、蒸发、土壤等条件的影响。以地形为例：地形切割越厉害，地下水交替速度越快，矿化度越低，以蒸发为例：蒸发使矿化度增大。
  - 地质因素：包括地质构造、构造运动、成矿作用、岩浆作用等。以构造运动为例，下降运动，有利于储存地下水，但随深度的下降，地下水交替缓慢，矿化度有增大趋势。
  - 水文地质因素：包括水动力因素和古水文地质因素。比如经过同一岩层的地下水，不同透水性区域地下水矿物含量会存在差异。实际中经常会出现布置很近的两个钻孔，矿化度差别很大。古水文地质因素：当年某地区是海水，后来陆地延伸到这个地方，打出的地下水有可能是咸水。
  - 物理化学因素：包括氧化还原条件、扩散作用和渗滤作用等。
  - 物理因素：包括温度、压力、重力等。不同温度下溶解度不同，密度大的液体向下运动。
  - 生物因素：植物蒸腾可使地下水矿化度增加，并随后使化学成分发生变化，对离子的选择性吸收也会改变地下水化学成分，此外根部呼吸分泌出的$$\ce{CO2}$$也会使土壤pH发生改变，促进矿物的溶解等。此外，也有微生物的作用。
- 基本作用：
  - 溶滤作用：在地壳上部岩石风化带中广泛地进行着，并不是简单的用水作溶剂，将岩土中的化学物质溶解出来，而是包含着各种各样的化学反应。
  - 浓缩作用：水蒸发时，地下水中所含盐分不减少，则其浓度增大。分为毛细蒸发和直接蒸发，毛细蒸发增大土壤的含盐量，降雨入渗时导致盐度增大。在干旱和半干旱区，浓缩作用成为地下水的矿化度和化学成分形成的主要因素。为了减少蒸发，新疆人民造了坎儿井。
  - 混合作用：当两种或数种成分或矿化度不同的地下水相遇时，所形成的地下水在成分和矿化度上皆与混合前不同。仅发生在两种水的界面附近一定宽度内。如混合不发生化学反应，浓度变化可以呈线性，如发生变化，则比较复杂，也可生成某种矿物（如石膏）。
  - 阳离子交替吸附作用：负胶体表面吸附的阳离子被另一种阳离子替换。一般而言，高价阳离子容易被吸附，但也存在浓度高的离子替换浓度低的离子，如$$\ce{Na+}$$浓度高的水可能将$$\ce{Ca^2+}$$替换下来。
  - 脱碳酸作用：$$\ce{HCO3}$$不稳定，压力和稳定发生变化时，分解形成石灰石（钙华），这种现象在深部泉水出露的地方或高原泉水等地方都有（九寨沟）。
  - 生物化学作用：许多研究证明无论是在埋藏不深的潜水还是深度在1000 m以上的地下水中，微生物都有能力发展和活动。硫磺细菌可以使$$\ce{H2S}$$变成S和硫酸。

### 3.7 环境背景值
- 环境背景值：各种环境要素在未受或很少受人类活动的影响，并且未受到污染和破坏的情况下，环境要素本身固有的化学组成和含量。环境背景值反映了地下水中各要素随自然环境的存在和发展演化的内在过程及特征。
- 特征值：平均值、标准差、变异系数。
- 调查步骤：确定工作目标、确定污染区与非污染区、划分水力单元、布点采样分析、剔除异常值、分析样品的分布形态、确定背景值。
  - 未污染区：直接给出分布形态、均值及方差等参数即可，好一点的可以在空间上拟何一个趋势面。
  - 污染区：
    - 比拟法：对照条件相似的未污染区。
    - 剖面图法：选择一条或几条穿越污染源的剖面，以水样为纵坐标，以空间为横坐标，作一条线，使远离污染源的点在线附近。
    - 历时曲线法：有长时间的记录，从突变点以前的算为背景。
    - 趋势面法：从未污染区的趋势面推测。

### 3.8 地下水污染
- 定义：由于人类活动使地下水的物理、化学和生物特征发生了恶化，因而限制或妨碍它在各方面的正常使用。
  - 水质朝着恶化方向发展，且这种恶化是人类活动引起的。
- 相比于地表水来说，地下水不易受到污染，因其不直接暴露于地表的污染物。但一旦地下水受到污染，其修复成本极高。
- 特点：
  - 隐蔽性：地下水污染不易被发现，当人们饮用后患病或供水常规监测才会发现污染。
  - 难以逆转性：地下水不易处理，清除和再利用非常昂贵，人们倾向于寻找新的水源供应。
- 污染源：微生物，化学品，有害物质，其它外来颗粒物等。

![地下水污染源](https://s2.ax1x.com/2019/12/28/legS0O.png)

- 自然源：与过度覆盖含水层或自然浸出相关的咸水腐蚀。与人为源相比危害较小。
  - 污染证据：味道或气味不佳、取水装置上有污渍、水中物质的检测。
  - 原因：自然的土壤或岩石条件。
  - 预防：避免使用存在天然地下水问题的地区、使用水处理设备、改为公共供水。
- 人为源：受到广泛关注。可能与废弃物处理有关或无关。可分为农业、工业、生活。
  - 农业：农药、化肥、除草剂、动物粪便、废水／污水灌溉。
    - 从农药或化肥容器中溢出。
    - 在井附近使用化学品。
    - 排水井冲刷农业废弃物。
    - 在地下水管道附近存放化学品。
    - 家畜粪便。
  - 工业：
    - 制造业和服务业对冷却水、加工室、清洁用水有很高的要求，当用过的水返回水力循环时发生污染。
    - 材料运输中可能产生溢出、泄漏或处理不当而丢失。
    - 一些企业依赖于浅层处理设施处理污水。
    - 部分企业的废水排放。
- 污染源种类：点源、非点源。
- 污染物：
  - 化学污染物：金属污染物、阴离子污染物、有机化学污染物。
  - 生物污染物：细菌、病毒、原虫。
  - 放射污染物：$$\ce{^3H}$$、$$\ce{^90Sr}$$、$$\ce{^129I}$$、$$\ce{^137Cs}$$、$$\ce{^226Ra}$$。
- 污染途径：
  - 间歇性／瞬态渗透：污染物通过雨水渗入地下水。污染源是工业、农业、生活废弃物。潜水层受到污染。
  - 连续渗透：渗入地下水。污染源是污水、废水。潜水层受到污染。
  - 泄漏流：污染源是受污染的含水层。潜水层、承压含水层受污染。
  - 径流。
- 污染物在多孔介质中的迁移：
  - 十分复杂，涉及到多种因素：温度、酸碱度、污染物的浓度、污染物的组分、微生物的活动、植物的吸收、多孔介质的非均质性和各向异性等。
  - 过程：
    - 物理过程：对流作用、扩散和弥散作用。
    - 化学过程：吸附与解吸作用、溶解和沉淀作用、氧化还原作用、配位作用、放射性核素衰减作用、水解作用、离子交换作用等。
    - 生物作用：生物降解作用和生物转化作用等。
  - 对流（Advection）：流体流动时把自己所含有的污染物一起从一个区域带到另一个区域，即空间位置的转移。
  - 分子扩散（Diffusion）：污染物在多孔介质流体中的不均匀分布，即使没有流动，污染物也会从高浓度的地方扩散到浓度低的地方。
  - 弥散（Dispersion）：流体通过多孔介质中的孔隙的平均流动速度和浓度，与多孔介质断面上的平均流动速度和浓度的不一致导致的分散现象。
- 修复治理：
  - 异位修复：抽取-处理。将污染了的地下水抽取出来，然后利用物理、化学、生物学方法处理，将处理后的水重新注入地下。
  - 可渗透反应墙：在地下填充有活性反应介质材料的被动反应区，污染地下水通过时污染物质被降解或固定。
  - 微生物处理技术：微生物刺激法、微生物添加法。

## 4 土壤部分
### 4.1 土壤污染
- 定义：人类活动所产生的污染物，通过多种途径进入土壤，其数量和速度超过了土壤容纳的能力和土壤净化速度的现象。
- 土壤背景值：未受到人类活动影响的土壤本身的化学元素组成。
- 土壤环境容量：在人类生存和自然生态不致受害的前提下，土壤环境中所能容纳的污染物的最大量或负荷量。
- 土壤的自净作用：污染物进入土壤后，会发生一系列物理、化学、和生物化学等反应，从而降低污染程度的过程。
  - 自净方式：
    - 物理净化过程：机械阻留、吸附、淋溶、稀释、挥发、扩散等。
    - 化学净化过程：凝聚与沉淀反应、氧化还原、络合与螯合、酸碱中和等。
    - 物理化学净化：离子交换吸附。
    - 生物净化过程：细菌、真菌、放线菌等体内酶或分泌酶的催化作用下，发生各种各样的分解反应。
  - 主要方式：
    - 重金属：通过吸附、沉淀、络合、氧化/还原等过程转变为难溶化合物，使其暂缓生物循环，减少在食物链中的传递过程。
    - 有机物：进入土壤后，经过化学、生物学等降解作用使其活性降低，在一定条件下转变为无毒或低毒物质。
- 污染物的输入和积累与自净作用的关系：是两个相反而又同时进行的对立、统一的过程，在正常情况下，两者处于动态平衡。
- 土壤污染的判断标准：土壤自净能力，动植物直接、间接吸收而受害的临界浓度。
- 特点：
  - 具有隐蔽性和滞后性。
  - 土壤污染具有累积性和地域性。
  - 土壤污染具有不可逆性。
  - 土壤污染治理的艰难性。
- 危害：主要是通过它的产品——植物表现其危害。
- 后果：
  - 土壤污染导致食物品质下降。
  - 土壤污染危害人体健康。
  - 土壤污染导致严重的经济损失。
  - 土壤污染导致其他环境问题。
- 来源：
  - 自然污染源：
    - 生物污染源：鼠、蚊、蝇、霉素、病原体等。
    - 非生物污染源：火山、地震等。
  - 人为污染源：
    - 生产性污染源：工业、农业、交通、科研等。
    - 生活性污染源：住宅、学校、医院、宾馆等。
    - 划分：
      - 工业污染源：冶金、动力、化工、造纸、纺织印刷、食品等工业产生的固体和液体等废弃物。
      - 农业污染源：农药、化肥、农业废弃物等。
      - 交通污染源：汽车、火车、飞机、轮船等。
      - 生活污染源：住宅、医院、宾馆、饭店等产生的生活垃圾、医院产生的一些带有致病病毒、病原体、细菌等医用垃圾。
    - 按污染途径：污水灌溉、酸雨和降尘、化肥农药、固体废物、汽车尾气。
- 污染物分类：化学污染物、生物污染物、放射性污染物。
- 我国土壤污染现状：
  - 土壤的重金属污染：污水灌溉是我国土壤重金属污染的重要原因。
  - 土壤的有机污染：六六六、DDT 等农药残留。
  - 土壤的放射性污染：放射性污染物进入到土壤中。
  - 汽车尾气对土壤的污染：汽车尾气中的含铅物质对土壤的污染逐渐加重，在道路两侧尤为严重。
  - 固体废物对土壤的污染：随着城市化的发展，固体废物对土壤的污染日趋严重。

### 4.2 土壤污染修复
- 按污染源分：原位和异位。
  - 原位修复（In-situ）：在原地进行修复，不会大面积地扰动土壤。
    - 优点：成本低，干扰和破坏小。
    - 缺点：耗时较长。
  - 异位修复（On-situ/Ex-situ）：将受污染的土壤或地下水挖出或抽提，移动到邻近地点或反应器内，对其中污染物进行处理。考虑到土壤资源问题，有时候会将处理过的土壤回填至原场地。
    - 优点：耗时短，具有很高的可控性，产生的副产物存在于处理工艺内，可控制最终产物的无害性。
    - 预处理：物理分离技术。主要应用在污染土壤中无机污染物的修复，设备简单、费用低廉、可持续高产出。
- 按照技术原理分：物理化学技术、生物技术。此外农田土壤也可使用农业工程修复。
- 修复技术：
  - 玻璃化技术：指利用等离子体、电流或其他热源在1600 ~ 2000 ℃的高温下熔化土壤及其污染物，有机污染物在此高温下被热解或蒸发而去除，产生的水汽和热解产物收集后由尾气处理系统进一步处理后排放。此外，熔化的污染土壤冷却后形成化学惰性的、非扩散性的玻璃体，无机有害离子得到固化。玻璃化技术是一种重金属与有机污染物协同处理的技术。
  - 固化／稳定化技术：稳定化是指利用化学添加剂等技术手段，将污染物转化为不易溶解、迁移能力或毒性变小的状态和形式，即通过降低污染物的生物有效性，实现其无害化或者降低其对生态系统危害性的风险。固化是指将污染物包被起来，使之呈颗粒状或大块状存在，进而使污染物处于相对稳定状态。通常用于重金属和放射性物质污染土壤的无害化处理。对于重金属污染土壤，常进行稳定化处理后再进行固定化处理。
    - 稳定化技术：pH值控制技术、氧化还原电位控制技术、沉淀与共沉淀技术、吸附技术、离子交换技术、超临界技术等。
    - 固化：水泥固化、石灰固化、塑性材料固化、有机聚合物固化、自胶结固化、熔融固化（玻璃固化）和陶瓷固化。
  - 化学淋洗技术：借助能促进土壤环境中污染物溶解或迁移作用的溶剂，通过水力压头推动清洗液，将其注入到被污染土层中，然后把包含有污染物的液体从土层中抽提出来，进行分离和污水处理技术。方法简便、成本低、处理量大、见效快，适用于大面积、重度污染的治理。
    - 影响因素：土壤质地、土壤有机质含量、土壤阳离子交换容量、污染物种类及含量、污染物在土壤中的存在形态。
    - 淋洗剂的选择：酸溶液、盐溶液、络合剂、表面活性剂、氧化还原剂。
    - 淋洗条件优化：淋洗剂种类、淋洗液浓度、淋洗时间、pH值、固液比。
  - 电动力学技术：是把电极插入受污染的地下水及土壤区域，并通入直流电，发生土壤孔隙水和带电粒子的迁移，土壤中的污染物质在外加电场作用下发生定向移动并在电极附近累积，定期将电极抽出处理，可将污染物去除。对于孔径小、渗透系数低的密质粘土，电动力修复比其他方法更容易去除其中的金属离子。
    - 电动力学原理：电迁移、电渗流、电泳、电解。
    - 影响因素：电解液成分、土壤pH值、土壤电导率、电场强度、土壤Zeta电势、土壤含水率、土壤结构特征、污染物存在形态、电极分布特征。
    - 技术瓶颈：电极极化、pH极化与聚焦效应、能耗问题。
  - 热解析技术：适合于挥发型强的重金属污染土壤处理，例如汞污染土壤。气化温度一般为300 ~ 600 ℃。
  - 微生物修复技术：As、Cr、Hg。
  - 植物修复技术：利用绿色植物及其根际微生物的共存体系的生命代谢活动吸收 、分解、挥发或固定土壤重金属作用，降低重金属在土壤中的含量和有效态含量 ，从而使污染了的环境能够部分恢复到原初状态的过程。
    - 茎叶：重金属提取、挥发。根系：重金属固定。
    - 分类：植物提取、植物固定、植物挥发、根系过滤。
    - 超富集植物：能超量吸收上壤重金属并将其运移到地上部的植物，是植物修复的核心和基础。
  - 工程控制技术：将污染土壤或经过治理后的土壤置于防渗阻隔填埋场内，或通过敷设阻隔层阻断土壤中污染物迁移扩散的途径，使污染土壤与四周环境隔离，避免污染物与人体接触和随降水或地下水迁移进而对人体和周围环境造成危害。