---
title: "【2026/10/29 アップデート】Aurora PostgreSQL の通信で量子コンピュータに強い鍵交換が選べるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "aurora", "postgresql"]
published: false
---

# はじめに

2026/10/29 に発表された「Amazon Aurora がポスト量子 TLS 鍵交換をサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-postgresql-post-quantum-tls-key-exchange/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Aurora PostgreSQL が、TLS の鍵交換にポスト量子暗号[^pqc]を使う PQ-TLS に対応した。`ssl_groups` パラメータで使う方式を選べる |
| **料金** | What's New には記載なし |
| **対象** | Aurora PostgreSQL 18 以降 |

:::details そもそも TLS の鍵交換とは？
| 名前 | ひとことで |
|---|---|
| Amazon Aurora PostgreSQL | PostgreSQL と互換のある、AWS が作ったデータベース |
| TLS | アプリとデータベースの間などの通信を暗号化する仕組み |
| 鍵交換 | 通信を始めるときに、暗号化に使う鍵を 2 者で安全に決める手順 |
| `ssl_groups` | TLS の鍵交換に、どの方式（グループ）を使うかを決めるパラメータ |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| `ssl_groups` | 変えられなかった | 許可された一覧の中から選んで変えられる |
| 鍵交換の方式 | 従来の方式 | ポスト量子暗号の方式も選べる |

週刊AWS では、ML-KEM-768 と従来の方式を組み合わせたハイブリッドのグループ（X25519MLKEM768 など）が選べ、変更は再起動なしで反映されると紹介されています（What's New には記載がないので、ドキュメントで確認するとよいです）。

**どんなときにうれしい？**
「今の暗号通信を記録しておき、将来の量子コンピュータで解読する」攻撃から、データベースとの通信を守りたいとき。組織のセキュリティの基準に合わせて方式を選べます。

:::message
**確認ポイント**
RDS コンソール → パラメータグループ（Aurora PostgreSQL 18 のクラスター）で `ssl_groups` の値と選べる候補
キーワード: Aurora PostgreSQL ssl_groups, post-quantum TLS, ML-KEM
:::


# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/26週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261026/)
- [Amazon Aurora がポスト量子 TLS 鍵交換をサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aurora-postgresql-post-quantum-tls-key-exchange/)

[^pqc]: ポスト量子暗号。将来の量子コンピュータでも解読しにくいように作られた、新しい暗号の方式。
