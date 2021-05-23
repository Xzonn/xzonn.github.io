---
class: formal
date: 2019-01-07 12:00
info: 一小时速成？不可能的，想啥呢。
infobox: complete
last_modified_at: 2020-01-11 23:57
math: true
tags: 数学 试题整理
title: 环院《线性代数（B）》试题整理
---
<style>
.gsbFinal > li > ul { counter-reset: list-item; }
.gsbFinal > li > ul > li { list-style: lower-alpha; }
.gsbFinal > li > ul > li::marker { content: "(" counter(list-item, lower-alpha) ")"; }
</style>

这是《线性代数 (B)》的试题。

## 2018 - 2019 秋季学期（王保祥）
### 期中试题
1. 设 $\alpha\_1 = (a\_1, a\_2, a\_3, a\_4)$，$\alpha\_2 = (b\_1, b\_2, b\_3, b\_4)$ 线性无关，问 $\beta\_1 = (a\_1, a\_2, a\_3)$，$\beta\_2 = (b\_1, b\_2, b\_3)$ 是否线性无关？说明理由。
2. 设 $\alpha\_1 = (1, 0, 0, \cdots, 0)$，$\alpha\_2 = (1, 1, 0, \cdots, 0)$，$\alpha\_3 = (1, 1, 1, \cdots, 0)$，$\cdots$，$\alpha\_n = (1, 1, 1, \cdots, 1)$。求出 $L(\alpha\_1, \alpha\_2, \cdots, \alpha\_n) = \\{ c\_1\alpha\_1 + c\_2\alpha\_2 + \cdots + c\_n\alpha\_n \mid c\_j 为实数 \\}$。问 $\alpha\_1, \alpha\_2, \cdots, \alpha\_n$ 是否为 $L(\alpha\_1, \alpha\_2, \cdots, \alpha\_n)$ 的基，为什么？
3. 计算 Vandermonde 行列式：\$\$ \begin{vmatrix} 1 &amp; 1 &amp; \cdots &amp; 1 \\\\ a\_1 &amp; a\_2 &amp; \cdots &amp; a\_n \\\\ a\_1^2 &amp; a\_2^2 &amp; \cdots &amp; a\_n^2 \\\\ \vdots &amp; \vdots &amp;  &amp; \vdots \\\\ a\_1^{n-1} &amp; a\_2^{n-1} &amp; \cdots &amp; a\_n^{n-1} \end{vmatrix}. \$\$
4. 讨论下列矩阵的秩：\$\$ \begin{bmatrix} 1 &amp; a &amp; -1 &amp; 2 \\\\ 2 &amp; -1 &amp; a &amp; 5 \\\\ 1 &amp; 10 &amp; -6 &amp; 1 \end{bmatrix}. \$\$
5. 齐次线性方程组 \$\$ x\_1\alpha\_1 + \cdots x\_n\alpha\_n = 0 \$\$ 有解是否可以推出非齐次线性方程组 \$\$ x\_1\alpha\_1 + \cdots x\_n\alpha\_n = \beta \$\$ 也一定有解，如是请证明，若不然请举例说明你的结果。

### 期末试题
<style class="linearAlgebraTests2018BStyle"> .linearAlgebraTests2018BStyle + ol { list-style: simp-chinese-informal; padding-left: 2em; } </style>
1. （30 分）回答下面的问题：
   1. 设 $V$ 为线性空间，$V$ 中向量 $\alpha\_1, \alpha\_2, \cdots, \alpha\_s$ 可以由 $\beta\_1, \beta\_2, \cdots, \beta\_r$ 线性表出且 $s > r$。问 $\alpha\_1, \alpha\_2, \cdots, \alpha\_s$ 是否为线性无关的向量组？请证明你的结果。
   2. 设 $V$ 为 $n$ 维线性空间，$\alpha\_1, \alpha\_2, \cdots, \alpha\_n$ 是 $V$ 中线性无关的向量组，问 $\alpha\_1, \alpha\_2, \cdots, \alpha\_n$ 是否为 $V$ 的基，为什么？
   3. 设 $V = \\{(a\_{ij})\_{n \times n} \mid a\_{ij} = a\_{ji}, a\_{ij} 为实数 \\}$，问 $V$ 的基是什么？说明理由。
