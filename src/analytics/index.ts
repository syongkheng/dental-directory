const BASE_URL = (import.meta.env.VITE_SERVER_BASE_URL as string | undefined) ?? 'http://localhost:3000'
const ENDPOINT = `${BASE_URL}/api/analytics`

const SYSTEM = 'dental-directory'
const SESSION_KEY = 'pdca_analytics_session'

export interface AnalyticsEvent {
  event: string
  properties: Record<string, unknown>
  timestamp: string
  sessionId: string
  page: string
  referrer: string
  system: string
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
    event,
    properties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    page: window.location.pathname,
    referrer: document.referrer,
    system: SYSTEM,
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
