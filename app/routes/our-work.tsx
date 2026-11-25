// Flagged page (VITE_FEATURE_OUR_WORK). Not linked, not in the sitemap.
import { ourWork } from "~/content/pages/misc";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { CaseGallery } from "~/components/M22-CaseGallery/CaseGallery";
import styles from "./pages.module.css";

export default function OurWork() {
  return (
    <>
      <Seo page={seo.ourWork} path="/our-work" />
      <div className={`container ${styles.pageHead}`}>
        <h1>{ourWork.title}</h1>
        <p className="lead">{ourWork.lead}</p>
      </div>
      <div className="container" style={{ paddingBottom: "var(--space-section)" }}>
        <CaseGallery />
      </div>
    </>
  );
}
