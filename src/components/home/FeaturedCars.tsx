import { featuredVehicles } from "@/data/vehicles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VehicleCard } from "@/components/vehicles/VehicleCard";

export function FeaturedCars() {
  return (
    <section id="cars" aria-labelledby="cars-title" className="section-y">
      <div className="page-container">
        <SectionHeading
          id="cars-title"
          title="Featured cars"
          aside="Cards show widely documented basics. Each car’s page cites the sources for its facts."
        >
          Four cars from four different corners of motoring: a classic grand tourer, a modern performance coupé, an
          everyday hatchback and an electric saloon.
        </SectionHeading>

        <div className="mt-(--heading-gap) grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
