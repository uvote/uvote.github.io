import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import translation from "../translations/en.json" assert { type: "json" };

const pathname = join("src", "i18n", "FormatjsIntlMessageIds.d.ts");

const translationKeys = Object.keys(translation);

const content = `// DO NOT EDIT THIS FILE: it is generated by
//     npm run build_formatjs_types

// prettier-ignore
export declare type FormatjsIntlMessageId = ${translationKeys
  .map((key) => `"${key}"`)
  .join(" | ")};

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: FormatjsIntlMessageId;
    }
  }
}
`;

await writeFile(pathname, content, { encoding: "utf8" });
