import heroMercedes300sl from "@/assets/images/hero-mercedes-300sl-gullwing.jpg";
import sl300Coupe1955 from "@/assets/images/car-mercedes-benz-300-sl-coupe-1955.jpg";
import sl300Interior from "@/assets/images/car-mercedes-benz-300-sl-interior.jpg";
import sl300Roadster1957 from "@/assets/images/car-mercedes-benz-300-sl-roadster-1957.jpg";
import ds19 from "@/assets/images/car-citroen-ds-19.jpg";
import ds19Dashboard from "@/assets/images/car-citroen-ds-19-dashboard.jpg";
import dsRear from "@/assets/images/car-citroen-ds-rear.jpg";
import dsBreak from "@/assets/images/car-citroen-ds-break.jpg";
import ds21Cabriolet from "@/assets/images/story-citroen-ds.jpg";
import miuraP400S from "@/assets/images/car-lamborghini-miura-p400-s.jpg";
import miuraP400Rear from "@/assets/images/car-lamborghini-miura-p400-1967-rear.jpg";
import miuraInterior from "@/assets/images/car-lamborghini-miura-interior.jpg";
import miuraEngine from "@/assets/images/story-lamborghini-miura-engine.jpg";
import countachLp400 from "@/assets/images/era-lamborghini-countach.jpg";
import countachLp400Rear from "@/assets/images/car-lamborghini-countach-lp400-1974-rear.jpg";
import countachLp400Interior from "@/assets/images/car-lamborghini-countach-lp400-interior.jpg";
import countachQvEngine from "@/assets/images/car-lamborghini-countach-5000-qv-engine.jpg";
import f40Front from "@/assets/images/car-ferrari-f40-1990.jpg";
import f40Rear from "@/assets/images/car-ferrari-f40-1989-rear.jpg";
import f40Interior from "@/assets/images/car-ferrari-f40-interior.jpg";
import f40Engine from "@/assets/images/car-ferrari-f40-engine.jpg";
import modelT1915 from "@/assets/images/era-ford-model-t.jpg";
import modelTTouring1909 from "@/assets/images/car-ford-model-t-touring-1909.jpg";
import modelTInterior1911 from "@/assets/images/car-ford-model-t-1911-interior.jpg";
import modelTEngine1909 from "@/assets/images/car-ford-model-t-1909-engine.jpg";
import modelTCoupe1926 from "@/assets/images/car-ford-model-t-coupe-1926.jpg";
import mustangHardtop1965 from "@/assets/images/car-ford-mustang-1965-hardtop.jpg";
import mustangFastbackRear from "@/assets/images/car-ford-mustang-1965-fastback-rear.jpg";
import mustangInterior from "@/assets/images/car-ford-mustang-1965-interior.jpg";
import mustangConvertible1964 from "@/assets/images/car-ford-mustang-1964-convertible.jpg";
import nsx1991 from "@/assets/images/car-honda-nsx-1991.jpg";
import nsx1991Rear from "@/assets/images/car-honda-nsx-1991-rear.jpg";
import nsx1990 from "@/assets/images/car-honda-nsx-1990.jpg";
import acuraNsx1991Rear from "@/assets/images/car-acura-nsx-1991-rear.jpg";
import supraRz1993 from "@/assets/images/car-toyota-supra-rz-1993.jpg";
import supraSzRear from "@/assets/images/car-toyota-supra-sz-rear.jpg";
import supraRzSInterior from "@/assets/images/car-toyota-supra-rz-s-interior.jpg";
import supraRzSInstruments from "@/assets/images/car-toyota-supra-rz-s-instruments.jpg";
import mx5Na from "@/assets/images/car-mazda-mx-5-na.jpg";
import mx5NaInterior from "@/assets/images/car-mazda-mx-5-na-interior.jpg";
import eunosRoadster1989 from "@/assets/images/car-eunos-roadster-1989.jpg";
import eunosRoadsterRearLight from "@/assets/images/car-eunos-roadster-1989-rear-light.jpg";
import modelS from "@/assets/images/car-tesla-model-s.jpg";
import modelSFirstDeliveries from "@/assets/images/car-tesla-model-s-first-deliveries-2012.jpg";
import modelSScreens2012 from "@/assets/images/car-tesla-model-s-2012-screens.jpg";
import modelSP85 from "@/assets/images/car-tesla-model-s-p85-2014.jpg";
import priusNhw10 from "@/assets/images/car-toyota-prius-nhw10-1997.jpg";
import priusCutaway from "@/assets/images/car-toyota-prius-nhw10-cutaway.jpg";
import priusCutawayEngineBay from "@/assets/images/car-toyota-prius-nhw10-cutaway-engine-bay.jpg";
import priusNhw11Rear from "@/assets/images/car-toyota-prius-nhw11-rear.jpg";
import type { Vehicle } from "./types";

const REVIEWED = "2026-10-26";

/**
 * The wider archive, beyond the four featured cars. Same rules as `vehicles.ts`: every fact cites
 * `sources.ts`, a figure that differs by market, engine or version sits in a scoped `specs` group, and
 * where sources disagree the record says so instead of picking one silently. Records whose only source
 * is a general reference say that in their review scope.
 */
