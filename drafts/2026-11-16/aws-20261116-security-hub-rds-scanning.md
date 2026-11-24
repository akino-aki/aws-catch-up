---
title: "【2026/11/16 アップデート】Security Hub が、インターネットから届く RDS を実際に接続して見つけるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "securityhub", "rds"]
published: false
---

# はじめに

2026/11/16 に発表された「AWS Security Hub Network Scanning now supports scanning Amazon Relational Database Service (Amazon RDS) database instances」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-network-scanning-rds/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Security Hub の Network Scanning が RDS も対象にし、インターネットから実際に届くデータベースのポートを見つけて知らせるようになった |
| **料金** | 追加料金なし（Security Hub Essentials に含まれる） |
| **対象** | Security Hub が使えるすべての商用リージョンと GovCloud (US) リージョン。Public Access を設定した RDS DB インスタンス |

:::details そもそも Security Hub の Network Scanning とは？
| 名前 | ひとことで |
|---|---|
| AWS Security Hub | AWS アカウントのセキュリティの問題を 1 か所に集めて見せてくれるサービス |
| Network Scanning | AWS の外（インターネット側）から、自分のリソースに本当に接続できるかを試す機能 |
| Amazon RDS | AWS が運用を肩代わりしてくれるリレーショナルデータベース |
| Finding（検出結果） | Security Hub が「ここが危ないかも」と知らせる 1 件ごとの記録 |

たとえるなら、戸締まりの設定表を読むだけでなく、外から実際にドアノブを回してみて「開いた」ドアを報告してくれる見回り役です。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| スキャンの対象 | RDS は対象外 | RDS DB インスタンスも対象（既存・新規とも自動で見つける） |
| 分かること | セキュリティグループ[^sg]やルートテーブルの設定から「届くかもしれない」 | インターネットから実際に試して「届く」ことが分かる |
| 結果の単位 | ― | 届いたポートごとに 1 件の Finding |
| 有効化 | ― | Network Scanning を有効にしている人は自動でオン。新しく Security Hub を使う人は最初からオン |

**どんなときにうれしい？**
テスト用に作った RDS を、うっかり「パブリックアクセス可」のまま放置していたときに気づけます。設定の読み取りだけでは見落としやすい「本当に外から入れる状態か」が分かるので、急いで直すべきものを見分けやすくなります。Security Hub の Exposures で、ほかの検出結果と組み合わせたリスクの評価にも使われます。

:::message
**確認ポイント**
Security Hub コンソールの Findings で、リソースの種類が RDS DB インスタンスのものを探す
キーワード: Security Hub Network Scanning RDS
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/16週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261116/)
- [AWS Security Hub Network Scanning now supports scanning Amazon Relational Database Service (Amazon RDS) database instances](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-network-scanning-rds/)

[^sg]: EC2 や RDS の前に置く、通してよい通信を決めるファイアウォールのような設定。
