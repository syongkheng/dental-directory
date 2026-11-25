import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { PrivacyNotice } from "~/components/M25-PrivacyNotice/PrivacyNotice";

export default function Privacy() {
  return (
    <>
      <Seo page={seo.privacy} path="/privacy" />
      <PrivacyNotice />
    </>
  );
}
