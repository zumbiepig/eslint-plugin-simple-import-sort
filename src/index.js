import importPlugin from "eslint-plugin-import";

import * as exportsRule from "./exports.js";
import * as importsRule from "./imports.js";

const simpleImportSort = {
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

Object.assign(simpleImportSort.configs, {
  recommended: {
    languageOptions: {
      sourceType: "module",
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
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

export default simpleImportSort;
