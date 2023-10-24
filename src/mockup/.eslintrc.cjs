/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "formatjs/no-literal-string-in-jsx": "off",
      },
    },
  ],
};
