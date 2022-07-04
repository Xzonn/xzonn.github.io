---
date: 2022-07-04 23:16
head_image: https://images.xzonn.top/github/8fac7d92a62229268f7640c3bce1ca66.png
info: 一行代码实现防止阮一峰博客屏蔽AdBlock。
last_modified_at: 2022-07-04 23:27
tags: 杂记
title: 防止阮一峰博客屏蔽AdBlock
---
阮一峰博客检测广告的核心代码为：

```javascript
  if (
    /*isAdblocker || */
    (img && window.getComputedStyle(img).display === 'none') ||
    (img && window.getComputedStyle(img.parentElement).display === 'none')
  )
```

注意到这段代码是通过`setTimeout(checker, 1000);`执行的，因此只需要把`window.getComputedStyle`这个函数修改掉就可以了。

核心代码：

```javascript
window.getComputedStyle = function() { return { "display": "block" }; }
```

[Greasy Fork](https://greasyfork.org/zh-CN)：<https://greasyfork.org/scripts/447285>。