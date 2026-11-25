// M22 Case gallery (flagged page). Cases only with dentist and patient permission, credited to the dentist.
import { useState } from "react";
import { ourWork } from "~/content/pages/misc";
import { CopyBlock, PhotoSlot } from "~/components/Tbc/Tbc";
import { Card, CardGrid, cardStyles } from "~/components/ui/Card";
import styles from "./CaseGallery.module.css";

export function CaseGallery() {
  const [filter, setFilter] = useState(ourWork.filters[0]);
  const cases = ourWork.cases.filter((c) => filter === ourWork.filters[0] || c.category === filter);
  return (
    <>
      <div className={styles.chips} role="group" aria-label={ourWork.filterLabel}>
        {ourWork.filters.map((f) => (
          <button
            key={f}
            type="button"
            className={styles.chip}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {ourWork.cases.length === 0 ? (
        <>
          <CopyBlock value={ourWork.empty} />
          {import.meta.env.DEV ? (
            <CardGrid cols={3}>
              {[1, 2, 3].map((n) => (
                <Card as="li" key={n}>
                  <PhotoSlot label="before and after" />
                </Card>
              ))}
            </CardGrid>
          ) : null}
        </>
      ) : (
        <CardGrid cols={3}>
          {cases.map((c) => (
            <Card as="li" key={c.image.src}>
              <img
                className={styles.img}
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                loading="lazy"
                decoding="async"
              />
              <h3>{c.type}</h3>
              <p className={cardStyles.text}>{c.material}</p>
              <p className={styles.credit}>
                {ourWork.placedBy}{" "}
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.dentist}, {c.clinic}
                  </a>
                ) : (
                  `${c.dentist}, ${c.clinic}`
                )}
              </p>
            </Card>
          ))}
        </CardGrid>
      )}
    </>
  );
}
