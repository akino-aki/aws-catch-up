---
title: "【2026/10/15 アップデート】Resilience Hub のテスト結果を DevOps Agent が分析してくれるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "resiliencehub", "devopsagent"]
published: false
---

# はじめに

2026/10/15 に発表された「AWS Resilience Hub の検出結果とテスト結果を AWS DevOps Agent でレビュー可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-devops-agent-test-results-aws-resilience-hub/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 障害に強いかを調べる Resilience Hub と、運用を手伝う AI の DevOps Agent がつながり、テスト結果や弱点の分析を AI に任せられるようになった |
| **料金** | 発表に記載なし |
| **対象** | 次世代の Resilience Hub。東京を含む 15 リージョン |

:::details そもそも Resilience Hub と DevOps Agent とは？
| 名前 | ひとことで |
|---|---|
| AWS Resilience Hub | アプリが障害に強いかを評価し、テストするためのサービス |
| 障害モード評価 | 「このサーバーが落ちたら」「このリージョンが止まったら」など、壊れ方ごとに弱点を洗い出す評価 |
| レジリエンステスト | わざと障害を起こして、ちゃんと復旧できるかを確かめるテスト |
| AWS DevOps Agent | 障害の原因調査などを手伝ってくれる AI エージェント |
| ARC のリージョン切り替え | Application Recovery Controller[^arc] で、アプリを別のリージョンに切り替える機能 |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| テストの結果 | レジリエンステストを実行すると DevOps Agent の調査が始まり、症状・根本原因・影響・実際に行われた復旧の操作をまとめた分析が出る |
| 弱点の検出結果 | 障害モード評価の検出結果から、その内容を引き継いだ状態で DevOps Agent と対話できる。質問しながら対策を考えられる |
| 始め方 | Resilience Hub コンソールでサービスを選び、サービスの設定で DevOps Agent を構成する |

**どんなときにうれしい？**
障害テストをしたあと、ログやメトリクスを自分で読み解いて報告をまとめるのは時間がかかります。AI が原因と影響を整理してくれるので、「何がうまくいかなかったか、次にどう直すか」を考えるところから始められます。

:::message alert
DevOps Agent 側の料金や、DevOps Agent が使えるリージョンは発表に書かれていません。使う前に DevOps Agent の料金ページを確認しましょう。
:::

:::message
**確認ポイント**
Resilience Hub コンソール → サービス → サービスの設定（DevOps Agent）、障害モード評価の検出結果、レジリエンステストの結果
キーワード: Resilience Hub DevOps Agent integration, failure mode assessment, resilience test
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
- [AWS Resilience Hub の検出結果とテスト結果を AWS DevOps Agent でレビュー可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-devops-agent-test-results-aws-resilience-hub/)

[^arc]: Amazon Application Recovery Controller。複数のリージョンやゾーンにまたがるアプリの切り替え・復旧を管理するサービス。
