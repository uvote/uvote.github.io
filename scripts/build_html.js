import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { metadata } from "../src/metadata.js";
import { themeColor } from "../src/styles/colors.js";

const pathname = join("public", "index.html");

const content = `<!DOCTYPE html>
<html lang="en" className="has-navbar-fixed-top">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="${themeColor}" />

    <meta name="version" content="%REACT_APP_VERSION%" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

    <title>${metadata.asciiName}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

await writeFile(pathname, content, { encoding: "utf8" });
