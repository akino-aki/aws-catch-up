---
title: "【2026/10/22 アップデート】コードの脆弱性を見つけて直す PR まで出す AWS Continuum が一般提供に"
emoji: "☁️"
type: "tech"
topics: ["aws", "continuum", "security"]
published: false
---

# はじめに

2026/10/22 に発表された「AWS Continuum for code vulnerabilities が一般提供開始」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-continuum-for-code-vulnerabilities-is-now-generally-available

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | コードの脆弱性を見つけ、本当に攻撃に使えるかを試し、優先順位を付けて、直すパッチまで出してくれる AWS Continuum for code vulnerabilities が一般提供になった |
| **料金** | What's New には記載なし。週刊AWS の紹介では、コードの行数に応じた月額（100 万行あたり 200 USD から）＋ 推論ユニットごとの従量（1 ユニット 10 USD） |
| **対象** | 対応リージョンはリージョン表を参照 |

:::details そもそも AWS Continuum for code vulnerabilities とは？
| 名前 | ひとことで |
|---|---|
| 脆弱性 | プログラムの弱点。攻撃者に悪用されると、情報が漏れたり乗っ取られたりする |
| コンテキストグラフ | AWS 環境のリソースのつながり・権限の関係・ネットワークの届く範囲をまとめた地図 |
| サンドボックス | 本番に影響しないよう隔離された実験場 |
| ブラストラディウス | 「もし悪用されたら、どこまで被害が広がるか」の範囲 |
:::

**今回なにが変わった？**

| 段階 | このサービスがやること |
|---|---|
| 見つける | 既存の脆弱性の検出結果を取り込み、コードもスキャンする |
| 確かめる | 隔離したサンドボックスで、本当に悪用できるかを試す |
| 順番を付ける | AWS 環境の地図をもとに、ビジネスへの影響が大きいものから並べる |
| 直す | 修正パッチを Pull Request として出す。悪用できる証拠と被害の範囲も添える |

最初は「Learn モード」で、直し方を提案して人が承認します。精度が信頼できるようになったら「Enforce モード」に切り替え、決めた範囲の中で自動で対応させられます。GuardDuty や Security Hub と一緒に使う前提です。

**どんなときにうれしい？**
脆弱性スキャンの結果が多すぎて、どれが本当に危ないのか分からず手が回らないときです。実際に悪用できるものだけを、影響の大きい順に、直すパッチ付きで受け取れるので、開発者はレビューして取り込むことに集中できます。

:::message alert
コードの量と推論の量の両方に料金がかかるようです。大きなリポジトリで使う前に、料金ページで見積もっておくと安心です。
:::

:::message
**確認ポイント**
AWS Continuum のコンソール → コード脆弱性のセットアップ（リポジトリの接続、Learn / Enforce モード）
キーワード: AWS Continuum for code vulnerabilities, Learn mode, Enforce mode
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
- [AWS Continuum for code vulnerabilities が一般提供開始](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-continuum-for-code-vulnerabilities-is-now-generally-available)
