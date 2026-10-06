import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

if (!existsSync("out/index.html") || !existsSync("out/.nojekyll")) {
  throw new Error("Run npm run build:pages before publishing.");
}

const git = (args, env = process.env) => execFileSync("git", args, {
  env,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "inherit"],
}).trim();

const temporaryDirectory = mkdtempSync(join(tmpdir(), "cherry-dolly-pages-"));
const indexEnvironment = {
  ...process.env,
  GIT_INDEX_FILE: join(temporaryDirectory, "index"),
};

try {
  // Use a separate index so publishing never switches or replaces source files.
  const remoteBranch = git(["ls-remote", "origin", "refs/heads/gh-pages"]);
  const parents = [];
  if (remoteBranch) {
    git(["fetch", "origin", "gh-pages"]);
    parents.push("-p", git(["rev-parse", "FETCH_HEAD"]));
  }

  const exportGit = (args) => git([`--work-tree=${resolve("out")}`, ...args], indexEnvironment);
  exportGit(["read-tree", "--empty"]);
  exportGit(["add", "--all"]);
  const tree = exportGit(["write-tree"]);
  const commit = git(["commit-tree", tree, ...parents, "-m", "Publish Cherry Dolly static site"]);
  git(["push", "origin", `${commit}:refs/heads/gh-pages`]);
  console.log("Published files to gh-pages. GitHub Pages may take a few minutes to update.");
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
