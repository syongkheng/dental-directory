// WhatsApp links (M02, CTAs). Every WhatsApp link is built here.
export const WHATSAPP_NUMBER = "6568423371";

export const WHATSAPP_MESSAGES = {
  dentistCase: "Hi PDCA, I'm a dentist and I'd like to discuss a case.",
  prices: "Hi PDCA, I'd like your price list. My clinic is",
  pickup: "Hi PDCA, I'd like to arrange a pickup for a case.",
  visit: "Hi PDCA, I'd like to arrange a visit to the lab.",
  students: "Hi PDCA, I'd like to arrange a lab visit for our students.",
  patient: "Hi PDCA, my dentist asked me to contact you about shade taking.",
  general: "Hi PDCA, I'd like to find out more about your lab.",
} as const;

export type WhatsAppKey = keyof typeof WHATSAPP_MESSAGES;

export function whatsappHref(key: WhatsAppKey): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[key])}`;
}

/** Message for the floating button on each public route. */
export function floatKeyForPath(pathname: string): WhatsAppKey {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/" || p === "/services" || p === "/dentists") return "dentistCase";
  if (p === "/patients") return "patient";
  return "general";
}
