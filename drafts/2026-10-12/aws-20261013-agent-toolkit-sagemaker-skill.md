---
title: "【2026/10/13 アップデート】SageMaker AI を扱う skill が Agent Toolkit for AWS に入った"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker", "aiagent"]
published: false
---

# はじめに

2026/10/13 に発表された「Agent Toolkit for AWS でコーディングエージェントが SageMaker AI の高度な専門知識を活用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/bring-sagemaker-ai-expertise-to-your-coding-agent/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Claude Code や Kiro などのコーディングエージェントが、SageMaker AI での学習・調整・デプロイを手伝えるようになる「AWS AI/ML skill」が、Agent Toolkit for AWS の標準のスキルになった |
| **料金** | skill 自体は無料。エージェントが使った AWS リソースの料金だけ |
| **対象** | Agent Toolkit for AWS（GitHub）。SageMaker Studio の JupyterLab には最初から入っている |

:::details そもそも Agent Toolkit と skill とは？
| 名前 | ひとことで |
|---|---|
| コーディングエージェント | Kiro、Claude Code、Codex、Cursor など、指示するとコードを書いたりコマンドを実行したりする AI |
| skill | エージェントに「この作業はこういう手順でやる」という専門知識を渡すための手順書のようなもの |
| Agent Toolkit for AWS | AWS を操作するための skill などをまとめた、エージェント向けの道具箱 |
| Amazon SageMaker AI | 機械学習モデルの学習・調整・デプロイを行うサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 提供場所 | AWS Labs（awslabs/agent-plugins）の skill・プラグイン | Agent Toolkit for AWS に一本化（ここだけが正式なサポート対象） |
| インストール | 別々に入れる | Toolkit からまとめて入れて、まとめて更新 |
| 扱える SageMaker AI の作業 | ― | 推論の最適化、モデルのカスタマイズ（ファインチューニング）、学習、MLflow での実験管理、JumpStart のモデルのデプロイ、データ加工（Processing ジョブ）など |

**どんなときにうれしい？**
機械学習に詳しくなくても、「このモデルを自分のデータで調整して、API として使えるようにして」とエージェントに頼むと、SageMaker AI の正しい手順に沿って進めてもらえます。インスタンスの選び方や設定の細かい決まりをエージェントが知っている状態になるのがポイントです。

:::message alert
skill は無料でも、エージェントが起動した学習ジョブやエンドポイント（GPU インスタンスなど）には料金がかかります。作ったものの停止・削除を忘れないようにしましょう。
:::

:::message
**確認ポイント**
GitHub の Agent Toolkit for AWS のリポジトリ、SageMaker Studio → JupyterLab でプリインストールされた skill
キーワード: Agent Toolkit for AWS, AWS AI/ML skill
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
- [Agent Toolkit for AWS でコーディングエージェントが SageMaker AI の高度な専門知識を活用可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/bring-sagemaker-ai-expertise-to-your-coding-agent/)
