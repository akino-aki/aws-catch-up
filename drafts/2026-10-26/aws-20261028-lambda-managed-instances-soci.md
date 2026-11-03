---
title: "【2026/10/28 アップデート】Lambda Managed Instances のコンテナを必要な分だけ読んで速く起動"
emoji: "☁️"
type: "tech"
topics: ["aws", "lambda", "container"]
published: false
---

# はじめに

2026/10/28 に発表された「AWS Lambda が Lambda Managed Instances で Seekable OCI (SOCI) による遅延読み込みをサポート」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-seekable-oci-soci/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | Lambda Managed Instances で動くコンテナイメージの関数が SOCI による遅延読み込みに対応し、起動にかかる時間が最大 70% 短くなった |
| **料金** | What's New には記載なし |
| **対象** | Lambda Managed Instances が使えるすべての商用リージョン。OCI イメージで作った Event Functions |

:::details そもそも Lambda Managed Instances と SOCI とは？
| 名前 | ひとことで |
|---|---|
| AWS Lambda | サーバーを用意せずに、プログラム（関数）を動かせるサービス |
| Lambda Managed Instances | Lambda の関数を、AWS が管理する EC2 インスタンスの上で動かす使い方。大きなメモリや CPU が必要な処理向け |
| コンテナイメージ（OCI イメージ） | プログラムと動かすのに必要なものを 1 つにまとめた箱。何 GB にもなることがある |
| SOCI（Seekable OCI） | イメージの中身の「目次」（SOCI インデックス）を作っておき、必要なファイルだけを必要なときに読み込む仕組み |
| Amazon ECR | コンテナイメージを置いておくサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| イメージの読み込み | 起動する前にイメージを全部ダウンロード | 起動の段階ごとに必要なファイルだけ取ってくる |
| 起動時間 | 大きなイメージだと数分かかることも | 最大 70% 短く |
| 設定 | ― | SOCI インデックスを作って ECR に push し、関数のイメージ URI を SOCI インデックス付きのタグにしてバージョンを発行するだけ |

**どんなときにうれしい？**
機械学習のライブラリを入れた何 GB もあるイメージを使っていて、アクセスが増えて新しい実行環境を増やすときや、新しいバージョンを出すときの待ち時間が長いとき。

:::message
**確認ポイント**
Lambda Managed Instances の開発者ガイドの SOCI の説明と、ECR のイメージに SOCI インデックスが付いているか
キーワード: Lambda Managed Instances SOCI lazy loading, SOCI index
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
- [AWS Lambda が Lambda Managed Instances で Seekable OCI (SOCI) による遅延読み込みをサポート](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-lambda-seekable-oci-soci/)
