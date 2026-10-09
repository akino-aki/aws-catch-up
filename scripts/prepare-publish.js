// 公開対象の記事を公開用に書き換える。公開の手順（docs/workflow.md）の中で、main にマージする直前に実行する。
//
//   node scripts/prepare-publish.js
//
// check-study.js で「公開対象」になった記事だけを、次のように書き換える。
//   - published: false → true
//   - 未記入の ✍️ 欄を「今週は未調査」で埋める
// 公開済みの記事と「公開しない」記事には触らない。

const fs = require("fs");
const path = require("path");
const {
  checkArticle,
  listArticles,
  isFilled,
  STUDY_HEADING,
  ANY_HEADING,
  FOOTNOTE_DEF,
  UNSTUDIED,
} = require("./check-study");

function fillUnstudied(text) {
  const lines = text.split(/\r?\n/);
  const out = [];
  let i = 0;
  while (i < lines.length) {
    out.push(lines[i]);
    if (!STUDY_HEADING.test(lines[i])) {
      i++;
      continue;
    }
    // 欄の本文（次の見出しか脚注の定義の手前まで）を集める
    let j = i + 1;
    while (j < lines.length && !ANY_HEADING.test(lines[j]) && !FOOTNOTE_DEF.test(lines[j])) j++;
    const body = lines.slice(i + 1, j);
    if (isFilled(body.join("\n"))) {
      out.push(...body);
    } else {
      out.push("", UNSTUDIED, "");
    }
    i = j;
  }
  return out.join("\n");
}

function publish(text) {
  return fillUnstudied(text).replace(/^(---\r?\n[\s\S]*?)^published:\s*false\s*$/m, "$1published: true");
}

const targets = listArticles().filter((file) => checkArticle(file).verdict === "publish");
for (const file of targets) {
  fs.writeFileSync(file, publish(fs.readFileSync(file, "utf8")));
  console.log(`公開用に更新: ${path.basename(file)}`);
}
if (targets.length === 0) console.log("新しく公開する記事はありません");
