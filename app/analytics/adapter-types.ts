// M27 Adapter interface. The dashboard only ever calls getAdapter().runReport(buildRequest(period)).
import type { AnalyticsRequest, AnalyticsResponse, AnalyticsSource } from "./contract";

export interface AnalyticsAdapter {
  readonly source: AnalyticsSource;
  runReport(request: AnalyticsRequest): Promise<AnalyticsResponse>;
}
