import { COMPARE_GROUPS, powerUnit, rowApplies } from "@/lib/compare";
import type { CompareCar } from "@/lib/compare-data";
import type { Citations } from "@/lib/citations";
import { CarNameLink, CompareSection, FactEntries } from "./CompareParts";

type SpecComparisonProps = {
  cars: CompareCar[];
  citations: Citations;
};

/** Says when power figures are not like for like, rather than letting one look bigger than another. */
function powerNote(cars: CompareCar[]) {
  const units = new Set(cars.flatMap((car) => (car.rows.power ?? []).map((f) => powerUnit(f.value)).filter(Boolean)));
  const standards = new Set(cars.flatMap((car) => (car.rows.power ?? []).map((f) => f.label)));
  if (units.size <= 1 && standards.size <= 1) return null;
  return "Power is given as each source gives it, in different units or rating standards (such as PS, CV, SAE gross or kW), and is not converted. The figures are therefore not directly comparable.";
}

/**
 * Every recorded fact for the compared cars, grouped and lined up by row. Groups and rows appear only
 * when at least one car has a value; a car without one shows a dash, explained once in the note. There
 * are no scores or winners: the records mix units, versions and rating standards.
 */
export function SpecComparison({ cars, citations }: SpecComparisonProps) {
  const grid = cars.length >= 3 ? "md:grid-cols-[11rem_repeat(3,minmax(0,1fr))]" : cars.length === 2 ? "md:grid-cols-[11rem_repeat(2,minmax(0,1fr))]" : "md:grid-cols-[11rem_1fr]";
  const groups = COMPARE_GROUPS.map((group) => ({
    ...group,
    rows: group.rows.filter((row) => cars.some((car) => car.rows[row.id]?.length)),
  })).filter((group) => group.rows.length > 0);
  const note = powerNote(cars);

  return (
    <CompareSection
      id="specs-title"
      title="The numbers behind the machines"
      note="Only facts found in the cited sources. Where a value applies to particular versions, the version is named beneath it. A dash (—) means the sources do not establish the value; n/a means it does not apply to that car."
    >
      {/*
        Car names head the columns from tablet width up, in a slim strip that stays in view while the
        rows scroll past: maker in crimson, model name larger and heavier beneath it. On phones each
        value is labelled with its car instead.
      */}
      <div className={`sticky top-(--header-h) z-10 hidden gap-x-8 border-b border-line-strong bg-ink py-3 md:grid ${grid}`}>
        <span className="self-end text-label text-ash">Compared</span>
        {cars.map((car) => (
          <p key={car.slug} className="min-w-0">
            <span className="block text-label text-crimson-text">{car.maker}</span>
            <span className="mt-0.5 block text-base leading-snug font-medium text-ivory">
              <CarNameLink href={car.href}>{car.name}</CarNameLink>
            </span>
          </p>
        ))}
      </div>

      <div className="space-y-12 md:mt-6">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="font-display text-display-sm text-ivory">{group.title}</h3>
            {group.id === "powertrain" && note && <p className="mt-2 max-w-prose text-label text-ash">{note}</p>}
            <dl className="mt-4 border-t border-line">
              {group.rows.map((row) => (
                <div key={row.id} className={`grid gap-x-8 gap-y-3 border-b border-line py-4 ${grid}`}>
                  <dt className="text-label text-stone">{row.heading}</dt>
                  {cars.map((car) => (
                    <dd key={car.slug} className="min-w-0">
                      <span className="mb-1.5 block md:hidden">
                        <span className="text-label text-crimson-text">{car.maker}</span>{" "}
                        <span className="text-[0.9375rem] font-medium text-ivory">{car.name}</span>
                      </span>
                      <FactEntries
                        facts={car.rows[row.id]}
                        citations={citations}
                        notApplicable={rowApplies(row, car.categories) ? undefined : "Does not apply: not a battery-electric car"}
                      />
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </CompareSection>
  );
}
