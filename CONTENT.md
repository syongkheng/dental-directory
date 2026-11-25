# Changing the website's text

All the words on the website live in plain files in the `app/content/` folder. You don't need to touch the design or the code to change them. A developer makes the change, checks it with `npm run dev`, and publishes a new build.

## Which file holds which text

| What you want to change | File |
|---|---|
| Business facts used everywhere: name, address, phone, WhatsApp, email, founding date, materials and brands, turnaround (7 / 10 days and the counting rule), opening hours, social media links | `app/content/site.ts` |
| Page titles and Google descriptions (what shows in search results) | `app/content/seo.ts` |
| Menu labels, footer headings, cookie banner text | `app/content/nav.ts` |
| Home page | `app/content/pages/home.ts` |
| Services page | `app/content/pages/services.ts` |
| For Dentists page | `app/content/pages/dentists.ts` |
| For Patients page | `app/content/pages/patients.ts` |
| About page (including lab photos) | `app/content/pages/about.ts` |
| Contact page and enquiry form labels and messages | `app/content/pages/contact.ts` |
| Privacy and cookies page | `app/content/pages/privacy.ts` |
| Questions and answers (dentists and patients) | `app/content/faq.ts` |
| Text used on several pages (button labels, visit invitation, workflows, map buttons) | `app/content/pages/shared.ts` |
| Our Work, Careers and "Page not found" | `app/content/pages/misc.ts` |
| Private insights page | `app/content/pages/insights.ts` |
| Pre-filled WhatsApp messages | `app/lib/whatsapp.ts` |

## How to edit

Text sits between quotation marks. Change the words, but keep the quotation marks and the comma at the end of the line:

```ts
lead: "Everything we fabricate, on one page. Prices on request.",
```

If your text contains a double quotation mark, ask the developer to add it.

## Things we're still waiting for (TBC)

Unknown facts are written like this:

```ts
openingHours: tbc("Opening hours"),
text: tbc("PDCA's remake and warranty wording", "Ask us about our remake and warranty terms on WhatsApp."),
```

- While developing, these show as yellow "TBC" labels so nobody forgets them.
- On the live site, the second text (if there is one) is shown instead. If there isn't one, the line is hidden.

When PDCA confirms the real text, replace the whole `tbc(…)` with the text in quotation marks, for example:

```ts
openingHours: "Monday to Friday, 9 am to 6 pm",
```

`npm run tbc` lists everything that is still TBC.

## Photos

Use real photos only. Don't use stock photos of people presented as the team, or AI-generated teeth or people.

1. Put the image files in `public/images/`, ideally as `.webp` or `.avif` at about 1600 px wide.
2. Add them to the right content file with a short description for people who can't see them, plus the width and height. Lab photos go in `about.ts` → `photos.images`, for example:

```ts
images: [
  { src: "/images/lab-1.webp", alt: "Technicians at work at the lab benches", width: 1600, height: 1200 },
],
```

Case photos (Our Work) need both the dentist's and the patient's permission.

## Files to download

Save the prescription form as `public/files/pdca-rx-form.pdf`. The "Download Rx form" button appears automatically in the next build.

## Social media links

In `app/content/site.ts`, fill in each `url: ""`. A profile without a URL is hidden.
