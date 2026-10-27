import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="page-container section-y">
      <div className="max-w-2xl border-t border-line pt-6">
        <p className="text-label text-crimson-text">Not in the archive</p>
        <h1 id="not-found-title" className="mt-4 text-display-lg text-ivory">
          This page isn’t in the archive
        </h1>
        <p className="mt-5 max-w-prose text-lede text-stone">
          The address may be mistyped, or the car or manufacturer may not have an entry yet. Search the archive
          or browse the manufacturer index instead.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/#search">Search the archive</ButtonLink>
          <ButtonLink href="/#manufacturers" variant="secondary">
            Browse manufacturers
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
