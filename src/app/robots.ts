import type { MetadataRoute } from "next";
import { isPreviewBuild, siteOrigin } from "@/lib/site";

/** Open to all crawlers in production; preview builds ask not to be indexed. The sitemap is listed once an address is set. */
export default function robots(): MetadataRoute.Robots {
  if (isPreviewBuild()) return { rules: { userAgent: "*", disallow: "/" } };
  const origin = siteOrigin();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(origin && { sitemap: new URL("/sitemap.xml", origin).href }),
  };
}
