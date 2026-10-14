---
title: "【2026/9/29 アップデート】Route 53 DNS Firewall で Palo Alto の脅威リストが使えるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "route53", "security"]
published: false
---

# はじめに

2026/9/29 に発表された「Amazon Route 53 Resolver DNS Firewall が Palo Alto Networks Advanced DNS Security のサポートを一般提供開始」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/route-53-dns-firewall-panw-dns-security-generally-available

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目     | 内容                                             |
| ------ | ---------------------------------------------- |
| **要約** | 有名セキュリティ会社の「危険なドメインのリスト」を使って、危ない通信を止められるようになった |
| **料金** | Route 53 の料金 ＋ Palo Alto Networks のライセンス       |
| **対象** | DNS Firewall が使える 32 リージョン                     |

:::details そもそも DNS と DNS Firewall とは？
| 名前 | ひとことで |
|---|---|
| DNS | `example.com` のような名前を IP アドレスに変換する「インターネットの電話帳」 |
| Route 53 Resolver DNS Firewall | VPC 内のサーバーが危険なサイトの名前を引こうとしたときに、それをブロックする仕組み |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| ブロックするリスト | 自分で作るか、AWS が用意したもの | Palo Alto Networks 社のリストも使える |
| 選べる脅威 | ― | マルウェア、フィッシング、C2[^c2] など 30 種類以上 |
| 提供状況 | 6 月からプレビュー | 正式に提供開始 |

**どんなときにうれしい？**
ウイルスに感染したサーバーが外部と通信しようとするのを、DNS の段階で止めたいとき。専用のファイアウォール機器を別に用意する必要がありません。

:::message alert
Palo Alto Networks のライセンスは AWS Marketplace で別途契約が必要です
:::

:::message
**確認ポイント**
VPC コンソール →「DNS ファイアウォール」→「ルールグループ」
キーワード: DNS Firewall、C2 通信
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon Route 53 Resolver DNS Firewall が Palo Alto Networks Advanced DNS Security のサポートを一般提供開始](https://aws.amazon.com/about-aws/whats-new/2026/09/route-53-dns-firewall-panw-dns-security-generally-available)

[^c2]: Command and Control の略。ウイルスに乗っ取られたサーバーに、攻撃者が命令を送るための指令サーバーのこと。
