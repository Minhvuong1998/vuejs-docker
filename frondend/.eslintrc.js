module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  plugins: ["simple-import-sort", "@typescript-eslint"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off",
    "no-useless-catch": "off"
  }
}