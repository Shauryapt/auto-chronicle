import eType from "@/assets/images/car-jaguar-e-type-series-1.jpg";
import porsche992 from "@/assets/images/car-porsche-911-992.jpg";
import golfMk1 from "@/assets/images/car-volkswagen-golf-mk1.jpg";
import taycan from "@/assets/images/car-porsche-taycan.jpg";
import type { Vehicle } from "./types";

/**
 * Sample archive entries. Facts are limited to widely documented basics
 * (introduction year, layout, body style). Detailed specifications and
 * performance figures will be added later alongside cited sources.
 */
export const vehicles: Vehicle[] = [
  {
    slug: "jaguar-e-type-series-1",
    name: "E-Type Series 1",
    manufacturerSlug: "jaguar",
    kind: "Classic grand tourer",
    categories: ["classic"],
    summary: "A long bonnet, a low roofline and a straight-six beneath: one of the most recognisable shapes in motoring.",
    facts: [
      { label: "Introduced", value: "1961" },
      { label: "Layout", value: "Front engine, rear-wheel drive" },
      { label: "Bodies", value: "Coupé and roadster" },
    ],
    photo: {
      src: eType,
      alt: "Pale blue Jaguar E-Type Series 1 coupé in side profile, parked on a town street",
      focus: "50% 70%",
      creditId: "car-e-type",
    },
  },
  {
    slug: "porsche-911-992",
    name: "911 (992 generation)",
    manufacturerSlug: "porsche",
    kind: "Modern performance coupé",
    categories: [],
    summary: "The eighth generation of a rear-engined shape that has been refined rather than replaced for decades.",
    facts: [
      { label: "Unveiled", value: "2018" },
      { label: "Layout", value: "Rear engine, flat-six" },
      { label: "Bodies", value: "Coupé, cabriolet and Targa" },
    ],
    photo: {
      src: porsche992,
      alt: "White Porsche 911 Carrera S of the 992 generation seen from the rear three-quarter angle",
      focus: "22% 60%",
      creditId: "car-911-992",
    },
  },
  {
    slug: "volkswagen-golf-mk1",
    name: "Golf Mk1",
    manufacturerSlug: "volkswagen",
    kind: "Everyday hatchback",
    categories: ["classic"],
    summary: "A square-cut, front-wheel-drive hatchback that helped define the compact family car.",
    facts: [
      { label: "Introduced", value: "1974" },
      { label: "Layout", value: "Front engine, front-wheel drive" },
      { label: "Bodies", value: "Hatchback and cabriolet" },
    ],
    photo: {
      src: golfMk1,
      alt: "White first-generation Volkswagen Golf hatchback parked under a covered car park",
      focus: "35% 60%",
      creditId: "car-golf-mk1",
    },
  },
  {
    slug: "porsche-taycan",
    name: "Taycan",
    manufacturerSlug: "porsche",
    kind: "Electric performance saloon",
    categories: ["electric"],
    summary: "A battery-electric four-door that brought a sports-car maker's priorities to an electric drivetrain.",
    facts: [
      { label: "Unveiled", value: "2019" },
      { label: "Drive", value: "Battery electric" },
      { label: "Electrics", value: "800-volt architecture" },
    ],
    photo: {
      src: taycan,
      alt: "White Porsche Taycan Turbo S displayed on a lit stand at a motor show",
      focus: "45% 55%",
      creditId: "car-taycan",
    },
  },
];
