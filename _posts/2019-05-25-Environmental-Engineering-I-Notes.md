---
layout: post
title: 《环境工程学一》知识点整理
infoBox: incomplete formula
---
## 第三章 颗粒污染物控制技术基础
- 大气污染控制中涉及到的颗粒物，一般是指所有大于分子的颗粒物，但实际的最小界限为 $$\pu{0.01 \mu m}$$ 左右。
- 颗粒物的存在状态，可单个地分散于气体介质中，也可能因凝聚等作用使多个颗粒集合在一起，成为集合体的状态，它在气体介质中就像单一个体一样。此外，颗粒物还能从气体介质中分离出来，呈堆积状态存在，或者本来就呈堆积状态。一般将这种呈堆积状态存在的颗粒物称为粉体。考虑到一般工程技术中的习惯，也通称为粉尘。

### 3.1 颗粒的粒径及粒径分布
#### 3.1.1 颗粒的粒径
- 若颗粒是球形的，则可用其直径作为颗粒的代表性尺寸。但实际颗粒的形状多是不规则的，所以需要按一定的方法确定一个表示颗粒大小的代表性尺寸，作为颗粒的直径，简称为粒径。
- 常用的粒径定义方法：
  - 显微镜法：
    - 定向直径（$$d_{\mathrm {F}}$$）：各颗粒在投影图中同一方向上的最大投影长度。
    - 定向面积等分直径（$$d_{\mathrm {M}}$$）：各颗粒在投影图中按同一方向将颗粒投影面积二等分的线段长度。
    - 投影面积直径（$$d_{\mathrm {A}}$$）：与颗粒投影面积相等的圆的直径。$$d_{\mathrm {A}} = \sqrt{\cfrac {4A}{\pi}}$$。
    - 长径（$$d_{\mathrm {L}}$$）：不考虑方向的最大长度。
    - 短径（$$d_{\mathrm {b}}$$）：不考虑方向的最小长度。
  - 筛分法：
    - 筛分直径：颗粒能够通过的最小方筛孔的宽度。
  - 光散射法：
    - 等体积直径（$$d_{\mathrm {V}}$$）：与颗粒体积相等的圆球的直径。$$d_{\mathrm {V}} = \sqrt[3]{\cfrac {6V}{\pi}}$$。
  - 沉降法：
    - 斯托克斯直径（$$d_{\mathrm {s}}$$）：同一流体中与颗粒的密度相同和沉降速度相等的圆球的直径。
    - 空气动力学当量直径（$$d_{\mathrm {a}}$$）：同一流体中与颗粒的密度相同和沉降速度相等的单位密度（$$\rho_{\mathrm p} = \pu{1g/cm3}$$）的圆球的直径。

#### 3.1.2 粒径分布
- 个数分布：
  - 按粒径间隔给出个数分布测定数据，$$n_i$$ 为每一间隔测得的颗粒的个数，$$N = \sum n_i$$ 为颗粒的总个数。据此可以作出个数分布的其他定义。
  - 个数频率：$$f_i = \cfrac {n_i}{\sum n_i}$$，并有$$\sum\limits^{N}f_i = 1$$。
  - 个数筛下累积频率：小于第 $$i$$ 间隔上限粒径的所有颗粒个数与颗粒总个数之比，即 $$F_i = \cfrac {\sum\limits^{i} n_i}{\sum\limits^{N} n_i}$$ 或 $$F_i = {\sum\limits^{i} f_i}$$，并有 $$F_N = {\sum\limits^{N} f_i} = 1$$。
    - 类似地可以定义个数筛上累积频率。
    - 由累积频率曲线可以求出任意粒径间隔的频率 $$f$$ 值。$$f_{a-b} = F_a - F_b = \int^{F_a}_{F_b} \mathrm dF = \int^{d_{\mathrm pa}}_{d_{\mathrm pb}} p\cdot\mathrm dd_{\mathrm p}$$。
  - 个数频率密度：$$p(d_{\mathrm p}) = \cfrac {\mathrm dF}{\mathrm dd_{\mathrm p}}$$。
    - 计算每一间隔的平均频度 $$\overline{p_i} = \cfrac {\Delta F_i}{\Delta d_{\mathrm pi}} = \cfrac {f_i}{\Delta d_{\mathrm pi}}$$，按 $$\overline{p_i}$$ 值对间隔中值 $$d_{\mathrm pi}$$ 作出个数频率密度分布曲线。
    - $$F = \int_0^{d_{\mathrm p}} p\cdot\mathrm dd_{\mathrm p}$$，$$F_{\mathrm N} = \int_0^{+\infty} p\cdot\mathrm dd_{\mathrm p} = 1$$。
    - $$F$$ 曲线是有一拐点的“S”形曲线，拐点发生在个数频率密度 $$p$$ 为最大值时对应的粒径处，这一粒径称为众径 $$d_{\mathrm {d}}$$。此处 $$\cfrac {\mathrm dp}{\mathrm dd_{\mathrm p}} = \cfrac {\mathrm d^2F}{\mathrm dd_{\mathrm p}^2} = 0$$。
    - $$F = 0.5$$ 时对应的粒径 $$d_{50}$$ 称为个数中位直径（$$\mathrm {NMD}$$）。
