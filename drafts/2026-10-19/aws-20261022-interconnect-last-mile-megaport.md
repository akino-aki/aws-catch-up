---
title: "【2026/10/22 アップデート】拠点と AWS を簡単につなぐ Interconnect – last mile がプレビュー"
emoji: "☁️"
type: "tech"
topics: ["aws", "directconnect", "network"]
published: false
---

# はじめに

2026/10/22 に発表された「AWS Interconnect – last mile の Megaport とのプレビュー提供を発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-announces-AWS-interconnect-last-mile-megaport-preview/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | オフィスやデータセンターと AWS をインターネットを通らない線でつなぐ AWS Interconnect – last mile が、Megaport と組んでプレビューになった。コンソールで数項目を入れるだけでつながる |
| **料金** | What's New には記載なし（料金ページを参照） |
| **対象** | プレビューはサンノゼ（us-west-1）と北バージニア（us-east-1）の 2 都市圏 |

:::details そもそも Interconnect – last mile とは？
| 名前 | ひとことで |
|---|---|
| AWS Direct Connect | 自分の拠点と AWS を、インターネットを通らない専用の線でつなぐサービス |
| Direct Connect Gateway | Direct Connect の線を、複数の VPC やリージョンにつなげるための中継点 |
| last mile（ラストワンマイル） | 通信事業者の設備から、利用者の建物までの「最後の区間」 |
| Megaport | 世界中のデータセンターをつなぐネットワークを持っている会社 |
| BGP・VLAN・ASN[^bgp] | 専用線をつなぐときに必要な、経路やネットワークの設定 |
:::

**今回なにが変わった？**

| | これまで（一般的な専用線） | これから（last mile） |
|---|---|---|
| 申し込み | 通信事業者と個別にやりとり | AWS コンソール・CLI・API から申し込む |
| 入力するもの | ― | リージョン、帯域、Direct Connect Gateway ID、パートナーのサブスクライバー ID |
| ネットワークの設定 | BGP・VLAN・ASN を自分で設定 | 自動で設定される |
| 可用性 | 構成しだい | 99.99% の SLA |

申し込むとアクティベーションキーが発行され、それを使って Megaport 側の手続きを済ませます。正式提供のときには、帯域を 1 Gbps から 100 Gbps までコンソールで変えられる予定です。

**どんなときにうれしい？**
支社やデータセンターから AWS に安定した専用の線を引きたいけれど、ネットワークの専門的な設定には自信がない場合です。AWS のコンソールから申し込めて、面倒な設定も自動なので、専用線を引くまでの手間と時間が減ります。

:::message alert
プレビューなので、使えるのは米国の 2 都市圏だけです。日本の拠点から使えるのはまだ先になりそうです。
:::

:::message
**確認ポイント**
AWS Direct Connect コンソール → Interconnect – last mile（プレビュー）の作成画面
キーワード: AWS Interconnect last mile, Megaport, Direct Connect Gateway
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/19週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261019/)
- [AWS Interconnect – last mile の Megaport とのプレビュー提供を発表](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-announces-AWS-interconnect-last-mile-megaport-preview/)

[^bgp]: BGP は経路を交換するしくみ、VLAN は 1 本の線を論理的に分ける単位、ASN はネットワークの持ち主を表す番号。
