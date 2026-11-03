---
title: "【2026/10/28 アップデート】AWS Backup の復元テストで Redshift のバックアップも試せるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "backup", "redshift"]
published: false
---

# はじめに

2026/10/28 に発表された「AWS Backup の restore testing が Amazon Redshift をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-backup-adds-redshift-restore-testing/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS Backup の restore testing（バックアップから本当に戻せるかを定期的に自動で試す機能）が Amazon Redshift に対応した |
| **料金** | What's New には記載なし（AWS Backup の料金ページを参照）。テストで復元したリソースの料金もかかると考えられる |
| **対象** | AWS Backup の restore testing と Redshift の両方に対応しているリージョン |

:::details そもそも AWS Backup の restore testing とは？
| 名前 | ひとことで |
|---|---|
| AWS Backup | いろいろな AWS のサービスのバックアップを、1 か所でまとめて管理するサービス |
| restore testing | バックアップを決まったスケジュールで実際に復元してみて、成功するか・何分かかるかを確かめる機能。終わるとテスト用のリソースは消される |
| RTO（目標復旧時間） | 障害が起きてから、何時間以内に元に戻すかの目標 |
| Amazon Redshift | 大量のデータを集計・分析するためのデータウェアハウス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 復元テストの対象 | ストレージ・コンピュート・データベースの各種サービス | ＋ Amazon Redshift |
| 対象の選び方 | ― | ARN かタグで Redshift のリソースを指定 |
| 復元するバックアップ | ― | 最新のもの、または条件に合うものからランダム |
| 確認 | ― | 復元できたリソースを、消される前に自分の仕組みで検証することもできる |

**どんなときにうれしい？**
「バックアップは取っているけれど、実際に戻せるかは試したことがない」という不安をなくしたいとき。Redshift の復元に何分かかるかを毎回記録して、RTO に間に合うかを確かめられます。

:::message
**確認ポイント**
AWS Backup コンソール → 復元テスト（Restore testing）→ 復元テスト計画の作成で、リソースの種類に Redshift が選べるか
キーワード: AWS Backup restore testing Redshift
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
- [AWS Backup の restore testing が Amazon Redshift をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-backup-adds-redshift-restore-testing/)
