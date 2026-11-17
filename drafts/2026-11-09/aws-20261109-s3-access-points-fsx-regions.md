---
title: "【2026/11/9 アップデート】FSx のファイルを S3 の API で読める S3 Access Points のリージョン拡大"
emoji: "☁️"
type: "tech"
topics: ["aws", "fsx", "s3"]
published: false
---

# はじめに

2026/11/9 に発表された「Amazon S3 Access Points for Amazon FSx are now available in additional AWS Regions」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/s3-access-points-fsx-regions/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | FSx のファイルシステムに S3 Access Points を付けて、S3 の API でファイルを読めるリージョンが増えた（FSx for NetApp ONTAP は 4、FSx for OpenZFS は 20 リージョン追加） |
| **料金** | 発表には記載なし（FSx と S3 の料金ページを参照） |
| **対象** | FSx for NetApp ONTAP / FSx for OpenZFS。日本では FSx for OpenZFS が大阪に新しく対応（東京は両方とも対応済み） |

:::details そもそも Amazon FSx と S3 Access Points とは？
| 名前 | ひとことで |
|---|---|
| Amazon FSx | 有名なファイルサーバーの仕組みを、そのまま AWS で使えるようにしたサービス。共有フォルダのようにファイルを置ける |
| FSx for NetApp ONTAP / OpenZFS | FSx の種類。中身のファイルシステム（ONTAP、OpenZFS）が違う |
| Amazon S3 | ファイルを「オブジェクト」として置くストレージ。多くの AWS サービスが S3 のデータを直接読める |
| S3 Access Points | S3 のデータへの「入り口」を、用途ごとに名前と権限を付けて作れる仕組み[^ap] |

たとえると、社内の共有フォルダ（FSx）に、S3 の形をした「窓口」を付けて、S3 にしかつながらない道具からもファイルを読めるようにする機能です。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| FSx for NetApp ONTAP の対応リージョン | 29 | 33（4 リージョン追加） |
| FSx for OpenZFS の対応リージョン | 10 | 30（20 リージョン追加） |
| 日本のリージョン | 東京は両方対応、大阪は OpenZFS 非対応 | 大阪でも FSx for OpenZFS に付けられる |

**どんなときにうれしい？**
ファイルサーバーに置いたままの資料を、コピーせずに Amazon Bedrock Knowledge Bases（生成 AI の検索用データ）や Amazon Athena（SQL での分析）から読みたいとき。データを S3 に移す手間や二重管理がなくなります。大阪リージョンで OpenZFS を使っている場合も選べるようになりました。

:::message
**確認ポイント**
Amazon FSx コンソール → ファイルシステム → ボリューム → S3 アクセスポイントの作成
キーワード: Amazon S3 Access Points for Amazon FSx
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
- [Amazon S3 Access Points for Amazon FSx are now available in additional AWS Regions](https://aws.amazon.com/about-aws/whats-new/2026/11/s3-access-points-fsx-regions/)

[^ap]: 1 つのバケット（ここでは FSx のボリューム）に複数の入り口を作り、入り口ごとにアクセスできる人や範囲を決められる。
