import type { Metadata } from "next";
import { CategoryDiscovery } from "@/components/home/CategoryDiscovery";
import { EraTimeline } from "@/components/home/EraTimeline";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { FeaturedStories } from "@/components/home/FeaturedStories";
import { Hero } from "@/components/home/Hero";
import { ManufacturerIndex } from "@/components/home/ManufacturerIndex";
import { SearchSection } from "@/components/home/SearchSection";
import { canonical } from "@/lib/site";

// Set here rather than in the layout, which every page would otherwise inherit.
export const metadata: Metadata = { alternates: canonical("/") };

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
