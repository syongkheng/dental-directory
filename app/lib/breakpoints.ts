// Screen buckets sent with each analytics event. Keys must match the `dental-directory` row in
// qindom's tb_analytic_system registry. Widths follow this site's layout breakpoints:
//   sm ≤460 (short logo) · md ≤820 (menu button) · lg ≤1024 · xl >1024
export type ScreenSize = "small" | "medium" | "large";

export const BUCKETS: { key: string; maxWidth: number | null; size: ScreenSize }[] = [
  { key: "sm", maxWidth: 460, size: "small" },
  { key: "md", maxWidth: 820, size: "medium" },
  { key: "lg", maxWidth: 1024, size: "large" },
  { key: "xl", maxWidth: null, size: "large" },
];

export function bucketFor(width: number) {
  return BUCKETS.find((b) => b.maxWidth === null || width <= b.maxWidth) ?? BUCKETS[BUCKETS.length - 1];
}

export function currentScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const b = bucketFor(width);
  return { width, height, breakpoint: b.key, size: b.size };
}
