import { patientFaq } from "~/content/faq";
import { patients } from "~/content/pages/patients";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { MapAndDirections } from "~/components/M04-MapAndDirections/MapAndDirections";
import { Hero } from "~/components/M07-Hero/Hero";
import { Faq } from "~/components/M16-Faq/Faq";
import { QuestionsCard, Steps } from "~/components/M18-PatientEducation/PatientEducation";
import { CopyBlock, PhotoSlot } from "~/components/Tbc/Tbc";
import { Actions, buttonClass } from "~/components/ui/Button";
import { Section, Split } from "~/components/ui/Section";
import styles from "./pages.module.css";

export default function Patients() {
  const p = patients;
  return (
    <>
      <Seo page={seo.patients} path="/patients" />
      <Hero
        slim
        title={p.hero.title}
        lead={p.hero.lead}
        photo={p.hero.photo}
        actions={
          <Actions>
            <a href="#how-it-works" className={buttonClass("secondary")}>
              {p.hero.howItWorks}
            </a>
            <a href="#find-us" className={buttonClass("secondary")}>
              {p.hero.findLab}
            </a>
          </Actions>
        }
      />

      <Section id="how-it-works" tone="sand" title={p.steps.title}>
        <Steps items={p.steps.items} />
      </Section>

      <Section id="materials" titleId="materials-title">
        <Split>
          <div>
            <h2 id="materials-title" className={styles.h2}>
              {p.materials.title}
            </h2>
            <p className="lead">{p.materials.lead}</p>
          </div>
          <QuestionsCard title={p.materials.questionsTitle} questions={p.materials.questions} />
        </Split>
      </Section>

      <Section id="shade-taking" tone="sand" titleId="shade-taking-title">
        <Split reverse>
          {import.meta.env.DEV ? <PhotoSlot label={p.shade.photo} /> : null}
          <div className={styles.stack}>
            <h2 id="shade-taking-title">{p.shade.title}</h2>
            <p className="lead">{p.shade.text}</p>
            <CopyBlock value={p.shade.booking} className={styles.muted} />
            <p className={styles.note}>{p.shade.note}</p>
          </div>
        </Split>
      </Section>

      <Section id="find-us" titleId="find-us-title">
        <MapAndDirections title={p.findUs.title} titleId="find-us-title" loc="patients_find_us" />
      </Section>

      <Section id="faq" tone="sand" title={p.faq.title}>
        <Faq items={patientFaq} />
      </Section>
    </>
  );
}
