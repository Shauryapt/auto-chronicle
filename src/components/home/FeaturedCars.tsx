import Image from "next/image";
import { getManufacturer } from "@/data/manufacturers";
import type { Vehicle } from "@/data/types";
import { vehicles } from "@/data/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusTag } from "@/components/ui/StatusTag";

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const maker = getManufacturer(vehicle.manufacturerSlug);

  return (
    <article id={`car-${vehicle.slug}`} className="flex h-full flex-col border-t border-line-strong pt-5">
      <div className="flex items-center justify-between gap-3 text-label">
        <span className="text-stone">{vehicle.kind}</span>
        <StatusTag>Sample entry</StatusTag>
      </div>
      <div className="relative mt-5 aspect-3/2 overflow-hidden bg-ink-high">
        <Image
          src={vehicle.photo.src}
          alt={vehicle.photo.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="photo-grade object-cover"
          style={{ objectPosition: vehicle.photo.focus }}
        />
      </div>
      <p className="mt-5 text-label text-crimson-text">{maker?.name}</p>
      <h3 className="mt-1 text-display-sm text-ivory">{vehicle.name}</h3>
      <p className="mt-3 text-stone">{vehicle.summary}</p>
      <dl className="mt-auto grid gap-px pt-6 text-label">
        {vehicle.facts.map((fact) => (
          <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-line py-2.5">
            <dt className="text-ash">{fact.label}</dt>
            <dd className="text-ivory tabular-nums">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function FeaturedCars() {
  return (
    <section id="cars" aria-labelledby="cars-title" className="section-y">
      <div className="page-container">
        <SectionHeading
          id="cars-title"
          title="Featured cars"
          aside="Sample entries list only widely documented basics. Full specifications will be added with cited sources."
        >
          Four cars from four different corners of motoring: a classic grand tourer, a modern performance coupé, an
          everyday hatchback and an electric saloon.
        </SectionHeading>

        <div className="mt-(--heading-gap) grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
