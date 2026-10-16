import assert from "node:assert/strict";
import { after, it } from "node:test";
import { reviewAccepted } from "./practice";
import { REVIEW_KEY } from "./practice-data";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
after(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

it("preserves another tab's review updates when no review component is subscribed", () => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  } });
  reviewAccepted("first");
  const stored = JSON.parse(values.get(REVIEW_KEY)!);
  // Another tab, or a restore while this store has no mounted subscribers.
  values.set(REVIEW_KEY, JSON.stringify({ ...stored, other: { step: 2, due: 9999999999999, last: 1 } }));
  reviewAccepted("third");
  const result = JSON.parse(values.get(REVIEW_KEY)!);
  assert.deepEqual(Object.keys(result).sort(), ["first", "other", "third"]);
  assert.equal(result.other.step, 2);
});
