---
title: "【2026/11/5 アップデート】Parameter Store で、IP アドレスや JSON などの値の形式を自動で検証できるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "systemsmanager"]
published: false
---

# はじめに

2026/11/5 に発表された「AWS Systems Manager Parameter Store が組み込みのデータ型によるパラメータの整理と検証に対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-ssm-parameter-store-allows-organization-validation-with-new-data-types/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | パラメータに 13 種類の「データ型」を付けられるようになり、形式が合わない値は保存のときに断られるようになった |
| **料金** | url・json・jsonc の型を使うパラメータは、アドバンスドパラメータの料金 |
| **対象** | Systems Manager が使えるすべてのリージョン |

:::details そもそも Parameter Store とは？
| 名前 | ひとことで |
|---|---|
| AWS Systems Manager Parameter Store | 設定値やパスワードなどを、名前を付けて保存しておける置き場 |
| String / StringList / SecureString | パラメータの種類。ふつうの文字、カンマ区切りの一覧、暗号化して保存する文字 |
| スタンダード / アドバンスド | パラメータの階層。アドバンスドは大きな値を保存できるが有料 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 値のチェック | 正規表現（AllowedPattern）を自分で書く | 型を選ぶだけで、PutParameter のときに自動でチェック。AllowedPattern と組み合わせることもできる |
| 使える型（スタンダード・アドバンスド） | ― | aws:region、aws:account:id、boolean、integer、float、binary、hostname、email、ipv4-address、ipv6-address |
| 使える型（アドバンスドのみ） | ― | url、json、jsonc |
| 整理 | ― | コンソールや DescribeParameters の API で、型で絞り込める |

**どんなときにうれしい？**
設定値に、うっかり余計な空白が入った IP アドレスや、括弧が閉じていない JSON を保存してしまい、あとでアプリが動かなくなる、という事故を防ぎたいとき。

:::message alert
url・json・jsonc はアドバンスドパラメータでしか使えず、アドバンスドパラメータの料金がかかります。StringList で使えるのは一部の型だけです。
:::

:::message
**確認ポイント**
Systems Manager コンソール → パラメータストア → パラメータの作成で、データ型の選択肢を確認
キーワード: Parameter Store data types validation
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/2週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261102/)
- [AWS Systems Manager Parameter Store が組み込みのデータ型によるパラメータの整理と検証に対応](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-ssm-parameter-store-allows-organization-validation-with-new-data-types/)
