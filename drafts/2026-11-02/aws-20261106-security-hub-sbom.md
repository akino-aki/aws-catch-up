---
title: "【2026/11/6 アップデート】Security Hub で、どのサーバーにどのソフトが入っているかを一覧できるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "securityhub", "inspector"]
published: false
---

# はじめに

2026/11/6 に発表された「AWS Security Hub がコンピューティングリソースの SBOM インベントリを提供」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-sbom-inventory/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | EC2・ECR のコンテナイメージ・Lambda に入っているソフトの一覧（SBOM）を、組織全体で Security Hub から見られるようになった |
| **料金** | Security Hub Essentials に含まれ、追加料金なし |
| **対象** | Security Hub が使えるすべてのリージョン |

:::details そもそも SBOM と Security Hub とは？
| 名前 | ひとことで |
|---|---|
| SBOM（ソフトウェア部品表） | そのプログラムやサーバーに、どのソフトのどのバージョンが入っているかの一覧。食品の原材料表示のようなもの |
| AWS Security Hub | セキュリティの問題（検出結果）を、いろいろなサービスから集めて一か所で見られるサービス |
| Amazon Inspector | EC2 などに入っているソフトを調べて、脆弱性を見つけるサービス。SBOM も作っている |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 入っているソフトの確認 | Inspector の SBOM をエクスポートするなどして自分で調べる | Security Hub の SBOM のページで、パッケージごとにバージョン・種類・入っているリソースの数を一覧 |
| 絞り込み | ― | パッケージの属性、アカウント、リージョンで絞り込み・グループ化 |
| リソースの画面 | ― | 「Installed software」タブで、そのリソースに入っているパッケージを全部確認 |
| API | ― | Security Hub の API からも問い合わせできる |

**どんなときにうれしい？**
新しい脆弱性のニュースを見て、「このライブラリはどのサーバーに入っている？」とすぐに知りたいとき。組織全体をまとめて探せます。

:::message alert
一覧は Amazon Inspector の SBOM をもとに作られるので、Inspector を有効にしているアカウント・リソースの分しか表示されません。
:::

:::message
**確認ポイント**
Security Hub コンソール → インベントリの SBOM のページと、リソースの詳細の「Installed software」タブ
キーワード: Security Hub SBOM inventory
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/11/2週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261102/)
- [AWS Security Hub がコンピューティングリソースの SBOM インベントリを提供](https://aws.amazon.com/about-aws/whats-new/2026/11/security-hub-sbom-inventory/)
