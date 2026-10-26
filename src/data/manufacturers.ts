import astonMartinLogo from "@/assets/logos/logo-aston-martin.svg";
import chevroletLogo from "@/assets/logos/logo-chevrolet.svg";
import citroenLogo from "@/assets/logos/logo-citroen.svg";
import ferrariLogo from "@/assets/logos/logo-ferrari.svg";
import fordLogo from "@/assets/logos/logo-ford.svg";
import hondaLogo from "@/assets/logos/logo-honda.svg";
import hyundaiLogo from "@/assets/logos/logo-hyundai.svg";
import jaguarLogo from "@/assets/logos/logo-jaguar.svg";
import lamborghiniLogo from "@/assets/logos/logo-lamborghini.svg";
import mazdaLogo from "@/assets/logos/logo-mazda.svg";
import mercedesBenzLogo from "@/assets/logos/logo-mercedes-benz.svg";
import porscheLogo from "@/assets/logos/logo-porsche.svg";
import teslaLogo from "@/assets/logos/logo-tesla.svg";
import toyotaLogo from "@/assets/logos/logo-toyota.svg";
import volkswagenLogo from "@/assets/logos/logo-volkswagen.svg";
import type { Manufacturer, Region } from "./types";

/**
 * Sample marques for the discovery index. Logos are shown beside each name for identification
 * only (sources in `logo-credits.ts`); Auto Chronicle is independent and not affiliated with any
 * manufacturer.
 */
export const manufacturers: Manufacturer[] = [
  { slug: "porsche", name: "Porsche", country: "Germany", region: "Europe", knownFor: "Rear- and mid-engined sports cars, and endurance racing", logo: { src: porscheLogo, tone: "mono", creditId: "logo-porsche" } },
  { slug: "mercedes-benz", name: "Mercedes-Benz", country: "Germany", region: "Europe", knownFor: "Luxury cars, sports cars and a long engineering lineage", logo: { src: mercedesBenzLogo, tone: "mono", creditId: "logo-mercedes-benz" } },
  { slug: "volkswagen", name: "Volkswagen", country: "Germany", region: "Europe", knownFor: "Mass-market cars, from the Beetle to the Golf", logo: { src: volkswagenLogo, tone: "mono", creditId: "logo-volkswagen" } },
  { slug: "ferrari", name: "Ferrari", country: "Italy", region: "Europe", knownFor: "Sports cars and Formula One", logo: { src: ferrariLogo, tone: "mono", creditId: "logo-ferrari" } },
  { slug: "lamborghini", name: "Lamborghini", country: "Italy", region: "Europe", knownFor: "Dramatic mid-engined supercars", logo: { src: lamborghiniLogo, tone: "mono", creditId: "logo-lamborghini" } },
  { slug: "jaguar", name: "Jaguar", country: "United Kingdom", region: "Europe", knownFor: "Sports cars and saloons, including the E-Type", logo: { src: jaguarLogo, tone: "mono", creditId: "logo-jaguar" } },
  { slug: "aston-martin", name: "Aston Martin", country: "United Kingdom", region: "Europe", knownFor: "Grand tourers and sports cars", logo: { src: astonMartinLogo, tone: "mono", creditId: "logo-aston-martin" } },
  { slug: "citroen", name: "Citroën", country: "France", region: "Europe", knownFor: "Inventive engineering and unconventional design", logo: { src: citroenLogo, tone: "mono", creditId: "logo-citroen" } },
  { slug: "toyota", name: "Toyota", country: "Japan", region: "Asia", knownFor: "Dependable everyday cars and hybrid drivetrains", logo: { src: toyotaLogo, tone: "mono", creditId: "logo-toyota" } },
  { slug: "honda", name: "Honda", country: "Japan", region: "Asia", knownFor: "Efficient engines, compact cars and motorsport", logo: { src: hondaLogo, tone: "mono", creditId: "logo-honda" } },
  { slug: "mazda", name: "Mazda", country: "Japan", region: "Asia", knownFor: "Rotary engines and lightweight roadsters", logo: { src: mazdaLogo, tone: "mono", creditId: "logo-mazda" } },
  { slug: "hyundai", name: "Hyundai", country: "South Korea", region: "Asia", knownFor: "Everyday cars and a growing electric range", logo: { src: hyundaiLogo, tone: "mono", creditId: "logo-hyundai" } },
  { slug: "ford", name: "Ford", country: "United States", region: "North America", knownFor: "Mass production, from the Model T onward", logo: { src: fordLogo, tone: "original", creditId: "logo-ford" } },
  { slug: "chevrolet", name: "Chevrolet", country: "United States", region: "North America", knownFor: "Everyday cars, trucks and the Corvette", logo: { src: chevroletLogo, tone: "mono", creditId: "logo-chevrolet" } },
  { slug: "tesla", name: "Tesla", country: "United States", region: "North America", knownFor: "Electric cars and software-led design", logo: { src: teslaLogo, tone: "mono", creditId: "logo-tesla" } },
];

export const regions: Region[] = ["Europe", "Asia", "North America"];

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((m) => m.slug === slug);
}
