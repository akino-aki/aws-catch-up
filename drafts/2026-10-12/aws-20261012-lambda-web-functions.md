---
title: "【2026/10/12 アップデート】Lambda に Web アプリをそのまま動かせる Lambda Web Functions が登場"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda", "serverless"]
published: false
---

# はじめに

2026/10/12 に発表された「AWS Lambda が Lambda Web Functions を発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-web-functions/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ポートで待ち受けて HTTP リクエストを直接さばく、新しい種類の Lambda が登場。Express や Hono がそのまま動く |
| **料金** | リクエスト数・実際に CPU を使った時間・確保しているメモリで課金。待ち時間の CPU は課金されない |
| **対象** | Node.js のみ。バージニア北部・オハイオ・オレゴン・東京・アイルランドの 5 リージョン |

:::details そもそも Lambda とは？
| 名前 | ひとことで |
|---|---|
| AWS Lambda | サーバーを用意せずに、コードを置くだけで動かせるサービス |
| Lambda Event Functions | これまでの Lambda の新しい呼び名。「イベントを 1 つ受け取って処理する」関数。名前が変わるだけで、コードの変更は不要 |
| Lambda Web Functions | 今回の新しい Lambda。普通の Web サーバーのようにポートで待ち受ける |
| Express / Hono | Node.js で Web アプリを作るときによく使うフレームワーク |
| 実行環境 | Lambda のコードが動く小さな箱。リクエストが来ると用意される |
:::

**今回なにが変わった？**

| | これまで（Event Functions） | これから（Web Functions） |
|---|---|---|
| コードの書き方 | Lambda 専用の「ハンドラー」関数を書く | ポートで待ち受ける普通の Web サーバー |
| Express などのフレームワーク | 変換用のアダプターが必要 | アダプターなしでそのまま動く |
| 同時に来たリクエスト | 1 つの実行環境で 1 つずつ | 1 つの実行環境で複数を同時に処理 |
| コールドスタート[^cold] | リクエストが増えるたびに起きやすい | 大幅に減る |
| 課金 | 実行時間 × メモリ | 実際に CPU を使った時間 ＋ 確保しているメモリ（DB の応答待ちの CPU は課金されない） |
| ストリーミング | 一部の方法でのみ | HTTP のストリーミングに標準で対応 |

**どんなときにうれしい？**
すでに Express や Hono で作った Web アプリや API を、ほぼそのままサーバーレスに載せたいとき。AI の推論 API のように、外部の応答を長く待つ処理では、待っている間の CPU 代がかからないので安くなりやすいです。サーバーサイドレンダリングの Web サイトや Webhook の受け口にも向いています。

:::message alert
今のところ Node.js だけ、5 リージョンだけです。1 つの実行環境で複数のリクエストを同時に処理するので、グローバル変数にリクエストごとのデータを入れるようなコードは見直しが必要になるかもしれません。
:::

:::message
**確認ポイント**
Lambda コンソール →「関数の作成」→ 関数の種類（Web Functions）、Lambda の料金ページ
キーワード: Lambda Web Functions, Lambda Event Functions, active CPU time
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
- [AWS Lambda が Lambda Web Functions を発表](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-web-functions/)

[^cold]: しばらく使われていない Lambda に最初のリクエストが来たとき、実行環境の準備で応答が遅くなること。
