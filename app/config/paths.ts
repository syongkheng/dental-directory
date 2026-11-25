// Route lists for pre-rendering and the sitemap. Node-only (used by config and scripts).
import { isOn, nodeEnv, type NodeEnv } from "./node-env";

const CORE = ["/", "/services", "/dentists", "/patients", "/about", "/contact", "/privacy"] as const;

export interface RouteFlags {
  ourWork: boolean;
  careers: boolean;
}

export function routeFlags(env: NodeEnv = nodeEnv()): RouteFlags {
  return {
    ourWork: isOn(env.VITE_FEATURE_OUR_WORK),
    careers: isOn(env.VITE_FEATURE_CAREERS),
  };
}

/** Public routes allowed by feature flags (flagged pages are pre-rendered but not in the sitemap). */
export function publicPaths(flags: RouteFlags = routeFlags()): string[] {
  return [...CORE, ...(flags.ourWork ? ["/our-work"] : []), ...(flags.careers ? ["/careers"] : [])];
}

/** Everything written as its own HTML file: public routes plus the private /insights shell. */
export function prerenderPaths(flags: RouteFlags = routeFlags()): string[] {
  return [...publicPaths(flags), "/insights"];
}

/** Sitemap: the core public routes only. Flagged v1.1 pages and /insights are never listed. */
export function sitemapPaths(): string[] {
  return [...CORE];
}
