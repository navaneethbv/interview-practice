import assert from "node:assert/strict";
import { it } from "node:test";
import type { SearchEntry } from "./catalog";
import { search } from "./search";

const index: SearchEntry[] = [
  { t: "Problem lists", h: "/problems", k: "page" },
  { t: "Blind 75", h: "/problems/sets/blind-75", k: "list" },
  { t: "1. Two Sum", h: "/problems/lc/two-sum", k: "problem", s: "easy" },
  { t: "167. Two Sum II - Input Array Is Sorted", h: "/problems/lc/two-sum-ii", k: "problem", s: "medium" },
  { t: "Pair with Target Sum", h: "/problems/pair", k: "lesson", s: "Two Pointers" },
];

it("search shows pages and lists for an empty query", () => {
  assert.deepEqual(search(index, " ").map((e) => e.k), ["page", "list"]);
});

it("search requires every word and prefers word-start matches and shorter titles", () => {
  assert.deepEqual(search(index, "two sum").map((e) => e.h), ["/problems/lc/two-sum", "/problems/lc/two-sum-ii", "/problems/pair"]);
});

it("search falls back to secondary text", () => {
  assert.deepEqual(search(index, "pointers").map((e) => e.h), ["/problems/pair"]);
  assert.deepEqual(search(index, "zzz"), []);
});
