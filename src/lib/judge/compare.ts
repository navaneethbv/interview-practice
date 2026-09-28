import type { Compare, DesignTestCase, ValidatorName, ProblemSpec, ValueType, OutputSpec, Param } from "./types";

const EPS = 1e-5;

function canonical(v: unknown): string {
  return JSON.stringify(v, (_, x) => (typeof x === "number" ? Number(x.toFixed(6)) : x));
}

export function deepEqual(a: unknown, b: unknown, floating = false): boolean {
  if (typeof a === "number" && typeof b === "number") {
    if (!floating && Number.isInteger(a) && Number.isInteger(b)) return a === b;
    return Math.abs(a - b) <= EPS * Math.max(1, Math.abs(a), Math.abs(b));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => deepEqual(x, b[i], floating));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a as object);
    const kb = Object.keys(b as object);
    return (
      ka.length === kb.length &&
      ka.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], floating))
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
  const sortCharacters = (value: string) => [...value].sort((x, y) => x.localeCompare(y)).join("");
  return sortCharacters(a) === sortCharacters(b);
}

function checkTopo(n: number, edges: number[][], order: unknown): boolean {
  if (!Array.isArray(order) || order.length !== n) return false;
  const pos = new Map<number, number>();
  order.forEach((v, i) => pos.set(v as number, i));
  if (pos.size !== n) return false;
  for (let v = 0; v < n; v++) if (!pos.has(v)) return false;
  return edges.every(([p, c]) => (pos.get(p) ?? -1) < (pos.get(c) ?? -1));
}

/** Frequency check for randomized outputs: generous enough that a fair generator never fails. */
function withinTolerance(actual: number, expected: number) {
  return Math.abs(actual - expected) <= 10 * Math.sqrt(expected) + 20;
}

type LevelNode = { value: unknown; left?: LevelNode; right?: LevelNode };

/** Builds a tree from a LeetCode level-order array; returns its nodes in BFS order, or null when entries lack a parent. */
function levelOrderNodes(values: unknown[]): LevelNode[] | null {
  const nodes: LevelNode[] = [{ value: values[0] }];
  let index = 1;
  for (const node of nodes) {
    for (const side of ["left", "right"] as const) {
      if (index >= values.length) break;
      const value = values[index++];
      if (value !== null) {
        const child: LevelNode = { value };
        node[side] = child;
        nodes.push(child);
      }
    }
  }
  return index === values.length ? nodes : null;
}

function inorderValues(root: LevelNode): unknown[] {
  const values: unknown[] = [], stack: LevelNode[] = [];
  let node: LevelNode | undefined = root;
  while (node || stack.length) {
    while (node) { stack.push(node); node = node.left; }
    node = stack.pop()!;
    values.push(node.value);
    node = node.right;
  }
  return values;
}

function prePostOrder(root: LevelNode): [unknown[], unknown[]] {
  const pre: unknown[] = [], post: unknown[] = [], pending: [LevelNode, boolean][] = [[root, false]];
  while (pending.length) {
    const [node, visited] = pending.pop()!;
    if (visited) { post.push(node.value); continue; }
    pre.push(node.value);
    pending.push([node, true]);
    if (node.right) pending.push([node.right, false]);
    if (node.left) pending.push([node.left, false]);
  }
  return [pre, post];
}

/** Children follow their parent in BFS order, so a reverse pass sees each subtree before its root. */
function isHeightBalanced(nodes: LevelNode[]): boolean {
  const heights = new Map<LevelNode, number>();
  for (const node of [...nodes].reverse()) {
    const left = node.left ? heights.get(node.left)! : 0;
    const right = node.right ? heights.get(node.right)! : 0;
    if (Math.abs(left - right) > 1) return false;
    heights.set(node, 1 + Math.max(left, right));
  }
  return true;
}

