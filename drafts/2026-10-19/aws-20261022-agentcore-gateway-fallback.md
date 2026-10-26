---
title: "【2026/10/22 アップデート】AgentCore Gateway が InvokeModel とモデルの自動切り替えに対応"
emoji: "☁️"
type: "tech"
topics: ["aws", "bedrock", "agentcore"]
published: false
---

# はじめに

2026/10/22 に発表された「AgentCore Gateway が Bedrock InvokeModel API とモデルフォールバックに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/agentcore-gateway-invokemodel-fallback/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AgentCore Gateway の推論の入口が Bedrock の InvokeModel 系の API に対応し、いつもの Bedrock SDK から使えるようになった。モデルが混んでいるときに別のモデルへ自動で切り替える機能も追加 |
| **料金** | What's New には記載なし（AgentCore Gateway の通常の料金） |
| **対象** | AgentCore Gateway が使えるすべてのリージョン（中国を除く） |

:::details そもそも AgentCore Gateway とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock AgentCore | AI エージェントを本番で動かすための部品（実行環境・記憶・ゲートウェイなど）をそろえたサービス |
| AgentCore Gateway | エージェントが使うツールやモデルへの「窓口」を 1 か所にまとめ、認証や管理をそこで行うしくみ |
| InvokeModel / InvokeModelWithResponseStream | Bedrock でモデルを呼び出す基本の API。後者は答えを少しずつ受け取る（ストリーミング） |
| サーキットブレーカー[^cb] | 失敗が続いている宛先を一時的に使わないようにする安全装置 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 呼び出し方 | Gateway 用の呼び方に合わせる必要があった | Bedrock SDK の接続先（endpoint_url）を Gateway に向けるだけ |
| 使えるモデル | ― | Gateway の先にある複数の会社のモデルを、1 つの入口から使える |
| 失敗したとき | アプリ側でやり直しを書く | Gateway のルールで決めた順番に、別の宛先へ自動で切り替える |
| 切り替える条件 | ― | スロットリング（混雑）、サーバーエラー、タイムアウトなど |
| 失敗中の宛先 | ― | サーキットブレーカーで飛ばし、待ち時間をむだにしない |

**どんなときにうれしい？**
メインのモデルが混雑して断られると、エージェントが止まってしまう場合です。予備のモデルを順番に決めておけば、アプリは 1 回リクエストを送るだけで、Gateway が使えるモデルを探して答えを返してくれます。

:::message
**確認ポイント**
Amazon Bedrock AgentCore コンソール → Gateway → ルール（フォールバックの設定）
キーワード: AgentCore Gateway InvokeModel, model fallback routing, circuit breaker
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/19週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261019/)
- [AgentCore Gateway が Bedrock InvokeModel API とモデルフォールバックに対応](https://aws.amazon.com/about-aws/whats-new/2026/10/agentcore-gateway-invokemodel-fallback/)

[^cb]: 家の電気のブレーカーのように、問題がある回路を一時的に切り離す考え方からきた名前。
