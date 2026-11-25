import { describe, expect, it } from "vitest";
import { change, headline, periodLabel, pts, subline } from "../format";
import { lastFullMonth, mtdPeriod, periodOptions, resolvePeriod } from "../request";

describe("change()", () => {
  it("shows the difference when the previous value is under 20", () => {
    expect(change(4, 1)).toBe("+3 (was 1)");
    expect(change(1, 4)).toBe("−3 (was 4)");
    expect(change(5, 5)).toBe("0 (was 5)");
  });
  it("shows a whole-number percentage otherwise", () => {
    expect(change(83, 100)).toBe("−17%");
    expect(change(112, 100)).toBe("+12%");
    expect(change(20, 20)).toBe("0%");
  });
});

describe("pts()", () => {
  it("formats percentage-point differences with one decimal", () => {
    expect(pts(0.032, 0.021)).toBe("+1.1 pts");
    expect(pts(0.5, 0.52)).toBe("−2.0 pts");
    expect(pts(0.1, 0.1)).toBe("0.0 pts");
  });
});

describe("periodLabel()", () => {
  it("labels full months and partial periods", () => {
    expect(periodLabel({ start: "2026-10-01", end: "2026-10-31" })).toBe("October 2026");
    expect(periodLabel({ start: "2026-11-01", end: "2026-11-24" })).toBe("1 Nov to 24 Nov 2026");
  });
});

describe("headline()", () => {
  const cp = { start: "2026-09-01", end: "2026-09-30" };
  it("uses the singular for one enquiry", () => {
    expect(
      headline({
        comparePeriod: cp,
        totals: { visitors: { value: 110, previous: 100 }, enquiries: { value: 1, previous: 2 }, whatsappClicks: { value: 1, previous: 0 } },
      }),
    ).toBe("Visitors rose 10% on September 2026; 1 enquiry came in, 1 of them by WhatsApp");
  });
  it("handles a fall and several enquiries", () => {
    expect(
      headline({
        comparePeriod: cp,
        totals: { visitors: { value: 80, previous: 100 }, enquiries: { value: 9, previous: 2 }, whatsappClicks: { value: 6, previous: 0 } },
      }),
    ).toBe("Visitors fell 20% on September 2026; 9 enquiries came in, 6 of them by WhatsApp");
  });
  it("holds steady and omits WhatsApp when there are no enquiries", () => {
    expect(
      headline({
        comparePeriod: cp,
        totals: { visitors: { value: 100, previous: 100 }, enquiries: { value: 0, previous: 2 }, whatsappClicks: { value: 0, previous: 0 } },
      }),
    ).toBe("Visitors held steady on September 2026; 0 enquiries came in");
  });
  it("builds the subline", () => {
    expect(subline({ period: { start: "2026-10-01", end: "2026-10-31" }, comparePeriod: cp })).toBe(
      "October 2026, compared with September 2026",
    );
  });
});

describe("periods (Singapore time)", () => {
  const NOW = Date.UTC(2026, 10, 25, 4); // 25 Nov 2026 12:00 SGT
  it("defaults to the last full month", () => {
    expect(lastFullMonth(NOW)).toEqual({ start: "2026-10-01", end: "2026-10-31" });
    expect(resolvePeriod(null, NOW).value).toBe("2026-10");
    expect(resolvePeriod("1999-01", NOW).value).toBe("2026-10");
  });
  it("offers month to date plus the last 12 full months", () => {
    const opts = periodOptions(NOW);
    expect(opts).toHaveLength(13);
    expect(opts[0]).toEqual({ value: "mtd", period: { start: "2026-11-01", end: "2026-11-24" } });
    expect(opts[12].value).toBe("2025-11");
  });
  it("has no month to date on the 1st (Singapore)", () => {
    const first = Date.UTC(2026, 10, 30, 17); // 1 Dec 2026 01:00 SGT
    expect(mtdPeriod(first)).toBeNull();
    expect(periodOptions(first)).toHaveLength(12);
    expect(lastFullMonth(first)).toEqual({ start: "2026-11-01", end: "2026-11-30" });
  });
  it("handles January → December of the previous year", () => {
    expect(lastFullMonth(Date.UTC(2027, 0, 10))).toEqual({ start: "2026-12-01", end: "2026-12-31" });
  });
});