- 质量分布：
  - 以颗粒个数给出的粒径分布数据，可以转换为以颗粒质量表示的粒径分布数据，或者进行相反的换算。这是根据所有颗粒都具有相同的密度，以及颗粒的质量与其粒径的立方成正比的假定进行的。可以按质量给出频率、筛下累积频率和频率密度的定义式。
  - 质量频率：$$g_i = \cfrac {m_i}{\sum m_i} = \cfrac {n_id_{\mathrm pi}^3}{\sum\limits^{N} n_id_{\mathrm pi}^3}$$。
  - 质量筛下累积频率：小于第 $$i$$ 间隔上限粒径的所有颗粒个数与颗粒总个数之比，即 $$G_i = {\sum\limits^{i} g_i} = \cfrac {\sum\limits^{i}n_id_{\mathrm pi}^3}{\sum\limits^{N} n_id_{\mathrm pi}^3}$$，并有 $$G_N = {\sum\limits^{N} g_i} = 1$$。
  - 质量频率密度：$$q = \cfrac {\mathrm dG}{\mathrm dd_{\mathrm p}}$$。
    - $$G = \int_0^{d_{\mathrm p}} q\cdot\mathrm dd_{\mathrm p}$$，$$G_{\mathrm N} = \int_0^{+\infty} q\cdot\mathrm dd_{\mathrm p} = 1$$。
    - $$G$$ 曲线也是有一拐点的“S”形曲线，拐点发生在质量频率密度 $$q$$ 为最大值时对应的粒径处，这一粒径称为质量众径。
    - $$G = 0.5$$ 时对应的粒径 $$d_{50}$$ 称为质量中位直径（$$\mathrm {MMD}$$）。

#### 3.1.3 平均粒径
- 长度平均（或算数平均）粒径：$$\overline{d_L} = \cfrac {\sum n_id_{\mathrm pi}}{\sum n_i} = \sum f_id_{\mathrm pi} = \cfrac {\sum g_i/d_{\mathrm pi}^2}{\sum g_i/d_{\mathrm pi}^3}$$。
- 表面积平均粒径：$$\overline{d_S} = \sqrt{\cfrac {\sum n_id_{\mathrm pi}^2}{\sum n_i}} = \sqrt{\sum f_id_{\mathrm pi}^2} = \sqrt{\cfrac {\sum g_i/d_{\mathrm pi}}{\sum g_i/d_{\mathrm pi}^3}}$$。
- 体积平均粒径：$$\overline{d_V} = \sqrt[3]{\cfrac {\sum n_id_{\mathrm pi}^3}{\sum n_i}} = \sqrt[3]{\sum f_id_{\mathrm pi}^3} = \sqrt[3]{\cfrac {1}{\sum g_i/d_{\mathrm pi}^3}}$$。
- 表面积-体积平均粒径：$$\overline{d_{SV}} = \cfrac {\sum n_id_{\mathrm pi}^3}{\sum n_id_{\mathrm pi}^2} = \cfrac {\sum f_id_{\mathrm pi}^3}{\sum f_id_{\mathrm pi}^2} = \cfrac {1}{\sum g_i/d_{\mathrm pi}}$$。
- 几何平均粒径：$$d_{\mathrm g} = (d_1d_2\cdots d_N)^{1/N}$$，或$$d_{\mathrm g} = (d_1^{n_1}d_2^{n_2}\cdots d_n^{n_N})^{1/N}$$。
- 按 $$\ln d_{\mathrm g}$$ 表示的几何平均粒径：$$\ln d_{\mathrm g} = \cfrac {\sum n_i\ln d_{\mathrm pi}}{N}$$，或 $$d_{\mathrm g} = \mathrm e^{\frac {\sum n_i\ln d_{\mathrm pi}}{N}}$$。
- 对于频率密度分布曲线是对称性的分布（如正态分布），其众径 $$d_{\mathrm d}$$、中位直径 $$d_{50}$$ 和算数平均粒径 $$\overline{d_L}$$ 相等；对于非对称性，$$d_{\mathrm d} < d_{50} < \overline{d_L}$$。
- 对于单分散气溶胶，所有颗粒的粒径相同，$$\overline{d_L} = d_{\mathrm g}$$；否则，$$\overline{d_L} > d_{\mathrm g}$$。

#### 3.1.4 粒径分布函数
- 正态分布（高斯分布）：
  - 频率密度：$$p(d_{\mathrm p}) = \cfrac {1}{\sigma\sqrt{2\pi}}\mathrm e^{-\frac {(d_{\mathrm p} - \overline{d_{\mathrm p}})^2}{2\sigma^2}}$$。
  - 筛下累计频率：$$F(d_{\mathrm p}) = \cfrac {1}{\sigma\sqrt{2\pi}}\int_0^{d_{\mathrm p}}\mathrm e^{-\frac {(d_{\mathrm p} - \overline{d_{\mathrm p}})^2}{2\sigma^2}}\mathrm dd_{\mathrm p}$$。
  - 其中，$$d_{\mathrm p}$$ 为平均粒径 $$\overline{d_L}$$，$$\sigma$$ 为标准差，$$\sigma = \sqrt{\cfrac {\sum{n_i(d_{\mathrm pi} - \overline{d_{\mathrm p}})^2}}{N - 1}}$$。
  - $$F$$ 曲线在正态概率坐标纸上为一条直线，其斜率决定于标准差 $$\sigma$$ 值。$$\sigma = d_{84.1} - d_{50} = d_{50} - d_{15.9} = \cfrac 12 (d_{84.1} - d_{15.9})$$。
