import { javaType, listFieldFor } from "./java";
import type { CodeLang } from "../content-types";
import type { Param, ProblemSpec, ValueType } from "./types";
import { environmentBase } from "./environment";

const PY_TYPE: Record<ValueType, string> = {
  int: "int",
  long: "int",
  double: "float",
  boolean: "bool",
  string: "str",
  char: "str",
  "int[]": "List[int]",
  "long[]": "List[int]",
  "double[]": "List[float]",
  "char[]": "List[str]",
  "string[]": "List[str]",
  "boolean[]": "List[bool]",
  "int[][]": "List[List[int]]",
  "char[][]": "List[List[str]]",
  "List<int>": "List[int]",
  "List<boolean>": "List[bool]",
  "List<double>": "List[float]",
  "List<string>": "List[str]",
  "List<List<int>>": "List[List[int]]",
  "List<List<string>>": "List[List[str]]",
  "List<int[]>": "List[List[int]]",
  ListNode: "Optional[ListNode]",
  "ListNode[]": "List[Optional[ListNode]]",
  TreeNode: "Optional[TreeNode]",
  GraphNode: "Optional[Node]",
  RandomNode: "Optional[Node]",
  NaryNode: "Optional[Node]",
  NextNode: "Optional[Node]",
  ParentNode: "Node",
  DoublyNode: "Optional[Node]",
  CircularNode: "Optional[Node]",
  MultiNode: "Optional[Node]",
  NestedInteger: "NestedInteger",
  "List<NestedInteger>": "List[NestedInteger]",
  IntIterator: "Iterator",
  "List<Employee>": "List[Employee]",
  HtmlParser: "HtmlParser",
  Robot: "Robot",
  Master: "Master",
  SparseVector: '"SparseVector"',
  "List<TreeNode>": "List[Optional[TreeNode]]",
  Interval: "Interval",
  "Interval[]": "List[Interval]",
  "List<Interval>": "List[Interval]",
  "List<List<Interval>>": "List[List[Interval]]",
  ArrayReader: "ArrayReader",
  void: "None",
};

const HELPER_DOCS: Record<string, { python: string; java: string }> = {
  IntIterator: {python:"# Iterator provides hasNext() -> bool and next() -> int.",java:"/** java.util.Iterator<Integer> provides hasNext() and next(). */"},
  "List<Employee>": {python:"# Employee provides id, importance and subordinates: List[int].",java:"/** Employee provides int id, int importance, List<Integer> subordinates. */"},
  HtmlParser: {python:"# HtmlParser provides getUrls(url: str) -> List[str].",java:"/** HtmlParser provides List<String> getUrls(String url). */"},
  Robot: {python:"# Robot provides move() -> bool, turnLeft(), turnRight(), clean().",java:"/** Robot provides boolean move(); void turnLeft(); void turnRight(); void clean(). */"},
  Master: {python:"# Master provides guess(word: str) -> int.",java:"/** Master provides int guess(String word). */"},
  MultiNode: {python:"# Node provides val, prev, next and child.",java:"/** Node provides int val; Node prev, next, child. */"},
  ParentNode: { python: "# Node provides val, left, right and parent.", java: "/** Node provides int val; Node left, right, parent. */" },
  DoublyNode: { python: "# Node(val) provides left and right pointers; reuse them as previous and next.", java: "/** Node provides int val; Node left, right; Node(int val). */" },
  CircularNode: { python: "# Node(val=0, next=None) provides val and next.", java: "/** Node provides int val; Node next; Node(int val); Node(int val, Node next). */" },
  NestedInteger: {
    python: "# NestedInteger provides isInteger(), getInteger(), getList(), setInteger(value), add(elem).",
    java: "/** NestedInteger provides isInteger(), getInteger(), getList(), setInteger(int), add(NestedInteger). */",
  },
  NextNode: {
    python: "# Node(val=0, left=None, right=None, next=None) is provided.",
    java: "/** Node is provided: int val; Node left, right, next; Node(int val). */",
  },
  RandomNode: {
    python: "# Node(x, next=None, random=None) is provided, with val, next and random fields.",
    java: "/** Node is provided: int val; Node next, random; Node(int val). */",
  },
  NaryNode: {
    python: "# Node(val=None, children=None) is provided; children is a list of Node objects.",
    java: "/** Node is provided: public int val; public List<Node> children; Node(int val). */",
  },
  GraphNode: {
    python: "# Node(val=0, neighbors=None) is provided; neighbors is a list of Node objects.",
    java: "/** Node is provided: public int val; public List<Node> neighbors; Node(int val). */",
  },
  ListNode: {
    python: `# Definition for a singly-linked list node.
# class ListNode:
#     def __init__(self, VAL=0, next=None):
#         self.VAL = VAL
#         self.next = next`,
    java: `/**
 * Definition for a singly-linked list node.
 * class ListNode {
 *     int VAL;
 *     ListNode next;
 *     ListNode(int VAL) { this.VAL = VAL; }
 * }
 */`,
  },
  TreeNode: {
    python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
#         self.next = None`,
    java: `/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     int val;
 *     TreeNode left, right, next;
 *     TreeNode(int x) { val = x; }
 * }
 */`,
  },
  Interval: {
    python: `# Definition for an interval.
# class Interval:
#     def __init__(self, start, end):
#         self.start = start
#         self.end = end`,
    java: `/**
 * Definition for an interval.
 * class Interval {
 *     int start, end;
 *     Interval(int start, int end) { ... }
 * }
 */`,
  },
  ArrayReader: {
    python: `# ArrayReader is provided:
# class ArrayReader:
#     def get(self, index) -> int:  # returns math.inf when index is out of bounds`,
    java: `/**
 * ArrayReader is provided:
 * class ArrayReader {
 *     int get(int index); // returns Integer.MAX_VALUE when index is out of bounds
 * }
 */`,
  },
};

