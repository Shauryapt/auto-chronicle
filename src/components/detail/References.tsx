import type { ImageCredit, LogoCredit } from "@/data/types";
import type { Citations } from "@/lib/citations";
import { formatIsoDate } from "@/lib/format";

const KIND_LABEL = {
  manufacturer: "Manufacturer source",
  heritage: "Heritage archive",
  government: "Government data",
  reference: "General reference",
} as const;

type ReferencesProps = {
  citations: Citations;
  photoCredits: ImageCredit[];
  logoCredits: LogoCredit[];
};

/**
 * Factual sources first, numbered to match the markers in the text, then the licences for the
 * images shown on the page. The two are kept apart: one supports claims, the other permits use.
 */
export function References({ citations, photoCredits, logoCredits }: ReferencesProps) {
  return (
    <div className="space-y-10">
      {citations.list.length > 0 ? (
        <div>
          <h3 className="font-sans text-label font-medium text-stone">Sources for the facts on this page</h3>
          <ol className="mt-4 space-y-4">
            {citations.list.map((source, i) => (
              <li key={source.id} id={`ref-${i + 1}`} className="grid grid-cols-[2rem_1fr] gap-2 text-label">
                <span className="pt-px text-crimson-text tabular-nums">{i + 1}.</span>
                <div>
                  <p className="text-stone">
                    {source.publisher},{" "}
                    <a href={source.url} className="link-quiet text-ivory">
                      {source.title}
                    </a>
                    {source.language && <span className="text-ash"> (in {source.language})</span>}
                  </p>
                  <p className="mt-1 text-ash">
                    {KIND_LABEL[source.kind]}
                    {source.published && `. Published ${formatIsoDate(source.published)}`}. Accessed {formatIsoDate(source.accessed)}.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="max-w-prose text-stone">
          Nothing on this page needs a citation: its directory details are general descriptions, not sourced claims.
        </p>
      )}

      {(photoCredits.length > 0 || logoCredits.length > 0) && (
        <div>
          <h3 className="font-sans text-label font-medium text-stone">Image credits</h3>
          <ul className="mt-4 space-y-3 text-label">
            {photoCredits.map((credit) => (
              <li key={credit.id} className="text-ash">
                <a href={credit.sourceUrl} className="link-quiet text-ivory">
                  {credit.subject}
                </a>
                . Photograph by {credit.creator},{" "}
                <a href={credit.licenseUrl} className="link-quiet" rel="license">
                  {credit.license}
                </a>
                , resized and colour-graded.{credit.modifications && ` ${credit.modifications}`}
                {credit.attribution && ` ${credit.attribution}`}
              </li>
            ))}
            {logoCredits.map((credit) => (
              <li key={credit.id} className="text-ash">
                <a href={credit.sourceUrl} className="link-quiet text-ivory">
                  {credit.manufacturer} logo
                </a>
                .{" "}
                <a href={credit.licenseUrl} className="link-quiet" rel="license">
                  {credit.license}
                </a>
                , trademark of its owner, shown for identification only.
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
