// Privacy and cookies page copy (M25). Draft wording for PDCA to approve; not legal advice.
// Keep this in step with what the code actually collects:
//   - app/lib/track.ts (the payload sent to qindom POST /analytics/collect)
//   - app/lib/consent.ts (the consent choice in browser storage)
//   - qindom Analytics.controller.ts, which also stores the request's IP address and user agent.
import { tbc, type Copy } from "~/lib/tbc";

export interface PrivacySection {
  title: string;
  /** Paragraphs shown before the list. */
  text: Copy[];
  list?: string[];
  /** Paragraphs shown after the list. */
  after?: Copy[];
}

export const privacy = {
  title: "Privacy and cookies",
  draftNote: "Draft wording for PDCA to approve. Not legal advice.",
  sections: [
    {
      // Departure from the wireframe: analytics are counted by PDCA's own analytics service
      // (qindom), not Google Analytics. See README "Decisions".
      title: "What we collect when you browse",
      text: [
        "Nothing, unless you tap Accept on the cookie banner. If you decline, or don't choose, no visit is recorded.",
        "If you accept, each time you open a page or tap a contact button, our own analytics service records:",
      ],
      list: [
        "your IP address",
        "a random visitor ID and a random session ID, created in your browser (they don't contain your name or contact details)",
        "the page you opened, or the button you tapped (WhatsApp, call, email, directions, Rx form download or sending the form)",
        "the website that sent you here, if any",
        "your screen size and browser type",
        "the date and time",
      ],
      after: [
        "We use this only to count visits and contact taps. We don't use it to identify you, we don't build a profile of you, and we don't sell it or share it with advertisers. No Google Analytics, Facebook or other third-party tracking runs on this site.",
        tbc("How long analytics records are kept"),
      ],
    },
    {
      title: "What we collect when you contact us",
      text: [
        "If you contact us by WhatsApp, phone, email or the form, we receive the details you send, such as your name, clinic, phone number, email address and message. We use them only to reply to you. Messages sent through the form are emailed to us and are not stored on the website's servers.",
      ],
    },
    {
      title: "Cookies and browser storage",
      text: ["This site doesn't set cookies. It keeps up to three small items in your browser's storage:"],
      list: [
        "your Accept or Decline choice, so we don't ask again (kept whichever you choose)",
        "the random visitor ID (only after you accept, and removed if you later decline)",
        "the random session ID (only after you accept; cleared when you close the tab)",
      ],
    },
  ] satisfies PrivacySection[],
  choices: {
    title: "Your choices",
    text: "You can change your choice at any time. If you switch to Decline, recording stops straight away and the visitor and session IDs are removed from your browser.",
  },
  dpo: {
    title: "Data Protection Officer",
    text: tbc("DPO name and business contact", "Contact admin@pdcadental.com."),
  },
};
