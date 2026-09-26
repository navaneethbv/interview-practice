import { javaType } from "./java";
import type { CodeLang } from "../content-types";
import type { Param, ProblemSpec, ValueType } from "./types";

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
  "List<double>": "List[float]",
  "List<string>": "List[str]",
  "List<List<int>>": "List[List[int]]",
  "List<List<string>>": "List[List[str]]",
  "List<int[]>": "List[List[int]]",
  ListNode: "Optional[ListNode]",
  "ListNode[]": "List[Optional[ListNode]]",
  TreeNode: "Optional[TreeNode]",
  "List<TreeNode>": "List[Optional[TreeNode]]",
  Interval: "Interval",
  "Interval[]": "List[Interval]",
  "List<Interval>": "List[Interval]",
  "List<List<Interval>>": "List[List[Interval]]",
  ArrayReader: "ArrayReader",
  void: "None",
};

const HELPER_DOCS: Record<string, { python: string; java: string }> = {
  ListNode: {
    python: `# Definition for a singly-linked list node.
# class ListNode:
#     def __init__(self, value=0, next=None):
#         self.value = value
#         self.next = next`,
    java: `/**
 * Definition for a singly-linked list node.
 * class ListNode {
 *     int value;
 *     ListNode next;
 *     ListNode(int value) { this.value = value; }
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
    if (t === "ArrayReader") names.add("ArrayReader");
  }
  return [...names];
}

function allTypes(spec: ProblemSpec): ValueType[] {
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
  const docs = usedHelpers(allTypes(spec))
    .map((h) => HELPER_DOCS[h][lang])
    .join("\n\n");
  const head = docs ? `${docs}\n\n` : "";

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
    return `${head}class ${spec.className} {\n\n${methods.join("\n\n")}\n}\n`;
  }
  return `${head}class Solution {\n    public ${javaType(spec.returns)} ${spec.function.java}(${javaParams(spec.params)}) {\n        \n    }\n}\n`;
}
