---
title: "【2026/9/30 アップデート】S3 Tables が Apache Iceberg V3 のすべてのデータ型に対応した"
emoji: "☁️"
type: "tech"
topics: ["aws", "s3", "iceberg"]
published: false
---

# はじめに

2026/9/30 に発表された「Amazon S3 Tables が Apache Iceberg V3 の全データ型をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-s3-tables-iceberg-v3-data-types

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 位置情報やナノ秒単位の時刻を、変換せずにそのまま表に保存できるようになった |
| **料金** | 記載なし（S3 Tables の通常料金） |
| **対象** | S3 Tables が使えるすべてのリージョン |

:::details そもそも Apache Iceberg と S3 Tables とは？
| 名前 | ひとことで |
|---|---|
| Apache Iceberg | S3 に置いた大量のファイルを、データベースの表のように扱うための決まりごと（テーブル形式） |
| S3 Tables | Iceberg の表を S3 上で手軽に作れて、整理や圧縮などのお手入れも自動でやってくれるサービス |
:::

**今回なにが変わった？**
Iceberg の最新版（V3）で使えるデータの種類が全部そろいました。

| 新しく使えるもの | 中身 |
|---|---|
| geometry / geography 型 | 地図上の点・線・範囲 |
| ナノ秒のタイムスタンプ | 10 億分の 1 秒まで記録できる時刻 |
| 列のデフォルト値 | 値を指定しなかったときに自動で入る値 |

**どんなときにうれしい？**
店舗や配送車の位置データを分析したいとき。これまでは緯度・経度を文字列などに変換して保存する手間がありましたが、そのまま保存できます。

:::message
**確認ポイント**
S3 コンソール →「テーブルバケット」
キーワード: Iceberg V3、geospatial
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon S3 Tables が Apache Iceberg V3 の全データ型をサポート](https://aws.amazon.com/about-aws/whats-new/2026/09/amazon-s3-tables-iceberg-v3-data-types)
