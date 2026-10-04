import assert from "node:assert/strict";
import { test } from "node:test";
import { readProblemFilters, updateProblemFilter } from "./problem-filters";

test("shared list URLs restore every filter including encoded category names", () => {
  const search = "q=two+sum&difficulty=easy&status=todo&category=Arrays+%26+Hashing";
  assert.deepEqual(readProblemFilters(search, "category", ["Arrays & Hashing"]), {
    query: "two sum", difficulty: "easy", status: "todo", group: "Arrays & Hashing",
  });
  assert.equal(readProblemFilters("pattern=two-pointers", "pattern", ["two-pointers"]).group, "two-pointers");
  assert.equal(readProblemFilters("topic=Dynamic+Programming", "topic", ["Dynamic Programming"]).group, "Dynamic Programming");
});

test("invalid and foreign filters fall back to available controls", () => {
  assert.deepEqual(readProblemFilters("difficulty=extreme&status=unknown&category=removed&pattern=arrays", "category", ["arrays"]), {
    query: "", difficulty: "all", status: "all", group: "all",
  });
});

test("filter updates preserve other filters and list context while removing defaults", () => {
  const initial = "set=blind-75&q=all&difficulty=hard&status=todo";
  const next = updateProblemFilter(initial, "difficulty", "all");
  assert.equal(next, "set=blind-75&q=all&status=todo");
  assert.equal(updateProblemFilter(next, "q", ""), "set=blind-75&status=todo");
  assert.equal(updateProblemFilter("", "q", "all"), "q=all");
  assert.equal(updateProblemFilter("", "q", "a&b + c"), "q=a%26b+%2B+c");
  assert.equal(updateProblemFilter("status=todo&status=solved", "status", "attempted"), "status=attempted");
});
