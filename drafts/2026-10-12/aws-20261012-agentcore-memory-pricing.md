---
title: "【2026/10/12 アップデート】AgentCore の短期メモリの料金が、件数ではなくデータ量で決まるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/10/12 に発表された「Amazon Bedrock AgentCore の短期メモリで取り込み・取得・ストレージのデータ量に基づく従量課金制を導入」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/agentcore-memory-consumption-based-pricing/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AI エージェントの「短期メモリ」の料金が、イベント件数の定額から、書き込み・読み出し・保存のデータ量に応じた料金に変わった |
| **料金** | 書き込み 1.00 USD/GB、読み出し 0.20 USD/GB、保存 0.10 USD/GB-月 |
| **対象** | AgentCore Memory が使えるすべてのリージョン。長期メモリの料金は変わらない |

:::details そもそも AgentCore Memory とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品（実行環境・メモリ・認証など）をまとめたサービス |
| AgentCore Memory | エージェントが会話の内容などを覚えておくための記憶の置き場所 |
| 短期メモリ（STM） | 1 回の会話の中のやり取りをそのまま覚えておくもの。メモ帳のようなもの |
| 長期メモリ（LTM） | 会話をまたいで、ユーザーの好みなどを要約して覚えておくもの |
| イベント | 短期メモリに書き込む 1 回分のデータ（ユーザーの発言 1 つ、など） |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 料金の決まり方 | イベントの件数（1,000 イベントあたり 0.25 USD） | 書き込み・読み出し・保存のデータ量 |
| 書き込み・読み出し | ― | 1 イベントを最小 12 KB、最大 64 KB として計算 |
| 保存 | ― | 各イベントの実際のサイズで計算 |
| 長期メモリ | ― | 変更なし |

**どんなときにうれしい？**
短いメッセージを何度もやり取りするチャット型のエージェント。発表では、ほとんどの使い方で安くなり、とくに 1 回のデータが小さい使い方ほど下がり幅が大きいとされています。保存期間（TTL[^ttl]）を短くすれば、保存の料金も抑えられます。

:::message alert
料金の計算方法そのものが変わるので、使い方によっては高くなる可能性もあります。1 イベントのサイズと、読み出す回数を見積もってから確認しましょう。
:::

:::message
**確認ポイント**
AgentCore の料金ページ、Billing and Cost Management の Cost Explorer で AgentCore Memory の利用量
キーワード: AgentCore Memory short-term memory pricing, ingestion, retrieval, storage
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
- [Amazon Bedrock AgentCore の短期メモリで取り込み・取得・ストレージのデータ量に基づく従量課金制を導入](https://aws.amazon.com/about-aws/whats-new/2026/10/agentcore-memory-consumption-based-pricing/)

[^ttl]: Time To Live。データを保存しておく期間。過ぎると自動で消える。
