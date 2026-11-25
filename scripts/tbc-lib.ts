// Shared scanner for tbc("…") calls (used by `npm run tbc` and the postbuild warning).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export interface TbcHit {
  file: string;
  line: number;
  label: string;
  fallback?: string;
}

const CALL = /\btbc\(\s*(["'`])((?:\\.|(?!\1).)*)\1(?:\s*,\s*(["'`])((?:\\.|(?!\3).)*)\3)?/g;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "node_modules" || name === "__tests__") continue;
      walk(p, out);
    } else if (/\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name)) {
      out.push(p);
    }
  }
  return out;
}

export function scanTbc(root = process.cwd()): TbcHit[] {
  const hits: TbcHit[] = [];
  for (const file of walk(join(root, "app"))) {
    if (file.endsWith(join("lib", "tbc.ts"))) continue;
    const src = readFileSync(file, "utf8");
    // \s* also matches newlines, so multi-line calls are found too.
    for (const m of src.matchAll(CALL)) {
      const line = src.slice(0, m.index).split("\n").length;
      hits.push({ file: relative(root, file), line, label: m[2], fallback: m[4] });
    }
  }
  return hits.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}
