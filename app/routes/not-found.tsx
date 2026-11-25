import { Link } from "react-router";
import { notFound } from "~/content/pages/misc";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { buttonClass } from "~/components/ui/Button";
import styles from "./pages.module.css";

export default function NotFound() {
  return (
    <>
      <Seo page={seo.notFound} noindex />
      <div className={`container ${styles.notFound}`}>
        <h1>{notFound.title}</h1>
        <p className="lead">{notFound.lead}</p>
        <ul role="list">
          {notFound.links.map((l, i) => (
            <li key={l.to}>
              <Link to={l.to} className={buttonClass(i === 0 ? "primary" : "secondary")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
