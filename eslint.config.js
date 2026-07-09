export default [
  {
    ignores: [
      "node_modules/**",
      ".output/**",
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
      "dist/**",
      "build/**",
      "src/routeTree.gen.ts",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {},
  },
];
