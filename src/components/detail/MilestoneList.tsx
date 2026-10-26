import type { Milestone } from "@/data/types";
import type { Citations } from "@/lib/citations";
import { Cite } from "./Cite";

/** A dated timeline, drawn like the homepage eras: a hairline rule with crimson markers. */
export function MilestoneList({ milestones, citations }: { milestones: Milestone[]; citations: Citations }) {
  return (
    <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
      {milestones.map((m) => (
        <li key={`${m.year}-${m.text}`} className="relative grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-6">
          <span
            aria-hidden
            className="absolute top-2.5 -left-[calc(1.5rem+4.5px)] size-2 rotate-45 bg-crimson sm:-left-[calc(2rem+4.5px)]"
          />
          <p className="font-display text-display-sm leading-tight text-ivory italic">{m.year}</p>
          <p className="text-stone sm:pt-1.5">
            {m.text}
            <Cite ids={m.sources} citations={citations} />
          </p>
        </li>
      ))}
    </ol>
  );
}
