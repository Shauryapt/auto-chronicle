import Link from "next/link";
import { categories, countVehiclesInCategory } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryDiscovery() {
  const populated = categories
    .map((category) => ({ category, count: countVehiclesInCategory(category.slug) }))
    .filter(({ count }) => count > 0);

  return (
    <section id="discover" aria-labelledby="discover-title" className="section-y">
      <div className="page-container">
        <SectionHeading
          id="discover-title"
          title="Discover by category"
        >
          Start from the kind of car you care about. Each category opens its cars in search.
        </SectionHeading>

        {/* Only categories with cars are offered; an empty one would be a promise, not a page. */}
        <ul className="mt-(--heading-gap) grid border-t border-l border-line md:grid-cols-3">
          {populated.map(({ category, count }) => (
            <li key={category.slug} className="border-r border-b border-line">
              <Link
                href={`/?category=${category.slug}#search`}
                className="flex h-full flex-col p-6 transition-colors duration-(--dur-base) hover:bg-ink-raised sm:min-h-56 sm:p-8"
              >
                <span className="font-display text-display-md text-ivory">{category.name}</span>
                <span className="mt-3 block text-stone">{category.description}</span>
                <span className="mt-auto pt-6 text-label sm:pt-8">
                  <span className="text-ivory underline decoration-crimson decoration-1 underline-offset-4">
                    Browse {count} {count === 1 ? "car" : "cars"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
