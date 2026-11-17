---
title: "【2026/11/12 アップデート】AWS Glue の Spark ジョブを、確認しながら自動でバージョンアップできるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "glue", "spark"]
published: false
---

# はじめに

2026/11/12 に発表された「AWS Glue announces automatic version upgrades for Apache Spark jobs」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/glue-spark-auto-upgrades/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Glue の Spark ジョブのバージョンを「Auto」にすると、互換性を確かめたうえで、最新の Glue のバージョンに自動で上げてくれるようになった |
| **料金** | 発表には記載なし（週刊AWS の紹介では追加料金なし） |
| **対象** | すべての商用リージョンの Apache Spark の ETL ジョブ |

:::details そもそも AWS Glue と Spark とは？
| 名前 | ひとことで |
|---|---|
| AWS Glue | データを集めて、形を整えて、別の場所に入れる（ETL）ためのサービス |
| Apache Spark | 大量のデータを、たくさんのコンピュータで分担して処理する仕組み |
| Glue のバージョン | ジョブが動く環境（Spark や Python のバージョンなど）の組み合わせ。古いものは順にサポートが終わる |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| バージョンアップの方法 | 計画を立てて、テストして、手で切り替える（数週間かかることも） | ジョブの Glue バージョンを「Auto」にするだけ |
| 安全の確認 | 自分でテストする | 新しいバージョンとの互換性を調べ、こちらの承認を受けてから新しいバージョンで動かす |
| 動かしたあとの確認 | 自分で結果を見比べる | 出力のスキーマ・データ量・処理時間・形式を、これまでの結果と比べて確かめる |
| コードの修正が必要なジョブ | ― | 今のバージョンのまま動き続け、どこを直せばよいかの分析が出る |

**どんなときにうれしい？**
Glue のジョブがたくさんあって、古いバージョンのサポート終了のたびにアップグレード作業に追われているとき。直す必要があるジョブだけに集中できます。

:::message alert
週刊AWS の紹介では、対象は Glue 2.0 以降の Spark ETL ジョブで、ジョブの MaxRetries（失敗したときの再実行の回数）を 1 以上にしておく必要があるとされています。新しいバージョンで失敗したときは、古いバージョンで再実行して元に戻すためです。
:::

:::message
**確認ポイント**
AWS Glue Studio → ジョブ → Job details の Glue version で「Auto」を選ぶ
キーワード: AWS Glue auto version upgrade
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
- [AWS Glue announces automatic version upgrades for Apache Spark jobs](https://aws.amazon.com/about-aws/whats-new/2026/11/glue-spark-auto-upgrades/)
