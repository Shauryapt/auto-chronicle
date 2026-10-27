import Link from "next/link";
import type { ReactNode } from "react";
import { labelAddsContext, type CompareFact } from "@/lib/compare";
import type { Citations } from "@/lib/citations";
import { Cite } from "@/components/detail/Cite";

type CompareSectionProps = {
  id: string;
  title: string;
  note?: ReactNode;
  children: ReactNode;
};

/** A section of the comparison: heading and note on a hairline, then content across the full width for the columns. */
export function CompareSection({ id, title, note, children }: CompareSectionProps) {
  return (
    <section aria-labelledby={id} className="page-container mt-[clamp(3.5rem,7vw,6rem)]">
      <div className="grid gap-4 border-t border-line pt-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id={id} className="text-display-md text-ivory lg:col-span-5">
          {title}
        </h2>
        {note && <div className="max-w-prose text-stone lg:col-span-7 lg:justify-self-end">{note}</div>}
      </div>
      <div className="mt-(--heading-gap)">{children}</div>
    </section>
  );
}

type FactEntriesProps = {
  facts: CompareFact[] | undefined;
  citations: Citations;
  /** Set when the row cannot apply to this car, with the reason read to screen readers. */
  notApplicable?: string;
};

/**
 * A comparison cell: each recorded value with its sources, and the label and scope it was recorded
 * under where they say more than the row heading, so a value is never read out of its context.
 */
export function FactEntries({ facts, citations, notApplicable }: FactEntriesProps) {
  if ((!facts || facts.length === 0) && notApplicable) {
    return (
      <p className="text-label text-ash" title={notApplicable}>
        <span aria-hidden="true">n/a</span>
        <span className="sr-only">{notApplicable}</span>
      </p>
    );
  }
  if (!facts || facts.length === 0) {
    // A quiet dash rather than a sentence in every cell; the section note explains it, the tooltip
    // repeats it for a pointer, and screen readers hear the words. It never stands for zero.
    return (
      <p className="text-ash" title={MISSING_LABEL}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">{MISSING_LABEL}</span>
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {facts.map((fact, i) => {
        const context = [labelAddsContext(fact.label) ? fact.label : null, fact.scope].filter(Boolean).join(". ");
        return (
          <li key={`${fact.label}-${i}`}>
            <p className="text-ivory">
              {fact.value}
              <Cite ids={fact.sources} citations={citations} />
            </p>
            {context && <p className="mt-0.5 text-label text-ash">{context}</p>}
          </li>
        );
      })}
    </ul>
  );
}

/** What a dash in a comparison cell means. */
export const MISSING_LABEL = "Not established in the available sources";

/**
 * A car's name as a link to its own page, by its slug. It keeps the look of the text around it and
 * shows a fine crimson underline on hover; keyboard focus gets the site's focus ring.
 */
export function CarNameLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="decoration-crimson decoration-1 underline-offset-[0.2em] transition-colors duration-(--dur-fast) hover:underline"
    >
      {children}
    </Link>
  );
}

/** Credit line for a photograph shown on the page; the full licence is listed under References. */
export function PhotoCredit({ depicts, creator, license, sourceUrl, className = "" }: { depicts: string; creator: string; license: string; sourceUrl: string; className?: string }) {
  return (
    <p className={`text-label text-ash ${className}`}>
      {depicts}. Photograph by{" "}
      <a href={sourceUrl} className="link-quiet">
        {creator}
      </a>
      , {license}.
    </p>
  );
}

/** Column classes for one, two or three cars side by side from tablet width up. */
export function columns(count: number) {
  return count >= 3 ? "md:grid-cols-3" : count === 2 ? "md:grid-cols-2" : "";
}
