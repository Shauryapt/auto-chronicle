import type { StaticImageData } from "next/image";
import { imageCredits } from "@/data/image-credits";
import { getManufacturer } from "@/data/manufacturers";
import type { SourceId } from "@/data/sources";
import type { GalleryRole, ImageCredit, Photo, Vehicle } from "@/data/types";
import { vehicles } from "@/data/vehicles";
import { factsByRow, firstYear, type CompareFact } from "./compare";
import { buildSearchIndex } from "./search";
import type { SearchEntry } from "./search-match";

/*
 * Builds what the comparison page needs from the archive's own records, on the server. Nothing
 * is added: every value is a recorded fact with its sources, and every photograph keeps its credit.
 */

/** The default pair: a classic and a modern car, both with full galleries and sourced specifications. */
export const DEFAULT_COMPARISON = ["jaguar-e-type-series-1", "porsche-911-992"];

export type ComparePhoto = {
  id: string;
  src: StaticImageData;
  alt: string;
  focus?: string;
  /** The exact variant shown, from the image's source page. */
  depicts: string;
  role: GalleryRole | "lead";
  credit: ImageCredit;
};

export type CompareRotation = {
  frames: { src: StaticImageData; creditId: string; credit: ImageCredit }[];
  depicts: string;
  direction: "clockwise" | "anticlockwise";
};

export type CompareCar = {
  slug: string;
  href: string;
  maker: string;
  makerHref?: string;
  name: string;
  title: string;
  /** The maker's own generation or model code, where a source uses one. */
  code?: string;
  kind: string;
  summary: string;
  /** First year in the record's introduction fact, for "years apart". */
  introduced: number | null;
  /** The production span as recorded, with the label it was recorded under. */
  span?: CompareFact;
  photo: ComparePhoto;
  gallery: ComparePhoto[];
  rows: Record<string, CompareFact[]>;
  rotation?: CompareRotation;
  /** False for directory entries whose facts are not yet checked against sources. */
  reviewed: boolean;
};

function toPhoto(photo: Photo, role: ComparePhoto["role"]): ComparePhoto {
  const credit = imageCredits[photo.creditId];
  return {
    id: photo.creditId,
    src: photo.src,
    alt: photo.alt,
    focus: photo.focus,
    depicts: photo.depicts ?? credit.subject,
    role,
    credit,
  };
}

function compareFacts(car: Vehicle): CompareFact[] {
  const plain = [...car.facts, ...(car.details ?? [])].map((f) => ({ label: f.label, value: f.value, sources: [...f.sources] as SourceId[] }));
  const scoped = (car.specs ?? []).flatMap((group) =>
    group.items.map((f) => ({ label: f.label, value: f.value, scope: group.scope, sources: [...f.sources] as SourceId[] })),
  );
  return [...plain, ...scoped];
}

function toCompareCar(car: Vehicle): CompareCar {
  const maker = getManufacturer(car.manufacturerSlug);
  const rows = factsByRow(compareFacts(car));
  return {
    slug: car.slug,
    href: `/cars/${car.slug}`,
    maker: maker?.name ?? "",
    makerHref: maker ? `/manufacturers/${maker.slug}` : undefined,
    name: car.name,
    title: maker ? `${maker.name} ${car.name}` : car.name,
    code: car.generation,
    kind: car.kind,
    summary: car.summary,
    introduced: firstYear(rows.introduced?.[0]?.value) ?? firstYear(rows.production?.[0]?.value),
    span: rows.production?.[0],
    photo: toPhoto(car.photo, "lead"),
    gallery: (car.gallery ?? []).map((g) => toPhoto(g, g.role)),
    rows,
    rotation: car.rotation && {
      frames: car.rotation.frames.map((f) => ({ src: f.src, creditId: f.creditId, credit: imageCredits[f.creditId] })),
      depicts: car.rotation.depicts,
      direction: car.rotation.direction,
    },
    reviewed: Boolean(car.review),
  };
}

export function buildComparisonData(): { cars: CompareCar[]; index: SearchEntry[] } {
  return {
    cars: vehicles.map(toCompareCar),
    // The archive's own search index, cars only, so the picker ranks exactly as site search does.
    index: buildSearchIndex().filter((entry) => entry.type === "Car"),
  };
}
