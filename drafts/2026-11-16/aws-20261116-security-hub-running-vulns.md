---
title: "【2026/11/16 アップデート】Security Hub が、EC2 で「実際に動いている」脆弱なソフトを見分けるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "securityhub", "ec2"]
published: false
---

# はじめに

2026/11/16 に発表された「AWS Security Hub now detects when vulnerable software is running on Amazon EC2 instances」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-detects-vulnerable-software/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 既知の脆弱性があるソフトウェアが EC2 上で実際に動いているときに、それを見分けて深刻度を上げて知らせるようになった |
| **料金** | 追加料金なし（Security Hub Essentials プランに含まれる） |
| **対象** | Security Hub が使えるすべてのリージョン |

:::details そもそも登場するサービスは？
| 名前 | ひとことで |
|---|---|
| AWS Security Hub | セキュリティの問題を 1 か所に集めて見せてくれるサービス |
| Exposure findings | 「攻撃されやすい状態」を、いくつかの情報を組み合わせて知らせる検出結果 |
| Amazon Inspector | EC2 などに入っているソフトウェアに、既知の脆弱性[^cve]がないか調べるサービス |
| Amazon GuardDuty Runtime Monitoring | EC2 などの上で、どんなプロセスが動いているかを見張る機能 |

たとえるなら、Inspector は「この家の鍵は古い型だ」と気づく係、GuardDuty は「その鍵のドアを毎日使っている」と気づく係です。今回、その 2 つの気づきを Security Hub が結び付けるようになりました。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 分かること | 脆弱なソフトが「入っている」 | 脆弱なソフトが「動いている」かどうかも分かる |
| 深刻度 | 動いているかどうかで差がない | 動いているほうが、動いていない場合より高い深刻度になる |
| 新しい特徴（trait） | ― | 「The EC2 instance is running software with a known vulnerability」 |
| 元になる情報 | ― | GuardDuty Runtime Monitoring と Inspector の VM スキャンの結果を組み合わせる |

**どんなときにうれしい？**
脆弱性の一覧が多すぎて、どれからパッチを当てればよいか迷うとき。「入っているだけで使われていない」ものより、「今まさに動いている」ものを先に直す、という順番を付けやすくなります。

:::message alert
動いているかどうかの判定には、GuardDuty Runtime Monitoring と Inspector の情報が使われます。それぞれを有効にする必要があるか、その料金がどうなるかは、Security Hub のユーザーガイドで確認が必要です。
:::

:::message
**確認ポイント**
Security Hub コンソールの Exposure findings で、EC2 インスタンスの trait を見る
キーワード: Security Hub exposure running software with a known vulnerability
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
- [AWS Security Hub now detects when vulnerable software is running on Amazon EC2 instances](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-detects-vulnerable-software/)

[^cve]: すでに世の中に知られている、ソフトウェアの弱点のこと。CVE という番号で管理されることが多い。
