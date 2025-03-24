import importsRule from "./imports.mjs";
import exportsRule from "./exports.mjs";
import eslintPluginImport from "eslint-plugin-import";

const eslintPluginSimpleImportSort = {
  meta: {
    name: "eslint-plugin-simple-import-sort",
    version: "%VERSION%",
  },
  configs: {},
  rules: {
    imports: importsRule,
    exports: exportsRule,
  },
};

Object.assign(eslintPluginSimpleImportSort.configs, {
  recommended: {
    languageOptions: {
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
      import: eslintPluginImport,
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
});

export default eslintPluginSimpleImportSort;
