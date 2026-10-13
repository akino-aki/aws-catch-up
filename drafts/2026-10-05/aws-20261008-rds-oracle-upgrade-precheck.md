---
title: "RDS for Oracle でマイナーアップグレードの事前チェックを自分で実行でき、パッチ中の停止も短くしやすくなった"
emoji: "☁️"
type: "tech"
topics: ["aws", "rds", "oracle"]
published: false
---

# はじめに

2026/10/8 に発表された「Amazon RDS for Oracle がマイナーバージョンアップグレードのプリチェックとパッチ適用ダウンタイムを短縮するのに役立つ新しい RDS イベントをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-rds-oracle-minor-version-upgrade-precheck-new-patching-rds-event/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | アップグレードの前に「失敗しそうな原因がないか」を自分で確かめられるようになり、パッチ中に DB が使えるようになった瞬間もイベントで分かるようになった |
| **料金** | 追加料金なし（週刊AWS より） |
| **対象** | RDS for Oracle が使えるすべての商用リージョンと GovCloud (US) |

:::details そもそも RDS for Oracle のマイナーバージョンアップグレードとは？
**Amazon RDS for Oracle** は、Oracle Database を AWS が運用してくれるサービスです。Oracle のパッチ（マイナーバージョン）は、RDS がメンテナンスウィンドウ[^mw] の中で当ててくれます。

ただし、ストレージの空きが足りない・無効なオブジェクトやトリガーがある、などの問題があると、アップグレードは途中で止まってしまいます。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 事前チェック | アップグレードの中で実行されるだけ。問題が見つかると止まり、直して予定を組み直し | `rdsadmin.rdsadmin_precheck_tasks.precheck_minor_upgrade` で、好きなときに実行できる |
| チェックの影響 | ― | 読み取りだけで、動いている処理に影響しない。見つかった問題は 1 つのログにまとめて出る |
| パッチ中の再開の合図 | ― | DB が接続を受け付けるようになった時点で `RDS-EVENT-0596` が出る |

`RDS-EVENT-0596` のあとの残りの作業は、DB が動いたまま進みます。このイベントを RDS のイベント通知や EventBridge で受け取り、アプリを自動で再接続させれば、止まっている時間を短くできます。

**どんなときにうれしい？**
メンテナンスの前日に事前チェックを流して、問題を全部直しておけば、本番のメンテナンス時間に「アップグレードが止まってやり直し」にならずに済みます。

:::message
**確認ポイント**
RDS コンソール →「イベントサブスクリプション」で `RDS-EVENT-0596` を通知に入れる
キーワード: precheck_minor_upgrade, RDS-EVENT-0596
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Amazon RDS for Oracle がマイナーバージョンアップグレードのプリチェックとパッチ適用ダウンタイムを短縮するのに役立つ新しい RDS イベントをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-rds-oracle-minor-version-upgrade-precheck-new-patching-rds-event/)

[^mw]: AWS がパッチ適用などの作業をしてよい時間帯として、利用者が決めておく枠。