- 对数正态分布：是最常用的粒径分布函数。以粒径的对数 $$\ln d_{\mathrm p}$$ 代替粒径 $$d_{\mathrm p}$$ 作出频率密度 $$p$$ 曲线，得到一向正态分布一样的对称性钟形曲线，则认为该粉尘粒径分布符合对数正态分布。
  - $$F(d_{\mathrm p}) = \cfrac {1}{\sqrt{2\pi}\ln\sigma_{\mathrm g}}\int_{-\infty}^{\ln d_{\mathrm p}}\mathrm e^{-\left(\frac {\ln d_{\mathrm p}/{d_{\mathrm g}}}{\sqrt 2\ln\sigma_{\mathrm g}}\right)^2}\mathrm d(\ln d_{\mathrm p})$$。
  - $$p(d_{\mathrm p}) = \cfrac {1}{\sqrt{2\pi}d_{\mathrm p}\ln\sigma_{\mathrm g}}\mathrm e^{-\left(\frac {\ln d_{\mathrm p}/{d_{\mathrm g}}}{\sqrt 2\ln\sigma_{\mathrm g}}\right)^2}$$。
  - 其中，$$d_{\mathrm g}$$ 为几何平均粒径，$$\sigma_{\mathrm g}$$ 为几何标准差，$$\sigma_{\mathrm g} = \sqrt{\cfrac {\sum{n_i(\ln d_{\mathrm pi}/d_{\mathrm g})^2}}{N - 1}}$$。
  - $$\sigma_{\mathrm g} = \cfrac{d_{84.1}}{d_{50}} = \cfrac{d_{50}}{d_{15.9}} = \sqrt{\cfrac{d_{84.1}}{d_{15.9}}}$$。
  - 如果某种粉尘的粒径分布符合对数正态分布，则无论是质量分布、个数分布，还是表面积分布，它们的几何标准差 $$\sigma_{\mathrm g}$$ 相等。$$\text{MMD}$$ 表示质量中位直径，$$\text{NMD}$$ 表示个数中位直径，$$\text{SMD}$$ 表示表面积中位直径，则三者的换算关系为：$$\ln \text{MMD} = \ln \text{NMD} + 3\ln^2 \sigma_{\mathrm g}$$，$$\ln \text{SMD} = \ln \text{NMD} + 2\ln^2 \sigma_{\mathrm g}$$。
  - 算术平均粒径：$$\ln \overline{d_L} = \ln \text{NMD} + \cfrac12\ln^2 \sigma_{\mathrm g}$$。
  - 表面积平均粒径：$$\ln \overline{d_S} = \ln \text{NMD} + \ln^2 \sigma_{\mathrm g}$$。
  - 体积平均粒径：$$\ln \overline{d_V} = \ln \text{NMD} + \cfrac32\ln^2 \sigma_{\mathrm g}$$。
  - 表面积-体积平均粒径：$$\ln \overline{d_{SV}} = \ln \text{NMD} + \cfrac52\ln^2 \sigma_{\mathrm g}$$。

### 3.2 粉尘的物理性质
- 密度：
  - 单位体积粉尘的质量称为粉尘的密度，单位为 $$\pu{kg/m3}$$ 或 $$\pu{g/cm3}$$。
  - 真密度 $$\rho_{\mathrm p}$$：以真实体积（不包括粉尘颗粒之间和颗粒内部的空隙体积）求得的密度。
  - 堆积密度 $$\rho_{\mathrm b}$$：以堆积体积（包括粉尘颗粒之间和颗粒内部的空隙体积）求得的密度。
  - 对同一种粉尘来说，$$\rho_{\mathrm b} = (1 - \varepsilon)\rho_{\mathrm p}$$，其中 $$\varepsilon$$ 为空隙率。
- 安息角与滑动角：
  - 安息角：粉尘从漏斗连续落到水平面上，自然堆积成一个圆锥体，圆锥体母线与水平面的交角。安息角小的粉尘，其流动性好。
  - 滑动角：自然堆放在光滑平板上的粉尘，随平板做倾斜运动时，粉尘开始发生滑动时的平板倾斜角。
- 比表面积：
  - 以粉尘自身体积（净体积）为基准表示的比表面积 $$\S_V = \cfrac {\bar S}{\bar V} = \cfrac {6}{\overline{d}{SV}}$$。
  - 以粉尘质量为基准表示的比表面积 $$S_m = \cfrac {\bar S}{\rho_{\mathrm p}\bar V} = \cfrac {6}{\rho_{\mathrm p}\overline{d}{SV}}$$。
  - 以堆积体积为基准表示的比表面积 $$S_{\mathrm b} = (1 - \varepsilon)\S_V = (1 - \varepsilon)\cfrac {\bar S}{\bar V} = (1 - \varepsilon)\cfrac {6}{\overline{d}{SV}}$$。
