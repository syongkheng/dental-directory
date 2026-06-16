# PDCA Site Map

This is a living document — update it whenever routes are added or removed.

URL convention: lowercase, kebab-case, no trailing slash.

## Current Routes

| Path | Page | Purpose / conversion goal |
| --- | --- | --- |
| `/` | Home | Landing page — primary conversion entry point (hero CTA, stats, services overview, process, facility highlight, closing CTA banner). |
| `/services` | Services | Overview of crowns, bridges, veneers, implants, and the shade-taking studio. Drives "Discuss Your Case" conversions. |
| `/about` | About | Company story (founded 2004), mission, Singapore + Jakarta presence. Builds trust ahead of conversion. |
| `/contact` | Contact | Address, phone/WhatsApp/email, and a quote-request form. Primary form-based conversion point. |
| `*` | Not Found | Catch-all 404 with a link back to Home. |

## Planned / Future Routes (not yet built)

- **`/services/:slug`** — deep per-service pages (e.g. `/services/crowns`, `/services/implants`) with turnaround times, case submission requirements, and material options.
- **`/gallery`** or **`/cases`** — before/after case showcases. Blocked on real photography being available.
- **`/careers`** — staff listings; PDCA has ~11–50 employees and an active hiring presence (seen on MyCareersFuture).
- **`/blog`** or **`/insights`** — technical articles for dentists (shade-matching tips, material comparisons); SEO play.
- **`/faq`** — common questions from clinics about submission, turnaround, and remakes.
- **`/locations`** — dedicated page for the Jakarta lab, once it has distinct content from the Singapore operation.

## Notes

- Content for all current pages is intentionally a sensible first draft (per the project owner) — refine copy iteratively rather than treating it as final.
- All imagery currently uses the `PlaceholderImage` component (`src/components/PlaceholderImage.tsx`) as a named slot — swap in real PDCA photography by passing a `src` prop once available.
- Color palette is defined entirely in `src/styles/theme.css`; rebranding = editing the light/dark variable blocks there.
