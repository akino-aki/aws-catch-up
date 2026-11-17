---
title: "【2026/11/10 アップデート】Billing Conductor などのビューを 1 つの請求ビューにまとめられるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "billing", "costmanagement"]
published: false
---

# はじめに

2026/11/10 に発表された「AWS Billing and Cost Management now supports AWS Billing Conductor and AWS Billing Transfer views as source views for custom billing views」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-billing-and-cost-management-multi-source-custom-billing-views

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | カスタム請求ビューの元（ソース）として、Billing Conductor と Billing Transfer のビューを選び、複数をまとめられるようになった |
| **料金** | 追加料金なし |
| **対象** | すべての商用リージョン |

:::details そもそも請求ビューとは？
| 名前 | ひとことで |
|---|---|
| 請求ビュー（Billing View） | 請求データの「見え方」。どのアカウントやコストを見せるかを決めたもの |
| カスタム請求ビュー | 自分で範囲やフィルターを決めて作る請求ビュー。Cost Explorer や AWS Budgets で使える |
| AWS Billing Conductor | 請求をグループに分けて、独自の料金で計算し直せるサービス。AWS の再販や社内の部門別請求に使う |
| AWS Billing Transfer | 請求の支払いを、別の組織に移せる仕組み。転送の関係ごとにビューがある |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Billing Conductor のビュー | 請求グループごとに別々 | 複数の請求グループをまとめて 1 つのビューにできる |
| Billing Transfer のビュー | 転送の関係（お客様）ごとに別々 | 全お客様への転送コストや、お客様が見る請求額の合計を 1 つのビューで見られる |
| 使える場所 | ― | Cost Explorer、AWS Budgets、Billing and Cost Management コンソール |
| 共有 | ― | AWS Resource Access Manager（RAM）で、組織の内外のアカウントと共有できる |

**どんなときにうれしい？**
AWS を再販していて、全お客様の分をまとめて見たいとき。あるいは、請求グループを部門ごとに分けていて、複数の部門をまとめた費用（チャージバック[^chargeback]・ショーバック）を見たいとき。グループごとに画面を切り替える手間がなくなります。

:::message alert
ソースにできるのは、すでにアクセスできるビューだけです。今回の機能で、見られる範囲が広がるわけではありません。
:::

:::message
**確認ポイント**
Billing and Cost Management コンソール → Billing Views → カスタム請求ビューの作成で、ソースビューを選ぶ
キーワード: custom billing views source views Billing Conductor
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/9週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261109/)
- [AWS Billing and Cost Management now supports AWS Billing Conductor and AWS Billing Transfer views as source views for custom billing views](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-billing-and-cost-management-multi-source-custom-billing-views)

[^chargeback]: 使った費用を部門などに実際に請求すること。ショーバックは、請求はせずに金額を見せるだけのこと。
