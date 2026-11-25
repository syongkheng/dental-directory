// Home page copy (from the approved wireframe).
import { visitInvite } from "./shared";

export const home = {
  hero: {
    title: "Dental restorations made with authentic, branded materials",
    lead: "Patrick Dental Ceramic Arts has worked with dentists from private clinics and government institutions since 2004. We fabricate crowns, bridges, inlays, onlays, overlays and veneers from conventional impressions or digital scans.",
    asidePrefix: "A patient?",
    asideLink: "See what a dental lab does",
    photo: "technician finishing a crown at the bench",
  },
  // Trust strip (M08): a short label above each confirmed fact. `icon` picks the strip's icon.
  trust: [
    { icon: "since", label: "Established", value: "Since 4 May 2004" },
    { icon: "clients", label: "Trusted by", value: "Private clinics and government institutions" },
    { icon: "materials", label: "Materials", value: "Amann Girrbach\u00a0· Ivoclar IPS\u00a0e.max\u00a0· VITA" },
    { icon: "founder", label: "Founder", value: "Straumann\u2011certified" },
    { icon: "team", label: "Team", value: "Over half iTero\u2011trained" },
  ] as const,
  services: {
    title: "What we make",
    lead: "Implant and tooth-supported restorations, all listed on one page.",
    cards: [
      { title: "Crowns and bridges", text: "Single crowns and bridges, on natural teeth or implants.", anchor: "crowns-bridges" },
      { title: "Inlays, onlays and overlays", text: "Partial coverage that keeps more of the natural tooth.", anchor: "inlays-onlays" },
      { title: "Veneers", text: "Thin restorations for the front surface of teeth.", anchor: "veneers" },
      { title: "Shade taking", text: "Colour matched at our lab when a dentist advises it.", anchor: "shade-taking" },
    ],
  },
  reasons: {
    title: "Why dentists work with us",
    items: [
      { title: "Authentic materials", text: "Materials from reputable brands, so you can trust what goes into your patient's mouth." },
      { title: "We keep talking", text: "We stay in touch until the restoration is issued smoothly." },
      { title: "An open lab", text: "You and your team can visit to work on a case with us, or to see how we fabricate." },
    ],
  },
  patientBand: {
    title: "Who makes your crown?",
    lead: "Your dentist works with a dental lab. See what happens there and what you can ask.",
    photo: "impression to finished crown",
  },
  visit: {
    title: "Visit the lab",
    lead: visitInvite,
    photo: "the lab at Vertex Tower A",
  },
  testimonials: {
    title: "What dentists say",
    /** Real quotes only, added once PDCA collects them. Empty = section renders nothing. */
    quotes: [] as { quote: string; name: string; clinic: string }[],
  },
};
