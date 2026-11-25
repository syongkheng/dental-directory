import { describe, expect, it } from "vitest";
import { dayList, METRICS, type AnalyticsResponse } from "../contract";
import { genDay, runMockReport } from "../mock-adapter";
import { buildRequest, monthPeriod } from "../request";

const NOW = Date.UTC(2026, 10, 25, 4); // 25 Nov 2026, 12:00 SGT
const oct = buildRequest(monthPeriod(2026, 10));
const sep = buildRequest(monthPeriod(2026, 9));

const sum = (rows: { [k: string]: unknown }[], f: string) => rows.reduce((s, r) => s + (r[f] as number), 0);
const strip = (r: AnalyticsResponse) => ({ ...r, generatedAt: "" });

describe("mock adapter invariants", () => {
  const res = runMockReport(oct, "base", NOW);

  it("returns exactly the requested metrics", () => {
    expect(Object.keys(res.totals).sort()).toEqual([...METRICS].sort());
  });

  it("totals equal the sum of the daily rows", () => {
    const days = dayList(oct.period.start, oct.period.end).map((d) => genDay(d));
    for (const m of METRICS) expect(res.totals[m]!.value).toBe(sum(days, m));
    expect(sum(res.series, "visitors")).toBe(res.totals.visitors!.value);
    expect(sum(res.series, "pageViews")).toBe(res.totals.pageViews!.value);
    expect(sum(res.series, "enquiries")).toBe(res.totals.enquiries!.value);
  });

  it("enquiries = whatsapp + call + email + form", () => {
    const t = res.totals;
    expect(t.enquiries!.value).toBe(t.whatsappClicks!.value + t.callClicks!.value + t.emailClicks!.value + t.formSubmits!.value);
    for (const d of dayList(oct.period.start, oct.period.end).map((x) => genDay(x))) {
      expect(d.enquiries).toBe(d.whatsappClicks + d.callClicks + d.emailClicks + d.formSubmits);
    }
  });

  it("each breakdown sums to its total", () => {
    const b = res.breakdowns;
    expect(sum(b.source!, "visitors")).toBe(res.totals.visitors!.value);
    expect(sum(b.page!, "pageViews")).toBe(res.totals.pageViews!.value);
    expect(sum(b.device!, "visitors")).toBe(res.totals.visitors!.value);
    expect(sum(b.country!, "visitors")).toBe(res.totals.visitors!.value);
  });

  it("collapses the tail into Other when keys exceed the limit", () => {
    const r = runMockReport({ ...oct, limit: 3 }, "base", NOW);
    expect(r.breakdowns.source).toHaveLength(3);
    expect(r.breakdowns.source!.at(-1)!.key).toBe("Other");
    expect(sum(r.breakdowns.source!, "visitors")).toBe(r.totals.visitors!.value);
  });

  it("is deterministic for the same request and salt (apart from generatedAt)", () => {
    expect(strip(runMockReport(oct, "base", NOW))).toEqual(strip(runMockReport(oct, "base", NOW + 5000)));
  });

  it("chains months: October's previous equals September's value", () => {
    const s = runMockReport(sep, "base", NOW);
    for (const m of METRICS) expect(res.totals[m]!.previous).toBe(s.totals[m]!.value);
  });

  it("Shuffle (another salt) changes values but not the response's keys", () => {
    const other = runMockReport(oct, "x7k2pq", NOW);
    expect(other.series.map((d) => d.visitors)).not.toEqual(res.series.map((d) => d.visitors));
    expect(other.totals).not.toEqual(res.totals);
    expect(Object.keys(other).sort()).toEqual(Object.keys(res).sort());
    expect(Object.keys(other.totals).sort()).toEqual(Object.keys(res.totals).sort());
    expect(Object.keys(other.breakdowns).sort()).toEqual(Object.keys(res.breakdowns).sort());
  });

  it("validates before doing anything", () => {
    expect(() => runMockReport({ ...oct, limit: 0 })).toThrow(/limit/);
  });

  it("uses the fixed response shape", () => {
    expect(res.contract).toBe("pdca.analytics.report/v1");
    expect(res.source).toBe("mock");
    expect(res.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/);
    expect(res.comparePeriod).toEqual({ start: "2026-09-01", end: "2026-09-30" });
    expect(res.series).toHaveLength(31);
  });
});
