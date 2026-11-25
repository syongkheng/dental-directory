import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// Unit tests run without the React Router plugin.
export default defineConfig({
  resolve: { alias: { "~": resolve("app") } },
  define: { __RX_FORM_AVAILABLE__: "false" },
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
