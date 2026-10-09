// 収集（collect: で始まるコミット）で作られた記事が、✍️ 欄が空のままになっているかを調べる。
// AI が収集のときに ✍️ 欄へ書いてしまうと、調べていない記事が「公開対象」になってしまうため。
//
//   node scripts/check-collect.js <before> <after>
//
// <before>..<after> の範囲のコミットを調べる。<before> が無い（新しいブランチの push など）ときは
// <after> までのすべてのコミットを調べる。CI から push イベントの前後のコミットを渡して使う。

const { execFileSync } = require("child_process");
const path = require("path");
const { checkText, lintText, ARTICLE_NAME } = require("./check-study");

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function commitExists(sha) {
  if (!sha || /^0+$/.test(sha)) return false;
  try {
    git("cat-file", "-e", `${sha}^{commit}`);
    return true;
  } catch {
    return false;
  }
}

const [before, after = "HEAD"] = process.argv.slice(2);
const range = commitExists(before) ? `${before}..${after}` : after;
const commits = git("log", "--format=%H %s", range)
  .split("\n")
  .filter((line) => /^[0-9a-f]+ collect:/.test(line));

let ng = false;
for (const line of commits) {
  const [sha, ...subject] = line.split(" ");
  const files = git("diff-tree", "--no-commit-id", "--name-only", "-r", "--root", "--diff-filter=AM", sha, "--", "articles/")
    .split("\n")
    .filter((file) => ARTICLE_NAME.test(path.basename(file)));
  for (const file of files) {
    const text = git("show", `${sha}:${file}`);
    const result = checkText(text, path.basename(file));
    const label = `${sha.slice(0, 7)} ${subject.join(" ")}: ${result.file}`;
    if (result.filled > 0) {
      console.error(`NG: ${label}: 収集したばかりなのに ✍️ 欄が ${result.filled} 件書かれている`);
      ng = true;
    }
    if (result.published) {
      console.error(`NG: ${label}: 収集したばかりなのに published: true になっている`);
      ng = true;
    }
    for (const error of lintText(text)) {
      console.error(`NG: ${label}: ${error}`);
      ng = true;
    }
  }
}
if (ng) process.exit(1);
console.log(`OK: 収集のコミット ${commits.length} 件を確認した`);
