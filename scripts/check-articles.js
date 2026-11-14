// 下書き（drafts/<週>/）と公開済みの記事（articles/）を調べる。
//
//   node scripts/check-articles.js           記事ごとの状態（✍️ を書いたか、公開済みか）を表示
//   node scripts/check-articles.js --lint    CI 向け。記事の形がテンプレートどおりでなければ失敗する
//   node scripts/check-articles.js --guard   CI 向け。公開のルールに反する記事があれば失敗する
//                                              - articles/ の記事は published: true で、✍️ が書かれている
//                                              - drafts/ の記事は published: false
//
// 記事は 2 種類ある。ファイル名（slug）で見分ける。
//   週刊AWS の記事  aws-YYYYMMDD-名前。drafts/<週の月曜日>/ に置き、テンプレートの 4 つの見出しで書く
//   そのほかの記事  aws- で始まらない名前。drafts/<テーマ名>/ に置き、見出しは自由。全体が aki の文章
//
// ✍️ 欄が書かれているかは、空のまま公開されるのを防ぐためだけに見る。
// 公開するかどうかは aki が決める（docs/workflow.md）。

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIRS = ["drafts", "articles"];
const SLUG = /^aws-\d{8}-[a-z0-9-]+$/;
const OTHER_SLUG = /^[a-z0-9-]+$/;
const WEEK = /^\d{4}-\d{2}-\d{2}$/;
const SECTIONS = ["はじめに", "🤖 AIの解説", "✍️ 自分の調査・勉強結果", "参考"];
const STUDY = SECTIONS[2];
const FENCE = /^\s*(```|~~~)/;
const FOOTNOTE_DEF = /^\[\^[^\]]+\]:/;

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

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : null;
}

function isPublished(text) {
  const fm = frontmatter(text);
  return !!fm && /^published:\s*true\s*$/m.test(fm);
}

function title(text) {
  const m = (frontmatter(text) ?? "").match(/^title:\s*"?(.*?)"?\s*$/m);
  return m ? m[1].replace(/\\"/g, '"') : "";
}

// 「# 見出し」ごとに本文を分ける。見出しより前（導入文）は heading: null。
function sections(text) {
  const result = [{ heading: null, lines: [] }];
  for (const s of scanLines(text)) {
    if (!s.inFence && /^#\s/.test(s.line)) {
      result.push({ heading: s.line.replace(/^#\s+/, "").trim(), lines: [] });
    } else {
      result[result.length - 1].lines.push(s);
    }
  }
  return result;
}

// 週刊AWS の記事か（それ以外は、見出しが自由な「そのほかの記事」）
function isWeekly(slug) {
  return slug.startsWith("aws-");
}

// 本文がフロントマターとコメントだけでないか
function hasBody(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").replace(/<!--[\s\S]*?-->/g, "").trim() !== "";
}

// ✍️ 欄にテンプレートのコメントと脚注の定義以外の文字があるか。
// そのほかの記事は全体が aki の文章なので、本文があるかを見る
function isStudied(text, slug) {
  if (slug && !isWeekly(slug)) return hasBody(text);
  const study = sections(text).find((s) => s.heading === STUDY);
  if (!study) return false;
  const body = study.lines
    .filter((s) => s.inFence || !FOOTNOTE_DEF.test(s.line))
    .map((s) => s.line)
    .join("\n");
  return body.replace(/<!--[\s\S]*?-->/g, "").trim() !== "";
}

// 記事の形がテンプレートどおりかを調べ、問題点の一覧を返す（問題がなければ空）
function lintText(text, slug) {
  const errors = [];
  const weekly = isWeekly(slug);
  if (weekly && !SLUG.test(slug)) errors.push(`ファイル名が aws-YYYYMMDD-名前 の形になっていない: ${slug}`);
  if (!weekly && !OTHER_SLUG.test(slug)) errors.push(`ファイル名は英小文字・数字・ハイフンだけにする: ${slug}`);
  if (slug.length < 12 || slug.length > 50) errors.push(`ファイル名（拡張子なし）は 12〜50 文字にする（Zenn の制限）: ${slug.length} 文字`);
  const fm = frontmatter(text);
  if (!fm) errors.push("フロントマターがない");
  else {
    if (!/^published:\s*(true|false)\s*$/m.test(fm)) errors.push("フロントマターに published: true / false がない");
    const t = title(text);
    if (!t || t.includes("自分の言葉で表したタイトル")) errors.push("タイトルが決まっていない");
    else if (t.length > 70) errors.push(`タイトルが長すぎる（Zenn は 70 文字まで）: ${t.length} 文字`);
  }
  const headings = sections(text).slice(1).map((s) => s.heading);
  if (weekly && headings.join(" / ") !== SECTIONS.join(" / ")) {
    errors.push(`「#」の見出しは ${SECTIONS.join(" / ")} の順に 1 つずつにする（今: ${headings.join(" / ") || "なし"}）`);
  }
  return errors;
}

