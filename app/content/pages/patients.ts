// For Patients page copy (education only; patients reach PDCA through their dentist).
import { tbc } from "~/lib/tbc";

export const patients = {
  hero: {
    title: "Who makes your crown?",
    lead: "When your dentist takes an impression or a scan, a dental lab makes your crown, bridge or veneer. Here is what happens, and what you can ask.",
    howItWorks: "How it works",
    findLab: "Find our lab",
    photo: "from impression to crown",
  },
  steps: {
    title: "What a dental lab does",
    items: [
      { title: "Your dentist", text: "prepares the tooth and takes an impression or a digital scan." },
      { title: "The lab", text: "Our technicians design and make your restoration to your dentist's prescription." },
      { title: "Your dentist", text: "fits it and checks your bite." },
    ],
  },
  materials: {
    title: "Why materials matter",
    lead: "We use authentic materials from reputable brands: Amann Girrbach zirconia, Ivoclar IPS e.max and VITA porcelain. You can trust what goes into your mouth.",
    questionsTitle: "Questions you can ask your dentist",
    questions: [
      "Which lab makes my restoration?",
      "What material is it made from, and which brand?",
      "Should I visit the lab for shade taking?",
    ],
  },
  shade: {
    title: "Shade taking at our lab",
    text: "If your dentist advises it, you can visit us so our technicians match the colour of your teeth in person.",
    booking: tbc("How patients book: through the clinic or by WhatsApp", "Your dentist's clinic will arrange the visit with us."),
    note: "We don't treat patients or take orders directly. Your dentist is always your first contact.",
    photo: "shade-taking area",
  },
  findUs: {
    title: "Find us",
  },
  faq: {
    title: "Questions patients ask",
  },
};
