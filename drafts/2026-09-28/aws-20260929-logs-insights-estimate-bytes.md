---
title: "CloudWatch Logs Insights で、クエリの前にスキャン量を見積もれるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "cloudwatch"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/9/29 に発表された「Amazon CloudWatch Logs Insights がクエリ実行前のスキャンバイト数の見積もりに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/cloudwatch-logs-estimate-bytes-scanned/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ログを検索する前に、どれくらいお金がかかるかの目安がわかるようになった |
| **料金** | 見積もり自体は無料 |
| **対象** | すべての商用リージョン |

:::details そもそも Logs Insights の料金は？
Logs Insights の料金は「検索したログのデータ量（スキャンしたバイト数）」で決まります。期間を長く取ったり、たくさんのロググループを選んだりすると、思ったより高くなることがあります。
:::

**今回なにが変わった？**

| 使う場所 | 見積もりの出し方 |
|---|---|
| コンソール | クエリを書いている間に自動で表示される |
| CLI / API | `estimate` コマンドを付けて実行する |

**どんなときにうれしい？**
「とりあえず 1 か月分を検索したら高額になった」という失敗を防ぎたいとき。期間やロググループを絞ってから実行できます。

:::message
**確認ポイント**
CloudWatch コンソール →「Logs Insights」でクエリを書いて、見積もりの表示を見てみる
自分のアカウントでもすぐに試せます
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon CloudWatch Logs Insights がクエリ実行前のスキャンバイト数の見積もりに対応](https://aws.amazon.com/about-aws/whats-new/2026/09/cloudwatch-logs-estimate-bytes-scanned/)
