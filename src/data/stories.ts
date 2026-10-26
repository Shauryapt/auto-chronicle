import porsche1964 from "@/assets/images/story-porsche-911-1964.jpg";
import citroenDs from "@/assets/images/story-citroen-ds.jpg";
import miuraEngine from "@/assets/images/story-lamborghini-miura-engine.jpg";
import type { Story } from "./types";

/**
 * Illustrative feature outlines. These are not published articles; the UI labels
 * them as features in preparation. Avoid adding dates, quotations or specific
 * claims here until a written, sourced article exists.
 */
export const stories: Story[] = [
  {
    slug: "one-silhouette",
    theme: "Evolution",
    title: "How one silhouette outlived every trend",
    dek: "The Porsche 911 has been reworked generation after generation without losing its outline. We trace what changed underneath, and what was never allowed to.",
    photo: {
      src: porsche1964,
      alt: "Black early Porsche 911 with racing number 18, displayed in a museum",
      focus: "50% 60%",
      creditId: "story-911-1964",
    },
    related: { label: "Porsche 911 (992) in the archive", href: "#car-porsche-911-992" },
  },
  {
    slug: "citroen-courage",
    theme: "Design",
    title: "Citroën and the nerve to look different",
    dek: "Why one French manufacturer kept choosing the unconventional answer, and what the DS says about that habit.",
    photo: {
      src: citroenDs,
      alt: "Dark blue Citroën DS cabriolet parked beside wrought-iron gates",
      focus: "60% 60%",
      creditId: "story-citroen-ds",
    },
    related: { label: "Citroën in the marque index", href: "#marque-citroen" },
  },
  {
    slug: "behind-the-driver",
    theme: "Engineering",
    title: "Behind the driver: the mid-engine idea",
    dek: "Moving the engine from the nose to the middle of the car changed balance, proportion and the shape of the supercar itself.",
    photo: {
      src: miuraEngine,
      alt: "Close view of a Lamborghini Miura's V12 engine, mounted behind the cabin",
      focus: "45% 45%",
      creditId: "story-miura-engine",
    },
    related: { label: "The performance age", href: "#era-performance" },
  },
];
