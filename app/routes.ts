import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { routeFlags } from "./config/paths";

const flags = routeFlags();

export default [
  layout("routes/_site.tsx", [
    index("routes/home.tsx"),
    route("services", "routes/services.tsx"),
    route("dentists", "routes/dentists.tsx"),
    route("patients", "routes/patients.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("privacy", "routes/privacy.tsx"),
    ...(flags.ourWork ? [route("our-work", "routes/our-work.tsx")] : []),
    ...(flags.careers ? [route("careers", "routes/careers.tsx")] : []),
    route("*", "routes/not-found.tsx"),
  ]),
  route("insights", "routes/insights.tsx"), // private, own minimal layout
] satisfies RouteConfig;
