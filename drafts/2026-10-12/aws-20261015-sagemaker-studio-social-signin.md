---
title: "【2026/10/15 アップデート】Google や GitHub のアカウントで SageMaker Studio を始められるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "sagemaker"]
published: false
---

# はじめに

2026/10/15 に発表された「Amazon SageMaker Studio がソーシャルサインインに対応し、新規 AI/ML 開発者の利用開始を簡素化」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/sagemaker-studio-social-sign-in/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 新しく始める人が、Google・GitHub・Apple のアカウントでサインアップして、すぐに SageMaker Studio を使えるようになった |
| **料金** | AWS 無料利用枠のクレジットが付く。多くの場合クレジットカードの登録は不要。超えたら有料プランに切り替え、上限額を設定できる |
| **対象** | SageMaker Studio が使えるすべての商用リージョン |

:::details そもそも SageMaker Studio とは？
| 名前 | ひとことで |
|---|---|
| Amazon SageMaker Studio | 機械学習の開発をブラウザでまとめて行える作業場所（ノートブック、学習、デプロイなど） |
| 基盤モデル | 大量のデータで事前に学習済みの大きな AI モデル。自分のデータで調整（ファインチューニング）して使う |
| IAM | AWS で「誰が何をしてよいか」を決める仕組み |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 始め方 | AWS アカウントを作り、カードを登録し、コンソールで SageMaker を探し、環境と IAM を設定 | Google・GitHub・Apple のアカウントでサインアップすると、設定済みの Studio に直接入れる |
| クレジットカード | 必要 | 多くの場合不要 |
| チームでの利用 | IAM ユーザーや権限の設定が必要 | メールで招待し、相手は自分のメールでサインイン。モデルやノートブックを共有できる |
| GPU | ― | 確認済みの利用者は G5・G6・G6e・G4dn をクォータ申請なしで使える（これまでどおり） |

**どんなときにうれしい？**
Hugging Face で気になるモデルを見つけて、「ちょっと自分のデータで調整してみたい」と思ったとき。AWS の使い方を覚える前に、すぐに試せます。Hugging Face のモデルのページの「Deploy on SageMaker AI」などから入れます。

:::message alert
無料クレジットを超えると料金がかかります。有料プランに切り替えるときは、上限額（spend limit）を設定しておくと安心です。カード不要は「多くの場合」で、必ずではありません。
:::

:::message
**確認ポイント**
SageMaker Studio の製品ページの「Get Started」、Hugging Face のモデルページの「Customize and Deploy on SageMaker AI」
キーワード: SageMaker Studio sign in with Google, GitHub, Apple, spend limit
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
- [Amazon SageMaker Studio がソーシャルサインインに対応し、新規 AI/ML 開発者の利用開始を簡素化](https://aws.amazon.com/about-aws/whats-new/2026/10/sagemaker-studio-social-sign-in/)
