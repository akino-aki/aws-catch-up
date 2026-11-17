---
title: "【2026/11/9 アップデート】AWS Glue で SaaS のデータをコードなしで取り込めるコネクタが 100 個増えた"
emoji: "☁️"
type: "tech"
topics: ["aws", "glue", "etl"]
published: false
---

# はじめに

2026/11/9 に発表された「AWS Glue adds 100 new native connectors for popular SaaS applications」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-glue-adds-100-new-native-connectors/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | SaaS や REST API のサービスからデータを取り込むための、AWS Glue のコネクタが 100 個追加された |
| **料金** | 発表には記載なし（Glue のジョブの料金がかかる） |
| **対象** | AWS Glue 5.0 以降、すべての商用リージョン |

:::details そもそも AWS Glue とは？
| 名前 | ひとことで |
|---|---|
| AWS Glue | データを集めて、形を整えて、別の場所に入れる（ETL[^etl]）ためのサービス |
| コネクタ | 外部のサービスにつなぐための「差し込み口」。認証やデータの取り方が用意されている |
| AWS Glue Data Catalog | データの場所や形の情報をまとめておく目録。接続の設定もここに置く |
| SaaS | ネット経由で使うアプリ（例: 会計ソフト、人事システム） |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| SaaS のデータの取り込み | API を呼ぶコードを自分で書く必要があった | 用意されたコネクタを選ぶだけ |
| 接続の管理 | ジョブごとに作り込む | Data Catalog に接続を 1 回作れば、複数のジョブで使い回せる |
| 対応サービスの例 | ― | Anthropic（利用量・コスト）、Adyen、Square、Xero、Chargebee、Amplitude、Klaviyo、BambooHR、Gusto、PagerDuty、Sentry、Jenkins、Vercel など |

**どんなときにうれしい？**
決済サービスの売上や、障害対応ツールの記録などを Amazon S3 や Amazon Redshift に集めて、ほかのデータと一緒に分析したいとき。取り込み用のプログラムを書いて保守する手間がなくなります。

:::message alert
使えるのは AWS Glue 5.0 以降のジョブだけです。古いバージョンのジョブでは使えません。
:::

:::message
**確認ポイント**
AWS Glue コンソール → Data Catalog → Connections → 接続の作成で、データソースの一覧を見る
キーワード: AWS Glue native connectors SaaS
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
- [AWS Glue adds 100 new native connectors for popular SaaS applications](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-glue-adds-100-new-native-connectors/)

[^etl]: Extract（取り出す）・Transform（変換する）・Load（読み込む）の略。
