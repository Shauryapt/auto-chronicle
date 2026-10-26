// Search relevance tests. Run with `npm test` (Node's built-in test runner; no extra dependencies).
// Fixtures copy the text of real archive records, trimmed to the fields search reads.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { searchEntries, toTokens } from "./search-match.ts";

const car = (slug, maker, name, { generation = "", aliases = [], versions = [], body = [], categories = [] } = {}) => ({
  id: `car-${slug}`,
  type: "Car",
  title: `${maker} ${name}`,
  detail: "",
  href: `/cars/${slug}`,
  categories,
  tokens: toTokens({ names: [`${maker} ${name}`, name], keywords: [generation, ...aliases, ...versions], body }),
});
const maker = (slug, name, country, knownFor) => ({
  id: `marque-${slug}`,
  type: "Manufacturer",
  title: name,
  detail: "",
  href: `/manufacturers/${slug}`,
  categories: [],
  tokens: toTokens({ names: [name], keywords: [country], body: [knownFor] }),
});

const index = [
  car("porsche-911-992", "Porsche", "911 (992 generation)", {
    versions: ["Carrera S and Carrera 4S", "Targa", "Refresh for the 2025 model year"],
    body: ["Modern performance coupé", "The eighth generation of a rear-engined shape", "Rear engine, flat-six"],
  }),
  car("volkswagen-golf-mk1", "Volkswagen", "Golf Mk1", {
    body: ["Everyday hatchback", "Front engine, front-wheel drive", "Hatchback and cabriolet"],
    categories: ["classic"],
  }),
  car("jaguar-e-type-series-1", "Jaguar", "E-Type Series 1", { body: ["Classic grand tourer", "Front engine, rear-wheel drive", "Coupé and roadster"], categories: ["classic"] }),
  car("porsche-taycan", "Porsche", "Taycan", { body: ["Electric performance saloon", "800-volt architecture"], categories: ["electric"] }),
  car("mercedes-benz-300-sl-w198", "Mercedes-Benz", "300 SL (W198)", {
    generation: "W198",
    aliases: ["Gullwing", "300SL"],
    versions: ["Coupé", "Roadster"],
    body: ["Classic sports car"],
    categories: ["classic"],
  }),
  car("citroen-ds", "Citroën", "DS", { aliases: ["DS 19", "DS 21", "ID 19"], body: ["Front engine, front-wheel drive", "Hydropneumatic"], categories: ["classic"] }),
  car("lamborghini-countach", "Lamborghini", "Countach", {
    aliases: ["LP400", "LP500", "Quattrovalvole"],
    versions: ["LP400", "5000 Quattrovalvole", "25th Anniversary"],
    categories: ["classic", "supercar"],
  }),
  car("ford-model-t", "Ford", "Model T", { body: ["Mass-production car", "2.9-litre four-cylinder"], categories: ["classic"] }),
  car("honda-nsx-first-generation", "Honda", "NSX (first generation)", { aliases: ["Acura NSX", "NSX-R", "NSX-T"], categories: ["supercar"] }),
  car("toyota-supra-a80", "Toyota", "Supra (A80)", { generation: "A80", aliases: ["JZA80", "2JZ"] }),
  car("mazda-mx-5-na", "Mazda", "MX-5 (first generation)", { generation: "NA", aliases: ["Miata", "MX-5 Miata", "Eunos Roadster"], categories: ["classic"] }),
  car("tesla-model-s", "Tesla", "Model S", { aliases: ["P85", "P85D"], body: ["Electric liftback saloon", "Four-door liftback"], categories: ["electric"] }),
  car("toyota-prius-first-generation", "Toyota", "Prius (first generation)", { generation: "XW10", aliases: ["NHW10", "NHW11"] }),
  maker("porsche", "Porsche", "Germany", "Rear- and mid-engined sports cars, and endurance racing"),
  maker("ford", "Ford", "United States", "Mass production, from the Model T onward"),
  maker("citroen", "Citroën", "France", "Inventive engineering and unconventional design"),
];

const slugs = (query, category = null) => searchEntries(index, query, category).map((e) => e.href.split("/").pop());

