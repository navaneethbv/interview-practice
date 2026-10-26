import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  baseOf,
  EMPTY_BASE,
  fingerprint,
  mergeEntries as mergeWith,
  mergeHistory,
  mergeProgress,
  unchangedSince,
  type Entries,
} from "./sync-merge";

const mergeEntries = (base: Entries, local: Entries, cloud: Entries) =>
  mergeWith(Object.keys(base).length ? baseOf(base) : EMPTY_BASE, local, cloud);

const progress = (value: object) =>
  JSON.stringify({ solved: {}, attempted: {}, read: {}, log: {}, resets: {}, ...value });
const sub = (at: number, verdict = "Accepted") => ({
  at, lang: "python", verdict, passed: 1, total: 1, code: `# ${at}`,
});

describe("automatic sync merge", () => {
  it("takes the changed side of each key, including deletions", () => {
    const base = { "ip:code:a:python": "a0", "ip:code:b:python": "b0", "ip:code:c:python": "c0" };
    const local = { "ip:code:a:python": "a1", "ip:code:b:python": "b0", "ip:code:new:python": "n" };
    const cloud = { "ip:code:a:python": "a0", "ip:code:b:python": "b2", "ip:code:c:python": "c0" };
    assert.deepEqual(mergeEntries(base, local, cloud), {
      "ip:code:a:python": "a1",
      "ip:code:b:python": "b2",
      "ip:code:new:python": "n",
    });
  });

  it("keeps a key deleted on one side when the other side edited it", () => {
    const base = { "ip:code:a:python": "a0" };
    assert.deepEqual(mergeEntries(base, {}, { "ip:code:a:python": "edited" }), {
      "ip:code:a:python": "edited",
    });
  });

  it("prefers the local draft when both sides edited the same draft", () => {
    const base = { "ip:code:a:python": "a0" };
    assert.deepEqual(
      mergeEntries(base, { "ip:code:a:python": "mine" }, { "ip:code:a:python": "theirs" }),
      { "ip:code:a:python": "mine" },
    );
  });

  it("unions first-sync data from a browser and the cloud", () => {
    const merged = mergeEntries(
      {},
      { "ip:progress:v1": progress({ solved: { a: 10 }, attempted: { a: 10 } }) },
      { "ip:progress:v1": progress({ solved: { b: 20 }, attempted: { b: 20 } }) },
    );
    const value = JSON.parse(merged["ip:progress:v1"]);
    assert.deepEqual(value.solved, { a: 10, b: 20 });
    assert.deepEqual(value.attempted, { a: 10, b: 20 });
  });

  it("combines progress made on two devices since the last sync", () => {
    const base = progress({ log: { a: [[1, 0]] }, totals: { a: [5, 2] }, attempted: { a: 1 } });
    const local = progress({ log: { a: [[1, 0], [2, 1]] }, totals: { a: [6, 3] }, attempted: { a: 2 }, solved: { a: 2 } });
    const cloud = progress({ log: { a: [[1, 0], [3, 0], [4, 1]] }, totals: { a: [7, 3] }, attempted: { a: 4 }, solved: { a: 4 }, read: { lesson: 9 } });
    const value = JSON.parse(mergeProgress(base, local, cloud));
    assert.deepEqual(value.log.a, [[1, 0], [2, 1], [3, 0], [4, 1]]);
    assert.deepEqual(value.totals.a, [8, 4]);
    assert.equal(value.solved.a, 4);
    assert.equal(value.attempted.a, 4);
    assert.deepEqual(value.read, { lesson: 9 });
  });

  it("keeps an un-marked lesson un-marked when the other side did not touch it", () => {
    const base = progress({ read: { lesson: 5 } });
    const value = JSON.parse(mergeProgress(base, progress({}), progress({ read: { lesson: 5 }, solved: { x: 1 } })));
    assert.deepEqual(value.read, {});
    assert.deepEqual(value.solved, { x: 1 });
  });

  it("keeps the baseline that belongs to the later list reset", () => {
    const totals = { a: [5, 3] };
    const local = progress({ totals, resets: { blind: 10 }, baselines: { blind: { a: [1, 1] } } });
    const cloud = progress({ totals, resets: { blind: 20 }, baselines: { blind: { a: [3, 2] } } });
    const value = JSON.parse(mergeProgress(undefined, local, cloud));
    assert.equal(value.resets.blind, 20);
    assert.deepEqual(value.baselines.blind, { a: [3, 2] });
    const reversed = JSON.parse(mergeProgress(undefined, cloud, local));
    assert.deepEqual(reversed.baselines.blind, { a: [3, 2] });
  });

  it("merges submission histories newest first without duplicates", () => {
    const local = JSON.stringify([sub(3), sub(1)]);
    const cloud = JSON.stringify([sub(2, "Wrong Answer"), sub(1)]);
    assert.deepEqual(JSON.parse(mergeHistory(local, cloud)).map((s: { at: number }) => s.at), [3, 2, 1]);
    const merged = mergeEntries({ "ip:subs:a": JSON.stringify([sub(1)]) }, { "ip:subs:a": local }, { "ip:subs:a": cloud });
    assert.equal(JSON.parse(merged["ip:subs:a"]).length, 3);
  });

  it("keeps at most 30 submissions", () => {
    const many = (start: number) => JSON.stringify(Array.from({ length: 30 }, (_, i) => sub(start + i)));
    assert.equal(JSON.parse(mergeHistory(many(0), many(100))).length, 30);
  });

  it("combines progress counters using the stored base progress", () => {
    const base = { "ip:progress:v1": progress({ totals: { a: [5, 2] } }) };
    const merged = mergeEntries(
      base,
      { "ip:progress:v1": progress({ totals: { a: [6, 3] } }) },
      { "ip:progress:v1": progress({ totals: { a: [7, 2] } }) },
    );
    assert.deepEqual(JSON.parse(merged["ip:progress:v1"]).totals.a, [8, 3]);
  });

  it("detects local changes against a fingerprint base", () => {
    const entries = { "ip:code:a:python": "x", "ip:prefs:v1": "{}" };
    const base = baseOf(entries);
    assert.equal(unchangedSince(base, entries), true);
    assert.equal(unchangedSince(base, { ...entries, "ip:code:a:python": "y" }), false);
    assert.equal(unchangedSince(base, { "ip:code:a:python": "x" }), false);
    assert.equal(unchangedSince(base, { ...entries, "ip:code:b:python": "z" }), false);
    assert.notEqual(fingerprint("ab"), fingerprint("ba"));
    assert.equal(base.progress, undefined);
  });
});
