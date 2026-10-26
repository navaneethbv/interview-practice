import assert from "node:assert/strict";
import { it } from "node:test";
import { resolveBaStep } from "./ba-position";
it("explicit BA lesson and quiz bookmarks override saved positions", () => {
  assert.equal(resolveBaStep("#lesson-2", 4, 5), 2);
  assert.equal(resolveBaStep("#quiz", 1, 5), 6);
  assert.equal(resolveBaStep("#lesson-1", 6, 5), 1);
});
it("invalid bookmark and saved positions fall back within the chapter", () => {
  assert.equal(resolveBaStep("#lesson-999", 3, 5), 3);
  for (const saved of [undefined, -1, 0, 1.5, 999])
    assert.equal(resolveBaStep("#bad", saved, 5), 1);
});
