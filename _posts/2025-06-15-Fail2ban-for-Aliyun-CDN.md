---
date: 2025-06-15 16:35
head_image: 07aac3d3337c80177e8bd3c745a99d83.webp
info: 根据访问日志实时封禁IP。
last_modified_at: 2025-07-01 00:28
tags: 技术指南 网站日志
title: 用于阿里云CDN的fail2ban配置文件
---
（封面图由ChatGPT生成）

最近我发现[《朱／紫》数据库](https://sv.xzonn.top/)被爬虫给爬了，我连忙封禁了访问者的IP。然而每次在被爬虫爬完之后我才发现，似乎有些为时过晚。如何做到根据访问情况实时封禁IP呢？通过查阅资料得知，可以使用[fail2ban](https://github.com/fail2ban/fail2ban)实时分析日志并通过iptables封禁IP。

然而，我的服务器使用了阿里云CN，访问者的真实IP地址并不会直接访问服务器，因此在服务器上使用iptables进行IP封禁没有意义。因此，需要结合阿里云CDN的API来进行IP封禁。

## 使用方法

1. 安装[fail2ban](https://github.com/fail2ban/fail2ban)、[阿里云 CLI](https://help.aliyun.com/zh/cli/install-cli-on-linux)和[Python](https://www.python.org/downloads/)。以Ubuntu为例，可以使用以下命令安装：

``` bash
sudo apt update
sudo apt install fail2ban python3 python3-pip
/bin/bash -c "$(curl -fsSL https://aliyuncli.alicdn.com/install.sh)"
```

2. 设置nginx日志，记录访问者的真实IP地址。根据阿里云CDN的文档，源站收到的标头中有一项`Ali-Cdn-Real-Ip`是标识真实IP的。可以在nginx的配置文件中添加以下内容：
{: start="2" }

``` nginx
log_format main '$http_ali_cdn_real_ip - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$remote_addr"';
access_log /var/log/nginx/access.log main;
```

3. 在[阿里云控制台](https://ram.console.aliyun.com/)申请Access Key ID和Access Key Secret。
4. 将`aliyun.py`和`aliyun.conf`文件放到`/etc/fail2ban/action.d/`目录下，并且给`aliyun.py`设置可执行权限（`chmod +x /etc/fail2ban/action.d/aliyun.py`）。
{: start="3" }

``` python
#!/bin/env python3
# aliyun.py

import argparse
import json
import subprocess


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument(
    "-a",
    "--action",
    choices=["add", "remove"],
    required=True,
    help="Action to perform: add or remove an IP from the blacklist.",
  )
  parser.add_argument("--access-key-id", default="", help="Aliyun Access Key ID.")
  parser.add_argument("--access-key-secret", default="", help="Aliyun Access Key Secret.")
  parser.add_argument("--region", default="cn-hangzhou", help="Aliyun region ID, default is cn-hangzhou.")
  parser.add_argument("-d", "--domain", required=True, help="The CDN domain to modify.")
  parser.add_argument("-i", "--ip", required=True, help="The IP address to add or remove from the blacklist.")

  args = parser.parse_args()

  p = subprocess.Popen(
    [
      "aliyun",
      "cdn",
      "DescribeCdnDomainConfigs",
      "--access-key-id",
      args.access_key_id,
      "--access-key-secret",
      args.access_key_secret,
      "--region",
      args.region,
      "--DomainName",
      args.domain,
      "--FunctionNames",
      "ip_black_list_set",
    ],
    stdout=subprocess.PIPE,
  )
  p.wait()
  fuction_args: list[dict] = json.loads(p.stdout.read().decode("utf-8"))["DomainConfigs"]["DomainConfig"][0][
    "FunctionArgs"
  ]["FunctionArg"]
  ip_list = []
  for arg in fuction_args:
    if arg["ArgName"] == "ip_list":
      ip_list = [i for i in arg["ArgValue"].split(",") if i]
      break

  if args.action == "add":
    if args.ip in ip_list:
      print(f"{args.ip} is already in the blacklist for {args.domain}.")
      exit(0)

    ip_list.append(args.ip)
  elif args.action == "remove":
    if args.ip not in ip_list:
      print(f"{args.ip} is not in the blacklist for {args.domain}.")
      exit(0)

    ip_list.remove(args.ip)

  functions = [
    {
      "functionArgs": [{"argName": "ip_list", "argValue": ",".join(ip_list)}],
      "functionName": "ip_black_list_set",
    }
  ]

  p = subprocess.Popen(
    [
      "aliyun",
      "cdn",
      "BatchSetCdnDomainConfig",
      "--access-key-id",
      args.access_key_id,
      "--access-key-secret",
      args.access_key_secret,
      "--region",
      args.region,
      "--DomainNames",
      args.domain,
      "--Functions",
      json.dumps(functions),
    ],
    stdout=subprocess.PIPE,
  )
  p.wait()
  print(json.loads(p.stdout.read().decode("utf-8")))


if __name__ == "__main__":
  main()

```

``` ini
# aliyun.conf

[Definition]
actionstart =
actionstop =
actiocheck =
actionban = /etc/fail2ban/action.d/aliyun.py -a add --access-key-id <aliyun_access_key_id> --access-key-secret <aliyun_access_key_secret> --region <aliyun_region> -d <aliyun_domain> -i <ip>
actionunban = /etc/fail2ban/action.d/aliyun.py -a remove --access-key-id <aliyun_access_key_id> --access-key-secret <aliyun_access_key_secret> --region <aliyun_region> -d <aliyun_domain> -i <ip>

[Init]
aliyun_access_key_id =
aliyun_access_key_secret =
aliyun_region = cn-hangzhou
aliyun_domain =
```

5. 在`/etc/fail2ban/jail.d`下新建配置，或者将配置添加到现有的`jail.local`文件中，例如：
{: start="5" }

``` ini
[example]
enabled = true
port = http,https
filter = <your filter> # 例如使用 nginx 的日志过滤器
logpath = <your log path> # 例如 /var/log/nginx/access.log
maxretry = 200 # 设置最大重试次数
findtime = 5m # 设置查找时间
action = aliyun[aliyun_access_key_id=<your access key id>, aliyun_access_key_secret=<your access key secret>, aliyun_region=<your region>, aliyun_domain=<your domain>]
```

6. 重启fail2ban服务：
{: start="6" }

```bash
sudo systemctl restart fail2ban
```

## 设定过滤器

如果是为了防爬虫，可以限定某段时间（例如5分钟）内访问的最大次数（例如200次），超过这个次数就会被封禁。可以在`/etc/fail2ban/filter.d`目录下新建一个过滤器文件，例如`nginx-log.conf`，内容如下：

``` ini
[Definition]
failregex = ^<HOST> - .*$
ignoreregex =
```

然后在配置文件中引用这个过滤器：

``` ini
[nginx-log]
enabled = true
port = http,https
filter = nginx-log
logpath = /var/log/nginx/access.log
maxretry = 200
findtime = 5m
action = aliyun[aliyun_access_key_id=<your access key id>, aliyun_access_key_secret=<your access key secret>, aliyun_region=<your region>, aliyun_domain=<your domain>]
```

如有其他需求，可以修改`faileregex`来匹配不同的日志格式。

## 后记
（2025-06-30）最近又有一堆越南IP爬我网站，是我在翻阿里云访问日志的时候发现的，IP数量极多，超过9万个，怀疑是他们爬网页训练AI模型。这种情况下fail2ban只能封禁单个IP地址就显得力不从心，我手动分析日志筛选了一批IP地址（手工统计可能有误差）：

```
1.52.0.0/14
1.192.0.0/12
14.160.0.0/11
14.224.0.0/11
27.2.0.0/15
27.64.0.0/12
42.1.0.0/16
42.112.0.0/13
47.239.0.0/16
58.186.0.0/15
59.153.0.0/16
103.156.0.0/16
113.160.0.0/11
116.96.0.0/12
117.0.0.0/13
117.176.0.0/12
123.16.0.0/12
171.224.0.0/11
203.162.0.0/16
203.210.128.0/17
221.132.0.0/16
222.252.0.0/14
2001:ee0:0:0:0:0:0:0/32
2001:ee1:0:0:0:0:0:0/32
2001:ee2:0:0:0:0:0:0/32
```

傻屄[VNPT](https://vnpt.com.vn/)。
