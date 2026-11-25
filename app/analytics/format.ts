// M27 Formatting: change(), pts(), periodLabel(), headline().
import { isFullMonth, type AnalyticsResponse, type Period } from "./contract";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const fmt = (n: number) => Number(n).toLocaleString("en-SG");

/** Under 20 previously: show the difference ("+3 (was 1)"); otherwise a whole-number percentage ("−17%"). */
export function change(a: number, b: number): string {
  if (b < 20) {
    const d = a - b;
    return `${d > 0 ? "+" : d < 0 ? "−" : ""}${Math.abs(d)} (was ${b})`;
  }
  const p = Math.round(((a - b) / b) * 100);
  return `${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p)}%`;
}

/** Difference between two ratios in percentage points, one decimal. */
export function pts(a: number, b: number): string {
  const d = Math.round((a - b) * 1000) / 10;
  return `${d > 0 ? "+" : d < 0 ? "−" : ""}${Math.abs(d).toFixed(1)} pts`;
}

export function periodLabel(p: Period): string {
  const y = p.start.slice(0, 4);
  const m = Number(p.start.slice(5, 7)) - 1;
  if (isFullMonth(p)) return `${MONL[m]} ${y}`;
  const me = Number(p.end.slice(5, 7)) - 1;
  return `${Number(p.start.slice(8))} ${MON[m]} to ${Number(p.end.slice(8))} ${MON[me]} ${p.end.slice(0, 4)}`;
}

/** "Visitors rose 12% on September 2026; 9 enquiries came in, 6 of them by WhatsApp" */
export function headline(res: Pick<AnalyticsResponse, "totals" | "comparePeriod">): string {
  const cmp = periodLabel(res.comparePeriod);
  const v = res.totals.visitors ?? { value: 0, previous: 0 };
  const e = res.totals.enquiries ?? { value: 0, previous: 0 };
  const wa = res.totals.whatsappClicks?.value ?? 0;
  const pc = v.previous ? Math.round(((v.value - v.previous) / v.previous) * 100) : 0;
  const verb = pc > 0 ? `rose ${pc}%` : pc < 0 ? `fell ${Math.abs(pc)}%` : "held steady";
  const who = e.value === 1 ? "1 enquiry came in" : `${fmt(e.value)} enquiries came in`;
  return `Visitors ${verb} on ${cmp}; ${who}${e.value ? `, ${fmt(wa)} of them by WhatsApp` : ""}`;
}

export function subline(res: Pick<AnalyticsResponse, "period" | "comparePeriod">): string {
  return `${periodLabel(res.period)}, compared with ${periodLabel(res.comparePeriod)}`;
}

export const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/dentists": "For Dentists",
  "/patients": "For Patients",
  "/about": "About",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/our-work": "Our Work",
  "/careers": "Careers",
};

export const DEVICE_NAMES: Record<string, string> = { mobile: "Phone", desktop: "Computer", tablet: "Tablet" };
