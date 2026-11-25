// Business facts. Change these values only when PDCA confirms a change.
// Unknown values use tbc(label, productionFallback?) — see CONTENT.md.
import { tbc, type Copy } from "~/lib/tbc";

export const site = {
  legalName: "Patrick Dental Ceramic Arts Pte Ltd",
  name: "Patrick Dental Ceramic Arts",
  shortName: "PDCA",
  tagline: "Dental laboratory in Singapore since 2004",
  founded: "4 May 2004",
  foundedIso: "2004-05-04",
  foundedYear: 2004,

  address: {
    line1: "33 Ubi Avenue 3, #08-52/53",
    line2: "Vertex Tower A, Singapore 408868",
    /** One-line form used for map links (§5.2). */
    query: "Vertex Tower A, 33 Ubi Avenue 3, #08-52/53, Singapore 408868",
    /** Footer / JSON-LD order. */
    full: "33 Ubi Avenue 3, #08-52/53, Vertex Tower A, Singapore 408868",
    street: "33 Ubi Avenue 3, #08-52/53, Vertex Tower A",
    locality: "Singapore",
    postalCode: "408868",
    country: "SG",
  },

  phone: {
    display: "6842 3371",
    international: "+65 6842 3371",
    href: "tel:+6568423371",
  },

  whatsapp: {
    display: "+65 6842 3371",
    number: "6568423371",
  },

  email: {
    address: "admin@pdcadental.com",
    href: "mailto:admin@pdcadental.com",
  },

  openingHours: tbc("Opening hours") as Copy,

  /** Social profiles: URLs are TBC; a profile without a URL is hidden. */
  social: [
    { label: "Google", name: "Google Business Profile", url: "" },
    { label: "Instagram", name: "Instagram", url: "" },
    { label: "Facebook", name: "Facebook", url: "" },
    { label: "LinkedIn", name: "LinkedIn", url: "" },
    { label: "TikTok", name: "TikTok", url: "" },
    { label: "Telegram", name: "Telegram", url: "" },
  ] as { label: string; name: string; url: string }[],

  materials: [
    { material: "Zirconia", brand: "Amann Girrbach" },
    { material: "Lithium disilicate", brand: "Ivoclar IPS e.max" },
    { material: "Porcelain", brand: "VITA" },
  ],

  turnaround: {
    simpleDays: 7,
    complexDays: 10,
    simpleLabel: "working days for simple cases",
    complexLabel: "working days for complex cases",
    rule: "Counted from the day we receive complete instructions and all components. Collection and delivery days are not counted.",
  },
} as const;

export const socialLinks = () => site.social.filter((s) => s.url.length > 0);
