import importsRule from "./imports.mjs";
import exportsRule from "./exports.mjs";

declare const eslintPluginSimpleImportSort: {
  meta: {
    name: "eslint-plugin-simple-import-sort",
    version: "%VERSION%",
  },
  configs: {
    recommended: {
      
    }
  },
  rules: {
    imports: typeof importsRule,
    exports: typeof exportsRule,
  },
};

export default eslintPluginSimpleImportSort;
