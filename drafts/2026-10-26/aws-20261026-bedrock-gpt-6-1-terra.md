---
title: "【2026/10/26 アップデート】Bedrock で OpenAI の GPT-6.1 Terra が使えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "openai"]
published: false
---

# はじめに

2026/10/26 に発表された「OpenAI GPT-6.1 Terra が Amazon Bedrock で一般提供開始」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | OpenAI の GPT-6 ファミリーの、性能・速さ・料金のバランス型モデル「GPT-6.1 Terra」が Bedrock で一般提供になった |
| **料金** | トークンの単価は、GPT-6.1 Sol や GPT-5.6 Terra より入力・出力とも 50% 以上安い（具体的な金額は Bedrock の料金ページ） |
| **対象** | 対応リージョンは Bedrock のドキュメントを参照 |

:::details そもそも Amazon Bedrock とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock | いろいろな会社の生成 AI のモデルを、AWS の API から同じように呼び出せるサービス |
| コンテキストウィンドウ | モデルが一度に読める入力の長さ。トークン[^token]の数で表す |
| GPT-6.1 Terra | OpenAI の GPT-6 ファミリーのうち、日常的な作業向けのバランス型（Terra）の最新モデル |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| 特徴 | 画像を細かく読み取る力、コンピュータの操作、事実の正確さ、自然な文章が GPT-5.6 Terra より良くなった |
| 評価 | OpenAI の Agents' Last Exam で GPT-5.6 Terra より 15 ポイント高く、GPT-6 Astra と同じくらい。タスクを終えるのは GPT-6 Astra や GPT-6.1 Sol の 3 倍以上速い |
| 入力 | テキストと画像。最大 100 万トークン |
| 使い方 | Bedrock の API から直接、または ChatGPT Work や Codex の裏側のモデルとして Bedrock 上のものを指定 |

**どんなときにうれしい？**
提案書の下書き、図面の読み取り、コードベースの調査など、毎日たくさん使う作業で、最上位のモデルほどの料金をかけずに十分な性能がほしいとき。AWS の権限管理や呼び出しの記録の仕組みもそのまま使えます。

:::message
**確認ポイント**
Bedrock コンソール → モデルカタログで GPT-6.1 Terra を探し、対応リージョンと料金を確認
キーワード: Amazon Bedrock GPT-6.1 Terra
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
- [OpenAI GPT-6.1 Terra が Amazon Bedrock で一般提供開始](https://aws.amazon.com/about-aws/whats-new/2026/10/openai-gpt-6-1-terra-on-amazon-bedrock/)

[^token]: AI のモデルが文章を処理する単位。英語ならだいたい 1 単語、日本語なら 1〜2 文字くらい。
