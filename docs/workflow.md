# 運用ルール

AWS のアップデート（週刊AWS）を 1 件ずつ調べて勉強し、1 アップデート 1 本の記事として Zenn に公開するまでの流れ。

## 全体像

```
週刊AWS が出る
   ↓  毎日 3:00 のルーティン（Claude）
drafts/ に、アップデートごとの下書きができる（🤖 AIの解説 まで書かれている）
   ↓  aki が work ブランチで ✍️ 欄を書いて push（何日かに分けてよい）
aki が Claude に「〇〇を公開して」と言う
   ↓  npm run publish -- <slug>
articles/ に移り、publish/<slug> から main への PR ができる
   ↓  CI のチェックに通ると自動でマージ
Zenn に公開される
```

- 記事は書き終えたものから 1 本ずつ公開する。新しい情報は早いほうが読んでもらえるため
- 公開するかどうかは aki が決める。ルーティンは公開しない

## ブランチ

| ブランチ | 役割 | 誰が触るか |
|---|---|---|
| `main` | Zenn と連携。公開済みの記事だけがある | 誰も直接触らない。PR のマージでだけ更新される |
| `work` | 既定ブランチ。毎日の作業場所 | aki とルーティン |
| `publish/<slug>` | 公開用。公開のたびに作られ、マージされると消える | `npm run publish` |

```
main  ─────────●──────────────●──────────
              ↗ PR           ↗ PR
publish/A ───●   publish/B ─●        ← main + 記事 A（または B）だけ
work  ─●──●──●──●──●──●──●──●──●──
      収集 勉強 公開A 勉強 公開B …
```

- `work` を丸ごと `main` にマージしない。公開用ブランチには、`main` に「公開する記事とその画像」だけを足す。ほかの記事に push 済みの書きかけがあっても、一緒に公開されない
- 記事以外（スクリプト・CI・ドキュメント・テンプレートなど）は、公開のたびに `work` の内容で `main` を更新する
- Git Flow の `develop`（＝ `work`）と `release`（＝ `publish/*`）だけを使った簡易版に近い

## フォルダ

```
aws-catch-up/
├── drafts/                       下書き（Zenn には同期されない）
├── articles/                     公開済みの記事（main のものが Zenn に同期される）
├── images/<slug>/                記事の画像
├── templates/article.md          記事のテンプレート
├── collected-weeks.txt           収集した週の記録
├── scripts/
│   ├── check-articles.js          記事の一覧・形のチェック・公開ルールのチェック（npm run check）
│   ├── check-collect.js           収集したばかりの下書きの ✍️ 欄が空かのチェック（CI 用）
│   ├── fetch-weekly.js            週刊AWS の最新号の判定と、アップデート一覧の取得
│   ├── publish.js                 公開（npm run publish -- <slug>）
│   └── preview-drafts.js          下書きのプレビュー（npm run preview:drafts）
├── .github/workflows/check.yml   CI
├── .claude/skills/aws-weekly/    収集の手順（スキル）
├── CLAUDE.md                     Claude が読むルール
└── docs/workflow.md              この資料
```

## aki の作業

### 書く

```bash
git switch work    # 既定ブランチなので、普段は最初から work にいる
git pull           # 深夜にルーティンが下書きを push していることがある
```

1. `drafts/` の下書きの「✍️ 自分の調査・勉強結果」を書く。AI の解説に間違いがあれば直してもよい
2. 画像は `images/<slug>/` に置き、`![説明](/images/<slug>/ファイル名.png)` で貼る
3. 見た目は `npm run preview:drafts`（http://localhost:8001）で確認する
4. commit & push する。何回に分けてもよい

### 公開する

Claude に「〇〇を公開して」と言う。Claude が `npm run publish -- <slug>` を実行し、PR の URL を教えてくれる。

公開済みの記事に書き足したときも、「〇〇の更新を反映して」と言えば同じ手順で更新される。ファイル名（slug）は変えないこと。変えると Zenn では別の記事として扱われる。

### 記事の一覧を見る

```bash
npm run check
```

## 毎日 3:00 のルーティン（Claude・クラウド）

スキル `/aws-weekly`（`.claude/skills/aws-weekly/SKILL.md`）を実行する。手動でも同じように動かせる。

| コマンド | やること |
|---|---|
| `/aws-weekly` | ルーティンと同じ処理。最新号がまだ収集されていなければ、下書きを作る |
| `/aws-weekly 2026-09-21` | 指定した週の下書きを作る（さかのぼり収集など） |
| `/aws-weekly --dry-run` | コミット・push をせずに、何が起きるかを確認する |

- 収集した週は `collected-weeks.txt` に記録する。興味のない下書きを消しても、同じ週がもう一度収集されることはない
- 週刊AWS は祝日の週に遅れたり、お休みの週があったりする。出ていない日は何もしない

## 安全装置（CI）

`main` へのマージには、GitHub Actions のチェック（`.github/workflows/check.yml`）に通ることが必須になっている。

| チェック | 何を止めるか | いつ動くか |
|---|---|---|
| 記事の形（`npm run check -- --lint`） | ファイル名・タイトル・`#` の見出しがテンプレートどおりでない | push・PR |
| 収集直後の下書き（`check-collect.js`） | `collect:` のコミットで作られた下書きの ✍️ 欄に、もう何か書かれている | `work` への push |
| 公開のルール（`npm run check -- --guard`） | ✍️ が空のまま `articles/` にある、`articles/` なのに `published: false`、`drafts/` なのに `published: true` | push・PR |

✍️ 欄のチェックは「空のまま公開されるのを防ぐ」ためだけのもので、公開してよいかの判断には使わない。

## コミットメッセージ

`種類: 日本語の説明` の形にする。

| 種類 | 誰が | 使う場面 | 例 |
|---|---|---|---|
| `collect` | ルーティン | 下書きの作成 | `collect: 2026/10/5週の下書き（15 本）を作成` |
| `study` | aki | 調査を書き足した | `study: CloudWatch Logs の自動インデックスを試した` |
| `fix` | aki | 書いた内容の間違いを直した | `fix: Aurora の料金説明を修正` |
| `publish` | `npm run publish` | 公開・更新 | `publish: <記事のタイトル>` |
| `docs` | 両方 | ルール・テンプレートの変更 | `docs: 確認ポイントの書式を変更` |
| `chore` | 両方 | 設定やツールの変更 | `chore: zenn-cli を更新` |

## リポジトリの設定

- public リポジトリ。コミットのメールアドレスは GitHub の noreply アドレスを使う
- 既定ブランチは `work`（クラウドのルーティンが取得したときに、最初からスキルが使えるようにするため）。Zenn が読むブランチは Zenn 側の設定で `main` にしている
- `main` のブランチ保護: PR 必須、チェック `check` の成功必須、管理者も例外なし
- 自動マージ（auto-merge）を有効にし、マージした PR のブランチは自動で消す
