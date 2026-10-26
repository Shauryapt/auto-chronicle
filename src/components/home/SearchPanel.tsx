"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { CategorySlug } from "@/data/types";
import { searchEntries, type SearchEntry } from "@/lib/search-match";
import { SearchIcon } from "@/components/ui/icons";

export type SearchCategoryOption = { slug: CategorySlug; name: string };

type SearchPanelProps = {
  index: SearchEntry[];
  categoryOptions: SearchCategoryOption[];
  scopeNote: string;
};

/** Keeps `q` and `category` in the URL without a server round trip, so a search can be shared. */
function writeUrl(update: Record<string, string | null>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(update)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}#search`);
}

export function SearchPanel({ index, categoryOptions, scopeNote }: SearchPanelProps) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);
  // Follow the address when it changes from outside, such as the wordmark clearing it. Typing writes
  // the trimmed query to the address, so an equal trimmed value is not an outside change.
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlQuery);
  if (urlQuery !== seenUrlQuery) {
    setSeenUrlQuery(urlQuery);
    if (urlQuery !== query.trim()) setQuery(urlQuery);
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const statusId = useId();

  const categoryParam = searchParams.get("category");
  const category = categoryOptions.find((c) => c.slug === categoryParam) ?? null;

  const results = useMemo(
    () => searchEntries(index, query, category?.slug ?? null),
    [index, query, category],
  );

  // Links to #search (header control, category tiles) should land the cursor in the field.
  useEffect(() => {
    function focusField(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href$="#search"]');
      if (link) window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
    }
    if (window.location.hash === "#search") inputRef.current?.focus({ preventScroll: true });
    document.addEventListener("click", focusField);
    return () => document.removeEventListener("click", focusField);
  }, []);

  const hasQuery = query.trim().length > 0;
  let status: string;
  if (!hasQuery && !category) {
    status = "Start typing to search the sample archive.";
  } else if (results.length === 0) {
    status = hasQuery
      ? `No sample entries match “${query.trim()}”${category ? ` in ${category.name}` : ""}.`
      : `No sample entries in ${category?.name} yet.`;
  } else {
    const noun = results.length === 1 ? "entry" : "entries";
    status = `${results.length} sample ${noun}${hasQuery ? ` for “${query.trim()}”` : ""}${category ? ` in ${category.name}` : ""}.`;
  }

  return (
    <div>
      <form role="search" aria-label="Sample archive" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={inputId} className="sr-only">
          Search cars, manufacturers and eras
        </label>
        <div className="flex items-center gap-4 border-b border-line-strong pb-3 transition-colors duration-(--dur-base) focus-within:border-ivory">
          <SearchIcon className="size-6 shrink-0 text-stone" />
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            autoComplete="off"
            spellCheck={false}
            aria-describedby={statusId}
            placeholder="Try Porsche, Golf or post-war"
            onChange={(e) => {
              setQuery(e.target.value);
              writeUrl({ q: e.target.value.trim() || null });
            }}
            className="min-h-12 w-full min-w-0 bg-transparent font-display text-display-md text-ivory placeholder:text-ash/70 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                writeUrl({ q: null });
                inputRef.current?.focus();
              }}
              className="min-h-11 shrink-0 px-2 text-label text-stone transition-colors duration-(--dur-fast) hover:text-ivory"
            >
              Clear
            </button>
          )}
        </div>

        <fieldset className="mt-5">
          <legend className="sr-only">Limit to a category</legend>
          <div className="flex flex-wrap gap-2">
            {[{ slug: null, name: "Everything" }, ...categoryOptions].map((option) => {
              const active = (category?.slug ?? null) === option.slug;
              return (
                <button
                  key={option.slug ?? "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => writeUrl({ category: option.slug })}
                  className={`min-h-10 rounded-xs border px-3.5 text-label transition-colors duration-(--dur-fast) ${
                    active
                      ? "border-ivory bg-ivory text-ink"
                      : "border-line-strong text-stone hover:border-ivory hover:text-ivory"
                  }`}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>

      <p id={statusId} role="status" className="mt-8 text-label text-stone">
        {status} <span className="text-ash">{scopeNote}</span>
      </p>

      {results.length > 0 && (
        <ul className="mt-4 border-t border-line">
          {results.map((entry) => (
            <li key={entry.id} className="border-b border-line">
              <Link
                href={entry.href}
                className="group grid gap-1 py-4 transition-colors duration-(--dur-fast) sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <span className="text-label text-crimson-text sm:pt-1.5">{entry.type}</span>
                <span>
                  <span className="font-display text-display-sm text-ivory decoration-crimson decoration-1 underline-offset-4 group-hover:underline">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-stone">{entry.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {hasQuery && results.length === 0 && (
        <p className="mt-4 max-w-prose text-stone">
          Search covers the sample entries on this page only. Try a manufacturer name such as Jaguar, a model such
          as Taycan, or an era such as pioneers.
          {category && (
            <>
              {" "}
              <button
                type="button"
                onClick={() => writeUrl({ category: null })}
                className="link-quiet text-ivory"
              >
                Search every category instead
              </button>
            </>
          )}
        </p>
      )}
    </div>
  );
}
