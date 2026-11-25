# PDCA website

The production website for **Patrick Dental Ceramic Arts Pte Ltd (PDCA)**, a dental laboratory in Singapore. It's built from the approved wireframe in `reference/pdca-wireframes.html`, which is a reference only and is not shipped.

- **Stack:** Vite 8, React 19, TypeScript (strict), React Router 8 in framework mode, CSS Modules with global tokens, self-hosted Inter Variable, Vitest and Playwright.
- **Output:** fully static. Every public route is pre-rendered to its own HTML file with its own title, description and canonical URL. There is no runtime server.
- **Backend:** the site has no server code of its own. The analytics events, the `/insights` data (optional) and the enquiry form (optional) all use **qindom**, the shared backend. See "qindom integration" below.

## Setup

```bash
nvm use 22            # Node 22 or 24 LTS
npm install
npx playwright install chromium   # once, for end-to-end tests
cp env.example .env   # then edit
npm run dev           # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. TBC chips and photo placeholders are visible, and `track()` only logs to the console. |
| `npm run build` | `react-router build`, then `scripts/postbuild.ts`. The postbuild step writes `sitemap.xml` and `robots.txt`, checks that every route has its own HTML file, and warns with the TBC count. |
| `npm run preview` | Serves `build/client` on port 4173, with `__spa-fallback.html` as the fallback. |
| `npm run typecheck` | Runs `react-router typegen` and `tsc`. |
| `npm test` | Vitest unit tests. |
| `npm run test:e2e` | Playwright. It builds with test env values, serves the preview, and runs `tests/e2e`. |
| `npm run tbc` | Lists every open TBC item with its file and line. |
| `npm run lint` | ESLint. |

## Environment variables

The template is `env.example` (copy it to `.env`).

| Variable | Default | Purpose |
|---|---|---|
| `VITE_SITE_URL` | `https://pdcadental.com` | Canonical URLs, sitemap and JSON-LD. The domain is still to be confirmed. |
| `VITE_ANALYTICS_ENDPOINT` | empty | qindom base URL. Events go to `<url>/analytics/collect` after consent, and the qindom Insights adapter reads `<url>/analytics/report`. Empty turns tracking off. |
| `VITE_ENQUIRY_ENDPOINT` | empty | Full URL of qindom's `POST /pdca/enquiry`. Empty hides the form. |
| `VITE_FEATURE_OUR_WORK` | `false` | Our Work page (v1.1). |
| `VITE_FEATURE_CAREERS` | `false` | Careers page and the About teaser (v1.1). |
| `VITE_FEATURE_TESTIMONIALS` | `false` | Home testimonials. These also need real quotes in `app/content/pages/home.ts`. |
| `VITE_ANALYTICS_SOURCE` | `mock` | Insights data: `mock` (random sample data) or `qindom` (real). |

Config files run in Node, so they read env values with Vite's `loadEnv` (`app/config/node-env.ts`). Code inside the app reads `import.meta.env` (`app/config/flags.ts`).

## Editing content

All copy and facts live in `app/content/`. **CONTENT.md** explains, for a non-developer, which file holds which text.

## Deployment

