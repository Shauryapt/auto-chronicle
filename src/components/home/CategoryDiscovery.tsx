import Link from "next/link";
import { categories, countVehiclesInCategory } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusTag } from "@/components/ui/StatusTag";

export function CategoryDiscovery() {
  return (
    <section id="discover" aria-labelledby="discover-title" className="section-y">
      <div className="page-container">
        <SectionHeading
          id="discover-title"
          title="Discover by category"
          aside="Categories with sample entries open in search. The rest are being written."
        >
          Start from the kind of car you care about. Each category will grow into its own collection.
        </SectionHeading>

        <ul className="mt-(--heading-gap) grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = countVehiclesInCategory(category.slug);
            const body = (
              <>
                <span className="font-display text-display-md text-ivory">{category.name}</span>
                <span className="mt-3 block text-stone">{category.description}</span>
                <span className="mt-auto flex items-center gap-3 pt-6 text-label sm:pt-8">
                  {count > 0 ? (
                    <span className="text-ivory underline decoration-crimson decoration-1 underline-offset-4">
                      Browse {count} sample {count === 1 ? "entry" : "entries"}
                    </span>
                  ) : (
                    <StatusTag>Collection in preparation</StatusTag>
                  )}
                </span>
              </>
            );

            return (
              <li key={category.slug} className="border-r border-b border-line">
                {count > 0 ? (
                  <Link
                    href={`/?category=${category.slug}#search`}
                    className="flex h-full flex-col p-6 transition-colors duration-(--dur-base) hover:bg-ink-raised sm:min-h-56 sm:p-8"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col p-6 sm:min-h-56 sm:p-8">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
