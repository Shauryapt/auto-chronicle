import type { MetadataRoute } from "next";
import { manufacturers } from "@/data/manufacturers";
import { vehicles } from "@/data/vehicles";
import { siteOrigin } from "@/lib/site";

/**
 * Every public page once, at its canonical address: comparisons appear only as the bare /compare page,
 * never as ?cars= combinations. Empty until the site's address is configured, since a sitemap needs
 * absolute URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  const paths = ["/", "/compare", ...vehicles.map((v) => `/cars/${v.slug}`), ...manufacturers.map((m) => `/manufacturers/${m.slug}`)];
  return paths.map((path) => ({ url: new URL(path, origin).href }));
}
