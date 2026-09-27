import { PYTHON_COLLECTION_HELPERS, usesCollectionHelpers } from "./helpers";
import { PYTHON_INTERACTIVE, usesInteractive } from "./interactive";
import type { AnyTestCase, ProblemSpec } from "./types";
import { RESULT_MARKER } from "./types";
import { PYTHON_GRAPH, usesGraph } from "./graph";
import { buildSqlProgram } from "./sql";
import { nodeType, PYTHON_NARY, PYTHON_RANDOM, PYTHON_NEXT, PYTHON_MULTI } from "./nodes";
import { pythonEnvironment } from "./environment";

/** Helper classes available to user code, mirroring the course's definitions. */
export const PYTHON_PRELUDE = `
from typing import *
import collections, heapq, math, bisect, itertools, functools, string
from collections import deque, defaultdict, Counter, OrderedDict
from heapq import heappush, heappop, heapify
from functools import lru_cache, cmp_to_key

class ListNode:
    # LeetCode names the field "val" and the course names it "value"; both work.
    def __init__(self, val=0, next=None, *, value=None):
        self.val = val if value is None else value
        self.next = next
    @property
    def value(self):
        return self.val
    @value.setter
    def value(self, v):
        self.val = v
    def __repr__(self):
        return f"ListNode({self.val})"

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

class NestedInteger:
    def __init__(self, value=None):
        self._value = value if value is not None else []
    def isInteger(self): return isinstance(self._value, int)
    def getInteger(self): return self._value if self.isInteger() else None
    def getList(self): return None if self.isInteger() else self._value
    def setInteger(self, value): self._value = value
    def add(self, elem):
        if self.isInteger(): self._value = []
        self._value.append(elem)
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

    def build_tree(v, cls=TreeNode):
        if not v or v[0] is None:
            return None
        root = cls(v[0])
        q = deque([root])
        i = 1
        while q and i < len(v):
            node = q.popleft()
            if i < len(v) and v[i] is not None:
                node.left = cls(v[i]); node.left.parent = node; q.append(node.left)
            i += 1
            if i < len(v) and v[i] is not None:
                node.right = cls(v[i]); node.right.parent = node; q.append(node.right)
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
        if t == "GraphNode":
            return __graph_build(v)
        if t == "RandomNode":
            return __random_build(v)
        if t == "NaryNode":
            return __nary_build(v)
        if t == "NextNode":
            return build_tree(v, Node)
        if t == "MultiNode": return __multi_build(v)
        if t == "DoublyNode":
            return build_tree(v, Node)
        if t == "ParentNode":
            for node in __binary_nodes(globals()["__parent_root"]).values():
                if node.val == v: return node
            raise ValueError("Unknown node value")
        if t == "CircularNode":
            return __circular_build(v)
        if t == "NestedInteger":
            if isinstance(v, int): return NestedInteger(v)
            node = NestedInteger()
            for x in v: node.add(conv("NestedInteger", x))
            return node
        if t == "List<NestedInteger>":
            return [conv("NestedInteger", x) for x in v]
        if t == "IntIterator": return Iterator(v)
        if t == "List<Employee>": return [Employee(*row) for row in v]
        if t == "HtmlParser": return HtmlParser(v)
        if t == "Robot": return Robot(v)
        if t == "Master": return Master(v)
        if t == "SparseVector":
            return SparseVector(v)
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
            return [ser_list(x) if x is not None else None for x in v]
        if t == "TreeNode":
            return ser_tree(v)
        if t == "GraphNode":
            return __graph_values(v)
        if t == "RandomNode":
            return __random_values(v)
        if t == "NaryNode":
            return __nary_values(v)
        if t == "NextNode":
            return special("nextLevels", v)
        if t == "List<TreeNode>":
            return [ser_tree(x) if x is not None else None for x in v]
        return plain(v)

    def plain(v):
        if isinstance(v, NestedInteger):
            return v.getInteger() if v.isInteger() else plain(v.getList())
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
        if kind == "unsigned32":
            return v & 0xffffffff
        if kind == "value":
            if v is None:
                return None
            return getattr(v, "value", getattr(v, "val", None))
        if kind == "nextLevels":
            levels, head, seen = [], v, set()
            while head is not None and len(levels) < _LIMIT:
                level, n, nxt = [], head, None
                while n is not None and len(level) < _LIMIT:
                    if id(n) in seen: raise ValueError("The next pointers contain a cycle")
                    seen.add(id(n))
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
        if _SPEC.get("environment"):
            globals()["__environment"] = args[len(_SPEC["params"])]
            globals()["__read_position"] = 0
            if _SPEC["environment"]["kind"] == "parentTree":
                globals()["__parent_root"] = build_tree(globals()["__environment"], Node)
        params = _SPEC["params"]
        conv_args, original_args = [], []
        tree_nodes = {}
        list_nodes = {}
        originals = {}
        for p, a in zip(params, args):
            if "fromTree" in p:
                root = conv_args[p["fromTree"]]
                pending = [root] if root is not None else []
                found = None
                while pending:
                    node = pending.pop()
                    tree_nodes[id(node)] = node
                    if node.val == a:
                        found = node
                    if node.left: pending.append(node.left)
                    if node.right: pending.append(node.right)
                if found is None: raise ValueError("Node value is absent from the tree")
                conv_args.append(found)
                original_args.append(found)
            else:
                value = conv(p["type"], a)
                if p["type"] == "ListNode" and "fromList" in p and a.get("tail") is not None:
                    tail = original_args[p["fromList"]]
                    for _ in range(a["tail"]): tail = tail.next
                    if value is None: value = tail
                    else:
                        end = value
                        while end.next is not None: end = end.next
                        end.next = tail
                original_args.append(value)
                if p["type"] == "ListNode":
                    n = value
                    while n is not None and id(n) not in list_nodes:
                        list_nodes[id(n)] = n; n = n.next
                    if isinstance(a, dict) and "at" in a:
                        for _ in range(a["at"]): value = value.next
                conv_args.append(value)
                if p["type"] == "GraphNode": originals.update(__graph_nodes(value))
                if p["type"] == "RandomNode": originals.update(__random_nodes(value))
                if p["type"] == "CircularNode": originals.update(__circular_nodes(value))
                if p["type"] == "MultiNode": originals.update(__multi_nodes(value))
                if p["type"] == "DoublyNode": originals.update(__binary_nodes(value))
        if "returnTree" in _SPEC:
            tree_nodes = {}
            pending = [conv_args[_SPEC["returnTree"]]]
            while pending:
                node = pending.pop()
                if node is None: continue
                tree_nodes[id(node)] = node
                pending.extend([node.left, node.right])
        codec = _SPEC.get("roundTrip")
        if codec:
            obj = globals()[codec["className"]]()
            encoded = getattr(obj, codec["encode"])(*conv_args)
            decoder = obj if codec.get("sameInstance") else globals()[codec["className"]]()
            ret = getattr(decoder, codec["decode"])(encoded)
        else:
            ret = getattr(Solution(), _SPEC["function"]["python"])(*conv_args)
        if (tree_nodes or "returnTree" in _SPEC) and _SPEC["returns"] == "TreeNode" and ret is not None and id(ret) not in tree_nodes:
            raise ValueError("Return a node from the original tree")
        if any("fromList" in p for p in params) and _SPEC["returns"] == "ListNode" and ret is not None and id(ret) not in list_nodes:
            raise ValueError("Return a node from the original lists")
        if _SPEC["returns"] == "GraphNode":
            return __graph_values(ret, originals)
        if _SPEC["returns"] == "RandomNode":
            return __random_values(ret, originals)
        if _SPEC["returns"] == "NaryNode":
            return __nary_values(ret)
        if _SPEC["returns"] == "NextNode":
            return special("nextLevels", ret)
        if _SPEC["returns"] == "MultiNode": return __multi_values(ret, originals)
        if _SPEC["returns"] == "DoublyNode":
            return __circular_values(ret, "right", originals)
        if _SPEC["returns"] == "CircularNode":
            return __circular_values(ret, originals=originals, insertion=True)
        if _SPEC["returns"] == "ParentNode":
            if ret is None: return None
            if conv("ParentNode", ret.val) is not ret: raise ValueError("Return an original node")
            return ret.val
        output = _SPEC.get("output") or {}
        if "arg" in output:
            idx = output["arg"]
            val, t = (original_args[idx] if output.get("root") else conv_args[idx]), params[idx]["type"]
        else:
            val, t = ret, _SPEC["returns"]
        if output.get("as") == "interaction": return val._result()
        if output.get("as") == "listIndex":
            if ret is None: return -1
            for index, node in enumerate(list_nodes.values()):
                if node is ret: return index
            raise ValueError("Return an original list node")
        if output.get("as"):
            return special(output["as"], val)
        if output.get("prefix"):
            if not isinstance(ret, int) or ret < 0 or ret > len(val):
                raise ValueError("The returned length is outside the output buffer")
            return plain(val[:ret])
        return ser(t, val)

    def run_design(inp):
        if _SPEC.get("environment"):
            globals()["__environment"] = inp["environment"]
            globals()["__read_position"] = 0
        cls = globals()[_SPEC["className"]]
        ctor = [conv(p["type"], a) for p, a in zip(_SPEC["ctorParams"], inp["ctor"])]
        obj = cls(*ctor)
        methods = {m["name"]: m for m in _SPEC["methods"]}
        results = []
        for op, a in zip(inp["ops"], inp["args"]):
            m = methods[op]
            ca = [conv(p["type"], x) for p, x in zip(m["params"], a)]
            r = getattr(obj, op)(*ca)
            output = m.get("output") or {}
            value = ca[output["arg"]] if "arg" in output else (None if m["returns"] == "void" else r)
            t = m["params"][output["arg"]]["type"] if "arg" in output else m["returns"]
            if output.get("prefix"):
                if not isinstance(r, int) or r < 0 or r > len(value): raise ValueError("Invalid output length")
                value = value[:r]
            results.append(special(output["as"], value) if output.get("as") else ser(t, value))
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
  if (spec.kind === "sql") return buildSqlProgram(spec, userCode, tests);
  const runner = PYTHON_RUNNER.replace("__JUDGE_SPEC__", JSON.stringify(b64(JSON.stringify(spec))))
    .replace("__JUDGE_TESTS__", JSON.stringify(b64(JSON.stringify(tests))))
    .replace("__JUDGE_MARKER__", JSON.stringify(RESULT_MARKER));
  const node = nodeType(spec);
  const binaryHelper = node === "CircularNode" ? PYTHON_NEXT.replace("def __init__(self, val=0, left=None, right=None, next=None):", "def __init__(self, val=0, next=None, left=None, right=None):") : PYTHON_NEXT;
  const helper = node === "MultiNode" ? PYTHON_MULTI : node === "RandomNode" ? PYTHON_RANDOM : node === "NaryNode" ? PYTHON_NARY : ["NextNode", "ParentNode", "DoublyNode", "CircularNode"].includes(node ?? "") ? binaryHelper : usesGraph(spec) ? PYTHON_GRAPH : "";
  return { prelude: PYTHON_PRELUDE + helper + (usesCollectionHelpers(spec) ? PYTHON_COLLECTION_HELPERS : "") + (usesInteractive(spec) ? PYTHON_INTERACTIVE : "") + pythonEnvironment(spec), user: userCode, runner };
}

/** Single-file program for CPython (used by the expected-output generator and tests). */
export function buildPythonScript(spec: ProblemSpec, userCode: string, tests: AnyTestCase[]) {
  const p = buildPythonProgram(spec, userCode, tests);
  return [p.prelude, `exec(compile(${JSON.stringify(p.user)}, "<solution>", "exec"), globals())`, p.runner].join("\n");
}
