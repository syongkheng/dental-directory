// Node-only env access for config files (react-router.config.ts, routes.ts, scripts).
// Inside the app, use import.meta.env via app/config/flags.ts instead.
import { loadEnv } from "vite";

export type NodeEnv = Record<string, string>;

function currentMode(): string {
  if (process.env.NODE_ENV === "production") return "production";
  if (process.argv.some((a) => a === "build" || a.endsWith("postbuild.ts"))) return "production";
  return "development";
}

/** VITE_* values from .env files, overridden by real process env (as Vite itself does). */
export function nodeEnv(mode = currentMode()): NodeEnv {
  const fromFiles = loadEnv(mode, process.cwd(), "VITE_");
  const fromProcess = Object.fromEntries(
    Object.entries(process.env).filter(
      (e): e is [string, string] => e[0].startsWith("VITE_") && typeof e[1] === "string",
    ),
  );
  return { ...fromFiles, ...fromProcess };
}

export const isOn = (v: string | undefined): boolean => v === "true" || v === "1";
