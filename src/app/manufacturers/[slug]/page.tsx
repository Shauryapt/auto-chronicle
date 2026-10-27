import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/data/categories";
import { imageCredits } from "@/data/image-credits";
import { logoCredits } from "@/data/logo-credits";
import { getManufacturer, manufacturers } from "@/data/manufacturers";
import type { Manufacturer } from "@/data/types";
import { getVehiclesByManufacturer } from "@/data/vehicles";
import { createCitations } from "@/lib/citations";
import { canonical } from "@/lib/site";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { Cite } from "@/components/detail/Cite";
import { DetailSection } from "@/components/detail/DetailSection";
import { FactList, type FactItem } from "@/components/detail/FactList";
import { HeroPhoto } from "@/components/detail/HeroPhoto";
import { JsonLd } from "@/components/detail/JsonLd";
import { MilestoneList } from "@/components/detail/MilestoneList";
import { Prose } from "@/components/detail/Prose";
import { References } from "@/components/detail/References";
import { ReviewNote } from "@/components/detail/ReviewNote";
import { ManufacturerLogoImage } from "@/components/ui/ManufacturerLogoImage";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

/**
 * Every page is built from local data, so the whole route must stay static. For a slug that was
 * not prerendered, this also makes the first request wait for the full render instead of
 * streaming a shell, so an unknown slug gets a real 404 status rather than a 200.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return manufacturers.map((m) => ({ slug: m.slug }));
}

function describe(maker: Manufacturer) {
  return maker.intro?.text ?? `${maker.name}, ${maker.country}: ${maker.knownFor}. A directory entry in Auto Chronicle, the independent automotive encyclopedia.`;
}

export async function generateMetadata({ params }: PageProps<"/manufacturers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const maker = getManufacturer(slug);
  if (!maker) return { title: "Manufacturer not found" };

  const description = describe(maker);
  return {
    title: maker.name,
    description,
    alternates: canonical(`/manufacturers/${maker.slug}`),
    openGraph: { title: `${maker.name} — Auto Chronicle`, description, type: "article", siteName: "Auto Chronicle", locale: "en_GB" },
    twitter: { card: "summary", title: `${maker.name} — Auto Chronicle`, description },
  };
}

export default async function ManufacturerPage({ params }: PageProps<"/manufacturers/[slug]">) {
  const { slug } = await params;
  const maker = getManufacturer(slug);
  if (!maker) notFound();

  const cars = getVehiclesByManufacturer(maker.slug);
  const categories = [...new Set(cars.flatMap((c) => c.categories))].map((s) => getCategory(s)).filter((c) => c !== undefined);

  // Numbered in reading order: intro, at-a-glance, history, then the timeline.
  const citations = createCitations([
    maker.intro?.sources,
    maker.founded?.sources,
    ...(maker.history ?? []).map((p) => p.sources),
    ...(maker.milestones ?? []).map((m) => m.sources),
  ]);

  const glance: FactItem[] = [
    { label: "Country of origin", value: maker.country },
    { label: "Region", value: maker.region },
  ];
  if (maker.founded) {
    glance.push({
      label: "Founded",
      value: maker.founded.note ? `${maker.founded.year} (${maker.founded.note})` : maker.founded.year,
      sources: maker.founded.sources,
    });
  }
  if (categories.length > 0) {
    glance.push({
      label: categories.length === 1 ? "Category in the archive" : "Categories in the archive",
      value: (
        <span className="flex flex-wrap gap-x-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/?category=${c.slug}#search`} className="link-quiet">
              {c.name}
            </Link>
          ))}
        </span>
      ),
    });
  }

  const photoCredits = [maker.heroPhoto?.creditId, ...cars.map((c) => c.photo.creditId)]
    .filter((id) => id !== undefined)
    .map((id) => imageCredits[id]);
  const logoCreditList = maker.logo ? [logoCredits[maker.logo.creditId]] : [];

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${maker.name} — Auto Chronicle`,
          description: describe(maker),
          about: {
            "@type": "Organization",
            name: maker.name,
            ...(maker.founded && { foundingDate: maker.founded.year }),
          },
          ...(citations.list.length > 0 && { citation: citations.list.map((s) => s.url) }),
        }}
      />

      <header className="page-container pt-[clamp(1.5rem,4vw,3rem)]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Manufacturers", href: "/#manufacturers" }, { label: maker.name }]} />

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className={`enter-rise ${maker.heroPhoto ? "lg:col-span-6" : "lg:col-span-8"}`}>
            <p className="text-label text-ash">{maker.country}</p>
            {maker.logo && <ManufacturerLogoImage logo={maker.logo} boxPx={56} className="mt-5" />}
            <h1 className="mt-5 text-display-lg text-ivory">
              {maker.name}
            </h1>
            <p className="mt-5 max-w-prose text-lede text-stone">
              {maker.intro ? (
                <>
                  {maker.intro.text}
                  <Cite ids={maker.intro.sources} citations={citations} />
                </>
              ) : (
                `${maker.knownFor}.`
              )}
            </p>
            <ReviewNote
              review={maker.review}
              className="mt-7"
              pendingText={
                cars.length > 0
                  ? `This page lists ${maker.name}’s directory details and its cars in the archive. The marque’s own history is not covered here; each car’s page cites its sources.`
                  : `This page lists ${maker.name}’s directory details only. The archive does not cover the marque’s history or cars.`
              }
            />
          </div>
          {maker.heroPhoto && (
            <div className="lg:col-span-6">
              <HeroPhoto photo={maker.heroPhoto} caption={maker.heroPhoto.caption} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          )}
        </div>
      </header>

      <DetailSection id="glance-title" title="At a glance">
        <FactList items={glance} citations={citations} />
      </DetailSection>

      {maker.history && maker.history.length > 0 && (
        <DetailSection id="history-title" title="History" note="A short outline. A fuller history will follow as more sources are reviewed.">
          <Prose paragraphs={maker.history} citations={citations} />
          {maker.milestones && maker.milestones.length > 0 && (
            <div className="mt-10">
              <h3 className="font-sans text-label font-medium text-stone">Milestones</h3>
              <div className="mt-5">
                <MilestoneList milestones={maker.milestones} citations={citations} />
              </div>
            </div>
          )}
        </DetailSection>
      )}

      {/* A marque without cars in the archive has no section here; its directory note says so. */}
      {cars.length > 0 && (
        <DetailSection id="vehicles-title" title={`${maker.name} in the archive`}>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {cars.map((car) => (
              <VehicleCard key={car.slug} vehicle={car} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" />
            ))}
          </div>
        </DetailSection>
      )}

      <DetailSection id="references-title" title="References">
        <References citations={citations} photoCredits={photoCredits} logoCredits={logoCreditList} />
      </DetailSection>

      <nav aria-label="Continue exploring" className="page-container pt-[clamp(3rem,6vw,5rem)] pb-(--section-y)">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-label">
          <Link href="/#manufacturers" className="link-quiet text-ivory">
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
