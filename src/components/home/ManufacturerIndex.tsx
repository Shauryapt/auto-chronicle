import Image from "next/image";
import Link from "next/link";
import { manufacturers, regions } from "@/data/manufacturers";
import type { ManufacturerLogo } from "@/data/types";
import { vehicles } from "@/data/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LOGO_BOX_PX = 44;

/**
 * Logos range from square emblems to wordmarks fifteen times wider than tall. Scaling height
 * down as the aspect ratio grows keeps their visual weight similar inside the same 44px slot.
 */
function logoHeight({ src }: ManufacturerLogo) {
  const ratio = src.width / src.height;
  return `${Math.min(LOGO_BOX_PX, LOGO_BOX_PX * ratio ** -0.4) / 16}rem`;
}

export function ManufacturerIndex() {
  return (
    <section id="manufacturers" aria-labelledby="manufacturers-title" className="section-y bg-ink-raised">
      <div className="page-container">
        <SectionHeading
          id="manufacturers-title"
          title="Explore manufacturers"
          aside="Auto Chronicle is independent. Marque names and logos are trademarks of their owners, shown for identification only, and full marque profiles are in preparation."
        >
          A first index of marques, grouped by where they began. Each profile will cover the company&rsquo;s history,
          its defining cars and the people behind them.
        </SectionHeading>

        <div className="mt-(--heading-gap) space-y-10 lg:space-y-12">
          {regions.map((region) => {
            const inRegion = manufacturers.filter((m) => m.region === region);
            // Pick a column count the region fills exactly, so rows have no empty cells.
            const columns = inRegion.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3";
            return (
              <section key={region} aria-labelledby={`region-${region}`} className="reveal">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 id={`region-${region}`} className="text-display-sm text-ivory">
                    {region}
                  </h3>
                  <p className="text-label text-ash">
                    {inRegion.length} {inRegion.length === 1 ? "marque" : "marques"}
                  </p>
                </div>

                <ul className={`mt-5 grid border-t border-l border-line sm:grid-cols-2 ${columns}`}>
                  {inRegion.map((maker) => {
                    const featured = vehicles.filter((v) => v.manufacturerSlug === maker.slug);
                    return (
                      <li
                        key={maker.slug}
                        id={`marque-${maker.slug}`}
                        className="flex flex-col border-r border-b border-line p-5 sm:p-6 sm:max-lg:odd:last:col-span-2 lg:p-5 xl:p-6"
                      >
                        <p className="text-label text-ash">{maker.country}</p>
                        {/* Fixed-height slot so names line up across a row; the name below carries the meaning, so alt is empty. */}
                        {maker.logo && (
                          <div className="mt-4 flex h-11 items-center">
                            <Image
                              src={maker.logo.src}
                              alt=""
                              className={`w-auto max-w-full object-contain object-left ${maker.logo.tone === "mono" ? "logo-mono" : ""}`}
                              style={{ height: logoHeight(maker.logo) }}
                            />
                          </div>
                        )}
                        <p className="mt-3 font-display text-[clamp(1.5rem,1.05rem+0.9vw,2.125rem)] leading-tight text-ivory">{maker.name}</p>
                        <p className="mt-3 text-stone">{maker.knownFor}</p>
                        {featured.length > 0 && (
                          <p className="mt-auto pt-4 text-label text-ash">
                            In featured cars:{" "}
                            {featured.map((v, i) => (
                              <span key={v.slug}>
                                {i > 0 && ", "}
                                <Link href={`#car-${v.slug}`} className="link-quiet text-ivory">
                                  {v.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
