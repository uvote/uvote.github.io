import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { metadata } from "../src/metadata.js";
import { backgroundColor } from "../src/styles/colors.js";
import { themeColor } from "../src/styles/colors.js";

const pathname = join("public", "manifest.json");

const content = `{
  "short_name": "${metadata.asciiName}",
  "name": "${metadata.asciiName}",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "${themeColor}",
  "background_color": "${backgroundColor}"
}`;

await writeFile(pathname, content, { encoding: "utf8" });
