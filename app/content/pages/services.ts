// Services page copy. Everything on one page with in-page anchors; prices on request.
import { tbc, type Copy } from "~/lib/tbc";

export interface ServiceItem {
  id: string;
  title: string;
  text: string[];
  tags?: string[];
  extra?: Copy;
  photo: string;
}

export const services = {
  title: "Our services",
  lead: "Everything we fabricate, on one page. Prices on request.",
  onThisPage: "On this page",
  nav: [
    { id: "crowns-bridges", label: "Crowns and bridges" },
    { id: "inlays-onlays", label: "Inlays, onlays, overlays" },
    { id: "veneers", label: "Veneers" },
    { id: "shade-taking", label: "Shade taking" },
    { id: "materials", label: "Materials" },
    { id: "workflows", label: "Workflows" },
    { id: "turnaround", label: "Turnaround" },
  ],
  items: [
    {
      id: "crowns-bridges",
      title: "Crowns and bridges",
      text: ["Single crowns and multi-unit bridges, on natural teeth or on implants."],
      tags: ["Tooth-supported", "Implant-supported"],
      photo: "crown and bridge",
    },
    {
      id: "inlays-onlays",
      title: "Inlays, onlays and overlays",
      text: ["Partial-coverage restorations that keep more of the natural tooth."],
      photo: "inlay and onlay",
    },
    {
      id: "veneers",
      title: "Veneers",
      text: ["Thin restorations for the front surface of teeth."],
      photo: "veneers",
    },
    {
      id: "shade-taking",
      title: "Shade taking",
      text: [
        "When a dentist advises it, the patient visits our lab and our technicians match the shade in person.",
      ],
      extra: tbc("How patients book a shade-taking visit", "Your dentist's clinic will arrange the visit with us."),
      photo: "shade taking at the lab",
    },
  ] satisfies ServiceItem[],
  cta: {
    title: "Discuss a case or ask for prices",
  },
};
