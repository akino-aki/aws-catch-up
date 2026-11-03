---
title: "【2026/10/28 アップデート】次世代 OpenSearch Serverless に時系列データ用のコレクションが登場"
emoji: "☁️"
type: "tech"
topics: ["aws", "opensearch"]
published: false
---

# はじめに

2026/10/28 に発表された「次世代 Amazon OpenSearch Serverless の時系列コレクションを発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/time-series-collection-next-generation-opensearch-serverless/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 次世代の OpenSearch Serverless で「時系列コレクション」が使えるようになった。新しく安い warm ストレージが加わり、古いデータを安く長く持てる |
| **料金** | warm ストレージの料金は OpenSearch Serverless の料金ページを参照 |
| **対象** | OpenSearch Serverless が使えるすべてのリージョン |

:::details そもそも OpenSearch Serverless とは？
| 名前 | ひとことで |
|---|---|
| Amazon OpenSearch Service | ログや文章を大量に入れて、すばやく検索・分析できるサービス |
| OpenSearch Serverless | サーバー（クラスター）の台数を考えずに使える OpenSearch。データを入れる単位を「コレクション」と呼ぶ |
| hot / warm ストレージ | hot はすぐ検索できる高めの置き場所、warm はあまり見ないデータ向けの安い置き場所 |
| 時系列データ | ログ・メトリクス・トレースなど、時刻とともに次々と増えていくデータ |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| 新しいコレクションの種類 | 時系列コレクション（次世代の OpenSearch Serverless） |
| ストレージ | hot に加えて warm。何日 hot に置くかを決めると、そのあとは warm に移る |
| 容量 | 1 コレクションあたり hot ストレージ最大 100 TB |
| アラートと異常検知 | 使えるようになった。別のツールなしで、問題の通知やいつもと違う動きの検出ができる |
| 急なデータの増加 | 自動で吸収 |

**どんなときにうれしい？**
アプリのログやセキュリティのログを何か月・何年分も残したいけれど、ほとんど見ない古いデータに高い料金を払いたくないとき。直近のデータは速く検索しつつ、古いデータも同じコレクションの中で安く検索できます。

:::message
**確認ポイント**
OpenSearch Service コンソール → Serverless → コレクションの作成で、種類に時系列（Time series）が選べるか、hot に置く期間の設定
キーワード: OpenSearch Serverless time series collection, warm storage
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
- [次世代 Amazon OpenSearch Serverless の時系列コレクションを発表](https://aws.amazon.com/about-aws/whats-new/2026/10/time-series-collection-next-generation-opensearch-serverless/)
