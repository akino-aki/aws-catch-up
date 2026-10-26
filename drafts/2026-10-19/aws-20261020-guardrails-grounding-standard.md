---
title: "【2026/10/20 アップデート】Bedrock ガードレールの根拠チェックに Standard tier が加わった"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "generativeai"]
published: false
---

# はじめに

2026/10/20 に発表された「Amazon Bedrock Guardrails が contextual grounding checks の Standard tier をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/bedrock-guardrails-grounding-standard/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 生成 AI の答えが「渡した資料に基づいているか」を確かめる機能に、会話調や推論を含む答えも評価できる Standard tier が加わった |
| **料金** | Classic tier と同じ（週刊AWS の紹介では 1,000 テキストユニットあたり 0.10 USD） |
| **対象** | 東京を含む 11 リージョン。ガードレールプロファイルによるクロスリージョン推論が必要 |

:::details そもそも Bedrock Guardrails と contextual grounding checks とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock Guardrails | 生成 AI の入力と出力をチェックして、不適切な内容や危ない答えを止める「安全柵」 |
| contextual grounding checks | 答えが、渡した資料（参照情報）に基づいているか・質問に合っているかを点数にする機能。ハルシネーション[^hallucination]を見つけるのに使う |
| tier | 機能の「グレード」。Guardrails ではコンテンツフィルターなどにも Classic と Standard がある |
| クロスリージョン推論 | 処理を複数のリージョンに振り分けて、混雑しにくくするしくみ |
:::

**今回なにが変わった？**

| | Classic tier | Standard tier（新しい） |
|---|---|---|
| 得意な答え | 要約・言い換え・質問への答えなど、資料に厳密に沿うもの | ＋ 推論の過程や会話調の内容を含む答え |
| 言い回しが違うが意味は同じ答え | 点数がぶれることがある | より安定して評価できる |
| 対応言語 | 限られる | コンテンツフィルターなどの Standard tier と同じ範囲（週刊AWS の紹介では日本語を含む 80 以上） |
| 料金 | ― | Classic と同じ |
| 切り替え | ― | ガードレールごとに選ぶ。既存のガードレールは変更するまで Classic のまま |

**どんなときにうれしい？**
社内文書を参照して答えるチャットボットで、答えが資料にない内容を言っていないかを確かめたいときです。これまでは会話っぽい答えだと正しく評価しにくく、日本語にも向いていませんでしたが、Standard tier なら日本語のチャットボットにも使いやすくなります。

:::message alert
Standard tier を使うには、ガードレールでガードレールプロファイルを使ったクロスリージョン推論を有効にする必要があります。処理が他のリージョンで行われることがあるので、データの置き場所に決まりがある場合は確認が必要です。
:::

:::message
**確認ポイント**
Amazon Bedrock コンソール → ガードレール → 編集 → contextual grounding check の tier 選択
キーワード: Bedrock Guardrails contextual grounding Standard tier, guardrail profile cross-Region inference
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
- [Amazon Bedrock Guardrails が contextual grounding checks の Standard tier をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/bedrock-guardrails-grounding-standard/)

[^hallucination]: 生成 AI が、もっともらしいがまちがった内容を答えてしまうこと。
