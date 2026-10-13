---
title: "AWS Client VPN が、つなぐ端末の安全性をチェックしてから接続を許可できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "vpn", "security"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/5 に発表された「AWS Client VPN がデバイスポスチャ評価をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-client-vpn-device-posture/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 「誰が」だけでなく「どの端末から」も確かめて、条件を満たす端末だけを VPN につなげるようになった |
| **料金** | 追加料金なし |
| **対象** | Client VPN が使えるすべてのリージョン。AWS VPN Client 6.2.0 以降 |

:::details そもそも AWS Client VPN とは？
AWS Client VPN は、PC から AWS の VPC[^vpc] へ安全につなぐためのリモートアクセス VPN です。在宅の PC から、VPC の中にあるサーバーへ社内ネットワークのようにアクセスできます。

| 名前 | ひとことで |
|---|---|
| デバイスポスチャ | 端末の「健康状態」。ディスクが暗号化されているか、セキュリティソフトの評価がどうか、など |
| デバイストラストプロバイダー | 端末の状態を見張っているサービス。今回は CrowdStrike・Jamf・JumpCloud に対応 |
| Cedar | AWS が作った、許可・拒否のルールを書くためのポリシー言語 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 確かめるもの | 人（証明書・SAML・Active Directory） | 人 ＋ 端末の状態 |
| 条件の書き方 | ― | Cedar ポリシーで書く。テスト用のツールあり |
| 接続中のチェック | ― | セッション中も繰り返し評価し、条件を外れたら切断 |
| お試し運用 | ― | 切断せずにログだけ取るモニタリングモードがある |

**どんなときにうれしい？**
「個人のノート PC や、暗号化されていない PC からは VPN につながせたくない」ようなとき。いきなり強制すると困る人が出るので、まずモニタリングモードで「どれくらいの端末が引っかかるか」を見てから本番にできるのも安心です。

:::message alert
CrowdStrike・Jamf・JumpCloud のどれかと連携しておく必要があります（それぞれのサービスの契約が別に必要）。利用者側の AWS VPN Client も 6.2.0 以降が必要です。
:::

:::message
**確認ポイント**
VPC コンソール →「Client VPN エンドポイント」→ エンドポイントの設定
キーワード: device posture, Cedar, monitoring mode
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Client VPN がデバイスポスチャ評価をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-client-vpn-device-posture/)

[^vpc]: Virtual Private Cloud。AWS の中に作る、自分専用のネットワーク。
