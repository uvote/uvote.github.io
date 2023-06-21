import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const homepagePathname = join("public", "index.html");
const pageNotFoundPathname = join("public", "404.html");

const content = `<!DOCTYPE html>
<html lang="en" className="has-navbar-fixed-top">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>u✓ote</title>
    <link rel="stylesheet" href="uvote.css" />
  </head>
  <body>
    <div id="root"></div>

    <script src="uvote.js"></script>
  </body>
</html>
`;

await writeFile(homepagePathname, content, { encoding: "utf8" });
await writeFile(pageNotFoundPathname, content, { encoding: "utf8" });
