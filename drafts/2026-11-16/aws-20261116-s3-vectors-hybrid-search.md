---
title: "【2026/11/16 アップデート】S3 Vectors で、意味の近さとキーワードを 1 回の検索で組み合わせられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "s3", "vectorsearch"]
published: false
---

# はじめに

2026/11/16 に発表された「Amazon S3 Vectors now supports hybrid search combining vector and full text for more relevant search results」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/s3-vectors-hybrid-search/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | S3 Vectors が、ベクトル検索と全文検索を 1 回の問い合わせで行い、結果を 1 つの順位にまとめる「ハイブリッド検索」に対応した |
| **料金** | ハイブリッド検索専用の料金は What's New に記載なし（S3 の料金ページで確認） |
| **対象** | S3 Vectors が使えるすべての商用リージョンと中国リージョン |

:::details そもそも S3 Vectors とは？
| 名前 | ひとことで |
|---|---|
| ベクトル | 文章や画像の「意味」を数字の並びにしたもの。意味が近いもの同士は数字も近くなる |
| Amazon S3 Vectors | ベクトルを S3 に安く保存して、意味の近いものを探せる機能 |
| ベクトル検索 | 言葉が違っても意味が近いものを探す検索 |
| 全文検索 | 文章の中に、指定した言葉が入っているものを探す検索 |

ベクトル検索は「だいたいこういう話」を探すのが得意で、全文検索は「エラーコード E1234」のような決まった言葉を探すのが得意です。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 検索の種類 | ベクトル検索だけ | ベクトル検索 ＋ 全文検索を 1 回の QueryVectors で実行できる |
| 全文検索の準備 | 別のサービスにデータを移す必要があった | PutVectors でテキストをメタデータとして入れるだけで、自動で索引が作られる（BM25[^bm25] で点数付け） |
| 結果のまとめ方 | ― | 2 つの結果を RRF[^rrf] で 1 つの順位にまとめて、上位 K 件を返す |
| 言語 | ― | 標準は多くの言語に使える解析方法。言語ごとの解析方法も選べる |
| 既存データ | ― | すでに入っているデータも、その場で全文検索できるようにできる |

**どんなときにうれしい？**
RAG[^rag] で製品マニュアルや FAQ を探すとき、「意味は近いけれど型番が違う」文書が上に来てしまう、といった困りごとを減らせます。全文検索とベクトル検索を別々に実行して、自分で順位を付けることもできます。

:::message
**確認ポイント**
S3 コンソールのベクトルバケット、または AWS CLI の s3vectors の query-vectors
キーワード: Amazon S3 Vectors hybrid search BM25 RRF
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/16週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261116/)
- [Amazon S3 Vectors now supports hybrid search combining vector and full text for more relevant search results](https://aws.amazon.com/about-aws/whats-new/2026/11/s3-vectors-hybrid-search/)

[^bm25]: 検索した言葉が文書の中にどれだけ、どれくらい特徴的に出てくるかで点数を付ける、昔から使われている計算方法。
[^rrf]: Reciprocal Rank Fusion の略。複数の検索結果を、それぞれの「順位」をもとに 1 つの順位にまとめる方法。
[^rag]: 検索で見つけた文書を生成 AI に渡して、その内容をもとに答えさせる仕組み。
