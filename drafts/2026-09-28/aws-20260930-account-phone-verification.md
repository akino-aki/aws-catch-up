---
title: "【2026/9/30 アップデート】AWS アカウントの連絡先の電話番号を SMS で検証できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "security"]
published: false
---

# はじめに

2026/9/30 に発表された「AWS アカウントが電話番号の検証をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/aws-accounts-phone-number-verification/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | アカウントに登録した電話番号が本物かどうかを、SMS で確かめられるようになった |
| **料金** | 記載なし |
| **対象** | すべての商用リージョン |

:::details そもそも何の話？
AWS アカウントには、連絡先として電話番号を登録する欄があります。アカウントの復旧や、AWS からの重要な連絡に使われます。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 確認の内容 | 番号の形式が正しいかだけ | SMS の 6 桁の確認コードで、本当につながる番号かを確かめる |
| AWS Organizations | ― | 管理アカウントで確認済みの番号を、配下のアカウントに引き継げる |

**どんなときにうれしい？**
アカウントを復旧するときや、AWS から重要な連絡を受けるときに、確実につながる番号になっていることを保証できます。

:::message
**確認ポイント**
コンソール右上のアカウント名 →「アカウント」→「連絡先情報」
自分のアカウントでもすぐに確認できます
:::

# ✍️ 自分の調査・勉強結果

**検証環境で確認しようとしたら、連絡先情報が見られなかった**

検証に使ったアカウント（AWS Organizations のメンバーアカウント、AdministratorAccess）で、右上のアカウント名 →「アカウント」→「連絡先情報」を開きました。ところが、`account:GetContactInformation` の権限がないというエラーになり、電話番号も検証状態も表示されませんでした。代替連絡先も「アクセス拒否」です。

![連絡先情報が権限エラーで表示されない画面](/images/aws-20260930-account-phone-verification/account-contact-info-denied.png)

AdministratorAccess でも拒否されるので、組織側の SCP[^scp-phone] でアカウント設定の操作が止められているのだと思います。

**ドキュメントで分かったこと**

| 項目 | 内容 |
|---|---|
| 検証のしかた | 今登録されている番号に、SMS で 6 桁のコードが届く。番号を入力して始めるわけではない |
| コードの有効期限 | 5 分。再送すると、前のコードは使えなくなる |
| 状態の確認 | `GetContactInformation` の `VerificationStatus` が `VERIFIED` / `UNVERIFIED` / `NOT_SUPPORTED` になる |
| 単独のアカウント・管理アカウント | 新しい API の `SendPhoneNumberVerification` と `VerifyPhoneNumber` で検証する（CLI の例が載っている） |
| Organizations のメンバーアカウント | 管理アカウントの Organizations コンソールから検証する。コードはメンバーアカウントに登録された番号に届く |
| 権限の注意 | `AWSOrganizationsFullAccess` には、検証用の 2 つの権限が含まれていない |

つまり、メンバーアカウントの番号を検証するのは管理アカウント側の作業で、メンバーアカウントの利用者からは手が出せません。

**あとでやること**

個人の AWS アカウントで、CloudShell から `aws account get-contact-information --query VerificationStatus` を実行して状態を見る。そのあと、自分の携帯にコードを送って検証してみる。

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [AWS アカウントが電話番号の検証をサポート](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-accounts-phone-number-verification/)

[^scp-phone]: サービスコントロールポリシー。Organizations の管理者が、配下のアカウントで「この操作は誰であっても禁止」と決められる上限のルール。
