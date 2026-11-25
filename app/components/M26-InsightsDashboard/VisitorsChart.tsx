// M26 Visitors per day: SVG bar chart drawn at real pixel size (ResizeObserver). No chart library.
import { useEffect, useRef, useState } from "react";
import { toT, type AnalyticsResponse } from "~/analytics/contract";
import { insightsCopy } from "~/content/pages/insights";
import styles from "./InsightsDashboard.module.css";

export function niceStep(max: number): number {
  const raw = max / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / pow;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
}

export function VisitorsChart({ series }: { series: AnalyticsResponse["series"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w: W, h: H } = size;
  const n = series.length;
  let body = null;
  if (W > 0 && H > 0 && n > 0) {
    const ml = 38, mr = 8, mt = 18, mb = 28;
    const iw = W - ml - mr, ih = H - mt - mb;
    const max = Math.max(4, ...series.map((d) => d.visitors));
    const step = niceStep(max);
    const top = Math.ceil(max / step) * step;
    const y = (v: number) => mt + ih - (v / top) * ih;
    const bw = iw / n;
    const marks = W < 520 ? [1, 10, 20, 30] : [1, 5, 10, 15, 20, 25, 30];
    const grid: number[] = [];
    for (let v = 0; v <= top + 0.001; v += step) grid.push(v);
    body = (
      <>
        {grid.map((v) => (
          <g key={`g${v}`}>
            <line x1={ml} x2={W - mr} y1={y(v)} y2={y(v)} className={styles.gridline} />
            <text x={ml - 7} y={y(v) + 4.5} textAnchor="end" className={styles.axis}>
              {v}
            </text>
          </g>
        ))}
        {series.map((d, i) => {
          const dow = new Date(toT(d.date)).getUTCDay();
          const weekend = dow === 0 || dow === 6;
          const x = ml + i * bw + bw * 0.16;
          const w = Math.max(1.5, bw * 0.68);
          const yy = y(d.visitors);
          const day = Number(d.date.slice(8));
          return (
            <g key={d.date}>
              <rect
                x={x.toFixed(1)}
                y={yy.toFixed(1)}
                width={w.toFixed(1)}
                height={Math.max(0, mt + ih - yy).toFixed(1)}
                rx={1.5}
                className={weekend ? styles.barWeekend : styles.bar}
              >
                <title>
                  {d.date}: {d.visitors} visitors, {d.enquiries} enquiries
                </title>
              </rect>
              {d.enquiries ? <circle cx={(x + w / 2).toFixed(1)} cy={(yy - 8).toFixed(1)} r={3.6} className={styles.dot} /> : null}
              {marks.includes(day) ? (
                <text x={(ml + i * bw + bw / 2).toFixed(1)} y={H - 8} textAnchor="middle" className={styles.axis}>
                  {day}
                </text>
              ) : null}
            </g>
          );
        })}
      </>
    );
  }

  return (
    <div ref={ref} className={styles.fig}>
      <svg
        role="img"
        aria-label={insightsCopy.chartLabel}
        width={W || undefined}
        height={H || undefined}
        viewBox={W && H ? `0 0 ${W} ${H}` : undefined}
        data-testid="visitors-chart"
      >
        {body}
      </svg>
    </div>
  );
}
