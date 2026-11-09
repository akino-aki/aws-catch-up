---
title: "【2026/11/5 アップデート】Lambda durable functions の同時実行などの上限が 5〜10 倍に増えた"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda"]
published: false
---

# はじめに

2026/11/5 に発表された「AWS Lambda durable functions の実行と API のデフォルトクォータを引き上げ」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/lambda-durable-functions-default-quotas/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | durable functions で同時に動かせる実行の数や、API を呼べる回数の初期の上限が大きく引き上げられた |
| **料金** | 料金の変更はなし |
| **対象** | durable functions が使えるすべてのリージョン。バージニア北部・オレゴン・アイルランドは下の表の 2 倍 |

:::details そもそも Lambda durable functions とは？
| 名前 | ひとことで |
|---|---|
| AWS Lambda | サーバーを用意せずにプログラムを動かせるサービス。1 回の実行は最長 15 分 |
| durable functions | 途中経過を保存しながら、何日もかかる処理を Lambda で書ける機能。待っている間は計算の料金がかからない |
| チェックポイント | 処理の途中経過を保存すること。失敗しても続きから再開できる |
| クォータ | AWS が決めている、使える量の上限 |
:::

**今回なにが変わった？**

| 上限 | これまで | これから |
|---|---|---|
| アカウントで同時に動いている実行の数 | 100 万 | 500 万 |
| 実行を始める呼び出し | 毎秒 300 | 毎秒 3,000 |
| CheckpointDurableExecution・GetDurableExecutionState | 毎秒 1,000 | 毎秒 10,000 |
| SendDurableExecutionCallback（Success・Failure・Heartbeat） | 毎秒 300 | 毎秒 3,000 |
| GetDurableExecution・StopDurableExecution | 毎秒 30 | 毎秒 300 |
| GetDurableExecutionHistory・ListDurableExecutionsByFunction | 毎秒 15 | 毎秒 150 |

**どんなときにうれしい？**
注文の処理や承認待ちのワークフローなど、たくさんの「途中で待つ処理」を同時に動かしたいとき。引き上げの申請をしなくても、最初から大きな規模で使えます。

:::message
**確認ポイント**
Service Quotas コンソール → AWS Lambda で durable functions のクォータを確認。Lambda デベロッパーガイドの「Lambda quotas」
キーワード: Lambda durable functions quotas
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/2週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261102/)
- [AWS Lambda durable functions の実行と API のデフォルトクォータを引き上げ](https://aws.amazon.com/about-aws/whats-new/2026/11/lambda-durable-functions-default-quotas/)
