// M26 Insights dashboard. Knows nothing about where the data comes from: it renders an AnalyticsResponse.
import { useState } from "react";
import type { AnalyticsRequest, AnalyticsResponse, AnalyticsSource, Metric } from "~/analytics/contract";
import { change, DEVICE_NAMES, fmt, headline, PAGE_NAMES, periodLabel, pts, subline } from "~/analytics/format";
import type { PeriodOption } from "~/analytics/request";
import { insightsCopy as c } from "~/content/pages/insights";
import { buttonClass } from "~/components/ui/Button";
import { VisitorsChart } from "./VisitorsChart";
import styles from "./InsightsDashboard.module.css";

export interface DashboardProps {
  request: AnalyticsRequest;
  response: AnalyticsResponse;
  source: AnalyticsSource;
  options: PeriodOption[];
  selected: string;
  showContract: boolean;
  onPeriod: (value: string) => void;
  onShuffle: () => void;
  busy?: boolean;
}

type Row = { key: string; n: number };

function Bars({ rows, label }: { rows: Row[]; label?: (k: string) => string }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  const tot = rows.reduce((s, r) => s + r.n, 0) || 1;
  return (
    <div className={styles.bars}>
      {rows.map((r) => (
        <div key={r.key} className={styles.brow}>
          <span className={styles.bkey}>{label ? label(r.key) : r.key}</span>
          <div className={styles.track} aria-hidden="true">
            <div className={styles.fill} style={{ width: `${((r.n / max) * 100).toFixed(1)}%` }} />
          </div>
          <span className={styles.bval}>
            {fmt(r.n)}
            <small>{Math.round((r.n / tot) * 100)}%</small>
          </span>
        </div>
      ))}
    </div>
  );
}

