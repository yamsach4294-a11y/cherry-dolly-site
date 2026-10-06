import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// GitHub Pages hosts this repository under a subpath, not the domain root.
execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_STATIC_EXPORT: "1",
    NEXT_PUBLIC_BASE_PATH: "/cherry-dolly-site",
  },
});

// Serve Next's _next directory without Jekyll filtering underscore folders.
writeFileSync("out/.nojekyll", "");
