import type { VehicleVersion } from "@/data/types";
import type { Citations } from "@/lib/citations";
import { Cite } from "./Cite";

/** Generations, series phases or variants of one vehicle record, in the order given by the data. */
export function VersionList({ versions, citations }: { versions: VehicleVersion[]; citations: Citations }) {
  return (
    <ol className="grid border-t border-l border-line sm:grid-cols-2">
      {versions.map((v) => (
        <li key={v.name} className="flex flex-col border-r border-b border-line p-5 sm:p-6">
          {v.period && <p className="font-display text-display-sm leading-tight text-crimson-text italic">{v.period}</p>}
          <h3 className="mt-2 text-display-sm text-ivory">{v.name}</h3>
          <p className="mt-3 text-stone">
            {v.description}
            <Cite ids={v.sources} citations={citations} />
          </p>
        </li>
      ))}
    </ol>
  );
}
