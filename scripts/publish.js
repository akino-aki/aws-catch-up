// 指定した記事を Zenn に公開する（公開済みの記事なら、更新を反映する）。
// aki が「〇〇を公開して」と言ったときだけ実行する（docs/workflow.md）。
//
//   node scripts/publish.js <slug>
//
// 1. work で、記事を drafts/ から articles/ に移して published: true にし、コミットして push する
//    （公開済みの記事なら、今の内容をコミットして push する）
// 2. main をもとに、この記事とその画像だけを取り込んだ publish/<slug> ブランチを作る
//    記事以外（スクリプト・CI・ドキュメントなど）は work と同じにする。ほかの記事の変更は入れない
// 3. main への PR を作り、自動マージを予約する。CI のチェックに通るとマージされ、Zenn に反映される

const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { lintText, isStudied, title } = require("./check-articles");

const ROOT = path.join(__dirname, "..");
// 記事ごとに扱うもの。これ以外は work の内容をそのまま main に合わせる
const PER_ARTICLE = ["articles", "images", "drafts"];

function run(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8", ...opts }).trim();
}
const git = (...args) => run("git", args);

function fail(message) {
  console.error(`エラー: ${message}`);
  process.exit(1);
}

const slug = process.argv[2];
if (!slug) fail("使い方: node scripts/publish.js <slug>（drafts/ または articles/ のファイル名から .md を除いたもの）");

if (git("branch", "--show-current") !== "work") fail("work ブランチで実行してください");

const draft = path.join(ROOT, "drafts", `${slug}.md`);
const article = path.join(ROOT, "articles", `${slug}.md`);
const imageDir = path.join(ROOT, "images", slug);
const isNew = fs.existsSync(draft);
if (!isNew && !fs.existsSync(article)) fail(`drafts/${slug}.md も articles/${slug}.md も見つからない`);

// 1. work で公開用に整えてコミットする
let text = fs.readFileSync(isNew ? draft : article, "utf8");
const errors = lintText(text, slug);
if (errors.length > 0) fail(`記事の形がテンプレートどおりではない\n  ${errors.join("\n  ")}`);
if (!isStudied(text)) fail("✍️ 自分の調査・勉強結果 が空なので公開できない");

if (isNew) {
  text = text.replace(/^(---\r?\n[\s\S]*?)^published:\s*false\s*$/m, "$1published: true");
  fs.mkdirSync(path.dirname(article), { recursive: true });
  fs.writeFileSync(article, text);
  fs.unlinkSync(draft);
  git("add", "--all", "--", `drafts/${slug}.md`);
}
git("add", "--", `articles/${slug}.md`);
if (fs.existsSync(imageDir)) git("add", "--all", "--", `images/${slug}`);

const articleTitle = title(text);
const staged = git("diff", "--cached", "--name-only");
if (staged) {
  git("commit", "-m", `publish: ${articleTitle}`);
  console.log(`work にコミットした: publish: ${articleTitle}`);
} else {
  console.log("work に新しい変更はない（コミット済みの内容で公開する）");
}
git("push", "origin", "work");

// 2. main をもとに、この記事だけを取り込んだ公開用ブランチを作る
git("fetch", "origin", "main", "work");
const remoteBranches = git("ls-remote", "--heads", "origin", "publish/*");
let branch = `publish/${slug}`;
for (let n = 2; remoteBranches.includes(`refs/heads/${branch}`); n++) branch = `publish/${slug}-${n}`;

function buildPublishBranch(tree) {
  const inTree = (...args) => run("git", args, { cwd: tree });

  // 記事以外は work に合わせる（work で消したファイルは消す）
  const outside = (ref) =>
    inTree("ls-tree", "-r", "--name-only", ref)
      .split("\n")
      .filter((f) => f && !PER_ARTICLE.includes(f.split("/")[0]));
  const workFiles = new Set(outside("origin/work"));
  for (const f of outside("HEAD")) if (!workFiles.has(f)) inTree("rm", "-q", "--", f);
  if (workFiles.size > 0) inTree("checkout", "origin/work", "--", ...workFiles);

  // この記事と画像だけを取り込む
  inTree("checkout", "origin/work", "--", `articles/${slug}.md`);
  if (inTree("ls-tree", "--name-only", "origin/work", `images/${slug}`)) {
    inTree("checkout", "origin/work", "--", `images/${slug}`);
  }

  if (!inTree("diff", "--cached", "--name-only")) throw new Error("main と比べて変更がないので、公開するものがない");
  inTree("commit", "-m", `publish: ${articleTitle}`);
  inTree("push", "-u", "origin", branch);
}

const tree = fs.mkdtempSync(path.join(os.tmpdir(), "aws-catch-up-publish-"));
try {
  git("worktree", "add", "-B", branch, tree, "origin/main");
  try {
    buildPublishBranch(tree);
  } finally {
    git("worktree", "remove", "--force", tree);
    git("branch", "-D", branch);
  }
} catch (error) {
  fail(error.message);
}

// 3. PR を作って自動マージを予約する
const body = [
  `${isNew ? "新しく公開" : "公開済みの記事を更新"}: \`articles/${slug}.md\``,
  "",
  "CI のチェックに通ると自動でマージされ、Zenn に反映されます。",
].join("\n");
let url;
try {
  url = run("gh", ["pr", "create", "--base", "main", "--head", branch, "--title", `publish: ${articleTitle}`, "--body", body]);
  run("gh", ["pr", "merge", url, "--auto", "--merge"]);
} catch (error) {
  fail(`${branch} ブランチは push したが、PR の作成か自動マージの予約に失敗した
  ${(error.stderr || error.message).trim()}`);
}
console.log(`PR を作成し、自動マージを予約した: ${url}`);
