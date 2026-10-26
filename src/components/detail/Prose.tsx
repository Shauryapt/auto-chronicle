import type { HistoryParagraph } from "@/data/types";
import type { Citations } from "@/lib/citations";
import { Cite } from "./Cite";

/** Editorial paragraphs, each closed by its reference markers. */
export function Prose({ paragraphs, citations }: { paragraphs: HistoryParagraph[]; citations: Citations }) {
  return (
    <div className="max-w-prose space-y-5 text-lede text-stone">
      {paragraphs.map((p) => (
        <p key={p.text}>
          {p.text}
          <Cite ids={p.sources} citations={citations} />
        </p>
      ))}
    </div>
  );
}
