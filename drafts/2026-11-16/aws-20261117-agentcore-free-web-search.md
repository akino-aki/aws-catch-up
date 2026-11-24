---
title: "【2026/11/17 アップデート】AgentCore の Web 検索に、毎月 5,000 回の無料枠ができた"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/11/17 に発表された「Amazon Bedrock AgentCore now offers free monthly web search queries」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/bedrock-agentcore-free-web-search-queries/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AgentCore の Web 検索に、月 5,000 クエリの無料枠が付いた。設定は不要で、自動で適用される |
| **料金** | 月 5,000 クエリまで無料。超えた分は通常の料金（週刊AWS によると 1,000 クエリあたり 7 USD） |
| **対象** | バージニア北部、オハイオ、オレゴン、アイルランド、シドニー、東京 |

:::details そもそも AgentCore の Web 検索とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品（実行環境、記憶、ツールの窓口など）をそろえた AWS のサービス |
| Web Search Tool | AgentCore Gateway からエージェントに渡せる、Web 検索のツール |
| Web Search API | Gateway を作らずに、API（InvokeWebSearch）で直接呼べる Web 検索 |

エージェントが「最新の情報を調べたい」ときに使う検索窓です。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 無料枠 | なし | 月 5,000 クエリ |
| 無料枠の範囲 | ― | Gateway の Web Search Tool と Web Search API で共通 |
| 共有のされ方 | ― | 対応リージョンと、AWS Organizations の全アカウントで共有。毎月リセット |
| 超えたとき | ― | 通常の料金で課金が続き、エージェントは止まらない |

**どんなときにうれしい？**
Web 検索を使うエージェントを、まずは小さく試したいとき。お試しの規模なら料金を気にせずに始められます。

:::message alert
無料枠は Organizations の全アカウントで共有されるので、ほかのアカウントでたくさん使っていると、自分の分の無料枠が早くなくなることがあります。超えた分は自動で課金されます。
:::

:::message
**確認ポイント**
Billing and Cost Management の請求書で、AgentCore の Web 検索の使用量を見る
キーワード: Amazon Bedrock AgentCore web search free tier
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
- [Amazon Bedrock AgentCore now offers free monthly web search queries](https://aws.amazon.com/about-aws/whats-new/2026/11/bedrock-agentcore-free-web-search-queries/)
