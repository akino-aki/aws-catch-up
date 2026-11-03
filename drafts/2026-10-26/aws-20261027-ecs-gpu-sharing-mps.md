---
title: "【2026/10/27 アップデート】ECS で 1 つの GPU を複数のタスクで分け合えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "ecs", "gpu"]
published: false
---

# はじめに

2026/10/27 に発表された「Amazon ECS が NVIDIA Multi-Process Service (MPS) による GPU 共有をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-gpu-sharing-nvidia-mps/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ECS が NVIDIA MPS による GPU の共有に対応し、1 つの GPU の上で複数の ECS タスクを同時に動かせるようになった |
| **料金** | What's New には記載なし |
| **対象** | ECS Managed Instances と ECS on EC2。すべての商用リージョンと GovCloud (US) |

:::details そもそも ECS と MPS とは？
| 名前 | ひとことで |
|---|---|
| Amazon ECS | コンテナを動かして管理してくれるサービス。動かす単位を「タスク」、その設計図を「タスク定義」と呼ぶ |
| ECS Managed Instances | ECS が EC2 のサーバーの用意や運用まで代わりにやってくれる使い方 |
| NVIDIA MPS（Multi-Process Service） | 1 つの GPU を複数のプログラムで同時に使えるようにする NVIDIA の仕組み。裏で「MPS デーモン」が動く |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 1 つの GPU で動かせるタスク | 1 つ | 複数 |
| 設定 | ― | タスク定義のコンテナ定義に、GPU 共有の方式と使う GPU メモリの量（必須）、GPU の計算の使用率の上限（任意）を書く |
| 配置 | ― | ECS が空きのある GPU にタスクを置く |
| MPS デーモンの管理 | ― | Managed Instances では ECS が見張り、調子が悪ければインスタンスごと入れ替えてタスクを移す |

**どんなときにうれしい？**
小さいモデルの推論や埋め込みの生成のように、GPU の力を少ししか使わない処理が複数あるとき。GPU 1 枚ずつに 1 つの処理を割り当てて大半を遊ばせていたのを、アプリのコードを変えずにまとめて載せられ、費用を抑えられます。

:::message
**確認ポイント**
ECS コンソール → タスク定義の作成で、コンテナの GPU の設定に共有（MPS）と GPU メモリの項目があるか
キーワード: Amazon ECS GPU sharing, NVIDIA MPS
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/26週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261026/)
- [Amazon ECS が NVIDIA Multi-Process Service (MPS) による GPU 共有をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-ecs-gpu-sharing-nvidia-mps/)
