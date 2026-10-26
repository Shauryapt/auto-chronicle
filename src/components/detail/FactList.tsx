import type { ReactNode } from "react";
import type { SourceId } from "@/data/sources";
import type { Citations } from "@/lib/citations";
import { Cite } from "./Cite";

export type FactItem = {
  label: string;
  value: ReactNode;
  sources?: readonly SourceId[];
};

/** A specification-style list. Only pass facts that have values; empty rows are never rendered. */
export function FactList({ items, citations }: { items: FactItem[]; citations?: Citations }) {
  return (
    <dl className="grid gap-x-8 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[minmax(7rem,2fr)_3fr] gap-4 border-b border-line py-3.5 first:border-t sm:nth-2:border-t">
          <dt className="pt-0.5 text-label text-ash">{item.label}</dt>
          <dd className="text-ivory">
            {item.value}
            {item.sources && citations && <Cite ids={item.sources} citations={citations} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
