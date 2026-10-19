---
title: "【2026/10/14 アップデート】Lambda と EventBridge カスタムバスの無限ループを自動で止めてくれるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda", "eventbridge"]
published: false
---

# はじめに

2026/10/14 に発表された「AWS Lambda の再帰ループ検出が Amazon EventBridge カスタムイベントバスに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/lambda-recursive-loops-eventbridge-custom/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Lambda が EventBridge のカスタムイベントバス経由で自分自身を呼び続ける「無限ループ」を、Lambda が見つけて自動で止めるようになった |
| **料金** | 追加料金なし。最初から有効で設定不要 |
| **対象** | EventBridge カスタムイベントバスが使えるすべての商用リージョン |

:::details そもそも 再帰ループとは？
| 名前 | ひとことで |
|---|---|
| Amazon EventBridge | イベントを受け取って、ルールに合う送り先に配るサービス |
| カスタムイベントバス | 自分のアプリのイベントを流すために作る、専用のイベントの通り道 |
| 再帰ループ | Lambda が出したイベントで、また同じ Lambda が呼ばれ…と止まらなくなること。合わせ鏡のような状態 |
| 再帰ループ検出 | 同じイベントの連鎖で何度も呼ばれていることに Lambda が気づき、止めてくれる機能。これまで SQS・SNS・S3 などで使えた |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| EventBridge カスタムバス経由のループ | 自動では止まらない | 検出して自動で止める |
| 止まったとき | ― | AWS Health Dashboard に、直し方つきの通知が届く |
| わざとループさせたいとき | ― | PutFunctionRecursionConfig API で、関数ごとに検出をオフにできる |

**どんなときにうれしい？**
イベントルールの条件を書き間違えて、Lambda が出したイベントにまた同じ Lambda が反応してしまったとき。気づかないと一晩で大量に呼ばれ、思わぬ請求につながります。それを AWS 側で止めてくれる安全装置です。

:::message
**確認ポイント**
Lambda コンソール → 関数 → 設定 →「同時実行と再帰検出」、AWS Health Dashboard の通知
キーワード: Lambda recursive loop detection, EventBridge custom event bus, PutFunctionRecursionConfig
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/12週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261012/)
- [AWS Lambda の再帰ループ検出が Amazon EventBridge カスタムイベントバスに対応](https://aws.amazon.com/about-aws/whats-new/2026/10/lambda-recursive-loops-eventbridge-custom/)
