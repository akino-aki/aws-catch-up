---
title: "【2026/11/2 アップデート】デスクトップ版の Amazon Quick に、Web 版と同じ方法でサインインできるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "quick"]
published: false
---

# はじめに

2026/11/2 に発表された「デスクトップ版 Amazon Quick で組織の既存の Amazon Quick のサインインを利用可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-quick-desktop-organization-sign-in/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Amazon Quick のデスクトップアプリに、Web 版と同じサインイン方法で入れるようになった。ID プロバイダー側の追加の設定がいらなくなった |
| **料金** | 発表では料金に触れていない |
| **対象** | Amazon Quick の全機能が使えるリージョン。IAM Identity Center、IAM フェデレーション、Quick のネイティブユーザーのどれでも |

:::details そもそも Amazon Quick とは？
| 名前 | ひとことで |
|---|---|
| Amazon Quick | 社内のデータや資料を使って、AI に質問したり、ダッシュボードを見たり、作業を自動化したりできる AWS のサービス |
| ID プロバイダー（IdP） | 「この人は誰か」を確かめてくれるサービス。Okta や Microsoft Entra ID など |
| OIDC | ログインの仕組みを外部のサービスに任せるときの標準の決まりごと[^oidc] |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 管理者の準備 | ID プロバイダーに、デスクトップ用の OIDC アプリケーションを別に登録する | Quick コンソールで「デスクトップコネクタ」を一度追加するだけ |
| 利用者のサインイン | デスクトップ用の別の方法 | Quick のアカウント名を入れて「Sign In」を押し、ブラウザでいつもどおりサインイン |
| 別の方法にしたい場合 | ― | これまでどおり、Entra ID・Google Workspace・Okta・Ping Identity を個別に設定することもできる |

**どんなときにうれしい？**
Web 版の Quick はもう使っていて、デスクトップアプリも使い始めたいとき。ID プロバイダーの管理者に頼んで設定を増やさなくても、Quick の画面だけで始められます。

:::message
**確認ポイント**
Amazon Quick のコンソール → 管理の画面でデスクトップコネクタの追加を探す
キーワード: Amazon Quick desktop connector sign-in
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
- [デスクトップ版 Amazon Quick で組織の既存の Amazon Quick のサインインを利用可能に](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-quick-desktop-organization-sign-in/)

[^oidc]: OpenID Connect の略。「Google でログイン」のように、別のサービスにログインを任せるときによく使われる。
