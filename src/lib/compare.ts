import type { SourceId } from "@/data/sources";

/*
 * The comparison page's rules, kept free of data and image imports so they can be tested on their
 * own (`npm test`). Records are matched by the labels their facts already use; nothing is converted,
 * estimated or scored here.
 */

/** Most cars a comparison holds: two side by side, a third when asked for. */
export const MAX_COMPARED = 3;

/** One recorded fact, kept with the label and scope it was written under. */
export type CompareFact = {
  label: string;
  value: string;
  /** The spec group's scope, e.g. "3.8-litre cars, 1961 to October 1964", when the fact belongs to one. */
  scope?: string;
  sources: SourceId[];
};

export type CompareRow = { id: string; heading: string };
export type CompareGroup = { id: string; title: string; rows: CompareRow[] };

/** The sections of the specification comparison, in reading order. */
export const COMPARE_GROUPS: CompareGroup[] = [
  {
    id: "identity",
    title: "Identity and history",
    rows: [
      { id: "introduced", heading: "Introduced" },
      { id: "production", heading: "Production" },
      { id: "built-at", heading: "Built at" },
      { id: "bodies", heading: "Body styles" },
      { id: "total", heading: "Number built" },
      { id: "design", heading: "Design" },
    ],
  },
  {
    id: "powertrain",
    title: "Engine and powertrain",
    rows: [
      { id: "engine", heading: "Engine or motor" },
      { id: "power", heading: "Maximum power" },
      { id: "transmission", heading: "Transmission" },
      { id: "layout", heading: "Layout and drive" },
    ],
  },
  {
    id: "electric",
    title: "Battery and range",
    rows: [
      { id: "electrics", heading: "Electrical system" },
      { id: "range", heading: "Range" },
      { id: "efficiency", heading: "Efficiency" },
    ],
  },
  {
    id: "chassis",
    title: "Chassis and construction",
    rows: [
      { id: "platform", heading: "Platform" },
      { id: "suspension", heading: "Suspension" },
    ],
  },
  {
    id: "market",
    title: "Markets and price",
    rows: [
      { id: "price", heading: "Price at launch" },
      { id: "markets", heading: "Markets and sales" },
    ],
  },
];

/** Fact labels used in the archive, by the row they belong to. A label not listed falls to `rowByValue`. */
const ROW_BY_LABEL: Record<string, string> = {
  Introduced: "introduced",
  Unveiled: "introduced",
  "World premiere": "introduced",
  Presented: "introduced",
  "First shown": "introduced",
  Revealed: "introduced",
  Launched: "introduced",
  "On sale": "introduced",
  "Prototype shown": "introduced",
  Built: "production",
  "Series 1 built": "production",
  Production: "production",
  "Production from": "production",
  "First generation": "production",
  "Coupé built": "production",
  "Roadster built": "production",
  "Moving assembly line": "production",
  "Built in": "built-at",
  Factory: "built-at",
  Bodies: "bodies",
  Body: "bodies",
  "2+2 coupé": "bodies",
  Doors: "bodies",
  Coachwork: "design",
  "Total built": "total",
  Design: "design",
  Designer: "design",
  Generation: "identity-note",
  Engine: "engine",
  Motor: "engine",
  "Electric motors": "engine",
  "Hybrid system": "engine",
  Powertrain: "engine",
  Power: "power",
  "Power (DIN)": "power",
  "Power (SAE gross)": "power",
  Gearbox: "transmission",
  Transmission: "transmission",
  Layout: "layout",
  Drive: "layout",
  Electrics: "electrics",
  "System voltage": "electrics",
  Range: "range",
  Efficiency: "efficiency",
  Platform: "platform",
  Suspension: "suspension",
  "Base price": "price",
  Sold: "markets",
  "Market names": "markets",
  "North America": "markets",
  "World markets": "markets",
  Withdrawn: "markets",
};

