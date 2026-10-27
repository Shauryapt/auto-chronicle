// Comparison rules. Run with `npm test`.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { carsHref, factsByRow, firstYear, KNOWN_LABELS, labelAddsContext, parseCarsParam, powerUnit, rowFor } from "./compare.ts";

const known = new Set(["porsche-911-992", "jaguar-e-type-series-1", "porsche-taycan", "ford-model-t"]);
const defaults = ["porsche-911-992", "jaguar-e-type-series-1"];

describe("the cars parameter", () => {
  it("uses the default pair when the address has no parameter", () => {
    assert.deepEqual(parseCarsParam(null, known, defaults), { slugs: defaults, unknown: [], trimmed: false });
  });

  it("keeps the listed order", () => {
    assert.deepEqual(parseCarsParam("porsche-taycan,ford-model-t", known, defaults).slugs, ["porsche-taycan", "ford-model-t"]);
  });

  it("drops unknown slugs and reports them", () => {
    const parsed = parseCarsParam("porsche-taycan,ferrari-f50", known, defaults);
    assert.deepEqual(parsed.slugs, ["porsche-taycan"]);
    assert.deepEqual(parsed.unknown, ["ferrari-f50"]);
  });

  it("removes repeats and caps the selection at three", () => {
    const parsed = parseCarsParam("ford-model-t,ford-model-t,porsche-taycan,porsche-911-992,jaguar-e-type-series-1", known, defaults);
    assert.deepEqual(parsed.slugs, ["ford-model-t", "porsche-taycan", "porsche-911-992"]);
    assert.equal(parsed.trimmed, true);
  });

  it("falls back to the defaults when nothing listed is known, saying what was left out", () => {
    const parsed = parseCarsParam("nope,,  ", known, defaults);
    assert.deepEqual(parsed.slugs, defaults);
    assert.deepEqual(parsed.unknown, ["nope"]);
  });

  it("is case-insensitive and ignores stray spaces", () => {
    assert.deepEqual(parseCarsParam(" Ford-Model-T , PORSCHE-TAYCAN ", known, defaults).slugs, ["ford-model-t", "porsche-taycan"]);
  });

  it("writes readable addresses, and the bare page for the defaults", () => {
    assert.equal(carsHref(defaults, defaults), "/compare");
    assert.equal(carsHref(["ford-model-t", "porsche-taycan"], defaults), "/compare?cars=ford-model-t,porsche-taycan");
  });
});

describe("placing facts in rows", () => {
  it("places facts by their label", () => {
    assert.equal(rowFor({ label: "Gearbox", value: "Four-speed manual" }), "transmission");
    assert.equal(rowFor({ label: "Power (SAE gross)", value: "240 hp at 6,100 rpm" }), "power");
  });

  it("places an unlabelled output figure or range only by an unambiguous unit", () => {
    assert.equal(rowFor({ label: "Japan", value: "206 kW (280 PS)" }), "power");
    assert.equal(rowFor({ label: "P400", value: "350 CV at 7,000 rpm" }), "power");
    assert.equal(rowFor({ label: "85 kWh", value: "265 miles" }), "range");
    assert.equal(rowFor({ label: "Something new", value: "A sentence" }), null);
  });

  it("shows a fact's own label only when it says more than the row", () => {
    assert.equal(labelAddsContext("Engine"), false);
    assert.equal(labelAddsContext("Unveiled"), true);
    assert.equal(labelAddsContext("Power (SAE gross)"), true);
  });

  it("never matches a unit inside another word", () => {
    assert.equal(rowFor({ label: "Note", value: "Shipped worldwide" }), null);
  });

  it("groups a car's facts by row in recorded order, keeping scopes", () => {
    const rows = factsByRow([
      { label: "Engine", value: "3.8-litre six", scope: "3.8-litre cars", sources: [] },
      { label: "Engine", value: "4.2-litre six", scope: "4.2-litre cars", sources: [] },
      { label: "Layout", value: "Front engine, rear-wheel drive", sources: [] },
    ]);
    assert.deepEqual(rows.engine.map((f) => f.scope), ["3.8-litre cars", "4.2-litre cars"]);
    assert.equal(rows.layout.length, 1);
  });
});

describe("reading values without converting them", () => {
  it("finds the first year", () => {
    assert.equal(firstYear("1961–1968"), 1961);
    assert.equal(firstYear("March 1964 to 1973"), 1964);
    assert.equal(firstYear("Two, one on each axle"), null);
    assert.equal(firstYear(undefined), null);
  });

  it("reads the unit a power figure is quoted in", () => {
    assert.equal(powerUnit("478 PS; 484 PS for US-specification cars"), "PS");
    assert.equal(powerUnit("86 kW (115 bhp) at 6,500 rpm"), "kW");
    assert.equal(powerUnit("Twin turbo"), null);
  });
});

describe("archive data", () => {
  it("places every fact label recorded in the archive, or places it by an unambiguous unit", () => {
    const text = ["../data/vehicles.ts", "../data/vehicles-archive.ts"]
      .map((f) => readFileSync(new URL(f, import.meta.url), "utf8"))
      .join("\n");
    const facts = [...text.matchAll(/label: "([^"]+)", value: "([^"]+)"/g)].map(([, label, value]) => ({ label, value }));
    assert.ok(facts.length > 100, "the archive's facts were read");
    const unplaced = facts.filter((f) => rowFor(f) === null && f.label !== "Generation");
    assert.deepEqual(unplaced, [], "every fact has a row");
    assert.ok(KNOWN_LABELS.includes("Engine"));
  });
});
