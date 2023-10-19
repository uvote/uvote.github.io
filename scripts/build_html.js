import write from "write-file-utf8";

import metadata from "../src/metadata.json" assert { type: "json" };
import colors from "../src/styles/colors.json" assert { type: "json" };

const { themeColor } = colors;

const content = (entryPoint) => `<!DOCTYPE html>
<!-- --------------------------------------------------------------------


    THIS FILE IS GENERATED.


--------------------------------------------------------------------- -->
<html lang="en" className="has-navbar-fixed-top">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="${themeColor}" />

    <link rel="apple-touch-icon" href="/logo192.png" />

    <title>${metadata.asciiName}</title>

    <script type="module" src="/src/polyfills.ts"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entryPoint}"></script>
  </body>
</html>
`;

await write("index.html", content("/src/main.tsx"));
