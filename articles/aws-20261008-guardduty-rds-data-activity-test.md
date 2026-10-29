---
title: 【2026/10/8 アップデート】GuardDutyのRDSデータ監視の検証、見事に失敗
emoji: ☁️
type: tech
topics:
  - aws
  - guardduty
  - rds
published: true
---

# はじめに

2026/10/8 に発表された「Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に」について、実際に試したことをまとめます。

https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/

:::message
- 🤖 **AIの解説** は Claude が書いた解説です。内容がまちがっている可能性があります
- ✍️ **自分の調査・勉強結果** は、自分で実際に確認・調査した内容です
:::

# 🤖 AIの解説

このアップデートの解説（何が変わったか・料金・対象のDB）は、前回の記事にまとめています。この記事では、実際に試した結果だけを書きます。

# ✍️ 自分の調査・勉強結果

前回の記事はこちら。

https://zenn.dev/aki42/articles/aws-20261008-guardduty-rds-data-activity

:::message
**結論：試したけど、検知させられなかった**
2週間「いつもの動き」を学習させたあと、読む量・ユーザー・接続元・操作（`SELECT`・`DELETE`・`DROP`）を変えて6パターン試したけど、検出結果は一度も出ませんでした。
:::

前回の記事では、サンプルの検出結果で見え方と抑制ルールを試しました。
ただ、サンプルでは「いつもと比べてどれくらい多かったのか？」が実際にどう見えるのかが分からなかったので、今回は本物のDBを作って試してみました。

## 準備
### 新機能を有効にする
東京リージョンは前からGuardDutyを使っていたけど、新機能のRDS Data Activity Monitoringはオフのままだったので、有効にしました。

![RDS Data Activity Monitoringをオンにする](/images/aws-20261008-guardduty-rds-data-activity-test/01-enable-data-activity.png)

![RDS Data Activity Monitoringが有効になった](/images/aws-20261008-guardduty-rds-data-activity-test/02-data-activity-enabled.png)

