import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ["src/**/*.mjs"],
      100: true,
    },
  },
});
