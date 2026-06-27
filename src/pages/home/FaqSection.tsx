import { Analytics } from '../../analytics/events'
import './FaqSection.css'

const FAQS = [
  {
    q: 'What is your standard turnaround time?',
    a: 'Crowns and bridges are typically returned within 5–7 working days. Veneers and implant-supported restorations are usually 7–14 working days. Rush timelines can be arranged — WhatsApp us to discuss.',
  },
  {
    q: 'How does my clinic submit a case?',
    a: "Send impressions or digital scan files (STL) to our facility along with your case notes and shade reference. For first submissions or urgent cases, WhatsApp us first and we'll walk you through the process.",
  },
  {
    q: "What if a restoration doesn't fit at try-in?",
    a: 'We remake at no charge if fit or shade deviates from the submitted specification. Our PDCA quality cycle means remakes are rare, and every chair-side observation feeds back into the next case.',
  },
  {
    q: 'Is all work produced in Singapore?',
    a: 'Yes — every restoration is fabricated entirely in our Singapore facility. Your cases never leave the country. We believe local production and direct consultation lead to better outcomes.',
  },
  {
    q: 'Do you work with solo practitioners as well as group clinics?',
    a: 'Yes. We work with dental clinics of all sizes across Singapore, from solo practitioners to multi-chair group practices. All billing is directly to the clinic.',
  },
]

export function FaqSection() {
  function handleToggle(question: string, open: boolean) {
    Analytics.faqToggle(question, open ? 'open' : 'close')
  }

  return (
    <div>
      <div className="section-heading">
        <h2>Frequently asked questions</h2>
        <p>Common questions from dental clinics considering PDCA as their lab partner.</p>
        <div className="section-heading-rule" aria-hidden="true" />
      </div>
      <div className="faq-list">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="faq-item"
            onToggle={(e) => handleToggle(item.q, (e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary className="faq-question">{item.q}</summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
