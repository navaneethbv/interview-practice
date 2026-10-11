import type { AnyTestCase, ProblemSpec } from "./types";
import { RESULT_MARKER } from "./types";
import { safeName, usesCoreFeatures } from "./languages";

/**
 * JavaScript and TypeScript harness. The generated program is plain JavaScript that expects a
 * global `__emit(line)` function: the browser worker passes one in and the Node runner used by
 * scripts and tests prints to stdout. TypeScript is transpiled to JavaScript before it gets here.
 *
 * User code runs inside `new Function` with a `//# sourceURL=solution.js` comment, so stack
 * traces name the user's own lines.
 */
const JS_RUNNER = String.raw`
const __SPEC = JSON.parse(__JUDGE_SPEC__);
const __TESTS = JSON.parse(__JUDGE_TESTS__);
const __MARKER = __JUDGE_MARKER__;
const __LIMIT = 100000;

class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
  get value() { return this.val; }
  set value(v) { this.val = v; }
}
class TreeNode {
  constructor(val = 0, left = null, right = null) { this.val = val; this.left = left; this.right = right; this.next = null; }
}
class Interval {
  constructor(start = 0, end = 0) { this.start = start; this.end = end; }
}

function __buildList(v) {
  let pos = -1;
  if (v && !Array.isArray(v)) { pos = v.pos ?? -1; v = v.values ?? []; }
  if (!v || !v.length) return null;
  const nodes = v.map((x) => new ListNode(x));
  for (let k = 0; k + 1 < nodes.length; k++) nodes[k].next = nodes[k + 1];
  if (pos >= 0 && pos < nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0];
}
function __buildTree(v) {
  if (!v || !v.length || v[0] === null) return null;
  const root = new TreeNode(v[0]);
  const q = [root];
  let head = 0, k = 1;
  while (head < q.length && k < v.length) {
    const n = q[head++];
    if (k < v.length && v[k] !== null) { n.left = new TreeNode(v[k]); q.push(n.left); }
    k++;
    if (k < v.length && v[k] !== null) { n.right = new TreeNode(v[k]); q.push(n.right); }
    k++;
  }
  return root;
}
function __conv(t, v) {
  if (v === null || v === undefined) return null;
  switch (t) {
    case "ListNode": return __buildList(v);
    case "ListNode[]": return v.map(__buildList);
    case "TreeNode": return __buildTree(v);
    case "List<TreeNode>": return v.map(__buildTree);
    case "Interval": return new Interval(v[0], v[1]);
    case "Interval[]": case "List<Interval>": return v.map((x) => new Interval(x[0], x[1]));
    default: return typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v;
  }
}
function __listValues(n) {
  const out = [];
  while (n && out.length < __LIMIT) { out.push(n.val); n = n.next; }
  return out;
}
function __treeValues(root) {
  if (!root) return [];
  const out = [], q = [root];
  for (let head = 0; head < q.length; head++) {
    const n = q[head];
    if (!n) { out.push(null); continue; }
    out.push(n.val); q.push(n.left ?? null); q.push(n.right ?? null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function __plain(v) {
  if (v === undefined || v === null) return null;
  if (typeof v === "number") {
    if (Number.isNaN(v)) return "nan";
    if (!Number.isFinite(v)) return v > 0 ? "inf" : "-inf";
    return v;
  }
  if (typeof v === "bigint") return Number(v);
  if (v instanceof ListNode) return __listValues(v);
  if (v instanceof TreeNode) return __treeValues(v);
  if (v instanceof Interval) return [v.start, v.end];
  if (Array.isArray(v) || v instanceof Set || ArrayBuffer.isView(v)) return Array.from(v, __plain);
  if (v instanceof Map) return Object.fromEntries([...v].map(([k, x]) => [String(k), __plain(x)]));
  if (typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, __plain(x)]));
  return v;
}
function __special(kind, v) {
  if (kind === "unsigned32") return v >>> 0;
  if (kind === "value") return v === null || v === undefined ? null : v.val;
  return v;
}
function __output(output, value, ret) {
  if (output.as) return __special(output.as, value);
  if (output.prefix) {
    if (!Number.isInteger(ret) || ret < 0 || ret > value.length) throw new Error("The returned length is outside the output buffer");
    return __plain(value.slice(0, ret));
  }
  return __plain(value);
}

function __format(args) {
  return args.map((a) => (typeof a === "string" ? a : (() => { try { return JSON.stringify(__plain(a)); } catch { return String(a); } })())).join(" ");
}
function __where(e) {
  const m = /(?:solution\.js|<input>):(\d+)/.exec((e && e.stack) || "");
  return m ? " (line " + Math.max(1, Number(m[1]) - __JUDGE_LINE_OFFSET__) + ")" : "";
}

let __entry, __setupError = null;
try {
  __entry = new Function("ListNode", "TreeNode", "Interval", __JUDGE_USER__)(ListNode, TreeNode, Interval);
} catch (e) {
  __setupError = e;
}

function __runFunction(args) {
  if (typeof __entry !== "function") throw new Error("Define the function " + __SPEC.function.java);
  const conv = __SPEC.params.map((p, k) => __conv(p.type, args[k]));
  const ret = __entry(...conv);
  const output = __SPEC.output || {};
  const value = output.arg !== undefined ? conv[output.arg] : ret;
  return __output(output, value, ret);
}
function __runDesign(input) {
  if (typeof __entry !== "function") throw new Error("Define the class " + __SPEC.className);
  const ctor = __SPEC.ctorParams.map((p, k) => __conv(p.type, input.ctor[k]));
  const obj = new __entry(...ctor);
  const methods = Object.fromEntries(__SPEC.methods.map((m) => [m.name, m]));
  return input.ops.map((op, k) => {
    const m = methods[op];
    if (typeof obj[m.java] !== "function") throw new Error("Define the method " + m.java);
    const args = m.params.map((p, j) => __conv(p.type, input.args[k][j]));
    const r = obj[m.java](...args);
    const output = m.output || {};
    if (output.arg === undefined && m.returns === "void") return null;
    return __output(output, output.arg !== undefined ? args[output.arg] : r, r);
  });
}

const __log = console.log, __info = console.info, __warn = console.warn, __error = console.error;
if (__setupError instanceof SyntaxError) __emit(__JUDGE_COMPILE__ + "SyntaxError: " + __setupError.message);
else for (let i = 0; i < __TESTS.length; i++) {
  const buf = [];
  const capture = (...a) => { buf.push(__format(a)); };
  console.log = console.info = console.warn = console.error = capture;
  const start = performance.now();
  let line;
  try {
    if (__setupError) throw __setupError;
    const output = __SPEC.kind === "design" ? __runDesign(__TESTS[i]) : __runFunction(__TESTS[i]);
    const ms = Math.round((performance.now() - start) * 1000) / 1000;
    line = { i, status: "ok", output, ms, stdout: buf.join("\n").slice(0, 20000) };
  } catch (e) {
    let msg = e instanceof RangeError && /call stack/i.test(e.message)
      ? "RangeError: Maximum call stack size exceeded"
      : (e && e.name ? e.name + ": " + e.message : String(e));
    line = { i, status: "error", error: msg + __where(e), stdout: buf.join("\n").slice(0, 20000) };
  }
  console.log = __log; console.info = __info; console.warn = __warn; console.error = __error;
  __emit(__MARKER + JSON.stringify(line));
}
`;

