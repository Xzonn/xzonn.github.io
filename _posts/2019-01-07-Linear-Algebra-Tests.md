---
title: 《线性代数》试题
layout: post
info: 一小时速成？不可能的，想啥呢。
infoBox: complete
tags: 学习资料 数学 往年题整理 三次元
---

这是《线性代数 (B)》（主讲：王保祥）的试题。

## 2018 - 2019 秋季学期
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