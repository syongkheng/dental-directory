// M27 Mock adapter: a port of genDay() and runReport() from reference/pdca-wireframes.html, same constants.
// FNV-1a hash + mulberry32 PRNG; each day seeded from "pdcadental.com|" + date + "|" + salt.
import {
  CONTRACT,
  comparePeriod,
  dayList,
  DAY_MS,
  sgIsoNow,
  toT,
  validateRequest,
  type AnalyticsRequest,
  type AnalyticsResponse,
  type Metric,
  type MetricTotal,
} from "./contract";
import type { AnalyticsAdapter } from "./adapter-types";

export function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const binom = (n: number, p: number, r: () => number) => {
  let c = 0;
  for (let i = 0; i < n; i++) if (r() < p) c++;
  return c;
};

export type DayRow = { date: string } & Record<Exclude<Metric, never>, number>;

export function genDay(date: string, salt = "base"): DayRow {
  const r = rng(hash(`pdcadental.com|${date}|${salt}`));
  const t = toT(date) / DAY_MS;
  const dow = new Date(toT(date)).getUTCDay();
  const wk = dow === 0 || dow === 6 ? 0.4 : 1;
  const level = 19 * (1 + 0.22 * Math.sin(t / 41) + 0.1 * Math.sin(t / 9.5));
  const visitors = Math.max(0, Math.round(level * wk * (0.72 + 0.56 * r())));
  const newVisitors = binom(visitors, 0.66, r);
  const pageViews = visitors + binom(visitors * 3, 0.45, r);
  const whatsappClicks = binom(visitors, 0.022, r);
  const callClicks = binom(visitors, 0.006, r);
  const emailClicks = binom(visitors, 0.004, r);
  const formSubmits = binom(visitors, 0.003, r);
  const enquiries = whatsappClicks + callClicks + emailClicks + formSubmits;
  const directionsClicks = binom(visitors, 0.03, r);
  const rxDownloads = binom(visitors, 0.012, r);
  const listingViews = Math.round(visitors * (1.4 + r()));
  const listingCalls = binom(listingViews, 0.006, r);
  const listingDirections = binom(listingViews, 0.012, r);
  const listingWebsiteClicks = binom(listingViews, 0.025, r);
  return {
    date, visitors, newVisitors, pageViews, enquiries,
    whatsappClicks, callClicks, emailClicks, formSubmits,
    directionsClicks, rxDownloads,
    listingViews, listingCalls, listingDirections, listingWebsiteClicks,
  };
}

type Weights = readonly (readonly [string, number])[];
export const SOURCES: Weights = [["Google search", 0.4], ["Direct", 0.2], ["Google Maps", 0.13], ["Instagram", 0.08], ["Facebook", 0.06], ["LinkedIn", 0.05], ["TikTok", 0.03], ["Other sites", 0.05]];
export const PATHS: Weights = [["/", 0.3], ["/services", 0.22], ["/dentists", 0.14], ["/patients", 0.1], ["/about", 0.1], ["/contact", 0.12], ["/privacy", 0.02]];
export const DEVICES: Weights = [["mobile", 0.62], ["desktop", 0.33], ["tablet", 0.05]];
export const COUNTRIES: Weights = [["Singapore", 0.88], ["Malaysia", 0.05], ["Indonesia", 0.02], ["Other", 0.05]];
export const TERMS: Weights = [["dental lab singapore", 0.3], ["patrick dental", 0.2], ["pdca dental", 0.14], ["dental laboratory ubi", 0.1], ["zirconia crown lab singapore", 0.09], ["e.max crown singapore", 0.07], ["conventional dental lab singapore", 0.05], ["dental technician singapore", 0.05]];

export function runMockReport(q: AnalyticsRequest, salt = "base", now = Date.now()): AnalyticsResponse {
  validateRequest(q);
  const cp = comparePeriod(q.period);
  const cur = dayList(q.period.start, q.period.end).map((d) => genDay(d, salt));
  const prv = dayList(cp.start, cp.end).map((d) => genDay(d, salt));
  const sum = (list: DayRow[], m: Metric) => list.reduce((s, d) => s + d[m], 0);
  const totals: Partial<Record<Metric, MetricTotal>> = {};
  q.metrics.forEach((m) => {
    totals[m] = { value: sum(cur, m), previous: sum(prv, m) };
  });

  const r = rng(hash(`${JSON.stringify(q)}|${salt}`));
  const alloc = <F extends string>(total: number, table: Weights, field: F) => {
    const w = table.map((x) => x[1] * (0.7 + 0.6 * r()));
    const sw = w.reduce((s, x) => s + x, 0);
    const raw = w.map((x) => (total * x) / sw);
    const base = raw.map(Math.floor);
    const left = total - base.reduce((s, x) => s + x, 0);
    raw
      .map((x, i) => [x - Math.floor(x), i] as const)
      .sort((a, b) => b[0] - a[0])
      .slice(0, left)
      .forEach(([, i]) => {
        base[i]++;
      });
    let rows = table
      .map((x, i) => ({ key: x[0], [field]: base[i] }) as { key: string } & Record<F, number>)
      .sort((a, b) => b[field] - a[field]);
    if (rows.length > q.limit) {
      const rest = rows.slice(q.limit - 1).reduce((s, x) => s + x[field], 0);
      rows = rows.slice(0, q.limit - 1).concat([{ key: "Other", [field]: rest } as { key: string } & Record<F, number>]);
    }
    return rows;
  };

  const visitors = sum(cur, "visitors");
  const views = sum(cur, "pageViews");
  const res: AnalyticsResponse = {
    contract: CONTRACT,
    source: "mock",
    generatedAt: sgIsoNow(now),
    period: { start: q.period.start, end: q.period.end },
    comparePeriod: cp,
    totals,
    series: [],
    breakdowns: {},
  };
  if (q.breakdowns.includes("day")) {
    res.series = cur.map((d) => ({ date: d.date, visitors: d.visitors, pageViews: d.pageViews, enquiries: d.enquiries }));
  }
  const src = alloc(visitors, SOURCES, "visitors");
  if (q.breakdowns.includes("source")) res.breakdowns.source = src;
  if (q.breakdowns.includes("page")) res.breakdowns.page = alloc(views, PATHS, "pageViews");
  if (q.breakdowns.includes("device")) res.breakdowns.device = alloc(visitors, DEVICES, "visitors");
  if (q.breakdowns.includes("country")) res.breakdowns.country = alloc(visitors, COUNTRIES, "visitors");
  if (q.breakdowns.includes("searchTerm")) {
    const g = (src.find((x) => x.key === "Google search") ?? { visitors: 0 }).visitors;
    res.breakdowns.searchTerm = alloc(Math.round(g * (0.55 + 0.3 * r())), TERMS, "clicks").map((x) => ({
      key: x.key,
      clicks: x.clicks,
      impressions: x.clicks ? Math.round(x.clicks / (0.03 + 0.09 * r())) : Math.round(10 + 60 * r()),
    }));
  }
  return res;
}

/* ---------- session salt (Shuffle button) ---------- */
const SALT_KEY = "pdca.insights.salt";

export function getSalt(): string {
  try {
    return window.sessionStorage.getItem(SALT_KEY) || "base";
  } catch {
    return "base";
  }
}

export function shuffleSalt(): string {
  const salt = Math.random().toString(36).slice(2, 8);
  try {
    window.sessionStorage.setItem(SALT_KEY, salt);
  } catch {
    // ignore
  }
  return salt;
}

export const mockAdapter: AnalyticsAdapter = {
  source: "mock",
  async runReport(request) {
    return runMockReport(request, getSalt());
  },
};