2. （20 分）设 $V$ 为欧几里得线性空间，维数为 $n$，构造同构映射 $\sigma : V \rightarrow \mathbb R^n$，并证明你的结论。
3. （20 分）设 \$\$A = \begin{bmatrix} 4 &amp; 1 &amp; 2 \\\\ 3 &amp; 2 &amp; 1 \\\\ 5 &amp; -3 &amp; 2 \end{bmatrix}, \$\$ 求 $A$ 的逆矩阵；\$\$ B = \begin{bmatrix} 2 &amp; 2 &amp; -2 \\\\ 2 &amp; 5 &amp; -4 \\\\ -2 &amp; -4 &amp; 5 \end{bmatrix}, \$\$ 求 $B$ 的特征值和特征向量。
4. （20 分）化下面的二次型为标准形：\$\$ f(x\_1, x\_2, x\_3) = x\_1x\_2 + x\_1x\_3 - 3x\_3x\_2. \$\$
5. （10 分）设 $V$ 为函数 $1$，$\sin x$，$\cos x$，$\sin 2x$，$\cos 2x$，$\cdots$，$\sin nx$，$\cos nx$ 生成的线性空间，求出 $V$。$\mathbb Af$ 表示 $f$ 的导函数，问 $\mathbb A$ 是否为 $V$ 上的线性变换？进一步求出 $\mathbb A$ 在 $V$ 的基下的矩阵表示。

## 2019 - 2020 秋季学期（甘少波）
### 期中试题
1. （每题10分，共20分） 计算下面行列式的值。
  - $$ \begin{vmatrix} 1 & \cfrac 12 & \cfrac 13 \\ \cfrac 12 & \cfrac 13 & \cfrac 14 \\ \cfrac 13 & \cfrac 14 & \cfrac 15 \end{vmatrix}$$，
  - $$ \begin{vmatrix} 0 & 1 & 0 & 0 & 1 \\ 0 & 0 & 0 & 4 & 0 \\ 0 & 0 & 0 & 0 & 2 \\ 0 & 0 & 3 & 9 & 0 \\ 1 & 0 & 4 & 16 & 0 \end{vmatrix}$$。
2. （20分）考虑下面的线性方程组\\\[ \begin{cases} x\_1 + 2x\_2 - ax\_3 = 1, \\\\ x\_1 + 3x\_2 - ax\_3 = 2, \\\\ ax\_1 + 3x\_2 - ax\_3 = 3. \end{cases} \\\]问当$$a$$取何值时，上述方程组无解？当$$a$$取何值时，有唯一解？当$$a$$取何值时，有无穷多解？当方程组有无穷多解时，求出其解集。
3. （15分）设有向量组：\\\[ \gamma\_1 = \begin{bmatrix} 1 \\\\ 1 \\\\ 2 \\\\ 1 \end{bmatrix}, \gamma\_2 = \begin{bmatrix} 1 \\\\ 3 \\\\ 1 \\\\ 2 \end{bmatrix}, \gamma\_3 = \begin{bmatrix} 1 \\\\ 7 \\\\ -1 \\\\ 4 \end{bmatrix}, \gamma\_4 = \begin{bmatrix} 1 \\\\ -1 \\\\ 3 \\\\ 0 \end{bmatrix}. \\\]求该向量组生成的子空间$$\langle \gamma_1, \gamma_2, \gamma_3, \gamma_4 \rangle$$的维数和一个基。
4. （10分）已知一个4元线性方程组的系数矩阵的秩为2，且下列向量是它的解\\\[ \gamma\_1 = \begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \end{bmatrix}, \gamma\_2 = \begin{bmatrix} 1 \\\\ -1 \\\\ 2 \\\\ 0 \end{bmatrix}, \gamma\_3 = \begin{bmatrix} 1 \\\\ 1 \\\\ 4 \\\\ 1 \end{bmatrix}. \\\]
  - （5分）求该线性方程组的增广矩阵的秩；
  - （5分）求此方程组的通解。
