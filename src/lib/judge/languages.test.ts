import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { describe, it } from "node:test";
import { EXTRA_LANGS, languagesFor, safeName, usesCoreFeatures, type ExtraLang } from "./languages";
import { runExtraLocally } from "./local-extra";
import { generateStarter, generateStarters } from "./starter";
import type { DesignSpec, FunctionSpec } from "./types";

const has = (cmd: string, flag = "--version") => {
  try {
    execFileSync(cmd, [flag], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};
const available: Record<ExtraLang, boolean> = { javascript: true, typescript: true, cpp: has("g++"), go: has("go", "version") };

const mixed: FunctionSpec = {
  id: "mixed",
  style: "leetcode",
  function: { python: "combine", java: "combine" },
  params: [
    { name: "root", type: "TreeNode" },
    { name: "head", type: "ListNode" },
    { name: "grid", type: "char[][]" },
  ],
  returns: "List<int>",
  tests: [
    { input: [[1, 2, 3, null, 4], [5, 6], [["a", "b"], ["c", "d"]]], expected: [4, 11, 4] },
    { input: [[], [], []], expected: [0, 0, 0] },
  ],
};

/** Tree size, list sum and grid cell count, written in each language. */
const MIXED: Record<ExtraLang, string> = {
  javascript: `var combine = function(root, head, grid) {
    const size = (n) => (n ? 1 + size(n.left) + size(n.right) : 0);
    let sum = 0;
    for (let n = head; n; n = n.next) sum += n.val;
    return [size(root), sum, grid.reduce((a, row) => a + row.length, 0)];
};`,
  typescript: `function combine(root: TreeNode | null, head: ListNode | null, grid: string[][]): number[] {
    const size = (n: TreeNode | null): number => (n ? 1 + size(n.left) + size(n.right) : 0);
    let sum = 0;
    for (let n = head; n; n = n.next) sum += n.val;
    return [size(root), sum, grid.reduce((a, row) => a + row.length, 0)];
}`,
  cpp: `class Solution {
public:
    int size(TreeNode* n) { return n ? 1 + size(n->left) + size(n->right) : 0; }
    vector<int> combine(TreeNode* root, ListNode* head, vector<vector<char>>& grid) {
        int sum = 0, cells = 0;
        for (ListNode* n = head; n; n = n->next) sum += n->val;
        for (auto& row : grid) cells += row.size();
        return {size(root), sum, cells};
    }
};`,
  go: `func size(n *TreeNode) int {
	if n == nil {
		return 0
	}
	return 1 + size(n.Left) + size(n.Right)
}

func combine(root *TreeNode, head *ListNode, grid [][]byte) []int {
	sum, cells := 0, 0
	for n := head; n != nil; n = n.Next {
		sum += n.Val
	}
	for _, row := range grid {
		cells += len(row)
	}
	return []int{size(root), sum, cells}
}`,
};

/** Code that fails on the first test, to check runtime errors carry the user's line number. */
const CRASH: Record<ExtraLang, { code: string; line: number }> = {
  javascript: { code: "var combine = function(root) {\n    return root.left.left.val;\n};", line: 2 },
  typescript: { code: "function combine(root: any): number[] {\n    return root.left.left.val;\n}", line: 2 },
  cpp: { code: "class Solution {\npublic:\n    vector<int> combine(TreeNode* root, ListNode* head, vector<vector<char>>& grid) {\n        throw runtime_error(\"boom\");\n    }\n};", line: 0 },
  go: { code: "func combine(root *TreeNode, head *ListNode, grid [][]byte) []int {\n\tvar a []int\n\treturn []int{a[3]}\n}", line: 3 },
};

const SYNTAX: Record<ExtraLang, string> = {
  javascript: "var combine = function( {",
  typescript: "function combine(: number {",
  cpp: "class Solution { public: vector<int> combine(TreeNode* root, ListNode* head, vector<vector<char>>& grid) { return nope; } };",
  go: "func combine(root *TreeNode, head *ListNode, grid [][]byte) []int { return nope }",
};

const counter: DesignSpec = {
  kind: "design",
  id: "counter",
  style: "leetcode",
  className: "Counter",
  ctorParams: [{ name: "start", type: "int" }],
  methods: [
    { name: "add", java: "add", params: [{ name: "delta", type: "int" }], returns: "void" },
    { name: "union", java: "union", params: [{ name: "values", type: "int[]" }], returns: "long" },
    { name: "get", java: "get", params: [], returns: "int" },
  ],
  tests: [{ input: { ctor: [5], ops: ["add", "union", "get"], args: [[2], [[1, 2]], []] }, expected: [null, 10, 10] }],
};

const COUNTER: Record<ExtraLang, string> = {
  javascript: "class Counter {\n  constructor(start) { this.n = start; }\n  add(d) { this.n += d; }\n  union(v) { for (const x of v) this.n += x; return this.n; }\n  get() { return this.n; }\n}",
  typescript: "class Counter {\n  constructor(private n: number) {}\n  add(d: number): void { this.n += d; }\n  union(v: number[]): number { for (const x of v) this.n += x; return this.n; }\n  get(): number { return this.n; }\n}",
  cpp: "class Counter {\n  long long n;\npublic:\n  Counter(int start) : n(start) {}\n  void add(int d) { n += d; }\n  long long union_(vector<int>& v) { for (int x : v) n += x; return n; }\n  int get() { return (int)n; }\n};",
  go: "type Counter struct{ n int }\n\nfunc Constructor(start int) Counter { return Counter{start} }\nfunc (c *Counter) Add(d int) { c.n += d }\nfunc (c *Counter) Union(v []int) int64 {\n\tfor _, x := range v {\n\t\tc.n += x\n\t}\n\treturn int64(c.n)\n}\nfunc (c *Counter) Get() int { return c.n }",
};

describe("extra language support", () => {
  it("offers extra languages only for specs that use core features", () => {
    assert.deepEqual(languagesFor(mixed), ["python", "java", ...EXTRA_LANGS]);
    const graph: FunctionSpec = { ...mixed, params: [{ name: "node", type: "GraphNode" }], returns: "GraphNode" };
    assert.equal(usesCoreFeatures(graph), false);
    assert.deepEqual(languagesFor(graph), ["python", "java"]);
    assert.deepEqual(Object.keys(generateStarters(graph)), ["python", "java"]);
  });

  it("escapes identifiers that are keywords in the target language", () => {
    assert.equal(safeName("union", "cpp"), "union_");
    assert.equal(safeName("union", "go"), "union");
    assert.equal(safeName("type", "go"), "type_");
    assert.equal(safeName("new", "javascript"), "new_");
    assert.match(generateStarter(counter, "cpp"), /long long union_\(vector<int>& values\)/);
    assert.match(generateStarter(counter, "go"), /func \(this \*Counter\) Union\(values \[\]int\) int64/);
  });

  it("writes LeetCode-style starters", () => {
    assert.match(generateStarter(mixed, "javascript"), /var combine = function\(root, head, grid\)/);
    assert.match(generateStarter(mixed, "typescript"), /function combine\(root: TreeNode \| null, head: ListNode \| null, grid: string\[\]\[\]\): number\[\]/);
    assert.match(generateStarter(mixed, "cpp"), /vector<int> combine\(TreeNode\* root, ListNode\* head, vector<vector<char>>& grid\)/);
    assert.match(generateStarter(mixed, "go"), /func combine\(root \*TreeNode, head \*ListNode, grid \[\]\[\]byte\) \[\]int/);
  });

  for (const lang of EXTRA_LANGS) {
    const options = { skip: !available[lang] && `${lang} toolchain not installed` };
    it(`${lang}: builds trees, lists and grids and grades the result`, options, async () => {
      const outcome = await runExtraLocally(mixed, lang, MIXED[lang], mixed.tests);
      assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
    });
    it(`${lang}: reports runtime errors on the user's line`, options, async () => {
      const outcome = await runExtraLocally(mixed, lang, CRASH[lang].code, mixed.tests);
      assert.equal(outcome.verdict, "Runtime Error", JSON.stringify(outcome));
      if (CRASH[lang].line) assert.ok((outcome.cases[0].error ?? "").includes(`line ${CRASH[lang].line})`));
    });
    it(`${lang}: reports syntax errors as compile errors`, options, async () => {
      const outcome = await runExtraLocally(mixed, lang, SYNTAX[lang], mixed.tests);
      assert.equal(outcome.verdict, "Compile Error", JSON.stringify(outcome));
    });
    it(`${lang}: runs design classes, including keyword method names`, options, async () => {
      const outcome = await runExtraLocally(counter, lang, COUNTER[lang], counter.tests);
      assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
    });
  }

  it("cpp: turns crashes into a runtime error for the running case", { skip: !available.cpp }, async () => {
    const code = "class Solution {\npublic:\n    vector<int> combine(TreeNode* root, ListNode* head, vector<vector<char>>& grid) {\n        return {root->left->left->val};\n    }\n};";
    const outcome = await runExtraLocally(mixed, "cpp", code, mixed.tests);
    assert.equal(outcome.verdict, "Runtime Error");
    assert.match(outcome.cases[0].error ?? "", /Segmentation fault/);
  });

  it("javascript: stops infinite loops with a time limit", async () => {
    const outcome = await runExtraLocally(mixed, "javascript", "var combine = function() { for (;;) {} };", mixed.tests, 1500);
    assert.equal(outcome.verdict, "Time Limit Exceeded");
  });
});
