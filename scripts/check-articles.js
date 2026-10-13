// 下書き（drafts/）と公開済みの記事（articles/）を調べる。
//
//   node scripts/check-articles.js           記事ごとの状態（✍️ を書いたか、公開済みか）を表示
//   node scripts/check-articles.js --lint    CI 向け。記事の形がテンプレートどおりでなければ失敗する
//   node scripts/check-articles.js --guard   CI 向け。公開のルールに反する記事があれば失敗する
//                                              - articles/ の記事は published: true で、✍️ が書かれている
//                                              - drafts/ の記事は published: false
//
// ✍️ 欄が書かれているかは、空のまま公開されるのを防ぐためだけに見る。
// 公開するかどうかは aki が決める（docs/workflow.md）。

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIRS = ["drafts", "articles"];
const SLUG = /^aws-\d{8}-[a-z0-9-]+$/;
const SECTIONS = ["🤖 AIの解説", "✍️ 自分の調査・勉強結果", "参考"];
const STUDY = SECTIONS[1];
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
  return m ? m[1] : "";
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

// ✍️ 欄にテンプレートのコメントと脚注の定義以外の文字があるか
function isStudied(text) {
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
  if (!SLUG.test(slug)) errors.push(`ファイル名が aws-YYYYMMDD-名前 の形になっていない: ${slug}`);
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
  if (headings.join(" / ") !== SECTIONS.join(" / ")) {
    errors.push(`「#」の見出しは ${SECTIONS.join(" / ")} の順に 1 つずつにする（今: ${headings.join(" / ") || "なし"}）`);
  }
  return errors;
}

function listArticles() {
  return DIRS.flatMap((dir) => {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) return [];
    return fs
      .readdirSync(full)
      .filter((name) => name.endsWith(".md"))
      .sort()
      .map((name) => {
        const file = path.join(full, name);
        const text = fs.readFileSync(file, "utf8");
        return {
          dir,
          slug: name.replace(/\.md$/, ""),
          file,
          title: title(text),
          published: isPublished(text),
          studied: isStudied(text),
          text,
        };
      });
  });
}

function guardErrors(article) {
  const errors = [];
  if (article.dir === "articles") {
    if (!article.published) errors.push("articles/ にあるのに published: false になっている");
    if (!article.studied) errors.push("✍️ 欄が空のまま articles/ にある（空のまま公開されてしまう）");
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
    const errors = articles.flatMap((a) => lintText(a.text, a.slug).map((e) => `${a.dir}/${a.slug}.md: ${e}`));
    if (errors.length === 0) console.log(`OK: ${articles.length} 本すべてテンプレートどおりの形になっている`);
    fail(errors);
  } else if (process.argv.includes("--guard")) {
    const errors = articles.flatMap((a) => guardErrors(a).map((e) => `${a.dir}/${a.slug}.md: ${e}`));
    if (errors.length === 0) console.log("OK: 公開のルールに反する記事はない");
    fail(errors);
  } else {
    for (const dir of DIRS) {
      const list = articles.filter((a) => a.dir === dir);
      console.log(`${dir}/（${list.length} 本）`);
      for (const a of list) console.log(`  ${a.studied ? "✍️ あり" : "✍️ なし"}  ${a.slug}  ${a.title}`);
    }
  }
}

module.exports = { listArticles, lintText, isStudied, isPublished, title, guardErrors, SLUG };
