import { javaType, listFieldFor } from "./java";
import type { CodeLang } from "../content-types";
import type { Param, ProblemSpec, ValueType } from "./types";
import { environmentBase } from "./environment";
import { concurrencyStarter } from "./concurrency";
import { cppParam, cppType } from "./cpp";
import { goType, listFieldForGo } from "./go";
import { goMethodName, languagesFor, safeName, type ExtraLang } from "./languages";

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

/** Types documented under their own name. */
const EXACT_HELPERS = new Set<string>([
  "IntIterator", "List<Employee>", "HtmlParser", "Robot", "Master", "ArrayReader",
  "GraphNode", "RandomNode", "NaryNode", "NextNode", "ParentNode", "DoublyNode", "CircularNode", "MultiNode",
]);

/** Helpers documented for any type that contains them, such as `List<ListNode>`. */
const CONTAINED_HELPERS = ["ListNode", "TreeNode", "Interval", "NestedInteger"];

function helperFor(t: ValueType): string | undefined {
  if (EXACT_HELPERS.has(t)) return t;
  return CONTAINED_HELPERS.find((name) => t.includes(name));
}

function usedHelpers(types: ValueType[]) {
  return [...new Set(types.map(helperFor).filter((name): name is string => name !== undefined))];
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
  if (spec.kind !== "design" && spec.concurrency) return concurrencyStarter(spec, lang);
  if (lang !== "python" && lang !== "java") return extraStarter(spec, lang);
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

/* ---------------------------------------------------------------- JavaScript, TypeScript, C++, Go */

const TS_TYPE: Partial<Record<ValueType, string>> = {
  int: "number", long: "number", double: "number", boolean: "boolean", string: "string", char: "string",
  "int[]": "number[]", "long[]": "number[]", "double[]": "number[]", "char[]": "string[]", "string[]": "string[]",
  "boolean[]": "boolean[]", "int[][]": "number[][]", "char[][]": "string[][]",
  "List<int>": "number[]", "List<double>": "number[]", "List<boolean>": "boolean[]", "List<string>": "string[]",
  "List<List<int>>": "number[][]", "List<List<string>>": "string[][]", "List<int[]>": "number[][]",
  ListNode: "ListNode | null", "ListNode[]": "Array<ListNode | null>", TreeNode: "TreeNode | null",
  "List<TreeNode>": "Array<TreeNode | null>", Interval: "Interval", "Interval[]": "Interval[]", "List<Interval>": "Interval[]",
  void: "void",
};

function tsType(t: ValueType) {
  const name = TS_TYPE[t];
  if (!name) throw new Error(`Type ${t} is not supported in TypeScript`);
  return name;
}

/** JSDoc type names, as in LeetCode's JavaScript stubs. */
function jsDocType(t: ValueType) {
  return tsType(t).replace(/Array<(.+)>/, "$1[]").replace(/ \| null/g, "");
}

const EXTRA_HELPER_DOCS: Record<string, Record<ExtraLang, string>> = {
  ListNode: {
    javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */`,
    typescript: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null)
 * }
 */`,
    cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int VAL;
 *     ListNode *next;
 *     ListNode() : VAL(0), next(nullptr) {}
 *     ListNode(int x) : VAL(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : VAL(x), next(next) {}
 * };
 */`,
    go: `/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     GOVAL int
 *     Next *ListNode
 * }
 */`,
  },
  TreeNode: {
    javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */`,
    typescript: `/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null)
 * }
 */`,
    cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */`,
    go: `/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */`,
  },
  Interval: {
    javascript: "/**\n * Definition for an interval.\n * class Interval { constructor(start, end) { this.start = start; this.end = end; } }\n */",
    typescript: "/**\n * Definition for an interval.\n * class Interval { start: number; end: number; constructor(start: number, end: number) }\n */",
    cpp: "/**\n * Definition for an interval.\n * class Interval {\n * public:\n *     int start, end;\n *     Interval(int start, int end);\n * };\n */",
    go: "/**\n * Definition for an interval.\n * type Interval struct {\n *     Start int\n *     End int\n * }\n */",
  },
};

function extraHead(spec: ProblemSpec, lang: ExtraLang) {
  const docs = usedHelpers(allTypes(spec))
    .map((h) => EXTRA_HELPER_DOCS[h]?.[lang])
    .filter(Boolean)
    .map((doc) => doc!.replaceAll("GOVAL", listFieldForGo(spec.style)).replaceAll("VAL", listFieldFor(spec.style)))
    .join("\n\n");
  return docs ? `${docs}\n\n` : "";
}

function jsDoc(params: Param[], returns?: ValueType) {
  const lines = params.map((p) => ` * @param {${jsDocType(p.type)}} ${p.name}`);
  if (returns) lines.push(` * @return {${jsDocType(returns)}}`);
  return lines.length ? `/**\n${lines.join("\n")}\n */\n` : "";
}

function indent(text: string, by: string) {
  return text.split("\n").map((l) => (l ? by + l : l)).join("\n");
}

function extraStarter(spec: Exclude<ProblemSpec, { kind: "sql" }>, lang: ExtraLang): string {
  const head = extraHead(spec, lang);
  if (spec.kind === "design") return head + designStarter(spec, lang);
  const params = spec.params;
  const name = safeName(spec.function.java, lang);
  const n = (p: Param) => safeName(p.name, lang);
  switch (lang) {
    case "javascript":
      return `${head}${jsDoc(params, spec.returns)}var ${name} = function(${params.map(n).join(", ")}) {\n    \n};\n`;
    case "typescript":
      return `${head}function ${name}(${params.map((p) => `${n(p)}: ${tsType(p.type)}`).join(", ")}): ${tsType(spec.returns)} {\n    \n};\n`;
    case "cpp":
      return `${head}class Solution {\npublic:\n    ${cppType(spec.returns)} ${name}(${params.map(cppParam).join(", ")}) {\n        \n    }\n};\n`;
    case "go": {
      const ret = spec.returns === "void" ? "" : ` ${goType(spec.returns)}`;
      return `${head}func ${name}(${params.map((p) => `${n(p)} ${goType(p.type)}`).join(", ")})${ret} {\n    \n}\n`;
    }
  }
}

function designStarter(spec: Extract<ProblemSpec, { kind: "design" }>, lang: ExtraLang): string {
  const cls = spec.className;
  const n = (p: Param) => safeName(p.name, lang);
  const ps = (params: Param[], typed?: (p: Param) => string) => params.map((p) => (typed ? typed(p) : n(p))).join(", ");
  switch (lang) {
    case "javascript": {
      const ctor = `${jsDoc(spec.ctorParams)}constructor(${ps(spec.ctorParams)}) {\n    \n}`;
      const methods = spec.methods.map((m) => `${jsDoc(m.params, m.returns)}${m.java}(${ps(m.params)}) {\n    \n}`);
      return `class ${cls} {\n${[ctor, ...methods].map((b) => indent(b, "    ")).join("\n\n")}\n}\n`;
    }
    case "typescript": {
      const ctor = `constructor(${ps(spec.ctorParams, (p) => `${n(p)}: ${tsType(p.type)}`)}) {\n    \n}`;
      const methods = spec.methods.map((m) => `${m.java}(${ps(m.params, (p) => `${n(p)}: ${tsType(p.type)}`)}): ${tsType(m.returns)} {\n    \n}`);
      return `class ${cls} {\n${[ctor, ...methods].map((b) => indent(b, "    ")).join("\n\n")}\n}\n`;
    }
    case "cpp": {
      const ctor = `${cls}(${spec.ctorParams.map(cppParam).join(", ")}) {\n    \n}`;
      const methods = spec.methods.map((m) => `${cppType(m.returns)} ${safeName(m.java, "cpp")}(${m.params.map(cppParam).join(", ")}) {\n    \n}`);
      return `class ${cls} {\npublic:\n${[ctor, ...methods].map((b) => indent(b, "    ")).join("\n\n")}\n};\n`;
    }
    case "go": {
      const ctor = `func Constructor(${ps(spec.ctorParams, (p) => `${n(p)} ${goType(p.type)}`)}) ${cls} {\n    \n}`;
      const methods = spec.methods.map((m) => {
        const ret = m.returns === "void" ? "" : ` ${goType(m.returns)}`;
        return `func (this *${cls}) ${goMethodName(m.java)}(${ps(m.params, (p) => `${n(p)} ${goType(p.type)}`)})${ret} {\n    \n}`;
      });
      return `type ${cls} struct {\n    \n}\n\n${[ctor, ...methods].join("\n\n")}\n`;
    }
  }
}

/** Starter code for every language the problem can be solved in. */
export function generateStarters(spec: ProblemSpec): Partial<Record<CodeLang, string>> {
  return Object.fromEntries(languagesFor(spec).map((lang) => [lang, generateStarter(spec, lang)]));
}
