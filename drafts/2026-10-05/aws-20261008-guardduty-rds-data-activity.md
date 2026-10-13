---
title: "GuardDuty が Aurora / RDS の PostgreSQL で、データの持ち出しや破壊を見つけられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "guardduty", "rds"]
published: false
---

# はじめに

2026/10/8 に発表された「Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ログインのあやしさだけでなく、データベースの中で「大量に盗み出す」「消す・壊す」動きも検出できるようになった |
| **料金** | アカウント・リージョンごとに 30 日間の無料トライアルあり。その後は有料（金額は料金ページを確認） |
| **対象** | Aurora PostgreSQL と RDS for PostgreSQL。すべての商用リージョンと GovCloud (US) |

:::details そもそも GuardDuty の RDS Protection とは？
**Amazon GuardDuty** は、AWS アカウントの中のあやしい動きを自動で見つけて知らせてくれる脅威検出サービスです。その中の **RDS Protection** は、データベース（Aurora / RDS）向けの機能です。

| 名前 | ひとことで |
|---|---|
| RDS Protection（ログインアクティビティ） | 以前からある機能。普段と違う場所からのログインや、総当たりのログインを見つける |
| RDS Protection for data activity | 今回の新機能。ログインのあとの「クエリの動き」を見る |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 見ているもの | ログイン | ログイン ＋ クエリのパターン |
| 見つけられる脅威 | 不正なログイン | データの持ち出し（Exfiltration）、データの破壊（Impact） |
| 見つけ方 | ― | 機械学習による異常検知 ＋ 脅威インテリジェンス |
| 導入の手間 | ― | エージェントやデータベースの設定変更は不要 |

**どんなときにうれしい？**
正しいパスワードが漏れて、ログインそのものは怪しく見えない場合でも、「いつもは数件しか読まないのに、テーブルを丸ごと読み出している」「大量に DELETE している」といった動きに気づけます。

:::message alert
ログインアクティビティの RDS Protection を有効にしたうえでの「追加機能（アドオン）」です。無料トライアルが終わると料金がかかるので、トライアル中に推定料金を確認しておきましょう。対象は今のところ PostgreSQL 系だけです。
:::

:::message
**確認ポイント**
GuardDuty コンソール →「保護プラン」→「RDS Protection」
キーワード: RDS Protection for data activity, Exfiltration, Impact
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/)
