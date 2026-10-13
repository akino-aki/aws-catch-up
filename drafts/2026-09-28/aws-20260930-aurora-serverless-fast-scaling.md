---
title: "Aurora Serverless が急な負荷に 1 秒以内でスケールするようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "aurora"]
published: false
---

# はじめに

2026/9/30 に発表された「Amazon Aurora serverless がエージェント型 AI などのバースト性ワークロード向けにスケーリングを高速化」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/08/aurora-serverless-instant-16-acu-scaling/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 急にアクセスが増えたとき、1 秒以内に一気に性能を上げられるようになった |
| **料金** | これまでどおり、使った ACU の分だけ |
| **対象** | プラットフォームバージョン 3・4 は自動で有効 |

:::details そもそも Aurora Serverless とは？
アクセス量に合わせて、データベースの性能が自動で伸び縮みする Aurora です。性能の単位は **ACU**（Aurora Capacity Unit）で、使った ACU の分だけ料金がかかります。誰も使っていないときは 0 まで下げられます。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 急に負荷が増えたとき | 今の容量が小さいほど、少しずつしか増えない | 1 秒以内に最大 16 ACU を一気に追加できる |
| 0 に近い状態からの立ち上がり | 性能が追いつくまで時間がかかる | 大幅に短くなった |

**どんなときにうれしい？**
ふだんは静かで、ときどき急に大量の問い合わせが来るシステム。たとえば AI エージェントは、考えている間は静かで、動き出すと一気にデータベースへアクセスします。

:::message alert
プラットフォームバージョン 1・2 の場合は、バージョン 4 へのアップグレードが必要です
:::

:::message
**確認ポイント**
RDS コンソールでクラスターの「プラットフォームバージョン」を確認
キーワード: ACU、Aurora Serverless v2、プラットフォームバージョン
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [Amazon Aurora serverless がエージェント型 AI などのバースト性ワークロード向けにスケーリングを高速化](https://aws.amazon.com/about-aws/whats-new/2026/08/aurora-serverless-instant-16-acu-scaling/)
