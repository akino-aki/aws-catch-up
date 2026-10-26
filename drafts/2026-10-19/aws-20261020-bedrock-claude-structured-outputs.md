---
title: "【2026/10/20 アップデート】Bedrock の Claude で、決めた JSON の形どおりに答えさせられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "claude"]
published: false
---

# はじめに

2026/10/20 に発表された「Amazon Bedrock 上の Claude モデルで Structured Outputs が利用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/claude-structured-outputs-bedrock/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Bedrock の Claude で、こちらが決めた JSON Schema のとおりの JSON を必ず返させる Structured Outputs が使えるようになった |
| **料金** | What's New には記載なし（通常のモデル利用料金） |
| **対象** | Bedrock のすべての Claude モデル。Claude が使えるリージョンならどこでも |

:::details そもそも Structured Outputs とは？
| 名前 | ひとことで |
|---|---|
| JSON Schema[^schema] | 「この JSON には、こういう名前・型の項目がある」という決まりを書いたもの |
| Structured Outputs | モデルの答えを、指定した JSON Schema に必ず合う形にする機能 |
| bedrock-runtime | Bedrock の Converse API や InvokeModel API を呼ぶ、いつものエンドポイント（boto3 などから使う） |
| bedrock-mantle | Anthropic の Messages API と同じ形で Bedrock を呼べるエンドポイント |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| JSON で答えさせるには | プロンプトでお願いするだけ。形が崩れることがある | スキーマに合った JSON が返ることが保証される |
| アプリ側の処理 | 自前のパース・やり直し・中身のチェックが必要 | ほぼ不要になる |
| 使える API | ― | bedrock-runtime と bedrock-mantle の両方 |
| しくみ（週刊AWS の紹介より） | ― | 答え全体の形を決める方法と、ツール呼び出しの入力を検証する方法（strict tool use）の 2 つ。組み合わせも可 |

**どんなときにうれしい？**
契約書から「当事者・期間・金額」を抜き出す、問い合わせを内容ごとに振り分けるなど、AI の答えをそのままプログラムで使いたいときです。たまに JSON が壊れていてエラーになる、という心配がなくなり、やり直しのコードを書かずに済みます。

:::message
**確認ポイント**
Amazon Bedrock のドキュメントの Structured Outputs のページ、Converse API の出力形式の指定
キーワード: Amazon Bedrock Claude structured outputs, JSON Schema, strict tool use
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/19週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261019/)
- [Amazon Bedrock 上の Claude モデルで Structured Outputs が利用可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/claude-structured-outputs-bedrock/)

[^schema]: JSON の構造（項目名・型・必須かどうか）を、JSON で書き表すための標準の書き方。
