module.exports = {
  globals: { __PATH_PREFIX__: true },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [`react-app`],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.module.css.d.ts"],
  rules: {
    // "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        `react-app`,
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },
  ],
};