const POWER_UNIT = /\b(kW|PS|CV|hp|bhp)\b/;
const DISTANCE = /\b(miles|km)\b/;

/**
 * The row a fact belongs in. Labels decide first. A label the table does not know is placed by its
 * value only where the value leaves no doubt: an output figure (the Supra's per-market ratings, the
 * Miura's per-series ratings) or a range in miles or kilometres. Anything else returns null and is
 * left out of the comparison rather than guessed at.
 */
export function rowFor(fact: Pick<CompareFact, "label" | "value">): string | null {
  const byLabel = ROW_BY_LABEL[fact.label];
  if (byLabel) return byLabel === "identity-note" ? null : byLabel;
  if (POWER_UNIT.test(fact.value)) return "power";
  if (DISTANCE.test(fact.value)) return "range";
  return null;
}

/**
 * Labels that only restate their row ("Engine" under "Engine or motor"). Any other label, such as
 * "Unveiled", "Power (SAE gross)" or "Japan", says something the row heading does not and is shown.
 */
const PLAIN_LABELS = new Set([
  "Introduced", "Built", "Production", "Bodies", "Body", "Total built", "Design", "Engine", "Motor",
  "Power", "Gearbox", "Transmission", "Layout", "Drive", "Range", "Efficiency", "Platform", "Suspension",
]);

/** Whether a fact's own label adds to its row heading, and so should be shown beside the value. */
export function labelAddsContext(label: string): boolean {
  return !PLAIN_LABELS.has(label);
}

/** The labels the table knows, for the data test that checks every archive label is placed. */
export const KNOWN_LABELS = Object.keys(ROW_BY_LABEL);

/** Groups a car's facts by row, keeping their recorded order. */
export function factsByRow(facts: CompareFact[]): Record<string, CompareFact[]> {
  const rows: Record<string, CompareFact[]> = {};
  for (const fact of facts) {
    const row = rowFor(fact);
    if (row) (rows[row] ??= []).push(fact);
  }
  return rows;
}

/** The first four-digit year in a recorded value, e.g. 1961 from "1961–1968"; null when there is none. */
export function firstYear(value: string | undefined): number | null {
  const match = value?.match(/\b(1[89]\d\d|20\d\d)\b/);
  return match ? Number(match[1]) : null;
}

/** The unit each power figure is quoted in, so the page can say when figures are not like for like. */
export function powerUnit(value: string): string | null {
  return value.match(POWER_UNIT)?.[1] ?? null;
}

export type ParsedSelection = {
  slugs: string[];
  /** Slugs in the address that are not in the archive. */
  unknown: string[];
  /** Whether the address repeated a car or listed more than `MAX_COMPARED`. */
  trimmed: boolean;
};

/**
 * Reads `?cars=a,b,c`. Unknown slugs and repeats are dropped, and at most `MAX_COMPARED` are kept.
 * With no parameter at all the default pair is used; a parameter that names no known car also falls
 * back to the defaults, and reports what it could not use.
 */
export function parseCarsParam(raw: string | null, known: ReadonlySet<string>, defaults: string[]): ParsedSelection {
  if (raw === null) return { slugs: defaults, unknown: [], trimmed: false };
  const listed = raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const unknown = [...new Set(listed.filter((s) => !known.has(s)))];
  const knownListed = listed.filter((s) => known.has(s));
  const valid = [...new Set(knownListed)];
  const repeated = valid.length < knownListed.length;
  const slugs = valid.slice(0, MAX_COMPARED);
  return {
    slugs: slugs.length > 0 ? slugs : defaults,
    unknown,
    trimmed: repeated || valid.length > MAX_COMPARED,
  };
}

/** The address for a selection: readable slugs, comma-separated, or the bare page for the defaults. */
export function carsHref(slugs: string[], defaults: string[]): string {
  const isDefault = slugs.length === defaults.length && slugs.every((s, i) => s === defaults[i]);
  return isDefault ? "/compare" : `/compare?cars=${slugs.join(",")}`;
}
