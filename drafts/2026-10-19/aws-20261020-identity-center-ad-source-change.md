---
title: "【2026/10/20 アップデート】IAM Identity Center で AD から ID ソースを変えても割り当てが残るように"
emoji: "☁️"
type: "tech"
topics: ["aws", "iam", "identitycenter"]
published: false
---

# はじめに

2026/10/20 に発表された「AWS IAM Identity Center が Active Directory からのアイデンティティソース変更を簡素化」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/iam-identity-center-chg-id-src-from-ad/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ID ソースを Active Directory から外部の IdP や Identity Center ディレクトリに切り替えても、ユーザー・グループ・割り当てを作り直さなくてよくなった |
| **料金** | 追加料金なし（IAM Identity Center は無料） |
| **対象** | IAM Identity Center の組織インスタンス。IAM Identity Center が使えるすべてのリージョン |

:::details そもそも IAM Identity Center と ID ソースとは？
| 名前 | ひとことで |
|---|---|
| IAM Identity Center | 1 回のログインで、複数の AWS アカウントやアプリに入れるようにするサービス（シングルサインオン） |
| ID ソース | 「誰がいるか（ユーザー・グループ）」の名簿をどこに置くか。Identity Center 自身・Active Directory・外部 IdP から 1 つ選ぶ |
| Active Directory（AD） | Windows の世界で広く使われている、ユーザーとパソコンを管理する名簿サービス |
| 外部 IdP | Okta や Microsoft Entra ID など、ログインを専門に扱うサービス |
| 許可セット | 「このアカウントでは何ができるか」をまとめた権限のセット |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| AD → 外部 IdP / Identity Center ディレクトリに変更 | ユーザー・グループ・割り当てが消え、作り直しが必要 | そのまま残る |
| 残るもの | ― | ユーザー、グループ、グループのメンバー、許可セットの割り当て、アプリの割り当て |
| ID | 作り直すと変わる | ユーザー ID・グループ ID・Identity Store ID が変わらない。ID を書いたポリシーもそのまま動く |
| 外部 → AD に変更 | ― | 今までどおり（今回の対象外） |

**どんなときにうれしい？**
社内の AD から Okta や Entra ID にログインの仕組みを移したいときです。これまでは切り替えた瞬間に全員の権限が消えるので、作り直しの手順を準備して一気に移す必要がありました。今回からは、名簿と権限を残したまま、ログインのしくみだけを入れ替えられます。

:::message alert
切り替えたあとは、ログインに使う URL がデュアルスタック（IPv4 と IPv6 の両方に対応）の AWS アクセスポータルの URL に変わります。利用者への案内が必要です。逆向き（外部 IdP などから AD への変更）では、これまでどおりデータが消えます。
:::

:::message
**確認ポイント**
IAM Identity Center コンソール → 設定 → ID ソース → 「ID ソースを変更」
キーワード: IAM Identity Center change identity source, dual-stack access portal URL
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
- [AWS IAM Identity Center が Active Directory からのアイデンティティソース変更を簡素化](https://aws.amazon.com/about-aws/whats-new/2026/10/iam-identity-center-chg-id-src-from-ad/)
