import assert from "node:assert/strict";
import { it } from "node:test";
import { markupWordCount } from "./reading-estimate";
it("reading estimates count visible words without markup or malformed-tag backtracking", () => {
  assert.equal(
    markupWordCount("<p>Two pointers</p><p>Maintain an invariant.</p>"),
    5,
  );
  assert.equal(markupWordCount("first <" + ">".repeat(200000)), 1);
  assert.equal(markupWordCount("<".repeat(200000) + "tail"), 0);
});
