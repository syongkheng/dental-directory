import type { Config } from "@react-router/dev/config";
import { prerenderPaths } from "./app/config/paths";

export default {
  ssr: false,
  prerender: prerenderPaths(),
} satisfies Config;