export const archiveVehicles: Vehicle[] = [
  {
    slug: "mercedes-benz-300-sl-w198",
    name: "300 SL (W198)",
    manufacturerSlug: "mercedes-benz",
    generation: "W198",
    aliases: ["Gullwing", "300SL"],
    kind: "Classic sports car",
    categories: ["classic"],
    summary: "A coupé whose high tubular frame left no room for ordinary doors, so they opened upwards from the roof.",
    facts: [
      { label: "Introduced", value: "1954", sources: ["wikipedia-300-sl"] },
      { label: "Engine", value: "3.0-litre straight-six, direct injection", sources: ["wikipedia-300-sl"] },
      { label: "Bodies", value: "Coupé, then roadster", sources: ["wikipedia-300-sl"] },
    ],
    details: [
      { label: "Coupé built", value: "1954–1957, 1,400 cars", sources: ["wikipedia-300-sl"] },
      { label: "Roadster built", value: "1957–1963, 1,858 cars", sources: ["wikipedia-300-sl"] },
    ],
    history: [
      {
        text: "The 300 SL was introduced at the New York International Auto Show in February 1954. The idea of a road car had come from Max Hoffman, Mercedes-Benz’s importer in the United States, at a directors’ meeting in Stuttgart in 1953.",
        sources: ["wikipedia-300-sl"],
      },
      {
        text: "Its tubular spaceframe ran so high along the sides that conventionally hinged doors were not practical, so the coupé’s doors opened upwards from the roof. It was also one of the first cars with mechanical direct petrol injection, a Bosch system.",
        sources: ["wikipedia-300-sl"],
      },
    ],
    specs: [
      {
        scope: "W198 road cars, as rated in the source",
        items: [
          { label: "Engine", value: "2,996 cc straight-six, Bosch mechanical direct injection", sources: ["wikipedia-300-sl"] },
          { label: "Power (DIN)", value: "215 PS at 5,800 rpm", sources: ["wikipedia-300-sl"] },
          { label: "Power (SAE gross)", value: "240 hp at 6,100 rpm", sources: ["wikipedia-300-sl"] },
        ],
      },
    ],
    versions: [
      { name: "Coupé", period: "1954–1957", description: "The gullwing-door coupé; 1,400 were built.", sources: ["wikipedia-300-sl"] },
      { name: "Roadster", period: "1957–1963", description: "The open car that followed; 1,858 were built.", sources: ["wikipedia-300-sl"] },
    ],
    coverageNote: "Facts on this page come from a general reference; a Mercedes-Benz heritage source has not yet been located.",
    photo: {
      src: heroMercedes300sl,
      alt: "A deep red Mercedes-Benz 300 SL Gullwing coupé from the 1950s, parked on gravel in front of a dark hedge",
      focus: "50% 58%",
      creditId: "hero-300sl",
      depicts: "300 SL coupé (W198)",
    },
    gallery: [
      {
        src: sl300Coupe1955,
        alt: "Cream Mercedes-Benz 300 SL coupé with both gullwing doors raised, displayed in a museum hall",
        role: "front",
        depicts: "300 SL coupé, 1955",
        creditId: "gallery-mercedes-benz-300-sl-coupe-1955",
      },
      {
        src: sl300Interior,
        alt: "Inside a Mercedes-Benz 300 SL Gullwing: a large thin-rimmed steering wheel, chrome dashboard and red leather seats",
        role: "interior",
        depicts: "300 SL Gullwing interior",
        creditId: "gallery-mercedes-benz-300-sl-interior",
      },
      {
        src: sl300Roadster1957,
        alt: "Red Mercedes-Benz 300 SL roadster driving with its top down, front three-quarter view",
        role: "front",
        depicts: "300 SL roadster (W198), 1957",
        creditId: "gallery-mercedes-benz-300-sl-roadster-1957",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Introduction, production figures, engine and door design checked against a general reference only." },
  },
  {
    slug: "citroen-ds",
    name: "DS",
    manufacturerSlug: "citroen",
    aliases: ["DS 19", "DS 21", "ID 19"],
    kind: "Executive saloon",
    categories: ["classic"],
    summary: "A front-wheel-drive saloon built around a hydropneumatic suspension and a streamlined body.",
    facts: [
      { label: "Introduced", value: "1955", sources: ["stellantis-ds-70"] },
      { label: "Layout", value: "Front engine, front-wheel drive", sources: ["wikipedia-citroen-ds"] },
      { label: "Suspension", value: "Hydropneumatic", sources: ["stellantis-ds-70", "wikipedia-citroen-ds"] },
    ],
    details: [
      { label: "Built", value: "1955–1975", sources: ["stellantis-ds-70"] },
      { label: "Total built", value: "1,456,115 (Stellantis figure; the reference source gives 1,455,746)", sources: ["stellantis-ds-70", "wikipedia-citroen-ds"] },
      { label: "Bodies", value: "Saloon, estate and convertible", sources: ["wikipedia-citroen-ds"] },
    ],
    history: [
      {
        text: "The DS 19 made its debut at the Paris Motor Show on 6 October 1955. André Lefèbvre, an aeronautical engineer by training, led its engineering; Paul Magès created the hydraulic system; and Flaminio Bertoni’s team gave it its lines.",
        sources: ["stellantis-ds-70"],
      },
      {
        text: "A cheaper ID followed in 1957 and an estate in 1958, and a convertible was offered from 1960. The final DS was built at the Quai de Javel factory in Paris on 24 April 1975.",
        sources: ["wikipedia-citroen-ds", "stellantis-ds-70"],
      },
    ],
    versions: [
      { name: "DS 19", period: "From 1955", description: "The original model, shown at the 1955 Paris Motor Show.", sources: ["stellantis-ds-70"] },
      { name: "ID", period: "From 1957", description: "A cheaper submodel.", sources: ["wikipedia-citroen-ds"] },
      { name: "Estate", period: "From 1958", description: "The station-wagon body.", sources: ["wikipedia-citroen-ds"] },
      { name: "Convertible", period: "From 1960", description: "The open body, offered alongside the saloon.", sources: ["wikipedia-citroen-ds"] },
    ],
    photo: {
      src: ds19,
      alt: "White early Citroën DS 19 saloon parked on grass, front three-quarter view showing its round headlamps",
      focus: "50% 60%",
      creditId: "gallery-citroen-ds-19",
      depicts: "DS 19",
    },
    gallery: [
      {
        src: ds19Dashboard,
        alt: "The single-spoke steering wheel and curved dashboard of a Citroën DS 19",
        role: "interior",
        depicts: "DS 19 steering wheel and dashboard",
        creditId: "gallery-citroen-ds-19-dashboard",
      },
      {
        src: dsRear,
        alt: "Grey Citroën DS seen from the rear three-quarter, showing its tapering tail",
        role: "rear",
        depicts: "DS saloon",
        creditId: "gallery-citroen-ds-rear",
      },
      {
        src: dsBreak,
        alt: "Blue and white Citroën DS Break estate on display at a show",
        role: "side",
        depicts: "DS Break (estate)",
        creditId: "gallery-citroen-ds-break",
      },
      {
        src: ds21Cabriolet,
        alt: "Dark blue Citroën DS cabriolet parked beside wrought-iron gates",
        focus: "60% 60%",
        role: "side",
        depicts: "DS 21 Cabriolet, 1969",
        note: "Paris",
        creditId: "story-citroen-ds",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Launch, designers and end of production checked against Stellantis’s DS history; bodies and variants against a general reference." },
  },
  {
    slug: "lamborghini-miura",
    name: "Miura",
    manufacturerSlug: "lamborghini",
    aliases: ["P400", "P400 S", "SV"],
    kind: "Mid-engined sports car",
    categories: ["classic", "supercar"],
    summary: "Lamborghini’s first mid-engined car, with its V12 mounted across the chassis behind the cabin.",
    facts: [
      { label: "Presented", value: "1966", sources: ["lamborghini-history-miura"] },
      { label: "Layout", value: "Transverse mid-engine V12", sources: ["lamborghini-history-miura"] },
      { label: "Body", value: "Two-door coupé", sources: ["wikipedia-miura"] },
    ],
    details: [
      { label: "Built", value: "1966–1973", sources: ["lamborghini-history-miura"] },
      { label: "Coachwork", value: "Carrozzeria Bertone", sources: ["lamborghini-history-miura"] },
      { label: "Designer", value: "Marcello Gandini at Bertone", sources: ["wikipedia-miura"] },
    ],
    history: [
      {
        text: "The Miura’s rolling chassis was shown at the 1965 Turin Auto Show, and the P400 was presented at the Geneva Motor Show in March 1966.",
        sources: ["wikipedia-miura", "lamborghini-history-miura"],
      },
      {
        text: "It was the first mid-engined Lamborghini. The V12 sat behind the cockpit and ahead of the rear wheels, mounted transversely to keep the wheelbase short; the 400 in its name refers to the 4-litre displacement.",
        sources: ["lamborghini-history-miura"],
      },
    ],
    specs: [
      {
        scope: "All series",
        items: [{ label: "Engine", value: "3,929 cc V12, mounted transversely", sources: ["wikipedia-miura"] }],
      },
      {
        scope: "Power by series, in CV (metric horsepower) as Lamborghini states it",
        items: [
          { label: "P400", value: "350 CV at 7,000 rpm", sources: ["lamborghini-history-miura"] },
          { label: "P400 S", value: "370 CV at 7,700 rpm", sources: ["lamborghini-history-miura"] },
          { label: "SV", value: "385 CV at 7,850 rpm", sources: ["lamborghini-history-miura"] },
        ],
      },
    ],
    versions: [
      { name: "P400", period: "1966–1968", description: "The first series; Lamborghini gives 265 cars.", sources: ["lamborghini-history-miura"] },
      { name: "P400 S", period: "1969–1971", description: "The second series; Lamborghini gives 338 sold.", sources: ["lamborghini-history-miura"] },
      { name: "SV", period: "1971–1973", description: "The final series; Lamborghini gives 150 delivered.", sources: ["lamborghini-history-miura"] },
    ],
    photo: {
      src: miuraP400S,
      alt: "Dark green Lamborghini Miura P400 S, front three-quarter view showing its low nose and round headlamps",
      focus: "50% 60%",
      creditId: "gallery-lamborghini-miura-p400-s",
      depicts: "Miura P400 S",
    },
    gallery: [
      {
        src: miuraP400Rear,
        alt: "Red 1967 Lamborghini Miura P400 seen from the rear three-quarter on a show lawn, with its louvred engine cover",
        role: "rear",
        depicts: "Miura P400, 1967",
        creditId: "gallery-lamborghini-miura-p400-1967-rear",
      },
      {
        src: miuraInterior,
        alt: "Interior of a Lamborghini Miura: a three-spoke wooden steering wheel and a row of round dials in a low dashboard",
        role: "interior",
        depicts: "Miura interior",
        creditId: "gallery-lamborghini-miura-interior",
      },
      {
        src: miuraEngine,
        alt: "Close view of a Lamborghini Miura’s V12 engine, mounted behind the cabin",
        focus: "45% 45%",
        role: "engine",
        depicts: "Miura V12 engine",
        creditId: "story-miura-engine",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Presentation, layout, power and series figures checked against Lamborghini’s history page; designer and engine size against a general reference." },
  },
  {
    slug: "lamborghini-countach",
    name: "Countach",
    manufacturerSlug: "lamborghini",
    aliases: ["LP400", "LP500", "Quattrovalvole"],
    kind: "Mid-engined sports car",
    categories: ["classic", "supercar"],
    summary: "A wedge-shaped V12 with scissor doors, built in five series over sixteen years.",
    facts: [
      { label: "Production from", value: "1974", sources: ["lamborghini-history-countach"] },
      { label: "Layout", value: "Longitudinal mid-engine V12", sources: ["wikipedia-countach"] },
      { label: "Doors", value: "Scissor doors", sources: ["wikipedia-countach"] },
    ],
    details: [
      { label: "First shown", value: "1971, as a concept", sources: ["lamborghini-history-countach", "wikipedia-countach"] },
      { label: "Built", value: "1974–1990", sources: ["wikipedia-countach"] },
      { label: "Total built", value: "1,999 (Lamborghini figure; the reference source gives 1,983)", sources: ["lamborghini-history-countach", "wikipedia-countach"] },
      { label: "Designer", value: "Marcello Gandini at Bertone", sources: ["wikipedia-countach"] },
    ],
    history: [
      {
        text: "The first Countach prototype, the LP500, was shown at the 1971 Geneva Motor Show. The car went into production in 1974 and stayed in production for sixteen years.",
        sources: ["wikipedia-countach", "lamborghini-history-countach"],
      },
      {
        text: "It was styled by Marcello Gandini of Bertone, and the prototype’s scissor doors were carried over to the production car. Every production Countach used Lamborghini’s 60-degree V12 with double overhead camshafts.",
        sources: ["wikipedia-countach", "lamborghini-history-countach"],
      },
    ],
    specs: [
      {
        scope: "LP400, the first production version",
        items: [
          { label: "Engine", value: "3,929 cc V12, mounted longitudinally", sources: ["wikipedia-countach"] },
          { label: "Power", value: "375 CV", sources: ["lamborghini-history-countach"] },
        ],
      },
    ],
    versions: [
      { name: "LP400", period: "1974–1978", description: "The first production series.", sources: ["wikipedia-countach"] },
      { name: "LP400 S", period: "1978–1982", description: "The second series.", sources: ["wikipedia-countach"] },
      { name: "LP500 S", period: "1982–1985", description: "The third series.", sources: ["wikipedia-countach"] },
      { name: "5000 Quattrovalvole", period: "1985–1988", description: "The four-valve-per-cylinder series.", sources: ["wikipedia-countach"] },
      { name: "25th Anniversary", period: "1988–1990", description: "The final series.", sources: ["wikipedia-countach"] },
    ],
    photo: {
      src: countachLp400,
      alt: "Silver Lamborghini Countach LP400 with its sharp wedge profile, on a white museum floor",
      focus: "38% 60%",
      creditId: "era-countach",
      depicts: "Countach LP400, 1976",
    },
    gallery: [
      {
        src: countachLp400Rear,
        alt: "Silver 1974 Lamborghini Countach LP400 on a show stand, seen from the rear three-quarter with its angular air intakes",
        role: "rear",
        depicts: "Countach LP400, 1974",
        creditId: "gallery-lamborghini-countach-lp400-1974-rear",
      },
      {
        src: countachLp400Interior,
        alt: "Cockpit of a Lamborghini Countach LP400 seen through the open scissor door: brown trim and a small steering wheel",
        role: "interior",
        depicts: "Countach LP400 interior",
        creditId: "gallery-lamborghini-countach-lp400-interior",
      },
      {
        src: countachQvEngine,
        alt: "V12 engine of a Lamborghini Countach 5000 Quattrovalvole, seen from above under the raised engine cover",
        role: "engine",
        depicts: "Countach 5000 Quattrovalvole engine, 1986",
        creditId: "gallery-lamborghini-countach-5000-qv-engine",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Production dates, engine and total checked against Lamborghini’s history page; series dates, layout and designer against a general reference. The two disagree on the total built." },
  },
  {
    slug: "ferrari-f40",
    name: "F40",
    manufacturerSlug: "ferrari",
    kind: "Turbocharged supercar",
    categories: ["supercar"],
    summary: "Ferrari’s 40th-anniversary car: a twin-turbo V8 in a body of composite and aluminium panels.",
    facts: [
      { label: "Revealed", value: "1987", sources: ["wikipedia-f40"] },
      { label: "Engine", value: "2.9-litre twin-turbo V8", sources: ["wikipedia-f40"] },
      { label: "Layout", value: "Mid-engine, rear-wheel drive", sources: ["wikipedia-f40"] },
    ],
    details: [
      { label: "Built", value: "1987–1993 (road cars)", sources: ["wikipedia-f40"] },
      { label: "Total built", value: "1,311 to 1,315 (sources vary)", sources: ["wikipedia-f40"] },
      { label: "Design", value: "Pininfarina", sources: ["wikipedia-f40"] },
    ],
    history: [
      {
        text: "The F40 was revealed on 21 July 1987 at the Civic Centre in Maranello, designed to mark Ferrari’s 40th anniversary. It was the last Ferrari personally approved by Enzo Ferrari.",
        sources: ["wikipedia-f40"],
      },
      {
        text: "Its body panels were made of Kevlar, carbon fibre and aluminium. Pininfarina designed the body, with Pietro Camardella working under Aldo Brovarone.",
        sources: ["wikipedia-f40"],
      },
    ],
    specs: [
      {
        scope: "Road car, as listed by the source",
        items: [
          { label: "Engine", value: "2,936 cc twin-turbocharged V8, mounted longitudinally", sources: ["wikipedia-f40"] },
          { label: "Power", value: "478 PS; 484 PS for US-specification cars", sources: ["wikipedia-f40"] },
          { label: "Gearbox", value: "5-speed manual", sources: ["wikipedia-f40"] },
        ],
      },
    ],
    coverageNote: "Racing versions are not covered, and facts come from a general reference; a Ferrari heritage source has not yet been located.",
    photo: {
      src: f40Front,
      alt: "Red Ferrari F40 in front three-quarter view, showing its low nose, pop-up headlamps and large rear wing",
      focus: "50% 60%",
      creditId: "gallery-ferrari-f40-1990",
      depicts: "F40, 1990",
    },
    gallery: [
      {
        src: f40Rear,
        alt: "Red 1989 Ferrari F40 seen from behind, with its full-width wing, round tail lamps and slatted engine cover",
        role: "rear",
        depicts: "F40, 1989",
        creditId: "gallery-ferrari-f40-1989-rear",
      },
      {
        src: f40Interior,
        alt: "Spartan interior of a Ferrari F40: a three-spoke steering wheel, bare trim panels and red seats",
        role: "interior",
        depicts: "F40 interior",
        note: "Concorso d’Eleganza Villa d’Este, 2015",
        creditId: "gallery-ferrari-f40-interior",
      },
      {
        src: f40Engine,
        alt: "Engine bay of a Ferrari F40 under its raised rear clamshell, showing the twin-turbo V8 and intercoolers",
        role: "engine",
        depicts: "F40 engine bay",
        creditId: "gallery-ferrari-f40-engine",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Reveal, engine, layout, materials and production figures checked against a general reference only." },
  },
  {
    slug: "ford-model-t",
    name: "Model T",
    manufacturerSlug: "ford",
    kind: "Mass-production car",
    categories: ["classic"],
    summary: "The car Ford built on a moving assembly line, cutting its price as production grew.",
    facts: [
      { label: "Introduced", value: "1908", sources: ["henry-ford-collections-150", "wikipedia-model-t"] },
      { label: "Engine", value: "2.9-litre four-cylinder", sources: ["wikipedia-model-t"] },
      { label: "Built", value: "1908–1927", sources: ["wikipedia-model-t"] },
    ],
    details: [
      { label: "Sold", value: "More than 15 million", sources: ["wikipedia-model-t"] },
      { label: "Moving assembly line", value: "From 7 October 1913", sources: ["wikipedia-model-t"] },
    ],
    history: [
      {
        text: "Ford built the Model T from 1 October 1908 to 26 May 1927 and sold more than 15 million.",
        sources: ["wikipedia-model-t"],
      },
      {
        text: "A moving assembly line, started on 7 October 1913, let Ford cut the price: a 1909 Runabout cost $825, and by 1925 the Runabout had fallen to $260.",
        sources: ["wikipedia-model-t"],
      },
    ],
    specs: [
      {
        scope: "As listed by the source",
        items: [
          { label: "Engine", value: "177 cu in (2.9 L) inline four-cylinder", sources: ["wikipedia-model-t"] },
          { label: "Power", value: "20 hp", sources: ["wikipedia-model-t"] },
          { label: "Transmission", value: "Planetary gear, two forward speeds and reverse", sources: ["wikipedia-model-t"] },
        ],
      },
    ],
    photo: {
      src: modelT1915,
      alt: "Black Ford Model T with a folding fabric top and wooden-spoked wheels",
      focus: "55% 60%",
      creditId: "era-model-t",
      depicts: "Model T, 1915",
    },
    gallery: [
      {
        src: modelTTouring1909,
        alt: "Red and black 1909 Ford Model T Touring with brass lamps and red-spoked wheels, parked outside a brick building",
        role: "side",
        depicts: "Model T Touring, 1909",
        creditId: "gallery-ford-model-t-touring-1909",
      },
      {
        src: modelTInterior1911,
        alt: "Buttoned black leather seat, wooden steering wheel and floor pedals of a 1911 Ford Model T",
        role: "interior",
        depicts: "Model T Tourabout interior, 1911",
        creditId: "gallery-ford-model-t-1911-interior",
      },
      {
        src: modelTEngine1909,
        alt: "Engine bay of a 1909 Ford Model T Touring with the bonnet open, showing the four-cylinder engine and brass fittings",
        role: "engine",
        depicts: "Model T Touring engine, 1909",
        note: "Henry Ford Museum",
        creditId: "gallery-ford-model-t-1909-engine",
      },
      {
        src: modelTCoupe1926,
        alt: "Dark green 1926 Ford Model T coupé with yellow-spoked wheels on display in a museum",
        role: "side",
        depicts: "Model T Coupé, 1926",
        creditId: "gallery-ford-model-t-coupe-1926",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Introduction checked against The Henry Ford; production dates, engine and assembly-line details against a general reference." },
  },
  {
    slug: "ford-mustang-first-generation",
    name: "Mustang (first generation)",
    manufacturerSlug: "ford",
    kind: "Sporty compact",
    categories: ["classic"],
    summary: "A sporty two-door built on Falcon underpinnings and shown to the public at the 1964 New York World’s Fair.",
    facts: [
      { label: "Introduced", value: "1964", sources: ["ford-mustang-launch"] },
      { label: "Platform", value: "Shared with the Falcon", sources: ["wikipedia-mustang-first-generation"] },
      { label: "Bodies", value: "Hardtop, convertible, fastback", sources: ["wikipedia-mustang-first-generation"] },
    ],
    details: [
      { label: "Built", value: "March 1964 to 1973", sources: ["wikipedia-mustang-first-generation"] },
      { label: "Base price", value: "$2,368", sources: ["ford-mustang-launch"] },
    ],
    history: [
      {
        text: "Ford showed the Mustang to the press on 14 April 1964 and to the public on 17 April, at its pavilion at the New York World’s Fair. Ford says it set a first-year sales record of more than 418,000 cars.",
        sources: ["ford-mustang-launch"],
      },
      {
        text: "It shared its platform with the Falcon and launched as a hardtop and a convertible, with a fastback following in August 1964.",
        sources: ["wikipedia-mustang-first-generation"],
      },
    ],
    specs: [
      {
        scope: "Entry-level hardtop at launch",
        items: [{ label: "Engine", value: "170 cu in (2.8 L) straight-six, shared with the Falcon", sources: ["wikipedia-mustang-first-generation"] }],
      },
    ],
    versions: [
      { name: "Hardtop and convertible", period: "From April 1964", description: "The two bodies at launch.", sources: ["wikipedia-mustang-first-generation"] },
      { name: "Fastback", period: "From August 1964", description: "The third body style.", sources: ["wikipedia-mustang-first-generation"] },
    ],
    coverageNote: "This record covers the first generation; later Mustangs are not yet in the archive.",
    photo: {
      src: mustangHardtop1965,
      alt: "Red 1965 Ford Mustang hardtop, front three-quarter view at an outdoor show",
      focus: "50% 60%",
      creditId: "gallery-ford-mustang-1965-hardtop",
      depicts: "Mustang hardtop, 1965",
    },
    gallery: [
      {
        src: mustangFastbackRear,
        alt: "Red 1965 Ford Mustang GT fastback seen from the rear three-quarter, with its sloping roofline and triple tail lamps",
        role: "rear",
        depicts: "Mustang GT fastback, 1965",
        creditId: "gallery-ford-mustang-1965-fastback-rear",
      },
      {
        src: mustangInterior,
        alt: "White interior of a 1965 Ford Mustang convertible: a thin-rimmed steering wheel and a manual gear lever on the floor",
        role: "interior",
        depicts: "Mustang convertible interior, 1965",
        note: "Six-cylinder car with a three-speed manual",
        creditId: "gallery-ford-mustang-1965-interior",
      },
      {
        src: mustangConvertible1964,
        alt: "Light blue 1964 Ford Mustang convertible with a white top, parked on grass",
        role: "side",
        depicts: "Mustang convertible, 1964",
        creditId: "gallery-ford-mustang-1964-convertible",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Launch dates, price and first-year sales checked against Ford; platform, bodies and engines against a general reference." },
  },
  {
    slug: "honda-nsx-first-generation",
    name: "NSX (first generation)",
    manufacturerSlug: "honda",
    aliases: ["Acura NSX", "NSX-R", "NSX-T"],
    kind: "Mid-engined sports car",
    categories: ["supercar"],
    summary: "A mid-engined sports car with the first all-aluminium monocoque body in mass production.",
    facts: [
      { label: "On sale", value: "1990", sources: ["honda-heritage-nsx"] },
      { label: "Layout", value: "Mid-engine, rear-wheel drive", sources: ["honda-heritage-nsx"] },
      { label: "Body", value: "All-aluminium monocoque", sources: ["honda-heritage-nsx"] },
    ],
    details: [
      { label: "Built", value: "1990–2005", sources: ["wikipedia-nsx-first-generation"] },
      { label: "Factory", value: "Tochigi, Japan", sources: ["honda-heritage-nsx"] },
      { label: "North America", value: "Sold as the Acura NSX from November 1990", sources: ["wikipedia-nsx-first-generation"] },
    ],
    history: [
      {
        text: "Sales in Japan began in September 1990, the day after a press conference. Honda built the car at a dedicated plant in Tochigi, completed in May 1990.",
        sources: ["honda-heritage-nsx"],
      },
      {
        text: "Honda chose aluminium for the monocoque, making the NSX the first mass-production car with an all-aluminium monocoque body. In North America it was sold as the Acura NSX.",
        sources: ["honda-heritage-nsx", "wikipedia-nsx-first-generation"],
      },
    ],
    specs: [
      {
        scope: "3.0-litre cars",
        items: [
          { label: "Engine", value: "2,977 cc C30A V6 with VTEC", sources: ["wikipedia-nsx-first-generation"] },
          { label: "Power", value: "270 hp (201 kW), as listed by the source", sources: ["wikipedia-nsx-first-generation"] },
        ],
      },
      {
        scope: "Manual-transmission cars from 1997",
        items: [{ label: "Engine", value: "3.2-litre C32B V6", sources: ["wikipedia-nsx-first-generation"] }],
      },
    ],
    versions: [
      { name: "NSX-R", period: "1992–1995", description: "A lighter version sold only in Japan; 483 were made.", sources: ["wikipedia-nsx-first-generation"] },
      { name: "NSX-T", period: "From 1995", description: "A version with a removable targa top.", sources: ["wikipedia-nsx-first-generation"] },
      { name: "Fixed-headlamp update", period: "From December 2001", description: "The pop-up headlamps gave way to fixed xenon units.", sources: ["wikipedia-nsx-first-generation"] },
    ],
    photo: {
      src: nsx1991,
      alt: "Red 1991 Honda NSX with a black roof, front three-quarter view on a show lawn",
      focus: "50% 60%",
      creditId: "gallery-honda-nsx-1991",
      depicts: "NSX, 1991",
    },
    gallery: [
      {
        src: nsx1991Rear,
        alt: "Red 1991 Honda NSX seen from the rear three-quarter in a museum, with its full-width tail lamp",
        role: "rear",
        depicts: "NSX, 1991",
        note: "Toyota Automobile Museum",
        creditId: "gallery-honda-nsx-1991-rear",
      },
      {
        src: nsx1990,
        alt: "Black 1990 Honda NSX on display in a museum, side view",
        role: "side",
        depicts: "NSX, 1990",
        note: "Motorcar Museum of Japan",
        creditId: "gallery-honda-nsx-1990",
      },
      {
        src: acuraNsx1991Rear,
        alt: "Red 1991 Acura NSX parked on a street, rear three-quarter view",
        role: "rear",
        depicts: "Acura NSX, 1991",
        note: "Built in Tochigi, Japan",
        creditId: "gallery-acura-nsx-1991-rear",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Launch, aluminium body, layout and factory checked against Honda’s heritage page; engines and variants against a general reference." },
  },
  {
    slug: "toyota-supra-a80",
    name: "Supra (A80)",
    manufacturerSlug: "toyota",
    generation: "A80",
    aliases: ["JZA80", "2JZ"],
    kind: "Sports coupé",
    categories: [],
    summary: "The fourth-generation Supra, with a naturally aspirated or sequentially twin-turbocharged 3.0-litre straight-six.",
    facts: [
      { label: "Production from", value: "1993", sources: ["wikipedia-toyota-supra"] },
      { label: "Engine", value: "3.0-litre straight-six", sources: ["wikipedia-toyota-supra"] },
      { label: "Body", value: "Liftback coupé, targa top available", sources: ["wikipedia-toyota-supra"] },
    ],
    details: [
      { label: "Built", value: "April 1993 to August 2002, in Japan", sources: ["wikipedia-toyota-supra"] },
      { label: "Withdrawn", value: "From Canada in 1996, the US in 1998", sources: ["wikipedia-toyota-supra"] },
    ],
    history: [
      {
        text: "Mass production of the fourth-generation Supra began in April 1993 and continued in Japan until August 2002.",
        sources: ["wikipedia-toyota-supra"],
      },
      {
        text: "Turbocharged versions used the twin-turbo 2JZ-GTE engine and a six-speed Getrag/Toyota V160 gearbox. The car was withdrawn from Canada in 1996 and from the United States in 1998.",
        sources: ["wikipedia-toyota-supra"],
      },
    ],
    specs: [
      {
        scope: "2JZ-GE, naturally aspirated",
        items: [{ label: "Power", value: "164 kW (223 PS)", sources: ["wikipedia-toyota-supra"] }],
      },
      {
        scope: "2JZ-GTE twin turbo, by market",
        items: [
          { label: "Japan", value: "206 kW (280 PS)", sources: ["wikipedia-toyota-supra"] },
          { label: "United States", value: "239 kW (325 PS) at 5,600 rpm", sources: ["wikipedia-toyota-supra"] },
          { label: "Europe", value: "243 kW (330 PS)", sources: ["wikipedia-toyota-supra"] },
          { label: "Gearbox", value: "Six-speed Getrag/Toyota V160", sources: ["wikipedia-toyota-supra"] },
        ],
      },
    ],
    coverageNote: "Facts come from a general reference; a Toyota source for this generation has not yet been located.",
    photo: {
      src: supraRz1993,
      alt: "Silver 1993 Toyota Supra RZ on museum display, front three-quarter view with its rear wing",
      focus: "50% 60%",
      creditId: "gallery-toyota-supra-rz-1993",
      depicts: "Supra RZ, 1993",
    },
    gallery: [
      {
        src: supraSzRear,
        alt: "Red Toyota Supra SZ of the A80 generation in a car park, rear three-quarter view with its round tail lamps",
        role: "rear",
        depicts: "Supra SZ (A80)",
        creditId: "gallery-toyota-supra-sz-rear",
      },
      {
        src: supraRzSInterior,
        alt: "Right-hand-drive cockpit of a Toyota Supra RZ-S, with the centre console angled towards the driver",
        role: "interior",
        depicts: "Supra RZ-S interior, 1995",
        creditId: "gallery-toyota-supra-rz-s-interior",
      },
      {
        src: supraRzSInstruments,
        alt: "Three round instrument dials of a Toyota Supra RZ-S, with the rev counter in the centre",
        role: "detail",
        depicts: "Supra RZ-S instruments, 1995",
        creditId: "gallery-toyota-supra-rz-s-instruments",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Production dates, engines, gearbox and market withdrawal checked against a general reference only." },
  },
  {
    slug: "mazda-mx-5-na",
    name: "MX-5 (first generation)",
    manufacturerSlug: "mazda",
    generation: "NA",
    aliases: ["Miata", "MX-5 Miata", "Eunos Roadster"],
    kind: "Two-seat roadster",
    categories: ["classic"],
    summary: "A light, front-engined, rear-drive two-seater developed around the idea of ‘Jinba Ittai’: horse and rider as one.",
    facts: [
      { label: "Unveiled", value: "1989", sources: ["mazda-au-mx5-30", "wikipedia-mx5-na"] },
      { label: "Layout", value: "Front engine, rear-wheel drive", sources: ["wikipedia-mx5-na"] },
      { label: "Engine", value: "1.6-litre four-cylinder", sources: ["mazda-au-mx5-30", "wikipedia-mx5-na"] },
    ],
    details: [
      { label: "Built", value: "1989–1997", sources: ["mazda-au-mx5-30", "wikipedia-mx5-na"] },
      { label: "Market names", value: "Eunos Roadster in Japan; MX-5 Miata in North America", sources: ["wikipedia-mx5-na"] },
    ],
    history: [
      {
        text: "The MX-5 was unveiled at the Chicago Auto Show on 10 February 1989. Mazda describes the aim with the Japanese phrase ‘Jinba Ittai’, horse and rider as one.",
        sources: ["wikipedia-mx5-na", "mazda-au-mx5-30"],
      },
      {
        text: "The first generation, with retractable headlamps, was built from 1989 to 1997; a 1.8-litre engine joined the range for the 1994 model year. In 2000 the Guinness Book of Records first listed the MX-5 as the world’s best-selling two-seater convertible sports car.",
        sources: ["mazda-au-mx5-30", "wikipedia-mx5-na"],
      },
    ],
    specs: [
      {
        scope: "1.6-litre cars",
        items: [
          { label: "Engine", value: "1,597 cc B6ZE(RS) four-cylinder, twin overhead camshafts", sources: ["wikipedia-mx5-na"] },
          { label: "Power", value: "86 kW (115 bhp) at 6,500 rpm, as listed by the source", sources: ["wikipedia-mx5-na"] },
        ],
      },
      {
        scope: "1.8-litre cars, from the 1994 model year",
        items: [{ label: "Engine", value: "1,839 cc BP-ZE four-cylinder", sources: ["wikipedia-mx5-na"] }],
      },
    ],
    coverageNote: "This record covers the first generation; later MX-5s are not yet in the archive.",
    photo: {
      src: mx5Na,
      alt: "Red first-generation Mazda MX-5 with its pop-up headlamps raised, parked at a classic car meeting",
      focus: "50% 60%",
      creditId: "gallery-mazda-mx-5-na",
      depicts: "MX-5 (NA)",
    },
    gallery: [
      {
        src: mx5NaInterior,
        alt: "Interior of a first-generation Mazda MX-5 seen over the door: steering wheel, round dials and a short gear lever",
        role: "interior",
        depicts: "MX-5 (NA) interior",
        creditId: "gallery-mazda-mx-5-na-interior",
      },
      {
        src: eunosRoadster1989,
        alt: "Blue 1989 Eunos Roadster on display in a showroom, front three-quarter view",
        role: "front",
        depicts: "Eunos Roadster (NA), 1989",
        creditId: "gallery-eunos-roadster-1989",
      },
      {
        src: eunosRoadsterRearLight,
        alt: "Close view of a blue Eunos Roadster’s rounded tail lamp and Eunos badge",
        role: "detail",
        depicts: "Eunos Roadster (NA) tail lamp, 1989",
        creditId: "gallery-eunos-roadster-1989-rear-light",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Unveiling, engine size, production span and Guinness listing checked against Mazda Australia; date, names and engines against a general reference." },
  },
  {
    slug: "tesla-model-s",
    name: "Model S",
    manufacturerSlug: "tesla",
    aliases: ["P85", "P85D"],
    kind: "Electric liftback saloon",
    categories: ["electric"],
    summary: "A battery-electric four-door liftback, built at Tesla’s Fremont factory from 2012.",
    facts: [
      { label: "Production from", value: "2012", sources: ["wikipedia-model-s"] },
      { label: "Drive", value: "Battery electric", sources: ["wikipedia-model-s", "fueleconomy-2012-tesla"] },
      { label: "Body", value: "Four-door liftback", sources: ["wikipedia-model-s"] },
    ],
    details: [
      { label: "Prototype shown", value: "March 2009", sources: ["wikipedia-model-s"] },
      { label: "Factory", value: "Fremont, California", sources: ["wikipedia-model-s"] },
    ],
    history: [
      {
        text: "Tesla showed a prototype Model S in Hawthorne, California, on 26 March 2009, and series production began at its Fremont factory in June 2012.",
        sources: ["wikipedia-model-s"],
      },
      {
        text: "Early cars had a single rear motor. In 2014 the P85D added a front motor for all-wheel drive.",
        sources: ["wikipedia-model-s"],
      },
    ],
    specs: [
      {
        scope: "2012 model year, as rated by the US EPA",
        items: [
          { label: "Motor", value: "260 kW AC induction", sources: ["fueleconomy-2012-tesla"] },
          { label: "Range", value: "265 miles", sources: ["fueleconomy-2012-tesla"] },
          { label: "Efficiency", value: "89 MPGe combined", sources: ["fueleconomy-2012-tesla"] },
        ],
      },
      {
        scope: "Launch battery options, as listed by the general reference (test cycle not stated)",
        items: [
          { label: "60 kWh", value: "208 miles", sources: ["wikipedia-model-s"] },
          { label: "85 kWh", value: "265 miles", sources: ["wikipedia-model-s"] },
        ],
      },
    ],
    versions: [
      { name: "Single-motor cars", period: "From June 2012", description: "The launch layout, with one rear motor.", sources: ["wikipedia-model-s"] },
      { name: "P85D", period: "From 2014", description: "Added a front motor for all-wheel drive.", sources: ["wikipedia-model-s"] },
    ],
    coverageNote: "This record covers the launch-period cars. Tesla’s own press releases could not be read for this review, and later updates are not yet researched.",
    photo: {
      src: modelS,
      alt: "White Tesla Model S parked in front of a lit building, front three-quarter view",
      focus: "50% 60%",
      creditId: "gallery-tesla-model-s",
      depicts: "Model S",
    },
    gallery: [
      {
        src: modelSFirstDeliveries,
        alt: "A dark red Tesla Model S driving past a crowd inside the Fremont factory during the first customer deliveries",
        role: "archival",
        depicts: "Model S at the first customer deliveries, 2012",
        note: "Fremont factory",
        creditId: "gallery-tesla-model-s-first-deliveries-2012",
      },
      {
        src: modelSScreens2012,
        alt: "Dashboard of a 2012 Tesla Model S: a digital instrument panel behind the wheel and a tall touchscreen in the centre",
        role: "interior",
        depicts: "Model S digital screens, 2012",
        creditId: "gallery-tesla-model-s-2012-screens",
      },
      {
        src: modelSP85,
        alt: "Black 2014 Tesla Model S P85 parked on a street, rear three-quarter view",
        role: "rear",
        depicts: "Model S P85, 2014",
        creditId: "gallery-tesla-model-s-p85-2014",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Range and motor checked against the US government’s fueleconomy.gov; dates, body and layout against a general reference." },
  },
  {
    slug: "toyota-prius-first-generation",
    name: "Prius (first generation)",
    manufacturerSlug: "toyota",
    generation: "XW10",
    aliases: ["NHW10", "NHW11"],
    kind: "Hybrid saloon",
    categories: [],
    summary: "The first mass-produced hybrid passenger car, pairing a petrol engine with two motor-generators.",
    facts: [
      { label: "Launched", value: "1997", sources: ["toyota-75-years-prius"] },
      { label: "Powertrain", value: "Petrol-electric hybrid", sources: ["ieee-prius-milestone"] },
      { label: "Body", value: "Four-door saloon", sources: ["wikipedia-prius-xw10"] },
    ],
    details: [
      { label: "Built", value: "1997–2003", sources: ["wikipedia-prius-xw10"] },
      { label: "World markets", value: "From September 2000, as the NHW11", sources: ["wikipedia-prius-xw10"] },
    ],
    history: [
      {
        text: "Toyota launched the Prius in December 1997 as the world’s first mass-produced hybrid passenger vehicle; sales in Japan began on 10 December.",
        sources: ["toyota-75-years-prius", "wikipedia-prius-xw10"],
      },
      {
        text: "Its series-parallel hybrid system linked the petrol engine and two motor-generators through a planetary gear, a design recognised as an IEEE Milestone in 2024. The first version, the NHW10, was sold only in Japan; the NHW11 took the car to world markets from September 2000.",
        sources: ["ieee-prius-milestone", "wikipedia-prius-xw10"],
      },
    ],
    specs: [
      {
        scope: "NHW10 and NHW11",
        items: [
          { label: "Engine", value: "1.5-litre 1NZ-FXE four-cylinder", sources: ["wikipedia-prius-xw10"] },
          { label: "Hybrid system", value: "Engine and two motor-generators joined by a planetary gear", sources: ["ieee-prius-milestone"] },
        ],
      },
    ],
    versions: [
      { name: "NHW10", period: "From December 1997", description: "The original version, sold only in Japan.", sources: ["wikipedia-prius-xw10"] },
      { name: "NHW11", period: "From September 2000", description: "The updated version, sold in world markets.", sources: ["wikipedia-prius-xw10"] },
    ],
    coverageNote: "This record covers the first generation; later Prius generations are not yet in the archive.",
    photo: {
      src: priusNhw10,
      alt: "Pale blue 1997 Toyota Prius saloon on museum display, front three-quarter view",
      focus: "50% 60%",
      creditId: "gallery-toyota-prius-nhw10-1997",
      depicts: "Prius (NHW10), 1997",
      note: "Toyota Automobile Museum",
    },
    gallery: [
      {
        src: priusCutaway,
        alt: "Cutaway Toyota Prius of the first generation, with body panels removed to show the engine, seats and floor",
        role: "detail",
        depicts: "Prius (NHW10) cutaway",
        creditId: "gallery-toyota-prius-nhw10-cutaway",
      },
      {
        src: priusCutawayEngineBay,
        alt: "Engine bay of a cutaway first-generation Toyota Prius, with Japanese labels marking the engine and the power control unit",
        role: "engine",
        depicts: "Prius (NHW10) cutaway, engine bay",
        creditId: "gallery-toyota-prius-nhw10-cutaway-engine-bay",
      },
      {
        src: priusNhw11Rear,
        alt: "White Toyota Prius S of the NHW11 version parked on a street, rear three-quarter view",
        role: "rear",
        depicts: "Prius S (NHW11)",
        creditId: "gallery-toyota-prius-nhw11-rear",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Launch and world-first claim checked against Toyota’s 75-year history; the hybrid system against the IEEE Milestone record; versions and engine against a general reference." },
  },
];
