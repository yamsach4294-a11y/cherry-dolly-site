import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const imageHash = createHash("sha256");
for (const filename of readdirSync("public/images").filter((file) => file.endsWith(".png")).sort()) {
  imageHash.update(filename);
  imageHash.update(readFileSync(`public/images/${filename}`));
}

// GitHub Pages hosts this repository under a subpath, not the domain root.
execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_STATIC_EXPORT: "1",
    NEXT_PUBLIC_BASE_PATH: "/cherry-dolly-site",
    NEXT_PUBLIC_IMAGE_VERSION: imageHash.digest("hex").slice(0, 12),
  },
});

// Serve Next's _next directory without Jekyll filtering underscore folders.
writeFileSync("out/.nojekyll", "");
