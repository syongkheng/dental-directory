// Public site layout: M01 header, page, M05 footer, M02 floating WhatsApp, M06 cookie banner.
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { ui } from "~/content/nav";
import { SiteHeader } from "~/components/M01-SiteHeader/SiteHeader";
import { SiteFooter } from "~/components/M05-SiteFooter/SiteFooter";
import { WhatsAppFloat } from "~/components/M02-WhatsAppFloat/WhatsAppFloat";
import { CookieBanner } from "~/components/M06-CookieBanner/CookieBanner";
import { useConsent } from "~/components/M06-CookieBanner/ConsentProvider";
import { JsonLd } from "~/components/M29-Seo/JsonLd";
import { track, trackLinkClick } from "~/lib/track";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const { choice } = useConsent();

  // M28: one page_view per route change (and once when consent is first granted on a page).
  useEffect(() => {
    if (choice !== "granted") return;
    // Wait a tick so React has hoisted the new <title>.
    const id = window.setTimeout(() => track("page_view", { title: document.title }), 0);
    return () => window.clearTimeout(id);
  }, [pathname, choice]);

  // M28: one listener maps WhatsApp / tel / mailto / maps / PDF link clicks to events.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a) trackLinkClick(a);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipLink}
      </a>
      <JsonLd />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <CookieBanner />
    </>
  );
}
