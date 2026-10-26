import modelT from "@/assets/images/era-ford-model-t.jpg";
import beetle from "@/assets/images/era-volkswagen-beetle.jpg";
import countach from "@/assets/images/era-lamborghini-countach.jpg";
import charging from "@/assets/images/era-electric-charging.jpg";
import type { Era } from "./types";

/** Broad periods, described cautiously. Exact milestones will be added with sources. */
export const eras: Era[] = [
  {
    slug: "pioneers",
    period: "1880s – 1910s",
    title: "The pioneers",
    description:
      "Engineers turned the horseless carriage into a practical machine, and assembly-line production began to put cars within reach of ordinary buyers.",
    photo: {
      src: modelT,
      alt: "Black Ford Model T with a folding fabric top and wooden-spoked wheels",
      focus: "55% 60%",
      creditId: "era-model-t",
    },
    photoCaption: "Ford Model T, 1915",
  },
  {
    slug: "post-war",
    period: "1940s – 1960s",
    title: "Mass motoring",
    description:
      "After the war, small and affordable cars carried families across rebuilt road networks, while new sports cars showed what peacetime engineering could do.",
    photo: {
      src: beetle,
      alt: "Dark grey early Volkswagen Beetle displayed in a dim museum hall beside a vintage motorcycle",
      focus: "40% 55%",
      creditId: "era-beetle",
    },
    photoCaption: "Volkswagen Beetle, 1953",
  },
  {
    slug: "performance",
    period: "1960s – 1990s",
    title: "The performance age",
    description:
      "Mid-engined layouts, wedge-shaped design and rising power output produced the cars that came to define the word supercar.",
    photo: {
      src: countach,
      alt: "Silver Lamborghini Countach LP400 with its sharp wedge profile, on a white museum floor",
      focus: "38% 60%",
      creditId: "era-countach",
    },
    photoCaption: "Lamborghini Countach LP400, 1976",
  },
  {
    slug: "electric",
    period: "2010s – present",
    title: "The electric transition",
    description:
      "Battery-electric drivetrains moved from niche to mainstream, changing how cars are packaged, refuelled and judged.",
    photo: {
      src: charging,
      alt: "White electric hatchback connected to a public charging point in a car park",
      focus: "88% 60%",
      creditId: "era-charging",
    },
    photoCaption: "Public charging point, Cologne",
  },
];
