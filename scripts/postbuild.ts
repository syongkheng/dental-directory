// Post-build: writes sitemap.xml (public, enabled routes only) and robots.txt into build/client,
// copies the SPA fallback to 404.html (static hosts such as Vercel serve it with a 404 status for
// unknown paths, and the router then renders the Not found page), checks every pre-rendered route
// has its own HTML file, and warns with the TBC count.
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { nodeEnv } from "../app/config/node-env";
import { prerenderPaths, sitemapPaths } from "../app/config/paths";
import { scanTbc } from "./tbc-lib";

const OUT = "build/client";
const env = nodeEnv("production");
const site = (env.VITE_SITE_URL || "https://pdcadental.com").replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const loc = (p: string) => (p === "/" ? `${site}/` : `${site}${p}`);
const urls = sitemapPaths()
  .map((p) => `  <url><loc>${loc(p)}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

// /insights is deliberately not mentioned here (listing it would advertise it).
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

copyFileSync(join(OUT, "__spa-fallback.html"), join(OUT, "404.html"));

const missing = prerenderPaths().filter((p) => {
  const file = p === "/" ? join(OUT, "index.html") : join(OUT, p.slice(1), "index.html");
  return !existsSync(file);
});
if (missing.length) {
  console.error(`postbuild: missing pre-rendered HTML for ${missing.join(", ")}`);
  process.exit(1);
}

const tbc = scanTbc();
console.log(`postbuild: wrote sitemap.xml (${sitemapPaths().length} URLs) robots.txt and 404.html`);
if (tbc.length) {
  console.warn(`\x1b[33mpostbuild warning: ${tbc.length} TBC items still open (run \`npm run tbc\` for the list)\x1b[0m`);
}
