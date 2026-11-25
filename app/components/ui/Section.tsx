// Section band: alternating paper / sand backgrounds, generous vertical space.
import type { ReactNode } from "react";
import styles from "./Section.module.css";

export function Section({
  id,
  tone = "paper",
  title,
  lead,
  children,
  className,
  titleId,
  narrow,
}: {
  id?: string;
  tone?: "paper" | "sand";
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleId?: string;
  narrow?: boolean;
}) {
  const headingId = titleId ?? (id ? `${id}-title` : undefined);
  return (
    <section
      id={id}
      className={[styles.section, tone === "sand" ? styles.sand : "", className].filter(Boolean).join(" ")}
      aria-labelledby={title || titleId ? headingId : undefined}
    >
      <div className={["container", narrow ? styles.narrow : ""].join(" ")}>
        {title ? (
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
        ) : null}
        {lead ? <p className={`lead ${styles.lead}`}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}

/** Two-column split (text + media). Collapses to one column on small screens. */
export function Split({ children, reverse }: { children: ReactNode; reverse?: boolean }) {
  return <div className={[styles.split, reverse ? styles.reverse : ""].join(" ")}>{children}</div>;
}
