---
title: "【2026/10/12 アップデート】CloudFront の配信元に Lambda Web Functions を直接指定できるように"
emoji: "☁️"
type: "tech"
topics: ["aws", "cloudfront", "lambda"]
published: false
---

# はじめに

2026/10/12 に発表された「Amazon CloudFront が AWS Lambda Web Functions のオリジンサポートを開始」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/cloudfront-lambda-web-functions-origin/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | 同じ日に出た Lambda Web Functions を、CloudFront のオリジン（配信元）として直接使えるようになった |
| **料金** | 追加料金なし（CloudFront と Lambda の通常の料金） |
| **対象** | CloudFront の中国リージョンを除く全世界 |

:::details そもそも CloudFront とオリジンとは？
| 名前 | ひとことで |
|---|---|
| Amazon CloudFront | 世界中の拠点（エッジ）から Web サイトを配信する CDN[^cdn] |
| オリジン | CloudFront が中身を取りに行く、本来の配信元 |
| Lambda Web Functions | 普通の Web サーバーのように HTTP リクエストを直接さばける、新しい種類の Lambda |
| OAC（Origin Access Control） | オリジンを「CloudFront 経由でしかアクセスできない」ようにする仕組み |
| AWS WAF | 不正なリクエストを見分けて止めるファイアウォール |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| Lambda Web Functions の前に CloudFront を置く | ― | オリジンとして直接指定できる |
| 独自ドメイン・TLS 証明書 | ― | CloudFront 側で設定でき、アプリのコードは変更不要 |
| 直接アクセスの制限 | ― | OAC で CloudFront 経由だけに制限できる |
| アプリ独自のログイン | ― | OAC を使っても、利用者の認証情報（Authorization ヘッダーなど）はそのままアプリに届く |

**どんなときにうれしい？**
Lambda Web Functions で作った Web アプリを、独自ドメインで公開したいとき。エッジで TLS をつなぐので応答が速くなり、キャッシュできるページは Lambda を呼ばずに返せます。DDoS 対策や WAF も CloudFront 側でまとめて設定できます。

:::message
**確認ポイント**
CloudFront コンソール →「ディストリビューションを作成」→ オリジンの種類、Origin access の設定
キーワード: Lambda Web Functions origin, Origin Access Control
:::

# ✍️ 自分の調査・勉強結果

<!-- ここに自分で調べたこと・試したことを書く -->

<!--
## まとめ

- 分かったことを 3〜5 個の箇条書きで（途中の感想を並べ直すだけでよい）
- 試せなかったこと・まだ確かめていないことがあれば、最後に 1 行
-->

# 参考

- [週刊AWS – 2026/10/12週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261012/)
- [Amazon CloudFront が AWS Lambda Web Functions のオリジンサポートを開始](https://aws.amazon.com/about-aws/whats-new/2026/10/cloudfront-lambda-web-functions-origin/)

[^cdn]: Content Delivery Network。利用者の近くの拠点から配信して、表示を速くする仕組み。