function shuffleLooksUniform(
  original: unknown[],
  permutations: Map<string, number>,
  positions: Map<unknown, number>[],
  draws: number,
): boolean {
  if (draws >= 100 && original.length > 1 && permutations.size < 2) return false;
  if (draws < 500) return true;
  if (original.length <= 4) {
    const possibilities = original.reduce<number>((count, _, i) => count * (i + 1), 1);
    const expectedCount = draws / possibilities;
    if (permutations.size !== possibilities) return false;
    if (![...permutations.values()].every((count) => withinTolerance(count, expectedCount))) return false;
  }
  const expected = draws / original.length;
  return positions.every((counts) => original.every((value) => withinTolerance(counts.get(value) ?? 0, expected)));
}

function applyAllOneUpdate(counts: Map<string, number>, key: string, op: string, result: unknown): boolean {
  if (result !== null) return false;
  const count = (counts.get(key) ?? 0) + (op === "inc" ? 1 : -1);
  if (count <= 0) counts.delete(key);
  else counts.set(key, count);
  return true;
}

function allOneQueryValid(counts: Map<string, number>, op: string, result: unknown): boolean {
  if (!counts.size) return result === "";
  const values = [...counts.values()];
  const target = op === "getMaxKey" ? Math.max(...values) : Math.min(...values);
  return counts.get(result as string) === target;
}

/** getRandom draws made since the last update should cover the set evenly. */
function samplesUniform(samples: number[], set: Set<number>): boolean {
  if (samples.length < 500 || set.size < 2) return true;
  const expected = samples.length / set.size;
  return [...set].every((value) => withinTolerance(samples.filter((x) => x === value).length, expected));
}

function applyRandomizedSetUpdate(set: Set<number>, op: string, value: number, result: unknown): boolean {
  if (op === "remove") return result === set.delete(value);
  if (op !== "insert" || result !== !set.has(value)) return false;
  set.add(value);
  return true;
}

