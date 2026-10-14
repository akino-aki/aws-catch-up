---
title: "【2026/10/2 アップデート】Aurora DSQL でパーシャルインデックスが使えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "aurora"]
published: false
---

# はじめに

2026/10/2 に発表された「Amazon Aurora DSQL がパーシャルインデックスをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 表の一部の行だけに、索引（インデックス）を作れるようになった |
| **料金** | 記載なし（索引が小さくなる分、保存コストは下がる） |
| **対象** | Aurora DSQL が使えるすべてのリージョン |

:::details そもそも Aurora DSQL とインデックスとは？
| 名前 | ひとことで |
|---|---|
| Aurora DSQL | サーバーの管理がいらず、複数のリージョンにまたがっても動く PostgreSQL 互換のデータベース |
| インデックス | 本の索引のように、検索を速くするための仕組み |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 索引の対象 | 表のすべての行 | `WHERE` で条件を付けて、一部の行だけにできる |
| 書き方 | `CREATE INDEX ASYNC ...` | `CREATE INDEX ASYNC ... WHERE 条件` |

**どんなときにうれしい？**
注文テーブルのように、「よく検索するのは処理中の注文だけで、何百万件もある完了済みの注文はほとんど見ない」場合。処理中の注文だけに索引を作れば、索引が小さく済み、検索も速くなります。

:::message
**確認ポイント**
PostgreSQL にも昔からある機能なので、PostgreSQL の公式ドキュメントでも仕組みを学べます
キーワード: partial index、CREATE INDEX ASYNC
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon Aurora DSQL がパーシャルインデックスをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-dsql-partial-indexes/)
