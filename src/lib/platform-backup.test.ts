import assert from "node:assert/strict";
import { beforeEach, afterEach, it } from "node:test";
import { exportPractice, importPractice, parseBackup } from "./practice-backup";
import { safeSet, retryStorage } from "./storage";
import {
  EMPTY_PLAN,
  PLAN_KEY,
  BOOKMARKS_KEY,
  MISTAKES_KEY,
  EVIDENCE_KEY,
} from "./learning-data";
import {
  DEFAULT_READER,
  READER_KEY,
  READER_POSITIONS_KEY,
} from "./reader-data";
import { EMPTY_INTERVIEWS, INTERVIEWS_KEY } from "./interview-data";
import { LABS_KEY } from "./lab-state";
import { APPEARANCE_KEY } from "./appearance-data";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalEvent = Object.getOwnPropertyDescriptor(
  globalThis,
  "StorageEvent",
);
let data: Map<string, string>;
beforeEach(() => {
  data = new Map();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        get length() {
          return data.size;
        },
        key: (i: number) => [...data.keys()][i] ?? null,
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => data.set(key, value),
        removeItem: (key: string) => data.delete(key),
      },
      dispatchEvent: () => true,
    },
  });
  Object.defineProperty(globalThis, "StorageEvent", {
    configurable: true,
    value: class {},
  });
});
afterEach(() => {
  retryStorage();
  for (const [key, descriptor] of [
    ["window", originalWindow],
    ["StorageEvent", originalEvent],
  ] as const) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
});

it("round-trips every learning feature through the same backup used for cloud sync", () => {
  const entries: Record<string, unknown> = {
    [APPEARANCE_KEY]: { palette: "sage", mode: "dark" },
    [PLAN_KEY]: {
      ...EMPTY_PLAN,
      goal: "ba",
      minutes: 30,
      startDate: "2026-10-26",
    },
    [BOOKMARKS_KEY]: [
      {
        href: "/business-analyst/introduction#lesson-2",
        title: "Stakeholders",
        section: "BA",
      },
    ],
    [MISTAKES_KEY]: [
      {
        id: "mistake-1",
        question: "When should UAT start?",
        href: "/practice/labs/returns-transformation",
        mistaken: "At release",
        corrected: "Plan with requirements",
        dueDate: "2026-10-28",
        resolved: false,
      },
    ],
    [EVIDENCE_KEY]: {
      "lc:two-sum": [
        {
          startedAt: 100,
          declaredIndependent: true,
          hints: 0,
          solutions: 0,
          acceptedAt: 200,
        },
      ],
    },
    [LABS_KEY]: {
      "returns-transformation": {
        draft: "My acceptance criteria",
        checks: ["0"],
        updated: 100,
      },
    },
    [INTERVIEWS_KEY]: EMPTY_INTERVIEWS,
    [READER_KEY]: DEFAULT_READER,
    [READER_POSITIONS_KEY]: {
      "/learn/two-pointers-introduction#reader-content": {
        paragraph: 2,
        sentence: 1,
        at: 100,
      },
    },
  };
  for (const [key, value] of Object.entries(entries))
    safeSet(key, JSON.stringify(value));
  const backup = parseBackup(exportPractice());
  assert.equal(Object.keys(backup.entries).length, Object.keys(entries).length);
  data.clear();
  importPractice(backup);
  for (const [key, value] of Object.entries(entries))
    assert.deepEqual(JSON.parse(data.get(key)!), value);
});

it("refuses invalid new feature data rather than silently dropping it during export", () => {
  safeSet(PLAN_KEY, JSON.stringify(EMPTY_PLAN));
  safeSet(
    BOOKMARKS_KEY,
    JSON.stringify([
      { href: "https://external.example", title: "unsafe", section: "x" },
    ]),
  );
  assert.throws(() => exportPractice(), /could not be backed up completely/);
  assert.equal(data.has(BOOKMARKS_KEY), true);
});

it("rejects a mixed restore containing corrupt data before any local mutation", () => {
  safeSet(PLAN_KEY, JSON.stringify(EMPTY_PLAN));
  const bad = {
    format: "interview-practice",
    version: 1,
    exportedAt: "2026-10-26T12:00:00Z",
    entries: {
      [PLAN_KEY]: JSON.stringify({ ...EMPTY_PLAN, minutes: 120 }),
      [LABS_KEY]: JSON.stringify({
        bad: { draft: "x", checks: [], updated: -1 },
      }),
    },
  };
  assert.throws(
    () => importPractice(bad as Parameters<typeof importPractice>[0]),
    /invalid practice data/,
  );
  assert.equal(JSON.parse(data.get(PLAN_KEY)!).minutes, 60);
  assert.equal(data.has(LABS_KEY), false);
});

it("preserves a full imported lab store when a new draft would exceed the supported limit", async () => {
  const { saveLabAttempt } = await import("./lab-storage");
  const original = Object.fromEntries(
    Array.from({ length: 200 }, (_, index) => [
      `legacy-${index}`,
      { draft: `Important draft ${index}`, checks: [], updated: 100 },
    ]),
  );
  safeSet(LABS_KEY, JSON.stringify(original));
  assert.equal(
    saveLabAttempt("returns-transformation", {
      draft: "new draft",
      checks: [],
      updated: 200,
    }),
    false,
  );
  assert.deepEqual(JSON.parse(data.get(LABS_KEY)!), original);
  assert.equal(
    saveLabAttempt("legacy-0", {
      draft: "updated existing draft",
      checks: [],
      updated: 200,
    }),
    true,
  );
  assert.equal(Object.keys(JSON.parse(data.get(LABS_KEY)!)).length, 200);
});
