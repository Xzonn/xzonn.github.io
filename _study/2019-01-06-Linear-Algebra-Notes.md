---
date: 2019-01-06 22:37
info: 《线性代数》一小时速成指南。
infobox: complete formula
last_modified_at: 2020-01-03 23:02
math: true
tags: 数学 知识点整理
title: 《线性代数》一小时速成
---
## 1 线性方程组的解
* $n$个方程$n$元线性方程组：
  * 有唯一解$\iff \|A\| \neq 0$。这个解是$\left(\cfrac{\|B\_1\|}{\|A\|}, \cfrac{\|B\_2\|}{\|A\|}, \cdots \cfrac{\|B\_n\|}{\|A\|}\right)$，其中$\|A\|$是方程组的系数行列式，$\|B_j\| = $ $$ \begin{vmatrix} a_{11} & \cdots & a_{1, j - 1} & b_1 & a_{1, j + 1} & \cdots & a_{1n} \\\\ a_{21} & \cdots & a_{2, j - 1} & b_2 & a_{2, j + 1} & \cdots & a_{2n} \\\\ \vdots & & \vdots & \vdots & \vdots & & \vdots \\\\  a_{n1} & \cdots & a_{n, j - 1} & b_n & a_{n, j + 1} & \cdots & a_{nn}\end{vmatrix}$$，$j = 1, 2, \cdots , n$。
  * 有无穷解或无解$\iff \|A\| = 0$。
* $r$个方程$n$元线性方程组：
  * 有解$\iff \mathrm{rank}(A) = \mathrm{rank}(\widetilde A)$。
  * 有解时：有唯一解$\iff \mathrm{rank}(A) = n$；有无穷解$\iff \mathrm{rank}(A) < n$。
* $n$个方程$n$元齐次线性方程组：
  * $\mathrm{rank}(A) < n$时有基础解系，且基础解系所含解向量的个数为$n - \mathrm{rank}(A)$。把系数矩阵$A$经过初等行变换化成简化行阶梯形矩阵$$J = \begin{bmatrix} 1 & 0 & 0 & \cdots & 0 & 0 & b_{1, r+1} & \cdots & b_{1n} \\\\ 0 & 1 & 0 & \cdots & 0 & 0 & b_{2, r+1} & \cdots & b_{2n} \\\\ \vdots & \vdots & \vdots &  & \vdots & \vdots & \vdots &  & \vdots \\\\ 0 & 0 & 0 & \cdots & 0 & 1 & b_{r, r+1} & \cdots & b_{rn} \\\\ 0 & 0 & 0 & \cdots & 0 & 0 & 0 & \cdots & 0 \\\\ \vdots & \vdots & \vdots &  & \vdots & \vdots & \vdots &  & \vdots \\\\ 0 & 0 & 0 & \cdots & 0 & 0 & 0 & \cdots & 0 \\\\  \end{bmatrix}$$，令自由未知量$x\_{r+1}, \cdots , x\_n$分别取下述$n - r$组数：$$\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 0 \end{bmatrix} , \begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 0 \end{bmatrix} , \cdots , \begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 1 \end{bmatrix}$$，得到方程组的$n - r$个解为$$\eta_1 = \begin{bmatrix} -b_{1, r+1} \\\\ -b_{2, r+1} \\\\ \vdots \\\\ -b_{r, r+1} \\\\ 1 \\\\ 0 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 0 \end{bmatrix}, \eta_2 = \begin{bmatrix} -b_{1, r+2} \\\\ -b_{2, r+2} \\\\ \vdots \\\\ -b_{r, r+2} \\\\ 0 \\\\ 1 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 0 \end{bmatrix}, \cdots, \eta_{n - r} = \begin{bmatrix} -b_{1, n} \\\\ -b_{2, n} \\\\ \vdots \\\\ -b_{r, n} \\\\ 0 \\\\ 0 \\\\ 0 \\\\ \vdots \\\\ 0 \\\\ 1 \end{bmatrix}$$，则$\eta\_1, \eta\_2, \cdots, \eta\_{n - r}$是方程组的一个基础解系，则齐次线性方程组的通解是$k\_1\eta\_1 + k\_2\eta\_2 + \cdots + k\_{n - r}\eta\_{n - r}$。
* $n$个方程$n$元非齐次线性方程组：
  * 求出导出组的通解，再求出非齐次线性方程组的一个特解$\gamma\_0$，则非齐次线性方程组的通解是$\gamma\_0 + k\_1\eta\_1 + k\_2\eta\_2 + \cdots + k\_{n - r}\eta\_{n - r}$。

## 2 矩阵的乘法
* 设$A = (a\_{ij})\_{s \times n}$，$B = (b\_{ij})\_{n \times m}$，令$C = (c\_{ij})\_{s \times m}$，其中$c\_{ij} = \sum\limits\_{k = 1}^{n} a\_{ik}b\_{kj}$，即第$(i, j)$元等于左矩阵第$i$行与右矩阵第$j$列对应元素乘积之和。则矩阵$C$称为矩阵$A$与$B$的乘积，记作$C = AB$。
* 主对角线上元素都是$1$，其余元素都是$0$的$n$级矩阵称为$n$级单位矩阵，记作$I$。$AI = IA = A$。
* 初等矩阵：初等矩阵左乘为行变换，右乘为列变换。
  * $P(j, i(k))A$等于$A$的第$i$行乘$k$后加到第$j$行上。
  * $P(i, j)A$等于$A$的第$i$行与第$j$行交换。
  * $P(i(c))A$等于$A$的第$i$行乘$c$。

