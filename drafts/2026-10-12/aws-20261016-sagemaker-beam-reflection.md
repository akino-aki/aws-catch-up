---
title: "【2026/10/16 アップデート】Reflection のオープンウェイトモデル Beam が SageMaker で使えるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker", "llm"]
published: false
---

# はじめに

2026/10/16 に発表された「Reflection の Beam モデルが Amazon SageMaker JumpStart と AWS Trainium で利用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/01/reflection-beam-on-sagemaker-jumpstart-and-aws-trainium/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AI 企業 Reflection の初めてのオープンウェイトモデル「Beam」が、SageMaker JumpStart からデプロイできるようになった。Trainium3 向けにも最適化されている |
| **料金** | 発表に記載なし（SageMaker AI のインスタンスなど、使った分の料金） |
| **対象** | SageMaker JumpStart のバージニア北部・オハイオ |

:::details そもそも JumpStart とオープンウェイトモデルとは？
| 名前 | ひとことで |
|---|---|
| Amazon SageMaker JumpStart | 公開されている AI モデルを選んで、数クリックで自分の AWS アカウントにデプロイできる機能 |
| オープンウェイトモデル | 学習済みの中身（重み）が公開されていて、自分の環境で動かしたり調整したりできる AI モデル |
| MoE（Mixture of Experts） | 中に多数の「専門家」を持ち、入力ごとに一部だけを使う作り。大きなモデルでも計算を軽くできる |
| AWS Trainium | AWS が自分で作った、AI の学習・推論用のチップ。Trainium3 はその新しい世代 |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| モデル | Reflection の Beam。週刊AWS によると、全体 501B・実際に使うのは 23B パラメータの MoE モデル |
| 得意なこと | コードの修正・生成・レビュー、多数のツールを使う複数ステップの作業、数学・科学の推論 |
| ライセンス | Apache 2.0。中身を確認したり、自分用に調整したりできる |
| 動かす場所 | 自分の AWS アカウントの中。データを外部の API に送らずに済む |
| Trainium3 | 最初から Trainium3 向けに移植・最適化されている |

**どんなときにうれしい？**
コーディングエージェントや自動化の仕組みを作りたいけれど、ソースコードなどのデータを外部の AI サービスに送りたくないとき。自分のアカウントの中でモデルを動かせ、SageMaker AI のセキュリティ設定や監査ログもそのまま使えます。

:::message alert
大きなモデルなので、デプロイには大きな GPU や Trainium のインスタンスが必要になり、動かしている間ずっと料金がかかります。試したあとはエンドポイントを削除しましょう。今のところバージニア北部とオハイオだけです。
:::

:::message
**確認ポイント**
SageMaker Studio → JumpStart →「Beam」で検索
キーワード: Reflection Beam, SageMaker JumpStart, Trainium3
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
- [Reflection の Beam モデルが Amazon SageMaker JumpStart と AWS Trainium で利用可能に](https://aws.amazon.com/about-aws/whats-new/2026/01/reflection-beam-on-sagemaker-jumpstart-and-aws-trainium/)
