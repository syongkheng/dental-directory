import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// The Rx form download is shown in production only once the PDF exists (TBC item).
const rxFormAvailable = existsSync("public/files/pdca-rx-form.pdf");

export default defineConfig({
  plugins: [reactRouter()],
  resolve: { alias: { "~": resolve("app") } },
  define: {
    __RX_FORM_AVAILABLE__: JSON.stringify(rxFormAvailable),
  },
});
