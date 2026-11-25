// M20 Lab photos: responsive grid. Real photos from PDCA's Google Business Profile (TBC).
// Development: placeholders. Production: real photos, or the whole section is removed.
import { about } from "~/content/pages/about";
import { PhotoSlot } from "~/components/Tbc/Tbc";
import styles from "./LabPhotos.module.css";

export function hasLabPhotos(): boolean {
  return about.photos.images.length > 0 || import.meta.env.DEV;
}

export function LabPhotos() {
  const { images, placeholders } = about.photos;
  if (images.length > 0) {
    return (
      <ul className={styles.grid} role="list">
        {images.map((img) => (
          <li key={img.src}>
            <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    );
  }
  if (!import.meta.env.DEV) return null;
  return (
    <ul className={styles.grid} role="list">
      {placeholders.map((p) => (
        <li key={p}>
          <PhotoSlot label={p} className={styles.slot} />
        </li>
      ))}
    </ul>
  );
}
