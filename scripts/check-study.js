// 各記事の「✍️ 自分の調査・勉強結果」欄がどれだけ書かれているかを数え、公開対象かどうかを判定する。
//
//   node scripts/check-study.js           一覧を表示
//   node scripts/check-study.js --json    ルーティン向けに JSON で出力
//   node scripts/check-study.js --guard   CI 向け。✍️ 欄が 0 件なのに published: true の記事があれば失敗する
//   node scripts/check-study.js --lint    CI 向け。記事の形がテンプレートどおりでなければ失敗する
//
// 判定ルール（docs/workflow.md）:
//   - 公開済み（published: true）の記事は、そのまま更新として扱う
//   - 未公開の記事は、記入済みの ✍️ 欄が 1 件以上あれば公開対象

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.join(__dirname, "..", "articles");
const ARTICLE_NAME = /^aws-weekly-\d{4}-\d{2}-\d{2}\.md$/;
const STUDY_HEADING = /^###\s+✍️\s*自分の調査・勉強結果\s*$/;
const AI_HEADING = /^###\s+🤖\s*AIの解説\s*$/;
const LIST_HEADING = /^#\s+今週のアップデート一覧\s*$/;
const ANY_HEADING = /^#{1,6}\s/;
const FENCE = /^\s*(```|~~~)/;
const FOOTNOTE_DEF = /^\[\^[^\]]+\]:/;
const UNSTUDIED = "今週は未調査";

// 行ごとに、コードブロックの中かどうかを付けて返す。
// コードブロック内の「# コメント」などを見出しと間違えないようにするため。
function scanLines(text) {
  let inFence = false;
  return text.split(/\r?\n/).map((line) => {
    const fence = FENCE.test(line);
    const result = { line, inFence: inFence || fence };
    if (fence) inFence = !inFence;
    return result;
  });
}

function isHeading({ line, inFence }) {
  return !inFence && ANY_HEADING.test(line);
}

function isPublished(text) {
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return !!frontmatter && /^published:\s*true\s*$/m.test(frontmatter[1]);
}

// ✍️ 欄ごとに、見出しの次の行から次の見出しの手前までを取り出す。
// 脚注の定義は欄の中身ではないので除く。
function studySections(text) {
  const sections = [];
  let current = null;
  for (const scanned of scanLines(text)) {
    const { line, inFence } = scanned;
    if (!inFence && STUDY_HEADING.test(line)) {
      current = [];
      sections.push(current);
    } else if (isHeading(scanned)) {
      current = null;
    } else if (current && (inFence || !FOOTNOTE_DEF.test(line))) {
      current.push(line);
    }
  }
  return sections.map((body) => body.join("\n"));
}

function isFilled(body) {
  const content = body.replace(/<!--[\s\S]*?-->/g, "").trim();
  return content !== "" && content !== UNSTUDIED;
}

function checkText(text, name) {
  const sections = studySections(text);
  const filled = sections.filter(isFilled).length;
  const published = isPublished(text);
  let verdict;
  if (published) verdict = "published";
  else if (filled > 0) verdict = "publish";
  else verdict = "hold";
  return { file: name, published, filled, total: sections.length, verdict };
}

function checkArticle(file) {
  return checkText(fs.readFileSync(file, "utf8"), path.basename(file));
}

// 記事の形がテンプレートどおりかを調べ、問題点の一覧を返す（問題がなければ空）。
//   - アップデート（##）ごとに「🤖 AIの解説」と「✍️ 自分の調査・勉強結果」が 1 つずつある
//   - それ以外の ### 見出しはない（見出しの文字が崩れていれば、ここで見つかる）
//   - 「今週のアップデート一覧」の表の行数と、アップデートの件数が一致する
function lintText(text) {
  const errors = [];
  if (!/^---\r?\n[\s\S]*?^published:\s*(true|false)\s*$[\s\S]*?^---/m.test(text)) {
    errors.push("フロントマターに published: true / false がない");
  }

  const updates = [];
  let current = null;
  let inList = false;
  let listRows = 0;
  for (const scanned of scanLines(text)) {
    const { line } = scanned;
    if (inList && !scanned.inFence && /^\|/.test(line)) listRows++;
    if (!isHeading(scanned)) continue;

    inList = LIST_HEADING.test(line);
    if (/^#\s/.test(line)) {
      current = null;
    } else if (/^##\s/.test(line)) {
      current = { title: line.replace(/^##\s+/, ""), ai: 0, study: 0 };
      updates.push(current);
    } else if (/^###\s/.test(line)) {
      if (!current) errors.push(`アップデートの外に見出しがある: ${line}`);
      else if (AI_HEADING.test(line)) current.ai++;
      else if (STUDY_HEADING.test(line)) current.study++;
      else errors.push(`テンプレートにない見出しがある: ${line}`);
    }
  }

  if (updates.length === 0) errors.push("アップデート（## 見出し）が 1 件もない");
  for (const u of updates) {
    if (u.ai !== 1) errors.push(`「🤖 AIの解説」が ${u.ai} 個ある（1 個のはず）: ${u.title}`);
    if (u.study !== 1) errors.push(`「✍️ 自分の調査・勉強結果」が ${u.study} 個ある（1 個のはず）: ${u.title}`);
  }
  // 表の行数から、見出し行と区切り行の 2 行を除く
  const listItems = Math.max(listRows - 2, 0);
  if (listItems !== updates.length) {
    errors.push(`一覧表の行数（${listItems}）とアップデートの件数（${updates.length}）が合わない`);
  }
  return errors;
}

function listArticles() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => ARTICLE_NAME.test(name))
    .sort()
    .map((name) => path.join(ARTICLES_DIR, name));
}

const VERDICT_LABEL = {
  published: "公開済み（書き足した分は次の公開で更新）",
  publish: "公開対象",
  hold: "公開しない",
};

if (require.main === module) {
  const files = listArticles();
  const results = files.map(checkArticle);
  if (process.argv.includes("--lint")) {
    let ng = false;
    for (const file of files) {
      for (const error of lintText(fs.readFileSync(file, "utf8"))) {
        console.error(`NG: ${path.basename(file)}: ${error}`);
        ng = true;
      }
    }
    if (ng) process.exit(1);
    console.log("OK: すべての記事がテンプレートどおりの形になっている");
  } else if (process.argv.includes("--guard")) {
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

module.exports = {
  checkArticle,
  checkText,
  lintText,
  listArticles,
  scanLines,
  isHeading,
  isFilled,
  ARTICLE_NAME,
  STUDY_HEADING,
  FOOTNOTE_DEF,
  UNSTUDIED,
};
