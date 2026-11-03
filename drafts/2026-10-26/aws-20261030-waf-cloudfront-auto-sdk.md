---
title: "【2026/10/30 アップデート】WAF の JavaScript SDK を CloudFront が自動でページに埋め込む"
emoji: "☁️"
type: "tech"
topics: ["aws", "waf", "cloudfront"]
published: false
---

# はじめに

2026/10/30 に発表された「AWS WAF が Amazon CloudFront ディストリビューション向けの自動 SDK 統合を発表」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/aws-waf-automatic-sdk-integration-amazon-cloudfront/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | CloudFront で守っているサイトで、WAF の JavaScript SDK のスクリプトタグを CloudFront が自動で HTML に入れてくれるようになった |
| **料金** | 追加料金なし |
| **対象** | CloudFront で使う Web ACL のうち、Bot Control（targeted）・Fraud Control ATP・Fraud Control ACFP のどれかを含むもの |

:::details そもそも WAF の JavaScript SDK とは？
| 名前 | ひとことで |
|---|---|
| AWS WAF | Web サイトへの怪しいアクセスを見分けて止めるサービス。ルールのまとまりを Web ACL と呼ぶ |
| Amazon CloudFront | Web サイトの中身を世界中の拠点から配る CDN[^cdn] |
| WAF の JavaScript SDK | ブラウザで動いて、「本物の人のブラウザか」を判断するための情報を集めるスクリプト |
| Bot Control / ATP / ACFP | ボット対策、アカウントの乗っ取り対策（ATP）、不正なアカウント作成の対策（ACFP）の、AWS が用意したルール |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| SDK のタグ | 守りたいすべてのページに自分で入れて、リリースのたびに保つ | CloudFront が配る HTML に自動で入る |
| アプリの変更 | 必要 | 不要（コード・ビルド・デプロイとも） |
| よくあった失敗 | WAF 側ではオンなのに、ページにタグが入っていない | 起きにくい |

**どんなときにうれしい？**
アプリがたくさんある、または自分では中身を変えられないシステムが作るページを配っているとき。ページごとにタグを入れる作業なしで、ボット対策や不正ログイン対策を効かせられます。

:::message alert
コンソールで新しく作る Web ACL では最初からオン、API などで作る場合は最初はオフです。この機能が出る前に作った Web ACL は変わらないので、自分でオンにします。Content Security Policy[^csp] を使っている場合の注意点は、開発者ガイドを確認するとよいです。
:::

:::message
**確認ポイント**
WAF コンソール → Web ACL → マネージドルールグループの設定の中にある、自動 SDK 統合（Automatic SDK integration）の設定
キーワード: AWS WAF automatic SDK integration CloudFront
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
- [AWS WAF が Amazon CloudFront ディストリビューション向けの自動 SDK 統合を発表](https://aws.amazon.com/about-aws/whats-new/2026/10/aws-waf-automatic-sdk-integration-amazon-cloudfront/)

[^cdn]: Content Delivery Network。利用者の近くの拠点からコンテンツを配ることで、表示を速くする仕組み。
[^csp]: ページの中で読み込んでよいスクリプトの出どころを、サーバーからブラウザに指定する仕組み。許可していないスクリプトは動かなくなる。
