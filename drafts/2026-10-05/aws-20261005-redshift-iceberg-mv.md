---
title: "Redshift のマテリアライズドビューを Iceberg テーブルとして S3 に保存し、ほかのエンジンからも読めるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "redshift", "iceberg"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/5 に発表された「Amazon Redshift が Apache Iceberg マテリアライズドビューの作成とリフレッシュに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/redshift-iceberg-materialized-views

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Redshift で集計した結果を Iceberg 形式で S3 に置き、Athena や Spark などからそのまま読めるようになった |
| **料金** | 発表には記載なし（Redshift と S3 の通常の料金がかかると考えられる） |
| **対象** | Redshift Serverless と Graviton のプロビジョンドインスタンス（RG）。RA3 / DC2 は対象外（週刊AWS より） |

:::details そもそも マテリアライズドビューと Iceberg とは？
| 名前 | ひとことで |
|---|---|
| Amazon Redshift | AWS のデータウェアハウス。大量のデータを SQL で集計する |
| マテリアライズドビュー（MV） | 重い集計の「結果」を保存しておく表。毎回計算し直さなくてよいので速い |
| Apache Iceberg | S3 などに置いたファイルを、データベースの表のように扱うためのオープンな形式。いろいろなエンジンから読める |
| AWS Glue Data Catalog | 「どこに・どんな表があるか」をまとめた目録 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| MV の置き場所 | Redshift の中だけ | S3 または S3 Tables に Iceberg テーブルとして置ける |
| 作り方 | `CREATE MATERIALIZED VIEW` | `CREATE MATERIALIZED VIEW ... USING ICEBERG` |
| ほかのエンジンから | 読めない | Athena・Spark（EMR / Glue）・Trino・Snowflake などから読める |
| 更新 | ― | 手動でリフレッシュ。変わった分だけ計算し直す（増分リフレッシュ） |

結果は Glue Data Catalog に登録されるので、ほかのカタログの表と同じように権限管理・検索ができます。

**どんなときにうれしい？**
「売上の重い集計を Redshift で 1 回だけ計算して、その結果を Athena でも Spark でも使いたい」ようなとき。チームごとに同じ集計を何度も流さずに済みます。

:::message alert
リフレッシュは自動ではなく手動です。増分リフレッシュが効くのは、週刊AWS によると COUNT / SUM の集計と内部結合などに限られます。また RA3 / DC2 ノードでは使えません。
:::

:::message
**確認ポイント**
Redshift クエリエディタ v2 で `CREATE MATERIALIZED VIEW ... USING ICEBERG` を実行し、Glue Data Catalog と Athena から見えるか確かめる
キーワード: Iceberg materialized view, incremental refresh
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Amazon Redshift が Apache Iceberg マテリアライズドビューの作成とリフレッシュに対応](https://aws.amazon.com/about-aws/whats-new/2026/10/redshift-iceberg-materialized-views)
