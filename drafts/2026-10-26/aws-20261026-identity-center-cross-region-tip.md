---
title: "【2026/10/26 アップデート】Identity Center のユーザー ID の引き継ぎがリージョンをまたげる"
emoji: "☁️"
type: "tech"
topics: ["aws", "iam", "identitycenter"]
published: false
---

# はじめに

2026/10/26 に発表された「AWS IAM Identity Center がクロスリージョンの trusted identity propagation をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-iam-identity-center-cross-region-tip/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | trusted identity propagation（ユーザーの ID をリクエストと一緒に引き継ぐ仕組み）が、別のリージョンにあるサービスにも届くようになった |
| **料金** | 追加料金なし |
| **対象** | IAM Identity Center が使えるすべてのリージョン |

:::details そもそも IAM Identity Center と trusted identity propagation とは？
| 名前 | ひとことで |
|---|---|
| AWS IAM Identity Center | AWS の複数のアカウントやアプリに、1 つの ID でサインインできるようにするサービス |
| trusted identity propagation | ユーザーがアプリ経由でデータを使うとき、「誰が」使っているかをリクエストと一緒に後ろのサービスまで伝える仕組み。ユーザーやグループごとに権限を決めたり、記録を残したりできる |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| ID を伝えられる範囲 | 同じリージョンにあるサービスだけ | 別のリージョンにあるサービスにも |
| 別リージョンのサービスを使うには | 個人を区別できない広い IAM ロールで渡すか、全部を 1 つのリージョンにまとめる | ユーザー個人・グループ単位の権限と監査のまま使える |

**どんなときにうれしい？**
計算する場所とデータの置き場所が別のリージョンにある、空いている容量を求めて別のリージョンで処理する、災害対策で複数のリージョンに分けている、といった構成でも、「誰がどのデータを見たか」を個人単位で管理できます。

:::message alert
週刊AWS によると、使うにはマルチリージョン構成の IAM Identity Center と、マルチリージョンのカスタマーマネージド KMS キーが必要です（What's New には記載がないので、ドキュメントで確認するとよいです）。
:::

:::message
**確認ポイント**
IAM Identity Center のユーザーガイドの「Trusted identity propagation」と、リージョンの追加（マルチリージョン）の設定
キーワード: IAM Identity Center cross-Region trusted identity propagation
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/26週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261026/)
- [AWS IAM Identity Center がクロスリージョンの trusted identity propagation をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-iam-identity-center-cross-region-tip/)
