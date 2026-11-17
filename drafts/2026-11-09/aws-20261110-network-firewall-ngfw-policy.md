---
title: "【2026/11/10 アップデート】Network Firewall に、通信の許可と脅威の検知を分けた新しいポリシーができた"
emoji: "☁️"
type: "tech"
topics: ["aws", "networkfirewall", "security"]
published: false
---

# はじめに

2026/11/10 に発表された「AWS Network Firewall launches next-generation firewall policy」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/network-firewall-launches-ngfw-policy/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS Network Firewall に、新しいポリシーの形「次世代ファイアウォール（NGFW）ポリシー」が追加された |
| **料金** | 追加料金なし |
| **対象** | すべての商用リージョンと AWS GovCloud (US) |

:::details そもそも AWS Network Firewall とは？
| 名前 | ひとことで |
|---|---|
| AWS Network Firewall | VPC（AWS 上の自分専用のネットワーク）を出入りする通信を検査する、マネージドのファイアウォール |
| ファイアウォール | 「この相手とは通信してよい」を決める門番 |
| IPS | 侵入防止システム[^ips]。通信の中身から攻撃のパターンを見つけて止める |
| ルールグループ | ルールをまとめたもの。AWS やパートナーが用意して自動で更新してくれるもの（マネージド）もある |
:::

**今回なにが変わった？**

| | これまで（Classic ポリシー） | これから（NGFW ポリシー） |
|---|---|---|
| 仕組み | ステートレスとステートフルの 2 つのルールエンジン | アクセス制御（ファイアウォール）と脅威の検知（IPS）を分けて、順に通す |
| 初期の動き | ― | ファイアウォールは「許可したもの以外は拒否」、IPS は脅威だけを止める |
| ルールの容量 | 共有なので、片方を増やすともう片方が減る | ファイアウォールと IPS で別々の容量 |
| ルールの評価 | ― | すべてのルールが、接続の前後関係を見て判断する（ステートフル） |

**どんなときにうれしい？**
「決めたドメインにだけ通信を許可する」ルールと、「既知の攻撃を止める」ルールをきちんと分けて管理したいとき。IPS は AWS や AWS Marketplace のマネージドルールグループに任せれば、新しい脅威への対応も自動で更新されます。

:::message
既存のポリシーは変更なしでそのまま動きます。IPS のルールも互換性が保たれています。
:::

:::message
**確認ポイント**
VPC コンソール → Network Firewall → ファイアウォールポリシーの作成で、ポリシーの種類を見る
キーワード: AWS Network Firewall NGFW policy
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
- [AWS Network Firewall launches next-generation firewall policy](https://aws.amazon.com/about-aws/whats-new/2026/11/network-firewall-launches-ngfw-policy/)

[^ips]: Intrusion Prevention System の略。
