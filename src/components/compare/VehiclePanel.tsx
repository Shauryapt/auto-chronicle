import Image from "next/image";
import Link from "next/link";
import type { CompareCar } from "@/lib/compare-data";
import type { Citations } from "@/lib/citations";
import { StatusTag } from "@/components/ui/StatusTag";
import { CarNameLink, FactEntries, PhotoCredit } from "./CompareParts";

/** The three facts a panel leads with, by comparison row, when the record has them. */
export const PANEL_ROWS = [
  { id: "engine", heading: "Engine or motor" },
  { id: "power", heading: "Maximum power" },
  { id: "layout", heading: "Layout and drive" },
] as const;

type VehiclePanelProps = {
  car: CompareCar;
  slot: number;
  /** Two cars get wide photographs; three get a compact panel that stacks as a row on tablets. */
  density: "wide" | "compact";
  citations: Citations;
  canRemove: boolean;
  onReplace: () => void;
  onRemove: () => void;
};

const action =
  "inline-flex min-h-11 items-center justify-center rounded-xs border border-line-strong px-4 text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory";

export function VehiclePanel({ car, slot, density, citations, canRemove, onReplace, onRemove }: VehiclePanelProps) {
  const compact = density === "compact";
  const keyFacts = PANEL_ROWS.filter((row) => car.rows[row.id]?.length);

  return (
    <article
      data-slot={slot}
      aria-labelledby={`car-${slot}-title`}
      className={`flex flex-col ${compact ? "md:grid md:grid-cols-[1.1fr_1fr] md:gap-6 lg:flex lg:gap-0" : ""}`}
    >
      <div>
        <div className={`relative overflow-hidden bg-ink-high ${compact ? "aspect-4/3" : "aspect-3/2"}`}>
          <Image
            src={car.photo.src}
            alt={car.photo.alt}
            fill
            preload={slot < 2}
            placeholder="blur"
            sizes={compact ? "(min-width: 1024px) 30vw, (min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 46vw, 100vw"}
            className="photo-grade object-cover"
            style={{ objectPosition: car.photo.focus }}
          />
        </div>
        <PhotoCredit
          className="mt-2"
          depicts={car.photo.depicts}
          creator={car.photo.credit.creator}
          license={car.photo.credit.license}
          sourceUrl={car.photo.credit.sourceUrl}
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col md:mt-0 lg:mt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {car.makerHref ? (
            <Link href={car.makerHref} className="link-quiet text-label text-crimson-text">
              {car.maker}
            </Link>
          ) : (
            <span className="text-label text-crimson-text">{car.maker}</span>
          )}
          {!car.reviewed && <StatusTag>Facts not yet checked</StatusTag>}
        </div>
        <h3
          id={`car-${slot}-title`}
          tabIndex={-1}
          className={`mt-2 text-ivory focus:outline-none ${compact ? "text-display-sm" : "text-display-md"}`}
        >
          <CarNameLink href={car.href}>{car.name}</CarNameLink>
        </h3>

        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-label">
          {car.code && (
            <div>
              <dt className="text-ash">Model code</dt>
              <dd className="text-ivory">{car.code}</dd>
            </div>
          )}
          {car.span && (
            <div>
              <dt className="text-ash">{car.span.label}</dt>
              <dd className="text-ivory">{car.span.value}</dd>
            </div>
          )}
          <div>
            <dt className="text-ash">Type</dt>
            <dd className="text-ivory">{car.kind}</dd>
          </div>
        </dl>

        {keyFacts.length > 0 && (
          <dl className="mt-5 border-t border-line">
            {keyFacts.map((row) => (
              <div key={row.id} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3">
                <dt className="pt-0.5 text-label text-ash">{row.heading}</dt>
                <dd>
                  <FactEntries facts={car.rows[row.id]?.slice(0, 1)} citations={citations} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <button type="button" onClick={onReplace} aria-haspopup="dialog" className={action}>
            Replace<span className="sr-only"> the {car.title}</span>
          </button>
          {canRemove && (
            <button type="button" onClick={onRemove} className={action}>
              Remove<span className="sr-only"> the {car.title}</span>
            </button>
          )}
          <Link href={car.href} className="link-quiet ml-auto inline-flex min-h-11 items-center text-label text-ivory">
            Full entry<span className="sr-only"> for the {car.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
