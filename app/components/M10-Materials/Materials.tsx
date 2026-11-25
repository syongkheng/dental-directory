// M10 Materials: three brand cards (text only; no brand logos without PDCA's permission).
import { site } from "~/content/site";
import { Card, CardGrid } from "~/components/ui/Card";
import styles from "./Materials.module.css";

export function Materials() {
  return (
    <CardGrid cols={3}>
      {site.materials.map((m) => (
        <Card as="li" key={m.material} title={m.material}>
          <p className={styles.brand}>{m.brand}</p>
        </Card>
      ))}
    </CardGrid>
  );
}