// 記事ファイルの一覧。下書きは drafts/<週>/ に、公開済みの記事は articles/ に直接置く
function articleFiles() {
  const files = [];
  const walk = (rel) => {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) return;
    for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory() && rel === "drafts") walk(child);
      else if (entry.isFile() && entry.name.endsWith(".md")) files.push(child);
    }
  };
  DIRS.forEach(walk);
  return files.sort();
}

function listArticles() {
  return articleFiles().map((rel) => {
    const file = path.join(ROOT, rel);
    const text = fs.readFileSync(file, "utf8");
    return {
      dir: rel.split("/")[0],
      folder: path.posix.dirname(rel),
      rel,
      slug: path.basename(rel, ".md"),
      file,
      title: title(text),
      published: isPublished(text),
      studied: isStudied(text, path.basename(rel, ".md")),
      text,
    };
  });
}

// 下書きの場所が正しいか。週刊AWS は drafts/<週>/、そのほかの記事は drafts/<テーマ名>/
function placeErrors(article) {
  if (article.dir !== "drafts") return [];
  const sub = article.folder.split("/")[1] ?? "";
  if (isWeekly(article.slug) && !WEEK.test(sub)) {
    return ["週刊AWS の下書きは drafts/<週の月曜日 YYYY-MM-DD>/ の中に置く"];
  }
  if (!isWeekly(article.slug) && (!sub || WEEK.test(sub) || !OTHER_SLUG.test(sub))) {
    return ["週刊AWS 以外の下書きは drafts/<テーマ名（英小文字・数字・ハイフン）>/ の中に置く"];
  }
  return [];
}

function guardErrors(article) {
  const errors = [];
  if (article.dir === "articles") {
    if (!article.published) errors.push("articles/ にあるのに published: false になっている");
    if (!article.studied) errors.push(isWeekly(article.slug) ? "✍️ 欄が空のまま articles/ にある（空のまま公開されてしまう）" : "本文が空のまま articles/ にある");
  } else if (article.published) {
    errors.push("drafts/ にあるのに published: true になっている");
  }
  return errors;
}

if (require.main === module) {
  const articles = listArticles();
  const fail = (lines) => {
    for (const line of lines) console.error(`NG: ${line}`);
    process.exit(lines.length > 0 ? 1 : 0);
  };
  if (process.argv.includes("--lint")) {
    const errors = articles.flatMap((a) => [...placeErrors(a), ...lintText(a.text, a.slug)].map((e) => `${a.rel}: ${e}`));
    const slugs = articles.map((a) => a.slug);
    for (const slug of new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))) {
      errors.push(`同じファイル名の記事が複数ある: ${slug}`);
    }
    if (errors.length === 0) console.log(`OK: ${articles.length} 本すべてテンプレートどおりの形になっている`);
    fail(errors);
  } else if (process.argv.includes("--guard")) {
    const errors = articles.flatMap((a) => guardErrors(a).map((e) => `${a.rel}: ${e}`));
    if (errors.length === 0) console.log("OK: 公開のルールに反する記事はない");
    fail(errors);
  } else {
    const folders = [...new Set(articles.map((a) => a.folder))];
    for (const folder of folders) {
      const list = articles.filter((a) => a.folder === folder);
      console.log(`${folder}/（${list.length} 本）`);
      for (const a of list) console.log(`  ${!isWeekly(a.slug) ? "単発   " : a.studied ? "✍️ あり" : "✍️ なし"}  ${a.slug}  ${a.title}`);
    }
  }
}

module.exports = { listArticles, lintText, isStudied, isWeekly, isPublished, title, guardErrors, SLUG };