5. （15分）考虑$$n(n \ge 3)$$元齐次线性方程组：\\\[ \begin{cases} x\_1 + x\_2 - x\_3 = 0, \\\\ x\_2 + x\_3 - x\_4 = 0, \\\\ \cdots \\\\ x\_{n - 2} + x\_{n- 1} - x\_n = 0. \end{cases} \\\]
  - （10分）将上述方程组看成实数域$$\mathbb{R}$$上的方程组，求它的一个基础解系；
  - （5分）将上述方程组看成有理数域$$\mathbb{Q}$$上的方程组，求它的一个基础解系。
6. （10分）求解下面的$$n$$元线性方程组：\\\[ \begin{cases} x\_1 + x\_2 + x\_3 + \cdots + x\_n = 1, \\\\ x\_1 + 2x\_2 + 3x\_3 + \cdots + nx\_n = 0, \\\\ x\_1 + 2^2x\_2 + 3^2x\_3 + \cdots + n^2x\_n = 0, \\\\ \cdots \\\\ x\_1 + 2^{n - 1}x\_2 + 3^{n - 1}x\_3 + \cdots + n^{n - 1}x\_n = 0. \end{cases} \\\]
7. （10分）设$$n$$个方程的$$n$$元齐次线性方程组有非零解，并且系数矩阵$$A$$的$$(1, 1)$$元的代数余子式$$A_{11} \neq 0$$。证明：$$\eta = (A_{11}, A_{12}, \cdots, A_{1n})^T$$为该齐次线性方程组的一个基础解系，其中$$A_{ij}$$为$$A$$的$$(1, j)$$元的代数余子式。

### 期末试题
本试题中$$K$$为任一给定数域，$$n > 0$$为一自然数。

<ol class="gsbFinal">
  <li>（10分）求解下面的矩阵方程：<script type="math/tex; mode=display">% <![CDATA[
\begin{bmatrix} 1 & 1 & 1 \\ 1 & 0 & -4 \\ 1 & 1 & 0 \end{bmatrix} X = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix} %]]></script></li>
  <li>（10分）求三元实二次型<script type="math/tex">f(x, y, z) = x^2 + y^2 + z^2 - 2xy - 2xz</script>的规范形。</li>
  <li>（20分）设有实对称矩阵<script type="math/tex; mode=display">% <![CDATA[
A = \begin{bmatrix} 2 & 2 & -2 \\ 2 & -1 & 4 \\ -2 & 4 & -1 \end{bmatrix} %]]></script>
    <ul>
      <li>（10分）求<script type="math/tex">A</script>的全部特征值与特征向量。</li>
      <li>（10分）求一正交矩阵<script type="math/tex">T</script>使得<script type="math/tex">T^{-1}AT</script>为对角矩阵。</li>
    </ul>
  </li>
  <li>（20分）将<script type="math/tex">M_n(K)</script>看成数域<script type="math/tex">K</script>上的线性空间。定义线性变换<script type="math/tex; mode=display">T: M_n(K) \to M_n(K), ~ T(A) = A'</script>这里<script type="math/tex">A'</script>为<script type="math/tex">A</script>的转置。
    <ul>
      <li>（10分）求<script type="math/tex">T</script>的所有特征值与特征向量。</li>
      <li>（10分）找出<script type="math/tex">M_n(K)</script>的一个基，使得<script type="math/tex">T</script>在此基下的矩阵为对角矩阵， 并计算该对角矩阵的行列式。</li>
    </ul>
  </li>
  <li>（10分）设<script type="math/tex">A \in M_n(K)</script>，满足<script type="math/tex">AA' = I</script>，且<script type="math/tex">% <![CDATA[
|A| < 0 %]]></script>。证明：-1是<script type="math/tex">A</script>的一个特征值。</li>
</ol>