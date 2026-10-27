import Image from "next/image";
import type { CompareCar, ComparePhoto } from "@/lib/compare-data";
import type { Citations } from "@/lib/citations";
import { CarNameLink, CompareSection, FactEntries, PhotoCredit, columns } from "./CompareParts";

type ComponentSectionsProps = {
  cars: CompareCar[];
  citations: Citations;
};

const POWERTRAIN_ROWS = [
  { id: "engine", heading: "Engine or motor" },
  { id: "power", heading: "Maximum power" },
  { id: "transmission", heading: "Transmission" },
  { id: "layout", heading: "Layout and drive" },
];

function photosOf(car: CompareCar, role: ComparePhoto["role"]) {
  return car.gallery.filter((p) => p.role === role);
}

/** Exterior views not otherwise shown on this page, best first: a rear view complements the panel's lead photograph. */
const EXTERIOR_ROLES: ComparePhoto["role"][] = ["rear", "side", "front", "exterior", "archival"];

/**
 * The engine room's photograph for a car: its engine, or failing that a photograph of the car itself
 * that the page does not already show, so the column keeps its picture instead of collapsing to a
 * line. Its caption names exactly what it shows, so it is never passed off as an engine.
 */
export function enginePanelPhoto(car: CompareCar): ComparePhoto | undefined {
  return photosOf(car, "engine")[0] ?? EXTERIOR_ROLES.flatMap((role) => photosOf(car, role))[0];
}

/** A second unused exterior view, for a column whose recorded facts run much shorter than its neighbours'. */
function secondExterior(car: CompareCar): ComparePhoto | undefined {
  const first = enginePanelPhoto(car);
  return EXTERIOR_ROLES.flatMap((role) => photosOf(car, role)).find((p) => p !== first);
}

/**
 * Roughly how tall a car's engine-room facts run, in fact lines: each value, plus a little for the
 * version noted beneath it and for each row. Enough to tell a short list from a long one.
 */
function factWeight(car: CompareCar) {
  return POWERTRAIN_ROWS.reduce((sum, row) => {
    const facts = car.rows[row.id] ?? [];
    return sum + (facts.length ? 0.4 : 0) + facts.reduce((n, f) => n + 1 + (f.scope ? 0.4 : 0), 0);
  }, 0);
}

/**
 * For each car, the photograph that fills out its engine-room column when its facts run at least two
 * lines shorter than the longest, so the columns end together instead of leaving a dark gap.
 */
export function engineFillPhotos(cars: CompareCar[]): (ComparePhoto | undefined)[] {
  const weights = cars.map(factWeight);
  const longest = Math.max(...weights);
  return cars.map((car, i) => (cars.length > 1 && longest - weights[i] >= 2 ? secondExterior(car) : undefined));
}

/** The gallery photographs these sections show for a car, so the page credits exactly what it shows. */
export function shownComponentPhotos(car: CompareCar, fill?: ComparePhoto): ComparePhoto[] {
  return [enginePanelPhoto(car), fill, photosOf(car, "interior")[0], ...photosOf(car, "detail")].filter((p): p is ComparePhoto => Boolean(p));
}

