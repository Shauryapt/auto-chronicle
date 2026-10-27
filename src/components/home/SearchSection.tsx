import { Suspense } from "react";
import { categories, countVehiclesInCategory } from "@/data/categories";
import { eras } from "@/data/eras";
import { manufacturers } from "@/data/manufacturers";
import { vehicles } from "@/data/vehicles";
import { buildSearchIndex } from "@/lib/search";
import { SearchIcon } from "@/components/ui/icons";
import { SearchPanel } from "./SearchPanel";

/** Shown in the prerendered shell until the panel can read the URL, and kept if JavaScript is unavailable. */
function SearchFallback({ scopeNote }: { scopeNote: string }) {
  return (
    <div>
      <div className="flex items-center gap-4 border-b border-line-strong pb-3">
        <SearchIcon className="size-6 shrink-0 text-stone" />
        <span className="flex min-h-12 items-center font-display text-display-md text-ash/70">
          Try Porsche, Golf or post-war
        </span>
      </div>
      <p className="mt-8 text-label text-ash">{scopeNote}</p>
      <noscript>
        <p className="mt-4 text-stone">Search needs JavaScript. Every car and manufacturer is also listed on this page.</p>
      </noscript>
    </div>
  );
}

export function SearchSection() {
  const index = buildSearchIndex();
  const categoryOptions = categories
    .filter((c) => countVehiclesInCategory(c.slug) > 0)
    .map(({ slug, name }) => ({ slug, name }));
  const scopeNote = `The archive holds ${vehicles.length} cars, ${manufacturers.length} manufacturers and ${eras.length} eras.`;

  return (
    <section id="search" aria-labelledby="search-title" className="section-y border-t border-line bg-ink-raised">
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="search-title" className="text-display-lg text-ivory">
            Find a car, a marque or an era
          </h2>
          <p className="mt-5 max-w-prose text-lede text-stone">
            Search by name, country, body style or period, for example &ldquo;front-wheel drive&rdquo; or
            &ldquo;1960s&rdquo;.
          </p>
        </div>
        <div className="lg:col-span-7">
          <Suspense fallback={<SearchFallback scopeNote={scopeNote} />}>
            <SearchPanel index={index} categoryOptions={categoryOptions} scopeNote={scopeNote} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