## 3 逆矩阵
* 伴随矩阵法：
  * $$A^* = \begin{bmatrix} A_{11} & A_{21} & \cdots & A_{n1} \\\\ A_{12} & A_{22} & \cdots & A_{n2} \\\\ \vdots & \vdots &  & \vdots \\\\ A_{1n} & A_{2n} & \cdots & A_{nn} \end{bmatrix}$$，称为$A$的伴随矩阵。
  * $A^\*A = \|A\|I$，则$A^{-1} = \cfrac {1}{\|A\|} A^*\$。
* 初等变换法：
  * 把$A$和$I$并排放在一起，组成一个$n \times 2n$级矩阵$(A, I)$，对$(A, I)$作一系列初等行变换，把它的左半部分化成$I$，这时的右半部分就是$A^{-1}$，即$(A, I) \ce{->[初等行变换]} (I, A^{-1})$。

## 4 正交矩阵
* 实数域上的方阵$A$如果满足$AA' = I$，则称$A$是正交矩阵，此时$A' = A^{-1}$。
* 施密特正交化：对欧几里得空间$\mathbb R^n$上的线性无关的向量组$\alpha\_1, \alpha\_2, \cdots ,\alpha\_s$，令\$\$\begin{align}&\beta\_1 = \alpha\_1, \\\\ &\beta\_2 = \alpha\_2 - \cfrac {(\alpha\_2, \beta\_1)}{(\beta\_1, \beta\_1)}, \\\\ &\cdots \\\\ &\beta\_s = \alpha\_s - \sum\_{j = 1}^{s - 1} \cfrac {(\alpha\_s, \beta\_j)}{(\beta\_j, \beta\_j)}\beta\_j. \end{align}\$\$则$\beta\_1, \beta\_2, \cdots ,\beta\_s$是正交向量组，且与$\alpha\_1, \alpha\_2, \cdots ,\alpha\_s$等价。

## 5 矩阵的对角化
* 实对称矩阵：求矩阵$A$的特征多项式$\|\lambda I - A\| = 0$的所有根$\lambda\_1, \lambda\_2, \cdots ,\lambda\_m$，即是$A$的所有特征值。分别代入$(\lambda\_j I - A)X = 0$求出基础解系构成的集合$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$，经正交化、单位化后得到$\eta\_1, \eta\_2, \cdots ,\eta\_n$。令$T = (\eta\_1, \eta\_2, \cdots ,\eta\_n)$，则$T$是正交矩阵。
* 对于数域$K$上$n$元二次型$X'AX$，令$$\begin{bmatrix} A \\\\ I \end{bmatrix}$$ $\ce{->\[对\mathit{A}作成对初等行、列变换\]\[对\mathit{I}只作其中的初等列变换\]}$ $$\begin{bmatrix} D \\\\ C \end{bmatrix}$$，其中$D$是对角矩阵$\mathrm{diag}\\{d\_1, d\_2, \cdots ,d\_n\\}$，则$C'AC = D$。令$X = CY$，则得到$X'AX$的一个标准形$d\_1y\_1^2 + d\_2y\_2^2 + \cdots + d\_ny\_n^2$。

## 6 正定二次型
* 如果对于$\mathbb R^n$中任一非零列向量$\alpha$，都有$\alpha' A \alpha > 0$，则称$n$元实二次型$X'AX$是正定的。
* 实二次型$X'AX$正定$\iff A$的合同标准形中，主对角元全大于$0 \iff$$A$的所有顺序主子式全大于$0$。

## 7 坐标
* 把$\alpha$由基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$线性表出的系数组成的$n$元有序数组$(a\_1, a\_2, \cdots ,a\_n)$称为$\alpha$在基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$下的坐标。通常写成列向量的形式，$X = (x\_1, x\_2, \cdots ,x\_n)'$，则$\alpha = (\alpha\_1, \alpha\_2, \cdots ,\alpha\_n) X$。
* 若$(\beta\_1, \beta\_2, \cdots ,\beta\_n) = (\alpha\_1, \alpha\_2, \cdots ,\alpha\_n)A$，称$A$是基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$到基$\beta\_1, \beta\_2, \cdots ,\beta\_n$的过渡矩阵。
* 若$\alpha$在基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$和基$\beta\_1, \beta\_2, \cdots ,\beta\_n$下的坐标是$X$，$Y$，则$X = AY$。
* 对线性映射$\mathbb A: V \rightarrow V'$，取$V$的一组基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$，$V'$的一组基$\eta\_1, \eta\_2, \cdots ,\eta\_s$，则存在$s \times n$矩阵$A$满足$\mathbb A(\alpha\_1, \alpha\_2, \cdots ,\alpha\_n) = (\eta\_1, \eta\_2, \cdots ,\eta\_s)A$。
* $\mathbb A\alpha$在基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$下的坐标是$AX$。
* $\xi$是$\mathbb A$的属于$\lambda\_0$的一个特征向量$\iff \xi$的坐标$X$是$A$的属于特征值$\lambda\_0$的一个特征向量。
* 设$\mathbb A$在基$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$和基$\eta\_1, \eta\_2, \cdots ,\eta\_n$下的矩阵分别为$A$，$B$，从$\alpha\_1, \alpha\_2, \cdots ,\alpha\_n$到$\eta\_1, \eta\_2, \cdots ,\eta\_n$的过渡矩阵是$S$，则$B = S^{-1}AS$。