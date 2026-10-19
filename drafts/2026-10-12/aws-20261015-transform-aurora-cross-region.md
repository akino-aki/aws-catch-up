---
title: "【2026/10/15 アップデート】AWS Transform で変換した Aurora を別のリージョンに作れるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "awstransform", "aurora"]
published: false
---

# はじめに

2026/10/15 に発表された「AWS Transform for full-stack Windows modernization が Aurora PostgreSQL のクロスリージョンデプロイに対応し、新たに 7 リージョンで利用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-transform-full-stack-aurora-cross-region/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | SQL Server を Aurora PostgreSQL に変換するときに、変換後のデータベースを別のリージョンに作れるようになった。使えるリージョンも増えた |
| **料金** | 発表に記載なし |
| **対象** | 東京を含む 8 リージョン（これまではバージニア北部のみ） |

:::details そもそも AWS Transform for full-stack Windows modernization とは？
| 名前 | ひとことで |
|---|---|
| AWS Transform | 古いシステムを新しい形に作り変える作業を、AI エージェントが手伝うサービス |
| full-stack Windows modernization | Windows・.NET・SQL Server で作られたアプリを、データベースからアプリのコードまでまとめて作り変える機能 |
| Aurora PostgreSQL | AWS の PostgreSQL 互換のデータベース。ライセンス料のかかる SQL Server からの移行先として選ばれる |
| DDL | テーブルの作り方などを定義する SQL 文 |
| クロスリージョン | 元とは別のリージョンに置くこと |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 変換後の Aurora を置く場所 | 元と同じリージョン | 変換プランで別のリージョンを指定できる |
| 使えるリージョン | バージニア北部のみ | 東京などが加わり 8 リージョン |
| アプリ側 | 接続文字列や ADO.NET・Entity Framework のコードも同じ流れで PostgreSQL 用に書き換え | 変わらず |

**どんなときにうれしい？**
「データは日本に置かなければならない」というデータの置き場所の決まりがあるときや、利用者に近いリージョンに置いて応答を速くしたいとき。災害対策として別リージョンに置きたい場合にも使えます。東京で使えるようになったのも、日本の利用者には大きいです。

:::message
**確認ポイント**
AWS Transform のコンソール → 変換プラン（transformation plan）のターゲットリージョン
キーワード: AWS Transform full-stack Windows, Aurora PostgreSQL cross-region deployment
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
- [AWS Transform for full-stack Windows modernization が Aurora PostgreSQL のクロスリージョンデプロイに対応し、新たに 7 リージョンで利用可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-transform-full-stack-aurora-cross-region/)
