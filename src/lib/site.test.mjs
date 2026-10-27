// The site's public address. Run with `npm test`.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isPreviewBuild, siteOrigin } from "./site.ts";

describe("site origin", () => {
  it("is null until an address is configured", () => {
    assert.equal(siteOrigin({}), null);
  });

  it("accepts a bare HTTPS origin from SITE_URL, with or without a trailing slash", () => {
    assert.equal(siteOrigin({ SITE_URL: "https://autochronicle.example" })?.href, "https://autochronicle.example/");
    assert.equal(siteOrigin({ SITE_URL: "https://autochronicle.example/" })?.href, "https://autochronicle.example/");
  });

  it("rejects anything that is not a bare HTTPS origin", () => {
    for (const bad of ["http://autochronicle.example", "https://autochronicle.example/cars", "https://autochronicle.example/?q=1", "https://user:pass@autochronicle.example", "javascript:alert(1)", "not a url", ""]) {
      assert.equal(siteOrigin({ SITE_URL: bad }), null, bad);
    }
  });

  it("falls back to the production domain Vercel provides, but never overrides a set SITE_URL", () => {
    assert.equal(siteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "auto-chronicle.vercel.app" })?.href, "https://auto-chronicle.vercel.app/");
    assert.equal(siteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "evil.example/path" }), null);
    assert.equal(siteOrigin({ SITE_URL: "http://bad.example", VERCEL_PROJECT_PRODUCTION_URL: "auto-chronicle.vercel.app" }), null, "an invalid SITE_URL is an error to fix, not a reason to guess");
  });

  it("recognises Vercel preview builds", () => {
    assert.equal(isPreviewBuild({ VERCEL_ENV: "preview" }), true);
    assert.equal(isPreviewBuild({ VERCEL_ENV: "production" }), false);
    assert.equal(isPreviewBuild({}), false);
  });
});
