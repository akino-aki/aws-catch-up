---
title: "【2026/10/26 アップデート】Glue Data Catalog の Iceberg REST API に OAuth で接続できる"
emoji: "☁️"
type: "tech"
topics: ["aws", "glue", "iceberg"]
published: false
---

# はじめに

2026/10/26 に発表された「AWS Glue Data Catalog が Apache Iceberg REST Catalog API で OAuth をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/glue-catalog-oauth-iceberg-rest/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Glue Data Catalog の Iceberg REST Catalog API に、AWS の認証情報（SigV4）だけでなく OAuth 2.0 のトークンでもアクセスできるようになった |
| **料金** | What's New には記載なし |
| **対象** | AWS Glue と Lake Formation が使えるすべてのリージョン |

:::details そもそも Glue Data Catalog と Iceberg REST Catalog とは？
| 名前 | ひとことで |
|---|---|
| AWS Glue Data Catalog | S3 などにあるデータの「目録」。どこにどんな表があり、列は何かを管理する |
| Apache Iceberg | 大量のファイルを 1 つの「表」として扱うための、オープンな表の形式 |
| Iceberg REST Catalog（IRC） | Iceberg の目録にアクセスするための共通の API の決まり。Spark・Trino・Flink などが対応している |
| SigV4[^sigv4] | AWS の API を呼ぶときの、AWS 独自の署名方式 |
| OAuth 2.0 | 「このトークンを持っている人は使ってよい」という、Web で広く使われる認可の仕組み |
| AWS Lake Formation | データの表・列ごとに、誰が見てよいかを管理するサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 認証方式 | SigV4（AWS の認証情報が必要） | ＋ OAuth 2.0 のベアラートークン |
| 外部の分析サービスに使わせるとき | AWS の認証情報を渡す必要があった | 相手の ID トークン（OIDC）を、短い時間だけ使える Glue 用のトークンに交換して使える（RFC 8693 のトークン交換） |
| 権限の管理 | IAM と Lake Formation | 変わらず IAM と Lake Formation |

**どんなときにうれしい？**
AWS の外にある分析サービスやクエリエンジンから、Glue の目録にある Iceberg の表を読ませたいとき。AWS のアクセスキーを相手に渡さずに済み、Iceberg の世界で標準の OAuth の方法でそのまま接続できます。

:::message
**確認ポイント**
AWS Glue のユーザーガイドの Iceberg REST エンドポイントの認証の説明と、AWS Sign-In のユーザーガイドのトークン交換の説明
キーワード: Glue Iceberg REST Catalog OAuth, token exchange RFC 8693, AWS Sign-In
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/26週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261026/)
- [AWS Glue Data Catalog が Apache Iceberg REST Catalog API で OAuth をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/glue-catalog-oauth-iceberg-rest/)

[^sigv4]: Signature Version 4。リクエストの中身をアクセスキーで署名して、本人からのリクエストであることを証明する方式。
