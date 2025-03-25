import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "fs";
import { join } from "path";

import { version } from "./package.json";

const SRC = join(__dirname, "src");
const BUILD = join(__dirname, "build");

const READ_MORE =
  "**[➡️ Full readme](https://github.com/lydell/eslint-plugin-simple-import-sort/)**";

const FILES_TO_COPY = [
  { src: "LICENSE" },
  { src: "package.json" },
  {
    src: "README.md",
    transform: (content) => content.replace(/<!--[^]*$/, READ_MORE),
  },
  ...readdirSync(SRC).map((file) => ({
    src: join(SRC, file),
    dest: file,
    transform: (content) => content.replace(/%VERSION%/g, version),
  })),
];

rmSync(BUILD, { recursive: true, force: true });
mkdirSync(BUILD);

for (const { src, dest = src, transform } of FILES_TO_COPY) {
  if (transform) {
    writeFileSync(join(BUILD, dest), transform(readFileSync(src, "utf8")));
  } else {
    copyFileSync(src, join(BUILD, dest));
  }
}
