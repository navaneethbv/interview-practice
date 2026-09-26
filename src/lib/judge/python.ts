import type { AnyTestCase, ProblemSpec } from "./types";
import { RESULT_MARKER } from "./types";

/** Helper classes available to user code, mirroring the course's definitions. */
export const PYTHON_PRELUDE = `
from typing import *
import collections, heapq, math, bisect, itertools, functools, string
from collections import deque, defaultdict, Counter, OrderedDict
from heapq import heappush, heappop, heapify
from functools import lru_cache, cmp_to_key

class ListNode:
    def __init__(self, value=0, next=None):
        self.value = value
        self.next = next
    def __repr__(self):
        return f"ListNode({self.value})"

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        self.next = None
    def __repr__(self):
        return f"TreeNode({self.val})"

class Interval:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    def __repr__(self):
        return f"[{self.start}, {self.end}]"

class ArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def get(self, index):
        if index >= len(self.arr):
            return math.inf
        return self.arr[index]
`;

const PYTHON_RUNNER = String.raw`
def __judge_main():
    import json as _json, sys as _sys, io as _io, time as _time, traceback as _tb, base64 as _b64, math as _math
    _SPEC = _json.loads(_b64.b64decode(__JUDGE_SPEC__).decode("utf-8"))
    _TESTS = _json.loads(_b64.b64decode(__JUDGE_TESTS__).decode("utf-8"))
    _out = _sys.stdout
    _LIMIT = 100000

    def build_list(v):
        pos = -1
        if isinstance(v, dict):
            pos = v.get("pos", -1)
            v = v.get("values", [])
        if not v:
            return None
        nodes = [ListNode(x) for x in v]
        for a, b in zip(nodes, nodes[1:]):
            a.next = b
        if pos is not None and 0 <= pos < len(nodes):
            nodes[-1].next = nodes[pos]
        return nodes[0]

    def build_tree(v):
        if not v or v[0] is None:
            return None
        root = TreeNode(v[0])
        q = deque([root])
        i = 1
        while q and i < len(v):
            node = q.popleft()
            if i < len(v) and v[i] is not None:
                node.left = TreeNode(v[i]); q.append(node.left)
            i += 1
            if i < len(v) and v[i] is not None:
                node.right = TreeNode(v[i]); q.append(node.right)
            i += 1
        return root

    def conv(t, v):
        if v is None:
            return None
        if t == "ListNode":
            return build_list(v)
        if t == "ListNode[]":
            return [build_list(x) for x in v]
        if t == "TreeNode":
            return build_tree(v)
        if t == "Interval":
            return Interval(v[0], v[1])
        if t in ("Interval[]", "List<Interval>"):
            return [Interval(a, b) for a, b in v]
        if t == "List<List<Interval>>":
            return [[Interval(a, b) for a, b in row] for row in v]
        if t == "ArrayReader":
            return ArrayReader(list(v))
        if t == "double":
            return float(v)
        if t in ("double[]", "List<double>"):
            return [float(x) for x in v]
        if isinstance(v, list):
            return _json.loads(_json.dumps(v))
        return v

    def ser_list(node):
        out = []
        while node is not None and len(out) < _LIMIT:
            out.append(node.value)
            node = node.next
        return out

    def ser_tree(root):
        if root is None:
            return []
        out, q = [], deque([root])
        while q:
            n = q.popleft()
            if n is None:
                out.append(None)
                continue
            out.append(n.val)
            q.append(n.left)
            q.append(n.right)
        while out and out[-1] is None:
            out.pop()
        return out

    def ser(t, v):
        if v is None:
            return None
        if t == "ListNode":
            return ser_list(v)
        if t == "ListNode[]":
            return [ser_list(x) for x in v]
        if t == "TreeNode":
            return ser_tree(v)
        if t == "List<TreeNode>":
            return [ser_tree(x) for x in v]
        return plain(v)

    def plain(v):
        if isinstance(v, (list, tuple, set, frozenset, deque)):
            return [plain(x) for x in v]
        if isinstance(v, ListNode):
            return ser_list(v)
        if isinstance(v, TreeNode):
            return ser_tree(v)
        if isinstance(v, Interval):
            return [v.start, v.end]
        if isinstance(v, dict):
            return {str(k): plain(x) for k, x in v.items()}
        if isinstance(v, float) and (_math.isinf(v) or _math.isnan(v)):
            return str(v)
        return v

    def special(kind, v):
        if kind == "value":
            if v is None:
                return None
            return getattr(v, "value", getattr(v, "val", None))
        if kind == "nextLevels":
            levels, head = [], v
            while head is not None and len(levels) < _LIMIT:
                level, n, nxt = [], head, None
                while n is not None and len(level) < _LIMIT:
                    level.append(n.val)
                    if nxt is None:
                        nxt = n.left or n.right
                    n = n.next
                levels.append(level)
                head = nxt
            return levels
        if kind == "nextChain":
            out, n = [], v
            while n is not None and len(out) < _LIMIT:
                out.append(n.val)
                n = n.next
            return out
        return v

    def emit(obj):
        _out.write(__JUDGE_MARKER__ + _json.dumps(obj) + "\n")
        _out.flush()

    def run_function(args):
        params = _SPEC["params"]
        conv_args = [conv(p["type"], a) for p, a in zip(params, args)]
        fn = getattr(Solution(), _SPEC["function"]["python"])
        ret = fn(*conv_args)
        output = _SPEC.get("output") or {}
        if "arg" in output:
            idx = output["arg"]
            val, t = conv_args[idx], params[idx]["type"]
        else:
            val, t = ret, _SPEC["returns"]
        if output.get("as"):
            return special(output["as"], val)
        return ser(t, val)

    def run_design(inp):
        cls = globals()[_SPEC["className"]]
        ctor = [conv(p["type"], a) for p, a in zip(_SPEC["ctorParams"], inp["ctor"])]
        obj = cls(*ctor)
        methods = {m["name"]: m for m in _SPEC["methods"]}
        results = []
        for op, a in zip(inp["ops"], inp["args"]):
            m = methods[op]
            ca = [conv(p["type"], x) for p, x in zip(m["params"], a)]
            r = getattr(obj, op)(*ca)
            results.append(None if m["returns"] == "void" else ser(m["returns"], r))
        return results

    design = _SPEC.get("kind") == "design"
    for i, test in enumerate(_TESTS):
        buf = _io.StringIO()
        _sys.stdout = buf
        start = _time.perf_counter()
        try:
            output = run_design(test["input"]) if design else run_function(test["input"])
            ms = (_time.perf_counter() - start) * 1000
            _sys.stdout = _out
            emit({"i": i, "status": "ok", "output": output, "stdout": buf.getvalue()[:20000], "ms": round(ms, 3)})
        except Exception as e:
            _sys.stdout = _out
            frames = [f for f in _tb.extract_tb(e.__traceback__) if f.filename == "<solution>"]
            where = f" (line {frames[-1].lineno})" if frames else ""
            if isinstance(e, RecursionError):
                msg = "RecursionError: maximum recursion depth exceeded" + where
            else:
                msg = f"{type(e).__name__}: {e}{where}"
            emit({"i": i, "status": "error", "error": msg, "stdout": buf.getvalue()[:20000]})

__judge_main()
`;

function b64(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

/**
 * Returns the pieces of a Python judge program. User code is compiled separately with the
 * filename "<solution>" so tracebacks report the user's own line numbers.
 */
export function buildPythonProgram(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]) {
  const runner = PYTHON_RUNNER.replace("__JUDGE_SPEC__", JSON.stringify(b64(JSON.stringify(spec))))
    .replace("__JUDGE_TESTS__", JSON.stringify(b64(JSON.stringify(tests))))
    .replace("__JUDGE_MARKER__", JSON.stringify(RESULT_MARKER));
  return { prelude: PYTHON_PRELUDE, user: userCode, runner };
}

/** Single-file program for CPython (used by the expected-output generator and tests). */
export function buildPythonScript(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]) {
  const p = buildPythonProgram(spec, userCode, tests);
  return [p.prelude, `exec(compile(${JSON.stringify(p.user)}, "<solution>", "exec"), globals())`, p.runner].join("\n");
}
