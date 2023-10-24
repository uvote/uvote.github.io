/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["jest.config.js", "package.json"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "eslint-plugin-tsdoc",
    "formatjs",
    "import",
    "jsx-a11y",
    "prettier",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "formatjs/no-literal-string-in-jsx": "warn",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-cycle": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "no-case-declarations": "error",
    "no-console": [
      "warn",
      {
        allow: ["error", "info", "warn"],
      },
    ],
    "prettier/prettier": "warn",
    "react/display-name": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/hook-use-state": [
      "error",
      {
        allowDestructuredState: true,
      },
    ],
    "react/jsx-boolean-value": "error",
    "react/jsx-key": "error",
    "react/jsx-newline": [
      "warn",
      {
        allowMultilines: true,
        prevent: true,
      },
    ],
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-leaked-render": "error",
    "react/jsx-no-useless-fragment": "error",
    "react/jsx-pascal-case": [
      "error",
      {
        allowLeadingUnderscore: true,
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        noSortAlphabetically: true,
        reservedFirst: true,
        shorthandFirst: true,
      },
    ],
    "react/jsx-wrap-multilines": "error",
    "react/no-danger": "error",
    "react/no-deprecated": "error",
    "react/prop-types": "off",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    "sort-keys": "off",
    "tsdoc/syntax": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
