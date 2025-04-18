import * as shared from "./shared.js";

export const meta = {
  type: "layout",
  fixable: "code",
  docs: {
    url: "https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order",
    description: "Automatically sort exports.",
  },
  messages: {
    sort: "Run autofix to sort these exports!",
  },
};
export function create(context) {
  const parents = new Set();

  const addParent = (node) => {
    if (isExportFrom(node)) {
      parents.add(node.parent);
    }
  };

  return {
    ExportNamedDeclaration: (node) => {
      if (node.source == null && node.declaration == null) {
        maybeReportExportSpecifierSorting(node, context);
      } else {
        addParent(node);
      }
    },

    ExportAllDeclaration: addParent,

    "Program:exit": () => {
      for (const parent of parents) {
        for (const chunk of shared.extractChunks(parent, (node, lastNode) =>
          isPartOfChunk(node, lastNode, context.sourceCode),
        )) {
          maybeReportChunkSorting(chunk, context);
        }
      }
      parents.clear();
    },
  };
}

function maybeReportChunkSorting(chunk, context) {
  const items = shared.getImportExportItems(
    chunk,
    context.sourceCode,
    () => false, // isSideEffectImport
    getSpecifiers,
  );
  const sortedItems = [[shared.sortImportExportItems(items)]];
  const sorted = shared.printSortedItems(
    sortedItems,
    items,
    context.sourceCode,
  );
  const { start } = items[0];
  const { end } = items[items.length - 1];
  shared.maybeReportSorting(context, sorted, start, end);
}

function maybeReportExportSpecifierSorting(node, context) {
  const sorted = shared.printWithSortedSpecifiers(
    node,
    context.sourceCode,
    getSpecifiers,
  );
  const [start, end] = node.range;
  shared.maybeReportSorting(context, sorted, start, end);
}

// `export * from "a"` does not have `.specifiers`.
function getSpecifiers(exportNode) {
  return exportNode.specifiers || [];
}

function isPartOfChunk(node, lastNode, sourceCode) {
  if (!isExportFrom(node)) {
    return "NotPartOfChunk";
  }

  const hasGroupingComment = sourceCode
    .getCommentsBefore(node)
    .some(
      (comment) =>
        (lastNode == null || comment.loc.start.line > lastNode.loc.end.line) &&
        comment.loc.end.line < node.loc.start.line,
    );

  return hasGroupingComment ? "PartOfNewChunk" : "PartOfChunk";
}

// Full export-from statement.
// export {a, b} from "A"
// export * from "A"
// export * as A from "A"
function isExportFrom(node) {
  return (
    (node.type === "ExportNamedDeclaration" ||
      node.type === "ExportAllDeclaration") &&
    node.source != null
  );
}
