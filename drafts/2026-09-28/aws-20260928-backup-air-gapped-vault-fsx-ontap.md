---
title: "AWS Backup の論理的エアギャップボールトで FSx for NetApp ONTAP を保護できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "awsbackup"]
published: false
---

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

2026/9/28 に発表された「AWS Backup が Amazon FSx for NetApp ONTAP の論理的エアギャップボールトサポートを追加」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/09/aws-backup-air-gapped-vault-fsx-ontap/

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 社内ファイルサーバーのバックアップを「誰も消せない金庫」に入れられるようになった |
| **料金** | AWS Backup の通常料金（詳細は料金ページ） |
| **対象** | 両方のサービスが使えるリージョン（東京・大阪を含む） |

:::details そもそも登場するサービスは何？
| サービス | ひとことで |
|---|---|
| AWS Backup | いろいろな AWS サービスのバックアップをまとめて管理するサービス |
| 論理的エアギャップボールト | バックアップを入れる「誰も書き換えたり消したりできない金庫」。ランサムウェア[^ransom]に本番環境を乗っ取られても、金庫の中は無事 |
| FSx for NetApp ONTAP | 企業でよく使われる NetApp 社のファイルサーバーを、AWS 上で使えるサービス |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| FSx for ONTAP のバックアップ | 金庫には入れられなかった | 金庫に入れて保護できる |
| 他のアカウントとの共有 | ― | 金庫を別アカウントと共有し、そこから直接復元できる |

**どんなときにうれしい？**
社内のファイルサーバーを FSx for ONTAP に移している会社が、ランサムウェア対策や「バックアップを改ざんできないこと」を求める規制に対応したいとき。

:::message
**確認ポイント**
AWS Backup コンソール →「ボールト（Vaults）」
キーワード: logically air-gapped vault、Vault Lock、ランサムウェア対策
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

# 参考

- [週刊AWS – 2026/9/28週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20260928/)
- [AWS Backup が Amazon FSx for NetApp ONTAP の論理的エアギャップボールトサポートを追加](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-backup-air-gapped-vault-fsx-ontap/)

[^ransom]: データを勝手に暗号化して使えなくし、元に戻す代わりにお金を要求するウイルスのこと。バックアップまで消されることが多いため、「消せないバックアップ」が重要になります。