const VALIDATORS: Record<ValidatorName, Validator> = {
  fairCandySwap: (input,output) => {
    const [alice,bob]=input as number[][];
    if(!Array.isArray(output)||output.length!==2||!alice.includes(output[0])||!bob.includes(output[1]))return false;
    return alice.reduce((s,n)=>s+n,0)-output[0]+output[1]===bob.reduce((s,n)=>s+n,0)-output[1]+output[0];
  },
  parityPartition: (input,output) => {
    if(!Array.isArray(output)||!deepEqual(sortTop(output),sortTop(input[0])))return false;
    let odd=false;
    for(const value of output){if(value%2!==0)odd=true;else if(odd)return false;}
    return true;
  },
  logStorage: (input,output,expected) => {
    const {ops}=input as unknown as DesignTestCase["input"];
    return Array.isArray(output)&&Array.isArray(expected)&&output.length===ops.length&&expected.length===ops.length&&ops.every((op,i)=>op==="put"?output[i]===null:Array.isArray(output[i])&&deepEqual(sortTop(output[i]),sortTop(expected[i])));
  },
  balancedTree: (input,output,expected) => {
    const values=(input[0] as (number|null)[]).filter((x): x is number=>x!==null).sort((a,b)=>a-b);
    return VALIDATORS.balancedBST([values],output,expected);
  },
  uniqueBinary: (input,output) => {
    const nums=input[0] as string[];
    return typeof output==="string" && output.length===nums.length && /^[01]*$/.test(output) && !nums.includes(output);
  },
  grayCode: (input,output) => {
    const n=input[0] as number, size=2**n;
    if(!Array.isArray(output)||output.length!==size||output[0]!==0||new Set(output).size!==size)return false;
    if(!output.every(x=>Number.isInteger(x)&&x>=0&&x<size))return false;
    if(size===1)return true;
    return output.every((x,i)=>{const bits=x^output[(i+1)%size];return bits!==0 && (bits&(bits-1))===0;});
  },
  zeroSumList: (input,output) => {
    const source=input[0] as number[];
    if(output===null)output=[];
    if(!Array.isArray(output))return false;
    let position=0, sourceSum=0, resultSum=0;
    const seen=new Set([0]);
    for(const value of output){
      if(typeof value!=="number")return false;
      let found=false;
      while(position<source.length){
        const candidate=source[position++], before=sourceSum;sourceSum+=candidate;
        if(candidate===value && before===resultSum){found=true;break;}
      }
      if(!found)return false;
      resultSum+=value;
      if(seen.has(resultSum))return false;
      seen.add(resultSum);
    }
    return resultSum===source.reduce((sum,n)=>sum+n,0);
  },
  circularInsertion: (input,output) => {
    const source=input[0] as number[], inserted=input[1];
    if(!Array.isArray(output)||output.length!==source.length+1)return false;
    if(!source.length)return output[0]===inserted;
    if(output[0]!==source[0])return false;
    let decreases=0;
    for(let i=0;i<output.length;i++)if(output[i]>output[(i+1)%output.length])decreases++;
    if(decreases>1)return false;
    return output.some((value,i)=>i>0 && value===inserted && deepEqual([...output.slice(0,i),...output.slice(i+1)],source));
  },
  peakGrid: (input,output) => {
    const grid=input[0] as number[][];
    if(!Array.isArray(output)||output.length!==2||!output.every(Number.isInteger))return false;
    const [r,c]=output;
    if(r<0||r>=grid.length||c<0||c>=grid[0].length)return false;
    return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].every(([a,b])=>a<0||a>=grid.length||b<0||b>=grid[0].length||grid[r][c]>grid[a][b]);
  },
  shuffle: (input, output) => {
    const {ctor,ops} = input as unknown as DesignTestCase["input"];
    const original=ctor[0] as number[];
    if (!Array.isArray(output) || output.length !== ops.length) return false;
    const permutations=new Map<string, number>();
    const positions = original.map(() => new Map<unknown, number>());
    let draws=0;
    for(let i=0;i<ops.length;i++) {
      if (ops[i] === "reset") {
        if (!deepEqual(output[i],original)) return false;
        continue;
      }
      if (!deepEqual(sortTop(output[i]),sortTop(original))) return false;
      output[i].forEach((value: unknown, position: number) => {
        const counts = positions[position];
        counts.set(value, (counts.get(value) ?? 0) + 1);
      });
      const permutation = JSON.stringify(output[i]);
      permutations.set(permutation, (permutations.get(permutation) ?? 0) + 1);
      draws++;
    }
    return shuffleLooksUniform(original, permutations, positions, draws);
  },
  allOne: (input, output) => {
    const { ops, args } = input as unknown as DesignTestCase["input"];
    if (!Array.isArray(output) || output.length !== ops.length) return false;
    const counts = new Map<string, number>();
    return ops.every((op, i) => op === "inc" || op === "dec"
      ? applyAllOneUpdate(counts, args[i][0] as string, op, output[i])
      : allOneQueryValid(counts, op, output[i]));
  },
  prePostTree: (input, output) => {
    const [preorder, postorder] = input as number[][];
    if (!preorder.length) return output === null || (Array.isArray(output) && !output.length);
    if (!Array.isArray(output) || !output.length || output[0] === null || output.length > preorder.length * 2 + 1) return false;
    const nodes = levelOrderNodes(output);
    if (nodes?.length !== preorder.length) return false;
    const [pre, post] = prePostOrder(nodes[0]);
    return deepEqual(pre, preorder) && deepEqual(post, postorder);
  },
  customSort: (input, output) => {
    const [order, s] = input as [string, string];
    if (typeof output !== "string" || !isPermutationOf(output, s)) return false;
    let previous = -1;
    for (const c of output) {
      const rank = order.indexOf(c);
      if (rank < 0) continue;
      if (rank < previous) return false;
      previous = rank;
    }
    return true;
  },
  minimalParentheses: (input, output, expected) => {
    if (typeof output !== "string" || typeof expected !== "string" || output.length !== expected.length) return false;
    let index = 0, balance = 0;
    for (const c of input[0] as string) {
      if (c !== output[index]) {
        if (c !== "(" && c !== ")") return false;
        continue;
      }
      index++;
      if (c === "(") balance++;
      if (c === ")" && --balance < 0) return false;
    }
    return index === output.length && balance === 0;
  },
  divisibleSubset: (input, output, expected) => {
    if (!Array.isArray(output) || !Array.isArray(expected) || output.length !== expected.length || new Set(output).size !== output.length) return false;
    const nums = new Set(input[0] as number[]);
    if (!output.every((x) => typeof x === "number" && nums.has(x))) return false;
    const sorted = [...output].sort((a, b) => a - b);
    return sorted.every((x, i) => i === 0 || x % sorted[i - 1] === 0);
  },
  smallestPairs: (input, output, expected) => {
    if (!Array.isArray(output) || !Array.isArray(expected) || output.length !== expected.length) return false;
    const a = input[0] as number[], b = input[1] as number[];
    const used = new Map<string, number>();
    for (const pair of output) {
      if (!Array.isArray(pair) || pair.length !== 2 || !pair.every((x) => typeof x === "number")) return false;
      const key = JSON.stringify(pair), count = (used.get(key) ?? 0) + 1;
      if (count > a.filter((x) => x === pair[0]).length * b.filter((x) => x === pair[1]).length) return false;
      used.set(key, count);
    }
    const sums = (rows: number[][]) => rows.map(([x, y]) => x + y).sort((x, y) => x - y);
    return deepEqual(sums(output), sums(expected));
  },
  bstDelete: (input, output) => {
    const remaining = (input[0] as (number | null)[]).filter((x): x is number => x !== null && x !== input[1]).sort((a, b) => a - b);
    if (output === null || (Array.isArray(output) && !output.length)) return !remaining.length;
    if (!Array.isArray(output) || output[0] === null || output.length > remaining.length * 2 + 1) return false;
    const nodes = levelOrderNodes(output);
    if (nodes?.length !== remaining.length || !nodes.every((node) => Number.isInteger(node.value))) return false;
    return deepEqual(inorderValues(nodes[0]), remaining);
  },
  randomizedSet: (input, output) => {
    const { ops, args } = input as unknown as DesignTestCase["input"];
    if (!Array.isArray(output) || output.length !== ops.length) return false;
    const set = new Set<number>();
    let samples: number[] = [];
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "getRandom") {
        if (typeof output[i] !== "number" || !set.has(output[i])) return false;
        samples.push(output[i]);
        continue;
      }
      if (!samplesUniform(samples, set)) return false;
      samples = [];
      if (!applyRandomizedSetUpdate(set, ops[i], args[i][0] as number, output[i])) return false;
    }
    return samplesUniform(samples, set);
  },
  weightedPick: (input, output) => {
    const { ctor, ops } = input as unknown as DesignTestCase["input"];
    const weights = ctor[0] as number[];
    if (!Array.isArray(output) || output.length !== ops.length) return false;
    const counts = weights.map(() => 0);
    for (const index of output) {
      if (!Number.isInteger(index) || index < 0 || index >= weights.length) return false;
      counts[index]++;
    }
    if (output.length < 500) return true;
    const total = weights.reduce((sum, w) => sum + w, 0);
    return weights.every((weight, i) => withinTolerance(counts[i], output.length * weight / total));
  },
  peakIndex: (input, output) => {
    const nums = input[0];
    if (!Array.isArray(nums) || typeof output !== "number" || !Number.isInteger(output) || output < 0 || output >= nums.length) return false;
    return (output === 0 || nums[output] > nums[output - 1]) && (output === nums.length - 1 || nums[output] > nums[output + 1]);
  },
  balancedBST: (input, output) => {
    const nums = input[0];
    if (!Array.isArray(nums)) return false;
    if (!nums.length) return output === null || (Array.isArray(output) && !output.length);
    if (!Array.isArray(output) || !output.length || output[0] === null || output.length > nums.length * 2 + 1) return false;
    const nodes = levelOrderNodes(output);
    if (nodes?.length !== nums.length || !isHeightBalanced(nodes)) return false;
    return deepEqual(inorderValues(nodes[0]), nums);
  },
  courseOrder: (input, output, expected) => {
    if (Array.isArray(expected) && expected.length === 0) return Array.isArray(output) && output.length === 0;
    return checkTopo(input[0] as number, (input[1] as number[][]).map(([course, prerequisite]) => [prerequisite, course]), output);
  },
  longestPalindrome: (input, output, expected) => {
    if (typeof output !== "string" || typeof expected !== "string" || typeof input[0] !== "string") return false;
    return output.length === expected.length && input[0].includes(output) && output === [...output].reverse().join("");
  },
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

