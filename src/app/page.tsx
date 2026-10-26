import { CategoryDiscovery } from "@/components/home/CategoryDiscovery";
import { EraTimeline } from "@/components/home/EraTimeline";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { FeaturedStories } from "@/components/home/FeaturedStories";
import { Hero } from "@/components/home/Hero";
import { ManufacturerIndex } from "@/components/home/ManufacturerIndex";
import { SearchSection } from "@/components/home/SearchSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedStories />
      <EraTimeline />
      <FeaturedCars />
      <ManufacturerIndex />
      <CategoryDiscovery />
      <SearchSection />
    </>
  );
}
