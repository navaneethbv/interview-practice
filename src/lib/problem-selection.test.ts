import assert from "node:assert/strict";
import { test } from "node:test";
import { problemPool, randomProblem } from "./problem-selection";

interface Row { available: boolean; solved: boolean }
const available = (row: Row) => row.available;
const solved = (row: Row) => row.solved;

test("random selection stays within visible runnable rows and prefers unfinished problems", () => {
  const done = { id: "done", available: true, solved: true };
  const todo = { id: "todo", available: true, solved: false };
  const missing = { id: "missing", available: false, solved: false };
  assert.deepEqual(problemPool([done, todo, missing], available, solved), [todo]);
  assert.deepEqual(problemPool([done, missing], available, solved), [done]);
  assert.deepEqual(problemPool([missing], available, solved), []);
  assert.deepEqual(problemPool([], available, solved), []);
  assert.equal(randomProblem([todo]), todo);
  assert.equal(randomProblem([]), undefined);
});
