// drafts/ の下書きを、Zenn のプレビューで確認する（http://localhost:8001）。
//
//   node scripts/preview-drafts.js
//
// zenn preview は articles/ しか表示しないので、.preview/ フォルダに
// articles → drafts/、images → images/ のリンクを作り、そこでプレビューを起動する。
// 下書きを編集すると、そのままプレビューに反映される。

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PREVIEW = path.join(ROOT, ".preview");

fs.mkdirSync(PREVIEW, { recursive: true });
for (const [link, target] of [
  ["articles", "drafts"],
  ["images", "images"],
]) {
  const linkPath = path.join(PREVIEW, link);
  // 前回のリンクを消す（リンク先の中身は消さない）
  if (fs.existsSync(linkPath) || fs.lstatSync(linkPath, { throwIfNoEntry: false })) {
    if (!fs.lstatSync(linkPath).isSymbolicLink()) throw new Error(`${linkPath} がリンクではないので、消さずに止める`);
    fs.rmdirSync(linkPath);
  }
  // Windows でも管理者権限なしで作れるように、フォルダのリンクはジャンクションにする
  fs.symlinkSync(path.join(ROOT, target), linkPath, "junction");
}

const zenn = path.join(ROOT, "node_modules", ".bin", process.platform === "win32" ? "zenn.cmd" : "zenn");
spawn(zenn, ["preview", "--port", "8001"], { cwd: PREVIEW, stdio: "inherit", shell: process.platform === "win32" });
