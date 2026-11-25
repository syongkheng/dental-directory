// Flagged page (VITE_FEATURE_CAREERS). Not linked from navigation, not in the sitemap.
import { careers } from "~/content/pages/misc";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { CareersContent } from "~/components/M23-Careers/Careers";
import styles from "./pages.module.css";

export default function Careers() {
  return (
    <>
      <Seo page={seo.careers} path="/careers" />
      <div className={`container ${styles.pageHead}`}>
        <h1>{careers.title}</h1>
        <p className="lead">{careers.lead}</p>
      </div>
      <CareersContent />
    </>
  );
}
