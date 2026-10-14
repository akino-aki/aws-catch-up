---
title: "【2026/9/28 アップデート】SageMaker Unified Studio が外部の Iceberg カタログなどに対応した"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker"]
published: false
---

# はじめに

2026/9/28 に発表された「Amazon SageMaker Unified Studio が 2 つの新しい接続機能をサポート: Iceberg REST Catalog 接続と Amazon DocumentDB の IAM 認証」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/sagemaker-iceberg-rest-iam-documentdb/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS の外にあるデータの目録や、DocumentDB に新しくつなげるようになった |
| **料金** | 追加料金なし |
| **対象** | SageMaker Unified Studio が使えるすべてのリージョン |

:::details そもそも SageMaker Unified Studio とは？
データの検索・加工・分析から機械学習まで、データ関連の作業を 1 つの画面でできるようにした作業場です。
:::

**今回なにが変わった？**

| 新しい接続先 | 中身 |
|---|---|
| Iceberg REST Catalog | Snowflake や Databricks など、AWS 以外のサービスで管理している Iceberg の表の目録（カタログ） |
| DocumentDB（IAM 認証） | AWS の MongoDB 互換データベースに、パスワードを保存せず IAM ロールで接続できる |

**どんなときにうれしい？**
会社のデータが AWS と Snowflake などにばらばらに置かれていても、1 つの画面からまとめて扱えます。また、パスワードの管理や漏えいを心配しなくて済みます。

:::message alert
DocumentDB は 5.0 以上のインスタンスベースのクラスターで、TLS を有効にしておく必要があります
:::

:::message
**確認ポイント**
SageMaker Unified Studio のプロジェクト →「データ」→ 接続の追加
キーワード: データカタログ、Iceberg REST Catalog
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon SageMaker Unified Studio が 2 つの新しい接続機能をサポート: Iceberg REST Catalog 接続と Amazon DocumentDB の IAM 認証](https://aws.amazon.com/about-aws/whats-new/2026/09/sagemaker-iceberg-rest-iam-documentdb/)
