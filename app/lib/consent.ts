// Cookie / analytics consent storage (M06). The React provider lives in components/M06-CookieBanner.
export const CONSENT_KEY = "pdca.consent.v1";

export type ConsentChoice = "granted" | "denied";

export interface StoredConsent {
  analytics: ConsentChoice;
  ts: string;
}

const listeners = new Set<() => void>();
/** Fallback when storage is blocked: the choice holds for this page view only. */
let memory: StoredConsent | null = null;

export function readConsent(): StoredConsent | null {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return memory; // storage blocked
  }
  if (!raw) return memory;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    return { analytics: parsed.analytics, ts: String(parsed.ts ?? "") };
  } catch {
    return null; // malformed value: ask again
  }
}

export function writeConsent(choice: ConsentChoice): StoredConsent {
  const value: StoredConsent = { analytics: choice, ts: new Date().toISOString() };
  memory = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode etc.): `memory` keeps the choice for this page view.
  }
  listeners.forEach((l) => l());
  return value;
}

/* useSyncExternalStore plumbing */
export function subscribeConsent(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Primitive snapshot: the stored choice, or null when the visitor has not chosen yet. */
export function consentSnapshot(): ConsentChoice | null {
  return readConsent()?.analytics ?? null;
}
