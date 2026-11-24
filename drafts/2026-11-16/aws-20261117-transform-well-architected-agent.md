---
title: "【2026/11/17 アップデート】AWS Transform が、移行先のネットワーク設計を見直してくれる"
emoji: "☁️"
type: "tech"
topics: ["aws", "awstransform", "wellarchitected"]
published: false
---

# はじめに

2026/11/17 に発表された「AWS Transform now provides Well-Architected Agent reviews」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/transform-well-architected-agent/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS Transform for migrations で、移行先のネットワーク設計を Well-Architected Agent（パブリックプレビュー）が見直し、提案を設計に直接反映してくれるようになった |
| **料金** | 単体の料金はなし。Well-Architected Agent は AWS Support の有料プランに含まれる |
| **対象** | 商用リージョン |

:::details そもそも登場するものは？
| 名前 | ひとことで |
|---|---|
| AWS Transform | サーバーやアプリを AWS へ移す・作り直す作業を、AI エージェントが手伝ってくれるサービス |
| AWS Transform for migrations | そのうち、オンプレミスなどから AWS への移行を手伝う部分 |
| AWS Well-Architected | AWS 上のシステムの「よい作り方」をまとめた考え方。セキュリティ、信頼性、コスト最適化などの柱がある |
| Well-Architected Agent | その考え方に沿って、構成を見直して提案してくれる AI エージェント（AWS Support が提供） |

引っ越しにたとえると、新居の間取りを決める段階で、専門家が「この配線だと危ない」と言って図面を直してくれるようなものです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 見直すタイミング | AWS にデプロイしたあとに問題が見つかり、別に見直して直す | 計画の段階で、移行先のネットワーク設計を見直せる |
| 観点 | ― | セキュリティ、信頼性、コスト最適化の 3 つの柱 |
| 提案の反映 | ― | AWS Transform がネットワーク設計に直接反映する（例: RFC1918[^rfc1918] 以外のアドレスを使う VPC の振り直し、CIDR の割り当ての管理） |
| デプロイ後の提案 | ― | AWS Transform のチャットで、ダウンロードできる資料としてまとめてくれる |

**どんなときにうれしい？**
オンプレミスのネットワークをそのまま AWS に持ってくると、アドレスの重なりなどの問題があとで見つかりがちです。移行の前に直しておけるので、移行後の手戻りを減らせます。

:::message alert
Well-Architected Agent は AWS Support の有料プランに含まれる機能です（週刊AWS では Business+ 以上と紹介）。また、パブリックプレビューの段階です。
:::

:::message
**確認ポイント**
AWS Transform のワークスペースで、移行ジョブのネットワーク設計のステップ
キーワード: AWS Transform for migrations Well-Architected Agent network review
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/16週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261116/)
- [AWS Transform now provides Well-Architected Agent reviews](https://aws.amazon.com/about-aws/whats-new/2026/11/transform-well-architected-agent/)

[^rfc1918]: 社内ネットワークなどで自由に使ってよいと決められている IP アドレスの範囲（10.0.0.0/8 など）を定めた決まりごと。
