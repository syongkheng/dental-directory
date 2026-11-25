import { describe, expect, it } from "vitest";
import { comparePeriod, ContractError, validateRequest } from "../contract";
import { buildRequest } from "../request";

const good = () => buildRequest({ start: "2026-10-01", end: "2026-10-31" }) as unknown as Record<string, unknown>;

function problems(q: unknown): string[] {
  try {
    validateRequest(q);
    return [];
  } catch (e) {
    expect(e).toBeInstanceOf(ContractError);
    return (e as ContractError).problems;
  }
}

describe("validateRequest", () => {
  it("accepts the canonical request", () => {
    expect(() => validateRequest(good())).not.toThrow();
  });

  it("rejects a missing key", () => {
    const q = good();
    delete q.limit;
    expect(problems(q)).toContain("missing key: limit");
  });

  it("rejects an extra key", () => {
    expect(problems({ ...good(), range: "last30days" })).toContain("unknown key: range");
  });

  it("rejects an unknown metric", () => {
    const q = good();
    q.metrics = [...(q.metrics as string[]), "revenue"];
    expect(problems(q)).toContain("unknown metric: revenue");
  });

  it("rejects a duplicate metric", () => {
    const q = good();
    q.metrics = ["visitors", "visitors"];
    expect(problems(q)).toContain("a metric is listed twice");
  });

  it("rejects an unknown breakdown", () => {
    const q = good();
    q.breakdowns = ["day", "city"];
    expect(problems(q)).toContain("unknown breakdown: city");
  });

  it("rejects a bad date", () => {
    expect(problems({ ...good(), period: { start: "2026-13-01", end: "2026-13-31" } })).toContain(
      "period dates must be YYYY-MM-DD",
    );
    expect(problems({ ...good(), period: { start: "2026/10/01", end: "2026-10-31" } })).toContain(
      "period dates must be YYYY-MM-DD",
    );
  });

  it("rejects start after end", () => {
    expect(problems({ ...good(), period: { start: "2026-10-31", end: "2026-10-01" } })).toContain(
      "period start is after its end",
    );
  });

  it("rejects a span over 366 days", () => {
    expect(problems({ ...good(), period: { start: "2025-01-01", end: "2026-01-02" } })).toContain(
      "period is longer than 366 days",
    );
    expect(problems({ ...good(), period: { start: "2025-01-01", end: "2026-01-01" } })).toEqual([]);
  });

  it("rejects a wrong compare", () => {
    expect(problems({ ...good(), compare: "previous_year" })).toContain("compare must be previous_month");
  });

  it.each([0, 21, 2.5])("rejects limit %s", (limit) => {
    expect(problems({ ...good(), limit })).toContain("limit must be a whole number from 1 to 20");
  });

  it("lists every problem at once", () => {
    const q = { ...good(), metrics: ["revenue"], range: "x" } as Record<string, unknown>;
    delete q.limit;
    expect(problems(q).length).toBeGreaterThanOrEqual(3);
  });

  it("rejects a period with extra keys and wrong literals", () => {
    const p = problems({ ...good(), site: "x.com", timezone: "UTC", contract: "v2", period: { start: "2026-10-01", end: "2026-10-31", x: 1 } });
    expect(p).toEqual(
      expect.arrayContaining([
        "site must be pdcadental.com",
        "timezone must be Asia/Singapore",
        "contract must be pdca.analytics.report/v1",
        "period must hold exactly start and end",
      ]),
    );
  });
});

describe("comparePeriod", () => {
  it.each([
    [{ start: "2026-10-01", end: "2026-10-31" }, { start: "2026-09-01", end: "2026-09-30" }],
    [{ start: "2026-03-01", end: "2026-03-31" }, { start: "2026-02-01", end: "2026-02-28" }],
    [{ start: "2026-11-01", end: "2026-11-24" }, { start: "2026-10-01", end: "2026-10-24" }],
    [{ start: "2026-01-01", end: "2026-01-31" }, { start: "2025-12-01", end: "2025-12-31" }],
  ])("%o → %o", (input, expected) => {
    expect(comparePeriod(input)).toEqual(expected);
  });

  it("clamps the day to the month's length", () => {
    expect(comparePeriod({ start: "2026-03-01", end: "2026-03-30" })).toEqual({ start: "2026-02-01", end: "2026-02-28" });
  });
});