- 含水率：粉尘中所含水分质量与粉尘总质量之比。
- 润湿性：粉尘颗粒与液体接触后能否相互附着或附着难易程度的性质。
  - 当尘粒与液体接触时，如果接触面能扩大而相互附着，则称为润湿性粉尘；如果接触面趋于缩小而不能附着，则称为非润湿性粉尘。
  - 粉尘的润湿性是选用湿式除尘器的主要依据。
- 荷电性和导电性：
  - 荷电性：天然粉尘和工业粉尘几乎都带有一定的电荷（正电荷或负电荷）。电除尘器就是利用粉尘荷电而除尘的，在袋式除尘器和湿式除尘器中也可利用粉尘或液滴荷电来进一步提高对细尘粒的不急性能。
  - 导电性：通常用电阻率来表示：$$rho_{\mathrm d} = \cfrac {V}{J\delta}$$，其中 $$V$$ 为通过粉尘层的电压，$$J$$ 为通过粉尘层的电流密度，$$\delta$$ 为粉尘层的厚度。
    - 高温时主要靠粉尘本体内部的电子或离子进行，低温时主要靠尘粒表面吸附的水分或其他化学物质中的离子进行。中间温度均存在。
    - 高温范围内电阻率随温度升高而降低，低温范围内电阻率随温度升高而增大。中间温度均较弱，电阻率达到最大值。
- 黏附性：粉尘颗粒附着在固体表面上，或者颗粒彼此相互附着的现象称为黏附。
  - 黏附力分为分子力（范德华力）、毛细力、静电力（库仑力）。
  - 通常用粉尘层的断裂强度表示。
- 自燃性和爆炸性：
  - 自燃性：粉尘在常温下存放过程中自然发热，此热量经长时间的积累，达到该粉尘的燃点而引起燃烧。来源：氧化热、分解热、聚合热、发酵热。
  - 爆炸性：可燃物的剧烈氧化作用，在瞬间产生大量的热量和燃烧产物，在空间造成很高的温度和压力。条件：可燃混合物达到浓度范围、能量。

### 3.3 净化装置的性能
- 评价净化装置性能的指标，包括技术指标和经济指标两方面。

#### 3.3.1 净化装置技术性能的表示方法
- 处理气体流量：由于本体漏气等原因，往往装置进口和出口的气体流量不同，因此用两者的平均值作为处理气体流量的代表。$$q_{V, \mathrm N} = \cfrac 12(q_{V, 1\mathrm N} + q_{V, 2\mathrm N})$$。
  - 净化装置漏风率 $$\delta = \cfrac {q_{V, 1\mathrm N} - q_{V, 2\mathrm N}}{q_{V, 1\mathrm N}} \times 100~\%$$。
- 净化效率：是表示装置净化污染物效果的重要技术指标。
- 压力损失：装置的进口和出口气流全压之差。$$\Delta p = \zeta\cfrac {\rho v_1^2}{2}$$，其中 $$\zeta$$ 是净化装置的压力损失系数，$$v_1$$ 是装置进口气流速度，$$\rho$$ 是气体的密度。

#### 3.3.2 净化效率的表示方法
- 总效率：同一时间内净化装置去除的污染物数量与进入装置的污染物数量之比。
  - 装置进（出）口的气体流量为 $$q_{V, 1\mathrm N}$$（$$q_{V, 2\mathrm N}$$）、污染物流量为 $$q_{m, 1}$$（$$q_{m, 2}$$），污染物浓度为 $$\rho_{1\mathrm N}$$（$$\rho_{2\mathrm N}$$），装置捕集的污染物流量为 $$q_{m, 3}$$。
  - $$\eta = \cfrac {q_{m, 3}}{q_{m, 1}} = 1 - \cfrac {q_{m, 2}}{q_{m, 1}}$$，或 $$\eta = 1 - \cfrac {\rho_{2\mathrm N}q_{V, 2\mathrm N}}{\rho_{1\mathrm N}q_{V, 1\mathrm N}}$$。
- 通过率：当净化效率很高时，或为了说明污染物的排放率，有时采用通过率来表示装置性能。$$P = \cfrac {q_{m, 2}}{q_{m, 1}} = 1 - \eta$$。
- 分级除尘效率：表示除尘效率与粉尘粒径的关系。
  - 除尘器进口、出口和补给的 $$d_{\mathrm pi}$$ 颗粒质量流量分别为 $$q_{m, 1i}$$、$$q_{m, 2i}$$、$$q_{m, 3i}$$，则该除尘器对 $$d_{\mathrm pi}$$ 颗粒的分级效率为：$$\eta_i = \cfrac {q_{m, 3i}}{q_{m, 1i}} = 1 - \cfrac {q_{m, 2i}}{q_{m, 1i}}$$。
  - $$\eta_i = 50~%$$ 对应的粒径称为除尘器的分割粒径 $$d_{\mathrm c}$$。
- 由总效率求分级效率：
  - $$\eta_i = \cfrac {q_{m, 3}g_{3i}}{q_{m, 1}g_{1i}} = \eta \cfrac{g_{3i}}{g_{1i}}$$；
  - $$\eta_i = 1 - \cfrac {q_{m, 2}g_{2i}}{q_{m, 1}g_{1i}} = 1 - P\cfrac{g_{2i}}{g_{1i}}$$；
  - $$\eta_i = \cfrac {\eta}{\eta + Pg_{2i}/g_{3i}}$$。
