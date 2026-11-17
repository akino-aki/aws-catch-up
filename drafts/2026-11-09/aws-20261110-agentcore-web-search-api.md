---
title: "【2026/11/10 アップデート】AgentCore の Web 検索が、準備なしの API 1 回で呼べるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/11/10 に発表された「Amazon Bedrock AgentCore now offers a Web Search API」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-bedrock-agentcore-web-search-api/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AgentCore の Web 検索を、Gateway を作らずに API（InvokeWebSearch）1 回で呼べるようになった |
| **料金** | 1,000 クエリあたり 7 USD（Gateway 経由と同じ。Gateway の料金はかからない） |
| **対象** | バージニア北部、オハイオ、オレゴン、シドニー、東京、アイルランド |

:::details そもそも Amazon Bedrock AgentCore とは？
| 名前 | ひとことで |
|---|---|
| AI エージェント | 生成 AI が自分で考えて、ツールを使いながら作業を進めるプログラム |
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品（実行環境、記憶、ツールの窓口など）をそろえた AWS のサービス |
| AgentCore Gateway | エージェントが使うツールをまとめて公開する窓口 |
| MCP | AI エージェントがツールを呼び出すときの共通の決まりごと[^mcp] |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 呼び出し方 | AgentCore Gateway 経由の MCP ツールとしてだけ | API（InvokeWebSearch）を直接呼べる |
| 事前の準備 | Gateway とターゲットを作る | リソースの作成は不要 |
| 料金 | 検索の料金 ＋ Gateway の料金 | 検索の料金だけ（1,000 クエリあたり 7 USD） |
| 返ってくるもの | ― | Amazon が運営する Web のインデックスから、順位付けされた結果（本文の抜粋、タイトル、URL、公開日時） |
| 絞り込み | ― | ドメインや公開日時で絞り込める |

**どんなときにうれしい？**
自作のエージェントやデータ処理のプログラムから、手軽に Web 検索を使いたいとき。AWS SDK や CLI から呼べて、権限は IAM で管理できます。PrivateLink で VPC の中から呼んだり、CloudTrail に記録を残したりもできます。

:::message
**確認ポイント**
AWS CLI で bedrock-agentcore の invoke-web-search を探す
キーワード: Amazon Bedrock AgentCore InvokeWebSearch
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/9週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261109/)
- [Amazon Bedrock AgentCore now offers a Web Search API](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-bedrock-agentcore-web-search-api/)

[^mcp]: Model Context Protocol の略。AI とツールのつなぎ方を共通にするための仕様。
