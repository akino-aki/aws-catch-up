---
title: "【2026/10/13 アップデート】Lambda durable functions の操作数とチェックポイントの上限が上がった"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda", "serverless"]
published: false
---

# はじめに

2026/10/13 に発表された「AWS Lambda durable functions が durable operation 数とチェックポイントペイロードの上限を引き上げ」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-durable-gen-limit-increase/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | durable functions の 1 回の実行でできる操作の数と、途中経過として保存できるデータの大きさの上限が引き上げられた |
| **料金** | 発表に料金の変更の記載なし |
| **対象** | durable functions が使えるすべてのリージョン |

:::details そもそも Lambda durable functions とは？
| 名前 | ひとことで |
|---|---|
| Lambda durable functions | 何ステップもある処理を、途中で止まっても続きから再開できるように書ける Lambda の機能 |
| durable operation | 再開できるように記録される 1 つ 1 つの操作（ステップの実行、待機、並列の枝など） |
| チェックポイント | 「ここまで終わった」という途中経過の記録。ゲームのセーブのようなもの |
| ペイロード | チェックポイントに一緒に保存するデータ |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 1 回の実行あたりの操作数 | 3,000 | 30,000 |
| チェックポイント 1 つのサイズ | 256 KB | 1 MB |
| 1 MB を超えるデータ | ― | JavaScript・Python の SDK の FileSystem シリアライザーで、EFS か S3 Files に置いて場所だけを記録できる |

**どんなときにうれしい？**
何千件ものデータを 1 件ずつ処理するループや、外部の処理が終わるのを長時間ポーリングして待つ処理。1 MB は SQS・EventBridge・Lambda の非同期呼び出しで受け取れるイベントの最大サイズと同じなので、受け取ったイベントを丸ごと 1 回で保存できます。AI エージェントの長い会話履歴を保存したい場合にも向いています。

:::message alert
操作数には、ステップの再試行 1 回ずつ、待機中のポーリング 1 回ずつ、並列処理の枝 1 本ずつも数えられます。思ったより早く上限に届くことがあるので注意しましょう。
:::

:::message
**確認ポイント**
Lambda 開発者ガイドの durable functions のクォータのページ
キーワード: Lambda durable functions limits, durable operations, checkpoint payload, FileSystem serializer
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
- [AWS Lambda durable functions が durable operation 数とチェックポイントペイロードの上限を引き上げ](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-durable-gen-limit-increase/)
