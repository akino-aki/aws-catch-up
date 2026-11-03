---
title: "【2026/10/30 アップデート】SageMaker AI の推論で 1 つの GPU を分けて複数のモデルを載せられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker", "gpu"]
published: false
---

# はじめに

2026/10/30 に発表された「Amazon SageMaker AI 推論がリアルタイムエンドポイントで GPU パーティショニングをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/sagemaker-gpu-partitioning/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | SageMaker AI のリアルタイム推論が、NVIDIA MIG による GPU の分割に対応した。1 つの GPU を最大 7 つに分けて、それぞれに別のモデルを載せられる |
| **料金** | What's New には記載なし（インスタンスの料金は通常どおり） |
| **対象** | P4d・P5・G7・G7e インスタンス。東京・バージニア北部・オハイオ・オレゴン・シンガポール・フランクフルト・アイルランド |

:::details そもそも SageMaker AI の推論と MIG とは？
| 名前 | ひとことで |
|---|---|
| Amazon SageMaker AI | 機械学習のモデルを作ったり、動かして使えるようにしたりするサービス |
| リアルタイムエンドポイント | モデルに問い合わせると、すぐ答えが返ってくる窓口 |
| inference component | 1 つのエンドポイントに複数のモデルを載せるときの、モデルごとの単位 |
| NVIDIA MIG（Multi-Instance GPU） | 1 つの GPU を、メモリも計算の力もきっちり区切った複数の GPU のように分ける技術 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 1 つのモデルに割り当てる GPU | GPU 1 つを丸ごと | GPU を分けたうちの 1 つ（最大 7 つに分割） |
| 1 台に載せられるモデルの数 | GPU の数まで | GPU の数より多く |
| モデルどうしの影響 | ― | ハードウェアで区切られるので、忙しいモデルが隣のモデルのメモリや速さを奪わない |
| アプリの変更 | ― | 不要（これまでどおりモデルの名前で呼び出す） |

**どんなときにうれしい？**
埋め込みのモデル、並べ替え（リランカー）、分類器のような小さめのモデルをいくつも動かしているとき。どのモデルも GPU を使い切れていないのに、モデルの数だけ GPU を払っていた状態から、1 つの GPU にまとめて費用を下げられます。

:::message
**確認ポイント**
SageMaker AI の開発者ガイドの、inference component を使うエンドポイントでの GPU パーティショニングの設定
キーワード: SageMaker AI GPU partitioning, MIG, inference components
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
- [Amazon SageMaker AI 推論がリアルタイムエンドポイントで GPU パーティショニングをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/sagemaker-gpu-partitioning/)
