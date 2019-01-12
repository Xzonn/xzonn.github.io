---
layout: post
title: 《土壤与地下水》一小时速成
infoBox: incomplete formula
---
## 1 计算部分
### 1.1 土壤孔隙
* 空隙率（Void Ratio）：孔隙的体积与固体体积之比，$e = \cfrac {V_v}{V_s}$。
* 孔隙度（Porosity）：孔隙的体积与总体积之比，$\varphi = \cfrac {V_v}{V_T}$。
* 容重（Bulk Density）：干土壤质量与总体积之比，$\rho_b = \cfrac {M_s}{V_T}$。
* 颗粒密度（Particle Density）：干土壤质量与固体体积之比，$\rho_p = \cfrac {M_s}{V_s}$。
* 换算关系：$\varphi = \cfrac {V_v}{V_T} = \cfrac {V_T - V_s}{V_T} = 1 - \cfrac {V_s}{V_T} = 1 - \cfrac {M_s / \rho_p}{M_s / \rho_b} = 1 - \cfrac {\rho_b}{\rho_p}$。

### 1.2 达西定律
![水头|right|180px](https://i.imgur.com/XTe0YFS.png)

* 水力传导系数（Hydraulic Conductivity，$K$）：水通过物质的速率，取决于土壤类型、孔隙度、土壤孔隙结构。$K = \cfrac {k\rho g}{\mu}$，其中 $k$ 是固有渗透率，为介质的固有属性，$\rho$ 为质量密度，$\mu$ 为动力粘度，表征液体粘性的内摩擦系数。
  * Shepherd 经验公式：$K = a(D_{10})^b$，其中$a$和$b$是经验系数，$D_{10}$ 是材料 $10\~%$ 粒径。
* 达西定律（Darcy's Law）：描述液体流过孔隙介质的本构方程。$Q = -KA\cfrac {\Delta h}{\Delta l}$，其中 $Q$ 为总流量，$K$ 为水力传导系数，$A$ 为截面面积，$\Delta h$ 为水头损失，$\Delta l$ 为距离。
  * 公式中的符号表示 $Q$ 为水头减小的方向，即地下水由水头较高的地区流向水头较低的地区。
* 水头（Hydraulic Head，$h$）：是造成地下水流动的机械能的量度。
  * $h = h_p + z$，其中 $h_p$ 是压头（Pressure Head，即液柱的高度），$z$ 是升降头（Elevation Head，即液柱底端的海拔高度）。
  * $h = 地表水程 - 水深$。
* 水力梯度（Hydraulic Gradients，$I$）：即地下水位或等势面的梯度。$I = \cfrac {\Delta h}{\Delta l}$。
* 达西速率（Darcy Velocity，$q$）与渗流速率（Seepage velocity）：![达西速率与渗流速率\|right\|205px](https://i.imgur.com/uw9kT1v.png)
  * 定义 $q = \cfrac {Q}{A} = -K\cfrac {\Delta h}{\Delta l} = -KI$，$q$ 称为达西速率。
  * 达西速率是宏观流速，容易测量，是假想的状态，不能反映实际的流体流动状态。渗流速率是微观流速。<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 468.3 162.32" class="svgImage" data-alt="达西速率与渗流速率"><defs><style>.aa,.ab,.ad{fill:none;}.ab,.ad{stroke:#000;stroke-linejoin:round;}.ab{stroke-width:2.28px;}.ac{fill:#bbe0e3;}.ad{stroke-width:0.96px;}.ae{clip-path:url(#a);}.af,.al{font-size:24px;}</style><clipPath id="a" transform="translate(-124.92 -348.88)"><rect class="aa" width="720" height="540"/></clipPath></defs><ellipse class="ab" cx="55.14" cy="113.18" rx="54" ry="48"/><ellipse class="ab" cx="220.14" cy="113.18" rx="51" ry="48"/><circle class="ac" cx="64.08" cy="80.12" r="9"/><circle class="ad" cx="64.08" cy="80.12" r="9"/><circle class="ac" cx="82.08" cy="92.12" r="9"/><circle class="ad" cx="82.08" cy="92.12" r="9"/><circle class="ac" cx="40.08" cy="110.12" r="9"/><circle class="ad" cx="40.08" cy="110.12" r="9"/><circle class="ac" cx="58.08" cy="140.12" r="9"/><circle class="ad" cx="58.08" cy="140.12" r="9"/><circle class="ac" cx="82.08" cy="134.12" r="9"/><circle class="ad" cx="82.08" cy="134.12" r="9"/><circle class="ac" cx="34.08" cy="134.12" r="9"/><circle class="ad" cx="34.08" cy="134.12" r="9"/><circle class="ac" cx="22.08" cy="116.12" r="9"/><circle class="ad" cx="22.08" cy="116.12" r="9"/><circle class="ac" cx="88.08" cy="110.12" r="9"/><circle class="ad" cx="88.08" cy="110.12" r="9"/><circle class="ac" cx="64.08" cy="122.12" r="9"/><circle class="ad" cx="64.08" cy="122.12" r="9"/><circle class="ac" cx="40.08" cy="80.12" r="9"/><circle class="ad" cx="40.08" cy="80.12" r="9"/><circle class="ac" cx="22.08" cy="92.12" r="9"/><circle class="ad" cx="22.08" cy="92.12" r="9"/><circle class="ac" cx="64.08" cy="98.12" r="9"/><circle class="ad" cx="64.08" cy="98.12" r="9"/><circle class="ac" cx="46.08" cy="92.12" r="9"/><circle class="ad" cx="46.08" cy="92.12" r="9"/><ellipse class="ab" cx="388.14" cy="113.18" rx="51" ry="48"/><circle class="ac" cx="205.08" cy="89.12" r="18"/><circle class="ad" cx="205.08" cy="89.12" r="18"/><circle class="ac" cx="241.08" cy="131.12" r="18"/><circle class="ad" cx="241.08" cy="131.12" r="18"/><circle class="ac" cx="199.08" cy="131.12" r="18"/><circle class="ad" cx="199.08" cy="131.12" r="18"/><circle class="ac" cx="241.08" cy="95.12" r="18"/><circle class="ad" cx="241.08" cy="95.12" r="18"/><path d="M176,470l-2,4,4.39-.83ZM299.7,377.6,176.08,471.78l.61.8L300.3,378.4Z" transform="translate(-124.92 -348.88)"/><path d="M307.69,451.86,306,456l-2.3-3.83ZM300.5,378l5.77,75-1,.08-5.77-75Z" transform="translate(-124.92 -348.88)"/><g class="ae"><text class="af" transform="translate(308.35 37.95)">A = total area</text></g><g class="ae"><text class="al" transform="translate(164.33 19.95)">Av voids</text></g><path d="M503.83,457.53,504,462l3.48-2.81Zm29.71-61.74-28.75,63.27.91.42,28.76-63.27Z" transform="translate(-124.92 -348.88)"/></svg>
  * 从等量关系可以看出 $Q = qA = v_sA_v$，其中 $v_s$ 是渗流速率，$A_v$ 是孔隙的截面积。$v_s = q\cfrac {A}{A_v} = \cfrac {q}{\varphi}$。
* 达西定律的适用条件：适用于层流状态的任何条件，不适用于湍流。
* 达西定律拓展到三维的情况：
  * 各向同性（Isotropy）：各个方向的数值都相同，$K$ 为标量。此时 $q_x = -K\cfrac{\partial h}{\partial x}$，$q_y = -K\cfrac{\partial h}{\partial y}$，$q_z = -K\cfrac{\partial h}{\partial z}$。
  * 各向异性（Anisotropic）：各个方向的数值不同。$K = \begin{bmatrix} K_{xx} &amp; K_{xy} &amp; K_{xz} \\\\ K_{yx} &amp; K_{yy} &amp; K_{yz} \\\\ K_{zx} &amp; K_{zy} &amp; K_{zz} \end{bmatrix}$。$q_x = -K_{xx}\cfrac{\partial h}{\partial x} - K_{xy}\cfrac{\partial h}{\partial y} - K_{xz}\cfrac{\partial h}{\partial z}$，$q_y = -K_{yx}\cfrac{\partial h}{\partial x} - K_{yy}\cfrac{\partial h}{\partial y} - K_{yz}\cfrac{\partial h}{\partial z}$，$q_z = -K_{zx}\cfrac{\partial h}{\partial x} - K_{zy}\cfrac{\partial h}{\partial y} - K_{zz}\cfrac{\partial h}{\partial z}$。若为各向同性则该式中 $K_{xx} = K_{yy} = K_{zz} > 0$，其他系数为 $0$。
* 等效水力传导系数（Effective Hydraulic Conductivity，$K_{\text{eff}}$）：设土壤上下分层，则：
  * 水平径流（Horizontal flow）：$Q = Q_1 + Q_2 + \cdots + Q_n$，则 $K_{\text{eff}} = \cfrac {\sum\limits_{i}^{n} K_iD_i}{\sum\limits_{i}^{n}D_i}$，其中 $D_i$ 为第 $i$ 层的高度。
  * 垂直径流（Vertical flow）：$Q = Q_1 = Q_2 = \cdots = Q_n$，则 $K_{\text{eff}} = \cfrac {\sum\limits_{i}^{n} L_i}{\sum\limits_{i}^{n}\cfrac{L_i}{K_i}}$，其中 $L_i$ 为第 $i$ 层的高度。

### 1.3 连续性方程
* 连续性方程（Continuity Equation）：描述了流体流经多孔介质时质量的守恒。$\cfrac{\partial^2 h}{\partial x^2} + \cfrac{\partial^2 h}{\partial y^2} + \cfrac{\partial^2 h}{\partial z^2} = 0$。
  * 原理：单位时间内流入体积元的质量与流出该体积元的质量之差应等于该体积元内质量的增加或减少。
  * 推导：取体积微元 $\mathrm dx\mathrm dy\mathrm dz$，其在 $x$ 方向上单位时间单位截面的流量为 $\cfrac {\partial}{\partial x}(\rho q_x)\mathrm dy\mathrm dz$，对体积微元 $x$ 方向中点处取截面，流入量为 $(\rho q_x)\mathrm dy\mathrm dz - \cfrac {\partial}{\partial x}(\rho q_x)\cfrac {\mathrm dx}{2}\mathrm dy\mathrm dz$，流出量为 $(\rho q_x)\mathrm dy\mathrm dz + \cfrac {\partial}{\partial x}(\rho q_x)\cfrac {\mathrm dx}{2}\mathrm dy\mathrm dz$，则在 $x$ 方向的流量差为 $- \cfrac {\partial}{\partial x}(\rho q_x)\mathrm dx\mathrm dy\mathrm dz$。同理对 $y$ 方向和 $z$ 方向有类似结论，则总流量为 $-\rho \left(\cfrac{\partial q_x}{\partial x} + \cfrac{\partial q_y}{\partial y} + \cfrac{\partial q_z}{\partial z}\right)$ $= (-)(-)\rho\left[\cfrac {\partial}{\partial x}\left(K_x\cfrac {\partial h}{\partial x}\right) + \cfrac {\partial}{\partial y}\left(K_y\cfrac {\partial h}{\partial y}\right) + \cfrac {\partial}{\partial z}\left(K_z\cfrac {\partial h}{\partial z}\right)\right\]$ $= 0$，对各向同性介质 $K\left(\cfrac{\partial^2 h}{\partial x^2} + \cfrac{\partial^2 h}{\partial y^2} + \cfrac{\partial^2 h}{\partial z^2}\right) = 0$。
  * 求解：需要一定的边界条件（Boundary Conditions），也称初始条件（Initial Conditions）。以二维为例，可解的边界条件包括：
    * 无流量边界（No-flow Boundaries）：$\cfrac {\partial h}{\partial x} = 0$ 或 $\cfrac {\partial h}{\partial y} = 0$ 或 $\cfrac {\partial h}{\partial n} = 0$。流体与边界平行，等势线与边界垂直。
    * 恒压头边界（Constant-head Boundaries）：$h = 常数$。流体与边界垂直，等势线与边界平行。
    * 水位边界（Water-table Boundary）：$h = z$。在含水层的任何位置，总水头等于压头加升降头，即 $h = h_p + z$。在水位线上压头 $h_p = 0$，此时 $h = z$。

### 1.4 流网理论
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 431.34 355.08" class="bsvgImage" data-alt="流网|right"><defs><style>.ba,.bb,.bj{fill:none;}.bb{stroke:#000;stroke-width:4.56px;stroke-dasharray:18.24 13.68;}.bb,.bj{stroke-linejoin:round;}.bd,.bg,.bc{font-size:24px;}.bj{stroke:#f30;stroke-width:2.28px;}.bk{fill:#ceceef;}</style></defs><line class="bb" x1="57.49" y1="51" x2="57.49" y2="306.24"></line><line class="bb" x1="136.93" y1="62.4" x2="136.93" y2="300.48"></line><line class="bb" x1="221.89" y1="62.4" x2="221.89" y2="300.48"></line><line class="bb" x1="307.09" y1="62.4" x2="307.09" y2="300.48"></line><path d="M495,245l18-9-18-9Zm-310.8-6H498v-6H184.2Z" transform="translate(-126.71 -99.84)"></path><path d="M489.36,306.36l18,9-18,9Zm-305.16,6H492.36v6H184.2Z" transform="translate(-126.71 -99.84)"></path><line class="bb" x1="386.41" y1="56.76" x2="386.41" y2="294.96"></line><g class="bc"><text class="bd" transform="translate(0 109.76)">100</text></g><g class="bf"><text class="bg" transform="translate(399.27 105.02)">60</text></g><g class="bc"><text class="bi" transform="translate(410.7 134.74)">Ψ</text></g><g class="bc"><text class="bi" transform="translate(410.7 231.12)">Ψ</text></g><line class="bb" x1="97.21" y1="62.4" x2="97.21" y2="300.48"></line><line class="bb" x1="176.53" y1="51" x2="176.53" y2="294.96"></line><line class="bb" x1="267.25" y1="62.4" x2="267.25" y2="306.24"></line><line class="bb" x1="346.69" y1="56.76" x2="346.69" y2="300.72"></line><path d="M489.36,346l18,9-18,9ZM184.2,352H492.36v6H184.2Z" transform="translate(-126.71 -99.84)"></path><path d="M489.36,266.64l18,9-18,9Zm-305.16,6H492.36v6H184.2Z" transform="translate(-126.71 -99.84)"></path><path d="M489.36,187.2l18,9-18,9Zm-305.16,6H492.36v6H184.2Z" transform="translate(-126.71 -99.84)"></path><ellipse class="bj" cx="77.41" cy="156.06" rx="19.86" ry="19.8"></ellipse><rect class="bk" x="48.97" width="337.44" height="56.64"></rect><rect class="bk" x="49.69" y="298.44" width="337.44" height="56.64"></rect></svg>

* 流网理论（Flow Net Theory）：
  * 流网（Flow Net）：由正交的流线和等水头线绘制而成的模式。
    * 流线与等水头线垂直。
    * 流线之间永不相交，等水头线之间也永不相交。
    * 流线与等水头线构成“曲边正方形”，其纵横比或尺寸相同，但流线或等水头线可以弯曲。
  * 基本假设：
    * 静稳条件，无源，二维饱和流动。
    * 各向同性的均匀介质。
    * 边界条件给出，包含以下条件：恒压头边界、水位边界、水头时间固定边界、无流量边界、定流量边界。
  * 绘图方法：
    * 建立边界条件并在边界附近绘制一条或两条流线 $\Psi$ 和等水头线 $\Phi$。
    * 用平滑曲线绘制中间流线和等水头线，在流动方向是直线的情况下，流线应该是等间距的平行线。
    * 大多数情况下绘制 5 ~ 10 条流线即可。根据流线数量绘制等水头线的数量。![流线绘制示例](https://i.imgur.com/qEUInwa.png)
* 各向同性介质中的流网：
  * 当流线与等水头线的间距相等时，有 $Q = \cfrac {n\_f}{n\_d} KH$，其中 $n\_f$ 是流线的间距数，$n\_d$ 是等水头线的间距数。
* 分层介质中的流网：
  * 两介质中的流线方向遵循正切定律：$\cfrac {K_1}{K_2} = \cfrac {\tan \theta_1}{\tan \theta_2}$。

### 1.5 水位计算
![水位下降](https://i.imgur.com/x2E7na4.png)

* 在水泵泵水时，会导致地下水位的下降，称为水位下降（Drawdown）。泵水时水来源于存储区，直到达成新的平衡。
* 朝向井的不稳定径流：$\cfrac {\partial^2 h}{\partial r^2} + \cfrac {1}{r} \cfrac {\partial h}{\partial r} + \cfrac {e}{T} = \cfrac {S}{T} \cfrac {\partial h}{\partial t}$，其中 $S$ 是储水量（Storavity，无量纲），$T$ 是渗透率（Transmissivity），$T = Kb$，$b$ 是厚度，$t$ 是时间，$r$ 是与井的径向距离，$e$ 是垂直渗漏率。
* 承压含水层：$h_0 - h = \cfrac {Q}{4\pi T}\int_u^{+\infty} \cfrac {e^{-u}}{u}\mathrm du = \cfrac {Q}{4\pi T}W(u)$，其中 $Q$ 是泵水速率，$h_0$ 是泵水前的水头，$W(u)$ 是 $u$ 的函数。
  * 条件：顶部和底部均是不透水层，没有补给，$Q$ 为常数。
  * 渗透率在 $u$ 和 $h_0 - h$ 两个方程中均存在，储水量只存在于 $u$ 的方程中。
* 稳态的 Thiem 方程：$h_0 - h = \cfrac {Q}{2\pi T}\ln\left(\cfrac {R}{r}\right)$，其中 $R$ 是影响半径，即水头仍然是 $h_0$ 的距离。
  * 条件：无边界流动到经的稳态径流。在自然状态下不存在，但可以用来近似估计实际状况。假设在距离为 $R$ 的周围存在圆形的水头恒定的边界（例如与含水层完全接触的湖泊或河流）推导。
  * 推导：$Q = K\cdot 2\pi rb\cfrac{\mathrm dh}{\mathrm dr}$，即 $\mathrm dh = \cfrac {Q}{2\pi Kb} \cfrac {\mathrm dr}{r}$，积分得 $h_0 - h = \cfrac {Q}{2\pi T}\left(\cfrac {R}{r}\right)$
* 非承压含水层：$\cfrac {h_0^2 - h^2}{2} = \cfrac {Q}{2\pi K}\ln\left(\cfrac {R}{r}\right)$。
  * 推导：$Q = K\cdot 2\pi rh\cfrac{\mathrm dh}{\mathrm dr}$，即 $h\mathrm dh = \cfrac {Q}{2\pi K} \cfrac {\mathrm dr}{r}$，积分得 $\cfrac {h_0^2 - h^2}{2} = \cfrac {Q}{2\pi K}\ln\left(\cfrac {R}{r}\right)$。

## 2 名词解释部分
（待续）