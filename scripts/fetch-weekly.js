// 週刊AWS の情報を取ってきて JSON で出力する。下書きを作るときの材料にする。
//
//   node scripts/fetch-weekly.js latest             最新号の対象週・タイトル・URL・公開日時
//   node scripts/fetch-weekly.js week 2026-09-28    指定した週の号に載っているアップデートの一覧
//
// 週は「対象週の月曜日」の日付で表す（記事ファイル名 aws-weekly-YYYY-MM-DD.md と同じ）。
// 「週刊生成AI with AWS」などの別の連載は対象外。

const { execFileSync } = require("child_process");

const FEED_URL = "https://aws.amazon.com/jp/blogs/news/tag/%E9%80%B1%E5%88%8Aaws/feed/";
const SITE = "https://aws.amazon.com";
const TITLE = /^週刊AWS\s*[–-]\s*(\d{4})\/(\d{1,2})\/(\d{1,2})\s*週/;
const USER_AGENT = "aws-catch-up (https://github.com/akino-aki/aws-catch-up)";

// Node の fetch は HTTPS_PROXY を使わないため、プロキシ経由でしか外に出られない環境
// （クラウドのルーティンなど）では失敗する。そのときは HTTPS_PROXY を使う curl で取り直す。
async function get(url) {
  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  } catch {
    try {
      return execFileSync("curl", ["-sSL", "--fail", "-A", USER_AGENT, url], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    } catch (error) {
      throw new Error(`${url} の取得に失敗した（fetch と curl のどちらも失敗: ${error.message.split("\n")[0]}）`);
    }
  }
  if (!res.ok) throw new Error(`${url} の取得に失敗した（HTTP ${res.status}）`);
  return res.text();
}

function decode(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

function pad(n) {
  return String(n).padStart(2, "0");
}

// 「週刊AWS – 2026/9/28週」→ "2026-09-28"
function weekOf(title) {
  const m = title.match(TITLE);
  return m ? `${m[1]}-${pad(m[2])}-${pad(m[3])}` : null;
}

function articleUrl(week) {
  return `${SITE}/jp/blogs/news/aws-weekly-${week.replace(/-/g, "")}/`;
}

async function latest() {
  const feed = await get(FEED_URL);
  const issues = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => {
      const title = stripTags(item.match(/<title>([\s\S]*?)<\/title>/)[1]);
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)[1];
      return { week: weekOf(title), title, url: articleUrl(weekOf(title) ?? ""), published: new Date(pubDate).toISOString() };
    })
    .filter((issue) => issue.week)
    .sort((a, b) => b.week.localeCompare(a.week));
  if (issues.length === 0) throw new Error("フィードに週刊AWS の号が見つからない");
  return issues[0];
}

async function week(week) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(week)) throw new Error(`週は YYYY-MM-DD で指定する: ${week}`);
  const url = articleUrl(week);
  const html = await get(url);

  const title = stripTags((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) ?? [, ""])[1]);
  if (weekOf(title) !== week) throw new Error(`${url} は ${week} の週刊AWS ではない（タイトル: ${title}）`);

  // 「…週の主要なアップデート」の見出しの次から、次の見出しまでがアップデートの一覧
  const start = html.search(/<h4[^>]*>[^<]*主要なアップデート<\/h4>/);
  if (start < 0) throw new Error("「主要なアップデート」の見出しが見つからない");
  const rest = html.slice(start + 1);
  const end = rest.search(/<h[1-4][\s>]/);
  const list = end < 0 ? rest : rest.slice(0, end);

  // 日付の行（<li>9/28(月)）とアップデートの行（<li><a href=…>）を出てきた順に読む
  const items = [];
  let day = null;
  const token = /<li>\s*(\d{1,2}\/\d{1,2}\([月火水木金土日]\))|<li>\s*<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>([\s\S]*?)<\/li>/g;
  for (const m of list.matchAll(token)) {
    if (m[1]) {
      day = m[1];
      continue;
    }
    const href = decode(m[2]);
    items.push({
      day,
      title: stripTags(m[3]),
      url: href.startsWith("/") ? SITE + href : href,
      description: stripTags(m[4]),
    });
  }
  if (items.length === 0) throw new Error("アップデートが 1 件も見つからない");
  return { week, title, url, items };
}

async function main() {
  const [command, arg] = process.argv.slice(2);
  let result;
  if (command === "latest") result = await latest();
  else if (command === "week") result = await week(arg);
  else throw new Error("使い方: node scripts/fetch-weekly.js latest | week YYYY-MM-DD");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(`エラー: ${error.message}`);
  process.exit(1);
});
