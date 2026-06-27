import { Section } from '../components/ui/Section'
import { Hero } from './home/Hero'
import { TrustStrip } from './home/TrustStrip'
import { StatsBar } from './home/StatsBar'
import { ServicesOverview } from './home/ServicesOverview'
import { ProcessSection } from './home/ProcessSection'
import { FacilityHighlight } from './home/FacilityHighlight'
import { FaqSection } from './home/FaqSection'
import { CtaBanner } from './home/CtaBanner'

export function Home() {
  return (
    <>
      <Section>
        <Hero />
      </Section>
      <TrustStrip />
      <Section tone="alt">
        <StatsBar />
      </Section>
      <Section>
        <ServicesOverview />
      </Section>
      <Section tone="alt">
        <ProcessSection />
      </Section>
      <Section>
        <FacilityHighlight />
      </Section>
      <Section tone="alt">
        <FaqSection />
      </Section>
      <Section>
        <CtaBanner />
      </Section>
    </>
  )
}
