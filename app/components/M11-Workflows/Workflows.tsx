// M11 Workflows: conventional, digital, both.
import { Card, CardGrid, cardStyles } from "~/components/ui/Card";

export function Workflows({ items }: { items: readonly { title: string; text: string }[] }) {
  return (
    <CardGrid cols={3}>
      {items.map((w) => (
        <Card as="li" key={w.title} title={w.title}>
          <p className={cardStyles.text}>{w.text}</p>
        </Card>
      ))}
    </CardGrid>
  );
}
