---
title: "【2026/11/18 アップデート】IAM account access manager が管理ポリシーで始めやすくなった"
emoji: "☁️"
type: "tech"
topics: ["aws", "iam", "identitycenter"]
published: false
---

# はじめに

2026/11/18 に発表された「AWS IAM account access manager is now even easier to deploy and use」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/iam-account-access-manager-easier/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | IAM account access manager を使い始めるための AWS 管理ポリシー 3 つ、IaC での設定、外部の ID 管理製品との連携が追加された |
| **料金** | 追加料金なし |
| **対象** | すべての商用リージョン（デフォルトで有効なもの） |

:::details そもそも IAM account access manager とは？
| 名前 | ひとことで |
|---|---|
| IAM ロール | 「この操作をしてよい」という権限のセット。人やプログラムが一時的に借りて使う |
| IAM Identity Center | 複数の AWS アカウントへのログインを、1 か所でまとめて管理するサービス |
| IAM account access manager | Identity Center のユーザーやグループに、各アカウントにすでにある IAM ロールを割り当てて、アクセスを管理する機能 |
| AWS 管理ポリシー | AWS があらかじめ用意してくれている、よく使う権限のセット |

利用者のカード（Identity Center のユーザー）に、どの部屋の合鍵（IAM ロール）を持たせるかを、まとめて決められる仕組みです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 必要な権限 | Identity Center、Organizations、KMS、IAM などにまたがるポリシーを自分で組み立てる | 役割に合った AWS 管理ポリシーを付けるだけ |
| 管理ポリシー | ― | 全体の管理者向け `AWSAccountAccessManagerAdministrator`、割り当て担当向け `AWSAccountAccessManagerEntitlementManager`、監査向け `AWSAccountAccessManagerReadOnlyAccess` |
| IaC[^iac] | ― | CloudFormation、Terraform、Pulumi で設定できる |
| 外部製品との連携 | ― | Okta、PingIdentity、Cisco Duo、SailPoint など 10 社の製品に、割り当てた内容が反映される |

**どんなときにうれしい？**
複数のアカウントを持っていて、「誰がどのアカウントで何をできるか」をまとめて管理したいとき。最初の権限づくりでつまずきにくくなり、設定をコードで残して再現できるようになります。

:::message
**確認ポイント**
IAM コンソールの AWS 管理ポリシーで `AWSAccountAccessManager` を検索する
キーワード: IAM account access manager managed policies
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/16週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261116/)
- [AWS IAM account access manager is now even easier to deploy and use](https://aws.amazon.com/about-aws/whats-new/2026/11/iam-account-access-manager-easier/)

[^iac]: Infrastructure as Code の略。サーバーや権限などの設定を、コード（設定ファイル）で書いて管理するやり方。
