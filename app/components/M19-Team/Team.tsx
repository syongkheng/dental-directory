// M19 Team and credentials: founder and technicians cards; photo optional.
import { about } from "~/content/pages/about";
import { CopyBlock, PhotoSlot } from "~/components/Tbc/Tbc";
import { Card, CardGrid, cardStyles } from "~/components/ui/Card";
import styles from "./Team.module.css";

export function Team() {
  const { founder, technicians } = about.team;
  return (
    <CardGrid cols={2}>
      <Card as="li" className={import.meta.env.DEV ? styles.person : undefined}>
        <PhotoSlot label={founder.photo} className={styles.photo} />
        <div className={styles.body}>
          <h3>{founder.title}</h3>
          <p className={cardStyles.text}>{founder.text}</p>
          <CopyBlock value={founder.bio} className={cardStyles.text} />
        </div>
      </Card>
      <Card as="li" title={technicians.title}>
        <p className={cardStyles.text}>{technicians.text}</p>
        <CopyBlock value={technicians.bio} className={cardStyles.text} />
      </Card>
    </CardGrid>
  );
}
