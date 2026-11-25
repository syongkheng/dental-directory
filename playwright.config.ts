import { defineConfig, devices } from "@playwright/test";

// E2E runs against the static production build served by `npm run preview`.
// The analytics and enquiry endpoints point at fake hosts that the tests intercept with page.route().
export const ANALYTICS_HOST = "https://analytics.e2e.test";
export const ENQUIRY_URL = "https://forms.e2e.test/pdca/enquiry";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4173",
    serviceWorkers: "block",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    timeout: 240_000,
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_SITE_URL: "https://pdcadental.com",
      VITE_ANALYTICS_ENDPOINT: ANALYTICS_HOST,
      VITE_ENQUIRY_ENDPOINT: ENQUIRY_URL,
      VITE_ANALYTICS_SOURCE: "mock",
      VITE_FEATURE_OUR_WORK: "false",
      VITE_FEATURE_CAREERS: "false",
      VITE_FEATURE_TESTIMONIALS: "false",
    },
  },
});
