---
title: "【2026/11/2 アップデート】Textract の文字を読み取るモデルが新しくなり、日本語にも対応した"
emoji: "☁️"
type: "tech"
topics: ["aws", "textract", "ocr"]
published: false
---

# はじめに

2026/11/2 に発表された「Amazon Textract のテキスト検出モデルを更新」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/textract-text-detection-model/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 書類の画像から文字を読み取るモデルが新しくなり、日本語を含む 40 以上の言語に対応。手書きや崩れた表も読み取りやすくなった |
| **料金** | 発表では料金の変更には触れていない（Textract の通常の料金） |
| **対象** | Textract が使えるすべてのリージョン。API は DetectDocumentText と AnalyzeDocument |

:::details そもそも Amazon Textract とは？
| 名前 | ひとことで |
|---|---|
| Amazon Textract | スキャンした書類や写真から、文字・表・フォームの項目を読み取る AWS のサービス（いわゆる OCR[^ocr] の進化版） |
| DetectDocumentText | 書類の中の文字を行・単語ごとに取り出す API |
| AnalyzeDocument | 文字に加えて、表やフォーム（「氏名: ○○」のような項目と値の組）の構造まで読み取る API |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 言語 | 英語や一部の欧州言語が中心 | 日本語・中国語・韓国語・アラビア語・ヒンディー語など 40 以上 |
| 手書き・長い単語 | 読み取りにくいことがあった | 精度が上がった |
| 表 | 結合セルや傾いた表で崩れやすかった | 結合セル、傾いた・回転した表、一部が欠けた表にも強くなった |
| 使い方 | ― | API のリクエストも結果の形も変わらない。自動で新しいモデルが使われる |

**どんなときにうれしい？**
日本語の請求書や申込書の画像から、文字や表を取り出して集計したいとき。これまでは日本語が対象外だったため別の仕組みを探す必要がありましたが、Textract の API をそのまま使えるようになります。

:::message alert
週刊AWS によると、同じ日に東京リージョンでも Textract が使えるようになりましたが、東京リージョンでは AnalyzeExpense（領収書）、AnalyzeID（身分証）、AnalyzeLending（ローン書類）と、クエリ機能のカスタマイズ（アダプター）はまだ使えません。
:::

:::message
**確認ポイント**
Textract コンソール → 「Try Amazon Textract」で日本語の書類画像をアップロードし、読み取り結果を確認
キーワード: Amazon Textract DetectDocumentText Japanese
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/2週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261102/)
- [Amazon Textract のテキスト検出モデルを更新](https://aws.amazon.com/about-aws/whats-new/2026/11/textract-text-detection-model/)

[^ocr]: Optical Character Recognition の略。画像に写った文字を、コンピューターで扱える文字データに変える技術。
