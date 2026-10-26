import { sources, type SourceId } from "@/data/sources";
import type { Source } from "@/data/types";

export type Citations = {
  /** Sources in the order they are first cited on the page. */
  list: Source[];
  /** The reference number for a source, matching its position in `list`. */
  numberOf: (id: SourceId) => number;
};

/**
 * Builds one page's reference numbering. Pass the cited source lists in the order they appear
 * on the page, so the first marker a reader meets is [1] and the reference list follows suit.
 */
export function createCitations(groups: Iterable<readonly SourceId[] | undefined>): Citations {
  const order = new Map<SourceId, number>();
  for (const ids of groups) {
    for (const id of ids ?? []) {
      if (!order.has(id)) order.set(id, order.size + 1);
    }
  }
  return {
    list: [...order.keys()].map((id) => sources[id]),
    numberOf: (id) => order.get(id) ?? 0,
  };
}
