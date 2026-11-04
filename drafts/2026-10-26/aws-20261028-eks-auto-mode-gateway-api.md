---
title: "【2026/10/28 アップデート】EKS Auto Mode が Kubernetes の Gateway API に対応した"
emoji: "☁️"
type: "tech"
topics: ["aws", "eks", "kubernetes"]
published: false
---

# はじめに

2026/10/28 に発表された「Amazon EKS Auto Mode が Kubernetes Gateway API をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-auto-mode-kubernetes-gateway-api/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | EKS Auto Mode が Kubernetes の Gateway API に対応し、クラスターで有効にすれば、Gateway や HTTPRoute などを書くだけで AWS のロードバランサー（ALB・NLB）が自動で用意されるようになった |
| **料金** | 機能自体は EKS Auto Mode に含まれる。作られたロードバランサーの通常の料金はかかる |
| **対象** | EKS Auto Mode が使えるすべてのリージョン |

:::details そもそも EKS Auto Mode と Gateway API とは？
| 名前 | ひとことで |
|---|---|
| Amazon EKS | Kubernetes（コンテナをまとめて動かす仕組み）を AWS で動かすサービス |
| EKS Auto Mode | サーバーやネットワークなど、クラスターの周りの準備まで AWS が自動でやってくれる EKS の使い方 |
| Ingress | これまでの、外からのアクセスをアプリに振り分けるための Kubernetes の設定 |
| Gateway API | Ingress の次の世代の、アクセスの振り分けの標準の書き方。Gateway（入口）と HTTPRoute（振り分けのルール）などに分かれている |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Gateway API を使うには | コントローラー（AWS Load Balancer Controller など）を自分で入れて設定する | クラスターの設定で有効にするだけ。コントローラーは入れなくてよい |
| Gateway API の定義（CRD[^crd]） | 自分で入れて、更新する | AWS に管理を任せる（Managed）か、自分で管理する（Unmanaged）かを選べる |
| できること | ― | HTTP・gRPC の振り分け（ALB）と TCP・UDP の振り分け（NLB）、名前空間をまたぐ振り分け、重み付けでの分割、ヘッダーでの振り分け、ACM の証明書の自動検出 |
| 既存の Ingress | ― | そのまま一緒に使える |

**どんなときにうれしい？**
新しいバージョンを 1 割のアクセスだけで試す、チームごとに名前空間を分けて入口は共有する、といった振り分けを、Kubernetes の標準の書き方でしたいとき。コントローラーの運用やアップデートの手間もなくなります。

:::message alert
- 使う前に、クラスターの設定で Gateway API を有効にする必要があります（Managed か Unmanaged を選ぶ）。すでに CRD が入っているクラスターで Managed を選ぶには、CRD が v1 になっている必要があります
- ロードバランサーを置くサブネットを見分けるため、サブネットにタグが必要です（eksctl で作ったクラスターなら付いています）
- Gateway API の項目のすべてが、ALB・NLB の機能に対応しているわけではありません
:::

:::message
**確認ポイント**
EKS コンソールのクラスターの設定で、Gateway API の有効化と Managed / Unmanaged の選択。GatewayClass の `controllerName` には、ALB なら `eks.amazonaws.com/gateway-alb`、NLB なら `eks.amazonaws.com/gateway-nlb` を指定する
キーワード: EKS Auto Mode Gateway API, GatewayClass, HTTPRoute, gatewayApi.crds.managed
:::

[^crd]: Custom Resource Definition。Gateway や HTTPRoute といった、Kubernetes の設定の種類そのものの定義


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/26週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261026/)
- [Amazon EKS Auto Mode が Kubernetes Gateway API をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/amazon-eks-auto-mode-kubernetes-gateway-api/)
