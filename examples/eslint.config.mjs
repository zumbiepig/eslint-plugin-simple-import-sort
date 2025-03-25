import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import babelParser from "@babel/eslint-parser";
import vue from "eslint-plugin-vue";
import markdown from "eslint-plugin-markdown";
import simpleImportSort from "../src/index.js";

export default defineConfig([
  {
    languageOptions: {
      globals: {},
      ecmaVersion: 5,
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/1.spaces.just-sort.js"],
  },
  {
    files: ["**/2.spaces.eslint-builtin.js"],

    rules: {
      "comma-spacing": "error",
      indent: "error",
      "object-curly-spacing": "error",
    },
  },
  {
    files: ["**/3.spaces.prettier.js"],
  },
  {
    files: ["**/eslint-plugin-import.js"],

    plugins: {
      import: importPlugin,
    },

    rules: {
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/ignore.js"],

    plugins: {
      import: importPlugin,
    },

    rules: {
      "no-duplicate-imports": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    files: ["**/groups.custom.js"],

    rules: {
      imports: [
        "error",
        {
          groups: [
            [
              "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
            ],
            ["^react", "^@?\\w"],
            ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.no-blank-lines.js"],

    rules: {
      imports: [
        "error",
        {
          groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]],
        },
      ],
    },
  },
  {
    files: ["**/groups.default-reverse.js"],

    rules: {
      imports: [
        "error",
        {
          groups: [["^\\."], ["^"], ["^@?\\w"], ["^node:"], ["^\\u0000"]],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-first.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            ["^.*\\u0000$"],
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-last.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
            ["^.+\\u0000$"],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-first-sorted.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            [
              "^node:.*\\u0000$",
              "^@?\\w.*\\u0000$",
              "^[^.].*\\u0000$",
              "^\\..*\\u0000$",
            ],
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-last-sorted.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:"],
            ["^@?\\w"],
            ["^"],
            ["^\\."],
            [
              "^node:.*\\u0000$",
              "^@?\\w.*\\u0000$",
              "^[^.].*\\u0000$",
              "^\\..*\\u0000$",
            ],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-first-in-each-group.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:.*\\u0000$", "^node:"],
            ["^@?\\w.*\\u0000$", "^@?\\w"],
            ["(?<=\\u0000)$", "^"],
            ["^\\..*\\u0000$", "^\\."],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.type-imports-last-in-each-group.ts"],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      imports: [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^node:", "^node:.*\\u0000$"],
            ["^@?\\w", "^@?\\w.*\\u0000$"],
            ["(?<!\\u0000)$", "(?<=\\u0000)$"],
            ["^\\.", "^\\..*\\u0000$"],
          ],
        },
      ],
    },
  },
  {
    files: ["**/groups.none.js"],

    rules: {
      imports: [
        "error",
        {
          groups: [],
        },
      ],
    },
  },
  {
    files: ["**/readme-*.js"],

    languageOptions: {
      parser: babelParser,
    },
  },
  {
    files: ["**/*.ts", "**/*.mts"],

    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["**/*.vue"],

    plugins: {
      vue,
    },
  },
  {
    files: ["**/*.md"],

    plugins: {
      markdown,
    },

    processor: "markdown/markdown",
  },
]);
