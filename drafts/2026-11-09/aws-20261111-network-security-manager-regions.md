---
title: "【2026/11/11 アップデート】WAF の保護を自動化する Network Security Manager が東京・大阪に対応"
emoji: "☁️"
type: "tech"
topics: ["aws", "waf", "security"]
published: false
---

# はじめに

2026/11/11 に発表された「AWS Network Security Manager now available in AWS European Sovereign Cloud and Additional New Regions」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/network-security-mgr-eu-sovereign-cloud/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS Network Security Manager が、European Sovereign Cloud と、東京・大阪を含む 31 リージョンで使えるようになった |
| **料金** | 発表には記載なし（Network Security Manager の料金ページを参照） |
| **対象** | European Sovereign Cloud と 31 リージョン（東京、大阪、シンガポール、フランクフルトなど） |

:::details そもそも Network Security Manager とは？
| 名前 | ひとことで |
|---|---|
| AWS WAF | Web アプリへの攻撃（不正なリクエスト）を止めるファイアウォール |
| AWS Shield Advanced | 大量の通信で相手を止める攻撃（DDoS[^ddos]）から守る、有料の保護 |
| Application Load Balancer（ALB） | インターネットからの通信を、裏のサーバーに振り分ける入り口 |
| AWS Network Security Manager | ALB などのインターネットに公開されたリソースに、WAF や Shield Advanced の保護を自動で付けて、ずっと同じ状態に保ってくれるサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 日本のリージョン | 使えなかった | 東京・大阪で使える |
| European Sovereign Cloud | 使えなかった | 使える（WAF と Shield に対応） |
| 追加されたリージョン | ― | 南北アメリカ 7、アジアパシフィック 14、ヨーロッパ 8、中東・アフリカ 2 の計 31 |

**どんなときにうれしい？**
アカウントやロードバランサーが増えるたびに、WAF の設定を手で付けて回るのが大変なとき。保護のルールを 1 か所で決めておけば、新しいリソースにも自動で適用され、誰かが設定を変えてしまった（ドリフト[^drift]）ときも見つけて直してくれます。

:::message
**確認ポイント**
Network Security Manager のコンソールで、セキュリティポリシーの作成と対象のアカウント・リソースの指定
キーワード: AWS Network Security Manager, AWS WAF, configuration drift
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
- [AWS Network Security Manager now available in AWS European Sovereign Cloud and Additional New Regions](https://aws.amazon.com/about-aws/whats-new/2026/11/network-security-mgr-eu-sovereign-cloud/)

[^ddos]: Distributed Denial of Service の略。たくさんの場所から一斉に通信を送りつけて、サービスを使えなくする攻撃。
[^drift]: 決めておいた設定と、実際の設定がずれてしまうこと。
