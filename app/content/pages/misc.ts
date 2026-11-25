// Copy for the flagged pages (Our Work, Careers) and Not found.
import { tbc } from "~/lib/tbc";

export const ourWork = {
  title: "Our work",
  lead: "Finished cases, shared with permission and credited to the dentist who placed them.",
  filterLabel: "Filter by restoration",
  filters: ["All", "Crowns and bridges", "Inlays, onlays, overlays", "Veneers"],
  placedBy: "Placed by",
  empty: tbc("Case photos with dentist and patient permission"),
  /** Only add a case with the dentist's and the patient's permission. */
  cases: [] as {
    type: string;
    category: string;
    material: string;
    image: { src: string; alt: string; width: number; height: number };
    dentist: string;
    clinic: string;
    url?: string;
  }[],
};

export const careers = {
  title: "Careers",
  lead: "Good restorations need responsible, experienced technicians.",
  whyTitle: "Why PDCA",
  why: [
    { title: "Teamwork", text: "We work as one team and invest in growing our technicians." },
    { title: "Our workplace", text: tbc("Photos and a few lines on the work environment") },
    { title: "Training", text: tbc("What training PDCA offers") },
  ],
  openingsTitle: "Openings",
  openings: [{ title: "Dental technician", meta: "Full-time · Ubi", status: tbc("Current openings") }],
  apply: "To apply, email admin@pdcadental.com or WhatsApp us.",
};

export const notFound = {
  title: "Page not found",
  lead: "Sorry, we couldn't find that page.",
  links: [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/contact", label: "Contact" },
  ],
};
