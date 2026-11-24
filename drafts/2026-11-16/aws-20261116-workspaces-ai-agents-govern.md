---
title: "【2026/11/16 アップデート】WorkSpaces for AI agents で、エージェント用の環境作りと見張りが楽になった"
emoji: "☁️"
type: "tech"
topics: ["aws", "workspaces", "aiagent"]
published: false
---

# はじめに

2026/11/16 に発表された「Set up, connect, and govern AI agents faster with Amazon WorkSpaces」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-workspaces-AI-agents-connect-govern

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AI エージェントが使うクラウドのデスクトップを、作る・つなぐ・あとから確かめる、の 3 つが楽になる機能がまとめて追加された |
| **料金** | What's New には記載なし（WorkSpaces の料金ページで確認） |
| **対象** | Amazon WorkSpaces for AI agents（対応リージョンは What's New に記載なし） |

:::details そもそも Amazon WorkSpaces for AI agents とは？
| 名前 | ひとことで |
|---|---|
| Amazon WorkSpaces | クラウド上の Windows や Linux のデスクトップを、ネット越しに使えるサービス |
| WorkSpaces for AI agents | そのデスクトップを、人ではなく AI エージェントに使わせるための仕組み（2026 年 6 月に一般提供） |
| コンピューターユース | AI が画面を見て、マウスやキーボードを操作してアプリを使うこと |
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品をそろえた AWS のサービス |

人のために用意する「会社の PC」を、AI エージェントのためにも用意できる、というイメージです。
:::

**今回なにが変わった？**

| | 内容 |
|---|---|
| 環境作り | Claude Code、Codex、Kiro などの AI コーディングアシスタントに必要なことを伝えると、AWS MCP skills の案内で WorkSpace を組み立ててくれる |
| AgentCore との接続 | AgentCore で作ったエージェントを、エージェント側のコードを書かずにつなげる |
| 操作の効率 | 一連の操作を 1 回の呼び出しでまとめて実行でき、モデルがもともと知っている操作方法も使える |
| サインイン | これまでの SAML に加えて、OIDC[^oidc] に対応した ID プロバイダーでもサインインできる |
| 代理でのサインイン | エージェントが、サインインした人の ID・権限・グループポリシーのまま、その人の代わりに作業できる |
| 操作の記録 | 画面の記録を動画にし、エージェントがやったことを平易な文章にしたものと一緒に、自分の S3 バケットに自分の鍵で暗号化して保存できる（週刊AWS ではパブリックプレビューと紹介） |

**どんなときにうれしい？**
画面操作が必要な定型作業を AI エージェントに任せてみたいとき。誰の代わりに何をしたのかを記録と動画であとから確かめられるので、エージェントに任せる範囲を広げるときの安心材料になります。

:::message
**確認ポイント**
WorkSpaces コンソールの AI エージェント向けの設定と、セッションの記録の設定
キーワード: Amazon WorkSpaces for AI agents on-behalf-of session replay
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
- [Set up, connect, and govern AI agents faster with Amazon WorkSpaces](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-workspaces-AI-agents-connect-govern)

[^oidc]: OpenID Connect の略。ログインの仕組みを共通にするための標準的な決まりごと。