function NotTracked() {
  return <p className={styles.notTracked}>{c.notTracked}</p>;
}

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`${styles.panel} avoid-break ${className ?? ""}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <button
      type="button"
      className={buttonClass("secondary")}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setState("ok");
        } catch {
          setState("fail");
        }
        window.setTimeout(() => setState("idle"), 2400);
      }}
    >
      {state === "ok" ? c.contract.copied : state === "fail" ? c.contract.copyFailed : label}
    </button>
  );
}

export function InsightsDashboard(p: DashboardProps) {
  const { response: s, request: q } = p;
  const T = s.totals;
  const val = (m: Metric) => T[m] ?? { value: 0, previous: 0 };
  const cmp = periodLabel(s.comparePeriod);
  const v = val("visitors");
  const e = val("enquiries");
  const nv = val("newVisitors");
  const rate = v.value ? e.value / v.value : 0;
  const prate = v.previous ? e.previous / v.previous : 0;
  const nshare = v.value ? nv.value / v.value : 0;
  const pnshare = v.previous ? nv.previous / v.previous : 0;
  const isMock = p.source === "mock";
  const isQindom = p.source === "qindom";

  const touchRows: Row[] = [
    { key: c.touch.whatsapp, n: val("whatsappClicks").value },
    { key: c.touch.phone, n: val("callClicks").value },
    { key: c.touch.email, n: val("emailClicks").value },
    { key: c.touch.form, n: val("formSubmits").value },
  ];
  const b = s.breakdowns;
  const toRows = <K extends string>(list: ({ key: string } & Record<K, number>)[] | undefined, f: K): Row[] =>
    (list ?? []).map((x) => ({ key: x.key, n: x[f] }));

  const dev = b.device ?? [];
  const devTotal = dev.reduce((a, x) => a + x.visitors, 0) || 1;
  const devOrder = ["mobile", "desktop", "tablet"].map((k) => dev.find((x) => x.key === k) ?? { key: k, visitors: 0 });

  const listingTracked = !isQindom;
  const kpi = (title: string, value: string, delta: string, note: string, testId: string) => (
    <div className={styles.kpi} data-testid={testId}>
      <h3>{title}</h3>
      <div className={styles.kpiValue}>{value}</div>
      <div className={styles.kpiChange}>
        <b>{delta}</b> {note}
      </div>
    </div>
  );

  return (
    <div className={`container ${styles.dash}`} aria-busy={p.busy || undefined}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.title}>{headline(s)}</h1>
          <p className={styles.sub}>{subline(s)}</p>
        </div>
        <div className={`${styles.controls} no-print`}>
          <label htmlFor="insights-month">{c.month}</label>
          <select id="insights-month" value={p.selected} onChange={(ev) => p.onPeriod(ev.target.value)}>
            {p.options.map((o) => (
              <option key={o.value} value={o.value}>
                {periodLabel(o.period)}
                {o.value === "mtd" ? ` ${c.toDate}` : ""}
              </option>
            ))}
          </select>
          {isMock ? (
            <button type="button" className={buttonClass("secondary")} onClick={p.onShuffle}>
              {c.shuffle}
            </button>
          ) : null}
          <button type="button" className={buttonClass("primary")} onClick={() => window.print()}>
            {c.download}
          </button>
        </div>
      </div>

      <p className="print-only">
        {c.printedPeriod}: {periodLabel(s.period)}
      </p>
      {isMock ? <p className={styles.sample}>{c.sample}</p> : null}

      <div className={`${styles.kpis} avoid-break`}>
        {kpi(c.kpi.visitors, fmt(v.value), change(v.value, v.previous), `${c.kpi.vs} ${cmp}`, "kpi-visitors")}
        {kpi(c.kpi.enquiries, fmt(e.value), change(e.value, e.previous), `${c.kpi.vs} ${cmp}`, "kpi-enquiries")}
        {kpi(c.kpi.rate, `${(rate * 100).toFixed(1)}%`, pts(rate, prate), c.kpi.rateNote, "kpi-rate")}
        {kpi(
          c.kpi.newVisitors,
          `${Math.round(nshare * 100)}%`,
          pts(nshare, pnshare),
          `${fmt(v.value - nv.value)} ${c.kpi.returning}`,
          "kpi-new",
        )}
      </div>

      <section className={`${styles.panel} avoid-break`}>
        <div className={styles.panelHead}>
          <h2>{c.chartTitle}</h2>
          <span className={styles.legend}>
            <span>
              <i className={styles.lg} />
              {c.legend.weekday}
            </span>
            <span>
              <i className={`${styles.lg} ${styles.lgWeekend}`} />
              {c.legend.weekend}
            </span>
            <span>
              <i className={`${styles.lg} ${styles.lgDot}`} />
              {c.legend.enquiry}
            </span>
          </span>
        </div>
        <VisitorsChart series={s.series} />
      </section>

      <div className={styles.grid2}>
        <Panel title={c.touch.title}>
          <Bars rows={touchRows} />
          <p className={styles.note}>
            {c.touch.alsoPrefix} {fmt(val("directionsClicks").value)} {c.touch.directions},{" "}
            {change(val("directionsClicks").value, val("directionsClicks").previous)}; {fmt(val("rxDownloads").value)}{" "}
            {c.touch.rx}, {change(val("rxDownloads").value, val("rxDownloads").previous)}.
          </p>
        </Panel>
        <Panel title={c.sources}>
          {b.source?.length ? <Bars rows={toRows(b.source, "visitors")} /> : <NotTracked />}
        </Panel>
      </div>

      <div className={styles.grid2}>
        <Panel title={c.pages}>
          {b.page?.length ? <Bars rows={toRows(b.page, "pageViews")} label={(k) => PAGE_NAMES[k] ?? k} /> : <NotTracked />}
        </Panel>
        <section className={`${styles.panel} avoid-break`}>
          <h2>{c.device}</h2>
          {dev.length ? (
            <div className={styles.split} role="img" aria-label={devOrder.map((x) => `${DEVICE_NAMES[x.key]} ${Math.round((x.visitors / devTotal) * 100)}%`).join(", ")}>
              {devOrder.map((x) => {
                const pc = Math.round((x.visitors / devTotal) * 100);
                return (
                  <div key={x.key} style={{ flex: Math.max(x.visitors, 0.0001) }} title={`${DEVICE_NAMES[x.key]} ${pc}%`}>
                    {pc >= 9 ? `${DEVICE_NAMES[x.key]} ${pc}%` : ""}
                  </div>
                );
              })}
            </div>
          ) : (
            <NotTracked />
          )}
          <h2 className={styles.mt}>{c.countries}</h2>
          {b.country?.length ? <Bars rows={toRows(b.country, "visitors")} /> : <NotTracked />}
        </section>
      </div>

      <div className={styles.grid2}>
        <Panel title={c.searches.title}>
          {b.searchTerm?.length ? (
            <div className={styles.scroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{c.searches.search}</th>
                    <th scope="col" className={styles.num}>
                      {c.searches.clicks}
                    </th>
                    <th scope="col" className={styles.num}>
                      {c.searches.shown}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {b.searchTerm.map((x) => (
                    <tr key={x.key}>
                      <td>{x.key}</td>
                      <td className={styles.num}>{fmt(x.clicks)}</td>
                      <td className={styles.num}>{fmt(x.impressions)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NotTracked />
          )}
        </Panel>
        <Panel title={c.listing.title}>
          {listingTracked ? (
            <div className={styles.gbp}>
              {(
                [
                  [c.listing.views, "listingViews"],
                  [c.listing.calls, "listingCalls"],
                  [c.listing.directions, "listingDirections"],
                  [c.listing.website, "listingWebsiteClicks"],
                ] as const
              ).map(([label, m]) => (
                <div key={m}>
                  <b>{fmt(val(m).value)}</b>
                  <span>
                    {label}, {change(val(m).value, val(m).previous)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <NotTracked />
          )}
          <p className={styles.note}>{c.listing.note}</p>
        </Panel>
      </div>

      {p.showContract ? (
        <details className={`${styles.contract} no-print`}>
          <summary>{c.contract.title}</summary>
          <div className={styles.grid2}>
            <div>
              <h3>{c.contract.request}</h3>
              <CopyButton text={JSON.stringify(q, null, 2)} label={c.contract.copyRequest} />
              <pre className={styles.json}>{JSON.stringify(q, null, 2)}</pre>
            </div>
            <div>
              <h3>{c.contract.response}</h3>
              <CopyButton text={JSON.stringify(s, null, 2)} label={c.contract.copyResponse} />
              <pre className={styles.json}>{JSON.stringify(s, null, 2)}</pre>
            </div>
          </div>
        </details>
      ) : null}
    </div>
  );
}
