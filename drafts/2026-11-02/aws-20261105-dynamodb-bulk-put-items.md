---
title: "【2026/11/5 アップデート】DynamoDB に、S3 のデータを既存のテーブルへまとめて書き込む機能ができた"
emoji: "☁️"
type: "tech"
topics: ["aws", "dynamodb", "s3"]
published: false
---

# はじめに

2026/11/5 に発表された「Amazon DynamoDB が bulk put items に対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-dynamodb-now-supports-bulk-put-items/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | S3 に置いたデータを、すでにある DynamoDB のテーブルへ一括で書き込める「bulk put items」が一般提供になった |
| **料金** | 発表には記載なし（DynamoDB の料金ページを参照） |
| **対象** | Standard ティアはすべての商用リージョンと GovCloud (US)。Accelerated ティアは対応リージョンの一覧を参照 |

:::details そもそも DynamoDB とは？
| 名前 | ひとことで |
|---|---|
| Amazon DynamoDB | キーを指定してすばやく読み書きできる、AWS の NoSQL データベース |
| キャパシティ | テーブルが 1 秒あたりにどれだけ読み書きできるかの量。大量に書くと足りなくなることがある |
| 条件式 | 「まだ無いときだけ書く」「バージョンが古いときだけ上書きする」のような、書き込みの条件 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| S3 から既存のテーブルに入れる方法 | 自分でプログラムやパイプラインを作り、キャパシティにも気を配る | S3 の場所を指定するだけで DynamoDB が処理する。今動いている処理に影響しないようにしてくれる |
| 条件 | ― | 項目ごとに条件式を付けられる（新しいものだけ入れる、バージョンを見て上書きする など） |
| 速さの選択 | ― | 多くの処理に向く Standard と、急ぎの処理向けの Accelerated の 2 つのティア |

**どんなときにうれしい？**
毎日の商品データの入れ替え、過去のデータの後から入れ直し（バックフィル）、別のデータベースからの移行など、大量のデータを既存のテーブルに入れたいとき。

:::message
**確認ポイント**
DynamoDB コンソール → テーブル → S3 からのインポートや bulk put items の項目を探す。ブログ「Introducing bulk put items for Amazon DynamoDB」で入力の形式や料金を確認
キーワード: DynamoDB bulk put items
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/2週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261102/)
- [Amazon DynamoDB が bulk put items に対応](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-dynamodb-now-supports-bulk-put-items/)
