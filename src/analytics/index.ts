import { currentScreen, type ScreenSize } from './breakpoints'

const BASE_URL = (import.meta.env.VITE_SERVER_BASE_URL as string | undefined) ?? 'http://localhost:3000'
const ENDPOINT = `${BASE_URL}/analytics/collect`

const SYSTEM = 'dental-directory'
const SESSION_KEY = 'pdca_analytics_session'

/** Analytics ingest contract v1 — see qindom src/analytics/AnalyticsContract.ts. */
export interface AnalyticsEvent {
  v: 1
  system: string
  event: string
  sessionId: string
  timestamp: number
  page: string
  referrer: string
  screen: { width: number; height: number; breakpoint: string; size: ScreenSize }
  properties: Record<string, unknown>
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return 'unknown'
  }
}

export function track(event: string, properties: Record<string, unknown> = {}): void {
  const payload: AnalyticsEvent = {
    v: 1,
    system: SYSTEM,
    event,
    sessionId: getSessionId(),
    timestamp: Date.now(),
    page: window.location.pathname,
    referrer: document.referrer,
    screen: currentScreen(),
    properties,
  }

  if (import.meta.env.DEV) {
    console.debug('%c[analytics]', 'color:#f06522;font-weight:bold', event, properties)
  }

  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the user experience
  })
}
