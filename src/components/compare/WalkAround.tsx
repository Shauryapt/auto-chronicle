"use client";

import { useState } from "react";
import type { CompareCar } from "@/lib/compare-data";
import { CompareSection } from "./CompareParts";
import { RotationViewer } from "./RotationViewer";

/**
 * "Walk around the machine": a 360° view for each compared car that has a verified photograph
 * sequence (`Vehicle.rotation`). Cars without one are simply not offered, and when none of the
 * compared cars has one the section is not rendered at all, so a sequence added to a record turns
 * it on with no other change. Each car's sequence is shown on its own, never aligned with another's.
 */
export function WalkAround({ cars }: { cars: CompareCar[] }) {
  const viewable = cars.filter((car) => car.rotation);
  const [chosen, setChosen] = useState<string | null>(null);
  const active = viewable.find((c) => c.slug === chosen) ?? viewable[0];
  if (!active?.rotation) return null;

  return (
    <CompareSection
      id="walk-around-title"
      title="Walk around the machine"
      note="Drag across the photograph, or use the arrow buttons, to turn the car. Swipe up and down to scroll as usual."
    >
      {viewable.length > 1 && (
        <div role="group" aria-label="Car to view" className="mb-6 flex flex-wrap gap-2">
          {viewable.map((car) => {
            const pressed = car.slug === active.slug;
            return (
              <button
                key={car.slug}
                type="button"
                aria-pressed={pressed}
                onClick={() => setChosen(car.slug)}
                className={`inline-flex min-h-11 items-center rounded-xs border px-4 text-left text-label transition-colors duration-(--dur-fast) ${
                  pressed ? "border-ivory bg-ivory text-ink" : "border-line-strong text-stone hover:border-ivory hover:text-ivory"
                }`}
              >
                {car.title}
              </button>
            );
          })}
        </div>
      )}

      <div key={active.slug}>
        <p className="mb-4 text-label text-ash">
          <span className="text-crimson-text">{active.title}</span> {active.rotation.depicts}
        </p>
        <RotationViewer rotation={active.rotation} title={active.title} />
      </div>
    </CompareSection>
  );
}
