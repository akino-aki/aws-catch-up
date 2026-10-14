// drafts/ の下書きを、Zenn のプレビューで確認する（http://localhost:8001）。
//
//   node scripts/preview-drafts.js
//
// zenn preview は articles/ の直下しか表示しないので、.preview/articles/ に
// drafts/<週>/ の下書きをまとめてコピーし、.preview/ でプレビューを起動する。
// 下書きを編集・追加・削除すると、コピーにもすぐ反映される。画像は images/ へのリンクで見せる。

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DRAFTS = path.join(ROOT, "drafts");
const PREVIEW = path.join(ROOT, ".preview");
const OUT = path.join(PREVIEW, "articles");

// 前回のコピーを作り直す。リンクになっていたら（古い作り方）、リンク先の中身は消さずにリンクだけ外す
const old = fs.lstatSync(OUT, { throwIfNoEntry: false });
if (old?.isSymbolicLink()) fs.rmdirSync(OUT);
else if (old) fs.rmSync(OUT, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

function sync(rel) {
  if (!rel.endsWith(".md")) return;
  const src = path.join(DRAFTS, rel);
  const dst = path.join(OUT, path.basename(rel));
  if (fs.existsSync(src)) fs.copyFileSync(src, dst);
  else fs.rmSync(dst, { force: true });
}

for (const week of fs.existsSync(DRAFTS) ? fs.readdirSync(DRAFTS) : []) {
  const dir = path.join(DRAFTS, week);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const name of fs.readdirSync(dir)) sync(path.join(week, name));
}
fs.watch(DRAFTS, { recursive: true }, (_, rel) => rel && sync(rel));

// 画像は images/ へのリンク（Windows でも管理者権限なしで作れるジャンクション）
const images = path.join(PREVIEW, "images");
const stat = fs.lstatSync(images, { throwIfNoEntry: false });
if (stat && !stat.isSymbolicLink()) throw new Error(`${images} がリンクではないので、消さずに止める`);
if (stat) fs.rmdirSync(images);
fs.symlinkSync(path.join(ROOT, "images"), images, "junction");

const zenn = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "zenn.cmd" : "zenn");
spawn(zenn, ["preview", "--port", "8001"], { cwd: PREVIEW, stdio: "inherit", shell: process.platform === "win32" });
