// 各記事の「✍️ 自分の調査・勉強結果」欄がどれだけ書かれているかを数え、公開対象かどうかを判定する。
//
//   node scripts/check-study.js           一覧を表示
//   node scripts/check-study.js --json    ルーティン向けに JSON で出力
//   node scripts/check-study.js --guard   CI 向け。✍️ 欄が 0 件なのに published: true の記事があれば失敗する
//
// 判定ルール（docs/workflow.md）:
//   - 公開済み（published: true）の記事は、そのまま更新として扱う
//   - 未公開の記事は、記入済みの ✍️ 欄が 1 件以上あれば公開対象

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.join(__dirname, "..", "articles");
const STUDY_HEADING = /^###\s+✍️\s*自分の調査・勉強結果\s*$/;
const ANY_HEADING = /^#{1,6}\s/;
const FOOTNOTE_DEF = /^\[\^[^\]]+\]:/;
const UNSTUDIED = "今週は未調査";

function isPublished(text) {
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return !!frontmatter && /^published:\s*true\s*$/m.test(frontmatter[1]);
}

// ✍️ 欄ごとに、見出しの次の行から次の見出しの手前までを取り出す。
// 脚注の定義は欄の中身ではないので除く。
function studySections(text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    if (STUDY_HEADING.test(line)) {
      current = [];
      sections.push(current);
    } else if (ANY_HEADING.test(line)) {
      current = null;
    } else if (current && !FOOTNOTE_DEF.test(line)) {
      current.push(line);
    }
  }
  return sections.map((body) => body.join("\n"));
}

function isFilled(body) {
  const content = body.replace(/<!--[\s\S]*?-->/g, "").trim();
  return content !== "" && content !== UNSTUDIED;
}

function checkArticle(file) {
  const text = fs.readFileSync(file, "utf8");
  const sections = studySections(text);
  const filled = sections.filter(isFilled).length;
  const published = isPublished(text);
  let verdict;
  if (published) verdict = "published";
  else if (filled > 0) verdict = "publish";
  else verdict = "hold";
  return { file: path.basename(file), published, filled, total: sections.length, verdict };
}

function listArticles() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => /^aws-weekly-\d{4}-\d{2}-\d{2}\.md$/.test(name))
    .sort()
    .map((name) => path.join(ARTICLES_DIR, name));
}

const VERDICT_LABEL = {
  published: "公開済み（書き足した分は次の公開で更新）",
  publish: "公開対象",
  hold: "公開しない",
};

if (require.main === module) {
  const results = listArticles().map(checkArticle);
  if (process.argv.includes("--guard")) {
    const violations = results.filter((r) => r.published && r.filled === 0);
    for (const r of violations) {
      console.error(`NG: ${r.file} は ✍️ 欄が 0 件なのに published: true になっている`);
    }
    if (violations.length > 0) process.exit(1);
    console.log("OK: 未調査のまま公開される記事はない");
  } else if (process.argv.includes("--json")) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const r of results) {
      console.log(`${r.file}  記入済み ${r.filled} / ${r.total}  → ${VERDICT_LABEL[r.verdict]}`);
    }
  }
}

module.exports = { checkArticle, listArticles, studySections, isFilled, STUDY_HEADING, ANY_HEADING, FOOTNOTE_DEF, UNSTUDIED };
