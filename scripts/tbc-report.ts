// npm run tbc — prints every TBC label with its file and line.
import { scanTbc } from "./tbc-lib";

const hits = scanTbc();
for (const h of hits) {
  const fb = h.fallback ? `  → production: "${h.fallback}"` : "  → production: hidden";
  console.log(`${h.file}:${h.line}  TBC: ${h.label}${fb}`);
}
// Non-text TBC items that are not tbc() calls:
const extra = [
  "public/files/pdca-rx-form.pdf (Rx form PDF; download button hidden until it exists)",
  "Social profile URLs (app/content/site.ts → social; links hidden until set)",
  "Lab, team and case photos (app/content/pages/about.ts, misc.ts; slots removed until set)",
  "Logo files and Open Graph image (public/og-default.png is a neutral placeholder)",
  "Canonical domain (VITE_SITE_URL; pdcadental.com assumed)",
];
for (const e of extra) console.log(`(other)  TBC: ${e}`);
console.log(`\n${hits.length} tbc() items, ${extra.length} other TBC items.`);
