"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { carsHref, COMPARE_GROUPS, MAX_COMPARED, parseCarsParam, type ParsedSelection } from "@/lib/compare";
import type { CompareCar } from "@/lib/compare-data";
import { createCitations } from "@/lib/citations";
import type { SearchEntry } from "@/lib/search-match";
import { References } from "@/components/detail/References";
import { ComponentSections, engineFillPhotos, shownComponentPhotos } from "./ComponentSections";
import { CompareSection } from "./CompareParts";
import { SpecComparison } from "./SpecComparison";
import { PANEL_ROWS, VehiclePanel } from "./VehiclePanel";
import { VehiclePicker } from "./VehiclePicker";
import { WalkAround } from "./WalkAround";

type CompareProps = {
  cars: CompareCar[];
  index: SearchEntry[];
  defaults: string[];
};

/** Reads the selection from `?cars=`, so a shared link, a reload and back/forward all show the same cars. */
export function CompareFromUrl(props: CompareProps) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("cars");
  const known = useMemo(() => new Set(props.cars.map((c) => c.slug)), [props.cars]);
  const selection = useMemo(() => parseCarsParam(raw, known, props.defaults), [raw, known, props.defaults]);
  return <CompareView {...props} selection={selection} />;
}

type Picking = { mode: "replace"; slot: number } | { mode: "add" };

function introducedApart(cars: CompareCar[]) {
  const years = cars.map((c) => c.introduced);
  if (cars.length < 2 || years.some((y) => y === null)) return null;
  const known = years as number[];
  const span = Math.max(...known) - Math.min(...known);
  if (span === 0) return `introduced in the same year, ${known[0]}`;
  return cars.length === 2 ? `introduced ${span} years apart` : `introduced across ${span} years, from ${Math.min(...known)} to ${Math.max(...known)}`;
}

