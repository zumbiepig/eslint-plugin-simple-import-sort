import * as importsRule from "./imports.js";
import * as exportsRule from "./exports.js";
import importPlugin from "eslint-plugin-import";

declare const simpleImportSort: {
  meta: {
    name: "eslint-plugin-simple-import-sort";
    version: string;
  };
  configs: {
    recommended: {
      languageOptions: {
        sourceType: "module";
      };
      plugins: {
        "simple-import-sort": typeof simpleImportSort;
        import: typeof importPlugin;
      };
      rules: {
        // Disable conflicting rules
        "sort-imports": "off";
        "import/order": "off";
        // Enable imports/exports sorting
        "simple-import-sort/imports": "error";
        "simple-import-sort/exports": "error";
        // Import style
        "import/first": "error";
        "import/exports-last": "error";
        "import/newline-after-import": "error";
        "import/no-duplicates": "error";
      };
    };
  };
  rules: {
    imports: typeof importsRule;
    exports: typeof exportsRule;
  };
};

export default simpleImportSort;
