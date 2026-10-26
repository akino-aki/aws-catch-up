---
title: "【2026/10/19 アップデート】GuardDuty の実行時監視で、環境に合わせて選べる検出ルールが使えるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "guardduty", "security"]
published: false
---

# はじめに

2026/10/19 に発表された「Amazon GuardDuty が Runtime Monitoring 向けのオプション脅威検出ルールを追加」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-runtime-optional-detection-rules/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | GuardDuty の Runtime Monitoring に、自分で選んでオンにする検出ルール（50 個以上）が加わった。環境によっては怪しい動きを、必要な環境でだけ見張れる |
| **料金** | What's New には記載なし。Runtime Monitoring 自体は監視するリソースの量に応じた料金 |
| **対象** | EC2・EKS・ECS（EC2 / Fargate）。すべての商用リージョンと GovCloud (US) |

:::details そもそも GuardDuty と Runtime Monitoring とは？
| 名前 | ひとことで |
|---|---|
| Amazon GuardDuty | AWS アカウントやリソースの怪しい動きを自動で見つけてくれる、見張り番のようなサービス |
| Runtime Monitoring | サーバーやコンテナの「中」で動いているプロセス・ファイル操作・通信を見張る GuardDuty の機能 |
| Finding（検出結果） | GuardDuty が「怪しい」と判断したときに出す通知。種類ごとに名前（finding type）が付いている |
| MITRE ATT&CK[^attack] | 攻撃者の手口を「永続化」「権限昇格」などの段階に分けて整理した、業界共通の分類 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 検出ルール | AWS が決めた、どの環境でも怪しい動きだけ | ＋ 環境によっては正常な動きも、選べば検出できる（50 個以上） |
| 例 | ― | sudoers[^sudoers] ファイルの書き換え、監査ログを止める操作 など |
| 検出結果の種類 | ― | 13 種類。うち 4 種類は新しい（機密ファイルの読み取り、怪しいコマンドなど） |
| 試し方 | ― | dry-run モードで「どれくらい引っかかるか」を先に見てから、本番の検出に切り替えられる |

**どんなときにうれしい？**
管理者が普段から sudoers を書き換えるような開発環境では通知がうるさいだけですが、本番環境では同じ操作が侵入のサインかもしれません。本番の環境でだけルールをオンにして、まず dry-run で通知の量を確かめてから本格的に使う、という段階的な導入ができます。

:::message alert
Runtime Monitoring を使うには、対象のリソースに GuardDuty のセキュリティエージェントが入っている必要があります。ルールを増やすと検出結果も増えるので、いきなり本番の通知に流さず、dry-run で量を見てからにすると安心です。
:::

:::message
**確認ポイント**
GuardDuty コンソール → Runtime Monitoring の設定画面で、オプションの検出ルール（Custom Detection Rules）の一覧と dry-run / live の切り替え
キーワード: GuardDuty Runtime Monitoring custom detection rules, dry-run mode
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
- [Amazon GuardDuty が Runtime Monitoring 向けのオプション脅威検出ルールを追加](https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-runtime-optional-detection-rules/)

[^attack]: 攻撃のパターンを体系的にまとめた知識ベース。セキュリティ製品の多くが、検出結果をこの分類に対応させている。
[^sudoers]: Linux で「誰が管理者権限（sudo）を使えるか」を決める設定ファイル。攻撃者が書き換えると、権限を乗っ取られるおそれがある。
