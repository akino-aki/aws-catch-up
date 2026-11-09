---
title: "【2026/11/3 アップデート】CloudWatch に OpenTelemetry のトレースを API キーで送れるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "cloudwatch", "opentelemetry"]
published: false
---

# はじめに

2026/11/3 に発表された「Amazon CloudWatch が OpenTelemetry トレースの API キーに対応」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-api-keys-opentelemetry/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | OpenTelemetry のトレースを X-Ray の OTLP エンドポイントに送るとき、SigV4 の署名の代わりに API キー（bearer token）で認証できるようになった |
| **料金** | 発表では料金に触れていない |
| **対象** | X-Ray の OTLP トレースのエンドポイントがあるすべての商用リージョン |

:::details そもそも OpenTelemetry とトレースとは？
| 名前 | ひとことで |
|---|---|
| トレース | 1 つのリクエストが、どのサービスをどの順に通り、それぞれ何秒かかったかの記録 |
| OpenTelemetry | トレースなどを集めて送るための、特定の会社に縛られない共通の仕組み |
| OTLP | OpenTelemetry のデータを送るときの決まった形式 |
| SigV4 | AWS の認証情報でリクエストに署名する、AWS の標準の認証方法[^sigv4] |
| bearer token | 「この鍵を持っている人は通してよい」という合言葉のような認証方法 |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 認証の方法 | SigV4 だけ | SigV4 か API キー（Authorization ヘッダーに bearer token を入れる） |
| 送れる場所 | AWS の認証情報を扱えるところ | ヘッダーを設定できる OTLP/HTTP のクライアントならどこからでも（OpenTelemetry Collector など） |
| 送ったあと | Transaction Search、Application Signals、CloudWatch Omni | どちらの方法で送っても同じ機能が使える |

**どんなときにうれしい？**
オンプレミスや他のクラウドで動くアプリ、CI/CD のパイプライン、固定のヘッダーしか設定できないツールなど、AWS の一時的な認証情報を用意しにくい場所から、CloudWatch にトレースを集めたいとき。

:::message alert
推奨の認証方法は、引き続き SigV4 です。API キーは長く使える鍵なので、漏れないように管理する必要があります。ADOT（AWS Distro for OpenTelemetry）の SDK はこれまでどおり SigV4 を使い、変更は不要です。
:::

:::message
**確認ポイント**
X-Ray デベロッパーガイドの「Setting up bearer token authentication for traces」と、CloudWatch コンソールの Transaction Search の画面
キーワード: CloudWatch OTLP bearer token API key traces
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
- [Amazon CloudWatch が OpenTelemetry トレースの API キーに対応](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-cloudwatch-api-keys-opentelemetry/)

[^sigv4]: Signature Version 4 の略。アクセスキーなどを使ってリクエストごとに署名を作り、本人であることと改ざんされていないことを証明する。
