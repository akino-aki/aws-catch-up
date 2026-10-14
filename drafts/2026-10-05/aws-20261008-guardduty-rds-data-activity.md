---
title: "GuardDuty が Aurora / RDS の PostgreSQL で、データの持ち出しや破壊を見つけられるようになった"
emoji: "☁️"
type: "tech"
topics: ["aws", "guardduty", "rds"]
published: false
---

# はじめに

2026/10/8 に発表された「Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に」について、調べたことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

| 項目     | 内容                                                                |
| ------ | ----------------------------------------------------------------- |
| **要約** | ログインのあやしさだけでなく、データベースの中で「大量に盗み出す」「消す・壊す」動きも検出できるようになった            |
| **料金** | アカウント・リージョンごとに 30 日間の無料トライアルあり。その後は有料（金額は料金ページを確認）                |
| **対象** | Aurora PostgreSQL と RDS for PostgreSQL。すべての商用リージョンと GovCloud (US) |

:::details そもそも GuardDuty の RDS Protection とは？
**Amazon GuardDuty** は、AWS アカウントの中のあやしい動きを自動で見つけて知らせてくれる脅威検出サービスです。その中の **RDS Protection** は、データベース（Aurora / RDS）向けの機能です。

| 名前 | ひとことで |
|---|---|
| RDS Protection（ログインアクティビティ） | 以前からある機能。普段と違う場所からのログインや、総当たりのログインを見つける |
| RDS Protection for data activity | 今回の新機能。ログインのあとの「クエリの動き」を見る |
:::

**今回なにが変わった？**

| | これまで | これから |
|---|---|---|
| 見ているもの | ログイン | ログイン ＋ クエリのパターン |
| 見つけられる脅威 | 不正なログイン | データの持ち出し（Exfiltration）、データの破壊（Impact） |
| 見つけ方 | ― | 機械学習による異常検知 ＋ 脅威インテリジェンス |
| 導入の手間 | ― | エージェントやデータベースの設定変更は不要 |

**どんなときにうれしい？**
正しいパスワードが漏れて、ログインそのものは怪しく見えない場合でも、「いつもは数件しか読まないのに、テーブルを丸ごと読み出している」「大量に DELETE している」といった動きに気づけます。

:::message alert
ログインアクティビティの RDS Protection を有効にしたうえでの「追加機能（アドオン）」です。無料トライアルが終わると料金がかかるので、トライアル中に推定料金を確認しておきましょう。対象は今のところ PostgreSQL 系だけです。
:::

:::message
**確認ポイント**
GuardDuty コンソール →「保護プラン」→「RDS Protection」
キーワード: RDS Protection for data activity, Exfiltration, Impact
:::

# ✍️ 自分の調査・勉強結果

GuardDuty、私は普段確認することないのであまり知らない。。。
のでそもそもから確認。
## そもそもGuardDutyとは
AWSアカウントの中で起きているあやしい動きを、自動で見つけて知らせてくれるサービス。
有効にすると以下３種類のログの分析が始まり、初めて有効にした場合は「保護プラン」の多くも同時に自動でオンになる。
保護プランの内容は後述。

| 分析するログ                        | 分析される範囲                                                                                      | 何が分かるか                       |
| ----------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------- |
| CloudTrail管理イベント             | アカウント内の管理操作のAPI呼び出し（IAMポリシーの付与、サブネットの作成、証跡の作成など）。<br>S3のオブジェクト操作などのデータイベントは含まない          | 乗っ取られた認証情報で設定を変えられる、などの異常な操作 |
| VPCフローログ                     | **EC2インスタンスの通信だけ**。<br>RDS・NATゲートウェイ・ロードバランサーなど、ほかのENIの通信は対象外                            | 悪いと分かっているIPアドレスとの通信        |
| Route 53 ResolverのDNSクエリログ | **EC2インスタンスの名前解決だけ**。<br>AWSのDNSリゾルバー（既定の設定）を使っている場合に限る。Google DNSなど、ほかのリゾルバーを使っていると対象外 | 悪いと分かっているドメインへのアクセス          |
[GuardDuty foundational data sources](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_data-sources.html)

