---
date: 2024-01-01 16:50
head_image: 92545f08f0838ddaee40f3d13dd5799f.webp
head_image_height: 1280
head_image_shown: false
head_image_width: 1920
info: 自力更生。
last_modified_at: 2024-01-01 17:38
tags: 技术指南 网站日志
title: 将来必力（LiveRe）的评论迁移到giscus并优化排序
---
## 前言
新的一年，我的小站也焕然一新。除了每年例行的更换配色外，今年终于将Bootstrap 3升级到了Bootstrap 5，利用Jekyll自带的sass相关插件生成css。其实我早就想升级了，几个新的小项目都直接用了Bootstrap 5，但是博客因为历史遗留太多，一直没有动力去改。这次终于下定决心，一口气把主站也升级了。另外，还利用Algolia增加了[搜索](/search.html)功能，这个功能也是我很早就想添加的，只不过之前GitHub Pages不能直接通过GitHub Action上传，而GitHub Pages默认配置不支持其他插件，所以一直没有添加。现在能通过GitHub Actions生成后，就不局限于GitHub Pages默认的插件了，可以用Ruby编写插件，扩展性大大增加，我甚至给我的[游戏记录](/games/)添加了修改页面主题色的功能。

除了上面这些之外，还有一件事我一直没解决，也就是博客的评论系统。众所周知，我的博客是基于Jekyll生成的静态网站，所以没法像基于WordPress的博客一样自带评论系统，需要借助第三方评论系统。我之前一直用的是[来必力（LiveRe）](https://livere.com/)，这个评论系统之前很好用，支持很多第三方登录，而且还有自带的管理后台，可以直接在后台管理评论。但是不知道从什么时候起，来必力的邮件通知就失效了，即使有人发了新评论也不会给我发邮件，导致我经常没法及时回复。为了解决时效性的问题，我决定把评论系统迁移到基于GitHub的应用，因为网站本身就是GitHub生成的，在GitHub上讨论也很正常。基于GitHub的评论系统也有很多，比如[utterances](https://utteranc.es/)、[Gitalk](https://gitalk.github.io/)等，但是比较来比较去我还是选择了[giscus](https://giscus.app/)，主要原因在于它利用的是GitHub Disscussions而不是Issues，不会在Repo的“Issues”那里显示出数字（强迫症友好），并且支持简体中文界面。下面就来介绍一下如何将来必力的评论迁移到giscus。

## 导出
来必力不支持评论导出，这稍微有些麻烦。不过打开浏览器开发者工具后访问管理后台，可以直接找到相关接口的请求，所以拿Python模拟一下即可：

``` python
import datetime
import json
import math
import requests

# Replace this line with your cookies
COOKIES = """JSESSIONID=..."""

session = requests.Session()
for cookie in COOKIES.split(";"):
  key, value = cookie.split("=", 1)
  session.cookies.set(key, value)

results = []

page = 1
count = 10

while math.ceil(count / 10) >= page:
  response = session.post("https://livere.com/insight/managereply/period", {
    "startDate": "2017-01-01",
    "endDate": datetime.date.today(),
    "sort": "regdate",
    "order": "desc",
    "pageNum": page,
  })
  response_json = response.json()
  results += response_json["resultData"]
  count = response_json["count"]
  page += 1

with open("result.json", "w", -1, "utf8", newline="\n") as writer:
  json.dump(results, writer, ensure_ascii=False, indent=2)
```

这个脚本会将所有评论导出到`result.json`文件中。还没完，GitHub Disscussions基于Markdown，所以手动把原始评论转成Markdown文件并保存：

``` python
from datetime import datetime, timedelta, timezone
import json
import os
import re
import urllib.parse

with open("result.json", "r", -1, "utf8") as reader:
  results: list[dict] = json.load(reader)[::-1]

url_data: dict[str, dict[str, list[str]]] = {}

for result in results:
  url = result["site"]
  content: str = result["content"]
  reply_seq = result["reply_seq"]
  parent_seq = result["parent_seq"]
  author: str = result["name"].strip()
  date: datetime = datetime.strptime(result["regdate"].strip(), "%Y-%m-%d-%I:%M:%S %p").replace(tzinfo=timezone(timedelta(hours=9))).astimezone(timezone(timedelta(hours=8)))
  images = []
  i = 1
  while f"image{i}" in result:
    images.append(result[f"image{i}"])
    i += 1
  
  content = re.sub(r"\n\n\n+", "\n\n", content).replace("\n", "  \n").replace("  \n  \n", "\n\n")
  
  path = urllib.parse.unquote(url.split("/", 3)[-1].split("?")[0].split("#")[0], encoding="utf8")

  if path.endswith("/"):
    path += "index.html"
  assert path.endswith(".html")
  path = path.removesuffix(".html")
  if path not in url_data:
    url_data[path] = {}
  if parent_seq not in url_data[path]:
    url_data[path][parent_seq] = []
  
  output_str = [f"*****{author} {"评论于" if reply_seq == parent_seq else "回复于"} {datetime.strftime(date, "%Y-%m-%d %H:%M:%S")} (UTC+8)*****\n\n{content}"]
  for image in images:
    output_str.append(f"\n\n![{image}]({image})")
  url_data[path][parent_seq].append("".join(output_str))

for path, comments in url_data.items():
  os.makedirs(os.path.join("output", path), exist_ok=True)
  for id, content in sorted(comments.items(), key=lambda x: int(x[0])):
    with open(os.path.join("output", path, f"{id}.md"), "w", -1, "utf8") as writer:
      writer.write(f"> 评论导出自来必力\n\n")
      writer.write("\n\n".join(content))
```

这个脚本会将所有评论按照原始URL和评论ID保存到`output`文件夹中。这样就完成了来必力评论的导出。

## 导入
导入其实也可以做到全自动化，但是因为我懒得写这部分脚本了，就直接手动复制粘贴。

当然，导入之前先要把giscus集成到网站上。在giscus的[官方网站](https://giscus.app/)中有详细的配置流程，不再赘述。

## 优化排序
giscus默认的排序是按照评论创建时间正序排序的，这样就会导致新的评论会被放在最后，而不是放在最前。这对于我的博客来说并不方便，因为很多旧评论是已经解决的问题或者已经不成立的情况，放在最前面没有什么意义。虽然giscus提供了倒序排序的功能，但是经过我的尝试，在评论分页的情况下仍然是先加载旧评论。理论上来说这个问题最好的解决方法应该是写成分页的形式，但是这样的话改动起来很麻烦，相当于要重写一部分UI。在我研究了源代码之后，决定用个偷懒但是日后维护起来可能很麻烦的办法：把api中加载“较新”和“较旧”的方法调换一下。这样就可以实现默认加载最新评论，而不是最旧评论了。具体实现方法可以参考[此次提交](https://github.com/Xzonn/giscus/commit/127f3157148286c585a036ab2204c53b65186d93)。

修改了源代码之后还得想办法部署，[官方文档](https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md)里也给出了部署的步骤，我也同样用了[Vercel](https://vercel.com/)，看起来还不错，而且可以自定义域名。