---
title: "【2026/10/21 アップデート】AWS Transform の移行評価で、オンプレミスのストレージも見積もれるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "transform", "storage"]
published: false
---

# はじめに

2026/10/21 に発表された「AWS Transform が Amazon S3、EBS、EFS、FSx 向けのストレージ移行評価を追加」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/transform-assess-s3-ebs-efs-fsx/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | オンプレミスのストレージの一覧を渡すと、AWS のどのストレージに移すのがよいか・どれくらいの大きさと費用になるかを、AWS Transform が出してくれるようになった |
| **料金** | What's New には記載なし（週刊AWS の紹介では評価機能は無料） |
| **対象** | AWS Transform が使えるすべてのリージョン |

:::details そもそも AWS のストレージの種類とは？
| 名前 | ひとことで |
|---|---|
| Amazon S3 | ファイルを「オブジェクト」として、ほぼ無制限に置ける保存場所 |
| Amazon EBS | EC2 に付ける、パソコンの内蔵ディスクのようなもの |
| Amazon EFS | 複数の Linux サーバーから同時に使える共有フォルダ |
| Amazon FSx | NetApp ONTAP・Windows ファイルサーバー・OpenZFS・Lustre など、おなじみのファイルシステムをそのまま使えるサービス |
| NAS / SAN | オンプレミスでよく使う共有ストレージ。NAS はフォルダ単位、SAN はディスク（LUN[^lun]）単位で貸し出す |
| TCO | 機器代・運用費などを全部まとめた「総所有コスト」 |
:::

**今回なにが変わった？**

| 項目 | 内容 |
|---|---|
| 渡すもの | ストレージの一覧（NetApp Digital Advisor の出力、RVTools のファイルなど） |
| 評価するもの | NAS の共有、SAN の LUN、サーバー直結のディスク、バックアップの保存先 |
| 出てくるもの | ワークロードごとの移行先（S3 / EBS / EFS / FSx）、サイズ、費用の見込み、TCO のビジネスケース |
| 比べられること | Single-AZ と Multi-AZ、コスト重視と性能重視などの「もしも」のシナリオ |
| その他 | 結果についてチャットで質問できる |

**どんなときにうれしい？**
データセンターの機器の入れ替え時期が来て、「AWS に移したらいくらかかるか」を出したいときです。大量のファイル共有やディスクを 1 つずつ調べて、どのサービスに移すかを決める作業を、一覧を渡すだけで下書きしてもらえます。

:::message
**確認ポイント**
AWS Transform の Web アプリ → 移行評価（migration assessment）→ ストレージのインベントリのアップロード
キーワード: AWS Transform storage assessment, TCO business case
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
- [AWS Transform が Amazon S3、EBS、EFS、FSx 向けのストレージ移行評価を追加](https://aws.amazon.com/about-aws/whats-new/2026/10/transform-assess-s3-ebs-efs-fsx/)

[^lun]: Logical Unit Number。SAN で、サーバーから見える 1 台分のディスクとして切り出された領域のこと。
