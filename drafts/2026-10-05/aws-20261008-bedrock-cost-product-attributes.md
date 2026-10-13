---
title: "Cost Explorer や Budgets で、Bedrock の料金をモデルごと・プロバイダーごとに分けて見られるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "costexplorer"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/8 に発表された「AWS Cost Explorer、Budgets、Dashboards が Amazon Bedrock の product attributes に対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-bedrock-attributes-in-cost-explorer/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | タグを付けていなくても、Bedrock の料金を「どのモデルにいくら」の単位で分けて見られるようになった |
| **料金** | 追加料金なし |
| **対象** | GovCloud (US) と中国（北京・寧夏）を除くすべてのリージョン |

:::details そもそも Cost Explorer・Budgets・Dashboards とは？
| 名前 | ひとことで |
|---|---|
| AWS Cost Explorer | 料金をグラフで見て、サービス別・期間別などに分けて分析する画面 |
| AWS Budgets | 予算を決めて、超えそうになったら通知する機能 |
| Cost Management Dashboards | 料金のグラフを並べた、自分用のダッシュボード |
| ディメンション | 料金を「何で分けるか」の切り口。サービス、リージョン、タグなど |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Bedrock の料金の分け方 | 細かく分けるには、事前にタグなどの準備が必要 | product attributes（製品属性）という切り口が追加された |
| 使える属性 | ― | モデル（例: Claude Sonnet 5）、モデルプロバイダー（例: Anthropic）、推論タイプ（例: 入力トークン・出力トークン）、機能（例: オンデマンド推論・リランカー） |
| Cost Explorer / Dashboards | ― | 属性でグループ化・フィルターができる |
| Budgets | ― | 属性で予算をしぼれる（例: 「Anthropic のモデルだけで月 $50」） |

コスト配分タグや IAM プリンシパルのタグと組み合わせると、「どのアプリ・どのユーザーが、どのモデルにいくら使ったか」まで分けられます。

**どんなときにうれしい？**
いろいろなモデルを試しているうちに Bedrock の料金が増えてきたとき。「出力トークンの高いモデルが原因だった」などがすぐ分かるので、安いモデルへの切り替えを考えやすくなります。

:::message
**確認ポイント**
「請求とコスト管理」→「Cost Explorer」→ サービスで Bedrock にしぼり、グループ化の項目に product attributes が出るか見る
キーワード: Bedrock product attributes, Cost Explorer
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Cost Explorer、Budgets、Dashboards が Amazon Bedrock の product attributes に対応](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-bedrock-attributes-in-cost-explorer/)