describe("relevance", () => {
  it("ranks Ford Model T first for 'Model T' and drops records that only share the letter t", () => {
    const results = slugs("Model T");
    assert.equal(results[0], "ford-model-t");
    assert.ok(!results.includes("tesla-model-s"), "Model S should not match 'Model T'");
    assert.ok(!results.includes("porsche-911-992"), "911 should not match 'Model T'");
  });

  it("keeps entries that genuinely mention the Model T, below the car itself", () => {
    assert.deepEqual(slugs("model t"), ["ford-model-t", "ford"]);
  });

  it("is case- and accent-insensitive", () => {
    assert.deepEqual(slugs("MODEL t"), slugs("model T"));
    assert.deepEqual(slugs("citroen"), slugs("Citroën"));
    assert.equal(slugs("citroen")[0], "citroen");
  });

  it("matches a single letter only as a whole word", () => {
    // "T" stands alone in "Model T" and in the verified alias "NSX-T"; it is not matched inside "Tesla" or "Taycan".
    assert.deepEqual(slugs("t"), ["ford-model-t", "honda-nsx-first-generation", "ford"]);
  });

  for (const [query, expected] of [
    ["Gullwing", "mercedes-benz-300-sl-w198"],
    ["Miata", "mazda-mx-5-na"],
    ["Eunos", "mazda-mx-5-na"],
    ["A80", "toyota-supra-a80"],
    ["NHW10", "toyota-prius-first-generation"],
    ["W198", "mercedes-benz-300-sl-w198"],
    ["Quattrovalvole", "lamborghini-countach"],
    ["Acura", "honda-nsx-first-generation"],
    ["MX-5", "mazda-mx-5-na"],
  ]) {
    it(`finds the right car first for '${query}'`, () => {
      assert.equal(slugs(query)[0], expected);
    });
  }

  it("puts an exact name before longer names that contain it", () => {
    const porsche = slugs("porsche");
    assert.equal(porsche[0], "porsche", "the manufacturer's own entry comes first");
    assert.deepEqual(porsche.slice(1).sort(), ["porsche-911-992", "porsche-taycan"]);
    assert.equal(slugs("porsche 911")[0], "porsche-911-992");
  });
});

describe("matching", () => {
  it("still returns every car that shares a common word", () => {
    assert.deepEqual(slugs("model").slice(0, 2).sort(), ["ford-model-t", "tesla-model-s"]);
  });

  it("supports partial typing of three or more characters", () => {
    assert.equal(slugs("gull")[0], "mercedes-benz-300-sl-w198");
    assert.equal(slugs("quattro")[0], "lamborghini-countach");
    assert.equal(slugs("porsch")[0], "porsche");
    assert.equal(slugs("porsch").length, 3);
  });

  it("treats a hyphenated word as one unit, so 'front-wheel' does not match 'front engine, rear-wheel'", () => {
    assert.deepEqual(slugs("front-wheel drive"), ["volkswagen-golf-mk1", "citroen-ds"]);
    assert.deepEqual(slugs("rear-wheel"), ["jaguar-e-type-series-1"]);
    assert.equal(slugs("nsx-t")[0], "honda-nsx-first-generation");
  });

  it("ranks words found in sequence above the same words scattered through a description", () => {
    // Spaces keep words independent, so the E-Type's "front engine, rear-wheel drive" still matches,
    // but the front-wheel-drive cars, where the words appear in order, come first.
    assert.deepEqual(slugs("front wheel drive"), ["volkswagen-golf-mk1", "citroen-ds", "jaguar-e-type-series-1"]);
    assert.deepEqual(slugs("rear wheel drive"), ["jaguar-e-type-series-1"]);
  });

  it("still matches separate words anywhere in the entry", () => {
    assert.deepEqual(slugs("front drive"), ["volkswagen-golf-mk1", "jaguar-e-type-series-1", "citroen-ds"]);
  });

  it("requires every word of a multi-word query", () => {
    assert.deepEqual(slugs("tesla model"), ["tesla-model-s"]);
  });

  it("returns nothing for unrelated text", () => {
    assert.deepEqual(slugs("xyzzy"), []);
    assert.deepEqual(slugs("model q"), []);
  });
});

describe("filters and empty queries", () => {
  it("returns nothing for an empty query without a category", () => {
    assert.deepEqual(slugs("   "), []);
  });

  it("lists the whole category for an empty query with a category", () => {
    assert.deepEqual(slugs("", "electric"), ["porsche-taycan", "tesla-model-s"]);
  });

  it("applies the category to a query", () => {
    assert.deepEqual(slugs("front-wheel", "classic"), ["volkswagen-golf-mk1", "citroen-ds"]);
    assert.deepEqual(slugs("model", "electric"), ["tesla-model-s"]);
  });
});
