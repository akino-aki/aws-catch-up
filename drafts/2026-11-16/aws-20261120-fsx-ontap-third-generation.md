---
title: "【2026/11/20 アップデート】FSx for NetApp ONTAP に、性能が最大 3.6 倍の第 3 世代が出た"
emoji: "☁️"
type: "tech"
topics: ["aws", "fsx", "netapp"]
published: false
---

# はじめに

2026/11/20 に発表された「Amazon FSx for NetApp ONTAP launches a new generation of file systems with up to 3.6x higher performance」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-fsx-for-netapp-ontap-third-generation/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | FSx for NetApp ONTAP の第 3 世代のファイルシステムが登場し、1 つのファイルシステムで最大 216 GB/s、860 万 SSD IOPS 出せるようになった |
| **料金** | What's New には記載なし（FSx for NetApp ONTAP の料金ページで確認） |
| **対象** | バージニア北部、オハイオ、オレゴン |

:::details そもそも FSx for NetApp ONTAP とは？
| 名前 | ひとことで |
|---|---|
| Amazon FSx for NetApp ONTAP | NetApp 社の ONTAP というストレージの仕組みを、AWS が運用してくれるファイルサーバーのサービス |
| スループット | 1 秒あたりに読み書きできるデータの量 |
| IOPS | 1 秒あたりに読み書きできる回数 |
| HA ペア | 片方が壊れてももう片方が引き継げるように、2 台 1 組にしたファイルサーバー |
:::

**今回なにが変わった？**

| | 第 2 世代 | 第 3 世代 |
|---|---|---|
| HA ペアあたりのスループット | 最大 6 GB/s | 最大 18 GB/s |
| HA ペアあたりの SSD IOPS | 最大 20 万 | 最大 72 万 |
| ファイルシステム全体 | ― | 最大 12 HA ペアで、216 GB/s・860 万 SSD IOPS（スループットは最大 3 倍、IOPS は最大 3.6 倍） |

**どんなときにうれしい？**
半導体の設計・検証、映像のレンダリングや編集、止められないデータベースなど、たくさんのデータを速く読み書きしたいとき。1 HA ペアの小さな構成でも、1 組あたりの性能が上がった分、上限が高くなります。

:::message alert
発表の時点で使えるのは、米国の 3 リージョン（バージニア北部、オハイオ、オレゴン）だけです。
:::

:::message
**確認ポイント**
FSx コンソールでファイルシステムを作るときの、デプロイの種類と世代の選択
キーワード: FSx for NetApp ONTAP third generation
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
- [Amazon FSx for NetApp ONTAP launches a new generation of file systems with up to 3.6x higher performance](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-fsx-for-netapp-ontap-third-generation/)
