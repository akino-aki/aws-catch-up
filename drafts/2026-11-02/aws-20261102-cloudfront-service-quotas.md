---
title: "【2026/11/2 アップデート】CloudFront の上限の引き上げを、サポートに頼まず自分で申請できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "cloudfront", "servicequotas"]
published: false
---

# はじめに

2026/11/2 に発表された「Amazon CloudFront が AWS Service Quotas でのセルフサービスのクォータ引き上げに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/cloudfront-self-service-quotas/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | CloudFront の 28 個のクォータ（上限）を、Service Quotas の画面で確認・引き上げ申請できるようになった |
| **料金** | 発表では料金に触れていない |
| **対象** | CloudFront が使えるすべてのリージョン |

:::details そもそも CloudFront と Service Quotas とは？
| 名前 | ひとことで |
|---|---|
| Amazon CloudFront | Web サイトの画像や動画を、世界中の拠点にキャッシュして速く届けるサービス（CDN[^cdn]） |
| ディストリビューション | CloudFront での配信の設定 1 つ分。サイトごとに作ることが多い |
| クォータ | AWS が決めている「作れる数」などの上限 |
| Service Quotas | いろいろなサービスのクォータを一か所で確認し、引き上げを申請できる画面 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 引き上げの申請 | サポートケースを開いて、人による確認を待つ | Service Quotas の画面や API から申請 |
| 承認 | 手動 | ビジネスサポート以上なら、公開されている範囲内の申請は自動で承認（例: ディストリビューション数 500 → 1,000、ディストリビューションあたりの代替ドメイン名 100 → 500） |
| 使用量の監視 | ― | 一部のクォータは 5 分ごとに CloudWatch に使用量が出るので、上限の手前でアラームを鳴らせる |

**どんなときにうれしい？**
サイトやドメインの数がどんどん増えて、上限に近づいたとき。サポートの返事を待たずに引き上げられ、上限に当たる前にアラームで気付けます。

:::message alert
自動で承認されるのは、ビジネスサポート以上を契約していて、公開されている範囲内の申請だけです。CloudWatch に使用量が出るのも一部のクォータだけです。
:::

:::message
**確認ポイント**
Service Quotas コンソール → 「AWS のサービス」で Amazon CloudFront を選び、クォータの一覧と「使用率」の列を確認
キーワード: CloudFront Service Quotas
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
- [Amazon CloudFront が AWS Service Quotas でのセルフサービスのクォータ引き上げに対応](https://aws.amazon.com/about-aws/whats-new/2026/11/cloudfront-self-service-quotas/)

[^cdn]: Content Delivery Network の略。利用者に近い場所からデータを届けることで、表示を速くする仕組み。
