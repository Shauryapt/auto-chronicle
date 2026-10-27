"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CompareCar } from "@/lib/compare-data";
import { searchEntries, type SearchEntry } from "@/lib/search-match";
import { SearchIcon } from "@/components/ui/icons";

type VehiclePickerProps = {
  /** Heading for the dialog, e.g. "Replace the Porsche 911 (992 generation)" or "Add a car". */
  heading: string;
  cars: CompareCar[];
  index: SearchEntry[];
  /** Cars already in the comparison; shown but not choosable, so a car is never compared with itself. */
  selected: string[];
  onChoose: (slug: string) => void;
  onClose: () => void;
};

/**
 * Chooses a car from the archive in a native modal dialog: focus starts in the search field, the
 * page behind is inert, and Escape or Close returns focus to the button that opened it. Results
 * use the site's own search ranking, so "MX-5", "Miata" or "W198" find what they find elsewhere.
 */
export function VehiclePicker({ heading, cars, index, selected, onChoose, onClose }: VehiclePickerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const headingId = useId();
  const statusId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    // Opening a modal focuses its first control; searching is what the dialog is for, so start there.
    inputRef.current?.focus();
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  // Closing first lets the dialog hand focus back to the button that opened it before the page changes.
  function choose(slug: string) {
    dialogRef.current?.close();
    onChoose(slug);
  }

  const bySlug = useMemo(() => new Map(cars.map((c) => [c.slug, c])), [cars]);
  const results = useMemo(() => {
    if (!query.trim()) return cars;
    return searchEntries(index, query, null).flatMap((entry) => bySlug.get(entry.href.split("/").pop() ?? "") ?? []);
  }, [query, cars, index, bySlug]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby={headingId}
      className="m-auto max-h-[min(44rem,calc(100dvh-2rem))] w-[min(44rem,calc(100vw-2rem))] max-w-none border border-line-strong bg-ink p-0 text-ivory backdrop:bg-ink/85"
    >
      <div className="flex max-h-[min(44rem,calc(100dvh-2rem))] flex-col">
        <div className="border-b border-line p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id={headingId} className="text-display-sm text-ivory">
              {heading}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 shrink-0 items-center rounded-xs border border-line-strong px-4 text-label text-ivory transition-colors duration-(--dur-fast) hover:border-ivory"
            >
              Close
            </button>
          </div>
          <label className="mt-5 flex items-center gap-3 border-b border-line-strong pb-2 focus-within:border-ivory">
            <SearchIcon className="size-5 shrink-0 text-stone" />
            <span className="sr-only">Search the archive by maker, model, generation or code</span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              autoComplete="off"
              spellCheck={false}
              aria-describedby={statusId}
              placeholder="Maker, model or code, e.g. Miata or W198"
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-11 w-full min-w-0 bg-transparent text-lede text-ivory placeholder:text-ash focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
          </label>
          <p id={statusId} role="status" className="mt-3 text-label text-ash">
            {query.trim()
              ? results.length === 0
                ? `No cars in the archive match “${query.trim()}”.`
                : `${results.length} ${results.length === 1 ? "car matches" : "cars match"} “${query.trim()}”.`
              : `All ${cars.length} cars in the archive.`}
          </p>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 sm:p-3">
          {results.map((car) => {
            const taken = selected.includes(car.slug);
            return (
              <li key={car.slug}>
                <button
                  type="button"
                  disabled={taken}
                  onClick={() => choose(car.slug)}
                  className="grid w-full grid-cols-[5.5rem_1fr] items-center gap-4 rounded-xs p-2 text-left transition-colors duration-(--dur-fast) enabled:hover:bg-ink-raised disabled:opacity-55 sm:grid-cols-[7rem_1fr]"
                >
                  <span className="relative block aspect-3/2 overflow-hidden bg-ink-high">
                    <Image
                      src={car.photo.src}
                      alt=""
                      fill
                      sizes="7rem"
                      className="photo-grade object-cover"
                      style={{ objectPosition: car.photo.focus }}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-label text-crimson-text">{car.maker}</span>
                    <span className="mt-0.5 block font-display text-display-sm text-ivory">{car.name}</span>
                    <span className="mt-1 block text-label text-ash">
                      {taken ? "Already in the comparison" : [car.code, car.span?.value].filter(Boolean).join(", ") || car.kind}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </dialog>
  );
}
