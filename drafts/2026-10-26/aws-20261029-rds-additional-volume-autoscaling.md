---
title: "【2026/10/29 アップデート】RDS for Oracle と SQL Server の追加ボリュームも容量が自動で増える"
emoji: "☁️"
type: "tech"
topics: ["aws", "rds", "oracle"]
published: false
---

# はじめに

2026/10/29 に発表された「Amazon RDS for Oracle および SQL Server が追加ストレージボリュームでのストレージオートスケーリングをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-rds-oracle-sqlserver-autoscaling-additional-storage-volumes

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | RDS for Oracle と RDS for SQL Server の「追加ストレージボリューム」でも、ストレージのオートスケーリング（容量の自動拡張）が使えるようになった |
| **料金** | 追加料金なし（使っているストレージの分だけ） |
| **対象** | RDS for Oracle・RDS for SQL Server。すべての商用リージョンと GovCloud (US) |

:::details そもそも追加ストレージボリュームとオートスケーリングとは？
| 名前 | ひとことで |
|---|---|
| Amazon RDS | データベースの運用を AWS に任せられるサービス |
| 追加ストレージボリューム | メインのボリュームとは別に最大 3 つのボリュームを足して、合計 256 TiB まで容量を増やせる機能 |
| ストレージのオートスケーリング | 使っている量が容量に近づくと、止めずに自動で容量を増やしてくれる機能。上限は自分で決める |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| メインのボリューム | オートスケーリングできた | 変わらず |
| 追加のボリューム | 先の需要を見込んで手で容量を決める | ボリュームごとに上限を決めれば、自動で増える |
| 止まる時間 | ― | なし。新しいインスタンスにも既存のインスタンスにも使える |

**どんなときにうれしい？**
データが増えるペースが読めないとき。容量を少なく見積もると満杯で止まり、多く見積もると使わない分の費用がかかる、という悩みがなくなります。

:::message
**確認ポイント**
RDS コンソール → DB インスタンスの変更 → ストレージの設定で、追加ストレージボリュームごとの最大ストレージのしきい値
キーワード: RDS storage autoscaling additional storage volumes
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
- [Amazon RDS for Oracle および SQL Server が追加ストレージボリュームでのストレージオートスケーリングをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-rds-oracle-sqlserver-autoscaling-additional-storage-volumes)
