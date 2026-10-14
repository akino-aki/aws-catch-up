---
title: "【2026/10/9 アップデート】Security Hub の検出結果を、画面から CSV や JSON で S3 に書き出せるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "securityhub", "s3"]
published: false
---

# はじめに

2026/10/9 に発表された「AWS Security Hub が findings の S3 への CSV / JSON 形式エクスポートに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/security-hub-exports-s3-csv-json/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Security Hub の findings を、いま絞り込んでいる条件のまま、自分の S3 バケットへファイルで書き出せるようになった |
| **料金** | 発表には記載なし（S3 の保存料金はかかる） |
| **対象** | Security Hub が使えるすべてのリージョン |

:::details そもそも Security Hub と findings とは？
**AWS Security Hub** は、GuardDuty・Inspector・Macie など、いろいろなセキュリティサービスの結果を 1 か所に集めて見られるサービスです。見つかった問題の 1 件 1 件を **findings（検出結果）** と呼びます。

| 形式 | 向いている使い方 |
|---|---|
| CSV | Excel などの表計算ソフトで見る・人に渡す |
| JSON（OCSF[^ocsf]） | ほかのツールに読み込ませる・プログラムで処理する |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| findings をファイルにする方法 | EventBridge などで書き出しの仕組みを自作 | コンソールの findings の画面から、その場で書き出せる |
| 書き出せる画面 | ― | All Findings・Threats・Exposure・Vulnerabilities・Posture Management・Sensitive Data |
| 絞り込み | ― | 画面でかけているフィルターがそのまま使われる |
| 置き場所 | ― | 自分のアカウントの S3 バケット |

**どんなときにうれしい？**
「今月の重大な脆弱性だけを一覧にしてまとめたい」「監査用に、ある時点の検出結果を残しておきたい」とき。画面で絞り込んでからボタンを押すだけで済みます。

:::message
**確認ポイント**
Security Hub コンソール →「Findings」系の画面 → エクスポートのボタン
キーワード: Security Hub export findings, OCSF
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Security Hub が findings の S3 への CSV / JSON 形式エクスポートに対応](https://aws.amazon.com/about-aws/whats-new/2026/10/security-hub-exports-s3-csv-json/)

[^ocsf]: Open Cybersecurity Schema Framework。セキュリティのログや検出結果を、製品をまたいで同じ形で扱うための共通の書式。
