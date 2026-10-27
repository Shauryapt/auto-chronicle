/*
 * The site's public address, for canonical URLs, the sitemap and robots.txt. Kept free of imports so
 * it can be tested on its own (`npm test`). No domain is ever assumed: until one is configured, the
 * features that need an absolute address stay off rather than point somewhere made up.
 */

/** The environment variables read here: SITE_URL, VERCEL_PROJECT_PRODUCTION_URL and VERCEL_ENV. */
type SiteEnv = Record<string, string | undefined>;

/** A bare HTTPS origin such as "https://example.org", or null for anything else. */
function httpsOrigin(value: string | undefined): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const bare = url.pathname === "/" && !url.search && !url.hash && !url.username && !url.password;
    return url.protocol === "https:" && bare ? new URL(url.origin) : null;
  } catch {
    return null;
  }
}

/**
 * The origin from `SITE_URL` when it is a bare HTTPS origin, otherwise the production domain Vercel
 * provides at build time (`VERCEL_PROJECT_PRODUCTION_URL`, a host name), otherwise null.
 */
export function siteOrigin(env: SiteEnv = process.env): URL | null {
  if (env.SITE_URL !== undefined) return httpsOrigin(env.SITE_URL);
  const host = env.VERCEL_PROJECT_PRODUCTION_URL;
  return host && /^[a-z0-9.-]+$/i.test(host) ? httpsOrigin(`https://${host}`) : null;
}

/** Whether this build is a Vercel preview, which search engines should not index. */
export function isPreviewBuild(env: SiteEnv = process.env): boolean {
  return env.VERCEL_ENV === "preview";
}

/**
 * `alternates` metadata giving a page's canonical path, or nothing when no address is configured.
 * Relative paths resolve against `metadataBase`, which the root layout sets from the same origin.
 */
export function canonical(path: string, env: SiteEnv = process.env): { canonical: string } | undefined {
  return siteOrigin(env) ? { canonical: path } : undefined;
}
