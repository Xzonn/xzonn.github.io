---
class: auto-numbering
date: 2021-06-04 21:31
head_image: 1b5acbf64825ad14c5e274c5a5990557.png
head_image_height: 720
head_image_width: 1080
info: Markdown + Jekyll + OSS + CDN + GitHub Actions，自动构建一个静态网站。
last_modified_at: 2021-06-06 19:31
tags: 网站日志
title: 使用GitHub自动构建静态网站
---
之前有同学找我说他们课题组的网站打不开了，让我帮着看一下。我登录上服务器后台摸索了半天，好家伙，被人把数据库全删干净了，只剩下一个管理员账户叫做“admin”，密码叫做“123”。而且，用户名和密码竟然还是明文保存的。

网络安全是老生常谈的话题了，刚刚过去的 [北京大学信息安全综合能力竞赛](/posts/0th-PKU-Geek-Game-Writeups.html) 有些题目就和网络安全有关，不过这次我并不想谈这个。在帮着恢复数据库的时候，我顺带问了下服务器的价格，一年大概只要三百多人民币，比起云服务器实在不算贵，虽然有流量上限，但对于个人网站来说足够了。

我其实也有把这个个人网站转到境内服务器的打算，因为GitHub访问总是不稳定；一年三百人民币也还能接受，只不过这种共享式的服务器没法用Jekyll，在本地构建之后手动上传太麻烦，换成[世界上最好的语言](https://www.php.net/)又得重构。纠结了半天，在网上查了一下资料，发现了一条新途径：用GitHub Actions自动构建，然后推送到云服务商的静态存储平台上。

## 用Markdown写东西
> Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯。它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文档。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。
>
> 由于Markdown的轻量化、易读易写特性，并且对于图片，图表、数学式都有支持，目前许多网站都广泛使用Markdown来撰写帮助文档或是用于论坛上发表消息。如GitHub、Reddit、Diaspora、Stack Exchange、OpenStreetMap、SourceForge、简书等，甚至还能被用来撰写电子书。
>
> [Markdown，维基百科](https://zh.wikipedia.org/w/index.php?title=Markdown&oldid=65771275)
> {: .text-right }

如同维基百科的说明，Markdown是一种“轻量化、易读易写”的标记语言，无需掌握HTML的相关知识也能够很好地运用。甚至，即使不熟悉Markdown的语法也没关系，有很多“所见即所得”的Markdown工具，例如[Typora](https://typora.io/)，只要把Word中写的东西复制粘贴到Typora里面，就可以自动转换成Markdown排版，不过这种自动转换会有格式损失。而且，Markdown本身是个文本文件，无法储存图片，如果需要引入图片的话，需要上传到图床，可以尝试[PicGo](https://picgo.github.io/PicGo-Doc/)。

之前我在《[如何在微信推送中优雅地插入公式](/posts/How-to-Insert-Formulas-in-Wechat-Articles.html)》中介绍过[“Markdown Nice”](https://editor.mdnice.com/)这个网站，可以把Markdown写成的文章复制到微信并且较好地保留原始格式。

## 用Jekyll搭建网站
我从2018年就开始用[Jekyll](https://jekyllrb.com/)了，我大概今后也会一直用下去。对我而言，Jekyll优点有很多，例如支持Markdown、支持[GitHub Pages](https://pages.github.com/)，还可以自定义样式。[GitHub Pages的中文文档](https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll)中有对应的说明，即使不习惯使用命令行也可以通过GitHub的网页设计出一个个人网站。

用Jekyll建设博客时，需要把Markdown文件上传到根目录下的`_posts/`文件夹下，命名格式如“`2021-01-01-Title.md`”，也即“年-月-日-标题.md”。默认情况下，生成的链接格式如“`/2021/01/01/Title`”，也即“/年/月/日/标题”。也可以自定义生成的链接格式，或是进行其他配置，可以查阅Jekyll的文档或GitHub Pages的文档。

## 用阿里云OSS保存网站
此处拿[阿里云](https://www.aliyun.com/)做示例，主要是因为 [之前阿里云送了我半年免费云服务器](/posts/Update-3-0.html)，而且我在阿里云充值了250人民币的余额，所以就继续用阿里云了。腾讯云、华为云等等云服务商应该都有类似的服务，用法大同小异。**需要注意的是，使用OSS保存静态网站需要绑定域名，如果需要中国大陆境内访问还需要域名备案。**另外，OSS和下文的CDN在访问量较高时都是需要付费的。

这里的“OSS”是Object Storage Service（对象存储）的简称，也就是把静态文件上传到阿里云的服务器上，然后可以通过链接来访问。由于是后付费，而且按照访问量付费，如果平时访问量较少的话可能根本达不到计费标准就直接被抹零了。基本配置比较简单：

首先，在[官网](https://oss.console.aliyun.com/)创建一个“Bucket”，这个Bucket大概可以翻译成“桶”，也就是装文件的容器。“地域”是服务器所在的位置，不同地域的Endpoint不一样。配置中最重要的一点，“读写权限”一定要是“公共读写”，否则别人无法通过链接访问。“版本控制”可以不选，因为下面的步骤使用GitHub本身就有版本控制的功能。

{% include figure.html src="50204529b802270485d6359de801f86e.png" alt="创建容器" width="400" height="416" %}

创建容器之后，进行一些简单的配置。在“基础设置”中，需要将“静态页面”的“默认首页”设置为“`index.html`”，默认404页可以设置为“`404.html`”（也可以不设置404页）。在“传输管理”中，可以设置域名，但如果后面设置CDN的话此处可以先不设置。在“权限管理”中可以设置防盗链，如果OSS用作图床的话，此处的Referer可以设置为自己的域名，例如我设置为了“`*.xzonn.top`”“`xzonn.top`”；但如果用作网站的话不要设置，否则别人从其他网站访问会返回403。其他配置我个人暂时用不上，如果有需要的话可以自行探索。

网站的文件可以手动上传，官网[“常用工具”](https://oss.console.aliyun.com/tools)中给出了图形化客户端和命令行管理工具。要使用工具首先需要创建AccessKey，在右上角头像的下拉菜单中可以进入AccessKey的管理页面。为了安全，阿里云提示[建立子用户](https://ram.console.aliyun.com/users)。在命名后，选择访问方式为“编程访问”，确认后就会出现新用户的AccessKey ID和AccessKey Secret，先将两个字符串保存下来。然后给子用户分配名为`AliyunOSSFullAccess`权限，让子用户能够访问并写入OSS。保存即可。如果使用图形化客户端，会提示填入ID和Secret；如果使用命令行，需要手动配置。

至此为止，静态网站应该已经可以访问了。前文已经说过，OSS不是免费的。首先是存储费用（以下费用均为本文写作时的费用），如果选择“按量计费·标准存储·本地冗余”，计费为0.12元/GB/月，如果网站大小不到40&nbsp;MB，每月的消费甚至不超过1分钱。然后是流量费用，直接流出的外网费用为闲时0.25元/GB，忙时0.50元/GB，CDN回源费用为0.15元/GB，如果访问量不大的话也还可以接受。

## 用阿里云CDN加速网站
CDN，全称为Content Delivery Network（内容分发网络）。CDN不是必需的，而且还需要单独配置和计费。但CDN有些非常方便的设置，例如自动申请并续签免费HTTPS证书。

首先前往[官网](https://cdn.console.aliyun.com/)添加一个域名，如`test.xzonn.top`。个人网站的“业务类型”一般选择“图片小文件”即可。“加速区域”可以根据需求来定。“源站信息”选择“OSS域名”，然后直接从下拉菜单中找到前面创建的容器，确定。在添加了域名之后需要审核，审核完毕后按照说明在DNS解析中添加CNAME解析记录即可。

{% include figure.html src="20feaaadb5a9b1ea6c89eb7c247e58ed.png" alt="添加CDN源站信息" width="479" height="441" %}

CDN同样需要一些配置。“回源配置”中可以配置CDN结点访问OSS时的设置，我在“回源协议”中选择了“HTTP”，这样可以省去OSS和CDN之间的HTTPS传输。“缓存设置”可以给静态文件设置较长的时间。“HTTPS配置”可以让网站开启HTTPS，首先需要申请证书，CDN可以自动为域名申请免费证书并自动续签，而OSS虽然也可以开启HTTPS但似乎无法自动申请证书。此外我还设置了HTTP强制跳转HTTPS。“访问控制”中的“Referer防盗链”和OSS的设置类似。“性能优化”中可以开启针对文本文件的压缩功能和针对图片文件的图像处理功能，可以节省一些流量。

与OSS相同，CDN也不是免费的。在“按流量计费”的方式下费用按照阶梯计算，10&nbsp;TB/月以内为0.24元/GB。而HTTPS会额外收费，价格为0.05元/万次。访问量不大的话，也都可以接受。

## 用GitHub Actions自动构建静态网站
前面写了这么多，终于到了最关键的一步。虽然手动构建、手动上传也不是不行，但是既然前面已经做了这么多事，不如一步到位配置好自动化构建。当然，这里的“自动化”只是构建自动化，网站内容还是要自己写的。

[GitHub Actions](https://github.com/features/actions)是GitHub提供的自动化工具，目前已经开放使用，官方也提供了[中文文档](https://docs.github.com/cn/actions)。通过设置GitHub Actions可以在源代码每次推送到GitHub时自动构建，并发布到阿里云OSS上；另外，也可以发布到GitHub的其它分支，例如可以在`master`分支保存源代码，`gh-pages`分支发布网站。其优势在于，可以不受[GitHub Pages的限制](https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)，并且能够在构建时运行其他命令，例如推送给搜索引擎等。

首先，需要在源代码储存库的根目录下创建`Gemfile`文件，内容为：

```ruby
source 'https://rubygems.org/'

gem 'github-pages', group: :jekyll_plugins
```

然后在根目录下创建`.github/workflows/`目录，然后在这个目录下创建一个后缀名为`.yml`的文件，每个文件代表一个Workflow（工作流程）。这里提供一个推送到GitHub储存库的gh-pages分支的示例文件：

{% raw %}
```yaml
name: Publish

on:
  push:
    branches: 
      - master
  pull_request:
    branches: 
      - master

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: ruby/setup-ruby@v1
      with:
        ruby-version: 2.7
        bundler-cache: true
    - name: Prepare for Build
      run: |
        git clone --depth=1 --branch=gh-pages --single-branch --no-checkout \
          "https://${GITHUB_ACTOR}:${{ secrets.GITHUB_TOKEN }}@github.com/${GITHUB_REPOSITORY}.git" \
          _site
    - name: Build Site
      run: |
        bundle exec jekyll build --trace --profile
      env:
        JEKYLL_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    - name: Deploy to GitHub
      run: |
        pushd _site/ &>/dev/null
        : > .nojekyll
        git add -A
        git -c user.name=GitHub -c user.email=noreply@github.com commit \
          -m "From GitHub Actions build ${GITHUB_RUN_NUMBER}"
        git push
        popd &>/dev/null
```
{% endraw %}

`name`是工作流程的名字，`on`是工作流程触发的条件，本例中在`master`分支执行Push（推送）或Pull Request（拉取申请）时触发。最重要的是`jobs`，即运行的工作，此处只有一个`publish`（发布），分为以下几步：

1. `actions/checkout`：拉取储存库。
2. `ruby/setup-ruby`：设置Ruby，因为Jekyll是基于Ruby的。
3. `Prepare for Build`：拉取储存库的`github-pages`分支并保存在`_site`文件夹中。之后Jekyll构建网站会覆盖旧的文件，因此需要先拉取再建站。
4. `Build Site`：用Jekyll构建网站。
5. `Deploy to GitHub`：将网站推送到GitHub。

如果需要发布到阿里云OSS，需要改一下设置。第1、2、4步都与原来相同，后面再添上几步：

{% raw %}
```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: ruby/setup-ruby@v1
      with:
        ruby-version: 2.7
        bundler-cache: true
    - name: Build Site
      run: |
        bundle exec jekyll build --trace --profile
      env:
        JEKYLL_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    - name: Cache Ossutil
      id: cache-ossutil
      uses: actions/cache@v2
      with:
        path: ossutil64
        key: ${{ runner.os }}-ossutil64
      continue-on-error: true
    - name: Get Ossutil
      if: steps.cache-ossutil.outputs.cache-hit != 'true'
      run: |
        wget -q http://gosspublic.alicdn.com/ossutil/1.7.3/ossutil64
    - name: Config Ossutil
      run: |
        chmod +x ossutil64
        ./ossutil64 config -e ${{ secrets.ENDPOINT }} -i ${{ secrets.ACCESS_KEY_ID }} -k ${{ secrets.ACCESS_KEY_SECRET }} -L CH
    - name: Publish Site
      run: |
        ./ossutil64 cp -r -f -u _site/ oss://your-oss-bucket-name/ --jobs 1000 --retry-times 3 --loglevel info
```
{% endraw %}

发布需要使用阿里云提供的Ossutil。说明如下：

1. `Cache Ossutil`：查找Ossutil的[缓存](https://docs.github.com/cn/actions/guides/caching-dependencies-to-speed-up-workflows)。
2. `Get Ossutil`：下载Get Ossutil。这一步只在前一步没有找到缓存时才运行，如果有缓存就直接运行缓存的文件。
3. `Config Ossutil`：设置Ossutil。此处有3个私密文本，即`ENDPOINT`、`ACCESS_KEY_ID`、`ACCESS_KEY_SECRET`。Endpoint可以从OSS官网查看，例如北京的Endpoint为`oss-cn-beijing.aliyuncs.com`。AccessKey ID和AccessKey Secret可以按照前文所述的方法获取。
4. `Publish Site`：发布站点。记得把`oss://your-oss-bucket-name/`换成自己的Bucket名称。

我的一个网站使用的就是这种方式，可以参考[这个网站的publish.yml文件](https://github.com/Ninterviews/Ninterviews/blob/master/.github/workflows/publish.yml)。

## 下一步要做什么
GitHub Actions能实现的自动化功能还有不少，例如把[less](https://lesscss.org/)自动编译成css、自动更新[Aloglia](https://www.algolia.com/)的索引等。因为时间原因，暂时写到这里，如果有兴趣的话可以自己探索。

那么，下一步我要做什么？目前[宝可梦第四世代汉化修正的项目](/PokemonChineseTranslationRevise/)还在进行，如果可以自动化构建的话，将会省下不少事。另外，我的小站也准备更新一下代码，并且评估一下流量和费用，如果可以的话，我也准备把这个小站再次搬到阿里云上。