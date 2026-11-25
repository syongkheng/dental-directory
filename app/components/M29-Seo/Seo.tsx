// M29 Search basics: title, description, canonical, Open Graph and Twitter tags via React 19 metadata hoisting.
import { SITE_URL } from "~/config/flags";
import { OG_IMAGE, type PageSeo } from "~/content/seo";
import { site } from "~/content/site";

export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function Seo({
  page,
  path,
  noindex,
  nofollow,
}: {
  page: PageSeo;
  path?: string;
  noindex?: boolean;
  nofollow?: boolean;
}) {
  const url = path !== undefined ? canonicalUrl(path) : undefined;
  const image = `${SITE_URL}${OG_IMAGE}`;
  const robots = noindex ? `noindex,${nofollow ? "nofollow" : "follow"}` : undefined;
  return (
    <>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      {url && !noindex ? <link rel="canonical" href={url} /> : null}
      {!noindex ? (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={site.name} />
          <meta property="og:title" content={page.title} />
          <meta property="og:description" content={page.description} />
          {url ? <meta property="og:url" content={url} /> : null}
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_SG" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={page.title} />
          <meta name="twitter:description" content={page.description} />
          <meta name="twitter:image" content={image} />
        </>
      ) : null}
    </>
  );
}
