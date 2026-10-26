import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  parseReferenceShard,
  selectReferenceShard,
} from "../../scripts/judge/sharding";

test("four reference shards are deterministic, disjoint and cover every repository fixture", () => {
  const files = ["content/problems", "content/leetcode"].flatMap((dir) =>
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => path.join(dir, f)),
  );
  const shards = [1, 2, 3, 4].map((index) =>
    selectReferenceShard(files, { index, total: 4 }),
  );
  assert.ok(files.length > 0);
  assert.deepEqual(shards.flat().sort(), [...files].sort());
  assert.equal(new Set(shards.flat()).size, files.length);
  assert.ok(
    Math.max(...shards.map((s) => s.length)) -
      Math.min(...shards.map((s) => s.length)) <=
      1,
  );
  for (let index = 1; index <= 4; index++)
    assert.deepEqual(
      shards[index - 1],
      selectReferenceShard([...files].reverse(), { index, total: 4 }),
    );
  assert.deepEqual(selectReferenceShard(files), [...files].sort());
});

test("shard arguments reject malformed or empty selections", () => {
  assert.deepEqual(parseReferenceShard(["--java", "--shard=2/4"]), {
    index: 2,
    total: 4,
  });
  assert.equal(parseReferenceShard(["--java"]), undefined);
  for (const flag of [
    "--shard",
    "--shard=0/4",
    "--shard=5/4",
    "--shard=1/0",
    "--shard=NaN/4",
    "--shard=1.5/4",
  ])
    assert.throws(() => parseReferenceShard([flag]));
  assert.throws(() => parseReferenceShard(["--shard=1/4", "--shard=2/4"]));
});
