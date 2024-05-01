import read from "read-file-utf8";
import write from "write-file-utf8";

const translation = await read("translations/en.json");

const translationKeys = Object.keys(translation);

const content = `// DO NOT EDIT THIS FILE!
// it is generated by
//
//      npm run build_formatjs_types
// ////

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

await write("app/i18n/FormatjsIntlMessageIds.d.ts", content);
