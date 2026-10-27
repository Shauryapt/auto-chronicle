import type { StaticImageData } from "next/image";
import type { CreditId } from "./image-credits";
import type { LogoCreditId } from "./logo-credits";
import type { SourceId } from "./sources";

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
  /**
   * The exact variant shown, as stated on the image's source page, e.g. "Series 1 3.8-litre roadster, 1961".
   * Required for gallery images so a different generation or trim is never passed off as the page's subject.
   */
  depicts?: string;
  /** Optional context for the caption, such as where the photograph was taken. */
  note?: string;
};

export type GalleryRole = "exterior" | "front" | "rear" | "side" | "interior" | "engine" | "detail" | "archival";

/** A photograph in a car's gallery. The car's main `photo` leads the gallery; these follow it. */
export type GalleryImage = Photo & {
  role: GalleryRole;
  depicts: string;
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

/** A factual statement and the sources that support it. An empty list is not allowed by convention: omit the claim instead. */
export type Sourced = {
  sources: SourceId[];
};

/** A paragraph of editorial history. Every paragraph cites at least one source. */
export type HistoryParagraph = Sourced & {
  text: string;
};

/** A dated event on a manufacturer timeline. `year` is a display string so ranges or months can be kept as written. */
export type Milestone = Sourced & {
  year: string;
  text: string;
};

/**
 * Present when a record's facts have been checked against its cited sources. Records without
 * it are directory entries only, and their pages say so instead of implying a full profile.
 */
export type Review = {
  /** ISO date the cited facts were last checked. */
  reviewed: string;
  /** What the review covered and what it did not, in one or two plain sentences. */
  scope: string;
};

export type Manufacturer = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  /** A short, deliberately general description of what the marque is known for. Directory copy, not a sourced claim. */
  knownFor: string;
  /** Optional: a marque without a verified, permitted logo file shows its name only. */
  logo?: ManufacturerLogo;
  /** Sourced one-sentence introduction for the profile page. Falls back to `knownFor`. */
  intro?: HistoryParagraph;
  /** Year of foundation, with a short qualifier where "founded" needs explaining (for example, an engineering office). */
  founded?: Sourced & { year: string; note?: string };
  history?: HistoryParagraph[];
  milestones?: Milestone[];
  /** A licensed local photograph for the profile hero, with a short caption naming the car. */
  heroPhoto?: Photo & { caption: string };
  review?: Review;
};

export type VehicleFact = Sourced & {
  label: string;
  value: string;
};

/** Specifications that apply only to a stated scope, such as one engine or the launch models. */
export type SpecGroup = {
  /** Which cars the values apply to, written so a reader cannot mistake it for the whole model. */
  scope: string;
  items: VehicleFact[];
};

/** A generation, series phase or variant within a vehicle record, in chronological order. */
export type VehicleVersion = Sourced & {
  name: string;
  /** Display period, e.g. "1961–1964" or "From October 1964". Omitted when not verified. */
  period?: string;
  description: string;
};

/**
 * Opt-in title sequence at the top of a car page, built from the record's own lead photograph and
 * sourced facts, so it can never state anything the page does not.
 */
export type VehicleIntro = {
  /** Labels of entries in `facts` or `details`, shown in order beneath the name. A label not found is skipped. */
  context: string[];
  /**
   * Wide-screen framing for a photograph with room to spare around the car: the crop's width-to-height
   * ratio and the CSS object-position to keep. The crop must leave the whole car in view. Narrow
   * screens always show the whole photograph.
   */
  wideCrop?: { ratio: number; position: string };
};

export type Vehicle = {
  slug: string;
  /** Display name: the model, with the generation in brackets where the record covers one generation. */
  name: string;
  manufacturerSlug: string;
  /** The maker's own generation or series code, such as "W198" or "NA", when a source uses one. */
  generation?: string;
  /** Other names the car is known by, each found in a cited source. Used by search, not shown as fact. */
  aliases?: string[];
  /** Shown in the homepage's featured-cars section. Every record stays reachable through search and its manufacturer. */
  featured?: boolean;
  /** Editorial grouping shown on the card, e.g. "Classic grand tourer". */
  kind: string;
  categories: CategorySlug[];
  summary: string;
  /** Headline facts shown on cards and at the top of the detail page. Widely documented basics only, each sourced. */
  facts: VehicleFact[];
  /** Further key facts shown only on the detail page. */
  details?: VehicleFact[];
  history?: HistoryParagraph[];
  specs?: SpecGroup[];
  versions?: VehicleVersion[];
  /** Further photographs for the detail page gallery, after `photo`. Every one must show this record's generation. */
  gallery?: GalleryImage[];
  /** One sentence on what this record covers, when it is narrower than the model's full history. */
  coverageNote?: string;
  photo: Photo;
  /** Opens the detail page with a short title sequence built on `photo`. */
  intro?: VehicleIntro;
  review?: Review;
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
  /** Exact attribution wording, when the source page asks for something beyond creator and licence. */
  attribution?: string;
  /** How the local copy differs from the source, beyond resizing and the site's colour grade. */
  modifications?: string;
};

/** A factual source, described once and cited by id from any record. */
export type Source = {
  id: string;
  /** Publisher or organisation responsible for the page. */
  publisher: string;
  title: string;
  url: string;
  /** ISO date the page was last read for this archive. */
  accessed: string;
  /** ISO date of publication, when the page states one. */
  published?: string;
  /**
   * "manufacturer": the carmaker's own newsroom, site or press release. "heritage": a museum, archive or trust.
   * "government": official public data. "reference": a general reference work.
   */
  kind: "manufacturer" | "heritage" | "government" | "reference";
  /** Set when the page is not in English. */
  language?: string;
  /** What the page was used to support. */
  note?: string;
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
