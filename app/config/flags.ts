// Feature flags and env-driven settings for code that runs in the browser / pre-render.
const env = import.meta.env;
const on = (v: string | undefined) => v === "true" || v === "1";

export const flags = {
  ourWork: on(env.VITE_FEATURE_OUR_WORK),
  careers: on(env.VITE_FEATURE_CAREERS),
  testimonials: on(env.VITE_FEATURE_TESTIMONIALS),
  enquiryForm: Boolean(env.VITE_ENQUIRY_ENDPOINT),
  rxForm: import.meta.env.DEV || __RX_FORM_AVAILABLE__,
} as const;

export const SITE_URL = (env.VITE_SITE_URL || "https://pdcadental.com").replace(/\/+$/, "");
export const ANALYTICS_ENDPOINT = (env.VITE_ANALYTICS_ENDPOINT || "").replace(/\/+$/, "");
export const ENQUIRY_ENDPOINT = env.VITE_ENQUIRY_ENDPOINT || "";
export const ANALYTICS_SOURCE = env.VITE_ANALYTICS_SOURCE === "qindom" ? "qindom" : "mock";
