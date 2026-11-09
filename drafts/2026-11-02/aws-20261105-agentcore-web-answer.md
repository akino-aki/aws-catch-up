---
title: "【2026/11/5 アップデート】AgentCore に、Web を調べて出典付きで答えてくれるツール「Web Answer」ができた"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/11/5 に発表された「Amazon Bedrock AgentCore の Web Answer を発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/web-answer-amazon-bedrock/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 質問を渡すと、Web を調べて、出典付きの答えを 1 回の呼び出しで返してくれるツール「Web Answer」が一般提供になった |
| **料金** | ツールの呼び出し 1 回ごと（金額は料金ページを参照） |
| **対象** | 米国東部（バージニア北部）のみ |

:::details そもそも Amazon Bedrock AgentCore とは？
| 名前 | ひとことで |
|---|---|
| AI エージェント | 生成 AI が自分で考えて、ツールを使いながら作業を進めるプログラム |
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品（実行環境、記憶、ツールの窓口など）をそろえた AWS のサービス |
| AgentCore Gateway | エージェントが使うツールをまとめて公開する窓口 |
| MCP | AI エージェントがツールを呼び出すときの共通の決まりごと[^mcp] |
| Web Search | 6 月に出た、AgentCore の Web 検索のツール。検索結果を返す |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Web の情報で答える方法 | 検索・ページの読み込み・まとめ・出典付けの仕組みを自分で作る（Web Search は検索結果を返すところまで） | Web Answer に質問を渡すと、検索の計画、並列の検索、まとめ、出典付けまでして、答えを返す |
| 範囲の指定 | ― | 調べるドメインの許可リスト・拒否リスト、公開日での絞り込み |
| 使い方 | ― | AgentCore Gateway のターゲットとして追加し、MCP で呼ぶ。認証は IAM |

**どんなときにうれしい？**
「最新のニュースや製品情報を調べて答えるエージェント」を作りたいけれど、検索から要約までの仕組みを作り込むのは大変、というとき。信頼できるサイトだけに絞ることもできます。

:::message alert
今のところ、使えるのは米国東部（バージニア北部）リージョンだけです。
:::

:::message
**確認ポイント**
Bedrock AgentCore コンソール → Gateway → ターゲットの追加で Web Answer を探す
キーワード: Amazon Bedrock AgentCore Web Answer
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
- [Amazon Bedrock AgentCore の Web Answer を発表](https://aws.amazon.com/about-aws/whats-new/2026/11/web-answer-amazon-bedrock/)

[^mcp]: Model Context Protocol の略。AI とツールのつなぎ方を共通にするための仕様。
