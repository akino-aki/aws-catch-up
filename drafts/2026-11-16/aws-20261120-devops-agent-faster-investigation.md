---
title: "【2026/11/20 アップデート】AWS DevOps Agent の障害調査が速くなり、途中経過も見られるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "devopsagent", "devops"]
published: false
---

# はじめに

2026/11/20 に発表された「AWS DevOps Agent reduces investigation latency」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/devops-agent-reduces-latency/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS DevOps Agent のインシデント調査が速くなり、調査の進み具合に合わせて更新される要約が見られるようになった |
| **料金** | What's New には記載なし（週刊AWS によると、エージェントが動いた秒数での課金） |
| **対象** | 対応リージョンは DevOps Agent のドキュメントで確認 |

:::details そもそも AWS DevOps Agent とは？
| 名前 | ひとことで |
|---|---|
| AWS DevOps Agent | システムに障害が起きたとき、ログやメトリクスを調べて原因を探してくれる AI エージェント |
| インシデント | システムの障害や、いつもと違うおかしな状態 |
| 根本原因分析 | 「なぜ起きたのか」をいちばん元までたどること |
| MTTR | Mean Time To Recovery の略。障害が起きてから直るまでの平均の時間 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 調査の速さ | ― | 調査が終わるまでの時間が短くなった（何倍かは What's New に記載なし） |
| 途中経過 | 根本原因と対処の計画ができるまで待つ | 調査が進むたびに更新される要約で、早い段階の見立てを確かめられる |
| Slack | ― | 組み込みの Slack 連携を使っていれば、要約が関係するチャンネルに自動で投稿される |

**どんなときにうれしい？**
夜中に障害の通知が来たとき、調査の完了を待たずに「だいたいこのあたりが怪しい」を先に知って、動き始められます。秒単位の課金なので、調査が短くなるとその分の料金も減ります。

:::message
**確認ポイント**
DevOps Agent のコンソールで調査（Investigation）を開き、リアルタイムの要約を見る
キーワード: AWS DevOps Agent investigation real-time summary
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
- [AWS DevOps Agent reduces investigation latency](https://aws.amazon.com/about-aws/whats-new/2026/11/devops-agent-reduces-latency/)
