---
title: "【2026/11/2 アップデート】Inspector で、起動する前の AMI の脆弱性を調べられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "inspector", "ec2"]
published: false
---

# はじめに

2026/11/2 に発表された「Amazon Inspector で EC2 の AMI の脆弱性スキャンが可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/ec2-amis-scanned-through-inspector/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | EC2 のサーバーのひな形（AMI）に入っているソフトの脆弱性を、インスタンスを起動せずに Inspector で調べられるようになった |
| **料金** | Inspector の料金ページを参照（発表には金額の記載なし） |
| **対象** | Inspector が使えるすべての商用リージョン |

:::details そもそも Amazon Inspector と AMI とは？
| 名前 | ひとことで |
|---|---|
| Amazon Inspector | EC2 やコンテナイメージ、Lambda に入っているソフトに、既知の脆弱性[^cve]がないかを自動で調べるサービス |
| AMI（Amazon マシンイメージ） | EC2 のサーバーを作るときの「ひな形」。OS や入れておいたソフトがまとまっている |
| EC2 Image Builder | AMI を作る手順を自動化するサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| AMI を調べる方法 | 一度インスタンスとして起動し、そのインスタンスを Inspector で調べる | AMI のまま調べられる |
| 調べ方 | ― | AMI の一覧を継続して調べる方法と、EC2 コンソールから特定の AMI を 1 回だけ調べる方法 |
| 範囲 | ― | 1 つのアカウントでも、組織全体でも有効にできる。結果は Security Hub にも届く |
| 配る前に止める | ― | 「許可された AMI」の設定や Image Builder のパイプラインと組み合わせて、基準を満たさない AMI を使わせない・配らないようにできる |

**どんなときにうれしい？**
自分で作った AMI を何台ものサーバーに配る前に、古いライブラリが残っていないかを確かめたいとき。起動してから問題に気付くのではなく、ひな形の段階で直せます。

:::message
**確認ポイント**
Inspector コンソール → 「アカウント管理」や「スキャン」の設定で AMI のスキャンを探す。EC2 コンソール → AMI の一覧で 1 回だけのスキャンを探す
キーワード: Amazon Inspector AMI scanning
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
- [Amazon Inspector で EC2 の AMI の脆弱性スキャンが可能に](https://aws.amazon.com/about-aws/whats-new/2026/11/ec2-amis-scanned-through-inspector/)

[^cve]: 公表されているソフトウェアの弱点のこと。CVE という番号で管理されていることが多い。
