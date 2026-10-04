import assert from "node:assert/strict";
import { afterEach, beforeEach, it } from "node:test";
import { loadCode, loadRecovery, loadSubmissions, resetCode, restoreCode, saveCode, summarize } from "./progress";
import { normalizeProgress, parsePrefs } from "./progress-data";
import { exportPractice, importPractice, parseBackup } from "./practice-backup";
import { pendingWriteCount, retryStorage, safeGet, safeRemove, safeSet } from "./storage";

let data: Map<string, string>;
let fail: (key: string, value: string) => boolean;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalEvent = Object.getOwnPropertyDescriptor(globalThis, "StorageEvent");
beforeEach(() => {
  data = new Map();
  fail = () => false;
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    localStorage: {
      get length() { return data.size; }, key: (i: number) => [...data.keys()][i] ?? null,
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => { if (fail(key, value)) throw new Error("Quota exceeded"); data.set(key, value); },
      removeItem: (key: string) => { data.delete(key); },
    }, dispatchEvent: () => true,
  } });
  Object.defineProperty(globalThis, "StorageEvent", { configurable: true, value: class {} });
});
afterEach(() => {
  fail = () => false;
  retryStorage();
  for (const [key, descriptor] of [["window", originalWindow], ["StorageEvent", originalEvent]] as const) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
});

it("keeps failed drafts across language switches, exports them, and retries without old data winning", () => {
  saveCode("lc:two-sum", "python", "old draft");
  fail = () => true;
  assert.equal(saveCode("lc:two-sum", "python", "latest draft"), false);
  assert.equal(loadCode("lc:two-sum", "python"), "latest draft");
  assert.equal(data.get("ip:code:lc:two-sum:python"), "old draft");
  assert.equal(pendingWriteCount(), 1);
  assert.equal(parseBackup(exportPractice()).entries["ip:code:lc:two-sum:python"], "latest draft");
  fail = () => false;
  assert.equal(retryStorage(), true);
  assert.equal(data.get("ip:code:lc:two-sum:python"), "latest draft");
  data.set("ip:code:lc:two-sum:python", "other tab's draft");
  assert.equal(loadCode("lc:two-sum", "python"), "other tab's draft");
});

it("refuses reset without a saved recovery copy and restores a successful reset after reload", () => {
  saveCode("p", "java", "valuable draft");
  fail = () => true;
  assert.equal(resetCode("p", "java", "valuable draft", "starter"), false);
  assert.equal(loadCode("p", "java"), "valuable draft");
  fail = () => false;
  retryStorage();
  assert.equal(resetCode("p", "java", "valuable draft", "starter"), true);
  assert.equal(loadCode("p", "java"), "starter");
  assert.equal(data.get("ip:recovery:p:java"), "valuable draft");
  restoreCode("p", "java", loadRecovery("p", "java")!);
  assert.equal(loadCode("p", "java"), "valuable draft");
  assert.equal(loadRecovery("p", "java"), null);
});

it("filters malformed submissions and repairs preference and progress fields independently", () => {
  const valid = { at: 10, lang: "python", verdict: "Accepted", passed: 2, total: 2, code: "pass" };
  data.set("ip:subs:p", JSON.stringify([null, valid, { ...valid, passed: 3 }, { ...valid, lang: "javascript" }]));
  assert.deepEqual(loadSubmissions("p"), [valid]);
  assert.deepEqual(parsePrefs('{"lang":null,"fontSize":"huge"}'), { lang: "python", fontSize: 14 });
  assert.deepEqual(parsePrefs('{"lang":"java","fontSize":500}'), { lang: "java", fontSize: 22 });
  const p = normalizeProgress({ solved: { good: 100, bad: "oops" }, read: null, log: { good: [[100, 1], null, [200, 8]] }, totals: { good: [1, 1], bad: [-2, 3] } });
  assert.deepEqual(p.solved, { good: 100 });
  assert.deepEqual(p.read, {});
  assert.deepEqual(p.log, { good: [[100, 1]] });
  assert.deepEqual(p.totals, { good: [1, 1] });
});

