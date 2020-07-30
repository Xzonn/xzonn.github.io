---
date: 2020-07-27 15:31
head_image: https://file.moetu.org/images/2020/07/30/3b6a83b652374b177287f0c0ae3908fed2e02e46a48c1bdf.png
info: 即使是Windows操作系统也可以学习Ubuntu。
last_modified_at: 2020-07-30 16:11
tags: 三次元 技术指南
title: 在安装了Windows 10的电脑上运行Ubuntu
---
# 0 前言
好久不见。

最近忙着在[萌娘百科](https://zh.moegirl.org.cn/User:Xzonn)、[神奇宝贝百科](https://wiki.52poke.com/wiki/User:Xzonn)写东西，顺便接着哔哩哔哩的BWIKI搭建了一个[美妙世界Wiki](https://wiki.biligame.com/twewy/%E9%A6%96%E9%A1%B5)，欢迎大家来玩。因为MediaWiki写得太多，我甚至有些忘了Markdown语法，有啥问题都想来个模板。

当然，学习方面的资料我也有更新，这学期的两门通选课[普通生物学（C）](/posts/2020-03-27-General-Biology-C-Exams-Review.html)和[中国历史地理](/posts/2020-05-26-The-Historical-Geography-of-China-Review.html)的资料整理我也有在做，供各位参考。如果各位还有其他的学习资料，也欢迎提供给我。

这次来分享一下如何在Windows 10上运行Ubuntu。Ubuntu是类Unix系统的一种，其有较高的使用率，根据一份市场占有率报告，在2020年5月Ubuntu和其它Linux发行版的占有率分别为1.89%和0.97%（当然，占比前两名是Windows 10和Windows 7，分别为56.08%和25.59%）<sup><sup class="ref-endnote"><a href="#ref-li-jie-ling"></a></sup></sup>。而在Ubuntu下安装运行一些软件相对比Windows容易一些，只需要一个`apt-get install`命令就能基本搞定。

以下将以本站点的开发和部署作为案例稍微介绍一下我的使用经历，或许对大家有所帮助。

## 1 启用并安装WSL
WSL，全称Windows Subsystem for Linux，翻译过来就是“适用于Linux的Windows子系统”。这是Windows官方对Linux的支持。最新版Windows 10（版本2004，内部版本19041）支持WSL 1和WSL 2，它们的区别请参考[官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/compare-versions)。对于我来说，我需要WSL和Windows共享文件系统，因此WSL 1就够用了。

启用WSL的方法也可以参考[官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)。这里介绍一下简单方法：

![启用或关闭 Windows 功能](https://file.moetu.org/images/2020/07/30/0714aeafcefc10e9f8e5f4b4d56e700d2aafb859d340a453.png)

![在商店查找并安装Ubuntu](https://file.moetu.org/images/2020/07/30/e442ec4dd3f0a3559b96d0e869640b8097e1dab823cd66f0.png)

1. 在“控制面板\所有控制面板项\程序和功能”中，找到左侧的“启用或关闭 Windows 功能”，找到“适用于 Linux 的 Windows 子系统”，选中并确定。如果要求重启，则重启计算机。
2. 打开[Microsoft Store](https://aka.ms/wslstore)，选择合适的Linux发行版并安装。
3. 首次启动新安装的Linux发行版时，将执行安装程序，此后便无需再次解压缩。然后需要[创建用户帐户和密码](https://docs.microsoft.com/zh-cn/windows/wsl/user-support)，建议账户名全小写。注意Linux系统输入密码时不会显示任何内容，这并不是Bug。

随后进入终端界面，WSL安装完毕。常见问题的解答可以参考[官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/faq)。

## 2 WSL的运行与简单配置
运行WSL的方法有很多种，最简单的方法就是给安装好的发行版创建个快捷方式。

此外，也可以通过命令行，输入`Ubuntu`（或类似命令）直接进入对应的发行版本，或是通过输入`wsl`进入默认发行版本。详细内容可以参考[官方文档](https://docs.microsoft.com/zh-cn/windows/wsl/wsl-config)。

由于Ubuntu的许多命令需要root用户操作，因此我将默认用户设定为了root。设定方法为在命令行中运行`ubuntu config --default-user root`，再次运行Ubuntu即可。

首先建议修改一下apt的源。由于一些原因，在大陆访问国外源的速度比较感人。配置文件位于Ubuntu的`/etc/apt/sources.list`文件。可以使用Ubuntu自带的文本编辑器（如[Vim](https://www.vim.org/)）编辑，但是这个编辑器对于没用过终端的人估计不太友好。也可以尝试用Windows自带的编辑器修改，但需要注意：**尽管Ubuntu的所有文件都存放在Windows的文件系统下，但直接使用Windows的相关程序修改Ubuntu的文件系统可能会出错误。**可以在Ubuntu中运行`explorer.exe .`（不要漏掉结尾的`.`），然后可以在资源管理器中管理文件。

修改`/etc/apt/sources.list`为以下内容（此处以Ubuntu 20为例，其他版本请参考[阿里云镜像的相关文档](https://developer.aliyun.com/mirror/ubuntu)）。

```
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

完事之后，运行``apt update && apt upgrade``。更换阿里源后速度应该比较快。

现在可以尝试在Ubuntu里面运行命令了。

如果需要从WSL访问Windows的文件，则需要从`/mnt/`路径下访问，例如`/mnt/c/`就是Windows的`C:\`。

## 3 搭建LNMP服务器环境
LNMP指的是Linux系统下的Nginx、MySQL、PHP三件套，是比较常见的服务器配置。由于我安装WSL的主要目的就是在本地调试我的个人网站，因此需要搭建一个服务器。最简单的操作就是运行`apt install nginx`，安装完毕后可以使用`service nginx start`启动服务。尝试转到<http://localhost>，如果能看到默认的欢迎界面，说明安装成功。

nginx的配置文件默认位于`/etc/nginx/nginx.conf`，与网站相关的默认配置为`/etc/nginx/sites-available/default`。网站默认的根目录位于`/var/www/html/`，可以直接在这个文件夹下修改，也可以通过修改配置文件改为其他文件夹。

nginx默认启用的是静态文件，如果要运行php，则需要安装`apt install php`，在Ubuntu 20版本中会安装php7.4。在上文的配置文件中有一部分以`#`开头的注释与php相关，将其修改为：（注意，其中的`php7.4-fpm.sock`可能需要根据安装的php版本改变。）
```
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
}
```
此外，在上方的`index`一项中加入`index.php`，如下所示：
```
index index.php index.html index.htm index.nginx-debian.html;
```

安装完毕后可以使用`service php7.4-fpm start`启动服务。随后便可以使用php了。

需要注意的是，在WSL中使用php有时会出现加载不完全的情况，需要修改缓冲区。在php-fpm的配置文件`/etc/php/7.4/fpm/php.ini`中找到`output_buffering`，将其值改为`Off`，重启服务即可。

MySQL是常见的数据库软件，常规来说只需要运行`apt-get install mysql-server mysql-client`即可安装，然而我在WSL下安装出现了问题，多次尝试均未解决，不知原因为何。如果各位有解决方法的话，欢迎告诉我。我退而求其次，在Windows上安装了MySQL。因为WSL和Windows的端口是互通的，因此可以通过3306端口通讯。

## 4 后记
以上便是我安装WSL的一点点小经验，供各位参考。今后或许会继续更新，如果文中有错误之处还请不吝赐教。

## 5 参考文献
1. {: #ref-li-jie-ling }黎杰领. 2020年5月OS市场占有率报告：Ubuntu和Linux分别占有1.89%和0.97% [EB/OL]. (2020-05-03) [2020-07-27]. <https://ywnz.com/linuxxw/7041.html>.
2. {: #ref-rich }Rich. Do not change Linux files using Windows apps and tools [EB/OL]. (2016-11-17) [2020-07.27]. <https://devblogs.microsoft.com/commandline/do-not-change-linux-files-using-windows-apps-and-tools/>.