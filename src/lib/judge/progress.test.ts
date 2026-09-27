import assert from "node:assert/strict";
import { it } from "node:test";
import { loadCode, recordSubmission, resetScope, saveCode, statusOf, summarize, type ProgressState } from "../progress";

it("submission totals and list resets survive bounded history, clock collisions, and reload data", (t) => {
  const storage = new Map<string, string>();
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  } } });
  t.after(() => {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  });
  t.mock.method(Date, "now", () => 1000);
  const id = "lc:two-sum";
  const read = () => JSON.parse(storage.get("ip:progress:v1")!) as ProgressState;
  recordSubmission(id, true);
  resetScope("blind-75", [id], false);
  recordSubmission(id, true);
  for (let i = 0; i < 125; i++) recordSubmission(id, false);
  assert.equal(read().log[id].length, 100);
  assert.equal(statusOf(read(), id, "blind-75"), "solved");
  assert.deepEqual(summarize(read(), [id], "blind-75"), { solved: 1, attempted: 0, submissions: 126, accepted: 1 });
  assert.deepEqual(summarize(read(), [id], "neetcode-150"), { solved: 1, attempted: 0, submissions: 127, accepted: 2 });
  saveCode(id, "python", "saved solution");
  resetScope("blind-75", [id], false);
  assert.equal(loadCode(id, "python"), "saved solution");
  assert.equal(statusOf(read(), id, "blind-75"), "none");
  assert.equal(statusOf(read(), id, "neetcode-150"), "solved");
  assert.deepEqual(summarize(read(), [id], "blind-75"), { solved: 0, attempted: 0, submissions: 0, accepted: 0 });
  resetScope("blind-75", [id], true);
  assert.equal(loadCode(id, "python"), null);
});
