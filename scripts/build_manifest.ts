import write from "write-file-utf8";

import { getAppInfo } from "./_app_info.js";

const {
  colors: { backgroundColor, themeColor },
  metadata: { asciiName },
} = await getAppInfo();

const content = `{
  "short_name": "${asciiName}",
  "name": "${asciiName}",
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

await write("public/manifest.json", content);
