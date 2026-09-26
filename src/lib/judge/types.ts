/**
 * Problem specs describe a problem's signature and test cases in a language-neutral way.
 * The Python and Java harnesses are generated from the same spec, and outputs from both
 * are compared in TypeScript, so a test behaves identically in either language.
 */

export type ValueType =
  | "int"
  | "long"
  | "double"
  | "boolean"
  | "string"
  | "char"
  | "int[]"
  | "long[]"
  | "double[]"
  | "char[]"
  | "string[]"
  | "boolean[]"
  | "int[][]"
  | "char[][]"
  | "List<int>"
  | "List<double>"
  | "List<string>"
  | "List<List<int>>"
  | "List<List<string>>"
  | "List<int[]>"
  | "ListNode"
  | "ListNode[]"
  | "TreeNode"
  | "List<TreeNode>"
  | "Interval"
  | "Interval[]"
  | "List<Interval>"
  | "List<List<Interval>>"
  | "ArrayReader"
  | "void";

export interface Param {
  name: string;
  type: ValueType;
}

/** How the harness turns the call into a JSON output. */
export interface OutputSpec {
  /** Serialize this argument (after the call) instead of the return value, for in-place problems. */
  arg?: number;
  /**
   * Special serializations:
   * - value: a node's value (or null) instead of the whole list/tree
   * - nextLevels: tree levels read by following `next` pointers from each level's leftmost node
   * - nextChain: values read by following `next` pointers from the root
   */
  as?: "value" | "nextLevels" | "nextChain";
}

export type Compare = "exact" | "unordered" | "unorderedDeep" | { validator: ValidatorName };

export type ValidatorName = "topoOrder" | "noAdjacentRepeat" | "kDistanceApart" | "alienOrder" | "frequencySorted";

export interface TestCase {
  input: unknown[];
  expected?: unknown;
  /** Shown in the Testcase panel and used by "Run". Others are hidden and only used by "Submit". */
  sample?: boolean;
}

export interface FunctionSpec {
  kind?: "function";
  id: string;
  function: { python: string; java: string };
  params: Param[];
  returns: ValueType;
  output?: OutputSpec;
  compare?: Compare;
  tests: TestCase[];
}

export interface DesignMethod {
  /** Canonical op name used in tests (the Python name). */
  name: string;
  java: string;
  params: Param[];
  returns: ValueType;
}

export interface DesignTestCase {
  input: { ctor: unknown[]; ops: string[]; args: unknown[][] };
  expected?: unknown[];
  sample?: boolean;
}

export interface DesignSpec {
  kind: "design";
  id: string;
  className: string;
  ctorParams: Param[];
  methods: DesignMethod[];
  tests: DesignTestCase[];
}

export type ProblemSpec = FunctionSpec | DesignSpec;
export type AnyTestCase = TestCase | DesignTestCase;

/* ---------------------------------------------------------------- results */

export type Verdict =
  | "Accepted"
  | "Wrong Answer"
  | "Runtime Error"
  | "Compile Error"
  | "Time Limit Exceeded"
  | "Internal Error";

/** One line emitted by a harness for a test case. */
export interface RawCaseResult {
  i: number;
  status: "ok" | "error";
  output?: unknown;
  error?: string;
  stdout?: string;
  ms?: number;
}

export interface CaseResult {
  index: number;
  passed: boolean;
  output?: unknown;
  error?: string;
  stdout?: string;
  ms?: number;
  notRun?: boolean;
}

export interface RunOutcome {
  verdict: Verdict;
  cases: CaseResult[];
  passed: number;
  total: number;
  compileError?: string;
  message?: string;
  /** Output printed outside of test calls (e.g. at module level). */
  stdout?: string;
  runtimeMs?: number;
}

export const RESULT_MARKER = "\u0001JUDGE ";