/** Printed instead of results when the user's code does not parse. */
export const COMPILE_MARKER = "\u0001COMPILE ";

/** Splits a compile error line out of harness output, for runners that print through stdout. */
export function splitCompileError(stdout: string): { compileError?: string; stdout: string } {
  const at = stdout.indexOf(COMPILE_MARKER);
  if (at === -1) return { stdout };
  const end = stdout.indexOf("\n", at);
  return { compileError: stdout.slice(at + COMPILE_MARKER.length, end === -1 ? undefined : end), stdout: "" };
}

/**
 * `new Function` puts two lines of its own before the body (`function anonymous(...` and `) {`),
 * which stack traces count.
 */
const FUNCTION_HEADER_LINES = 2;

export function buildJsProgram(spec: ProblemSpec, userJs: string, tests: AnyTestCase[]): string {
  if (!usesCoreFeatures(spec) || spec.kind === "sql") throw new Error("This problem is not available in JavaScript yet");
  const name = spec.kind === "design" ? spec.className : safeName(spec.function.java, "javascript");
  const body = `${userJs}\n;return typeof ${name} === "undefined" ? undefined : ${name};\n//# sourceURL=solution.js`;
  return JS_RUNNER.replace("__JUDGE_SPEC__", () => JSON.stringify(JSON.stringify(spec)))
    .replace("__JUDGE_TESTS__", () => JSON.stringify(JSON.stringify(tests.map((t) => t.input))))
    .replace("__JUDGE_MARKER__", () => JSON.stringify(RESULT_MARKER))
    .replace("__JUDGE_COMPILE__", () => JSON.stringify(COMPILE_MARKER))
    .replace("__JUDGE_LINE_OFFSET__", String(FUNCTION_HEADER_LINES))
    .replace("__JUDGE_USER__", () => JSON.stringify(body));
}

/** TypeScript compiler options shared by the browser worker and the Node verifier. */
export const TS_COMPILER_OPTIONS = {
  target: 7 /* ES2020 */,
  module: 0 /* None */,
  removeComments: false,
  // Emit even when there are type errors, as LeetCode does: tests decide correctness.
  noEmitOnError: false,
} as const;
