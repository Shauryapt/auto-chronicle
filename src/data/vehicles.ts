import eType from "@/assets/images/car-jaguar-e-type-series-1.jpg";
import porsche992 from "@/assets/images/car-porsche-911-992.jpg";
import golfMk1 from "@/assets/images/car-volkswagen-golf-mk1.jpg";
import taycan from "@/assets/images/car-porsche-taycan.jpg";
import eTypeRoadster1961 from "@/assets/images/car-jaguar-e-type-series-1-roadster-1961.jpg";
import eTypeDashboard from "@/assets/images/car-jaguar-e-type-series-1-dashboard.jpg";
import eTypeEngine from "@/assets/images/car-jaguar-e-type-series-1-engine.jpg";
import eTypeCoupeRear from "@/assets/images/car-jaguar-e-type-series-1-coupe-rear.jpg";
import p992Cockpit from "@/assets/images/car-porsche-911-992-cockpit.jpg";
import p992Front from "@/assets/images/car-porsche-911-992-front.jpg";
import p992Targa from "@/assets/images/car-porsche-911-992-targa.jpg";
import golfMuseum from "@/assets/images/car-volkswagen-golf-mk1-museum.jpg";
import golfInterior from "@/assets/images/car-volkswagen-golf-mk1-interior.jpg";
import golfRear from "@/assets/images/car-volkswagen-golf-mk1-rear.jpg";
import golfCabriolet from "@/assets/images/car-volkswagen-golf-mk1-cabriolet.jpg";
import taycanRear from "@/assets/images/car-porsche-taycan-rear.jpg";
import taycanCockpit from "@/assets/images/car-porsche-taycan-cockpit.jpg";
import taycanTurboS2020 from "@/assets/images/car-porsche-taycan-turbo-s-2020.jpg";
import type { Vehicle } from "./types";
import { archiveVehicles } from "./vehicles-archive";

const REVIEWED = "2026-10-26";

/**
 * Archive entries. Every fact cites a record in `sources.ts`; anything not found in a source
 * is left out rather than estimated. Values that differ between engines, bodies or launch
 * models sit in a `specs` group whose scope says exactly which cars they describe.
 */