ポイントはログは有効にしないでOK、フローログの設定してなくてもちゃんと分析してくれる。
ただし、Guarddutyで分析したログは保存されず破棄されるので、あとから調査するのにログを確認したいのであれば、自分でログ取得を有効にしてS3バケットなど任意の場所に保存しておく必要がある。

フローログとクエリログは全部分析してくれると思ってたけど、EC2インスタンスだけらしい。
CloudTrailの管理イベントが分析できるのがいいなーって感じで残り2つは現場次第ですね。
## 保護プラン
保護プランは、S3・RDS・EKSなどなどサービスごとに監視を足していく仕組みで、さっきの3種類のログ以外にも主要なサービスの分析ができる。
ドキュメントでは "use-case focused"とか書かれていて「自分のAWS環境で使用しているサービスに合わせて選ぶもの」という位置づけらしい。

とはいえ、AWSのベストプラクティスで保護プランを足すことが強く推奨されていて、初めてGuardDutyを有効にしたときは、このうちの多くが自動でオンになる。
使っていないサービスのプランはオンのままでも料金がかからないので、30日間の無料期間中に検出結果と推定料金を見てから、どれを残すか決めるのがよさそう。

東京リージョンはもう使ってたのでオハイオで試したけど、注意書きにも記載があって実際にほぼ有効になった。

![GuardDutyを有効にする画面の保護プランの注意書き](/images/aws-20261008-guardduty-rds-data-activity/01b-enable-confirm.png)

![有効にした直後の保護プラン（Foundational・AI Protection・S3）](/images/aws-20261008-guardduty-rds-data-activity/03-protection-plans-1.png)

![有効にした直後の保護プラン（Runtime Monitoring）](/images/aws-20261008-guardduty-rds-data-activity/03-protection-plans-2.png)

![有効にした直後の保護プラン（EKS）](/images/aws-20261008-guardduty-rds-data-activity/03-protection-plans-3.png)

![有効にした直後の保護プラン（RDS・Lambda）](/images/aws-20261008-guardduty-rds-data-activity/03-protection-plans-4.png)

今回の新機能のRDS Data Activity Monitoringも、オハイオではしっかり自動でオンになっていた。
前からGuardDutyを使っていた東京リージョンではオフのまま。
![東京リージョンのRDS Data Activity Monitoringは有効になっていない](/images/aws-20261008-guardduty-rds-data-activity/04-tokyo-rds-data-activity.png)
ドキュメントにも「すでにGuardDutyを使っている場合、あとから出た保護プランは自動では有効にならない」とあって、そのとおりの動きだった。
新しい保護プランが出たら既存の環境では自分でオンにしないといけないので、週刊AWSなどで追いかけるのは大事ですね。

## 今週のアップデート内容
GuardDutyの基本が分かったところで本題。
今回のアップデートで、RDS Protectionがログインだけじゃなく、ログインしたあとのクエリの動きも見るようになった。
昨今の情報流出の多さを考えるとありがたい機能だけど、何をもって「流出」「破壊」と判断しているのかが気になったので調べてみた。
### 何をもって「流出」「破壊」と判断している？
結論、データの中身は見ていなくて、SQLの回数と行数がいつもとどれだけ違うかで判断しているらしい。
数えているのは次の3種類。

| 数えているもの | 中身 |
|---|---|
| `selectedRows` / `selectStatement` | `SELECT`で返した行数と、`SELECT`文の数 |
| `deletedRows` / `deleteStatement` | `DELETE`で消した行数と、`DELETE`文の数 |
| `dropStatement` | `DROP`や`TRUNCATE`など、オブジェクトやデータを丸ごと消す操作の数 |

