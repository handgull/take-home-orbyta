// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@angular-eslint/sort-lifecycle-methods": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
      "@angular-eslint/prefer-output-readonly": "error",
      "@angular-eslint/no-duplicates-in-metadata-arrays": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/conditional-complexity": "error",
      "@angular-eslint/template/cyclomatic-complexity": [
        "warn",
        {
          maxComplexity: 5,
        },
      ],
      "@angular-eslint/template/no-interpolation-in-attributes": "error",
      "@angular-eslint/template/attributes-order": "error",
      "@angular-eslint/template/prefer-self-closing-tags": "error",
    },
  },
);