function listNames(cars: CompareCar[]) {
  const names = cars.map((c) => `the ${c.title}`);
  return names.length <= 2 ? names.join(" and ") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/**
 * The comparison itself. The selection lives in the address (`?cars=a,b,c`): every change is a new
 * history entry made with the native History API, which Next.js keeps in step with
 * `useSearchParams`, so nothing round-trips to the server and back/forward retrace the choices.
 */
export function CompareView({ cars, index, defaults, selection }: CompareProps & { selection: ParsedSelection }) {
  const bySlug = useMemo(() => new Map(cars.map((c) => [c.slug, c])), [cars]);
  const selected = selection.slugs.flatMap((slug) => bySlug.get(slug) ?? []);
  const [picking, setPicking] = useState<Picking | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const focusSlot = useRef<number | null>(null);

  // After adding or removing a car, move focus to a car that is still there, since the button used may be gone.
  const selectionKey = selection.slugs.join(",");
  useEffect(() => {
    const slot = focusSlot.current;
    if (slot === null) return;
    focusSlot.current = null;
    document.getElementById(`car-${slot}-title`)?.focus();
  }, [selectionKey]);

  function go(slugs: string[]) {
    setCopyStatus("idle");
    window.history.pushState(null, "", carsHref(slugs, defaults));
  }

  function choose(slug: string) {
    if (!picking || selection.slugs.includes(slug)) return;
    if (picking.mode === "add") {
      focusSlot.current = selection.slugs.length;
      go([...selection.slugs, slug]);
    } else {
      go(selection.slugs.map((s, i) => (i === picking.slot ? slug : s)));
    }
  }

  function remove(slot: number) {
    focusSlot.current = Math.max(0, slot - 1);
    go(selection.slugs.filter((_, i) => i !== slot));
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  // Reference numbers in reading order: the panels' leading facts, then the specification rows.
  const citations = createCitations([
    ...selected.flatMap((car) => PANEL_ROWS.map((row) => car.rows[row.id]?.[0]?.sources)),
    ...COMPARE_GROUPS.flatMap((group) => group.rows.flatMap((row) => selected.flatMap((car) => (car.rows[row.id] ?? []).map((f) => f.sources)))),
  ]);
  const fills = engineFillPhotos(selected);
  const photoCredits = [
    ...new Map(
      selected
        // Exactly the photographs the page shows: the lead, the component sections and any 360° frames.
        .flatMap((car, i) => [
          ...[car.photo, ...shownComponentPhotos(car, fills[i])].map((p) => p.credit),
          ...(car.rotation?.frames ?? []).map((f) => f.credit),
        ])
        .map((credit) => [credit.id, credit]),
    ).values(),
  ];

  // Derived from the cars actually shown, so adding, removing, a shared link and back/forward all agree.
  const heading = selected.length >= 3 ? "Three machines. Three philosophies." : "Two machines. Two philosophies.";
  const isDefault = selection.slugs.join(",") === defaults.join(",");
  const apart = introducedApart(selected);
  const compact = selected.length >= 3;
  const notice =
    selection.unknown.length > 0
      ? `${selection.unknown.length === 1 ? "One car" : `${selection.unknown.length} cars`} in this link ${selection.unknown.length === 1 ? "is" : "are"} not in the archive and ${selection.unknown.length === 1 ? "was" : "were"} left out.`
      : selection.trimmed
        ? `This link listed a car twice or more than ${MAX_COMPARED} cars; the comparison shows each car once, up to ${MAX_COMPARED}.`
        : null;

  return (
    <>
      <section aria-labelledby="compare-title" className="page-container pt-[clamp(1.5rem,4vw,3rem)]">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-label text-crimson-text">Compare</p>
            <h1 id="compare-title" className="mt-3 text-display-lg text-ivory">
              {heading}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-prose text-lede text-stone">
              {selected.length >= 2 ? (
                <>
                  {listNames(selected).replace(/^the/, "The")}
                  {apart ? `, ${apart}` : ""}. Every figure below comes from the archive’s cited sources.
                </>
              ) : (
                "Choose a second car to set beside this one. Every figure comes from the archive’s cited sources."
              )}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={copyLink} className={toolButton}>
                Copy link to this comparison
              </button>
              <button type="button" onClick={() => go(defaults)} disabled={isDefault} className={`${toolButton} disabled:opacity-45 disabled:hover:border-line-strong`}>
                Reset
              </button>
              <p role="status" className="text-label text-ash">
                {copyStatus === "copied" && "Link copied."}
                {copyStatus === "failed" && "Couldn’t copy. The address bar holds the same link."}
              </p>
            </div>
            {notice && <p className="mt-4 border-l border-crimson pl-4 text-label text-stone">{notice}</p>}
          </div>
        </div>
      </section>

      <section aria-label="Cars compared" className="page-container mt-(--heading-gap)">
        <div className={`grid gap-x-8 gap-y-14 ${compact ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {selected.map((car, slot) => (
            <VehiclePanel
              key={slot}
              car={car}
              slot={slot}
              density={compact ? "compact" : "wide"}
              citations={citations}
              canRemove={selected.length > 1}
              onReplace={() => setPicking({ mode: "replace", slot })}
              onRemove={() => remove(slot)}
            />
          ))}
          {selected.length === 1 && (
            <div className="flex min-h-80 flex-col justify-center border border-line p-8">
              <p className="text-label text-crimson-text">Second car</p>
              <p className="mt-3 font-display text-display-md text-ivory">Choose a car to compare</p>
              <p className="mt-3 max-w-sm text-stone">Any of the {cars.length} cars in the archive, by maker, model or code.</p>
              <button type="button" onClick={() => setPicking({ mode: "add" })} aria-haspopup="dialog" className={`${primaryButton} mt-6 self-start`}>
                Choose a car
              </button>
            </div>
          )}
        </div>

        {selected.length === 2 && (
          <div className="mt-12 flex flex-col gap-5 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-display-sm text-ivory">Add a third car</p>
              <p className="mt-1 max-w-prose text-stone">Set another car from the archive beside these two. You can compare up to three.</p>
            </div>
            <button type="button" onClick={() => setPicking({ mode: "add" })} aria-haspopup="dialog" className={`${primaryButton} shrink-0`}>
              Add a car
            </button>
          </div>
        )}
      </section>

      {selected.length >= 2 && (
        <>
          <WalkAround cars={selected} />
          <ComponentSections cars={selected} citations={citations} />
          <SpecComparison cars={selected} citations={citations} />
        </>
      )}

      <CompareSection id="references-title" title="References">
        <References citations={citations} photoCredits={photoCredits} logoCredits={[]} />
      </CompareSection>

      {picking && (
        <VehiclePicker
          heading={picking.mode === "add" ? "Add a car to the comparison" : `Replace the ${selected[picking.slot]?.title ?? "car"}`}
          cars={cars}
          index={index}
          selected={selection.slugs}
          onChoose={choose}
          onClose={() => setPicking(null)}
        />
      )}
    </>
  );
}

const toolButton =
  "inline-flex min-h-11 items-center rounded-xs border border-line-strong px-4 text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory";
const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-xs bg-crimson px-6 text-[0.9375rem] font-medium text-ivory transition-colors duration-(--dur-fast) hover:bg-crimson-hover";
