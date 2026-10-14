---
title: "【2026/10/9 アップデート】Lambda が自前の Kafka からメッセージを受け取るとき、OAuth で認証できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda", "kafka"]
published: false
---

# はじめに

2026/10/9 に発表された「AWS Lambda がセルフマネージド Apache Kafka イベントソースの OAuth 認証をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-Lambda-supports-oauth-kafka-esm/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Lambda が Kafka のメッセージを読みに行くときの認証方法に、OAuth 2.0 が加わった |
| **料金** | 新しい料金はなし（Lambda の通常の料金） |
| **対象** | セルフマネージド Kafka のイベントソースマッピングが使えるすべての商用リージョン |

:::details そもそも Kafka と イベントソースマッピングとは？
| 名前 | ひとことで |
|---|---|
| Apache Kafka | 大量のメッセージ（イベント）を順番にためて、受け取り側に流すための仕組み |
| セルフマネージド Kafka | AWS の Amazon MSK 以外の Kafka。自分で建てたものや、Confluent Cloud・Aiven・Redpanda などのサービス |
| イベントソースマッピング（ESM） | Lambda が Kafka などを見張り、メッセージが来たら関数を呼び出してくれる設定 |
| OAuth 2.0 | ID とパスワードの代わりに、IdP[^idp] が発行する「トークン」で認証する方式。Kafka では SASL/OAUTHBEARER と呼ぶ |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 使える認証方式 | SASL/PLAIN、SASL/SCRAM、mTLS | 上の 3 つ ＋ OAuth 2.0（SASL/OAUTHBEARER） |
| IdP との連携 | ― | Amazon Cognito や Okta などで Lambda を認証できる |
| 設定方法 | ― | 新しく ESM を作るときに認証設定を指定（コンソール・API・CLI・CloudFormation・SAM） |

**どんなときにうれしい？**
Kafka 側が「OAuth でしかつながせない」というルールになっている場合。これまでは Lambda の ESM が使えず、自分でコンシューマーを書く必要がありました。Kafka と Lambda で同じ IdP・同じアクセスルールを使えるので、管理も 1 か所にまとまります。

:::message alert
発表では「新しい ESM を作るときに」認証を設定すると書かれています。既存の ESM を OAuth に切り替えられるかは、ドキュメントで確認しましょう。
:::

:::message
**確認ポイント**
Lambda コンソール → 関数 →「トリガーを追加」→「Apache Kafka」→ 認証の選択肢
キーワード: SASL/OAUTHBEARER, self-managed Kafka event source mapping
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Lambda がセルフマネージド Apache Kafka イベントソースの OAuth 認証をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-Lambda-supports-oauth-kafka-esm/)

[^idp]: Identity Provider。ユーザーやアプリの ID を管理して、認証を担当するサービス。
