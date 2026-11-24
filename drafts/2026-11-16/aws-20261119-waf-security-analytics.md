---
title: "【2026/11/19 アップデート】AWS WAF に、全部の Web ACL の通信をまとめて調べられる画面ができた"
emoji: "☁️"
type: "tech"
topics: ["aws", "waf", "security"]
published: false
---

# はじめに

2026/11/19 に発表された「AWS WAF launches new Security Analytics Dashboard for real-time investigations」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/02/aws-waf-security-analytics-dashboard/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | アカウント内のすべての Web ACL の通信を 1 画面で調べ、その場でブロックまでできる Security Analytics Dashboard が追加された |
| **料金** | 追加料金なし |
| **対象** | AWS WAF が使えるすべての商用リージョン（GovCloud (US) と中国リージョンは対象外） |

:::details そもそも AWS WAF とは？
| 名前 | ひとことで |
|---|---|
| AWS WAF | Web サイトへの怪しいアクセスを、ルールに従って止めるファイアウォール |
| Web ACL（protection pack） | どのアクセスを通して、どれを止めるかのルールをまとめたもの |
| サンプリング | すべてではなく、一部だけを抜き出して見ること |
| JA4 フィンガープリント | 通信のくせから、アクセス元のソフトの種類を見分けるための指紋のような値 |

Web サイトの入り口に立つ警備員の「通した・止めた」の記録を、全部の入り口分まとめて見られる監視室ができた、というイメージです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 見る範囲 | Web ACL ごとのダッシュボード | すべての Web ACL（リージョンのリソースと CloudFront の両方）を 1 画面で |
| データ | ― | 間引きなしのリクエストのデータを 21 日分 |
| 絞り込み | ― | IP、国、ASN、ユーザーエージェント、JA4、ホスト、パス、当たったルール、ラベルで絞り込み・集計 |
| 生ログの検索 | CloudWatch Logs、S3、Data Firehose へのログ配信を用意して検索 | 配信を用意しなくても、コンソールで HTTP リクエストの中身まで検索できる |
| 対応 | ― | 見つけた IP や国を、その画面からブロックできる。Count モードのルールが何を止めるかも事前に確かめられる |

**どんなときにうれしい？**
急にアクセスが増えたときに、「どこから、どんな通信が来ているか」をすぐ調べて、その場で止めたいとき。ログの置き場所を作っていない小さなサイトでも、調査を始めやすくなります。

:::message
**確認ポイント**
AWS WAF コンソールのナビゲーションで「Security analytics」を開く
キーワード: AWS WAF Security Analytics Dashboard
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
- [AWS WAF launches new Security Analytics Dashboard for real-time investigations](https://aws.amazon.com/about-aws/whats-new/2026/02/aws-waf-security-analytics-dashboard/)
