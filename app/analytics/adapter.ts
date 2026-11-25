// M27 getAdapter(): chosen by VITE_ANALYTICS_SOURCE ("mock" default, or "qindom").
import { ANALYTICS_SOURCE } from "~/config/flags";
import type { AnalyticsAdapter } from "./adapter-types";
import { mockAdapter } from "./mock-adapter";
import { createQindomAdapter, viewerKey } from "./qindom-adapter";

export type { AnalyticsAdapter } from "./adapter-types";

export function getAdapter(search: URLSearchParams = new URLSearchParams()): AnalyticsAdapter {
  if (ANALYTICS_SOURCE === "qindom") return createQindomAdapter(viewerKey(search));
  return mockAdapter;
}