export function judgeOutput(compare: Compare | undefined, input: unknown, output: unknown, expected: unknown, floating = false): boolean {
  const mode = compare ?? "exact";
  if (typeof mode === "object") return VALIDATORS[mode.validator](input as unknown[], output, expected);
  if (mode === "unordered") return deepEqual(sortTop(output), sortTop(expected), floating);
  if (mode === "unorderedDeep") return deepEqual(sortDeep(output), sortDeep(expected), floating);
  return deepEqual(output, expected, floating);
}

/** Human-readable note shown next to results when order does not matter. */
export function compareNote(compare: Compare | undefined): string | undefined {
  if (compare === "unordered") return "Any order of the result is accepted.";
  if (compare === "unorderedDeep") return "Any order of the result (and within each group) is accepted.";
  if (typeof compare === "object") return "Any valid answer is accepted.";
  return undefined;
}


const INTEGER_TYPES = new Set<ValueType>([
  "int", "long", "int[]", "long[]", "int[][]", "List<int>", "List<List<int>>", "List<int[]>",
  "ListNode", "ListNode[]", "TreeNode", "List<TreeNode>", "GraphNode", "RandomNode", "NaryNode",
  "NextNode", "ParentNode", "DoublyNode", "CircularNode", "MultiNode", "NestedInteger", "List<NestedInteger>",
  "Interval", "Interval[]", "List<Interval>", "List<List<Interval>>", "Robot",
]);

