---
title: "【2026/11/17 アップデート】Bedrock で OpenAI の GPT-6.2 Astra と Sol が使えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "openai"]
published: false
---

# はじめに

2026/11/17 に発表された「OpenAI GPT-6.2 Astra, and GPT-6.2 Sol are now generally available on Amazon Bedrock」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/openai-gpt-6-2-astra-sol-amazon-bedrock/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | OpenAI の新しいモデル GPT-6.2 Astra と GPT-6.2 Sol が、Amazon Bedrock で一般提供になった |
| **料金** | What's New には記載なし（Bedrock の料金ページで確認） |
| **対象** | 対応リージョンは What's New に記載なし（Bedrock のドキュメントで確認） |

:::details そもそも Amazon Bedrock とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock | いろいろな会社の生成 AI モデルを、AWS の API からまとめて使えるサービス |
| 一般提供（GA） | お試し（プレビュー）ではなく、正式に使えるようになったこと |
| エージェントワークフロー | AI が自分で考えて、ツールを使いながら何段階もの作業を進める使い方 |

いろいろなメーカーの AI を、同じ窓口・同じ契約で使い分けられる「AI の売り場」のようなものです。
:::

**今回なにが変わった？**

| モデル | 向いている作業 | 特徴 |
|---|---|---|
| GPT-6.2 Astra | 複雑な課題の整理、調査、高度なコーディング、エージェントワークフロー | 最上位のモデル。文章と画像をまたいで考えられる。応答を速くする Ultrafast モードがある |
| GPT-6.2 Sol | ソフトウェアの実装やデバッグ、文書・データの分析、複数ステップの自動化 | 繰り返し大量にこなす作業向けで、1 件あたりの速さとコストを重視 |

**どんなときにうれしい？**
すでに AWS で権限管理やログの記録をしている環境のまま、OpenAI のモデルを試したいとき。難しい調べ物には Astra、量の多い定型作業には Sol、と使い分けられます。

:::message
**確認ポイント**
Bedrock コンソールのモデルカタログで OpenAI のモデルを探し、プレイグラウンドで試す
キーワード: Amazon Bedrock GPT-6.2 Astra Sol
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
- [OpenAI GPT-6.2 Astra, and GPT-6.2 Sol are now generally available on Amazon Bedrock](https://aws.amazon.com/about-aws/whats-new/2026/11/openai-gpt-6-2-astra-sol-amazon-bedrock/)
