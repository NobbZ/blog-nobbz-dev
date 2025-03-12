import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  { ignores: ["dist/*", ".astro/*"] },
  { languageOptions: { globals: { astroHTML: "readonly" } } },
];
