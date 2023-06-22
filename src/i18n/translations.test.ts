import enMessages from "../../translations/en.json";
import itMessages from "../../translations/it.json";
import { IntlMessage, isIntlMessage } from "./intlMessage";
import { defaultLocale, Locale, locales } from "./locales";

type Translation = Record<string, IntlMessage>;

const translations: Record<Locale, Translation> = {
  en: enMessages,
  it: itMessages,
};

const defaultTranslation = translations[defaultLocale];
const defaultLocaleMessageKeys = Object.keys(defaultTranslation);

describe("translations", () => {
  describe(defaultLocale, () => {
    defaultLocaleMessageKeys.forEach((messageKey) => {
      describe(messageKey, () => {
        it("has a valid IntlMessage value", () => {
          expect(isIntlMessage(defaultTranslation[messageKey])).toBeTruthy();
        });
      });
    });
  });

  locales
    .filter((locale) => locale !== defaultLocale)
    .forEach((locale) => {
      describe(locale, () => {
        const translation = translations[locale];
        const messagesKeys = Object.keys(translation);

        if (locale !== defaultLocale) {
          // Check that locale messagesKeys and defaultLocale messagesKeys are the same set.
          // If two sets A and B has same cardinality and A is contained into B, then A equals B.
          // Define:
          //   - A as locale messagesKeys.
          //   - B as defaultLocale messagesKeys.

          // Check A and B have the same cardinality.
          it("has number of messagesKeys equal to number of defaultLocale messagesKeys", () => {
            expect(messagesKeys.length).toBe(defaultLocaleMessageKeys.length);
          });

          // Check A is contained into B.
          messagesKeys.forEach((messageKey) => {
            describe(messageKey, () => {
              it("has a valid IntlMessage value", () => {
                expect(isIntlMessage(translation[messageKey])).toBeTruthy();
              });

              it("is contained in defaultLocaleMessageKeys", () => {
                expect(
                  defaultLocaleMessageKeys.includes(messageKey)
                ).toBeTruthy();
              });
            });
          });
        }
      });
    });
});
