---
title: "AWS Config が記録できるリソースの種類が 77 個増えた"
emoji: "☁️"
type: "tech"
topics: ["aws", "config"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/7 に発表された「AWS Config が 77 の新しいリソースタイプをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-config-new-resource-types

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 設定の変更履歴を残せるリソースの種類が、新たに 77 種類増えた |
| **料金** | AWS Config の通常の料金（記録した設定項目の数などに応じてかかる） |
| **対象** | 各リソースが使えるすべてのリージョン |

:::details そもそも AWS Config とは？
AWS Config は、AWS のリソースの設定を記録し続けるサービスです。「いつ・誰が・どの設定を変えたか」をさかのぼれるほか、ルール（Config rules）を決めて「ルールに合っていないリソース」を見つけることもできます。

| 名前 | ひとことで |
|---|---|
| リソースタイプ | `AWS::EC2::Instance` のような、記録の対象になるリソースの種類 |
| 設定項目（CI） | ある時点のリソースの設定を 1 件として記録したもの。料金はこの件数で決まる |
| アグリゲーター | 複数のアカウント・リージョンの記録を 1 か所に集める仕組み |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| 追加された数 | 77 種類 |
| 主なサービス | Amazon Q Business、Amazon S3 Files、AWS PCS、メディア系サービス、GuardDuty・Inspector などのセキュリティ系 |
| 例 | `AWS::EC2::VPCCidrBlock`、`AWS::S3Files::FileSystem`、`AWS::QBusiness::Index`、`AWS::EKS::Capability`、`AWS::SSM::MaintenanceWindow` など |
| 使える機能 | 記録に加えて、Config rules とアグリゲーターでも使える |

**どんなときにうれしい？**
「メンテナンスウィンドウの設定がいつ変わったか」「VPC に CIDR がいつ追加されたか」など、これまで Config で追えなかったリソースの変更履歴を残したいとき。

:::message alert
「すべてのリソースタイプを記録する」設定にしている場合は、何もしなくても新しい 77 種類の記録が始まります。記録される件数が増えると料金も増えるので、影響を確認しておきましょう。
:::

:::message
**確認ポイント**
AWS Config コンソール →「設定」→「記録方法」で、すべてのリソースを記録しているか、特定のタイプだけかを確認
キーワード: AWS Config supported resource types, configuration item
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Config が 77 の新しいリソースタイプをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-config-new-resource-types)
