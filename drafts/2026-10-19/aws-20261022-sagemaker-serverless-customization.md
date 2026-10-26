---
title: "【2026/10/22 アップデート】SageMaker AI のサーバーレスな追加学習で Qwen 3.8 などが使えるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker", "machinelearning"]
published: false
---

# はじめに

2026/10/22 に発表された「Amazon SageMaker AI が Muse Glimmer、Qwen 3.8、Ministral 3 モデルのサーバーレスモデルカスタマイズをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-sagemaker-muse-qwen-ministral/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | GPU を自分で用意せずにモデルを追加学習できる SageMaker AI のサーバーレスカスタマイズで、Muse Glimmer・Qwen 3.8・Ministral 3 が選べるようになった |
| **料金** | 使った分だけの従量課金 |
| **対象** | バージニア北部・オレゴン・東京・アイルランドの 4 リージョン |

:::details そもそもモデルのカスタマイズとは？
| 名前 | ひとことで |
|---|---|
| ファインチューニング | すでに賢いモデルに、自分のデータで追加の学習をさせて、特定の用途に合わせること |
| SFT（教師ありファインチューニング） | 「この質問にはこう答える」という正解例を見せて学ばせる |
| DPO（直接選好最適化） | 「こっちの答えのほうが良い」という好みの比較を見せて学ばせる |
| RFT（強化ファインチューニング） | 答えに点数を付けて、点数が上がるように学ばせる |
| LoRA[^lora] | モデル全体ではなく、小さな追加部分だけを学習させる軽いやり方 |
| サーバーレス | 学習用のサーバー（GPU）の準備や片付けを AWS がやってくれること |
:::

**今回なにが変わった？**

| | 今回追加されたモデル |
|---|---|
| Meta | Muse Glimmer |
| Alibaba | Qwen 3.8 27B |
| Mistral AI | Ministral 3（3B / 8B / 14B） |

これらで SFT・DPO・RFT を、LoRA でも全体の学習でも選べます。使い方は SageMaker Studio の Models ページ、SageMaker Python SDK、コーディングアシスタント用の SageMaker AI Agent スキルの 3 通りです。

**どんなときにうれしい？**
自分の分野の言葉づかいや答え方を覚えさせた小さめのモデルを作りたいときです。GPU クラスタを借りて設定する手間がなく、東京リージョンで試せるので、データを国内に置いたまま気軽に追加学習を試せます。

:::message alert
従量課金なので、学習データの量や回数が増えるほど料金が増えます。全体を学習させるやり方は LoRA より費用がかかりやすいので、まずは小さなモデルと LoRA で試すのが安全です。
:::

:::message
**確認ポイント**
SageMaker Studio → Models → 対象のモデル → Customize
キーワード: SageMaker AI serverless model customization, SFT DPO RFT, LoRA
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/19週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261019/)
- [Amazon SageMaker AI が Muse Glimmer、Qwen 3.8、Ministral 3 モデルのサーバーレスモデルカスタマイズをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-sagemaker-muse-qwen-ministral/)

[^lora]: Low-Rank Adaptation の略。学習させるパラメータが少ないので、速く安く済む。
