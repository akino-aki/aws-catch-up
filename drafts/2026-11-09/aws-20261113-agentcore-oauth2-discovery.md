---
title: "【2026/11/13 アップデート】AgentCore Identity が OIDC でない OAuth 2.0 の認可サーバーに対応"
emoji: "☁️"
type: "tech"
topics: ["aws", "agentcore", "oauth"]
published: false
---

# はじめに

2026/11/13 に発表された「Amazon Bedrock AgentCore Identity now supports OAuth 2.0 discovery URLs」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/11/bedrock-agentcore-oauth2-discovery/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目 | 内容 |
|---|---|
| **要約** | AgentCore Identity の設定で、OIDC の discovery URL だけでなく、OAuth 2.0 の認可サーバーの discovery URL も使えるようになった |
| **料金** | 追加料金なし |
| **対象** | Amazon Bedrock AgentCore が使えるすべてのリージョン |

:::details そもそも AgentCore Identity とは？
| 名前 | ひとことで |
|---|---|
| Amazon Bedrock AgentCore | AI エージェントを動かすための部品をそろえた AWS のサービス |
| AgentCore Identity | エージェントの「誰が使ってよいか」（インバウンド）と「エージェントがほかのサービスに入るための鍵」（アウトバウンド）を管理する部品 |
| OAuth 2.0 | ほかのサービスへのアクセスを、パスワードを渡さずに許可する仕組み |
| OIDC | OpenID Connect の略。OAuth 2.0 にログイン（本人確認）の機能を足したもの |
| discovery URL | 認可サーバーの設定情報（どこでトークンをもらうかなど）をまとめて公開している URL[^discovery] |
| JWT | ログインした証明などを入れた、改ざんを確かめられる形式のトークン |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 使える discovery URL | OIDC のもの（`/.well-known/openid-configuration`）だけ | OAuth 2.0 のもの（`/.well-known/oauth-authorization-server`）も使える |
| OIDC を使わない認可サーバー | 設定情報の場所が違うので、つなげなかった | つなげる |
| 対象の設定 | ― | インバウンドの JWT オーソライザーと、アウトバウンドのカスタム OAuth クレデンシャルプロバイダーの両方 |

**どんなときにうれしい？**
ログイン（OIDC）までは実装しておらず、OAuth 2.0 だけに対応した認可サーバーを使っているとき。そのサーバーで、エージェントの利用者を確かめたり、エージェントが外部の API を呼ぶためのトークンを取ったりできます。

:::message
**確認ポイント**
Bedrock AgentCore コンソール → Identity → OAuth クライアントの追加（カスタムプロバイダー）で discovery URL を入れる
キーワード: AgentCore Identity OAuth 2.0 discovery URL, RFC 8414
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
- [Amazon Bedrock AgentCore Identity now supports OAuth 2.0 discovery URLs](https://aws.amazon.com/about-aws/whats-new/2026/11/bedrock-agentcore-oauth2-discovery/)

[^discovery]: OAuth 2.0 の決まりは RFC 8414、OIDC の決まりは OpenID Connect Discovery で定められている。