- Deploy `build/client` as a static site. No server adapter is needed.
- **Vercel:** `vercel.json` sets the output directory to `build/client` (Vercel's Vite preset otherwise looks for `dist` and fails with `STATIC_BUILD_NO_OUT_DIR`), runs `npm run build`, and drops trailing slashes so URLs match the canonical tags. In the Vercel project settings, leave Build Command and Output Directory on their defaults so `vercel.json` applies, and add the `VITE_*` variables for Production.
- Unknown paths: `postbuild` copies React Router's `__spa-fallback.html` to `404.html`. Vercel (and most static hosts) serve it with a real 404 status, and the router renders the Not found page. No rewrite is needed. Netlify picks up `404.html` the same way. On a host that needs an explicit rule, serve `/404.html` with status 404 for paths with no matching file.
- After deploying, check that `/services`, `/about` and the other routes are served as their own pre-rendered files (view the source and look at `<title>`), and that `/does-not-exist` returns 404.
- The hosting account, domain and files belong to the company. Vercel's free Hobby plan is for non-commercial use only, so use Vercel Pro or another static host that allows commercial use.
- If the enquiry form or tracking is on, add the production origin (for example `https://pdcadental.com`) to the `dental-directory` row's `allowed_origins` in qindom (fndom `/admin/analytics-access`).

## qindom integration

| What | Endpoint | Auth |
|---|---|---|
| Event tracking (M28) | `POST /analytics/collect`, contract v1 (`system: "dental-directory"`) | Public, origin-checked. Sent only after consent. |
| Insights data (M26/M27) | `POST /analytics/report`, which takes a `pdca.analytics.report/v1` request and returns the response | `x-analytics-key` header. The value comes from `/insights?key=…`. |
| Enquiry form (M21) | `POST /pdca/enquiry` | Public, origin-checked, rate-limited, honeypot |

To give someone access to real Insights, an OWNER rotates the read key with `POST /analytics/admin/systems/dental-directory/read-key` and sends them `https://<site>/insights?key=<key>`. The key is kept for the browser session, so changing the month keeps working.

**What qindom can and cannot measure.** It counts visitors (a random per-browser ID, set only after consent), new vs returning visitors, page views, WhatsApp, call, email and directions taps, Rx downloads, form submissions, sources (from the referrer), pages, and devices (from screen size). It cannot measure country (no IP geolocation), Google search terms (those need Search Console) or the Google Business Profile listing. For those the dashboard shows "Not tracked yet".

### Real data later (from the brief)

The planned production reporting path was GA4 plus Search Console in a Looker Studio report, emailed monthly as a PDF to management. That needs no backend. GA4 has been replaced by qindom (see Decisions). Search Console and Business Profile figures would still need either their own APIs behind qindom's report endpoint or monthly manual entry.

Mapping from real sources to report metrics:
- **qindom events:**
  - `visitors` = distinct `visitorId`
  - `newVisitors` = visitors first seen in the period
  - `pageViews` = `page_view`
  - `whatsappClicks`, `callClicks`, `emailClicks`, `directionsClicks` = `whatsapp_click`, `call_click`, `email_click`, `directions_click`
  - `formSubmits` = `generate_lead`
  - `rxDownloads` = `file_download`
- **Search Console:** `searchTerm` = query, clicks and impressions.
- **Business Profile:** `listing*` = Business Profile Performance API, or monthly manual entry.

## The private `/insights` page

- It is pre-rendered as an empty shell with `noindex,nofollow`. It is never linked, and it is not listed in `sitemap.xml` or `robots.txt`. The data loads in the browser.
- With `VITE_ANALYTICS_SOURCE=mock`, anyone who knows the URL sees **sample data only**. Because this site has no backend, it cannot have a real login. Keep the URL private.
- With `qindom`, real numbers are only returned when the URL carries a valid viewer key.
- Periods: `?period=YYYY-MM` for a month, or `?period=mtd` for month to date. The default is the last full month in Singapore time. `?debug=1` shows the request/response panel for non-mock sources.
- "Download PDF" calls `window.print()`. The print stylesheet is A4 portrait with 12 mm margins.

## Decisions

Places this build departs from the brief, or fills a gap the brief left open:

1. **qindom replaces GA4** (owner's decision).
   - What changed: there is no GA4 script and no `VITE_GA_ID`. `track()` sends qindom's v1 collect payload, and only after Accept.
   - Visitor IDs: a random visitor ID (`pdca.vid`, localStorage) and a session ID (`pdca.sid`, sessionStorage) are created only after consent. Decline clears both.
   - What this replaces: `page_view` is sent manually on each route change (GA4 enhanced measurement no longer exists here), and Rx downloads send `file_download`.
   - Consent: the banner wording is unchanged. The site sets no cookies and loads no third-party scripts. The Privacy wording was updated to say "our own analytics service" instead of Google Analytics.
2. **Insights has a qindom adapter.** `getAdapter()` returns the mock adapter by default, or the qindom adapter when `VITE_ANALYTICS_SOURCE=qindom`. The dashboard code is the same either way.
3. **Contract `source` widened** from `"mock" | "ga4"` to `"mock" | "ga4" | "qindom"` (owner's decision). Metrics qindom cannot measure come back as `0` or `[]`, and the UI shows "Not tracked yet".
4. **Enquiry form posts to qindom** (`/pdca/enquiry`) instead of a hosted form service (owner's decision). qindom sends the notification to admin@pdcadental.com and the auto-reply, and stores nothing.
5. **React Router 8.5.** The config and route APIs match the brief (`ssr:false` plus `prerender`, `clientLoader.hydrate`, `HydrateFallback`). The project was set up by hand rather than with `create-react-router`, so the old Vite SPA could be replaced in place.
6. **Pre-render list.** Flagged pages (Our Work, Careers) are pre-rendered when their flag is on, but are never in the sitemap. `/insights` is always pre-rendered (as an empty shell) and is never in the sitemap. The `*` route is served by `__spa-fallback.html`.
7. **TBC rendering.** `tbc()` returns a value. `CopyText`/`CopyBlock` render it as a chip in development, and as the fallback or nothing in production (a block with no copy is dropped). Photo slots are development-only placeholders. In production a slot without a real photo is removed, so heroes fall back to a single column and the About "Our lab" section disappears until photos exist.
8. **Rx form.** The download button only appears in production builds when `public/files/pdca-rx-form.pdf` exists at build time (`__RX_FORM_AVAILABLE__`). When it is hidden, the For Dentists "Prescription form" block is dropped and Turnaround fills the row.
9. **Extra WhatsApp buttons** where brief §5.1 names a message but the wireframe shows no button: "WhatsApp for a pickup" (Send a case, `pickup`), "Ask for prices" (Prices on request, `prices`) and "Arrange a student visit" (Students and educators, `students`).
10. **Turnaround on For Dentists** uses the shared M12 component in a compact layout, not the wireframe's single sentence. The brief asks for one component.
11. **Palette, logo and favicon.** The brief's suggested earthy tokens were swapped for the PDCA logo palette used on the previous site (owner's request): logo orange `#F06522` on white with warm greys.
    - Because white text on `#F06522` is only 3.2:1, the bright orange is used for the logo, large numerals, rules, icons and chart dots. Buttons and links use a deeper `#C2410C` (5.2:1, AA).
    - The favicon is the previous site's tooth icon.
    - An orange "P" monogram stands in for the header logo until PDCA supplies logo files. `public/og-default.png` is a branded placeholder.
12. **Menu button** shows "Close" while the menu is open. Esc or a click outside closes it and returns focus.
13. **Enquiry validation.** Required: name, message, consent, and at least one of phone or email. Formats are checked when given.
14. **Env template** is `env.example` rather than `.env.example`: the tooling used for this build was not allowed to write dotfiles beginning with `.env`. Rename it if you prefer.
15. **JS budget.** Public pages ship about 122 KB of gzipped JS (React plus React Router are about 100 KB of that). This is at the edge of the "aim ≤ 120 KB" target. The insights and analytics code is a separate chunk that never loads on public pages.

## Live TBC list

Run `npm run tbc` for the current list with files and lines. At the time of writing:

| TBC | Production fallback |
|---|---|
| Opening hours | hidden (and omitted from JSON-LD) |
| How dentists send STL files | "WhatsApp us and we'll tell you how to send your files." |
| Remake and warranty wording | "Ask us about our remake and warranty terms on WhatsApp." |
| How patients book shade taking | "Your dentist's clinic will arrange the visit with us." |
| Founder bio, technician bios, About text | hidden |
| Data Protection Officer | "Contact admin@pdcadental.com." **This must be replaced before launch: PDPA requires a named DPO with public contact details.** |
| Social profile URLs | links hidden |
| Offers for students, institutions, groups, partner labs | hidden |
| Rx form PDF | download hidden |
| Photos: lab, team, cases | slots removed |
| Canonical domain | `VITE_SITE_URL` |
| Careers: openings, workplace, training | page stays off |
| Logo files and OG image | placeholders |

## Project layout

```
app/
  root.tsx               <html>, fonts, global CSS, ConsentProvider
  routes.ts              route config (flagged routes included only when on)
  config/                flags.ts (browser), paths.ts + node-env.ts (Node: pre-render, sitemap)
  routes/                _site.tsx layout + one file per page, insights.tsx
  components/Mxx-Name/   one folder per wireframe module (M01–M29)
  content/               all copy and facts (see CONTENT.md)
  analytics/             contract, mock + qindom adapters, request, format, tests
  lib/                   whatsapp, maps, consent, track, tbc, breakpoints
  styles/                tokens.css, base.css, print.css
public/                  favicon, og-default.png, files/ (Rx form, TBC), images/
scripts/                 postbuild.ts, tbc-report.ts
reference/               the wireframe (not shipped)
tests/e2e/               Playwright
```
