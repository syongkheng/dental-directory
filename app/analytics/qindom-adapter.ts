// M27 qindom adapter: POST <VITE_ANALYTICS_ENDPOINT>/analytics/report with the viewer key from /insights?key=…
// qindom answers with the same pdca.analytics.report/v1 response (source "qindom"). Metrics qindom cannot
// measure (country, search terms, Google Business Profile listing) come back as 0 / [].
import { ANALYTICS_ENDPOINT } from "~/config/flags";
import { CONTRACT, validateRequest, type AnalyticsResponse } from "./contract";
import type { AnalyticsAdapter } from "./adapter-types";

const KEY_STORAGE = "pdca.insights.key";

/** Viewer key: taken from ?key= on first visit, then kept for the browser session. */
export function viewerKey(search: URLSearchParams): string {
  const fromUrl = search.get("key");
  try {
    if (fromUrl) window.sessionStorage.setItem(KEY_STORAGE, fromUrl);
    return fromUrl || window.sessionStorage.getItem(KEY_STORAGE) || "";
  } catch {
    return fromUrl || "";
  }
}

export class AdapterError extends Error {
  readonly status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "AdapterError";
    this.status = status;
  }
}

function assertResponse(body: unknown): asserts body is AnalyticsResponse {
  const r = body as Partial<AnalyticsResponse> | null;
  if (!r || r.contract !== CONTRACT || typeof r.totals !== "object" || !Array.isArray(r.series) || !r.period) {
    throw new AdapterError("The analytics service answered with an unexpected shape.");
  }
}

export function createQindomAdapter(key: string, endpoint = ANALYTICS_ENDPOINT): AnalyticsAdapter {
  return {
    source: "qindom",
    async runReport(request) {
      validateRequest(request);
      if (!endpoint) throw new AdapterError("VITE_ANALYTICS_ENDPOINT is not set.");
      if (!key) throw new AdapterError("Open this page with its private link (?key=…).", 403);
      const res = await fetch(`${endpoint}/analytics/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-analytics-key": key },
        body: JSON.stringify(request),
        credentials: "omit",
      });
      if (res.status === 403) throw new AdapterError("This private link is not valid any more.", 403);
      if (!res.ok) throw new AdapterError(`The analytics service returned ${res.status}.`, res.status);
      const json = (await res.json()) as { data?: unknown };
      // qindom wraps payloads as { code, status, data }.
      const body = json && typeof json === "object" && "data" in json ? json.data : json;
      assertResponse(body);
      return body;
    },
  };
}
