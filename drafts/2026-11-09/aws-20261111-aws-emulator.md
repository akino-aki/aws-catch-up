---
title: "【2026/11/11 アップデート】AWS アカウントなしで AWS のアプリを手元で試せる AWS Emulator が出た"
emoji: "☁️"
type: "tech"
topics: ["aws", "emulator", "testing"]
published: false
---

# はじめに

2026/11/11 に発表された「AWS Emulator is now available for building and testing AWS applications locally」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AWS のサービスのまねをするツール「AWS Emulator」が出た。手元の PC や CI で、AWS アカウントなしにアプリを動かして試せる |
| **料金** | 無料（AWS に実際にデプロイしたときだけ、そのリソースの料金がかかる） |
| **対象** | 手元の PC や CI 環境。リージョンに関係なく使える。ソースコードは GitHub で公開（CC0 1.0） |

:::details そもそもエミュレータとは？
| 名前 | ひとことで |
|---|---|
| エミュレータ | 本物のまねをして、同じように応答してくれるソフト。ここでは AWS の API のまねをする |
| AWS SDK / AWS CLI | プログラムやコマンドから AWS を操作するための道具 |
| CI | コードを変えるたびに、自動でテストを流す仕組み[^ci] |

たとえると、本番の舞台（AWS）に上がる前に、自宅にそっくりな練習用の舞台を用意できるツールです。
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 動作確認 | 実際の AWS アカウントにデプロイして試す | 手元で起動したエミュレータに、SDK や CLI の接続先を向けるだけ |
| 待ち時間 | デプロイや作成を待つ | ミリ秒単位で返ってくる |
| 対応サービス | ― | AWS が公開している API の定義から作られているので、新しいサービスや API も入ってくる。AWS とどれくらい同じかは「fidelity」のレポートで公開されている |
| 未対応の操作 | ― | `501 Not Implemented` が返る |

**どんなときにうれしい？**
AWS の料金を気にせずに、DynamoDB などを使うアプリの動きを手元でサッと確かめたいとき。CI のテストで毎回本物のリソースを作らずに済むので、速くて安く、後片付けもいりません。

:::message alert
本物の AWS と完全に同じではありません。データはメモリ上にあり、止めると消えます。週刊AWS の紹介では、IAM ポリシーは AWS と同じようには評価されず、エミュレータは 1 つのアカウントとして動くので、権限などのセキュリティ設定の確認には向かないとされています。
:::

:::message
**確認ポイント**
GitHub の AWS Emulator のリポジトリと、サービスごとの fidelity のレポート
キーワード: AWS Emulator, fidelity report
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/9週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261109/)
- [AWS Emulator is now available for building and testing AWS applications locally](https://aws.amazon.com/about-aws/whats-new/2026/11/aws-emulator-now-available/)

[^ci]: Continuous Integration（継続的インテグレーション）の略。
