---
title: "Aurora PostgreSQL から S3 の Iceberg / Parquet を直接クエリできるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "aurora", "postgresql"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/9/30 に発表された「Aurora PostgreSQL が Apache Iceberg および Parquet データのクエリに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/aurora-postgresql-query-apache-iceberg-and-parquet/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | S3 にある分析用のデータを、コピーせずに Aurora から SQL で直接読めるようになった |
| **料金** | 追加料金なし |
| **対象** | Aurora PostgreSQL 17.11 以降、18.6 以降（Serverless v2 を含む） |

:::details そもそも何の話？
Aurora PostgreSQL は、AWS が提供する PostgreSQL 互換の高性能なデータベースです。一方、分析用の大量のデータは、S3 に Iceberg や Parquet[^parquet] という形式で置かれていることが多く、データベースとは別の場所にあります。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| S3 のデータを使いたいとき | ETL[^etl] で Aurora にコピーしてから使う | 外部テーブル（フォーリンテーブル）として登録すれば、そのまま SQL で読める |
| 裏側で動くもの | ― | DuckDB という分析が得意なエンジン |

**どんなときにうれしい？**
「アプリの DB にある顧客データ」と「S3 にある過去数年分のログ」を組み合わせて集計したいとき。データを移すための仕組みを作らずに済みます。

:::message
**確認ポイント**
対象バージョンかどうかを RDS コンソールで確認
キーワード: foreign table、DuckDB、データレイク
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Aurora PostgreSQL が Apache Iceberg および Parquet データのクエリに対応](https://aws.amazon.com/about-aws/whats-new/2026/09/aurora-postgresql-query-apache-iceberg-and-parquet/)

[^parquet]: 分析に向いたファイル形式。列ごとにまとめて保存するので、特定の列だけを速く読めます。
[^etl]: Extract（取り出す）・Transform（加工する）・Load（入れる）の略。データをある場所から別の場所へ移す処理のこと。
