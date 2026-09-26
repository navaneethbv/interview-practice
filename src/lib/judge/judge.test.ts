import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { describe, it } from "node:test";
import { judgeOutput } from "./compare";
import { grade } from "./grade";
import { buildJavaProgram, mapJavaCompileErrors } from "./java";
import { runJavaLocally, runPythonLocally } from "./local-java";
import { buildPythonScript } from "./python";
import type { FunctionSpec } from "./types";

const hasJava = (() => {
  try {
    execFileSync("javac", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

describe("judgeOutput", () => {
  it("tolerates floating point noise but not real differences", () => {
    assert.equal(judgeOutput("exact", [], [1.0000001, 2], [1, 2]), true);
    assert.equal(judgeOutput("exact", [], [1.01], [1]), false);
  });

  it("ignores order only where the mode allows it", () => {
    assert.equal(judgeOutput("unordered", [], [[1, 2], [3]], [[3], [1, 2]]), true);
    assert.equal(judgeOutput("unordered", [], [[2, 1], [3]], [[3], [1, 2]]), false);
    assert.equal(judgeOutput("unorderedDeep", [], [[2, 1], [3]], [[3], [1, 2]]), true);
  });

  it("accepts any valid topological order and rejects invalid ones", () => {
    const input = [4, [[3, 2], [3, 0], [2, 0], [2, 1]]];
    assert.equal(judgeOutput({ validator: "topoOrder" }, input, [3, 2, 0, 1], [3, 2, 1, 0]), true);
    assert.equal(judgeOutput({ validator: "topoOrder" }, input, [2, 3, 0, 1], [3, 2, 1, 0]), false);
    assert.equal(judgeOutput({ validator: "topoOrder" }, input, [3, 2, 0], [3, 2, 1, 0]), false);
  });

  it("checks rearranged strings", () => {
    assert.equal(judgeOutput({ validator: "noAdjacentRepeat" }, ["aappp"], "papap", "papap"), true);
    assert.equal(judgeOutput({ validator: "noAdjacentRepeat" }, ["aappp"], "ppapa", "papap"), false);
    assert.equal(judgeOutput({ validator: "kDistanceApart" }, ["mmpp", 2], "pmpm", "mpmp"), true);
    assert.equal(judgeOutput({ validator: "frequencySorted" }, ["Programming"], "rrggmmPiano", "x"), true);
    assert.equal(judgeOutput({ validator: "frequencySorted" }, ["Programming"], "rgrgmmPiano", "x"), false);
  });
});

/* A spec that exercises trees, linked lists and intervals in one call. */
const mixedSpec: FunctionSpec = {
  id: "mixed",
  function: { python: "combine", java: "combine" },
  params: [
    { name: "root", type: "TreeNode" },
    { name: "head", type: "ListNode" },
    { name: "intervals", type: "List<Interval>" },
  ],
  returns: "List<int>",
  tests: [
    { input: [[1, 2, 3, null, 4], [5, 6], [[1, 3], [2, 9]]], expected: [4, 11, 9] },
    { input: [[], [], []], expected: [0, 0, 0] },
  ],
};

const mixedPython = `
class Solution:
    def combine(self, root, head, intervals):
        def size(n):
            return 0 if n is None else 1 + size(n.left) + size(n.right)
        total, node = 0, head
        while node:
            total += node.value
            node = node.next
        return [size(root), total, sum(i.end - i.start for i in intervals)]
`;

const mixedJava = `
class Solution {
    int size(TreeNode n) { return n == null ? 0 : 1 + size(n.left) + size(n.right); }
    public List<Integer> combine(TreeNode root, ListNode head, List<Interval> intervals) {
        int total = 0;
        for (ListNode n = head; n != null; n = n.next) total += n.value;
        int span = 0;
        for (Interval i : intervals) span += i.end - i.start;
        return Arrays.asList(size(root), total, span);
    }
}
`;

/* In-place problem: the result is the mutated first argument. */
const inPlaceSpec: FunctionSpec = {
  id: "in-place",
  function: { python: "sort_colors", java: "sortColors" },
  params: [{ name: "arr", type: "int[]" }],
  returns: "void",
  output: { arg: 0 },
  tests: [{ input: [[2, 0, 1]], expected: [0, 1, 2] }],
};

describe("python harness", () => {
  it("converts helper types and grades results", async () => {
    const r = await runPythonLocally(buildPythonScript(mixedSpec, mixedPython, mixedSpec.tests));
    const outcome = grade({ spec: mixedSpec, tests: mixedSpec.tests, stdout: r.stdout });
    assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
  });

  it("serializes in-place arguments", async () => {
    const code = "class Solution:\n    def sort_colors(self, arr):\n        arr.sort()\n";
    const r = await runPythonLocally(buildPythonScript(inPlaceSpec, code, inPlaceSpec.tests));
    assert.equal(grade({ spec: inPlaceSpec, tests: inPlaceSpec.tests, stdout: r.stdout }).verdict, "Accepted");
  });

  it("reports runtime errors with the user's line number and captures prints", async () => {
    const code = "class Solution:\n    def sort_colors(self, arr):\n        print('hi')\n        return arr[10]\n";
    const r = await runPythonLocally(buildPythonScript(inPlaceSpec, code, inPlaceSpec.tests));
    const outcome = grade({ spec: inPlaceSpec, tests: inPlaceSpec.tests, stdout: r.stdout });
    assert.equal(outcome.verdict, "Runtime Error");
    assert.match(outcome.cases[0].error ?? "", /IndexError.*\(line 4\)/);
    assert.equal(outcome.cases[0].stdout, "hi\n");
  });

  it("marks wrong answers", async () => {
    const code = "class Solution:\n    def sort_colors(self, arr):\n        pass\n";
    const r = await runPythonLocally(buildPythonScript(inPlaceSpec, code, inPlaceSpec.tests));
    assert.equal(grade({ spec: inPlaceSpec, tests: inPlaceSpec.tests, stdout: r.stdout }).verdict, "Wrong Answer");
  });
});

describe("java harness", { skip: !hasJava && "javac not installed" }, () => {
  it("converts helper types and grades results", async () => {
    const r = await runJavaLocally(buildJavaProgram(mixedSpec, mixedJava, mixedSpec.tests));
    const outcome = grade({ spec: mixedSpec, tests: mixedSpec.tests, stdout: r.stdout, compileError: r.compileError });
    assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
  });

  it("serializes in-place arguments and accepts a public Solution class", async () => {
    const code = "public class Solution {\n    public void sortColors(int[] arr) { Arrays.sort(arr); }\n}\n";
    const r = await runJavaLocally(buildJavaProgram(inPlaceSpec, code, inPlaceSpec.tests));
    const outcome = grade({ spec: inPlaceSpec, tests: inPlaceSpec.tests, stdout: r.stdout, compileError: r.compileError });
    assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
  });

  it("maps compile errors to editor line numbers", async () => {
    const code = "class Solution {\n    public void sortColors(int[] arr) {\n        undefinedCall();\n    }\n}\n";
    const r = await runJavaLocally(buildJavaProgram(inPlaceSpec, code, inPlaceSpec.tests));
    assert.ok(r.compileError);
    assert.match(mapJavaCompileErrors(r.compileError), /^Line 3: error: cannot find symbol/m);
  });

  it("reports a time limit when the program is killed", async () => {
    const code = "class Solution {\n    public void sortColors(int[] arr) { while (true) {} }\n}\n";
    const r = await runJavaLocally(buildJavaProgram(inPlaceSpec, code, inPlaceSpec.tests), 2000);
    const outcome = grade({ spec: inPlaceSpec, tests: inPlaceSpec.tests, stdout: r.stdout, timedOut: r.timedOut });
    assert.equal(outcome.verdict, "Time Limit Exceeded");
  });
});
