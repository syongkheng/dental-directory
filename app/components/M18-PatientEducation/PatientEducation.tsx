// M18 Patient education: numbered steps, materials explanation, questions to ask.
import { Card } from "~/components/ui/Card";
import styles from "./PatientEducation.module.css";

export function Steps({ items }: { items: readonly { title: string; text: string }[] }) {
  return (
    <ol className={styles.steps}>
      {items.map((s, i) => (
        <li key={i}>
          <span className={styles.num} aria-hidden="true">
            {i + 1}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function QuestionsCard({ title, questions }: { title: string; questions: readonly string[] }) {
  return (
    <Card title={title}>
      <ul className={styles.ticks}>
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
    </Card>
  );
}
