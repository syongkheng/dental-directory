// Page titles and meta descriptions (M29). One entry per route.
export interface PageSeo {
  title: string;
  description: string;
}

export const seo = {
  home: {
    title: "Dental Lab in Singapore | Patrick Dental Ceramic Arts",
    description:
      "Crowns, bridges, inlays, onlays and veneers made with authentic materials for Singapore dentists since 2004. WhatsApp us to discuss a case.",
  },
  services: {
    title: "Crowns, Bridges, Inlays, Onlays and Veneers | PDCA Dental Lab",
    description:
      "Implant and tooth-supported restorations from conventional impressions or digital scans, in Amann Girrbach zirconia, IPS e.max and VITA porcelain.",
  },
  dentists: {
    title: "Working with PDCA | Dental Lab for Singapore Dentists",
    description:
      "How to send a case, turnaround, the prescription form, payment and lab visits for dentists, institutions and students.",
  },
  patients: {
    title: "What a Dental Lab Does | PDCA Singapore",
    description:
      "What happens to your crown after your dentist takes an impression, why materials matter, and what to ask your dentist.",
  },
  about: {
    title: "About Patrick Dental Ceramic Arts | Since 2004",
    description:
      "A Singapore dental laboratory founded in 2004, led by a Straumann-certified instructor, with iTero-trained technicians.",
  },
  contact: {
    title: "Contact PDCA Dental Lab | Ubi, Singapore",
    description:
      "WhatsApp or call 6842 3371, email admin@pdcadental.com, or visit us at Vertex Tower A, 33 Ubi Avenue 3.",
  },
  privacy: {
    title: "Privacy and Cookies | PDCA",
    description:
      "How Patrick Dental Ceramic Arts handles personal data and cookies, and how to reach our Data Protection Officer.",
  },
  ourWork: {
    title: "Our Work | PDCA Dental Lab Singapore",
    description: "Finished restorations shared with permission, credited to the dentists who placed them.",
  },
  careers: {
    title: "Careers | PDCA Dental Lab Singapore",
    description: "Work as a dental technician at Patrick Dental Ceramic Arts.",
  },
  notFound: {
    title: "Page not found | PDCA",
    description: "This page does not exist. Go to the Patrick Dental Ceramic Arts home page, services or contact details.",
  },
  insights: {
    title: "Website insights | PDCA",
    description: "Private page.",
  },
} satisfies Record<string, PageSeo>;

/** Open Graph image (neutral branded placeholder until PDCA supplies one — TBC). */
export const OG_IMAGE = "/og-default.png";
