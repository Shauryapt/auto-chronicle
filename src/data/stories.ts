import porsche1964 from "@/assets/images/story-porsche-911-1964.jpg";
import citroenDs from "@/assets/images/story-citroen-ds.jpg";
import miuraEngine from "@/assets/images/story-lamborghini-miura-engine.jpg";
import type { Story } from "./types";

/**
 * Editorial threads that run through the archive. Each is a short introduction that leads into an
 * existing entry, not an article: keep every claim to what the linked entry already covers, and
 * add no dates or quotations here.
 */
export const stories: Story[] = [
  {
    slug: "one-silhouette",
    theme: "Evolution",
    title: "How one silhouette outlived every trend",
    dek: "The Porsche 911 has been reworked generation after generation without losing its outline. The 992 entry places the current car in that line, from the 901 of 1963 to its eighth generation.",
    photo: {
      src: porsche1964,
      alt: "Black early Porsche 911 with racing number 18, displayed in a museum",
      focus: "50% 60%",
      creditId: "story-911-1964",
    },
    related: { label: "Read the Porsche 911 (992) entry", href: "/cars/porsche-911-992" },
  },
  {
    slug: "citroen-courage",
    theme: "Design",
    title: "Citroën and the nerve to look different",
    dek: "A French manufacturer that kept choosing the unconventional answer. The DS, with its hydropneumatic suspension, is the clearest case in the archive.",
    photo: {
      src: citroenDs,
      alt: "Dark blue Citroën DS cabriolet parked beside wrought-iron gates",
      focus: "60% 60%",
      creditId: "story-citroen-ds",
    },
    related: { label: "Read the Citroën DS entry", href: "/cars/citroen-ds" },
  },
  {
    slug: "behind-the-driver",
    theme: "Engineering",
    title: "Behind the driver: the mid-engine idea",
    dek: "Moving the engine from the nose to behind the driver changed the balance, proportion and shape of the supercar. The performance age follows the cars that did it.",
    photo: {
      src: miuraEngine,
      alt: "Close view of a Lamborghini Miura's V12 engine, mounted behind the cabin",
      focus: "45% 45%",
      creditId: "story-miura-engine",
    },
    related: { label: "Explore the performance age", href: "/#era-performance" },
  },
];
