---
title: "AWS Batch がジョブの件数や所要時間を CloudWatch のメトリクスとして自動で出すようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "batch", "cloudwatch"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/10/6 に発表された「AWS Batch が Amazon CloudWatch へのジョブメトリクス発行に対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-batch-job-cloudwatch-metrics/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | ジョブが「送信された・動き出した・成功した・失敗した」件数と、それぞれにかかった時間が、CloudWatch で見られるようになった |
| **料金** | 追加料金なし（週刊AWS より） |
| **対象** | AWS Batch が使えるすべてのリージョン |

:::details そもそも AWS Batch とは？
AWS Batch は、大量の計算ジョブを順番待ち（キュー）に入れて、必要なサーバーを自動で用意しながら実行してくれるサービスです。ジョブは「SUBMITTED → RUNNABLE → RUNNING → SUCCEEDED / FAILED」のように状態が移っていきます。

**CloudWatch メトリクス**は、数値の時系列データです。グラフ（ダッシュボード）にしたり、しきい値を超えたら通知（アラーム）したりできます。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| ジョブの監視 | EventBridge と Lambda で自作して集計 | `AWS/Batch` 名前空間に自動で出る |
| 状態の件数 | ― | 送信・実行中・成功・失敗などに移った件数 |
| かかった時間 | ― | 「送信 → 実行可能」までの待ち時間や、実行時間など |
| 分け方 | ― | ジョブキューごと（`JobQueueName` ディメンション） |

**どんなときにうれしい？**
「失敗が急に増えたら通知したい」「キューで待たされている時間が長くなっていないか見たい」とき。CloudWatch のアラームとダッシュボードだけで作れるので、自作の仕組みを保守しなくて済みます。

:::message
**確認ポイント**
CloudWatch コンソール →「メトリクス」→「すべてのメトリクス」→ `AWS/Batch`
キーワード: AWS/Batch, JobQueueName
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [AWS Batch が Amazon CloudWatch へのジョブメトリクス発行に対応](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-batch-job-cloudwatch-metrics/)
