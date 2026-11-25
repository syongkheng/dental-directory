// M29 LocalBusiness structured data on every public page.
import { SITE_URL } from "~/config/flags";
import { site, socialLinks } from "~/content/site";
import { isTbc } from "~/lib/tbc";

export function localBusiness() {
  const sameAs = socialLinks().map((s) => s.url);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    alternateName: site.shortName,
    url: `${SITE_URL}/`,
    telephone: site.phone.international,
    email: site.email.address,
    foundingDate: site.foundedIso,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    ...(sameAs.length ? { sameAs } : {}),
    // openingHours omitted until PDCA confirms them.
    ...(!isTbc(site.openingHours) ? { openingHours: site.openingHours } : {}),
  };
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Static, trusted content; "<" escaped so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness()).replace(/</g, "\\u003c") }}
    />
  );
}