- 由分级效率求总除尘效率：$$\eta = \sum \eta_ig_{1i}$$。
- 多级串联运行时的总净化效率：
  - 总分级通过率：$$P_{i\mathrm T} = P_{i1}P_{i2}\cdots P_{in}$$。
  - 总分级效率：$$\eta_{i\mathrm T} = 1 - (1 - \eta_{i1})(1 - \eta_{i2})\cdots(1 - \eta_{in})$$。

### 3.4 颗粒捕集的理论基础
#### 3.4.1 流体阻力
- 流体阻力包括形状阻力、摩擦阻力，其大小取决于颗粒的形状、粒径、表面特性、运动速度及流体的种类和性质。
- $$F_{\mathrm D} = \cfrac 12C_{\mathrm D}A_{\mathrm p}\rho u^2$$，其中 $$C_{\mathrm D}$$ 是阻力系数，$$A_{\mathrm p}$$ 是颗粒在其运动方向上的投影面积，$$\rho$$ 是流体的密度，$$u$$ 是颗粒与流体之间的相对运动速度。
- 阻力系数是雷诺数的函数，$$Re_{\mathrm p} = \cfrac {d_{\mathrm p}\rho u}{\mu}$$，其中 $$d_{\mathrm p}$$ 是颗粒的定性尺寸，$$\mu$$ 是流体的黏度。
  - 当 $$Re_{\mathrm p} \le 1$$ 时，颗粒运动处于层流状态，近似有 $$C_{\mathrm D} = \cfrac {24}{Re_{\mathrm p}}$$。对于球形颗粒有 $$F_{\mathrm D} = 3\pi\mu d_{\mathrm p}u$$，即斯托克斯阻力定律。称为斯托克斯区域。
  - 当 $$1 < Re_{\mathrm p} < 500$$ 时，颗粒运动处于湍流过渡区，近似有 $$C_{\mathrm D} = \cfrac {18.5}{Re_{\mathrm p}^{0.6}}$$。
  - 当 $$500 < Re_{\mathrm p} < 2\times10^5$$ 时，颗粒运动处于湍流状态，近似有 $$C_{\mathrm D} = 0.44$$。
- 当颗粒尺寸小到与气体分子平均自由程大小差不多时，颗粒开始脱离与气体分子接触，颗粒运动发生所谓“滑动”。在斯托克斯定律中引入坎宁汉修正系数 $$C$$，则流体阻力 $$F_{\mathrm D} = \cfrac {3\pi\mu d_{\mathrm p}u}{C}$$。
  - 坎宁汉修正系数的值取决于克努森数 $$Kn = \cfrac {2\lambda}{d_{\mathrm p}}$$：$$C = 1 + Kn\left(1.257 + 0.400\mathrm e^{-\frac{1.10}{Kn}}\right)$$。
  - 气体分子平均自由程 $$\lambda = \cfrac {\mu}{0.499 \rho\bar v}$$，其中 $$\bar v$$ 为气体分子的算术平均速度，$$\bar v = \sqrt{\cfrac{8RT}{\pi M}}$$。
  - 近似计算：$$\pu{293 K}$$ 和 $$\pu{101325 Pa}$$ 下，$$C = 1 + \cfrac {0.165}{d_{\mathrm p}}$$，$$d_{\mathrm p}$$ 单位为 $$\pu{\mu m}$$。

#### 3.4.2 阻力导致的减速运动
- 根据牛顿第二定律 $$\cfrac {\pi d_{\mathrm p}^3}{6} \rho_{\mathrm p} \cfrac {\mathrm du}{\mathrm dt} = -F_{\mathrm D} = -C_{\mathrm D}\cfrac {\pi d_{\mathrm p}^2}{4} \cfrac {\rho u^2}{2}$$，即 $$\cfrac{\mathrm du}{\mathrm dt} = -\cfrac {3}{4} C_{\mathrm D}\cfrac {\rho}{\rho_{\mathrm p}}\cfrac {u^2}{d_{\mathrm p}}$$。
  - $$Re_{\mathrm p}$$ 不超过几百时，忽略速度对 $$C_{\mathrm D}$$ 的影响。
  - 斯托克斯区域内，$$\cfrac{\mathrm du}{\mathrm dt} = -\cfrac {18 \mu}{d_{\mathrm p}^2\rho_{\mathrm p}}u = -\cfrac {u}{\tau}$$，其中 $$\tau = \cfrac {d_{\mathrm p}^2\rho_{\mathrm p}}{18 \mu}$$，称为弛豫时间。
  - 在 $$t = 0$$ 时运动速度为 $$u_0$$ 的颗粒，减速到 $$u$$ 所需的时间 $$t = \tau\ln\cfrac{u_0}{u}$$。
  - 在时间 $$t$$ 时颗粒的速度 $$u = u_0\mathrm e^{-\frac {t}{\tau}}$$。
  - 颗粒由初速度 $$u_0$$ 减速到 $$u$$ 所迁移的距离 $$x = \tau(u_0 - u)$$。
  - 颗粒的停止距离 $$x_{\mathrm s} = \tau u_0$$。
  - 滑流区域引入坎宁汉修正系数 $$C$$。

