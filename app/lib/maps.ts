// Directions links (M04).
import { site } from "~/content/site";

const q = encodeURIComponent(site.address.query);

export const mapLinks = {
  google: `https://www.google.com/maps/search/?api=1&query=${q}`,
  apple: `https://maps.apple.com/?q=${q}`,
  waze: `https://waze.com/ul?q=${q}&navigate=yes`,
  embed: `https://www.google.com/maps?q=${q}&output=embed`,
} as const;

export type MapApp = "google" | "apple" | "waze" | "embed";
