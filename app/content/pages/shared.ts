// Copy shared by several pages (visit invitation, turnaround, materials, workflows, CTA labels).
import { site } from "../site";

export const visitInvite =
  "Dentists, student groups and patients sent for shade taking are welcome by arrangement.";

export const labels = {
  whatsappUs: "WhatsApp us",
  whatsappVisit: "WhatsApp to arrange a visit",
  visitTheLab: "Visit the lab",
  call: "Call",
  callNumber: "Call 6842 3371",
  emailUs: "Email us",
  startChat: "Start a chat",
  downloadRx: "Download Rx form (PDF)",
  forPatients: "For patients",
} as const;

export const turnaroundCopy = {
  title: "Turnaround",
} as const;

export const materialsCopy = {
  title: "Materials we use",
  lead: "Authentic materials from reputable brands.",
} as const;

/** Workflows cards: Home wording and Services wording differ slightly in the approved wireframe. */
export const workflowsHome = {
  title: "Conventional or digital, your choice",
  items: [
    { title: "Physical impressions", text: "WhatsApp or call and we collect the case." },
    { title: "Digital scans", text: "STL files from any intraoral scanner." },
    { title: "Both", text: "We combine the two when you ask." },
  ],
} as const;

export const workflowsServices = {
  title: "Workflows",
  items: [
    { title: "Conventional", text: "Physical impressions, collected by our courier." },
    { title: "Digital", text: "Intraoral scans as STL files, from any scanner." },
    { title: "Both", text: "Combined in one case when the dentist asks." },
  ],
} as const;

export const mapCopy = {
  directionsLabel: "Directions",
  google: "Google Maps",
  apple: "Apple Maps",
  waze: "Waze",
  showMap: "Show map",
  mapTitle: "Map showing PDCA at Vertex Tower A, Ubi",
  mapPlaceholder: "Map of Vertex Tower A, Ubi. The map loads from Google only when you ask.",
  hours: site.openingHours,
} as const;
