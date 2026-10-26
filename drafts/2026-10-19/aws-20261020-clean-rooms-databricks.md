---
title: "【2026/10/20 アップデート】Clean Rooms で Databricks のデータを S3 にコピーせず分析できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "cleanrooms", "databricks"]
published: false
---

# はじめに

2026/10/20 に発表された「AWS Clean Rooms が Databricks をデータソースとしてサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-clean-rooms-supports-databricks

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Clean Rooms のコラボレーションで、Databricks のテーブルを S3 に書き出さずに、そのまま分析に使えるようになった |
| **料金** | What's New には記載なし（Clean Rooms の通常の料金） |
| **対象** | Clean Rooms が使えるリージョン（詳しくはドキュメントのリージョン表） |

:::details そもそも AWS Clean Rooms とは？
| 名前 | ひとことで |
|---|---|
| AWS Clean Rooms | 複数の会社が、お互いの生データを見せ合わずに、組み合わせた分析結果だけを得られるサービス |
| コラボレーション | Clean Rooms で、データを持ち寄って分析する「部屋」。参加者をメンバーと呼ぶ |
| Databricks | データの保存・加工・分析をまとめて行える、AWS 以外の会社のデータ基盤サービス |
| Delta Sharing | Databricks のデータを、コピーせずに外部へ共有するためのしくみ |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Databricks のデータを使うには | S3 に書き出す（コピーする）しくみを作る必要があった | Delta Sharing で共有したテーブルを直接クエリできる |
| データのコピー | S3 に余分なコピーができ、その管理も必要 | コピーしない |
| 登録に必要なもの | ― | ワークスペースの URL・スキーマ・テーブル名・Delta Sharing の共有 |
| 使えるデータソース | AWS Glue（S3）、Amazon Athena、Snowflake | ＋ Databricks |

**どんなときにうれしい？**
小売の会社が Databricks に持っている顧客データと、広告メディア側のデータを組み合わせて、広告の効果を測りたいときです。お互いの顧客リストを渡し合わずに済み、しかも S3 への書き出しを作らなくてよいので、準備の手間とデータの管理対象が減ります。

:::message
**確認ポイント**
AWS Clean Rooms コンソール → コラボレーション → テーブルの設定（Configured tables）で、データソースに Databricks が選べるか
キーワード: AWS Clean Rooms Databricks Delta Sharing
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
- [AWS Clean Rooms が Databricks をデータソースとしてサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-clean-rooms-supports-databricks)