[RDS data activity-based anomalies](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings-summary.html#rds-pro-data-activity-anomaly)

これに「誰が・どこから・どのDBに・どのアプリでつないだか」を組み合わせて、機械学習でDBとユーザーごとに「いつもの状態」を覚え、そこから外れたものを検出する仕組み。
検出結果の種類はこんな感じ。

| 検出結果                                      | どんなときに出るか                                                            |
| ----------------------------------------- | -------------------------------------------------------------------- |
| `Exfiltration:RDS/AnomalousBehavior`（流出）  | いつもよりかなり多い行を`SELECT`した。<br>または、初めて見るユーザー・IPアドレス・DB名から、まとまった量を読んだ |
| `Impact:RDS/AnomalousBehavior.Delete`（破壊） | いつもよりかなり多い行を`DELETE`した                                             |
| `Impact:RDS/AnomalousBehavior.Drop`（破壊）   | いつもより多いテーブルなどを`DROP`した                                             |
| `MaliciousIPCaller` / `TorIPCaller`系     | 悪いと分かっているIPアドレスやTorの出口から、データを読んだり消したりした                          |
接続元のIPアドレスが毎回変わるとか、検証環境・テスト環境で、テストデータを何度も入れ直すみたいなときは相性悪そう。
Webサービスの本番DBとかで、アプリ専用のDBユーザーで決まった処理だけ動いている、みたいなときは相性良さそうですね。

[RDS Protection finding types](https://docs.aws.amazon.com/guardduty/latest/ug/findings-rds-protection.html)

ここで気づいたのは、GuardDutyの言う「流出」は「大量に読まれた」という意味で、データが外に持ち出されたかまでは見ていないみたい。
言葉のイメージより、だいぶ手前で知らせてくれる感じです。

あと、「いつもの状態」を覚えるのに最大2週間かかるらしい。
有効にした直後や新しく作ったDBは、しばらく検出されないことがあるので、無料期間の半分近くは学習期間になるかも。

重要度は、どこからつないだかで変わる。

| 重要度 | 条件（流出・`DELETE`の場合） |
|---|---|
| 低 | プライベートネットワークのIPアドレスから |
| 中 | パブリックIPアドレスから |
| 高 | 異常に多い行数で、しかも初めて見るパブリックネットワークから、または高い権限のロールや管理用のクライアントから |

### 誤検知だらけにならない？
ありがたい機能な反面、業務内容によって使えるかどうかは変わりそうだなという所感。
テストデータを意図的に流したり、作業として実データを抜いたりすることもあるので、疑似検証環境でテストデータを入れるたびに検知されるのも嫌だなぁと。

調べてみると、毎回同じユーザーで同じくらいの量を扱う定期的な作業なら、学習が進めば「いつものこと」になって出にくくなるはず。
逆に、不定期の大量抽出はたぶん出る。ただ、それを知らせるのがこの機能の役目なので、作業かどうかは人間が判断するしかない。

どうしても邪魔なら、抑制ルールで黙らせられる。条件に合う検出結果を自動でアーカイブして、EventBridgeやSecurity Hubに送らないようにする機能。
RDSならDBユーザー・アプリケーション名・DB名・インスタンスIDなどを条件にできるので、作業用のDBユーザーを分けておけば、その分だけ抑制できそう。テスト用のDBなら、インスタンスIDで丸ごと外すのもあり。

ただしドキュメントでは、抑制ルールは「誤検知が繰り返し出たのを確認してから」「狭い条件で」作るのが推奨されている。
広く黙らせると、アーカイブした検出結果がExtended Threat Detectionの材料にならず、段階を踏んだ攻撃を見逃しやすくなるらしい。

[Suppression rules in GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/findings_suppression-rule.html)

もう一つ注意なのが、GuardDutyはクエリのログを見せてくれないこと。
基本の3種類のログと同じで、何が読まれたのか・消されたのかをあとから確かめるには、pgAuditなど自前の監査ログが別に必要になる。

## 試してみた
本物のDBで検知させるには学習期間の2週間を待たないといけないので、今回はサンプルの検出結果で、見え方と抑制ルールを試してみた。

### サンプルの検出結果を見てみる
サンプルの検出結果は、以前CloudShellからCLIで、種類を指定して出したことがある。
今回は初めてコンソールからやってみた。GuardDutyの「設定」にある「検出結果サンプルの生成」を押すだけ。無料。

![設定画面の検出結果サンプルの生成](/images/aws-20261008-guardduty-rds-data-activity/05-sample-findings-button.png)

押してみたら、種類を選ぶ画面はなく、全種類のサンプルが1件ずつ、全部で463件も出た。コンソールからだと全部まとめて作られるらしい。
種類を指定して作りたいときはCLI（`aws guardduty create-sample-findings`の`--finding-types`）を使う。
今回はこの中から、検出結果タイプで絞り込んで探した。
検出結果タイプの値に自動補完がなかったこと。`Exfiltration:RDS`と入れてもダメだったので、AIに正式名称を聞いて`Exfiltration:RDS/AnomalousBehavior`と入れたら、無事出てきた。

出てきたのは、RDS DBインスタンスとRDS Limitless DBの2件。どちらもタイトルに「[例]」が付いている。
詳細の「異常な動作」を開くと、「cluster（このクラスターにとって）」の単位で、`SELECT`で返した行数（Selected rows）と`SELECT`文の数（Select statement）が、量として異常だった、という形で出ていた。

![サンプルの異常な動作。Observationsは空](/images/aws-20261008-guardduty-rds-data-activity/07-sample-anomaly-observations.png)

ただ、肝心の「実際に何行だったか」が入るはずのObservationsは空っぽ。サンプルは架空のデータなので、「いつもと比べてどれくらい多かったのか」が実際の検出結果でどう見えるのかまでは分からなかった。
下のほうには、DBユーザー・アプリケーション名・DB名などの接続情報が出る。サンプルなので、全部`GeneratedFinding〜`というダミーの値。

![サンプルのRDS DB user details](/images/aws-20261008-guardduty-rds-data-activity/08-sample-db-user-details.png)

### 抑制ルールをかけてみる
上で書いた「作業用のDBユーザーを分けておけば、その分だけ抑制できそう」が本当にできるか試した。
検出結果タイプが`Exfiltration:RDS/AnomalousBehavior`、かつDBユーザーが`GeneratedFindingUserName`のときだけ抑制する、狭い条件のルールにした。
詳細画面のDBユーザーの横の虫眼鏡（＋）を押すと絞り込みに追加されて、その状態で「抑制ルールを作成」を押すと、条件がそのまま入る。

![抑制ルールの条件](/images/aws-20261008-guardduty-rds-data-activity/09-suppression-rule-create.png)

ルールを作ってから、もう一度サンプルを生成した結果がこちら。

| | 状態 |
|---|---|
| ルールを作る前のRDSのサンプル | 「最近」に残ったまま |
| ルールを作ったあとのRDSのサンプル | 「アーカイブ済み」に入った |
| ほかの種類のサンプル | アーカイブされない |

![アーカイブ済みに入ったサンプル](/images/aws-20261008-guardduty-rds-data-activity/10-suppressed-archived.png)

条件に合う新しい検出結果だけがアーカイブされて、ほかは巻き込まれなかった。
ドキュメントのとおり、ルールを作る前からある検出結果には効かないので、すでに出ている分は自分でアーカイブする必要がある。
アーカイブされても消えるわけではなく、「アーカイブ済み」に切り替えればあとから見られる。

### 次回
サンプルでは「いつもとの違い」が実際にどう見えるのかが分からなかったので、実際にRDS for PostgreSQLを作って、2週間学習させてから大量の`SELECT`や`DELETE`で検知されるか試してみる予定。


# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/)
- [GuardDuty RDS Protection](https://docs.aws.amazon.com/guardduty/latest/ug/rds-protection.html)
- [Amazon GuardDuty Best Practices（AWS Security Services Best Practices）](https://aws.github.io/aws-security-services-best-practices/guides/guardduty/)
- [Navigating Amazon GuardDuty protection plans and Extended Threat Detection](https://aws.amazon.com/blogs/security/navigating-amazon-guardduty-protection-plans-and-extended-threat-detection/)