### 対応しているDBを選ぶ
新機能はポスグレでしか使えないので、注意。
今回はRDS for PostgreSQL 17にしました。
[Supported Amazon Aurora, Amazon RDS, and Aurora Limitless databases](https://docs.aws.amazon.com/guardduty/latest/ug/rds-protection.html#rds-pro-supported-db)
### DBを作る
検証用なので、なるべく小さく安い構成へ。

| 項目                          | 設定                           |
| --------------------------- | ---------------------------- |
| エンジン                        | PostgreSQL 17.11             |
| テンプレート                      | 開発/テスト                       |
| 構成                          | シングルAZ                       |
| インスタンス                      | db.t4g.micro                 |
| ストレージ                       | gp3 20GiB（自動スケーリングの上限 30GiB） |
| パスワード                       | Secrets Managerで管理           |
| パブリックアクセス                   | なし                           |
| 拡張モニタリング・マイナーバージョン自動アップグレード | オフ                           |

![エンジンとテンプレート](/images/aws-20261008-guardduty-rds-data-activity-test/03-create-db-engine.png)

![バージョンと認証情報の管理](/images/aws-20261008-guardduty-rds-data-activity-test/04-create-db-version-credentials.png)

開発/テストのテンプレートでも、インスタンスはdb.m7g.large、ストレージは200GiBが初期値になっていて、そのまま作るとけっこう高い。
バースト可能クラスのdb.t4g.microと20GiBに変更。
![インスタンスとストレージ](/images/aws-20261008-guardduty-rds-data-activity-test/05-create-db-instance-storage.png)

![接続（パブリックアクセスなし）](/images/aws-20261008-guardduty-rds-data-activity-test/06-create-db-network.png)

概算月間コストは21.01 USD。2〜3週間動かす予定なので、15 USDくらいになりそう。
![概算月間コスト](/images/aws-20261008-guardduty-rds-data-activity-test/07-create-db-cost.png)

![DBの作成中](/images/aws-20261008-guardduty-rds-data-activity-test/08-db-creating.png)

### 「いつもの動き」を流す仕組みを作る
GuardDutyが「いつもの状態」を覚えるには、毎日同じような動きがあったほうがいいので、Lambdaを作成。

| 部品                         | 役割                                  |
| -------------------------- | ----------------------------------- |
| テーブル `customers`           | 10万行のダミーの顧客データ                      |
| DBユーザー `app_user`          | アプリ専用のユーザー。パスワードはSecrets Managerに保管 |
| Lambda `gd-test-baseline`  | `app_user`で、数件ずつの`SELECT`を3〜6回流す    |
| EventBridgeのルール            | 1時間ごとにLambdaを動かす                    |
| Secrets ManagerのVPCエンドポイント | VPCの中のLambdaが、DBのパスワードを取りに行くための通り道  |
「いつもの動き」はこんな感じ。数件ずつ読むだけにしてます。
```python
def baseline():
    con = connect(os.environ["APP_SECRET_ARN"], "web-app")
    queries = random.randint(3, 6)
    selected = 0
    for _ in range(queries):
        start = random.randint(1, 99_990)
        selected += len(
            con.run(
                "SELECT id, name, email FROM customers WHERE id BETWEEN :a AND :b",
                a=start,
                b=start + random.randint(0, 9),
            )
        )
    con.close()
    return {"action": "baseline", "queries": queries, "selected_rows": selected}
```

EventBridgeのルールで、1時間ごとにLambdaを動かすようにしました。
![Lambda関数とEventBridgeのトリガー](/images/aws-20261008-guardduty-rds-data-activity-test/10-lambda-function.png)

## 2週間後：監視が始まったかを確認する
2週間たったので、新機能がちゃんとDBを監視しているかを確認。

### 使用状況で監視の量を見る
GuardDutyの「使用状況」には、保護プランごとに、どれだけ監視・分析したかのグラフが並んでいた。
RDS Protectionのグラフのうち、値が出ていたのはこの2本。

![RDS ProtectionのMonitoredVcpuHours](/images/aws-20261008-guardduty-rds-data-activity-test/11-usage-rds-vcpu-hours.png)

どちらも1時間あたり2で横ばい。db.t4g.microはvCPUが2つなので、「2vCPUのDBを1時間監視した」で2になる。

`MonitoredVcpuHours`が何かは、ドキュメントの使用状況のメトリクスの表にありました。

![ドキュメントのメトリクスの表](/images/aws-20261008-guardduty-rds-data-activity-test/12-doc-usage-metrics.png)

[GuardDuty の使用状況のモニタリングとコストの見積もり](https://docs.aws.amazon.com/ja_jp/guardduty/latest/ug/monitoring_costs.html)

ただ、表にあるのは`RDS`の行だけで、`RDSDataActivity`の行はなかった（2026/10/28時点）。
料金ページを見ると、ログインの監視とデータの監視は別料金になっている。なので、2本のグラフはこう分かれていて、恐らく`RDSDataActivity`のほうが今回の新機能のメトリクスかなと思います。

ACUはAurora Serverless v2の単位で、今回のDBはサイズが決まっているインスタンス（vCPUで数える）なので「データがありません」と表示されていました。
### 学習期間中の検出結果
学習期間中に「検出結果」は特に増えていなかった。
## 本番：いつもと違う動きをしてみる
アプリ用ユーザーのパスワードが漏れた想定で実施してみる。
ログインはいつもと同じユーザー・同じアプリ名からだけど、ログインしたあとにやっていることが違う、という状況を作る。

|        | いつもの動き             | 持ち出し（`exfil`）                        | 破壊（`destroy`）                         |
| ------ | ------------------ | ------------------------------------ | ------------------------------------- |
| ユーザー   | `app_user`         | `app_user`                           | `app_user`                            |
| やること   | 数件ずつの`SELECT`を3〜6回 | テーブルを丸ごと`SELECT`                     | 半分の行を`DELETE`                         |
| 量      | 1回あたり数十行           | 10万行                                 | 5万行                                   |
| 狙う検出結果 | （出ないはず）            | `Exfiltration:RDS/AnomalousBehavior` | `Impact:RDS/AnomalousBehavior.Delete` |

くり返すと「いつもの動き」として覚えられてしまうので、どちらも1回だけ流す。
どちらの動きがどの検出結果になったかを時刻で見分けられるように、2つは10分くらいあけて流した。

### Lambdaに異常の動きを足す
DBにつなげるのはVPCの中のLambdaだけなので、異常の動きもLambdaに流してもらう。
コンソールのコードエディタで、関数を2つ足して、`action`で動きを選べるようにした。

```python
def exfil():
    # 持ち出しのつもり: アプリ用ユーザーで、テーブルを丸ごと読む（いつもは数件）
    con = connect(os.environ["APP_SECRET_ARN"], "web-app")
    rows = con.run("SELECT id, name, email FROM customers")
    con.close()
    return {"action": "exfil", "selected_rows": len(rows)}


def destroy():
    # 破壊のつもり: アプリ用ユーザーで、半分の行を消す（いつもは消さない）
    con = connect(os.environ["APP_SECRET_ARN"], "web-app")
    con.run("DELETE FROM customers WHERE id > 50000")
    deleted = con.row_count
    con.close()
    return {"action": "destroy", "deleted_rows": deleted}


def handler(event, context):
    action = (event or {}).get("action", "baseline")
    actions = {"setup": setup, "baseline": baseline, "exfil": exfil, "destroy": destroy}
    result = actions[action]()
    print(json.dumps(result))
    return result
```

毎時のEventBridgeは`action`を付けずに呼ぶので、これまでどおり「いつもの動き」が流れる。

![Lambdaのコードを更新した](/images/aws-20261008-guardduty-rds-data-activity-test/13-lambda-code-updated.png)

### 持ち出し（exfil）を流す
「テスト」タブで、イベントJSONを`{"action": "exfil"}`にして実行した（10/29 0:59ごろ）。

![exfilの実行結果](/images/aws-20261008-guardduty-rds-data-activity-test/14-test-exfil.png)

10万行を読んで、約7秒。10万行を一度にメモリに載せるので、使ったメモリは112MBで、設定の128MBぎりぎりだった。

### 破壊（destroy）を流す
10分ほどあけて、イベントJSONを`{"action": "destroy"}`にして実行した（10/29 1:10ごろ）。

![destroyの実行結果](/images/aws-20261008-guardduty-rds-data-activity-test/15-test-destroy.png)

5万行を消して、約0.6秒。読むより消すほうがずっと速かった。

## 検出結果：出なかった
半日待っても、RDSの検出結果は出ませんでした。
見落としかもと思って、「アーカイブ済み」と抑制ルールも確認したけど、どちらにもなし。本当に出ていない。

GuardDutyは「ほぼリアルタイム」で分析すると書かれていて、ほかの検出結果は動きから数分〜十数分で出ることが多いと言われているので、遅れているわけではなさそう。

## 条件を変えて、もう一度
ここからは、変える条件を1つずつにして試し…惨敗。

| 時刻（10/29） | 接続元 | ユーザー | アプリ名 | やったこと | 結果 |
|---|---|---|---|---|---|
| 0:59 | Lambda | `app_user` | `web-app` | 10万行を全件`SELECT` | 出ない |
| 1:10 | Lambda | `app_user` | `web-app` | 5万行を`DELETE` | 出ない |
| 20:20〜 | Lambda | `app_user` | `web-app` | 5万行の全件`SELECT`を、ばらばらの間隔で1時間ほどくり返す | 出ない |
| 20:48 | Lambda | **管理ユーザー** | `web-app` | 5万行を全件`SELECT` | 出ない |
| 21:13・21:15 | **CloudShell** | `app_user` | `web-app` | 5万行を全件`SELECT` | 出ない |
| 22:27〜22:30 | **CloudShell** | **管理ユーザー** | **`psql`** | **全部入り**（下で説明） | 出ない |

### 学習期間が明けてから、くり返す
10/14に有効にしたので、0:59はちょうど2週間を過ぎたところ。学習が終わりきっていなかったのかもしれないので、その日の夜に、全件の`SELECT`をばらばらの間隔でくり返しました。
間隔をそろえると、定期的なバッチ処理に見えて「いつもの動き」と判断されそうなので、わざとばらばらにしています。

### ユーザーだけ変える
ドキュメントを読み直すと、持ち出し（`Exfiltration`）の検出は「量が多い」だけでなく、「見たことのないユーザー・IPアドレス・DB名」との組み合わせで判断すると書かれていました。
今までは、わざとユーザーもアプリ名も同じにして、量だけを変えていたので、まずはユーザーだけを管理ユーザーに変えました。権限の強いユーザーなら、重要度が「高」になる条件にも当てはまります。

```python
def exfil_admin():
    # 持ち出しのつもり: exfil と同じことを、管理ユーザーでやる（変えるのはユーザーだけ）
    con = connect(os.environ["MASTER_SECRET_ARN"], "web-app")
    rows = con.run("SELECT id, name, email FROM customers")
    con.close()
    return {"action": "exfil_admin", "selected_rows": len(rows)}
```

![exfil_adminを足したコード](/images/aws-20261008-guardduty-rds-data-activity-test/16-lambda-code-exfil-admin.png)

![exfil_adminの実行結果](/images/aws-20261008-guardduty-rds-data-activity-test/17-test-exfil-admin.png)

### 接続元だけ変える
次は接続元（IPアドレス）だけを変えました。
CloudShellの「VPC環境」を、Lambdaと同じサブネット・同じセキュリティグループで作成。
DBから見ると、Lambdaとは別のIPアドレスからの接続になるはず。
psqlは最初から入っていたので、`app_user`でつないで、Lambdaの`exfil`と同じ`SELECT`を流しました。

![CloudShellのVPC環境から全件SELECT](/images/aws-20261008-guardduty-rds-data-activity-test/18-cloudshell-vpc-env.png)

### 最後に、全部変えて暴れる
ここまで出なかったので、あきらめて消す前に暴れました。笑
もう試せなくなってもいいので、テーブルも消します。

- 接続元: CloudShellのVPC環境
- ユーザー: 管理ユーザー（`postgres`）
- アプリ名: `psql`（指定しないとこうなる）
```sql
SELECT now();
-- 全件読む（5万行を画面に出すと重いので、表示だけ捨てる）
\o /dev/null
SELECT id, name, email FROM customers;
\o
-- 1行ずつDELETEを500回
SELECT format('DELETE FROM customers WHERE id = %s', g) FROM generate_series(1, 500) g \gexec
-- 残りを全部DELETE
DELETE FROM customers;
-- ダミーのテーブルを10個作って、10個ともDROP
SELECT format('CREATE TABLE dummy_%s (id int)', g) FROM generate_series(1, 10) g \gexec
SELECT format('DROP TABLE dummy_%s', g) FROM generate_series(1, 10) g \gexec
-- テーブルそのものを消す
DROP TABLE customers;
SELECT now();
```

`\gexec`は、`SELECT`で作ったSQLを1行ずつ実行してくれるpsqlの機能。500回の`DELETE`を手で打たずに済みます。

![最後に暴れたpsqlの画面](/images/aws-20261008-guardduty-rds-data-activity-test/19-rampage-psql.png)

GuardDutyが数えているのは、読んだ行数・`SELECT`の回数・消した行数・`DELETE`の回数・`DROP`や`TRUNCATE`の回数。
どれも「いつも」は0か数十なので、全部いつもと違うはず。

[RDS data activity-based anomalies](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings-summary.html#rds-pro-data-activity-anomaly)

・・・それでも、検出結果は出ませんでした。
## 考察：なぜ出なかったのか
正直全然わかりません。笑
普段そんなに使ったことないので・・・どのくらいで検知されるかとか肌感が全くなしでした泣

### 規模が小さすぎた？
いちばん怪しいと思っているのがこれ。
「いつも」と比べると千倍以上だけど、読んだのは5万〜10万行、データ量にすると数MBくらい。テーブルも1つ。
異常検知は、誤検知を減らすために、比率だけでなくある程度の絶対量も見ていることが多いそうなので、本番のDBから見たら、数MBの読み出しは誤差なのかもしれない。
ん～～試す前にもっとちゃんと調べておけばよかったかも。

### 「いつもの動き」が少なすぎた？
学習させたのは、1時間に1回、数十行を読むだけ。1日でも100回くらいの`SELECT`しかありません。
比べるもとのデータが少なすぎて、そもそも「いつも」がちゃんと作れていなかった可能性もあります。

### 学習期間が終わっていなかった？
ドキュメントの「最大2週間」は目安で、学習が終わったかを画面で確かめる方法はありません。
最初の`exfil`はちょうど2週間を過ぎたところだったので、これが原因の可能性もある。
ただ、その日の夜にくり返しても出なかったので、これだけでは説明できなさそう。

### VPCの中からだったから？
最初は「VPCの中からだから安全と判断された？」と思ったけど、ドキュメントでは、プライベートネットワークのIPからの`SELECT`や`DELETE`は、重要度が「低」になると書かれています。出なくなるのではなく、重要度が下がるだけ。
それに、本当の乗っ取りでも、VPCの中のアプリサーバーから読まれるのはよくある話なので、ここで出ないと困る。
## まとめ
- 新機能の監視が動いているかは、「使用状況」の`RDSDataActivity`の`MonitoredVcpuHours`で確認できる（ドキュメントの表にはまだない）
- 2週間学習させたあと、量・ユーザー・接続元・操作を変えて試したけど、検出結果は一度も出なかった
- 出なかった理由は分からない<br>規模が小さすぎた、「いつもの動き」が少なすぎた???
- 機械学習の検出は「いつも」次第なので、わざと試すのが難しかった

# 参考

- [週刊AWS – 2026/10/5週](https://aws.amazon.com/jp/blogs/news/aws-weekly-20261005/)
- [Amazon GuardDuty RDS Protection が Aurora および RDS データベースでのデータ流出とデータ破壊を検出可能に](https://aws.amazon.com/about-aws/whats-new/2026/10/guardduty-rds-data-exfiltration/)
- [GuardDuty RDS Protection](https://docs.aws.amazon.com/guardduty/latest/ug/rds-protection.html)
- [Monitoring GuardDuty Usage and Estimating Costs](https://docs.aws.amazon.com/guardduty/latest/ug/monitoring_costs.html)
- [Amazon GuardDuty の料金](https://aws.amazon.com/jp/guardduty/pricing/)
- [GuardDuty RDS Protection finding types](https://docs.aws.amazon.com/guardduty/latest/ug/findings-rds-protection.html)
- [Testing and evaluating GuardDuty detections](https://aws.amazon.com/blogs/security/testing-and-evaluating-guardduty-detections)