#### 3.4.3 重力沉降
- 在静止流体中的单个球形颗粒，在重力作用下沉降时，$$F_{\mathrm D} = F_{\mathrm G} - F_{\mathrm B} = \cfrac {\pi d_{\mathrm p}^3}{6}(\rho_{\mathrm p} - \rho)g$$。
  - 斯托克斯区，$$u_{\mathrm s} = \cfrac {d_{\mathrm p}^2(\rho_{\mathrm p} - \rho)g}{18 \mu}$$。
  - 湍流过渡区，$$u_{\mathrm s} = \cfrac {0.153d_{\mathrm p}^{1.14}(\rho_{\mathrm p} - \rho)^{0.714}g^{0.714}}{\mu^{0.428}\rho^{0.286}}$$。
  - 牛顿区，$$u_s = 1.74\sqrt{\cfrac {d_{\mathrm p}(\rho_{\mathrm p} - \rho)g}{\rho}}$$。
  - 对于较大的球形颗粒，$$u_{\mathrm s} = \sqrt{\cfrac {4d_{\mathrm p}(\rho_{\mathrm p} - \rho)g}{3C_{\mathrm D}\rho}}$$。
- 斯托克斯直径：$$d_{\mathrm s} = \sqrt{\cfrac{18\mu u_{\mathrm s}}{\rho_{\mathrm p}gC}}$$，空气动力学当量直径：$$d_{\mathrm a} = \sqrt{\cfrac{18\mu u_{\mathrm s}}{1000gC}}$$，二者关系 $$d_{\mathrm a} = d_{\mathrm s}\sqrt{\cfrac{\rho_{\mathrm p}C}{C_{\mathrm a}}}$$。

#### 3.4.4 离心沉降
- 离心力 $$F_{\mathrm c} = \cfrac {\pi}{6}d_{\mathrm p}^3\rho_{\mathrm p}\cfrac{u_{\mathrm t}^2}{R}$$。
- 末端速度 $$u_{\mathrm c} = \cfrac {d_{\mathrm p}^2\rho_{\mathrm p}}{18 \mu} \cfrac{u_{\mathrm t}^2}{R} = \tau a_{\mathrm c}$$。

#### 3.4.5 静电沉降
- 静电力 $$F_{\mathrm E} = qE$$。
- 末端速度（驱进速度） $$\omega = \cfrac {qE}{3\pi\mu d_{\mathrm p}}$$。

#### 3.4.6 惯性沉降
- 惯性碰撞：捕集效率取决于三个因素。
  - 气流速度在捕集体周围的分布：$$Re_{\mathrm D} = \cfrac {u_0\rho D_{\mathrm c}}{\mu}$$。在高 $$Re_{\mathrm D}$$ 下，除了临近捕集体表面附近外，气流流型与理想气体一致；当 $$Re_{\mathrm D}$$ 较低时，气流受黏性力支配。
  - 颗粒的运动轨迹：取决于颗粒的质量、气流阻力、捕集体的尺寸、形状及气流速度。碰撞参数 $$St = \cfrac {x_{\mathrm s}}{D_{\mathrm c}} = \cfrac {u_0\tau C}{D_{\mathrm c}}$$。
  - 颗粒对捕集体的附着：通常假定与捕集体碰撞的颗粒能 $$100~\%$$ 附着。
- 拦截：
  - 直接拦截比 $$R = \cfrac {d_{\mathrm p}}{D_{\mathrm c}}$$。
  - $$St$$ 很大时，拦截效率为：圆柱形 $$\eta_{\mathrm {DI}} = R$$，球形 $$\eta_{\mathrm {DI}} = 2R$$。
  - $$St$$ 很小时，拦截效率为：
    - 圆柱体势流 $$\eta_{\mathrm {DI}} = 2R$$，球体势流 $$\eta_{\mathrm {DI}} = 3R$$。
- 圆柱体黏性流 $$\eta_{\mathrm {DI}} = \cfrac {R^2}{2.002 - \ln Re_{\mathrm D}}$$，球体黏性流 $$\eta_{\mathrm {DI}} = \cfrac {3R^2}{2}$$。

#### 3.4.7 扩散沉降
- 扩散系数和均方根位移：
  - 对于粒径约等于或大于气体分子平均自由程（$$Kn \le 0.5$$）的颗粒，可用爱因斯坦公式计算：$$D = \cfrac {CkT}{3\pi\mu d_{\mathrm p}}$$。
  - 对于粒径大于气体分子但小于气体分子平均自由程（$$Kn > 0.5$$）的颗粒，可用朗缪尔公式计算：$$D = \cfrac {4kT}{3\pi d_{\mathrm p}^2p}\sqrt{\cfrac {8RT}{\pi M}}$$。
  - 由于布朗扩散，颗粒在时间 $$t$$ 内沿 $$x$$ 轴的均方根位移为 $$\bar x = \sqrt{2Dt}$$。
