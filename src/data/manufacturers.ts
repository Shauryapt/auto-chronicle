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
import porsche1964 from "@/assets/images/story-porsche-911-1964.jpg";
import beetle1953 from "@/assets/images/era-volkswagen-beetle.jpg";
import type { Manufacturer, Region } from "./types";

const REVIEWED = "2026-10-26";

/**
 * Marques in the archive. Every marque has a directory entry; the researched ones also carry a
 * sourced introduction, history and milestones, each citing `sources.ts`, plus a `review`
 * record. Logos are shown for identification only (sources in `logo-credits.ts`); Auto Chronicle
 * is independent and not affiliated with any manufacturer.
 */
export const manufacturers: Manufacturer[] = [
  {
    slug: "porsche",
    name: "Porsche",
    country: "Germany",
    region: "Europe",
    knownFor: "Rear- and mid-engined sports cars, and endurance racing",
    logo: { src: porscheLogo, tone: "mono", creditId: "logo-porsche" },
    intro: {
      text: "A Stuttgart sports-car maker whose story begins with Ferdinand Porsche’s engineering office, opened in 1931.",
      sources: ["porsche-heritage"],
    },
    founded: { year: "1931", note: "Engineering office, Stuttgart", sources: ["porsche-heritage"] },
    history: [
      {
        text: "Porsche traces its origins to Ferdinand Porsche’s engineering office, which opened in 1931 at Kronenstrasse 24 in Stuttgart. The first car to carry the Porsche name followed in 1948: the 356 “No. 1” Roadster, chassis number 356-001.",
        sources: ["porsche-heritage"],
      },
      {
        text: "The 911 was presented in 1963, originally under the name 901, and went into series production in 1964. In 2019 the company unveiled the Taycan, its first all-electric model.",
        sources: ["porsche-heritage"],
      },
    ],
    milestones: [
      { year: "1931", text: "Ferdinand Porsche’s engineering office opens in Stuttgart.", sources: ["porsche-heritage"] },
      { year: "1948", text: "The 356 “No. 1” Roadster becomes the first car to carry the Porsche name.", sources: ["porsche-heritage"] },
      { year: "1963", text: "The 911 is presented, at first under the name 901.", sources: ["porsche-heritage"] },
      { year: "2019", text: "The all-electric Taycan is unveiled; production starts in Zuffenhausen.", sources: ["porsche-heritage", "porsche-newsroom-taycan-premiere"] },
    ],
    heroPhoto: {
      src: porsche1964,
      alt: "Black early Porsche 911 with racing number 18, displayed in a museum",
      focus: "50% 60%",
      creditId: "story-911-1964",
      caption: "Porsche 911, 1964",
    },
    review: { reviewed: REVIEWED, scope: "Founding, first car and model milestones checked against Porsche’s own heritage and newsroom pages. A fuller company history is still to be written." },
  },
  { slug: "mercedes-benz", name: "Mercedes-Benz", country: "Germany", region: "Europe", knownFor: "Luxury cars, sports cars and a long engineering lineage", logo: { src: mercedesBenzLogo, tone: "mono", creditId: "logo-mercedes-benz" } },
  {
    slug: "volkswagen",
    name: "Volkswagen",
    country: "Germany",
    region: "Europe",
    knownFor: "Mass-market cars, from the Beetle to the Golf",
    logo: { src: volkswagenLogo, tone: "mono", creditId: "logo-volkswagen" },
    intro: {
      text: "The Wolfsburg-based carmaker founded in 1937, whose Golf moved the brand from the rear-engined Beetle to front-engine, front-wheel drive.",
      sources: ["wikipedia-volkswagen", "vw-newsroom-golf-1"],
    },
    founded: { year: "1937", sources: ["wikipedia-volkswagen"] },
    history: [
      {
        text: "Volkswagen was founded on 28 May 1937 by the German Labour Front, under the name Gesellschaft zur Vorbereitung des Deutschen Volkswagens mbH, and renamed Volkswagenwerk GmbH in September 1938.",
        sources: ["wikipedia-volkswagen"],
      },
      {
        text: "Series production of the first Golf began in Wolfsburg on 29 March 1974. Presented as the Beetle’s successor, it took the brand into front-engine, front-wheel-drive cars.",
        sources: ["vw-newsroom-golf-45", "vw-newsroom-golf-1"],
      },
    ],
    milestones: [
      { year: "1937", text: "The company is founded on 28 May.", sources: ["wikipedia-volkswagen"] },
      { year: "1938", text: "It is renamed Volkswagenwerk GmbH.", sources: ["wikipedia-volkswagen"] },
      { year: "1974", text: "Series production of the Golf begins in Wolfsburg.", sources: ["vw-newsroom-golf-45"] },
    ],
    heroPhoto: {
      src: beetle1953,
      alt: "Dark grey early Volkswagen Beetle displayed in a dim museum hall beside a vintage motorcycle",
      focus: "40% 55%",
      creditId: "era-beetle",
      caption: "Volkswagen Beetle, 1953",
    },
    review: { reviewed: REVIEWED, scope: "Founding and company name checked against a general reference; the Golf milestones against Volkswagen’s newsroom." },
  },
  { slug: "ferrari", name: "Ferrari", country: "Italy", region: "Europe", knownFor: "Sports cars and Formula One", logo: { src: ferrariLogo, tone: "mono", creditId: "logo-ferrari" } },
  { slug: "lamborghini", name: "Lamborghini", country: "Italy", region: "Europe", knownFor: "Dramatic mid-engined supercars", logo: { src: lamborghiniLogo, tone: "mono", creditId: "logo-lamborghini" } },
  {
    slug: "jaguar",
    name: "Jaguar",
    country: "United Kingdom",
    region: "Europe",
    knownFor: "Sports cars and saloons, including the E-Type",
    logo: { src: jaguarLogo, tone: "mono", creditId: "logo-jaguar" },
    intro: {
      text: "A British maker of sports cars and saloons that began in Blackpool in 1922 as the Swallow Sidecar Company.",
      sources: ["jdht-1920s", "wikipedia-jaguar-cars"],
    },
    founded: { year: "1922", note: "As the Swallow Sidecar Company, Blackpool", sources: ["jdht-1920s", "wikipedia-jaguar-cars"] },
    history: [
      {
        text: "William Lyons and William Walmsley founded the Swallow Sidecar Company in Blackpool in 1922; its first factory was at 5 Bloomfield Road. The company moved to Coventry in 1928.",
        sources: ["jdht-1920s", "wikipedia-jaguar-cars"],
      },
      {
        text: "In 1934 Lyons formed SS Cars, and on 23 March 1945 its shareholders agreed to change the company’s name to Jaguar Cars Limited. The E-Type followed in 1961, launched at the Geneva Motor Show.",
        sources: ["wikipedia-jaguar-cars", "jlr-e-type-60"],
      },
    ],
    milestones: [
      { year: "1922", text: "The Swallow Sidecar Company is founded in Blackpool.", sources: ["jdht-1920s", "wikipedia-jaguar-cars"] },
      { year: "1928", text: "The company moves to Coventry.", sources: ["wikipedia-jaguar-cars"] },
      { year: "1934", text: "William Lyons forms SS Cars.", sources: ["wikipedia-jaguar-cars"] },
      { year: "1945", text: "SS Cars is renamed Jaguar Cars Limited.", sources: ["wikipedia-jaguar-cars"] },
      { year: "1961", text: "The E-Type makes its world debut in Geneva.", sources: ["jlr-e-type-60"] },
    ],
    review: { reviewed: REVIEWED, scope: "Founding and company names checked against the Jaguar Daimler Heritage Trust and a general reference; the E-Type launch against JLR’s media site." },
  },
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
