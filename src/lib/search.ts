import { eras } from "@/data/eras";
import { getManufacturer, manufacturers } from "@/data/manufacturers";
import type { CategorySlug } from "@/data/types";
import { vehicles } from "@/data/vehicles";

export type SearchEntryType = "Car" | "Manufacturer" | "Era";

export type SearchEntry = {
  id: string;
  type: SearchEntryType;
  title: string;
  detail: string;
  href: string;
  categories: CategorySlug[];
  /** Lower-cased, accent-stripped text the query is matched against. */
  haystack: string;
};

export function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Flattens the sample data into one searchable list. Replace with a database query later. */
export function buildSearchIndex(): SearchEntry[] {
  const carEntries = vehicles.map<SearchEntry>((v) => {
    const maker = getManufacturer(v.manufacturerSlug)?.name ?? "";
    return {
      id: `car-${v.slug}`,
      type: "Car",
      title: `${maker} ${v.name}`,
      detail: v.facts[0] ? `${v.kind}, ${v.facts[0].label.toLowerCase()} ${v.facts[0].value}.` : `${v.kind}.`,
      href: `#car-${v.slug}`,
      categories: v.categories,
      haystack: normalise([maker, v.name, v.kind, v.summary, ...v.facts.map((f) => f.value)].join(" ")),
    };
  });

  const makerEntries = manufacturers.map<SearchEntry>((m) => ({
    id: `marque-${m.slug}`,
    type: "Manufacturer",
    title: m.name,
    detail: `${m.country}. ${m.knownFor}.`,
    href: `#marque-${m.slug}`,
    categories: [],
    haystack: normalise([m.name, m.country, m.region, m.knownFor].join(" ")),
  }));

  const eraEntries = eras.map<SearchEntry>((e) => ({
    id: `era-${e.slug}`,
    type: "Era",
    title: e.title,
    detail: `${e.period}. ${e.description}`,
    href: `#era-${e.slug}`,
    categories: [],
    haystack: normalise([e.title, e.period, e.slug, e.description, e.photoCaption].join(" ")),
  }));

  return [...carEntries, ...makerEntries, ...eraEntries];
}

/** Lower is better: exact title, then title prefix, then title contains, then body-only matches. */
function rank(entry: SearchEntry, phrase: string, terms: string[]): number {
  const title = normalise(entry.title);
  if (title === phrase) return 0;
  if (title.startsWith(phrase)) return 1;
  if (terms.every((t) => title.includes(t))) return 2;
  return 3;
}

/** Every word in the query must appear somewhere in the entry. Stable sort keeps data order within a rank. */
export function searchEntries(
  index: SearchEntry[],
  query: string,
  category: CategorySlug | null,
): SearchEntry[] {
  const pool = category ? index.filter((e) => e.categories.includes(category)) : index;
  const phrase = normalise(query);
  const terms = phrase.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return category ? pool : [];

  return pool
    .filter((e) => terms.every((t) => e.haystack.includes(t)))
    .sort((a, b) => rank(a, phrase, terms) - rank(b, phrase, terms));
}
