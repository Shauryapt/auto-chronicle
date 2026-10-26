import type { SourceId } from "@/data/sources";
import type { Citations } from "@/lib/citations";

/** Superscript reference markers that jump to the matching entries in the page's reference list. */
export function Cite({ ids, citations }: { ids: readonly SourceId[]; citations: Citations }) {
  const numbers = [...new Set(ids.map(citations.numberOf))].sort((a, b) => a - b);
  if (numbers.length === 0) return null;

  return (
    <sup className="ml-0.5 font-sans text-[0.68em] leading-none font-medium tracking-normal not-italic">
      {numbers.map((n, i) => (
        <span key={n}>
          {i > 0 && <span className="text-ash">,</span>}
          <a
            href={`#ref-${n}`}
            aria-label={`Source ${n}`}
            className="px-px text-crimson-text no-underline hover:text-ivory hover:underline"
          >
            {n}
          </a>
        </span>
      ))}
    </sup>
  );
}
