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
  | "List<boolean>"
  | "List<string>"
  | "List<List<int>>"
  | "List<List<string>>"
  | "List<int[]>"
  | "ListNode"
  | "ListNode[]"
  | "TreeNode"
  | "GraphNode"
  | "RandomNode"
  | "NaryNode"
  | "NextNode"
  | "ParentNode"
  | "DoublyNode"
  | "CircularNode"
  | "MultiNode"
  | "NestedInteger"
  | "List<NestedInteger>"
  | "IntIterator"
  | "List<Employee>"
  | "HtmlParser"
  | "Robot"
  | "Master"
  | "SparseVector"
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
  /** Resolve a unique node value in an earlier TreeNode argument, preserving identity. */
  fromTree?: number;
  /** A ListNode input can append a tail selected by index from this earlier argument. */
  fromList?: number;
}

/** How the harness turns the call into a JSON output. */
export interface OutputSpec {
  /** Serialize this argument (after the call) instead of the return value, for in-place problems. */
  arg?: number;
  /** Only the first returned-count entries of the output argument are significant. */
  prefix?: boolean;
  /** Serialize the full list when the input's `at` selects a node within it. */
  root?: boolean;
  /**
   * Special serializations:
   * - value: a node's value (or null) instead of the whole list/tree
   * - nextLevels: tree levels read by following `next` pointers from each level's leftmost node
   * - nextChain: values read by following `next` pointers from the root
   */
  as?: "value" | "nextLevels" | "nextChain" | "unsigned32" | "listIndex" | "interaction";
}

export type Compare = "exact" | "unordered" | "unorderedDeep" | { validator: ValidatorName };

export type ValidatorName = "topoOrder" | "courseOrder" | "noAdjacentRepeat" | "kDistanceApart" | "alienOrder" | "frequencySorted" | "longestPalindrome" | "balancedBST" | "peakIndex" | "randomizedSet" | "weightedPick" | "customSort" | "minimalParentheses" | "divisibleSubset" | "smallestPairs" | "bstDelete" | "prePostTree" | "allOne" | "shuffle" | "peakGrid" | "zeroSumList" | "circularInsertion" | "grayCode" | "uniqueBinary" | "balancedTree" | "logStorage" | "fairCandySwap" | "parityPartition" | "peaksValleys" | "pivotPartition" | "graphPath" | "spanningTree" | "shortestPaths" | "artistPlaylist" | "bestSubset" | "cluePath" | "commonSubsequence" | "dagPath";

export interface TestCase {
  input: unknown[];
  expected?: unknown;
  /** Shown in the Testcase panel and used by "Run". Others are hidden and only used by "Submit". */
  sample?: boolean;
}

/**
 * "leetcode" specs use LeetCode's helper names (ListNode.val); the default follows the
 * Grokking course (ListNode.value).
 */
export type SpecStyle = "course" | "leetcode";

export interface FunctionSpec {
  kind?: "function";
  id: string;
  style?: SpecStyle;
  function: { python: string; java: string };
  params: Param[];
  returns: ValueType;
  output?: OutputSpec;
  /** Require a returned tree node to belong to this input tree argument. */
  returnTree?: number;
  /** Check a codec by decoding its own encoding, allowing any lossless representation. */
  roundTrip?: { className: string; encode: string; decode: string; sameInstance?: boolean };
  /** The final test input configures this environment and is not passed to Solution. */
  environment?: { kind: "badVersion" | "guess" | "celebrity" | "read4" | "parentTree"; param: Param };
  compare?: Compare;
  tests: TestCase[];
}

export interface DesignMethod {
  /** Canonical op name used in tests (the Python name). */
  name: string;
  java: string;
  params: Param[];
  returns: ValueType;
  output?: OutputSpec;
}

export interface DesignTestCase {
  input: { ctor: unknown[]; ops: string[]; args: unknown[][]; environment?: unknown };
  expected?: unknown[];
  sample?: boolean;
}

export interface DesignSpec {
  kind: "design";
  id: string;
  style?: SpecStyle;
  className: string;
  ctorParams: Param[];
  methods: DesignMethod[];
  environment?: NonNullable<FunctionSpec["environment"]>;
  compare?: Compare;
  tests: DesignTestCase[];
}

export interface SqlTestCase {
  input: { tables: Record<string, unknown[][]>; params?: Record<string, string | number | null> };
  expected?: unknown[][];
  sample?: boolean;
}

export interface SqlSpec {
  kind: "sql";
  id: string;
  style?: SpecStyle;
  tables: { name: string; columns: { name: string; type: "INTEGER" | "REAL" | "TEXT" }[] }[];
  resultColumns: string[];
  /** Used for DELETE exercises to inspect the resulting table. */
  resultQuery?: string;
  compare?: "exact" | "unordered";
  tests: SqlTestCase[];
}

export type ProblemSpec = FunctionSpec | DesignSpec | SqlSpec;
export type AnyTestCase = TestCase | DesignTestCase | SqlTestCase;

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
