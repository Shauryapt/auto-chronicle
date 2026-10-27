import Image from "next/image";
import Link from "next/link";
import { getManufacturer } from "@/data/manufacturers";
import type { Vehicle } from "@/data/types";

type VehicleCardProps = {
  vehicle: Vehicle;
  /** Responsive `sizes` for the photograph, matching the grid the card sits in. */
  sizes?: string;
};

/** A vehicle summary card. The name links to the car's detail page, and the link covers the whole card. */
export function VehicleCard({ vehicle, sizes = "(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw" }: VehicleCardProps) {
  const maker = getManufacturer(vehicle.manufacturerSlug);

  return (
    <article id={`car-${vehicle.slug}`} className="group relative flex h-full flex-col border-t border-line-strong pt-5">
      <p className="text-label text-stone">{vehicle.kind}</p>
      <div className="relative mt-5 aspect-3/2 overflow-hidden bg-ink-high">
        <Image
          src={vehicle.photo.src}
          alt={vehicle.photo.alt}
          fill
          sizes={sizes}
          className="photo-grade object-cover"
          style={{ objectPosition: vehicle.photo.focus }}
        />
      </div>
      <p className="mt-5 text-label text-crimson-text">{maker?.name}</p>
      <h3 className="mt-1 text-display-sm text-ivory">
        <Link
          href={`/cars/${vehicle.slug}`}
          className="decoration-crimson decoration-1 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
        >
          {vehicle.name}
        </Link>
      </h3>
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
