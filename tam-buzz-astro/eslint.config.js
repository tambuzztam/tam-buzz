import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  {
    rules: {
      // Tune as needed
      "no-unused-vars": "warn",
    },
  },
  {
    // TODO: remove once real App Store link is added
    files: ["**/pages/listen/index.astro"],
    rules: {
      "astro/jsx-a11y/anchor-is-valid": "off",
    },
  },
  {
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
];
