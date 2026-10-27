import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { imageCredits } from "@/data/image-credits";
import { logoCredits } from "@/data/logo-credits";
import { getManufacturer } from "@/data/manufacturers";
import type { Vehicle } from "@/data/types";
import { getVehicle, getVehiclesByManufacturer, vehicles } from "@/data/vehicles";
import { createCitations } from "@/lib/citations";
import { Breadcrumbs } from "@/components/detail/Breadcrumbs";
import { DetailSection } from "@/components/detail/DetailSection";
import { FactList } from "@/components/detail/FactList";
import { JsonLd } from "@/components/detail/JsonLd";
import { Prose } from "@/components/detail/Prose";
import { References } from "@/components/detail/References";
import { ReviewNote } from "@/components/detail/ReviewNote";
import { VersionList } from "@/components/detail/VersionList";
import { ManufacturerLogoImage } from "@/components/ui/ManufacturerLogoImage";
import { CarGallery, type GalleryItem } from "@/components/vehicles/CarGallery";
import { CinematicIntro } from "@/components/vehicles/CinematicIntro";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

/**
 * Every page is built from local data, so the whole route must stay static. For a slug that was
 * not prerendered, this also makes the first request wait for the full render instead of
 * streaming a shell, so an unknown slug gets a real 404 status rather than a 200.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

function fullName(car: Vehicle) {
  const maker = getManufacturer(car.manufacturerSlug);
  return maker ? `${maker.name} ${car.name}` : car.name;
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = getVehicle(slug);
  if (!car) return { title: "Car not found" };

  const title = fullName(car);
  return {
    title,
    description: car.summary,
    openGraph: { title: `${title} — Auto Chronicle`, description: car.summary, type: "article", siteName: "Auto Chronicle", locale: "en_GB" },
    twitter: { card: "summary", title: `${title} — Auto Chronicle`, description: car.summary },
  };
}

export default async function CarPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const car = getVehicle(slug);
  if (!car) notFound();

  const maker = getManufacturer(car.manufacturerSlug);
  const related = getVehiclesByManufacturer(car.manufacturerSlug).filter((v) => v.slug !== car.slug);
  const keyFacts = [...car.facts, ...(car.details ?? [])];

  // Numbered in reading order: key facts, history, specifications, then versions.
  const citations = createCitations([
    ...keyFacts.map((f) => f.sources),
    ...(car.history ?? []).map((p) => p.sources),
    ...(car.specs ?? []).flatMap((g) => g.items.map((i) => i.sources)),
    ...(car.versions ?? []).map((v) => v.sources),
  ]);

  // The lead photograph first, then the supporting images, each with its credit resolved for the viewer.
  // A title sequence already opens on the lead photograph, so the gallery then leads with the next one
  // and keeps the lead as its last image.
  const supporting = car.gallery ?? [];
  const galleryPhotos = car.intro && supporting.length > 0 ? [...supporting, car.photo] : [car.photo, ...supporting];
  const galleryItems: GalleryItem[] = galleryPhotos.map((photo) => {
    const credit = imageCredits[photo.creditId];
    return {
      id: photo.creditId,
      src: photo.src,
      alt: photo.alt,
      focus: photo.focus,
      depicts: photo.depicts ?? credit.subject,
      note: photo.note,
      credit: { creator: credit.creator, license: credit.license, licenseUrl: credit.licenseUrl, sourceUrl: credit.sourceUrl },
    };
  });

  const photoCredits = [...galleryPhotos, ...related.map((v) => v.photo)].map((p) => imageCredits[p.creditId]);
  const logoCreditList = maker?.logo ? [logoCredits[maker.logo.creditId]] : [];

  const summary = (
    <>
      <p className="max-w-prose text-lede text-stone">{car.summary}</p>
      <ReviewNote
        review={car.review}
        className="mt-6"
        pendingText="This entry shows sample facts only. Its history and specifications will be added with sources."
      />
    </>
  );

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${fullName(car)} — Auto Chronicle`,
          description: car.summary,
          about: {
            "@type": "Car",
            name: fullName(car),
            ...(maker && { brand: { "@type": "Brand", name: maker.name } }),
          },
          ...(citations.list.length > 0 && { citation: citations.list.map((s) => s.url) }),
        }}
      />

      <header className="page-container pt-[clamp(1.5rem,4vw,3rem)]">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            ...(maker ? [{ label: maker.name, href: `/manufacturers/${maker.slug}` }] : []),
            { label: car.name },
          ]}
        />

        {car.intro ? (
          <div className="mt-4 lg:mt-6">
            <CinematicIntro key={car.slug} car={car} intro={car.intro} maker={maker}>
              {summary}
            </CinematicIntro>
          </div>
        ) : (
          <div className="enter-rise mt-8 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              {maker && (
                <Link href={`/manufacturers/${maker.slug}`} className="link-quiet text-label text-crimson-text">
                  {maker.name}
                </Link>
              )}
              <h1 className="mt-3 text-display-lg text-ivory">{car.name}</h1>
              <p className="mt-4 text-label text-ash">{car.kind}</p>
            </div>
            <div className="lg:col-span-5">{summary}</div>
          </div>
        )}

        {/* With a title sequence the only photograph is already shown above. */}
        {!(car.intro && supporting.length === 0) && (
          <div className="mt-8 lg:mt-10">
            <CarGallery name={fullName(car)} items={galleryItems} preloadLead={!car.intro} />
          </div>
        )}
      </header>

      <DetailSection id="facts-title" title="Key facts">
        <FactList items={keyFacts} citations={citations} />
      </DetailSection>

      {car.history && car.history.length > 0 && (
        <DetailSection id="history-title" title="History" note={car.coverageNote}>
          <Prose paragraphs={car.history} citations={citations} />
        </DetailSection>
      )}

      {car.specs && car.specs.length > 0 && (
        <DetailSection
          id="specs-title"
          title="Specifications"
          note="Each group applies only to the cars named in its heading. Figures not found in a source are left out."
        >
          <div className="space-y-10">
            {car.specs.map((group) => (
              <div key={group.scope}>
                <h3 className="text-display-sm text-ivory">{group.scope}</h3>
                <div className="mt-4">
                  <FactList items={group.items} citations={citations} />
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {car.versions && car.versions.length > 0 && (
        <DetailSection id="versions-title" title="Versions" note="Only versions confirmed by the sources below are listed.">
          <VersionList versions={car.versions} citations={citations} />
        </DetailSection>
      )}

      {maker && (
        <DetailSection id="maker-title" title="Manufacturer">
          <div className="flex flex-col gap-5 border border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-label text-ash">{maker.country}</p>
              {maker.logo && <ManufacturerLogoImage logo={maker.logo} boxPx={44} className="mt-3" />}
              <p className="mt-3 font-display text-display-sm text-ivory">{maker.name}</p>
              <p className="mt-2 max-w-prose text-stone">{maker.knownFor}.</p>
            </div>
            <Link
              href={`/manufacturers/${maker.slug}`}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xs border border-line-strong px-6 text-[0.9375rem] font-medium text-ivory transition-colors duration-(--dur-fast) hover:border-ivory hover:bg-ivory/5"
            >
              {maker.name} profile
            </Link>
          </div>
        </DetailSection>
      )}

      {related.length > 0 && maker && (
        <DetailSection id="related-title" title={`More from ${maker.name}`}>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {related.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" />
            ))}
          </div>
        </DetailSection>
      )}

      <DetailSection id="references-title" title="References">
        <References citations={citations} photoCredits={photoCredits} logoCredits={logoCreditList} />
      </DetailSection>

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
