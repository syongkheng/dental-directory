// M27 Analytics contract pdca.analytics.report/v1 (fixed shape), validator and compare-period rule.
// Departure from the brief: `source` also allows "qindom" (PDCA's own analytics backend).
export const CONTRACT = "pdca.analytics.report/v1" as const;

export const METRICS = [
  "visitors", "newVisitors", "pageViews", "enquiries",
  "whatsappClicks", "callClicks", "emailClicks", "formSubmits",
  "directionsClicks", "rxDownloads",
  "listingViews", "listingCalls", "listingDirections", "listingWebsiteClicks",
] as const;
export type Metric = (typeof METRICS)[number];

export const BREAKDOWNS = ["day", "source", "page", "device", "country", "searchTerm"] as const;
export type Breakdown = (typeof BREAKDOWNS)[number];

export interface Period { start: string; end: string } // YYYY-MM-DD, inclusive, Asia/Singapore dates

export interface AnalyticsRequest {
  contract: typeof CONTRACT;
  site: "pdcadental.com";
  timezone: "Asia/Singapore";
  period: Period;
  compare: "previous_month";
  metrics: Metric[];
  breakdowns: Breakdown[];
  limit: number; // whole number, 1 to 20
}

export interface MetricTotal { value: number; previous: number }

export type AnalyticsSource = "mock" | "ga4" | "qindom";

export interface AnalyticsResponse {
  contract: typeof CONTRACT;
  source: AnalyticsSource;
  generatedAt: string;          // ISO 8601 with +08:00
  period: Period;
  comparePeriod: Period;
  totals: Partial<Record<Metric, MetricTotal>>; // exactly the requested metrics
  series: { date: string; visitors: number; pageViews: number; enquiries: number }[]; // when "day" requested
  breakdowns: {
    source?: { key: string; visitors: number }[];
    page?: { key: string; pageViews: number }[];
    device?: { key: string; visitors: number }[];
    country?: { key: string; visitors: number }[];
    searchTerm?: { key: string; clicks: number; impressions: number }[];
  };
}

export const REQUEST_KEYS = ["contract", "site", "timezone", "period", "compare", "metrics", "breakdowns", "limit"] as const;

/* ---------- date helpers (UTC arithmetic on calendar dates) ---------- */
export const DAY_MS = 864e5;
export const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
export const pad = (n: number) => String(n).padStart(2, "0");
export const toT = (d: string) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)));
export const toD = (t: number) => new Date(t).toISOString().slice(0, 10);
export const lastDay = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
export const span = (a: string, b: string) => Math.round((toT(b) - toT(a)) / DAY_MS) + 1;
export function dayList(a: string, b: string): string[] {
  const out: string[] = [];
  for (let t = toT(a); t <= toT(b); t += DAY_MS) out.push(toD(t));
  return out;
}
export function isValidDate(d: unknown): d is string {
  if (typeof d !== "string" || !ISO_DATE.test(d)) return false;
  return toD(toT(d)) === d; // rejects 2026-02-30 etc.
}
export function isFullMonth(p: Period): boolean {
  return (
    p.start.slice(0, 7) === p.end.slice(0, 7) &&
    p.start.slice(8) === "01" &&
    Number(p.end.slice(8)) === lastDay(Number(p.end.slice(0, 4)), Number(p.end.slice(5, 7)))
  );
}

/** Same day one calendar month earlier, clamping the day to that month's length. */
function back1(d: string): string {
  let y = Number(d.slice(0, 4));
  let m = Number(d.slice(5, 7)) - 1;
  if (m === 0) {
    m = 12;
    y--;
  }
  return `${y}-${pad(m)}-${pad(Math.min(Number(d.slice(8)), lastDay(y, m)))}`;
}

/** compare: "previous_month". A full month compares with the full previous month; otherwise the same dates a month earlier. */
export function comparePeriod(p: Period): Period {
  if (isFullMonth(p)) {
    const s = back1(p.start);
    return { start: s, end: `${s.slice(0, 7)}-${pad(lastDay(Number(s.slice(0, 4)), Number(s.slice(5, 7))))}` };
  }
  return { start: back1(p.start), end: back1(p.end) };
}

export class ContractError extends Error {
  readonly problems: string[];
  constructor(problems: string[]) {
    super(problems.join("; "));
    this.name = "ContractError";
    this.problems = problems;
  }
}

/** Throws a ContractError listing every problem with the request. */
export function validateRequest(q: unknown): asserts q is AnalyticsRequest {
  if (!q || typeof q !== "object" || Array.isArray(q)) throw new ContractError(["request must be an object"]);
  const r = q as Record<string, unknown>;
  const errs: string[] = [];
  const ks = Object.keys(r);
  REQUEST_KEYS.forEach((k) => {
    if (!ks.includes(k)) errs.push(`missing key: ${k}`);
  });
  ks.forEach((k) => {
    if (!(REQUEST_KEYS as readonly string[]).includes(k)) errs.push(`unknown key: ${k}`);
  });
  if (r.contract !== CONTRACT) errs.push(`contract must be ${CONTRACT}`);
  if (r.site !== "pdcadental.com") errs.push("site must be pdcadental.com");
  if (r.timezone !== "Asia/Singapore") errs.push("timezone must be Asia/Singapore");

  const p = r.period as Record<string, unknown> | undefined;
  if (!p || typeof p !== "object" || Array.isArray(p) || Object.keys(p).sort().join(",") !== "end,start") {
    errs.push("period must hold exactly start and end");
  } else if (!isValidDate(p.start) || !isValidDate(p.end)) {
    errs.push("period dates must be YYYY-MM-DD");
  } else if (p.start > p.end) {
    errs.push("period start is after its end");
  } else if (span(p.start, p.end) > 366) {
    errs.push("period is longer than 366 days");
  }

  if (r.compare !== "previous_month") errs.push("compare must be previous_month");

  if (!Array.isArray(r.metrics) || r.metrics.length === 0) {
    errs.push("metrics must be a non-empty list");
  } else {
    r.metrics.forEach((m) => {
      if (!(METRICS as readonly unknown[]).includes(m)) errs.push(`unknown metric: ${String(m)}`);
    });
    if (new Set(r.metrics).size !== r.metrics.length) errs.push("a metric is listed twice");
  }

  if (!Array.isArray(r.breakdowns)) {
    errs.push("breakdowns must be a list");
  } else {
    r.breakdowns.forEach((b) => {
      if (!(BREAKDOWNS as readonly unknown[]).includes(b)) errs.push(`unknown breakdown: ${String(b)}`);
    });
  }

  if (!Number.isInteger(r.limit) || (r.limit as number) < 1 || (r.limit as number) > 20) {
    errs.push("limit must be a whole number from 1 to 20");
  }
  if (errs.length) throw new ContractError(errs);
}

/** Singapore "now" as an ISO string with +08:00. */
export function sgIsoNow(now = Date.now()): string {
  return `${new Date(now + 8 * 3600e3).toISOString().slice(0, 19)}+08:00`;
}

/** Today's date in Singapore (YYYY-MM-DD). */
export function sgToday(now = Date.now()): string {
  return toD(now + 8 * 3600e3);
}
