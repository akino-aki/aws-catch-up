---
title: "【2026/11/9 アップデート】Anthropic の新モデル Claude Fable 5.2 が Bedrock で使えるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "claude"]
published: false
---

# はじめに

2026/11/9 に発表された「Claude Fable 5.2 is now available on AWS」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/claude-fable-5-2-aws/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Anthropic の生成 AI モデル Claude Fable 5.2 が、Amazon Bedrock と Claude Platform on AWS で使えるようになった |
| **料金** | 発表には記載なし（Bedrock の料金ページを参照） |
| **対象** | Amazon Bedrock / Claude Platform on AWS。リージョンは Bedrock のドキュメントを参照 |

:::details そもそも Amazon Bedrock と Claude とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock | いろいろな会社の生成 AI モデルを、AWS の API で呼び出せるサービス |
| Claude | Anthropic が作っている生成 AI モデルのシリーズ |
| Claude Platform on AWS | Anthropic のプラットフォームを AWS 経由で契約して使える提供形態 |
| Claude Mythos 5.2 | Fable 5.2 と同じモデルで、サイバーセキュリティや生物学の能力を制限していない版。審査を通った利用者だけが使える |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| 新しいモデル | Claude Fable 5.2。Anthropic が一般提供しているモデルの中で、技術的な仕事に最も強いものの 1 つ |
| 得意なこと | ソフトウェア開発、科学研究、金融など。人の手を借りずに数時間〜数日かけて作業を続けられる |
| データの扱い | 安全性の監視のためにデータの保持が必要な「covered model」に指定されている |

**どんなときにうれしい？**
複数のリポジトリにまたがる大きな開発作業や、長時間かかる調査を AI エージェントに任せたいとき。AWS の請求や権限管理のまま、最新のモデルを使えます。

:::message alert
Fable 5.2 は covered model なので、安全性の監視のために入力・出力のデータが一定期間保持されます。週刊AWS の紹介では、Bedrock では Data Retention API で保持モードを設定する必要があるとされています。Enterprise Frontier Safeguards が使えるようになるまでは、対象の利用者はゼロデータ保持でも使えます。
:::

:::message
**確認ポイント**
Amazon Bedrock コンソール → モデルカタログで Claude Fable 5.2 を探す
キーワード: Claude Fable 5.2 Amazon Bedrock, covered model, Data Retention API
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/9週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261109/)
- [Claude Fable 5.2 is now available on AWS](https://aws.amazon.com/about-aws/whats-new/2026/11/claude-fable-5-2-aws/)