- 扩散沉降效率：
  - 佩克莱数：$$Pe = \cfrac {u_0D_{\mathrm c}}{D}$$，是由惯性力产生的颗粒的迁移量与布朗扩散产生的颗粒的迁移量之比。
  - 对于黏性流，$$\eta_{\mathrm {BD}} = \cfrac {1.71Pe^{-2/3}}{(2 - \ln Re_{\mathrm D})^{1/3}}$$。
  - 对于势流，$$\eta{\mathrm {BD}} = \cfrac {3.19}{Pe^{1/2}}$$。
  - 对于孤立的单个球形捕集体，$$\eta{\mathrm {BD}} = \cfrac {8}{Pe} + 2.23 Re_{\mathrm D}^{1/8}Pe^{-5/8}$$。
- 对于大颗粒的捕集，布朗扩散的作用很小，主要靠惯性碰撞作用；反之，对于很小的颗粒，惯性碰撞的作用微乎其微，主要是靠扩散沉降。

## 第四章 除尘装置
- 从气体中去除或捕集固态或液态微粒的设备称为除尘装置，或除尘器。

### 4.1 机械除尘器
- 机械除尘器通常指利用质量力（重力、惯性力和离心力等）的作用使颗粒物与气流分离的装置。

#### 4.1.1 重力沉降室
![简单的重力沉降室](https://i.imgur.com/EX3MFaQ.png)

- 重力沉降室是通过重力作用使尘粒从气流中沉降分离的除尘装置。含尘气流进入重力沉降室后，由于扩大了流动截面积而使气体流速大大降低，使较重颗粒在重力作用下缓慢向灰斗沉降。
- 层流式重力沉降室：
  - 假定：
    - 在沉降室内气流为柱塞流，流速为 $$v_0$$，流动状态保持在层流范围内，颗粒均匀地分布在烟气中。
    - 在垂直方向，忽略浮力，仅在重力和气体阻力的作用下，每个例子以其沉降速度 $$u_{\mathrm s}$$ 独立沉降。
    - 在水平方向，粒子和气流具有相同的速度。
  - 设沉降室长 $$L$$、宽 $$W$$、高 $$H$$，处理烟气量 $$q_V$$。气流在沉降室内的停留时间为 $$t = \cfrac {L}{v_0} = \cfrac {LQH}{q_V}$$。
    - 在时间 $$t$$ 内，粒径为 $$d_{\mathrm p}$$ 的离子的沉降距离为：$$h_{\mathrm c} = u_{\mathrm s}t = \cfrac {u_{\mathrm s}L}{v_0} = \cfrac {u_{\mathrm s}LWH}{q_V}$$。
    - 当 $$h_{\mathrm c} < H$$ 时，粒子的分级除尘效率 $$\eta_i = \cfrac {h_{\mathrm c}}{H} = \cfrac {u_{\mathrm s}L}{v_0H} = \cfrac {u_{\mathrm s}LW}{q_V}$$。
    - 假设位于斯托克斯区，则能 $$100~\%$$ 捕集的最小粒子直径 $$d_{\mathrm {min}} = \sqrt{\cfrac {18\mu v_0H}{\rho_{\mathrm p}gL}} = \sqrt{\cfrac{18\mu q_V}{\rho_{\mathrm p}gWL}}$$。在 $$\pu{293 K}$$ 和 $$\pu{101325 Pa}$$ 下，对于 $$\rho = \pu{1 g/cm3}$$、$$d_{\mathrm p} < \pu{100 \mu m}$$ 的粒子都可行。
  - 由于沉降室内的扰动和返混，常用计算值的一半作为分级效率，用 $$36$$ 代替 $$18$$。
  - 提高沉降室除尘效率的主要途径：降低沉降室内的气流速度、增加沉降室长度、降低沉降室高度。
  - 多层沉降室：$$\eta_i = \cfrac {u_{\mathrm s}LW(n+1)}{q_V}$$。
- 湍流式重力沉降室：
  - 假定沉降室中气流为湍流状态，在垂直于气流方向的每个横截面上粒子完全混合，即各种粒径的离子都均匀分布于气流中。
  - 粒径为 $$d_{\mathrm p}$$ 的离子的分级除尘效率为 $$\eta_i = 1 - \mathrm e^{\frac {u_{\mathrm s}LW}{q_V}}$$。
- 重力沉降室的主要优点：结构简单、投资少、压力损失小、维修管理容易。缺点：体积大、效率低。只能作为高效除尘的预除尘装置，出去较大和较重的粒子。

#### 4.1.2 惯性除尘器
- 除尘机理：在沉降室内设置各种形式的挡板，使含尘气流冲击在挡板上。气流方向发生急剧转变，借助尘粒本身的惯性力作用，使其与气流分离。
- 结构类型：
  - 冲击式：以气流中粒子冲击挡板捕集较粗粒子。
  - 反转式：通过改变气流流动方向而捕集较细粒子。
- 应用：
  - 气流速度越高、气流方向转变角度越大、转变次数越多，净化效率越高、压力损失越大。
  - 用于净化密度和粒径较大的金属或矿物性粉尘。
  - 一般只用于多级除尘中的第一级除尘。

#### 4.1.3 旋风除尘器
![普通旋风除尘器的结构及内部气流](https://i.imgur.com/bY7v5Mt.png)

- 旋风除尘器是利用旋转气流产生的离心力使尘粒从气流中分离的装置，具有结构简单、应用广泛、种类繁多等特点。
- 气流与尘粒的运动：
  - 含尘气流进入除尘器后，沿外壁由上向下作旋转运动，同时有少量气体沿径向运动到中心区域。当旋转气流的大部分到达锥体底部后，转而向上沿轴心旋转，最后经排出管派出。
  - 旋转向下的外圈气流称为外涡旋，旋转向上的中心气流称为内涡旋。
  - 切向速度：决定气流速度大小的主要速度分量，决定气流质点离心力大小的主要因素。
    - 外涡旋：$$v_{\mathrm t}R^n = 常数$$，其中 $$n \le 1$$，称为涡流指数，$$n = 1 - (1 - 0.67D^{0.14})\left(\cfrac {T}{283}\right)^{0.3}$$，其中 $$D$$ 为旋风除尘器的直径，$$T$$ 为气体的温度。
    - 内涡旋：$$v_{\mathrm t} = \omega R$$，其中 $$\omega$$ 是气流的旋转角速度。
    - 在内外涡旋交界圆柱面上，气流的切向速度最大。
  - 径向速度：近似认为外涡旋气流均匀地经过内、外涡旋交界圆柱面进入内涡旋，其平均速度认为是外涡旋气流的平均径向速度 $$v_r = \cfrac {q_V}{2\pi r_0h_0}$$。
  - 轴向速度：外涡旋向下；内涡旋向上，且随气流上升而增大。
- 压力损失：$$\Delta p = \cfrac 12 \xi\rho v_1^2$$。
- 除尘效率：
  - 计算分割直径是确定除尘效率的基础。
  - 粒子的沉降主要取决于离心力 $$F_{\mathrm C}$$ 和阻力 $$F_{\mathrm D}$$。
    - 如果 $$F_{\mathrm C} > F_{\mathrm D}$$，则在离心力推动下移向外壁，被捕集。
    - 如果 $$F_{\mathrm C} < F_{\mathrm D}$$，则在向心气流的带动下进入内涡旋并排出。
    - 如果 $$F_{\mathrm C} = F_{\mathrm D}$$，则有 $$50~\%$$ 几率被捕集，$$50~\%$$ 几率被排出，此时的粒径即为分割粒径。
  - 对于球形粒子，$$\cfrac {\pi}{6}d_{\mathrm c}^3\rho_{\mathrm p}\cfrac {v_{\mathrm t0}^2}{r_0} = 3\pi\mu d_{\mathrm c}v_r$$，其中 $$v_{\mathrm t0}$$ 为交界面处气流的切向速度，$$v_r$$ 为平均径向速度。
    - 求得 $$d_{\mathrm c} = \sqrt{\cfrac {18\mu v_rr_0}{\rho_{\mathrm p}v_{\mathrm t0}^2}}$$，计算分级效率 $$\eta_i = 1 - \mathrm {exp}\left[-0.6931\times\left(\cfrac {d_{\mathrm p}}{d_{\mathrm c}}\right)^{\frac {1}{n + 1}}\right]$$。
    - 另一种公式 $$\eta_i = \cfrac {(d_{\mathrm pi}/d_{\mathrm c})^2}{1 + (d_{\mathrm pi}/d_{\mathrm c})^2}$$。
- 影响因素：
  - 二次效应：被捕集离子重新进入气流。
    - 在较小粒径区间，理应逸出的粒子由于聚集或被较大尘粒撞向壁面，实际效率高于理论效率。
    - 在较大粒径区间，理应降入灰斗的尘粒随净化后的气流一起拍走，实际效率低于理论效率。
  - 比例尺寸：
    - 相同的切向速度下，筒体直径 $$D$$ 越小，粒子受到的惯性力越大，但粒子容易逃逸，使效率下降。
    - 锥体适当加长，对提高除尘效率有利。
    - 排出管直径越小，分割直径越小，除尘效率越高，但压力降增加，一般取排出管直径 $$d_{\mathrm e} = (0.4 \sim 0.65)D$$。
    - 除尘器下部的严密性也是重要因素。
  - 烟尘的物理性质：气体的密度和黏度、尘粒的大小和相对密度、烟气含尘浓度。
  - 操作变量：提高烟气入口流速，分割直径变小。
- 旋风除尘器的结构形式：
  - 按进气方式：切向进入式、轴向进入式，切向进入式又分为直入式和蜗壳式。
  - 按气流组织：回流式、直流式、平旋式、旋流式。
  - 多管旋风除尘器：由多个相同构造形状和尺寸的小型旋风除尘器组合在一个壳体内并联使用的除尘器组。常见回流式、直流式。
- 设计选型：
  - 根据含尘浓度、粒度分布、密度等烟气特征及除尘要求、允许的压力损失和制造条件等因素全面分析，合理地选择旋风除尘器的类型。
  - 根据使用时允许的压力降确定进口气速。
  - 确定旋风除尘器的进口截面、入口宽度、高度。
  - 确定各部分几何尺寸。

### 4.2 电除尘器

### 4.3 袋式除尘器

### 4.4 湿式除尘器

### 4.5 除尘器的选择与发展
