import { dentistFaq } from "~/content/faq";
import { dentists } from "~/content/pages/dentists";
import { labels } from "~/content/pages/shared";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { Hero } from "~/components/M07-Hero/Hero";
import { Turnaround } from "~/components/M12-Turnaround/Turnaround";
import { SendACase } from "~/components/M13-SendACase/SendACase";
import { RxDownloadButton, rxFormAvailable } from "~/components/M14-RxDownload/RxDownload";
import { Terms } from "~/components/M15-Terms/Terms";
import { Faq } from "~/components/M16-Faq/Faq";
import { Actions, WhatsAppButton } from "~/components/ui/Button";
import { CopyCards } from "~/components/ui/Card";
import { Section } from "~/components/ui/Section";
import styles from "./pages.module.css";

export default function Dentists() {
  const d = dentists;
  const showRx = rxFormAvailable();
  return (
    <>
      <Seo page={seo.dentists} path="/dentists" />
      <Hero
        slim
        title={d.hero.title}
        lead={d.hero.lead}
        photo={d.hero.photo}
        actions={
          <Actions>
            <WhatsAppButton waKey="dentistCase" loc="hero">
              {labels.whatsappUs}
            </WhatsAppButton>
            <RxDownloadButton loc="hero" />
          </Actions>
        }
      />

      <Section id="send-a-case" tone="sand" title={d.sendCase.title}>
        <SendACase />
      </Section>

      <Section id="rx-and-turnaround" titleId={showRx ? "rx-title" : "turnaround-title"}>
        <div className={showRx ? styles.twoCol : undefined}>
          {showRx ? (
            <div>
              <h2 id="rx-title">{d.rx.title}</h2>
              <p className={styles.muted}>{d.rx.text}</p>
              <Actions>
                <RxDownloadButton loc="rx_section" />
              </Actions>
            </div>
          ) : null}
          <div>
            <h2 id="turnaround-title">{d.turnaround.title}</h2>
            <Turnaround compact />
          </div>
        </div>
      </Section>

      <Section id="terms" tone="sand" title={d.terms.title}>
        <Terms />
      </Section>

      <Section id="in-person" title={d.inPerson.title}>
        <CopyCards cards={d.inPerson.cards} loc="in_person" />
        <Actions>
          <WhatsAppButton waKey="visit" loc="visit">
            {labels.whatsappVisit}
          </WhatsAppButton>
        </Actions>
      </Section>

      <Section id="faq" tone="sand" title={d.faq.title}>
        <Faq items={dentistFaq} />
      </Section>
    </>
  );
}
