---
title: "【2026/11/19 アップデート】AWS Transform で、移行の最初から最後までをアプリ単位で管理できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "awstransform", "migration"]
published: false
---

# はじめに

2026/11/19 に発表された「AWS Transform extends application-centric migration across the lifecycle」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-transform-application-centric-migration

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS Transform の移行で、調査・計画・移行・検証・進み具合の確認のすべてを、サーバー単位ではなくアプリケーション単位で扱えるようになった |
| **料金** | What's New には記載なし（AWS Transform の料金ページで確認） |
| **対象** | AWS Transform が使えるすべてのリージョン |

:::details そもそも AWS Transform とは？
| 名前 | ひとことで |
|---|---|
| AWS Transform | サーバーやアプリを AWS へ移す・作り直す作業を、AI エージェントが手伝ってくれるサービス |
| ディスカバリー | 今あるサーバーや、その間の通信を調べて一覧にすること |
| TCO | Total Cost of Ownership の略。使い続けるのにかかる費用の合計 |
| ウェーブ | 一度に全部ではなく、いくつかのまとまりに分けて順番に移すときの 1 回分 |

引っ越しにたとえると、「段ボール何箱」ではなく「台所一式」「寝室一式」のように、使う単位でまとめて計画・確認できるようになった、というイメージです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 扱う単位 | 主にサーバー単位 | 調査から進み具合の確認まで、アプリケーション単位 |
| アプリのまとまり | ― | ディスカバリーのデータから、アプリの境界と依存関係を見つけてグループにする。グループごとに TCO と移行の状況を追える |
| アプリの持ち主の確認 | ― | 組み込みのアンケートで、持ち主・システムの境界・重要度を確かめてもらえる |
| ダッシュボード | ― | ワークスペースの全ジョブから、アプリ、一覧、評価、ウェーブの計画、移行の状況を集めて表示。カスタマイズやチャットでの質問もできる |

**どんなときにうれしい？**
たくさんのサーバーを移すとき、「このアプリはもう移し終わった？」を、関係するサーバーを 1 台ずつ確かめずに答えられます。移す順番の判断も、アプリのまとまりで考えやすくなります。

:::message
**確認ポイント**
AWS Transform のワークスペースで、移行のダッシュボードとアプリケーションの一覧
キーワード: AWS Transform application-centric migration dashboard
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
- [AWS Transform extends application-centric migration across the lifecycle](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-transform-application-centric-migration)