function ComponentPhoto({ photo, sizes, aspect = "aspect-4/3" }: { photo: ComparePhoto; sizes: string; aspect?: string }) {
  return (
    <figure>
      <div className={`relative overflow-hidden bg-ink-high ${aspect}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className="photo-grade object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      <figcaption>
        <PhotoCredit className="mt-2" depicts={photo.depicts} creator={photo.credit.creator} license={photo.credit.license} sourceUrl={photo.credit.sourceUrl} />
      </figcaption>
    </figure>
  );
}

/**
 * A photograph that grows into the space left at the foot of a shorter column, cropped as a wide
 * band from a sensible minimum height. On phones, where the columns stack and there is no gap,
 * it is an ordinary 3:2 photograph in the flow.
 */
function FillPhoto({ photo, sizes }: { photo: ComparePhoto; sizes: string }) {
  return (
    <figure className="mt-8 flex flex-col md:min-h-56 md:flex-1">
      <div className="relative aspect-3/2 overflow-hidden bg-ink-high md:aspect-auto md:min-h-44 md:flex-1">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className="photo-grade object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      <figcaption>
        <PhotoCredit className="mt-2" depicts={photo.depicts} creator={photo.credit.creator} license={photo.credit.license} sourceUrl={photo.credit.sourceUrl} />
      </figcaption>
    </figure>
  );
}

/** Said in place of a photograph the archive does not have; nothing unrelated stands in for it. */
function NoPhoto({ what }: { what: string }) {
  return <p className="border-y border-line py-4 text-label text-ash">The archive has no photograph of this car’s {what}.</p>;
}

/**
 * Component photography beside the facts it illustrates. Each section appears only when at least
 * one compared car has a photograph for it, and a car without one says so rather than borrowing an
 * image. Captions give the exact car photographed, which may be a different version from the one
 * the facts describe; the caption is what to trust.
 */
export function ComponentSections({ cars, citations }: ComponentSectionsProps) {
  const sizes = cars.length >= 3 ? "(min-width: 768px) 30vw, 100vw" : "(min-width: 768px) 46vw, 100vw";
  const engines = cars.map((car) => photosOf(car, "engine")[0]);
  const enginePanels = cars.map(enginePanelPhoto);
  const engineFills = engineFillPhotos(cars);
  const cockpits = cars.map((car) => photosOf(car, "interior")[0]);
  const details = cars.flatMap((car) => photosOf(car, "detail").map((photo) => ({ car, photo })));

  return (
    <>
      {(engines.some(Boolean) || cars.some((c) => c.rows.engine)) && (
        <CompareSection
          id="engine-title"
          title="The engine room"
          note="What drives each car, as its sources record it, beside a photograph of the engine where the archive has one, and of the car itself where it does not."
        >
          <div className={`grid gap-x-8 gap-y-12 ${columns(cars.length)}`}>
            {cars.map((car, i) => (
              <article key={car.slug} aria-label={car.title} className="flex flex-col">
                {enginePanels[i] ? <ComponentPhoto photo={enginePanels[i]} sizes={sizes} /> : <NoPhoto what="engine" />}
                <p className="mt-5 text-label text-crimson-text">
                  <CarNameLink href={car.href}>{car.title}</CarNameLink>
                </p>
                {/* Only the facts the car has; the full side-by-side rows, gaps included, are in the specifications below. */}
                {POWERTRAIN_ROWS.some((row) => car.rows[row.id]?.length) ? (
                  <dl className="mt-3 border-t border-line">
                    {POWERTRAIN_ROWS.filter((row) => car.rows[row.id]?.length).map((row) => (
                      <div key={row.id} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3">
                        <dt className="pt-0.5 text-label text-ash">{row.heading}</dt>
                        <dd>
                          <FactEntries facts={car.rows[row.id]} citations={citations} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-3 border-y border-line py-3 text-label text-ash">No powertrain facts are recorded for this car yet.</p>
                )}
                {engineFills[i] && <FillPhoto photo={engineFills[i]} sizes={sizes} />}
              </article>
            ))}
          </div>
        </CompareSection>
      )}

      {cockpits.some(Boolean) && (
        <CompareSection
          id="cockpit-title"
          title="From the driver’s seat"
          note="Dashboards and controls, photographed in surviving cars. The caption names the exact car and year."
        >
          <div className={`grid gap-x-8 gap-y-10 ${columns(cars.length)}`}>
            {cars.map((car, i) => (
              <article key={car.slug} aria-label={car.title}>
                {cockpits[i] ? <ComponentPhoto photo={cockpits[i]} sizes={sizes} /> : <NoPhoto what="cockpit" />}
                <p className="mt-4 text-label text-crimson-text">
                  <CarNameLink href={car.href}>{car.title}</CarNameLink>
                </p>
              </article>
            ))}
          </div>
        </CompareSection>
      )}

      {details.length > 0 && (
        <CompareSection id="details-title" title="Details" note="Close-ups the archive holds for these cars.">
          {details.length === 1 ? (
            // A single close-up sits beside its caption rather than leaving half a row empty.
            <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-7">
                <ComponentPhoto photo={details[0].photo} aspect="aspect-video" sizes="(min-width: 768px) 55vw, 100vw" />
              </div>
              <div className="md:col-span-5">
                <p className="text-label text-crimson-text">
                  <CarNameLink href={details[0].car.href}>{details[0].car.title}</CarNameLink>
                </p>
                <p className="mt-2 font-display text-display-sm text-ivory">{details[0].photo.depicts}</p>
              </div>
            </div>
          ) : (
            <ul className={`grid gap-x-8 gap-y-10 ${details.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {details.map(({ car, photo }) => (
                <li key={photo.id}>
                  <ComponentPhoto photo={photo} sizes={sizes} />
                  <p className="mt-3 text-label text-crimson-text">
                    <CarNameLink href={car.href}>{car.title}</CarNameLink>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CompareSection>
      )}
    </>
  );
}
