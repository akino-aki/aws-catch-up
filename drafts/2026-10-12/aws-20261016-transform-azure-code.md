---
title: "【2026/10/16 アップデート】AWS Transform が Azure 向けの .NET コードを AWS 向けに書き換えるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "awstransform", "dotnet"]
published: false
---

# はじめに

2026/10/16 に発表された「AWS Transform が Azure から AWS へのクラウドネイティブコード変換を発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-transform-azure-to-aws-code-conversion/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Azure のサービスを使う .NET アプリのコードを、AI エージェントが AWS のサービスを使うコードに書き換えてくれる機能が正式に使えるようになった |
| **料金** | 発表に記載なし |
| **対象** | 東京を含む 8 リージョン |

:::details そもそも AWS Transform とは？
| 名前 | ひとことで |
|---|---|
| AWS Transform | 古いシステムや他のクラウドのシステムを AWS 向けに作り変える作業を、AI エージェントが手伝うサービス |
| .NET モダナイゼーションエージェント | .NET アプリを分析して、作り変えの計画と変換をしてくれるエージェント |
| SDK | プログラムからクラウドのサービスを使うための部品。Azure 用と AWS 用で書き方が違う |
:::

**今回なにが変わった？**

| 変換元（Azure） | 変換先（AWS） | 状態 |
|---|---|---|
| Azure Functions | AWS Lambda | 一般提供 |
| Azure Blob Storage | Amazon S3 | 一般提供 |
| Azure Queue Storage | Amazon SQS | 一般提供 |
| Azure Cosmos DB | Amazon DynamoDB | プレビュー |

流れは、ソースコードを渡す → エージェントが Azure SDK の使いどころを見つけ、評価レポートと計画に変換の選択肢を出す → 内容を確認・調整して実行 → AWS SDK のコードに書き換わり、変更が入ったかもエージェントが確かめる、の順です。

**どんなときにうれしい？**
Azure で作った .NET アプリを AWS に引っ越すとき、「Blob Storage を読み書きしている所を全部 S3 用に書き直す」といった地道な作業を任せられます。どこを変えるかを先にレポートで確認できるので、知らないうちに大きく変わる心配も減ります。

:::message alert
変換するのはアプリのコードだけです。Azure 側のインフラ（ストレージやキューそのもの、データ）の移行は対象外なので、別に準備が必要です。Cosmos DB → DynamoDB はプレビューです。
:::

:::message
**確認ポイント**
AWS Transform の .NET モダナイゼーションのジョブ → 評価レポートとモダナイゼーションプランの変換オプション
キーワード: AWS Transform Azure SDK to AWS SDK, cloud-native code conversion
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
- [AWS Transform が Azure から AWS へのクラウドネイティブコード変換を発表](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-transform-azure-to-aws-code-conversion/)