it("round trips code, history, progress, preferences and visits without touching unrelated keys", () => {
  const entries = {
    "ip:code:lc:two-sum:python": "class Solution:\n    pass",
    "ip:recovery:lc:two-sum:python": "my previous code",
    "ip:progress:v1": JSON.stringify({ solved: { "lc:two-sum": 100 }, attempted: {}, read: {}, log: {}, resets: {} }),
    "ip:prefs:v1": JSON.stringify({ lang: "python", fontSize: 14 }),
    "ip:subs:lc:two-sum": JSON.stringify([{ at: 100, lang: "python", verdict: "Accepted", passed: 1, total: 1, code: "pass" }]),
    "ip:resume:v1": JSON.stringify({ problem: { kind: "problem", title: "Two Sum", context: "Blind 75", href: "/problems/lc/two-sum?set=blind-75", at: 100 } }),
  };
  for (const [key, value] of Object.entries(entries)) safeSet(key, value);
  const backup = parseBackup(exportPractice());
  data.clear();
  data.set("theme", "dark");
  importPractice(backup);
  assert.deepEqual(Object.fromEntries([...data].filter(([key]) => key !== "theme")), entries);
  assert.equal(data.get("theme"), "dark");
});

it("rejects foreign keys, unsafe resume links, bad histories and unsupported formats before writing", () => {
  const envelope = (entries: object, version = 1) => JSON.stringify({ format: "interview-practice", version, exportedAt: new Date().toISOString(), entries });
  assert.throws(() => parseBackup(envelope({ theme: '"dark"' })), /unsupported/);
  assert.throws(() => parseBackup(envelope({ "ip:subs:p": "[null]" })), /unsupported/);
  assert.throws(() => parseBackup(envelope({ "ip:resume:v1": '{"problem":{"kind":"problem","href":"javascript:alert(1)"}}' })), /unsupported/);
  assert.throws(() => parseBackup(envelope({ "ip:code:p:java": "code" }, 2)), /version 1/);
  assert.equal(data.size, 0);
});

it("rejects impossible imported counters and repairs inconsistent stored reset baselines", () => {
  const invalid = { solved: {}, attempted: {}, read: {}, log: {}, resets: { list: 1 }, totals: { p: [1, 1] }, baselines: { list: { p: [2, 2] } } };
  const text = JSON.stringify({ format: "interview-practice", version: 1, exportedAt: new Date().toISOString(), entries: { "ip:progress:v1": JSON.stringify(invalid) } });
  assert.throws(() => parseBackup(text), /invalid practice data/);
  assert.deepEqual(summarize(normalizeProgress(invalid), ["p"], "list"), { solved: 0, attempted: 0, submissions: 0, accepted: 0 });
  const repaired = normalizeProgress({ ...invalid, log: { p: [[2, 1], [3, 0]] }, totals: { p: [0, 0] }, baselines: { list: { p: [1, 0] } } });
  assert.deepEqual(repaired.totals?.p, [2, 1]);
  assert.deepEqual(summarize(repaired, ["p"], "list"), { solved: 1, attempted: 0, submissions: 1, accepted: 1 });
  const possible = normalizeProgress({ ...invalid, totals: { p: [3, 3] }, baselines: { list: { p: [2, 0] } } });
  assert.deepEqual(summarize(possible, ["p"], "list"), { solved: 0, attempted: 0, submissions: 1, accepted: 1 });
  const failures = normalizeProgress({ ...invalid, log: { p: [[2, 0], [3, 0]] }, totals: { p: [3, 3] }, baselines: {} });
  assert.deepEqual(failures.totals?.p, [5, 3]);
  const inconsistent = JSON.stringify({ ...JSON.parse(text), entries: { "ip:progress:v1": JSON.stringify({ ...failures, totals: { p: [3, 3] } }) } });
  assert.throws(() => parseBackup(inconsistent), /invalid practice data/);
});

it("rolls back a partial import when quota is exhausted and preserves records outside the backup", () => {
  safeSet("ip:code:a:python", "original");
  safeSet("ip:code:c:python", "keep");
  const backup = parseBackup(JSON.stringify({ format: "interview-practice", version: 1, exportedAt: new Date().toISOString(), entries: {
    "ip:code:a:python": "replacement", "ip:code:b:python": "too large",
  } }));
  fail = (key) => key === "ip:code:b:python";
  assert.throws(() => importPractice(backup), /previous data was restored/);
  assert.equal(safeGet("ip:code:a:python"), "original");
  assert.equal(safeGet("ip:code:b:python"), null);
  assert.equal(safeGet("ip:code:c:python"), "keep");
  assert.equal(pendingWriteCount(), 0);
});

it("retains removal tombstones when storage becomes unavailable", () => {
  safeSet("ip:code:p:python", "old");
  window.localStorage.removeItem = () => { throw new Error("Blocked"); };
  assert.equal(safeRemove("ip:code:p:python"), false);
  assert.equal(safeGet("ip:code:p:python"), null);
  window.localStorage.removeItem = (key) => { data.delete(key); };
  retryStorage();
  assert.equal(data.size, 0);
});
