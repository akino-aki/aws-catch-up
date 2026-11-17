---
title: "【2026/11/12 アップデート】AWS Quick で、使えるデータソースの種類をコネクタごとに制限できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "quick", "governance"]
published: false
---

# はじめに

2026/11/12 に発表された「AWS Quick enhances granular governance with the ability to restrict structured data sources」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-quick-structured-data-source-restrictions/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 管理者が、ユーザーの作れる・変えられる・共有できるデータソースを、コネクタの種類ごとに制限できるようになった |
| **料金** | 発表には記載なし |
| **対象** | Enterprise edition。AWS Quick が使えるすべてのリージョン |

:::details そもそも AWS Quick とは？
| 名前 | ひとことで |
|---|---|
| AWS Quick | データの分析やダッシュボード作り、生成 AI のアシスタントなどをまとめた、業務向けの AWS のサービス |
| データソース | 分析に使うデータの取得元（データベース、アップロードしたファイルなど） |
| 構造化データのコネクタ | 表の形のデータ（Amazon Redshift など）につなぐための差し込み口 |
| カスタム権限 | ユーザーができる操作を、管理者が細かく決める仕組み |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 制限の単位 | すべての種類のデータソースにまとめてかかる | コネクタの種類ごとに決められる |
| 制限できる操作 | ― | 作成・更新・共有を、それぞれ別々に許可・禁止できる |
| 設定の場所 | ― | Quick の画面、API、AWS CLI |

**どんなときにうれしい？**
「Amazon Redshift のデータは使ってよいけれど、手元のファイルをアップロードして使うのは禁止したい」というとき。管理されていないデータが混ざるのを防げます。特定のコネクタのデータソースだけ、ほかの人と共有できないようにすることもできます。

:::message alert
カスタム権限のプロファイルは Enterprise edition で設定します。
:::

:::message
**確認ポイント**
AWS Quick の管理画面 → カスタム権限（Custom permissions）のプロファイル
キーワード: AWS Quick custom permissions data source restrictions
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
- [AWS Quick enhances granular governance with the ability to restrict structured data sources](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-quick-structured-data-source-restrictions/)
