import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildComparisonData, DEFAULT_COMPARISON } from "@/lib/compare-data";
import { parseCarsParam } from "@/lib/compare";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { CompareFromUrl, CompareView } from "@/components/compare/CompareExperience";

const title = "Car comparison: two machines, two philosophies";
const description =
  "An editorial car comparison from Auto Chronicle. Set two or three cars from the archive against each other, from engines and cockpits to every sourced specification, with nothing estimated.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} — Auto Chronicle`, description, type: "website", siteName: "Auto Chronicle", locale: "en_GB" },
  twitter: { card: "summary", title: `${title} — Auto Chronicle`, description },
};

export default function ComparePage() {
  const { cars, index } = buildComparisonData();
  const props = { cars, index, defaults: DEFAULT_COMPARISON };
  // The prerendered page shows the default pair; the selection in `?cars=` takes over once the page
  // can read the address. Without JavaScript the default pair stays, fully readable.
  const defaults = parseCarsParam(null, new Set(cars.map((c) => c.slug)), DEFAULT_COMPARISON);

  return (
    <article>
      <div className="page-container pt-[clamp(1.5rem,4vw,3rem)]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      </div>

      <Suspense fallback={<CompareView {...props} selection={defaults} />}>
        <CompareFromUrl {...props} />
      </Suspense>

      <nav aria-label="Continue exploring" className="page-container pt-[clamp(3rem,6vw,5rem)] pb-(--section-y)">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-label">
          <Link href="/#cars" className="link-quiet text-ivory">
            All featured cars
          </Link>
          <Link href="/#manufacturers" className="link-quiet text-stone">
            All manufacturers
          </Link>
          <Link href="/#search" className="link-quiet text-stone">
            Search the archive
          </Link>
        </div>
      </nav>
    </article>
  );
}
