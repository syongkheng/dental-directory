# Build plan (as executed)

The source of truth is `reference/pdca-wireframes.html` together with the build brief. The owner made these changes to the brief: **qindom** is the backend for event tracking (replacing GA4), for an optional real Insights adapter (`POST /analytics/report`, protected by a viewer key) and for the enquiry form (`POST /pdca/enquiry`). The `source` in the analytics contract gains `"qindom"`.

## Order of work

1. Scaffold: React Router 8 framework mode, `ssr:false` with `prerender`, tokens, base styles, the Inter font, the layout (M01, M02, M05, M06) and the Not found page.
2. Content layer (`app/content/*`) and `tbc()`.
3. Public pages: Home, Services, For Dentists, For Patients, About, Contact, Privacy, plus the flagged Our Work and Careers pages.
4. Libraries: WhatsApp links, map links, consent, and `track()` sending to qindom collect.
5. Analytics: contract, validator, compare period, mock adapter (an exact port of the wireframe), qindom adapter, the Insights page and print styles.
6. SEO: `<Seo>`, JSON-LD, sitemap and robots, and flagged routes.
7. Tests (Vitest, Playwright), Lighthouse, README and CONTENT.md.

## Component map

M01 `SiteHeader` · M02 `WhatsAppFloat` · M03 `ContactCards` · M04 `MapAndDirections` · M05 `SiteFooter` · M06 `CookieBanner` + `ConsentProvider` · M07 `Hero` · M08 `TrustStrip`, `Reasons` · M09 `ServicesSummary`, `ServiceSection` · M10 `Materials` · M11 `Workflows` · M12 `Turnaround` · M13 `SendACase` · M14 `RxDownloadButton` · M15 `Terms` · M16 `Faq` · M17 `VisitTheLab` · M18 `Steps`, `QuestionsCard` · M19 `Team` · M20 `LabPhotos` · M21 `EnquiryForm` · M22 `CaseGallery` · M23 `CareersContent`, `CareersTeaser` · M24 `Testimonials` · M25 `PrivacyNotice` · M26 `InsightsDashboard` · M27 `app/analytics/*` · M28 `app/lib/track.ts` · M29 `Seo`, `JsonLd`, `scripts/postbuild.ts`

## Ambiguities and how they were resolved

See README → Decisions.
