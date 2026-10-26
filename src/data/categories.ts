import type { Category, CategorySlug } from "./types";
import { vehicles } from "./vehicles";

export const categories: Category[] = [
  { slug: "classic", name: "Classic cars", description: "Landmark designs from the decades that shaped motoring." },
  { slug: "supercar", name: "Supercars", description: "Low, fast and built to make an entrance." },
  { slug: "hypercar", name: "Hypercars", description: "The limited-run extremes of performance engineering." },
  { slug: "electric", name: "Electric vehicles", description: "Battery-electric cars, from city runabouts to grand tourers." },
  { slug: "concept", name: "Concept cars", description: "Show cars and studies that previewed what came next." },
  { slug: "future", name: "Future releases", description: "Announced models, followed from reveal to road." },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function countVehiclesInCategory(slug: CategorySlug): number {
  return vehicles.filter((v) => v.categories.includes(slug)).length;
}
