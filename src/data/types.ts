import type { StaticImageData } from "next/image";
import type { CreditId } from "./image-credits";
import type { LogoCreditId } from "./logo-credits";

export type Region = "Europe" | "Asia" | "North America";

export type CategorySlug =
  | "classic"
  | "supercar"
  | "hypercar"
  | "electric"
  | "concept"
  | "future";

/** A photograph plus the framing hints the layout needs. */
export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position used when the frame crops the photograph. */
  focus?: string;
  /** Key into `imageCredits`, so every rendered photo can be attributed. */
  creditId: CreditId;
};

/** A manufacturer's logo as a local file, shown beside its visible name for identification only. */
export type ManufacturerLogo = {
  src: StaticImageData;
  /**
   * "mono" renders a single-colour logo in ivory to suit the page. "original" keeps the file's own
   * colours, for logos that depend on more than one tone and would be lost as a silhouette.
   */
  tone: "mono" | "original";
  /** Key into `logoCredits`, so every rendered logo has a recorded source. */
  creditId: LogoCreditId;
};

export type Manufacturer = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  /** A short, deliberately general description of what the marque is known for. */
  knownFor: string;
  /** Optional: a marque without a verified, permitted logo file shows its name only. */
  logo?: ManufacturerLogo;
};

export type VehicleFact = {
  label: string;
  value: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  manufacturerSlug: string;
  /** Editorial grouping shown on the card, e.g. "Classic grand tourer". */
  kind: string;
  categories: CategorySlug[];
  summary: string;
  /** Only widely documented, uncontroversial facts. Detailed specifications come later with cited sources. */
  facts: VehicleFact[];
  photo: Photo;
};

export type Era = {
  slug: string;
  period: string;
  title: string;
  description: string;
  photo: Photo;
  photoCaption: string;
};

export type Story = {
  slug: string;
  theme: "Evolution" | "Design" | "Engineering";
  title: string;
  dek: string;
  photo: Photo;
  related: { label: string; href: string };
};

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type ImageCredit = {
  id: string;
  subject: string;
  file: string;
  sourceUrl: string;
  creator: string;
  license: string;
  licenseUrl: string;
};

export type LogoCredit = {
  id: string;
  manufacturer: string;
  /** Local file, relative to the project root. */
  file: string;
  /** Title of the source file on Wikimedia Commons. */
  sourceFile: string;
  sourceUrl: string;
  /** Author or rights holder as given on the source page. */
  creator: string;
  /** Copyright status as recorded on the source page. */
  license: string;
  licenseUrl: string;
  /** Trademark status and any other conditions noted on the source page. */
  restrictions: string;
};
