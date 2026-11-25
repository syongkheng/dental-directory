// /insights — private page (M26). Never linked, not in the sitemap or robots.txt, noindex,nofollow.
// Pre-rendered as an empty shell: data loads in the browser (clientLoader), so the HTML holds no numbers.
// There is no login (no backend for this site); with the qindom source, a viewer key in ?key= is required.
import { Link, useNavigation, useRevalidator, useSearchParams } from "react-router";
import type { Route } from "./+types/insights";
import { getAdapter } from "~/analytics/adapter";
import { ContractError } from "~/analytics/contract";
import { shuffleSalt } from "~/analytics/mock-adapter";
import { buildRequest, periodOptions, resolvePeriod } from "~/analytics/request";
import { insightsCopy as c } from "~/content/pages/insights";
import { seo } from "~/content/seo";
import { site } from "~/content/site";
import { InsightsDashboard } from "~/components/M26-InsightsDashboard/InsightsDashboard";
import { Logo } from "~/components/M01-SiteHeader/Logo";
import { Seo } from "~/components/M29-Seo/Seo";
import { buttonClass } from "~/components/ui/Button";
import styles from "~/components/M26-InsightsDashboard/InsightsDashboard.module.css";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const option = resolvePeriod(url.searchParams.get("period"));
  const adapter = getAdapter(url.searchParams);
  const req = buildRequest(option.period);
  try {
    const res = await adapter.runReport(req);
    return {
      ok: true as const,
      request: req,
      response: res,
      source: adapter.source,
      selected: option.value,
      options: periodOptions(),
      debug: url.searchParams.get("debug") === "1",
    };
  } catch (err) {
    const message =
      err instanceof ContractError ? `Request rejected: ${err.message}` : err instanceof Error ? err.message : String(err);
    return { ok: false as const, message };
  }
}
clientLoader.hydrate = true as const;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Seo page={seo.insights} noindex nofollow />
      <header className={styles.head}>
        <div className={`container ${styles.headInner}`}>
          <Link to="/" className={styles.logo}>
            <Logo className={styles.mark} />
            <span>{site.shortName}</span>
          </Link>
          <span className={styles.tag}>{c.tag}</span>
        </div>
      </header>
      <main id="main">{children}</main>
    </>
  );
}

export function HydrateFallback() {
  return (
    <Shell>
      <div className={`container ${styles.skeleton}`} aria-busy="true">
        <h1 className={styles.title}>{c.loading}</h1>
        <div className={styles.skeletonBlock} />
        <div className={styles.skeletonBlock} style={{ height: "15rem" }} />
        <div className={styles.skeletonBlock} />
      </div>
    </Shell>
  );
}

export default function Insights({ loaderData }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  const revalidator = useRevalidator();
  const navigation = useNavigation();

  if (!loaderData.ok) {
    return (
      <Shell>
        <div className={`container ${styles.error}`} role="alert">
          <h1 className={styles.title}>{c.error.title}</h1>
          <p>{loaderData.message}</p>
          <button type="button" className={buttonClass("primary")} onClick={() => revalidator.revalidate()}>
            {c.error.retry}
          </button>
        </div>
      </Shell>
    );
  }

  const d = loaderData;
  return (
    <Shell>
      <InsightsDashboard
        request={d.request}
        response={d.response}
        source={d.source}
        options={d.options}
        selected={d.selected}
        showContract={d.source === "mock" || d.debug}
        busy={navigation.state !== "idle" || revalidator.state !== "idle"}
        onPeriod={(value) => {
          const next = new URLSearchParams(params);
          next.set("period", value);
          setParams(next);
        }}
        onShuffle={() => {
          shuffleSalt();
          revalidator.revalidate();
        }}
      />
    </Shell>
  );
}
