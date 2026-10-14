---
title: "【2026/10/7 アップデート】Claude Haiku 5.5 が Bedrock などで使えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "claude"]
published: false
---

# はじめに

2026/10/7 に発表された「Claude Haiku 5.5 が AWS で利用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/claude-haiku-5-5-aws/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Claude 5.5 ファミリーでいちばん速くて安いモデルが、AWS から使えるようになった |
| **料金** | 入力 $0.10 / 100 万トークン、出力 $0.50 / 100 万トークンから（週刊AWS より）。Anthropic によると多くのタスクで Haiku 4.5 より約 75% 安い |
| **対象** | Amazon Bedrock と Claude Platform on AWS。リージョンはドキュメントを参照 |

:::details そもそも Claude Haiku とは？
Claude は Anthropic の生成 AI モデルです。大きさの違う 3 種類があり、Haiku はその中で最も小さく、速くて安いモデルです。

| 名前 | ひとことで |
|---|---|
| Opus | いちばん賢い。難しい計画や判断向け |
| Sonnet | 中くらい |
| Haiku | 速くて安い。大量の処理や、ほかのモデルの手足（サブエージェント）向け |
:::

**今回なにが変わった？**

| | Haiku 4.5 | Haiku 5.5 |
|---|---|---|
| 性能 | ― | コーディング・ツール利用・コンピューター操作・エージェントの作業で大きく向上 |
| コスト | ― | 多くのタスクで約 75% 安い（Anthropic による） |
| effort パラメータ[^effort] | なし | Haiku で初めて対応（low / medium / high / xhigh / max） |
| コンテキスト / 最大出力 | ― | 100 万トークン / 128K トークン（週刊AWS より） |

**使う入口が 2 つある**

| 入口 | 向いている場合 |
|---|---|
| Amazon Bedrock | データを AWS の中・特定のリージョンに留めたい。Guardrails や Knowledge Bases など AWS の機能と組み合わせたい |
| Claude Platform on AWS | Anthropic 本家の API・機能をそのまま使いたい。請求と認証は AWS にまとめたい |

**どんなときにうれしい？**
問い合わせの分類、要約、書類から項目を抜き出すといった、件数が多くて 1 件ごとは簡単な処理。Opus に計画を立てさせ、細かい作業を Haiku に任せる、という分担にも向いています。

:::message
**確認ポイント**
Amazon Bedrock コンソール →「モデルカタログ」→ Anthropic → Claude Haiku 5.5
キーワード: Claude Haiku 5.5, effort, Claude Platform on AWS
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Claude Haiku 5.5 が AWS で利用可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/claude-haiku-5-5-aws/)

[^effort]: モデルがどれくらい「考える」かの度合いを指定するパラメータ。低くすると速く安く、高くすると時間とトークンを使ってより丁寧に考える。