const featured: Vehicle[] = [
  {
    slug: "jaguar-e-type-series-1",
    featured: true,
    name: "E-Type Series 1",
    manufacturerSlug: "jaguar",
    kind: "Classic grand tourer",
    categories: ["classic"],
    summary: "A long bonnet, a low roofline and a straight-six beneath: one of the most recognisable shapes in motoring.",
    facts: [
      { label: "Introduced", value: "1961", sources: ["jlr-e-type-60"] },
      { label: "Layout", value: "Front engine, rear-wheel drive", sources: ["wikipedia-e-type"] },
      { label: "Bodies", value: "Coupé and roadster", sources: ["jlr-e-type-60"] },
    ],
    details: [
      { label: "Series 1 built", value: "1961–1968", sources: ["wikipedia-e-type"] },
      { label: "2+2 coupé", value: "Added in 1966", sources: ["wikipedia-e-type"] },
    ],
    history: [
      {
        text: "The E-Type made its world debut at the Geneva Motor Show on 15 March 1961, shown as a fixed-head coupé and a roadster with Jaguar’s 3.8-litre six-cylinder XK engine.",
        sources: ["jlr-e-type-60"],
      },
      {
        text: "Series 1 cars were built until 1968. The engine grew to 4.2 litres in October 1964, when an all-synchromesh four-speed gearbox replaced the earlier Moss unit, and a 2+2 version of the coupé joined the range in 1966.",
        sources: ["wikipedia-e-type"],
      },
    ],
    specs: [
      {
        scope: "3.8-litre cars, 1961 to October 1964",
        items: [
          { label: "Engine", value: "3.8-litre six-cylinder Jaguar XK, triple SU carburettors", sources: ["jlr-e-type-60", "wikipedia-e-type"] },
          { label: "Gearbox", value: "Moss four-speed manual", sources: ["wikipedia-e-type"] },
        ],
      },
      {
        scope: "4.2-litre cars, from October 1964",
        items: [
          { label: "Engine", value: "4.2-litre (4,235 cc) six-cylinder", sources: ["wikipedia-e-type"] },
          { label: "Gearbox", value: "All-synchromesh Jaguar four-speed manual", sources: ["wikipedia-e-type"] },
        ],
      },
    ],
    versions: [
      {
        name: "Fixed-head coupé and roadster",
        period: "1961–1968",
        description: "The two launch bodies, both two-seaters, shown together at Geneva in March 1961.",
        sources: ["jlr-e-type-60", "wikipedia-e-type"],
      },
      {
        name: "2+2 coupé",
        period: "From 1966",
        description: "A 2+2 version of the fastback coupé, added to the Series 1 range.",
        sources: ["wikipedia-e-type"],
      },
    ],
    coverageNote: "This record covers the Series 1 only. Later E-Type series are not yet in the archive.",
    photo: {
      src: eType,
      alt: "Pale blue Jaguar E-Type Series 1 coupé in side profile, parked on a town street",
      focus: "50% 70%",
      creditId: "car-e-type",
      depicts: "Series 1 coupé, 1964",
    },
    gallery: [
      {
        src: eTypeRoadster1961,
        alt: "Dark green Jaguar E-Type Series 1 roadster with its hood folded, seen from the front three-quarter in a museum hall",
        role: "front",
        depicts: "Series 1 3.8-litre roadster, 1961",
        note: "Registered 77 RW, on loan to the Jaguar Heritage Collection at the British Motor Museum",
        creditId: "gallery-e-type-roadster-1961",
      },
      {
        src: eTypeDashboard,
        alt: "Dashboard of a red Jaguar E-Type Series 1 roadster: a wood-rimmed steering wheel in front of a row of dials and toggle switches",
        role: "interior",
        depicts: "Series 1 roadster dashboard, 1967",
        creditId: "gallery-e-type-dashboard",
      },
      {
        src: eTypeEngine,
        alt: "Polished six-cylinder engine of a Jaguar E-Type Series 1, with its carburettors and cam covers, under the open bonnet",
        role: "engine",
        depicts: "Series 1 roadster engine, 4,235 cc, 1968",
        creditId: "gallery-e-type-engine",
      },
      {
        src: eTypeCoupeRear,
        alt: "Dark blue Jaguar E-Type Series 1 fixed-head coupé seen from the rear three-quarter on a show lawn",
        focus: "40% 60%",
        role: "rear",
        depicts: "Series 1 4.2-litre coupé, 1965",
        creditId: "gallery-e-type-coupe-rear",
      },
    ],
    // The car fills the lower half of a tall street scene; on wide screens trim the shop front above it.
    intro: { context: ["Series 1 built"], wideCrop: { ratio: 2.6, position: "50% 88%" } },
    review: { reviewed: REVIEWED, scope: "Launch, production span, layout, bodies and engines checked against the sources below." },
  },
  {
    slug: "porsche-911-992",
    featured: true,
    name: "911 (992 generation)",
    manufacturerSlug: "porsche",
    kind: "Modern performance coupé",
    categories: [],
    summary: "The eighth generation of a rear-engined shape that has been refined rather than replaced for decades.",
    facts: [
      { label: "Unveiled", value: "2018", sources: ["porsche-newsroom-992-alps", "wikipedia-porsche-992"] },
      { label: "Layout", value: "Rear engine, flat-six", sources: ["wikipedia-porsche-992"] },
      { label: "Bodies", value: "Coupé, cabriolet and Targa", sources: ["wikipedia-porsche-992"] },
    ],
    details: [
      { label: "Generation", value: "Eighth generation of the 911", sources: ["porsche-newsroom-992-alps"] },
      { label: "Production", value: "From 2019", sources: ["wikipedia-porsche-992"] },
    ],
    history: [
      {
        text: "Porsche first presented the 911 in 1963, under the name 901, and began series production in 1964.",
        sources: ["porsche-heritage"],
      },
      {
        text: "The eighth generation, type 992, had its world premiere in Los Angeles in November 2018, on the eve of the city’s motor show. Coupé and cabriolet versions of the Carrera S and Carrera 4S came first; the Targa body followed on 18 May 2020.",
        sources: ["porsche-newsroom-992-alps", "wikipedia-porsche-992"],
      },
    ],
    versions: [
      {
        name: "Carrera S and Carrera 4S",
        period: "Premiere November 2018",
        description: "The launch models, presented as rear-wheel-drive and all-wheel-drive versions, in coupé and cabriolet form.",
        sources: ["porsche-newsroom-992-alps"],
      },
      {
        name: "Targa",
        period: "From May 2020",
        description: "The Targa body style for the 992 generation, premiered on Porsche’s web-TV channel.",
        sources: ["wikipedia-porsche-992"],
      },
      {
        name: "Refresh for the 2025 model year",
        period: "From May 2024",
        description: "An update to the 992 generation, launched on 28 May 2024.",
        sources: ["wikipedia-porsche-992"],
      },
    ],
    coverageNote: "This record covers the 992 generation. Earlier 911 generations are not yet in the archive, and performance figures are held back until they can be tied to a specific version.",
    photo: {
      src: porsche992,
      alt: "White Porsche 911 Carrera S of the 992 generation seen from the rear three-quarter angle",
      focus: "22% 60%",
      creditId: "car-911-992",
      depicts: "911 Carrera S, 992 generation",
    },
    gallery: [
      {
        src: p992Front,
        alt: "Silver Porsche 911 Carrera S of the 992 generation, front three-quarter view on a show lawn",
        focus: "50% 60%",
        role: "front",
        depicts: "911 Carrera S, 992 generation, 2019",
        creditId: "gallery-911-992-front",
      },
      {
        src: p992Cockpit,
        alt: "Driver’s view of a Porsche 911 (992) cockpit: a leather steering wheel, a central analogue rev counter flanked by screens, and a short gear selector",
        role: "interior",
        depicts: "911 cockpit, 992 generation",
        creditId: "gallery-911-992-cockpit",
      },
      {
        src: p992Targa,
        alt: "Grey Porsche 911 Targa 4S of the 992 generation parked on a city street, seen from the rear three-quarter with its roof bar",
        role: "rear",
        depicts: "911 Targa 4S, 992 generation, 2021",
        creditId: "gallery-911-992-targa",
      },
    ],
    intro: { context: ["Generation", "Production"] },
    review: { reviewed: REVIEWED, scope: "Premiere, production start, layout, body styles and the 2024 update checked against the sources below." },
  },
  {
    slug: "volkswagen-golf-mk1",
    featured: true,
    name: "Golf Mk1",
    manufacturerSlug: "volkswagen",
    kind: "Everyday hatchback",
    categories: ["classic"],
    summary: "A square-cut, front-wheel-drive hatchback that helped define the compact family car.",
    facts: [
      { label: "Introduced", value: "1974", sources: ["vw-newsroom-golf-45"] },
      { label: "Layout", value: "Front engine, front-wheel drive", sources: ["vw-newsroom-golf-1"] },
      { label: "Bodies", value: "Hatchback and cabriolet", sources: ["vw-newsroom-golf-1"] },
    ],
    details: [
      { label: "First generation", value: "1974–1983", sources: ["vw-newsroom-golf-1"] },
      { label: "Design", value: "Giorgetto Giugiaro with Volkswagen", sources: ["vw-newsroom-golf-1"] },
    ],
    history: [
      {
        text: "Series production of the first Golf began at Volkswagen’s Wolfsburg plant on 29 March 1974, and the car was in dealer showrooms from 8 July that year.",
        sources: ["vw-newsroom-golf-45"],
      },
      {
        text: "Designed by Giorgetto Giugiaro with Volkswagen, it succeeded the rear-engined Beetle and took the brand into front-engine, front-wheel-drive cars.",
        sources: ["vw-newsroom-golf-1", "vw-newsroom-golf-45"],
      },
    ],
    specs: [
      {
        scope: "Launch cars, 1974",
        items: [
          { label: "Drive", value: "Front-wheel drive", sources: ["vw-newsroom-golf-45"] },
          { label: "Gearbox", value: "Four-speed manual", sources: ["vw-newsroom-golf-45"] },
        ],
      },
    ],
    versions: [
      {
        name: "Golf I",
        period: "1974–1983",
        description: "The first-generation hatchback.",
        sources: ["vw-newsroom-golf-1"],
      },
      {
        name: "Golf I GTI",
        period: "1976–1983",
        description: "The performance version of the first generation.",
        sources: ["vw-newsroom-golf-1"],
      },
      {
        name: "Golf I Cabriolet",
        period: "1979–1993",
        description: "The convertible, which stayed in production well after the hatchback was replaced.",
        sources: ["vw-newsroom-golf-1"],
      },
    ],
    photo: {
      src: golfMk1,
      alt: "White first-generation Volkswagen Golf hatchback parked under a covered car park",
      focus: "35% 60%",
      creditId: "car-golf-mk1",
      depicts: "First-generation Golf hatchback",
    },
    gallery: [
      {
        src: golfMuseum,
        alt: "Red first-generation Volkswagen Golf hatchback with black bumpers, front three-quarter view on a museum floor",
        focus: "35% 60%",
        role: "front",
        depicts: "First-generation Golf hatchback",
        note: "On museum display",
        creditId: "gallery-golf-mk1-museum",
      },
      {
        src: golfInterior,
        alt: "Driver’s side of a first-generation Volkswagen Golf interior: a thin-rimmed steering wheel, round dials and brown trim",
        role: "interior",
        depicts: "First-generation Golf interior",
        note: "Volkswagen Automuseum, Wolfsburg",
        creditId: "gallery-golf-mk1-interior",
      },
      {
        src: golfRear,
        alt: "Red first-generation Volkswagen Golf seen squarely from behind, showing its upright tailgate and rectangular rear lights",
        role: "rear",
        depicts: "First-generation Golf hatchback",
        note: "Mariehamn, Åland",
        creditId: "gallery-golf-mk1-rear",
      },
      {
        src: golfCabriolet,
        alt: "Pale blue first-generation Volkswagen Golf Cabriolet in side profile with its black soft top raised",
        role: "side",
        depicts: "First-generation Golf Cabriolet",
        note: "Taipei",
        creditId: "gallery-golf-mk1-cabriolet",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Production start, layout, design credit and variant dates checked against Volkswagen’s newsroom." },
  },
  {
    slug: "porsche-taycan",
    featured: true,
    name: "Taycan",
    manufacturerSlug: "porsche",
    kind: "Electric performance saloon",
    categories: ["electric"],
    summary: "A battery-electric four-door that brought a sports-car maker's priorities to an electric drivetrain.",
    facts: [
      { label: "Unveiled", value: "2019", sources: ["porsche-newsroom-taycan-premiere"] },
      { label: "Drive", value: "Battery electric", sources: ["porsche-newsroom-taycan-premiere"] },
      { label: "Electrics", value: "800-volt architecture", sources: ["porsche-newsroom-taycan-premiere"] },
    ],
    details: [
      { label: "World premiere", value: "4 September 2019", sources: ["porsche-newsroom-taycan-premiere"] },
      { label: "Built in", value: "Zuffenhausen", sources: ["porsche-heritage"] },
    ],
    history: [
      {
        text: "Porsche presented the Taycan, its first fully electric sports car, on 4 September 2019, in a premiere held simultaneously in North America, China and Europe.",
        sources: ["porsche-newsroom-taycan-premiere"],
      },
      {
        text: "It was the first production vehicle with an 800-volt system voltage. Production began at Porsche’s Zuffenhausen site the same year.",
        sources: ["porsche-newsroom-taycan-premiere", "porsche-heritage"],
      },
    ],
    specs: [
      {
        scope: "Launch models: Taycan Turbo S and Taycan Turbo, 2019",
        items: [
          { label: "Electric motors", value: "Two, one on each axle", sources: ["porsche-newsroom-taycan-premiere"] },
          { label: "Transmission", value: "Two-speed, on the rear axle", sources: ["porsche-newsroom-taycan-premiere"] },
          { label: "System voltage", value: "800 volts", sources: ["porsche-newsroom-taycan-premiere"] },
        ],
      },
    ],
    versions: [
      {
        name: "Taycan Turbo S and Taycan Turbo",
        period: "2019",
        description: "The first models in the series, presented at the world premiere.",
        sources: ["porsche-newsroom-taycan-premiere"],
      },
    ],
    coverageNote: "Later Taycan models and body styles are not yet in the archive.",
    photo: {
      src: taycan,
      alt: "White Porsche Taycan Turbo S displayed on a lit stand at a motor show",
      focus: "45% 55%",
      creditId: "car-taycan",
      depicts: "Taycan Turbo S, IAA Frankfurt 2019",
    },
    gallery: [
      {
        src: taycanRear,
        alt: "White Porsche Taycan Turbo S on a motor show stand, seen from the rear three-quarter with its full-width light bar",
        role: "rear",
        depicts: "Taycan Turbo S, 2019",
        note: "IAA Frankfurt, September 2019",
        creditId: "gallery-taycan-rear",
      },
      {
        src: taycanCockpit,
        alt: "Driver’s view of a Porsche Taycan Turbo cockpit: a curved digital instrument display behind the wheel and a touchscreen on the centre console",
        role: "interior",
        depicts: "Taycan Turbo cockpit",
        creditId: "gallery-taycan-cockpit",
      },
      {
        src: taycanTurboS2020,
        alt: "Pale grey Porsche Taycan Turbo S parked on grass among other cars, front three-quarter view",
        focus: "50% 60%",
        role: "front",
        depicts: "Taycan Turbo S, 2020",
        creditId: "gallery-taycan-turbo-s-2020",
      },
    ],
    review: { reviewed: REVIEWED, scope: "Premiere, drivetrain and launch-model details checked against Porsche’s newsroom and heritage pages." },
  },
];

/** Every record in the archive: the four featured cars first, then the wider archive. */
export const vehicles: Vehicle[] = [...featured, ...archiveVehicles];

/** The cars shown in the homepage's featured section. */
export const featuredVehicles = vehicles.filter((v) => v.featured);

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getVehiclesByManufacturer(manufacturerSlug: string): Vehicle[] {
  return vehicles.filter((v) => v.manufacturerSlug === manufacturerSlug);
}
