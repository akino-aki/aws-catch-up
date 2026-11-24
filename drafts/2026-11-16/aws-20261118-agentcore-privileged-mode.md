---
title: "【2026/11/18 アップデート】AgentCore のランタイムインスタンスで、エージェントを root 権限で動かせるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/11/18 に発表された「AgentCore runtime instances now support privileged mode」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/agentcore-elevated-privileges/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AgentCore Runtime のインスタンス型で、エージェントにシステムのソフトのインストールやコンテナの実行を許す privileged mode が使えるようになった |
| **料金** | privileged mode 専用の料金は What's New に記載なし（AgentCore の料金ページで確認） |
| **対象** | AgentCore のランタイムインスタンスが使えるすべてのリージョン |

:::details そもそも AgentCore のランタイムインスタンスとは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock AgentCore Runtime | AI エージェントのプログラムを動かす場所を、AWS が用意してくれる機能 |
| ランタイムインスタンス | そのうち、エージェントを EC2 インスタンスの上で動かす方式。準備・パッチ・増減は AgentCore が面倒を見る |
| root 権限 | そのマシンで何でもできる、いちばん強い権限 |
| ネストしたコンテナ | コンテナの中で、さらに Docker などのコンテナを動かすこと |

ふだんは「貸し出し PC の一般ユーザー」として動くエージェントに、必要なときだけ「管理者」の権限を渡せるようになった、というイメージです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 権限 | 標準モード（STANDARD）だけ | エージェントのランタイムを作る・更新するときに privileged mode を選べる |
| できること | ― | システムのパッケージのインストール、コンテナイメージのビルド、Docker や containerd でのコンテナの実行 |
| 影響の範囲 | ― | privileged なエージェントは 1 つのセッション（インスタンス）を独り占めし、強い権限はそのインスタンスの中だけにとどまる |
| 既存のエージェント | ― | 標準モードのまま変わらない |

**どんなときにうれしい？**
コーディングエージェントに、Postgres や Redis をコンテナで立ち上げて結合テストまで走らせたいとき。古いアプリを作り直すエージェントが、必要なコンパイラーやライブラリを自分で入れたいときにも使えます。

:::message alert
AWS は、ほとんどのエージェントには標準モードを使い、ソフトのインストールやコンテナの実行がどうしても必要なときだけ privileged mode を使うよう勧めています。
:::

:::message
**確認ポイント**
AgentCore コンソールでエージェントのランタイムを作るときの、コンピュートの種類と権限の設定
キーワード: AgentCore runtime instances privileged mode
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
- [AgentCore runtime instances now support privileged mode](https://aws.amazon.com/about-aws/whats-new/2026/11/agentcore-elevated-privileges/)
