import importsRule from "./imports.mjs";
import exportsRule from "./exports.mjs";

type plugin = {
  meta: {
    name: "eslint-plugin-simple-import-sort",
    version: string,
  },
  rules: {
    imports: typeof importsRule,
    exports: typeof exportsRule,
  },
  configs: {
    recommended: {
      languageOptions: {
        sourceType: "module",
      },
      plugins: {
        "simple-import-sort": plugin,
        import: plugin,
      },
      rules: {
        // Disable conflicting rules
        "sort-imports": "off",
        "import/order": "off",
        // Enable imports/exports sorting
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        // Import style
        "import/first": "error",
        "import/exports-last": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
      },
    },
  },
};

declare const eslintPluginSimpleImportSort: plugin;

export default eslintPluginSimpleImportSort;
