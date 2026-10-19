---
title: "【2026/10/15 アップデート】CloudFront の VPC オリジンが IPv6 でもつながるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "cloudfront", "ipv6"]
published: false
---

# はじめに

2026/10/15 に発表された「Amazon CloudFront が VPC origins の dual-stack サポートを発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/cloudfront-vpc-origin-dualstack/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | CloudFront からプライベートサブネットの中のサーバーへ、IPv6 でもつなげるようになった |
| **料金** | 追加料金なし |
| **対象** | VPC オリジンが使えるすべての商用リージョン |

:::details そもそも VPC オリジンと dual-stack とは？
| 名前 | ひとことで |
|---|---|
| Amazon CloudFront | 世界中の拠点から Web サイトを配信する CDN |
| VPC オリジン | インターネットに公開していない（プライベートサブネットの）ALB・NLB・EC2 を、CloudFront の配信元にできる機能 |
| IPv4 / IPv6 | インターネットの住所の形式。IPv4 は数が足りなくなってきていて、IPv6 は新しく数が多い |
| dual-stack | IPv4 と IPv6 の両方でつなげること |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| CloudFront → VPC オリジン | IPv4 のみ | IPv4 と IPv6 の両方（dual-stack） |
| オリジンまで IPv6 にしたいとき | オリジンをパブリックサブネットに置く必要があった | プライベートサブネットのまま IPv6 でつなげる |
| CloudFront → 公開オリジン | dual-stack に対応済み | 変わらず |

**どんなときにうれしい？**
「利用者からサーバーまで、すべて IPv6 で通信すること」という決まりや規制に合わせたいとき。これまでは IPv6 にするためにサーバーをインターネットに公開する必要があり、安全性と引きかえになっていました。今回からは、サーバーを隠したまま IPv6 にできます。

:::message
**確認ポイント**
CloudFront コンソール → VPC オリジン → 作成・編集の画面の IP アドレスの種類
キーワード: CloudFront VPC origins dual-stack, IPv6
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/12週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261012/)
- [Amazon CloudFront が VPC origins の dual-stack サポートを発表](https://aws.amazon.com/about-aws/whats-new/2026/10/cloudfront-vpc-origin-dualstack/)
