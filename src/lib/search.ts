import { eras } from "@/data/eras";
import { getManufacturer, manufacturers } from "@/data/manufacturers";
import { vehicles } from "@/data/vehicles";
import { toTokens, type SearchEntry } from "./search-match";

/** Flattens the archive data into one searchable list. Replace with a database query later. */
export function buildSearchIndex(): SearchEntry[] {
  const carEntries = vehicles.map<SearchEntry>((v) => {
    const maker = getManufacturer(v.manufacturerSlug)?.name ?? "";
    return {
      id: `car-${v.slug}`,
      type: "Car",
      title: `${maker} ${v.name}`,
      detail: v.facts[0] ? `${v.kind}, ${v.facts[0].label.toLowerCase()} ${v.facts[0].value}.` : `${v.kind}.`,
      href: `/cars/${v.slug}`,
      categories: v.categories,
      tokens: toTokens({
        // The maker is part of the full name, so a manufacturer's own entry ranks first for its name.
        names: [`${maker} ${v.name}`, v.name],
        keywords: [v.generation ?? "", ...(v.aliases ?? []), ...(v.versions ?? []).map((ver) => ver.name)],
        body: [v.kind, v.summary, ...v.facts.map((f) => f.value)],
      }),
    };
  });

  const makerEntries = manufacturers.map<SearchEntry>((m) => ({
    id: `marque-${m.slug}`,
    type: "Manufacturer",
    title: m.name,
    detail: `${m.country}. ${m.knownFor}.`,
    href: `/manufacturers/${m.slug}`,
    categories: [],
    tokens: toTokens({ names: [m.name], keywords: [m.country, m.region], body: [m.knownFor] }),
  }));

  const eraEntries = eras.map<SearchEntry>((e) => ({
    id: `era-${e.slug}`,
    type: "Era",
    title: e.title,
    detail: `${e.period}. ${e.description}`,
    href: `/#era-${e.slug}`,
    categories: [],
    tokens: toTokens({ names: [e.title], keywords: [e.period, e.slug], body: [e.description, e.photoCaption] }),
  }));

  return [...carEntries, ...makerEntries, ...eraEntries];
}
