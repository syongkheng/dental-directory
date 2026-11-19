/**
 * Analytics screen buckets for this site — must match the `dental-directory` row in
 * qindom's tb_analytic_system registry. Boundaries follow the layout's own media queries:
 *   sm ≤560 (ServicesOverview single column) · md ≤860 (mobile nav) · lg ≤1024 · xl >1024
 * `size` is the cross-site normalised class (small / medium / large).
 */
export type ScreenSize = 'small' | 'medium' | 'large'

const BUCKETS: { key: string; maxWidth: number | null; size: ScreenSize }[] = [
  { key: 'sm', maxWidth: 560, size: 'small' },
  { key: 'md', maxWidth: 860, size: 'medium' },
  { key: 'lg', maxWidth: 1024, size: 'large' },
  { key: 'xl', maxWidth: null, size: 'large' },
]

export function currentScreen(): { width: number; height: number; breakpoint: string; size: ScreenSize } {
  const width = window.innerWidth
  const height = window.innerHeight
  const b = BUCKETS.find((x) => x.maxWidth === null || width <= x.maxWidth) ?? BUCKETS[BUCKETS.length - 1]
  return { width, height, breakpoint: b.key, size: b.size }
}
