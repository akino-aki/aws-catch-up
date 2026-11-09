---
title: "【2026/11/5 アップデート】RDS for Oracle を、自分で運用している AD に直接参加させられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "rds", "oracle"]
published: false
---

# はじめに

2026/11/5 に発表された「Amazon RDS for Oracle がセルフマネージド Active Directory での Kerberos 認証に対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/rds-oracle-kerberos-self-managed-ad/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | RDS for Oracle の DB インスタンスを、自分で運用している Active Directory のドメインに直接参加させ、Kerberos でログインできるようになった |
| **料金** | セルフマネージドの AD を使うことに追加料金はなし |
| **対象** | RDS for Oracle が使えるすべての商用リージョン |

:::details そもそも Active Directory と Kerberos とは？
| 名前 | ひとことで |
|---|---|
| Active Directory（AD） | Microsoft の、ユーザーやパソコンをまとめて管理する仕組み。1 つの ID でいろいろなシステムに入れる |
| セルフマネージド AD | オンプレミスや EC2、他のクラウドなどで自分で運用している AD |
| AWS Managed Microsoft AD | AWS がお世話してくれる AD |
| Kerberos | AD で使われるログインの仕組み。パスワードを毎回送らず、「チケット」でログインする[^kerberos] |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 必要なもの | AWS Managed Microsoft AD を作り、自分の AD との間に信頼関係を設定 | 自分の AD に DB インスタンスを直接参加させるだけ |
| 設定の方法 | ― | コンソール、AWS CLI、AWS SDK |

**どんなときにうれしい？**
すでに自分の AD でユーザーを管理していて、Oracle のデータベースにも同じ ID でログインさせたいとき。AWS 側にもう 1 つディレクトリを用意したり、信頼関係を設定したりする手間がなくなります。

:::message
**確認ポイント**
RDS コンソール → Oracle の DB インスタンスの作成・変更で、「データベース認証」の Kerberos とセルフマネージド AD の設定を探す。RDS ユーザーガイドの「Working with self-managed Active Directory with an Amazon RDS for Oracle DB instance」
キーワード: RDS for Oracle Kerberos self-managed Active Directory
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
- [Amazon RDS for Oracle がセルフマネージド Active Directory での Kerberos 認証に対応](https://aws.amazon.com/about-aws/whats-new/2026/11/rds-oracle-kerberos-self-managed-ad/)

[^kerberos]: 一度ログインするとチケットがもらえ、そのチケットを見せることで、ほかのシステムにもパスワードを入れずに入れる仕組み。
