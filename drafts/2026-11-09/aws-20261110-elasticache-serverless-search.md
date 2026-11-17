---
title: "【2026/11/10 アップデート】ElastiCache Serverless でもベクトル検索や全文検索ができるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "elasticache", "valkey"]
published: false
---

# はじめに

2026/11/10 に発表された「Amazon ElastiCache Serverless now supports vector, full-text and hybrid searches plus aggregations」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-elasticache-serverless-search-aggregations/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ElastiCache Serverless for Valkey で、ベクトル検索・全文検索・その組み合わせ（ハイブリッド検索）と集計ができるようになった |
| **料金** | 使った分だけ（金額は料金ページを参照） |
| **対象** | ElastiCache version 9 for Valkey。すべての商用リージョン、GovCloud (US)、European Sovereign Cloud |

:::details そもそも ElastiCache と Valkey とは？
| 名前 | ひとことで |
|---|---|
| Amazon ElastiCache | データをメモリに置いて、とても速く読み書きできるサービス |
| Valkey | ElastiCache で使えるオープンソースのデータストア（Redis から分かれたもの） |
| Serverless | サーバーの台数やサイズを決めずに、使った分だけ払う使い方 |
| ベクトル検索 | 文章や画像を数値の並び（ベクトル）にして、「意味が近いもの」を探す検索 |
| 全文検索 | 文章の中のキーワードで探す検索 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 検索機能が使える形 | ノードベースのクラスターだけ | Serverless でも使える |
| 検索の種類 | ― | ベクトル・全文・ハイブリッド検索を 1 つのクエリで組み合わせられる。結果の集計もサーバー側でできる |
| 速さ | ― | ベクトル検索は最短でマイクロ秒単位、リコール[^recall]は最大 99%。書き込みが終わるとすぐ検索できる |

**どんなときにうれしい？**
RAG（生成 AI に社内文書などを検索させて答えさせる仕組み）や、商品のおすすめ・検索を作るとき。サーバーの管理なしで、とても速い検索の土台を用意できます。AI エージェントごと・セッションごとに、記憶用の小さなデータストアを用意する使い方もできます。

:::message alert
ElastiCache version 9 for Valkey が必要です。既存のキャッシュは Valkey 9 へのアップグレードが必要です。
:::

:::message
**確認ポイント**
ElastiCache コンソール → Valkey キャッシュの作成（サーバーレス）でエンジンのバージョンを見る
キーワード: ElastiCache Serverless Valkey vector search
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/9週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261109/)
- [Amazon ElastiCache Serverless now supports vector, full-text and hybrid searches plus aggregations](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-elasticache-serverless-search-aggregations/)

[^recall]: 本当に近いものを、どれだけ取りこぼさずに見つけられたかの割合。
