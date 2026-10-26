import type { CategorySlug } from "@/data/types";

/*
 * Search matching and ranking, kept free of data and image imports so it can be tested on its own
 * (`npm test`). The index itself is built from the archive data in `search.ts`.
 */

export type SearchEntryType = "Car" | "Manufacturer" | "Era";

/** Text for one entry, split by how strongly a match in it suggests the entry is what was meant. */
export type SearchSource = {
  /** Names the entry is called by, e.g. "Ford Model T" and "Model T". */
  names: string[];
  /** Exact identifiers: generation codes, verified aliases, version names, periods. */
  keywords: string[];
  /** Descriptive text: kind, summary, facts. Matches here rank lowest. */
  body: string[];
};

export type SearchEntry = {
  id: string;
  type: SearchEntryType;
  title: string;
  detail: string;
  href: string;
  categories: CategorySlug[];
  /** Pre-tokenised text from `SearchSource`, one word list per field, computed once when the index is built. */
  tokens: {
    names: string[][];
    keywords: string[][];
    body: string[][];
  };
};

export function normalise(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Lower-cased, accent-free words. Punctuation separates words, so "MX-5" is ["mx", "5"]. */
export function tokenize(text: string): string[] {
  return normalise(text).split(/[^a-z0-9]+/).filter(Boolean);
}

export function toTokens(source: SearchSource): SearchEntry["tokens"] {
  return {
    names: source.names.map(tokenize),
    keywords: source.keywords.map(tokenize),
    body: source.body.map(tokenize),
  };
}

/**
 * The query as units to match. Words separated by spaces are matched independently; a word joined
 * by punctuation ("front-wheel", "MX-5", "NSX-T") is one unit whose parts must appear in sequence.
 */
function parseQuery(query: string): string[][] {
  return normalise(query)
    .split(/\s+/)
    .map(tokenize)
    .filter((unit) => unit.length > 0);
}

/** Shortest query word allowed to match the start of a longer word, so "gull" finds "gullwing". */
const MIN_PREFIX = 3;

/**
 * A query word matches a word when they are equal, or when the query word is at least three
 * characters and begins the word. Shorter words must match whole words, so "t" finds "Model T" but
 * not "Tesla".
 */
function termMatches(term: string, word: string): boolean {
  return word === term || (term.length >= MIN_PREFIX && word.startsWith(term));
}

/** A unit matches a field when its parts appear consecutively; only the last part may be a prefix. */
function unitInField(unit: string[], words: string[]): boolean {
  const last = unit.length - 1;
  for (let i = 0; i + unit.length <= words.length; i++) {
    if (unit.every((part, j) => (j === last ? termMatches(part, words[i + j]) : words[i + j] === part))) return true;
  }
  return false;
}

function unitInFields(unit: string[], fields: string[][]): boolean {
  return fields.some((words) => unitInField(unit, words));
}

/** True when `terms` appear as consecutive whole words somewhere in `words`. */
function containsSequence(words: string[], terms: string[]): boolean {
  for (let i = 0; i + terms.length <= words.length; i++) {
    if (terms.every((t, j) => words[i + j] === t)) return true;
  }
  return false;
}

/**
 * Relevance tier, lower is better:
 * 0. the query is exactly a name, alias or generation code ("model t", "miata", "a80");
 * 1. the query appears as consecutive whole words in a name ("porsche 911");
 * 2. every unit is found in the names or keywords;
 * 3. the query appears as consecutive words in the descriptive text ("front wheel drive" in
 *    "front-wheel drive");
 * 4. the words are found, but scattered ("front" and "wheel drive" in "front engine, rear-wheel drive").
 */
function tier(entry: SearchEntry, units: string[][]): number {
  const { names, keywords, body } = entry.tokens;
  const terms = units.flat();
  const phrase = terms.join(" ");
  if ([...names, ...keywords].some((words) => words.join(" ") === phrase)) return 0;
  if (names.some((words) => containsSequence(words, terms))) return 1;
  if (units.every((unit) => unitInFields(unit, [...names, ...keywords]))) return 2;
  if ([...keywords, ...body].some((words) => containsSequence(words, terms))) return 3;
  return 4;
}

/**
 * Word count of the shortest name that contains every query unit, so among name matches the more
 * specific name comes first. Entries matched through keywords alone count as their full name.
 */
function nameLength(entry: SearchEntry, units: string[][]): number {
  const matching = entry.tokens.names.filter((words) => units.every((unit) => unitInField(unit, words)));
  return Math.min(...(matching.length > 0 ? matching : entry.tokens.names).map((words) => words.length));
}

/**
 * Every query unit must match somewhere in the entry. Results are ordered by relevance tier. Within
 * the name and keyword tiers the shorter name comes first ("Porsche" before "Porsche 911");
 * otherwise the index order is kept (cars, then manufacturers, then eras).
 */
export function searchEntries(index: SearchEntry[], query: string, category: CategorySlug | null): SearchEntry[] {
  const pool = category ? index.filter((e) => e.categories.includes(category)) : index;
  const units = parseQuery(query);
  if (units.length === 0) return category ? pool : [];

  return pool
    .filter((e) => {
      const fields = [...e.tokens.names, ...e.tokens.keywords, ...e.tokens.body];
      return units.every((unit) => unitInFields(unit, fields));
    })
    .map((entry, order) => {
      const rank = tier(entry, units);
      return { entry, order, rank, length: rank < 3 ? nameLength(entry, units) : 0 };
    })
    .sort((a, b) => a.rank - b.rank || a.length - b.length || a.order - b.order)
    .map(({ entry }) => entry);
}
