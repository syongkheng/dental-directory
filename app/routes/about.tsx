import { about } from "~/content/pages/about";
import { seo } from "~/content/seo";
import { Seo } from "~/components/M29-Seo/Seo";
import { Hero } from "~/components/M07-Hero/Hero";
import { VisitTheLab } from "~/components/M17-VisitTheLab/VisitTheLab";
import { Team } from "~/components/M19-Team/Team";
import { hasLabPhotos, LabPhotos } from "~/components/M20-LabPhotos/LabPhotos";
import { CareersTeaser } from "~/components/M23-Careers/Careers";
import { CopyBlock } from "~/components/Tbc/Tbc";
import { Card, CardGrid } from "~/components/ui/Card";
import { Section } from "~/components/ui/Section";

export default function About() {
  const a = about;
  return (
    <>
      <Seo page={seo.about} path="/about" />
      <Hero slim title={a.hero.title} lead={a.hero.lead} photo={a.hero.photo} after={<CopyBlock value={a.hero.more} />} />

      <Section id="values" tone="sand" title={a.values.title}>
        <CardGrid cols={4}>
          {a.values.items.map((v) => (
            <Card as="li" key={v} title={v} />
          ))}
        </CardGrid>
      </Section>

      <Section id="team" title={a.team.title}>
        <Team />
      </Section>

      {hasLabPhotos() ? (
        <Section id="lab-photos" tone="sand" title={a.photos.title}>
          <LabPhotos />
        </Section>
      ) : null}

      <VisitTheLab
        id="come-and-see-us"
        title={a.visit.title}
        lead={a.visit.lead}
        photo={a.visit.photo}
        tone={hasLabPhotos() ? "paper" : "sand"}
      />
      <CareersTeaser />
    </>
  );
}
