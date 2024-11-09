---
date: 2024-11-09 20:52
head_image: fac6b8c5d6bd92dfa3416eae3644af85.webp
head_image_height: 720
head_image_width: 1280
info: 您对 CAPTCHA 的响应似乎无效。请在下方重新验证您不是机器人。
last_modified_at: 2024-11-09 21:24
no_sidenav: true
tags: 技术指南
title: 解决Content-Security-Policy安全策略导致Steam无法注册的问题
---
师兄想玩《双人成行》，问我有什么好办法。我说这还不好办嘛，[注册个Steam账号](https://store.steampowered.com/join/)就好了。然而，Steam不知道抽了什么风，不管验证码有没有完成，得到的都只有一句话：

> 您对 CAPTCHA 的响应似乎无效。请在下方重新验证您不是机器人。

在确认了师兄不是机器人之后，我尝试更改浏览器、更改网络、更改设备、更改邮箱，都没有解决问题。心好累，看看为什么报错吧。按<kbd>F12</kbd>打开控制台，看到了错误输出：

{% include figure.html src="0faa80589e7bc65ea0c6ce1e76b9bd91.webp" alt="控制台输出" width="960" height="513" %}

按起来似乎是和浏览器的安全策略有冲突，在控制台的“网络”标签页可以看到当前页面相应的标头（Headers）：

```
Content-Security-Policy:
default-src blob: data: https: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://store.cloudflare.steamstatic.com/ https://store.cloudflare.steamstatic.com/ https://recaptcha.net https://www.google.com/recaptcha/ https://www.gstatic.cn/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.youtube.com/ https://s.ytimg.com https://recaptcha.net https://google.com/recaptcha/ https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.gstatic.cn/recaptcha/ https://js.hcaptcha.com; object-src 'none'; connect-src 'self' http://store.steampowered.com https://store.steampowered.com http://127.0.0.1:27060 ws://127.0.0.1:27060 https://community.cloudflare.steamstatic.com/ https://steamcommunity.com/ https://steamcommunity.com/ wss://community.steam-api.com/websocket/ https://api.steampowered.com/ https://login.steampowered.com/ https://help.steampowered.com/ https://steam.tv/ https://shared.cloudflare.steamstatic.com/ https://checkout.steampowered.com/; frame-src 'self' steam: http://www.youtube.com https://www.youtube.com https://www.google.com https://sketchfab.com https://player.vimeo.com https://steamcommunity.com/ https://login.steampowered.com/ https://help.steampowered.com/ https://checkout.steampowered.com/ https://www.google.com/recaptcha/ https://recaptcha.net/recaptcha/ https://recaptcha.net https://google.com/recaptcha/ https://www.google.com/recaptcha/ https://*.hcaptcha.com; frame-ancestors 'none';
```

这里的[`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)是一个安全策略，限制了页面的资源加载。其中`connect-src`限制了可以连接的服务器，由于这个页面要访问hCaptcha的服务器`newassets.hcaptcha.com`，但这个域名并未包含在`connect-src`中，所以浏览器拒绝了这个请求。虽然`*.hcaptcha.com`在标头里，但它是在`frame-src`中的，它限制的是当前页面可以被嵌入的域名，在此处并不生效。不知道是不是某次更新导致的配置错误。

解决方法也很简单，Chrome浏览器的控制台现在已经支持修改标头了，直接在控制台的“网络”标签页选择当前页面，点击`Content-Security-Policy`右边的铅笔图标，然后删除所有内容即可。当然，更安全的办法应该是把`*.hcaptcha.com`添加到`connect-src`中，但是我不确定当前网页是不是还会访问其他域名，所以干脆全删掉就完事了。修改完成后按<kbd>Ctrl + R</kbd>重新载入页面，如果控制台不再报错说明hCaptcha加载成功，可以正常注册Steam账号了。

当然，这个方法不能保证一定不会出现“您对 CAPTCHA 的响应似乎无效。请在下方重新验证您不是机器人。”的提示了，同一个地址多次注册账号等问题也可能会导致被Steam判定为机器人注册，没有万能的解决方法。而且这个错误估计不久就会被修复吧。
