---
title: "IAM Identity Center のユーザー情報（Identity Store）に、どこから操作できるかの制限をかけられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "iam", "security"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/5 に発表された「AWS IAM Identity Center が Identity Store のネットワークアクセス制御をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-identity-store-network-controls/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ユーザーやグループを操作する API を、決めた VPC や IP アドレスからしか呼べないようにできるようになった |
| **料金** | 発表には記載なし |
| **対象** | IAM Identity Center が使えるすべてのリージョン |

:::details そもそも IAM Identity Center と Identity Store とは？
**IAM Identity Center** は、複数の AWS アカウントやアプリへ 1 つのログインで入れるようにするサービスです。そのユーザーとグループの名簿が **Identity Store** です。

| 名前 | ひとことで |
|---|---|
| Identity Store API | 名簿（ユーザー・グループ）を読み書きする AWS の API |
| SCIM API | Okta や Entra ID などの外部の IdP[^idp] から、名簿を自動で同期するための API。SCIM[^scim] という標準の決まりに沿っている |
| VPC エンドポイント | インターネットを通らずに、VPC から AWS の API を呼ぶための出入口 |
:::

**今回なにが変わった？**

| | Identity Store API | SCIM API |
|---|---|---|
| VPC エンドポイント経由を必須にする | できる | ― |
| 送信元の VPC をしぼる | できる | ― |
| 許可する IP の範囲を決める | できる | できる |

2 つの API に別々のルールをかけられます。たとえば「Identity Store API は VPC エンドポイント経由だけ、SCIM は IdP が公開している IP からだけ」のようにできます。設定は CLI か SDK から `UpdateIdentityStore` API で行い、初期状態は無効です。AWS のサービスが代わりに呼ぶリクエストは制限の対象外です。

**どんなときにうれしい？**
SCIM のトークンが万一漏れても、IdP の IP 以外からは使えないので、勝手にユーザーを作られるといった被害を防ぎやすくなります。「決まったネットワークの外からはデータに触れさせない」という考え方（データペリメーター）を、名簿にも広げられます。

:::message alert
制限をかける前に、正規の呼び出し元（IdP の IP、使っている VPC エンドポイントなど）を必ず洗い出しておきましょう。漏れがあると、同期や管理操作が止まってしまいます。
:::

:::message
**確認ポイント**
コンソールではなく AWS CLI で設定する（`aws identitystore update-identity-store` 系のコマンド）
キーワード: Identity Store network access controls, UpdateIdentityStore, SCIM
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS IAM Identity Center が Identity Store のネットワークアクセス制御をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-identity-store-network-controls/)

[^idp]: Identity Provider。ユーザーの ID とパスワードを管理して、ログインを担当するサービス。
[^scim]: System for Cross-domain Identity Management。サービス間でユーザー情報を同期するための標準の決まり。