function integerValues(value: unknown): boolean {
  if (typeof value === "number") return Number.isInteger(value);
  if (Array.isArray(value)) return value.every(integerValues);
  if (value && typeof value === "object") return Object.values(value).every(integerValues);
  return true;
}

function integerResult(returns: ValueType, params: Param[], adapter: OutputSpec | undefined, value: unknown): boolean {
  const type = adapter?.arg !== undefined ? params[adapter.arg]?.type : returns;
  const integerAdapter = adapter?.as && ["value", "nextLevels", "nextChain", "unsigned32", "listIndex"].includes(adapter.as);
  return (!integerAdapter && !INTEGER_TYPES.has(type)) || integerValues(value);
}

function floatingResult(returns: ValueType, params: Param[], adapter?: OutputSpec): boolean {
  if (adapter?.as) return false;
  const type = adapter?.arg !== undefined ? params[adapter.arg]?.type : returns;
  return type === "double" || type === "double[]" || type === "List<double>";
}

/** Compare numeric results according to their declared integer or floating-point contract. */
export function judgeSpecOutput(spec: ProblemSpec, input: unknown, output: unknown, expected: unknown): boolean {
  if (spec.kind === "design") {
    const { ops } = input as DesignTestCase["input"];
    if (!Array.isArray(output) || output.length !== ops.length) return false;
    if (!ops.every((op, i) => {
      const method = spec.methods.find((item) => item.name === op);
      return method && integerResult(method.returns, method.params, method.output, output[i]);
    })) return false;
    if (!spec.compare || spec.compare === "exact") {
      if (!Array.isArray(expected) || expected.length !== ops.length) return false;
      return ops.every((op, i) => {
        const method = spec.methods.find((item) => item.name === op)!;
        return deepEqual(output[i], expected[i], floatingResult(method.returns, method.params, method.output));
      });
    }
  } else if (spec.kind !== "sql") {
    if (!integerResult(spec.returns, spec.params, spec.output, output)) return false;
    return judgeOutput(spec.compare, input, output, expected, floatingResult(spec.returns, spec.params, spec.output));
  }
  return judgeOutput(spec.compare, input, output, expected);
}
