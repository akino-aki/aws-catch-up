---
title: "【2026/11/18 アップデート】Aurora DSQL で、実行された SQL を監査ログとして残せるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "aurora", "dsql"]
published: false
---

# はじめに

2026/11/18 に発表された「Amazon Aurora DSQL now supports audit logging」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-aurora-dsql-audit-logging/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Aurora DSQL のクラスターで実行された SQL を、誰が・いつ・何をしたか付きで記録し、S3 に JSON で届けられるようになった |
| **料金** | 監査ログ用の料金表は What's New に記載なし。DSQL の DPU、CloudWatch Logs の配信、S3 の保存の料金がかかる |
| **対象** | Aurora DSQL が使えるすべてのリージョン |

:::details そもそも Aurora DSQL とは？
| 名前 | ひとことで |
|---|---|
| Amazon Aurora DSQL | サーバーの管理がいらず、複数のリージョンにまたがって動かせる PostgreSQL 互換のデータベース |
| 監査ログ | 「誰が、いつ、どんな操作をしたか」をあとから確かめるための記録 |
| DDL / DML / DCL | テーブルを作る・変える命令 / データを読み書きする命令 / 権限を与える・取り上げる命令 |
| CloudWatch Vended Logs | AWS のサービスが出すログを、S3 などへ届けてくれる仕組み |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 記録できたこと | CloudTrail で「誰がクラスターに接続したか」まで | 接続したあとに実行された DDL、DML、DCL、SELECT も記録できる |
| 記録の中身 | ― | SQL の全文、バインドパラメータ[^bind]、実行した人（PostgreSQL のロールと IAM の両方）、時刻、テーブル名、トランザクション ID |
| 届け先 | ― | CloudWatch Vended Logs 経由で S3 バケットに、構造化された JSON で届く |
| 設定 | ― | SQL の設定 1 つで有効にできる。拡張機能もログ転送の仕組みも不要 |

**どんなときにうれしい？**
「このデータを消したのは誰？」をあとから確かめたいときや、問題が起きたあとに何が起きたかを時系列で追いたいとき。S3 に JSON で届くので、Athena などでの検索にもつなげやすいです。

:::message alert
すべての SQL を記録するとログの量が増え、DSQL の DPU、CloudWatch Logs、S3 のそれぞれに料金がかかります。
:::

:::message
**確認ポイント**
Aurora DSQL のユーザーガイドの監査ログのページで、有効にするための SQL の設定を確かめる
キーワード: Aurora DSQL audit logging CloudWatch vended logs
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
- [Amazon Aurora DSQL now supports audit logging](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-aurora-dsql-audit-logging/)

[^bind]: SQL の中の `?` や `$1` の部分に、あとから当てはめる値のこと。
