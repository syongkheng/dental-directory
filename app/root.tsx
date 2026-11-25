import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
import type { Route } from "./+types/root";
import { ConsentProvider } from "./components/M06-CookieBanner/ConsentProvider";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/print.css";

// Self-hosted Inter Variable (latin subset), font-display: swap, preloaded below.
const fontFace = `@font-face{font-family:"Inter Variable";font-style:normal;font-display:swap;font-weight:100 900;src:url(${interLatin}) format("woff2-variations");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`;

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: interLatin, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-SG">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFFFFF" />
        <style dangerouslySetInnerHTML={{ __html: fontFace }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ConsentProvider>
      <Outlet />
    </ConsentProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Something went wrong";
  let detail = "Please try again, or contact us on WhatsApp at +65 6842 3371.";
  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    detail = error.statusText || detail;
  } else if (import.meta.env.DEV && error instanceof Error) {
    detail = error.message;
  }
  return (
    <main className="container section">
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <h1>{title}</h1>
      <p className="lead">{detail}</p>
      <p>
        <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/contact">Contact</a>
      </p>
    </main>
  );
}
