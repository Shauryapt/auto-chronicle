import { cacheLife } from "next/cache";

/**
 * Cache Components treats `new Date()` as request-time data, so the year is cached
 * and refreshed daily rather than making the whole page dynamic.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
