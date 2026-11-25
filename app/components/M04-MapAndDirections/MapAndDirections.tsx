// M04 Map and directions: address, hours (TBC), Google / Apple / Waze links, click-to-load map.
// The Google embed loads only after "Show map" (performance, and no third-party cookies before the visitor asks).
import { useState } from "react";
import { mapCopy } from "~/content/pages/shared";
import { site } from "~/content/site";
import { mapLinks } from "~/lib/maps";
import { track } from "~/lib/track";
import { Pin } from "~/components/icons";
import { CopyBlock } from "~/components/Tbc/Tbc";
import { ButtonAnchor, buttonClass } from "~/components/ui/Button";
import { Split } from "~/components/ui/Section";
import styles from "./MapAndDirections.module.css";

export function MapAndDirections({ title, titleId, loc }: { title: string; titleId: string; loc: string }) {
  const [showMap, setShowMap] = useState(false);

  return (
    <Split>
      <div>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <address className={styles.address}>
          {site.address.line1}
          <br />
          {site.address.line2}
        </address>
        <CopyBlock value={mapCopy.hours} className={styles.hours} />
        <div className={styles.links} role="group" aria-label={mapCopy.directionsLabel}>
          <ButtonAnchor href={mapLinks.google} variant="secondary" app="google" loc={loc} newTab>
            {mapCopy.google}
          </ButtonAnchor>
          <ButtonAnchor href={mapLinks.apple} variant="secondary" app="apple" loc={loc} newTab>
            {mapCopy.apple}
          </ButtonAnchor>
          <ButtonAnchor href={mapLinks.waze} variant="secondary" app="waze" loc={loc} newTab>
            {mapCopy.waze}
          </ButtonAnchor>
        </div>
      </div>
      <div className={styles.map}>
        {showMap ? (
          <iframe
            className={styles.frame}
            src={mapLinks.embed}
            title={mapCopy.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className={styles.placeholder}>
            <Pin width={32} height={32} className={styles.pin} />
            <p>{mapCopy.mapPlaceholder}</p>
            <button
              type="button"
              className={buttonClass("primary")}
              onClick={() => {
                setShowMap(true);
                track("directions_click", { app: "embed", location: loc });
              }}
            >
              {mapCopy.showMap}
            </button>
          </div>
        )}
      </div>
    </Split>
  );
}