function usedHelpers(types: ValueType[]) {
  const names = new Set<string>();
  for (const t of types) {
    if (t.includes("ListNode")) names.add("ListNode");
    if (t.includes("TreeNode")) names.add("TreeNode");
    if (t.includes("Interval")) names.add("Interval");
    if (["IntIterator", "List<Employee>", "HtmlParser"].includes(t)) names.add(t);
    if (t === "Robot" || t === "Master") names.add(t);
    if (t === "ArrayReader") names.add("ArrayReader");
    if (t === "GraphNode") names.add("GraphNode");
    if (t === "RandomNode" || t === "NaryNode" || t === "NextNode") names.add(t);
    if (t.includes("NestedInteger")) names.add("NestedInteger");
    if (["ParentNode", "DoublyNode", "CircularNode", "MultiNode"].includes(t)) names.add(t);
  }
  return [...names];
}

function allTypes(spec: ProblemSpec): ValueType[] {
  if (spec.kind === "sql") return [];
  if (spec.kind === "design") {
    return [
      ...spec.ctorParams.map((p) => p.type),
      ...spec.methods.flatMap((m) => [...m.params.map((p) => p.type), m.returns]),
    ];
  }
  return [...spec.params.map((p) => p.type), spec.returns];
}

function pyParams(params: Param[]) {
  return ["self", ...params.map((p) => `${p.name}: ${PY_TYPE[p.type]}`)].join(", ");
}

function javaParams(params: Param[]) {
  return params.map((p) => `${javaType(p.type)} ${p.name}`).join(", ");
}

export function generateStarter(spec: ProblemSpec, lang: CodeLang): string {
  if (spec.kind === "sql") return "-- Write a SQLite query below.\n";
  if (lang === "sql") throw new Error("This problem requires Python or Java");
  const docs = usedHelpers(allTypes(spec))
    .map((h) => HELPER_DOCS[h][lang].replaceAll("VAL", listFieldFor(spec.style)))
    .join("\n\n");
  const head = docs ? `${docs}\n\n` : "";
  if (spec.kind !== "design" && spec.roundTrip) {
    const { className, encode, decode } = spec.roundTrip;
    if (lang === "python") return `${head}class ${className}:\n    def ${encode}(${pyParams(spec.params)}) -> str:\n        pass\n\n    def ${decode}(self, data: str) -> ${PY_TYPE[spec.returns]}:\n        pass\n`;
    return `${head}class ${className} {\n    public String ${encode}(${javaParams(spec.params)}) {\n        \n    }\n\n    public ${javaType(spec.returns)} ${decode}(String data) {\n        \n    }\n}\n`;
  }

  if (lang === "python") {
    if (spec.kind === "design") {
      const methods = [
        `    def __init__(${pyParams(spec.ctorParams)}):\n        pass`,
        ...spec.methods.map((m) => `    def ${m.name}(${pyParams(m.params)}) -> ${PY_TYPE[m.returns]}:\n        pass`),
      ];
      return `${head}class ${spec.className}:\n\n${methods.join("\n\n")}\n`;
    }
    return `${head}class Solution:\n    def ${spec.function.python}(${pyParams(spec.params)}) -> ${PY_TYPE[spec.returns]}:\n        \n`;
  }

  if (spec.kind === "design") {
    const methods = [
      `    public ${spec.className}(${javaParams(spec.ctorParams)}) {\n        \n    }`,
      ...spec.methods.map((m) => `    public ${javaType(m.returns)} ${m.java}(${javaParams(m.params)}) {\n        \n    }`),
    ];
    return `${head}class ${spec.className}${environmentBase(spec)} {\n\n${methods.join("\n\n")}\n}\n`;
  }
  return `${head}class Solution${environmentBase(spec)} {\n    public ${javaType(spec.returns)} ${spec.function.java}(${javaParams(spec.params)}) {\n        \n    }\n}\n`;
}
