// M28 Event tracking. Sends qindom's analytics ingest contract v1 to POST <endpoint>/analytics/collect.
// - No-op unless consent is granted AND VITE_ANALYTICS_ENDPOINT is set.
// - In development it logs to the console instead of sending.
// - First-party only: no third-party script, no cookies. A random visitor ID is kept in localStorage
//   (only after consent) so qindom can count new vs returning visitors; a session ID in sessionStorage.
import { ANALYTICS_ENDPOINT } from "~/config/flags";
import { currentScreen, type ScreenSize } from "./breakpoints";

export const SYSTEM = "dental-directory";
const VISITOR_KEY = "pdca.vid";
const SESSION_KEY = "pdca.sid";

export type TrackEvent =
  | "page_view"
  | "whatsapp_click"
  | "call_click"
  | "email_click"
  | "directions_click"
  | "file_download"
  | "generate_lead";

/** Analytics ingest contract v1 — see qindom src/analytics/AnalyticsContract.ts. */
export interface CollectPayload {
  v: 1;
  system: string;
  event: string;
  sessionId: string;
  timestamp: number;
  page: string;
  referrer: string;
  screen: { width: number; height: number; breakpoint: string; size: ScreenSize };
  properties: Record<string, unknown>;
}

let granted = false;

export function setTrackingConsent(value: boolean): void {
  granted = value;
  if (!value) clearIdentifiers();
}

export function trackingEnabled(): boolean {
  return granted && ANALYTICS_ENDPOINT.length > 0;
}

function randomId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function stored(storage: Storage | undefined, key: string): string {
  try {
    if (!storage) return "unknown";
    let id = storage.getItem(key);
    if (!id) {
      id = randomId();
      storage.setItem(key, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

function clearIdentifiers(): void {
  try {
    window.localStorage.removeItem(VISITOR_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function buildPayload(event: string, params: Record<string, unknown>): CollectPayload {
  return {
    v: 1,
    system: SYSTEM,
    event,
    sessionId: stored(window.sessionStorage, SESSION_KEY),
    timestamp: Date.now(),
    page: window.location.pathname,
    referrer: document.referrer.slice(0, 512),
    screen: currentScreen(),
    properties: { ...params, visitorId: stored(window.localStorage, VISITOR_KEY) },
  };
}

export function track(name: TrackEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (import.meta.env.DEV) {
    console.debug("[track]", name, params, granted ? "(consent granted)" : "(no consent: not sent)");
    return;
  }
  if (!trackingEnabled()) return;
  const body = JSON.stringify(buildPayload(name, params));
  fetch(`${ANALYTICS_ENDPOINT}/analytics/collect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "omit",
  }).catch(() => {
    // Analytics must never break the site.
  });
}

/**
 * Maps a click on any link to its tracking event (called from one document-level listener).
 * Links opt in with data attributes: data-loc (location), data-wa (message key), data-app (map app).
 */
export function trackLinkClick(a: HTMLAnchorElement): void {
  const href = a.getAttribute("href") ?? "";
  const location = a.dataset.loc ?? "unknown";
  if (href.startsWith("https://wa.me/")) {
    track("whatsapp_click", { location, message_key: a.dataset.wa ?? "unknown" });
  } else if (href.startsWith("tel:")) {
    track("call_click", { location });
  } else if (href.startsWith("mailto:")) {
    track("email_click", { location });
  } else if (a.dataset.app) {
    track("directions_click", { app: a.dataset.app, location });
  } else if (/\.pdf($|\?)/i.test(href)) {
    track("file_download", { file_name: href.split("/").pop() ?? href, location });
  }
}
