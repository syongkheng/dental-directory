// M27 buildRequest(period): the one canonical request. Only `period` ever changes.
// Also: URL ?period parsing and the month-picker options (Singapore time).
import {
  BREAKDOWNS,
  CONTRACT,
  DAY_MS,
  isFullMonth,
  lastDay,
  METRICS,
  pad,
  sgToday,
  toD,
  toT,
  type AnalyticsRequest,
  type Period,
} from "./contract";

export function buildRequest(period: Period): AnalyticsRequest {
  return {
    contract: CONTRACT,
    site: "pdcadental.com",
    timezone: "Asia/Singapore",
    period: { start: period.start, end: period.end },
    compare: "previous_month",
    metrics: [...METRICS],
    breakdowns: [...BREAKDOWNS],
    limit: 8,
  };
}

export function monthPeriod(y: number, m: number): Period {
  return { start: `${y}-${pad(m)}-01`, end: `${y}-${pad(m)}-${pad(lastDay(y, m))}` };
}

/** Month to date: 1st to yesterday (Singapore). Null on the 1st of the month. */
export function mtdPeriod(now = Date.now()): Period | null {
  const today = sgToday(now);
  const yday = toD(toT(today) - DAY_MS);
  if (yday.slice(0, 7) !== today.slice(0, 7)) return null;
  return { start: `${today.slice(0, 7)}-01`, end: yday };
}

export function lastFullMonth(now = Date.now()): Period {
  const today = sgToday(now);
  let y = Number(today.slice(0, 4));
  let m = Number(today.slice(5, 7)) - 1;
  if (m === 0) {
    m = 12;
    y--;
  }
  return monthPeriod(y, m);
}

export interface PeriodOption {
  value: string; // "mtd" | "YYYY-MM"
  period: Period;
}

/** Month to date (when today is not the 1st) plus the last 12 full months, newest first. */
export function periodOptions(now = Date.now()): PeriodOption[] {
  const opts: PeriodOption[] = [];
  const mtd = mtdPeriod(now);
  if (mtd) opts.push({ value: "mtd", period: mtd });
  const today = sgToday(now);
  let y = Number(today.slice(0, 4));
  let m = Number(today.slice(5, 7));
  for (let i = 0; i < 12; i++) {
    m--;
    if (m === 0) {
      m = 12;
      y--;
    }
    opts.push({ value: `${y}-${pad(m)}`, period: monthPeriod(y, m) });
  }
  return opts;
}

/** Resolves ?period= to an offered option; anything else falls back to the last full month. */
export function resolvePeriod(param: string | null, now = Date.now()): PeriodOption {
  const opts = periodOptions(now);
  const hit = param ? opts.find((o) => o.value === param) : undefined;
  if (hit) return hit;
  return opts.find((o) => isFullMonth(o.period)) ?? opts[0];
}
