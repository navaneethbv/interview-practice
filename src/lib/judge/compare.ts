import type { Compare, ValidatorName } from "./types";

const EPS = 1e-5;

function canonical(v: unknown): string {
  return JSON.stringify(v, (_, x) => (typeof x === "number" ? Number(x.toFixed(6)) : x));
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) <= EPS * Math.max(1, Math.abs(a), Math.abs(b));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => deepEqual(x, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a as object);
    const kb = Object.keys(b as object);
    return (
      ka.length === kb.length &&
      ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
    );
  }
  return a === b;
}

function sortTop(v: unknown): unknown {
  return Array.isArray(v) ? [...v].sort((x, y) => canonical(x).localeCompare(canonical(y))) : v;
}

function sortDeep(v: unknown): unknown {
  if (!Array.isArray(v)) return v;
  return v.map(sortDeep).sort((x, y) => canonical(x).localeCompare(canonical(y)));
}

/* ---------------------------------------------------------------- validators */

type Validator = (input: unknown[], output: unknown, expected: unknown) => boolean;

function isPermutationOf(a: string, b: string) {
  return [...a].sort().join("") === [...b].sort().join("");
}

function checkTopo(n: number, edges: number[][], order: unknown): boolean {
  if (!Array.isArray(order) || order.length !== n) return false;
  const pos = new Map<number, number>();
  order.forEach((v, i) => pos.set(v as number, i));
  if (pos.size !== n) return false;
  for (let v = 0; v < n; v++) if (!pos.has(v)) return false;
  return edges.every(([p, c]) => (pos.get(p) ?? -1) < (pos.get(c) ?? -1));
}

const VALIDATORS: Record<ValidatorName, Validator> = {
  /** input: (vertices, edges); expected [] means a cycle, so output must be [] too. */
  topoOrder: (input, output, expected) => {
    if (Array.isArray(expected) && expected.length === 0) return Array.isArray(output) && output.length === 0;
    return checkTopo(input[0] as number, input[1] as number[][], output);
  },
  /** input: (str); expected "" means impossible. */
  noAdjacentRepeat: (input, output, expected) => {
    if (expected === "") return output === "";
    if (typeof output !== "string") return false;
    if (!isPermutationOf(output, input[0] as string)) return false;
    for (let i = 1; i < output.length; i++) if (output[i] === output[i - 1]) return false;
    return true;
  },
  /** input: (str, k); equal characters must be at least k positions apart. */
  kDistanceApart: (input, output, expected) => {
    if (expected === "") return output === "";
    if (typeof output !== "string") return false;
    const [s, k] = input as [string, number];
    if (!isPermutationOf(output, s)) return false;
    const last = new Map<string, number>();
    for (let i = 0; i < output.length; i++) {
      const prev = last.get(output[i]);
      if (prev !== undefined && i - prev < k) return false;
      last.set(output[i], i);
    }
    return true;
  },
  /** input: (words); output must be a valid alien alphabet ordering, "" if none exists. */
  alienOrder: (input, output, expected) => {
    if (expected === "") return output === "";
    if (typeof output !== "string") return false;
    const words = input[0] as string[];
    const letters = new Set(words.join(""));
    if (output.length !== letters.size || new Set(output).size !== output.length) return false;
    if (![...letters].every((c) => output.includes(c))) return false;
    for (let i = 0; i + 1 < words.length; i++) {
      const [w1, w2] = [words[i], words[i + 1]];
      for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
        if (w1[j] !== w2[j]) {
          if (output.indexOf(w1[j]) > output.indexOf(w2[j])) return false;
          break;
        }
      }
    }
    return true;
  },
  /** input: (str); equal characters grouped together, groups in non-increasing frequency. */
  frequencySorted: (input, output) => {
    if (typeof output !== "string") return false;
    const s = input[0] as string;
    if (!isPermutationOf(output, s)) return false;
    const counts = new Map<string, number>();
    for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
    const seen = new Set<string>();
    let prev = Infinity;
    for (let i = 0; i < output.length; ) {
      const c = output[i];
      if (seen.has(c)) return false;
      seen.add(c);
      let j = i;
      while (j < output.length && output[j] === c) j++;
      const run = j - i;
      if (run !== counts.get(c) || run > prev) return false;
      prev = run;
      i = j;
    }
    return true;
  },
};

export function judgeOutput(compare: Compare | undefined, input: unknown, output: unknown, expected: unknown): boolean {
  const mode = compare ?? "exact";
  if (typeof mode === "object") return VALIDATORS[mode.validator](input as unknown[], output, expected);
  if (mode === "unordered") return deepEqual(sortTop(output), sortTop(expected));
  if (mode === "unorderedDeep") return deepEqual(sortDeep(output), sortDeep(expected));
  return deepEqual(output, expected);
}

/** Human-readable note shown next to results when order does not matter. */
export function compareNote(compare: Compare | undefined): string | undefined {
  if (compare === "unordered") return "Any order of the result is accepted.";
  if (compare === "unorderedDeep") return "Any order of the result (and within each group) is accepted.";
  if (typeof compare === "object") return "Any valid answer is accepted.";
  return undefined;
}
