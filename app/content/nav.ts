// Header and footer navigation labels.
export const mainNav = [
  { to: "/services", label: "Services" },
  { to: "/dentists", label: "For Dentists" },
  { to: "/patients", label: "For Patients" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const ui = {
  skipLink: "Skip to content",
  menu: "Menu",
  closeMenu: "Close",
  mainNavLabel: "Main",
  whatsappHeader: "WhatsApp us",
  whatsappHeaderShort: "WhatsApp",
  whatsappFloat: "WhatsApp",
  whatsappFloatLabel: "Chat with PDCA on WhatsApp",
  footer: {
    pages: "Pages",
    contact: "Contact",
    follow: "Follow",
    legal: "Legal",
    privacy: "Privacy and cookies",
    cookieSettings: "Cookie settings",
  },
  cookie: {
    text: "We use cookies to count visits, only if you agree.",
    privacyLink: "Privacy notice",
    accept: "Accept",
    decline: "Decline",
    label: "Cookie choice",
    currentGranted: "You currently allow visit counting.",
    currentDenied: "You currently don't allow visit counting.",
  },
  opensInNewTab: "(opens in a new tab)",
} as const;
