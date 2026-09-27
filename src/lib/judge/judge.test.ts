import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { describe, it } from "node:test";
import { judgeOutput, judgeSpecOutput } from "./compare";
import { grade } from "./grade";
import { buildJavaProgram, mapJavaCompileErrors } from "./java";
import { runJavaLocally, runPythonLocally } from "./local-java";
import { buildPythonScript } from "./python";
import { generateStarter } from "./starter";
import { RESULT_MARKER, type FunctionSpec, type ProblemSpec, type DesignSpec } from "./types";

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
    assert.equal(judgeOutput("exact", [], 2147483646, 2147483647), false);
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

describe("LeetCode helpers", () => {
  const graph: FunctionSpec = {
    id: "clone", style: "leetcode", function: { python: "cloneGraph", java: "cloneGraph" },
    params: [{ name: "node", type: "GraphNode" }], returns: "GraphNode",
    tests: [{ input: [[[2, 3], [1], [1]]], expected: [[2, 3], [1], [1]] }, { input: [[]], expected: [] }],
  };
  const graphPy = `class Solution:
    def cloneGraph(self, node):
        seen = {}
        def copy(n):
            if n is None: return None
            if n not in seen:
                seen[n] = Node(n.val)
                seen[n].neighbors = [copy(x) for x in reversed(n.neighbors)]
            return seen[n]
        return copy(node)
`;
  const graphJava = `class Solution {
    Map<Node, Node> seen = new IdentityHashMap<>();
    public Node cloneGraph(Node n) {
      if (n == null) return null;
      if (!seen.containsKey(n)) {
        Node copy = new Node(n.val); seen.put(n, copy);
        for (Node next : n.neighbors) copy.neighbors.add(cloneGraph(next));
      }
      return seen.get(n);
    }
  }`;
  const identity: FunctionSpec = {
    id: "identity", style: "leetcode", function: { python: "find", java: "find" },
    params: [{ name: "root", type: "TreeNode" }, { name: "p", type: "TreeNode", fromTree: 0 }],
    returns: "TreeNode", output: { as: "value" }, tests: [{ input: [[4, 2, 8], 2], expected: 2 }],
  };
  const codec: FunctionSpec = {
    id: "codec", style: "leetcode", function: { python: "encode", java: "encode" },
    roundTrip: { className: "Codec", encode: "encode", decode: "decode" },
    params: [{ name: "strs", type: "List<string>" }], returns: "List<string>",
    tests: [{ input: [["a|b", "", "🙂"]], expected: ["a|b", "", "🙂"] }],
  };
  for (const lang of ["python", "java"] as const) {
    const run = async (spec: FunctionSpec, code: string) => {
      const r = lang === "python"
        ? await runPythonLocally(buildPythonScript(spec, code, spec.tests))
        : await runJavaLocally(buildJavaProgram(spec, code, spec.tests));
      return grade({ spec, tests: spec.tests, stdout: r.stdout, compileError: "compileError" in r ? r.compileError : undefined });
    };
    it(`${lang}: graph clones preserve cycles and reject reused nodes`, { skip: lang === "java" && !hasJava }, async () => {
      assert.equal((await run(graph, lang === "python" ? graphPy : graphJava)).verdict, "Accepted");
      const bad = lang === "python" ? "class Solution:\n    def cloneGraph(self, node): return node" : "class Solution { public Node cloneGraph(Node node) { return node; } }";
      assert.equal((await run(graph, bad)).verdict, "Runtime Error");
      assert.match(generateStarter(graph, lang), /Node/);
    });
    it(`${lang}: tree arguments preserve identity and reject fabricated answers`, { skip: lang === "java" && !hasJava }, async () => {
      const good = lang === "python" ? "class Solution:\n    def find(self, root, p):\n        return p if root.left is p else root" : "class Solution { public TreeNode find(TreeNode root, TreeNode p) { return root.left == p ? p : root; } }";
      const bad = lang === "python" ? "class Solution:\n    def find(self, root, p): return TreeNode(p.val)" : "class Solution { public TreeNode find(TreeNode root, TreeNode p) { return new TreeNode(p.val); } }";
      assert.equal((await run(identity, good)).verdict, "Accepted");
      assert.equal((await run(identity, bad)).verdict, "Runtime Error");
    });
    it(`${lang}: codec output is decoded with a fresh instance`, { skip: lang === "java" && !hasJava }, async () => {
      const good = lang === "python" ? "import json\nclass Codec:\n    def encode(self, strs): return json.dumps(strs)\n    def decode(self, data): return json.loads(data)" : 'class Codec { public String encode(List<String> strs) { return J.json(strs); } public List<String> decode(String data) { return J.toStrList(JudgeJson.parse(data)); } }';
      assert.equal((await run(codec, good)).verdict, "Accepted");
      const bad = lang === "python" ? 'class Codec:\n    def encode(self, strs):\n        self.strs = strs\n        return ""\n    def decode(self, data): return self.strs' : 'class Codec { List<String> saved; public String encode(List<String> strs) { saved = strs; return ""; } public List<String> decode(String data) { return saved; } }';
      assert.notEqual((await run(codec, bad)).verdict, "Accepted");
      assert.match(generateStarter(codec, lang), /class Codec/);
    });
    it(`${lang}: unsigned bit output keeps the Java int signature`, { skip: lang === "java" && !hasJava }, async () => {
      const spec: FunctionSpec = { id: "bits", function: { python: "bits", java: "bits" }, params: [{ name: "n", type: "int" }], returns: "int", output: { as: "unsigned32" }, tests: [{ input: [4294967295], expected: 4294967295 }] };
      assert.equal((await run(spec, lang === "python" ? 'class Solution:\n    def bits(self, n): return n' : 'class Solution { public int bits(int n) { return n; } }')).verdict, "Accepted");
    });
  }
  it("accepts alternate longest palindromes but rejects shorter or non-substring output", () => {
    const compare = { validator: "longestPalindrome" } as const;
    assert.equal(judgeOutput(compare, ["babad"], "aba", "bab"), true);
    assert.equal(judgeOutput(compare, ["babad"], "a", "bab"), false);
    assert.equal(judgeOutput(compare, ["babad"], "aaa", "bab"), false);
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


describe("Additional node and interactive contracts", () => {
const random: FunctionSpec = { id: "random", style: "leetcode", function: { python: "copyRandomList", java: "copyRandomList" }, params: [{ name: "head", type: "RandomNode" }], returns: "RandomNode", tests: [
  { input: [[[8, 1], [8, 0], [-1, 2]]], expected: [[8, 1], [8, 0], [-1, 2]] }, { input: [[]], expected: [] },
] };
const nary: FunctionSpec = { id: "nary", function: { python: "echo", java: "echo" }, params: [{ name: "root", type: "NaryNode" }], returns: "NaryNode", tests: [
  { input: [[1, null, 3, 2, 4, null, 5, 6]], expected: [1, null, 3, 2, 4, null, 5, 6] }, { input: [[]], expected: [] },
] };

for (const lang of ["python", "java"] as const) {
  const options = { skip: lang === "java" && !hasJava };
  async function run(spec: ProblemSpec, python: string, java: string) {
    const r = lang === "python" ? await runPythonLocally(buildPythonScript(spec, python, spec.tests)) : await runJavaLocally(buildJavaProgram(spec, java, spec.tests));
    return grade({ spec, tests: spec.tests, stdout: r.stdout, compileError: "compileError" in r ? r.compileError : undefined });
  }
  it(`${lang}: next-tree Node and nested integers use their declared helper contracts`, options, async () => {
    const next: FunctionSpec = { id: "next", function: { python: "connect", java: "connect" }, params: [{ name: "root", type: "NextNode" }], returns: "NextNode", tests: [{ input: [[1, 2, 3]], expected: [[1], [2, 3]] }, { input: [[]], expected: [] }] };
    assert.equal((await run(next, "class Solution:\n    def connect(self, root):\n        if root: root.left.next = root.right\n        return root", "class Solution { public Node connect(Node root) { if(root!=null) root.left.next=root.right; return root; } }")).verdict, "Accepted");
    const nested: FunctionSpec = { id: "nested", function: { python: "echo", java: "echo" }, params: [{ name: "value", type: "NestedInteger" }], returns: "NestedInteger", tests: [{ input: [[1, [-2, []], 3]], expected: [1, [-2, []], 3] }, { input: [7], expected: 7 }] };
    assert.equal((await run(nested, "class Solution:\n    def echo(self, value): return value", "class Solution { public NestedInteger echo(NestedInteger value) { return value; } }")).verdict, "Accepted");
    assert.match(generateStarter(next, lang), /Node/);
    assert.match(generateStarter(nested, lang), /NestedInteger/);
  });
  it(`${lang}: list tails preserve identity and selected-node edits serialize the entire list`, options, async () => {
    const shared: FunctionSpec = { id: "shared", style: "leetcode", function: { python: "get", java: "get" }, params: [{ name: "a", type: "ListNode" }, { name: "b", type: "ListNode", fromList: 0 }], returns: "ListNode", tests: [{ input: [[5], { values: [], tail: 0 }], expected: [5] }] };
    assert.equal((await run(shared, "class Solution:\n    def get(self, a, b): return b if a is b else None", "class Solution { public ListNode get(ListNode a,ListNode b) { return a==b?b:null; } }")).verdict, "Accepted");
    assert.equal((await run(shared, "class Solution:\n    def get(self, a, b): return ListNode(5)", "class Solution { public ListNode get(ListNode a,ListNode b) { return new ListNode(5); } }")).verdict, "Runtime Error");
    const selected: FunctionSpec = { id: "selected", style: "leetcode", function: { python: "edit", java: "edit" }, params: [{ name: "node", type: "ListNode" }], returns: "void", output: { arg: 0, root: true }, tests: [{ input: [{ values: [1, 2, 3], at: 1 }], expected: [1, 9, 3] }] };
    assert.equal((await run(selected, "class Solution:\n    def edit(self, node): node.val=9", "class Solution { public void edit(ListNode node) { node.val=9; } }")).verdict, "Accepted");
  });
  it(`${lang}: design constructor arguments do not collide with SparseVector method arguments`, options, async () => {
    const spec: DesignSpec = { kind: "design", id: "sparse", className: "SparseVector", ctorParams: [{ name: "nums", type: "int[]" }], methods: [{ name: "dotProduct", java: "dotProduct", params: [{ name: "vec", type: "SparseVector" }], returns: "int" }], tests: [{ input: { ctor: [[1, 0, 3]], ops: ["dotProduct", "dotProduct"], args: [[[2, 4, 3]], [[0, 0, 0]]] }, expected: [11, 0] }] };
    assert.equal((await run(spec, "class SparseVector:\n    def __init__(self, nums): self.nums=nums\n    def dotProduct(self, vec): return sum(a*b for a,b in zip(self.nums,vec.nums))", "class SparseVector { int[] nums; public SparseVector(int[] nums) {this.nums=nums;} public int dotProduct(SparseVector vec) {int s=0; for(int i=0;i<nums.length;i++)s+=nums[i]*vec.nums[i];return s;} }")).verdict, "Accepted");
    assert.match(generateStarter(spec, lang), /SparseVector/);
  });
  it(`${lang}: parent and circular node helpers preserve identities and constructor arguments`, options, async () => {
    const parent: FunctionSpec = { id: "parent", function: { python: "get", java: "get" }, params: [{name:"p",type:"ParentNode"}], returns:"ParentNode", environment:{kind:"parentTree",param:{name:"tree",type:"int[]"}}, tests:[{input:[2,[1,2,3]],expected:1}] };
    assert.equal((await run(parent, "class Solution:\n    def get(self,p): return p.parent", "class Solution {public Node get(Node p){return p.parent;}}" )).verdict,"Accepted");
    assert.equal((await run(parent, "class Solution:\n    def get(self,p): return Node(1)", "class Solution {public Node get(Node p){return new Node(1);}}" )).verdict,"Runtime Error");
    const circular: FunctionSpec = {id:"circular",function:{python:"insert",java:"insert"},params:[{name:"head",type:"CircularNode"}],returns:"CircularNode",tests:[{input:[[1]],expected:[1,2]}]};
    assert.equal((await run(circular,"class Solution:\n    def insert(self,head):\n        head.next=Node(2,head)\n        return head","class Solution {public Node insert(Node head){head.next=new Node(2,head);return head;}}" )).verdict,"Accepted");
    const doubly: FunctionSpec = {id:"doubly",function:{python:"convert",java:"convert"},params:[{name:"root",type:"DoublyNode"}],returns:"DoublyNode",tests:[{input:[[1]],expected:[1]}]};
    assert.equal((await run(doubly,"class Solution:\n    def convert(self,root):\n        root.left=root.right=root\n        return root","class Solution {public Node convert(Node root){root.left=root.right=root;return root;}}" )).verdict,"Accepted");
    assert.equal((await run(doubly,"class Solution:\n    def convert(self,root):\n        n=Node(1); n.left=n.right=n\n        return n","class Solution {public Node convert(Node root){Node n=new Node(1);n.left=n.right=n;return n;}}" )).verdict,"Runtime Error");
    for (const spec of [parent,circular,doubly]) assert.match(generateStarter(spec,lang),/Node/);
  });
  it(`${lang}: interactive objects enforce guesses and inspect cleaned cells`, options, async () => {
    const robot: FunctionSpec={id:"robot",function:{python:"cleanRoom",java:"cleanRoom"},params:[{name:"robot",type:"Robot"}],returns:"void",output:{arg:0,as:"interaction"},tests:[{input:[{room:[[1,1]],start:[0,0]}],expected:[[0,0],[0,1]]}]};
    assert.equal((await run(robot,"class Solution:\n    def cleanRoom(self,robot):\n        robot.clean(); robot.turnRight(); robot.move(); robot.clean()","class Solution {public void cleanRoom(Robot robot){robot.clean();robot.turnRight();robot.move();robot.clean();}}" )).verdict,"Accepted");
    const master: FunctionSpec={id:"master",function:{python:"findSecretWord",java:"findSecretWord"},params:[{name:"master",type:"Master"}],returns:"void",output:{arg:0,as:"interaction"},tests:[{input:[{words:["aaaaaa"],secret:"aaaaaa",allowedGuesses:1}],expected:true}]};
    assert.equal((await run(master,"class Solution:\n    def findSecretWord(self,master): master.guess('aaaaaa')","class Solution {public void findSecretWord(Master master){master.guess(\"aaaaaa\");}}" )).verdict,"Accepted");
    assert.equal((await run(master,"class Solution:\n    def findSecretWord(self,master): master.guess('aaaaaa'); master.guess('aaaaaa')","class Solution {public void findSecretWord(Master master){master.guess(\"aaaaaa\");master.guess(\"aaaaaa\");}}" )).verdict,"Runtime Error");
    for(const spec of [robot,master])assert.match(generateStarter(spec,lang),/provided|provides/);
  });
  it(`${lang}: cycle entry reports original node index even with duplicate values`, options, async () => {
    const spec: FunctionSpec={id:"cycle",style:"leetcode",function:{python:"get",java:"get"},params:[{name:"head",type:"ListNode"}],returns:"ListNode",output:{as:"listIndex"},tests:[{input:[{values:[5,5],pos:1}],expected:1}]};
    assert.equal((await run(spec,"class Solution:\n    def get(self,head): return head.next","class Solution {public ListNode get(ListNode head){return head.next;}}" )).verdict,"Accepted");
    assert.equal((await run(spec,"class Solution:\n    def get(self,head): return ListNode(5)","class Solution {public ListNode get(ListNode head){return new ListNode(5);}}" )).verdict,"Runtime Error");
  });
  it(`${lang}: multilevel lists require original nodes, repaired previous links and cleared children`, options, async () => {
    const spec: FunctionSpec={id:"multi",function:{python:"flatten",java:"flatten"},params:[{name:"head",type:"MultiNode"}],returns:"MultiNode",tests:[{input:[[{val:1,child:[{val:2}]}]],expected:[1,2]}]};
    assert.equal((await run(spec,"class Solution:\n    def flatten(self,head):\n        head.next=head.child; head.child=None; head.next.prev=head\n        return head","class Solution {public Node flatten(Node head){head.next=head.child;head.child=null;head.next.prev=head;return head;}}" )).verdict,"Accepted");
    assert.equal((await run(spec,"class Solution:\n    def flatten(self,head): return head","class Solution {public Node flatten(Node head){return head;}}" )).verdict,"Runtime Error");
    assert.match(generateStarter(spec,lang),/child/);
    const lists: FunctionSpec={id:"lists",function:{python:"parts",java:"parts"},params:[],returns:"ListNode[]",tests:[{input:[],expected:[null]}]};
    assert.equal((await run(lists,"class Solution:\n    def parts(self): return [None]","class Solution {public ListNode[] parts(){return new ListNode[]{null};}}" )).verdict,"Accepted");
  });
  it(`${lang}: cloned-tree results use the declared return tree and stateful codecs reuse one object`, options, async () => {
    const clone: FunctionSpec={id:"clone",function:{python:"get",java:"get"},params:[{name:"original",type:"TreeNode"},{name:"cloned",type:"TreeNode"},{name:"target",type:"TreeNode",fromTree:0}],returns:"TreeNode",returnTree:1,output:{as:"value"},tests:[{input:[[1],[1],1],expected:1}]};
    assert.equal((await run(clone,"class Solution:\n    def get(self,original,cloned,target): return cloned","class Solution {public TreeNode get(TreeNode original,TreeNode cloned,TreeNode target){return cloned;}}" )).verdict,"Accepted");
    assert.equal((await run(clone,"class Solution:\n    def get(self,original,cloned,target): return target","class Solution {public TreeNode get(TreeNode original,TreeNode cloned,TreeNode target){return target;}}" )).verdict,"Runtime Error");
    const codec: FunctionSpec={id:"url",function:{python:"encode",java:"encode"},params:[{name:"url",type:"string"}],returns:"string",roundTrip:{className:"Codec",encode:"encode",decode:"decode",sameInstance:true},tests:[{input:["url"],expected:"url"}]};
    assert.equal((await run(codec,"class Codec:\n    def encode(self,url): self.url=url; return 'x'\n    def decode(self,data): return self.url","class Codec {String url;public String encode(String url){this.url=url;return \"x\";}public String decode(String data){return url;}}" )).verdict,"Accepted");
  });
  it(`${lang}: random-pointer clone preserves duplicate values and rejects original nodes`, options, async () => {
    const good = await run(random, `class Solution:
    def copyRandomList(self, head):
        nodes = {None: None}
        p = head
        while p:
            nodes[p] = Node(p.val)
            p = p.next
        p = head
        while p:
            nodes[p].next = nodes[p.next]
            nodes[p].random = nodes[p.random]
            p = p.next
        return nodes[head]`, `class Solution {
  public Node copyRandomList(Node head) {
    Map<Node, Node> nodes = new IdentityHashMap<>(); nodes.put(null, null);
    for (Node n = head; n != null; n = n.next) nodes.put(n, new Node(n.val));
    for (Node n = head; n != null; n = n.next) { nodes.get(n).next = nodes.get(n.next); nodes.get(n).random = nodes.get(n.random); }
    return nodes.get(head);
  }
}`);
    assert.equal(good.verdict, "Accepted", JSON.stringify(good));
    assert.equal((await run(random, "class Solution:\n    def copyRandomList(self, head): return head", "class Solution { public Node copyRandomList(Node head) { return head; } }")).verdict, "Runtime Error");
    assert.match(generateStarter(random, lang), /Node/);
  });
  it(`${lang}: N-ary serialization preserves child groups`, options, async () => {
    assert.equal((await run(nary, "class Solution:\n    def echo(self, root): return root", "class Solution { public Node echo(Node root) { return root; } }")).verdict, "Accepted");
    assert.match(generateStarter(nary, lang), /children/);
  });
  it(`${lang}: hidden version input configures the API without changing the method signature`, options, async () => {
    const spec: FunctionSpec = { id: "version", function: { python: "firstBadVersion", java: "firstBadVersion" }, params: [{ name: "n", type: "int" }], returns: "int", environment: { kind: "badVersion", param: { name: "bad", type: "int" } }, tests: [{ input: [5, 4], expected: 4 }, { input: [1, 1], expected: 1 }] };
    assert.equal((await run(spec, `class Solution:
    def firstBadVersion(self, n):
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            if isBadVersion(mid): hi = mid
            else: lo = mid + 1
        return lo`, `class Solution extends VersionControl { public int firstBadVersion(int n) { int lo=1,hi=n; while(lo<hi){int mid=lo+(hi-lo)/2; if(isBadVersion(mid))hi=mid;else lo=mid+1;}return lo;} }`)).verdict, "Accepted");
    assert.doesNotMatch(generateStarter(spec, lang), /bad:/);
  });
  it(`${lang}: read4 state resets between tests and only the returned prefix is graded`, options, async () => {
    const spec: FunctionSpec = { id: "read", function: { python: "read", java: "read" }, params: [{ name: "buf", type: "char[]" }, { name: "n", type: "int" }], returns: "int", output: { arg: 0, prefix: true }, environment: { kind: "read4", param: { name: "file", type: "string" } }, tests: [{ input: [[" ", " ", " ", " "], 4, "abc"], expected: ["a", "b", "c"] }, { input: [[" ", " ", " ", " "], 4, "xy"], expected: ["x", "y"] }] };
    assert.equal((await run(spec, "class Solution:\n    def read(self, buf, n): return read4(buf)", "class Solution extends Reader4 { public int read(char[] buf, int n) { return read4(buf); } }")).verdict, "Accepted");
  });
}

it("rejects conflicting Node definitions", () => {
  const spec: FunctionSpec = { ...random, params: [{ name: "a", type: "RandomNode" }, { name: "b", type: "GraphNode" }] };
  assert.throws(() => buildPythonScript(spec, "", []), /only one Node/);
  assert.throws(() => buildJavaProgram(spec, "", []), /only one Node/);
});

});

describe("Collection helper contracts", () => {
for (const language of ["python", "java"] as const) {
  const options = { skip: language === "java" && !hasJava };
  async function run(spec: ProblemSpec, python: string, java: string) {
    const result = language === "python"
      ? await runPythonLocally(buildPythonScript(spec, python, spec.tests))
      : await runJavaLocally(buildJavaProgram(spec, java, spec.tests));
    return grade({ spec, tests: spec.tests, stdout: result.stdout, timedOut: result.timedOut,
      compileError: "compileError" in result ? result.compileError : undefined });
  }

  it(`${language}: Boolean lists preserve false values in inputs, outputs, and starters`, options, async () => {
    const spec: FunctionSpec = {
      id: "boolean-list-contract", function: { python: "invert", java: "invert" },
      params: [{ name: "values", type: "List<boolean>" }], returns: "List<boolean>",
      tests: [{ input: [[true, false, false]], expected: [false, true, true] }, { input: [[]], expected: [] }],
    };
    const python = "class Solution:\n    def invert(self, values): return [not value for value in values]";
    const java = "class Solution {public List<Boolean> invert(List<Boolean> values) {List<Boolean> result=new ArrayList<>();for(boolean value:values) result.add(!value);return result;}}";
    assert.equal((await run(spec, python, java)).verdict, "Accepted");
    assert.match(generateStarter(spec, language), language === "java" ? /List<Boolean>/ : /List\[bool\]/);
  });

  it(`${language}: integer iterator preserves duplicates and reports exhaustion`, options, async () => {
    const spec: DesignSpec = {
      kind: "design", id: "iterator-contract", className: "Reader",
      ctorParams: [{ name: "iterator", type: "IntIterator" }],
      methods: [
        { name: "next", java: "next", params: [], returns: "int" },
        { name: "hasNext", java: "hasNext", params: [], returns: "boolean" },
      ],
      tests: [
        { input: { ctor: [[4, 4, -1]], ops: ["hasNext", "next", "hasNext", "next", "next", "hasNext"], args: [[], [], [], [], [], []] }, expected: [true, 4, true, 4, -1, false] },
        { input: { ctor: [[]], ops: ["hasNext"], args: [[]] }, expected: [false] },
      ],
    };
    const python = "class Reader:\n    def __init__(self, iterator): self.iterator=iterator\n    def next(self): return self.iterator.next()\n    def hasNext(self): return self.iterator.hasNext()";
    const java = "class Reader { Iterator<Integer> iterator; Reader(Iterator<Integer> iterator) {this.iterator=iterator;} public int next() {return iterator.next();} public boolean hasNext() {return iterator.hasNext();} }";
    assert.equal((await run(spec, python, java)).verdict, "Accepted");
    assert.match(generateStarter(spec, language), language === "java" ? /Iterator<Integer>/ : /Iterator/);
    const exhausted: DesignSpec = { ...spec, tests: [{ input: { ctor: [[]], ops: ["next"], args: [[]] }, expected: [0] }] };
    assert.equal((await run(exhausted, python, java)).verdict, "Runtime Error");
  });

  it(`${language}: employee rows become objects with correctly typed subordinate lists`, options, async () => {
    const spec: FunctionSpec = {
      id: "employee-contract", function: { python: "inspect", java: "inspect" },
      params: [{ name: "employees", type: "List<Employee>" }], returns: "int[][]",
      tests: [{ input: [[[7, -3, [11, 12]], [11, 9, []], [12, 0, []]]], expected: [[7, -3, 2], [11, 9, 0], [12, 0, 0]] }],
    };
    const python = "class Solution:\n    def inspect(self, employees): return [[e.id,e.importance,len(e.subordinates)] for e in employees]";
    const java = "class Solution {public int[][] inspect(List<Employee> employees) {int[][] out=new int[employees.size()][3];for(int i=0;i<out.length;i++) {Employee e=employees.get(i);out[i]=new int[]{e.id,e.importance,e.subordinates.size()};}return out;}}";
    assert.equal((await run(spec, python, java)).verdict, "Accepted");
    assert.match(generateStarter(spec, language), /Employee/);
  });

  it(`${language}: parser preserves directed duplicate edges and isolates returned lists`, options, async () => {
    const spec: FunctionSpec = {
      id: "parser-contract", function: { python: "inspect", java: "inspect" },
      params: [{ name: "parser", type: "HtmlParser" }], returns: "List<List<string>>",
      tests: [{ input: [{ urls: ["http://a.test", "http://a.test/b", "http://b.test"], edges: [[0, 1], [0, 1], [1, 2]] }],
        expected: [["http://a.test/b", "http://a.test/b"], ["http://b.test"], [], []] }],
    };
    const python = "class Solution:\n    def inspect(self, parser):\n        links=parser.getUrls('http://a.test'); links.clear()\n        return [parser.getUrls(url) for url in ['http://a.test','http://a.test/b','http://b.test','http://unknown.test']]";
    const java = "class Solution {public List<List<String>> inspect(HtmlParser parser) {parser.getUrls(\"http://a.test\").clear();List<List<String>> out=new ArrayList<>();for(String url:Arrays.asList(\"http://a.test\",\"http://a.test/b\",\"http://b.test\",\"http://unknown.test\")) out.add(parser.getUrls(url));return out;}}";
    assert.equal((await run(spec, python, java)).verdict, "Accepted");
    assert.match(generateStarter(spec, language), /HtmlParser/);
  });
}

});

describe("Judge review regressions", () => {
  for (const language of ["python", "java"] as const) {
    const options = { skip: language === "java" && !hasJava };
    async function run(spec: ProblemSpec, python: string, java: string) {
      const result = language === "python"
        ? await runPythonLocally(buildPythonScript(spec, python, spec.tests))
        : await runJavaLocally(buildJavaProgram(spec, java, spec.tests));
      return grade({ spec, tests: spec.tests, stdout: result.stdout, timedOut: result.timedOut,
        compileError: "compileError" in result ? result.compileError : undefined });
    }

    it(`${language}: design outputs snapshot mutable values at each operation`, options, async () => {
      const spec: DesignSpec = {
        kind: "design", id: "mutable-design-output", className: "Buffer", ctorParams: [],
        methods: [
          { name: "get", java: "get", params: [], returns: "int[]" },
          { name: "set", java: "set", params: [{ name: "value", type: "int" }], returns: "void" },
        ],
        tests: [{ input: { ctor: [], ops: ["get", "set", "get"], args: [[], [7], []] }, expected: [[1], null, [7]] }],
      };
      const python = "class Buffer:\n    def __init__(self): self.data=[1]\n    def get(self): return self.data\n    def set(self,value): self.data[0]=value";
      const java = "class Buffer {int[] data={1}; public Buffer(){} public int[] get(){return data;} public void set(int value){data[0]=value;}}";
      const result = await run(spec, python, java);
      assert.equal(result.verdict, "Accepted", JSON.stringify(result));
      assert.deepEqual(result.cases[0].output, [[1], null, [7]]);
    });

    it(`${language}: a graph clone must return the clone of the supplied root`, options, async () => {
      const spec: FunctionSpec = {
        id: "graph-root-identity", function: { python: "cloneGraph", java: "cloneGraph" },
        params: [{ name: "node", type: "GraphNode" }], returns: "GraphNode",
        tests: [{ input: [[[2], [1]]], expected: [[2], [1]] }],
      };
      const python = "class Solution:\n    def cloneGraph(self,node):\n        a,b=Node(1),Node(2)\n        a.neighbors=[b]; b.neighbors=[a]\n        return b";
      const java = "class Solution {public Node cloneGraph(Node node){Node a=new Node(1),b=new Node(2);a.neighbors.add(b);b.neighbors.add(a);return b;}}";
      assert.equal((await run(spec, python, java)).verdict, "Runtime Error");
      assert.equal((await run(spec, python.replace("return b", "return a"), java.replace("return b;", "return a;"))).verdict, "Accepted");
    });
  }

  it("Java doubly-linked tree nodes support the three-argument LeetCode constructor", { skip: !hasJava }, async () => {
    const spec: FunctionSpec = {
      id: "doubly-constructor", function: { python: "treeToDoublyList", java: "treeToDoublyList" },
      params: [{ name: "root", type: "DoublyNode" }], returns: "DoublyNode",
      tests: [{ input: [[5]], expected: [5] }],
    };
    const code = "class Solution {public Node treeToDoublyList(Node root){Node dummy=new Node(0,root,root);if(dummy.left!=root||dummy.right!=root)throw new AssertionError();root.left=root;root.right=root;return root;}}";
    const result = await runJavaLocally(buildJavaProgram(spec, code, spec.tests));
    assert.equal(result.compileError, undefined);
    assert.equal(grade({ spec, tests: spec.tests, stdout: result.stdout }).verdict, "Accepted");
  });

  it("grades integer results exactly while retaining double tolerance", () => {
    const integer: FunctionSpec = {
      id: "integer-result", function: { python: "answer", java: "answer" }, params: [], returns: "long",
      tests: [{ input: [], expected: 1_000_000_000 }],
    };
    const stdout = `${RESULT_MARKER}${JSON.stringify({ i: 0, status: "ok", output: 1_000_000_000.5 })}`;
    assert.equal(grade({ spec: integer, tests: integer.tests, stdout }).verdict, "Wrong Answer");
    assert.equal(grade({ spec: { ...integer, returns: "double" }, tests: integer.tests, stdout }).verdict, "Accepted");
    assert.ok(!judgeSpecOutput(integer, [], 1_000_000_001, 1_000_000_000));
    assert.ok(judgeSpecOutput({ ...integer, returns: "double" }, [], 1_000_000_001, 1_000_000_000));
    assert.ok(judgeSpecOutput({ ...integer, returns: "double[]" }, [], [0.50000001, 1.0000001], [0.5, 1]));
    assert.ok(!judgeSpecOutput({ ...integer, returns: "double[]" }, [], [0.6], [0.5]));
  });

  it("checks integer leaves in node results, output adapters, and individual design methods", () => {
    const base: FunctionSpec = {
      id: "adapted-integer-result", function: { python: "answer", java: "answer" },
      params: [{ name: "nums", type: "int[]" }], returns: "int", tests: [],
    };
    assert.ok(!judgeSpecOutput({ ...base, returns: "TreeNode" }, [], [4, 2.000001], [4, 2]));
    assert.ok(judgeSpecOutput({ ...base, returns: "TreeNode" }, [], [4, null, 5], [4, null, 5]));
    assert.ok(!judgeSpecOutput({ ...base, output: { arg: 0, prefix: true } }, [[1]], [1.000001], [1]));
    assert.ok(!judgeSpecOutput({ ...base, returns: "TreeNode", output: { as: "value" } }, [], 4.000001, 4));
    const design: DesignSpec = {
      kind: "design", id: "mixed-design-result", className: "Mixed", ctorParams: [],
      methods: [
        { name: "integer", java: "integer", params: [], returns: "int" },
        { name: "fraction", java: "fraction", params: [], returns: "double" },
        { name: "write", java: "write", params: [{ name: "buf", type: "int[]" }], returns: "int", output: { arg: 0, prefix: true } },
      ], tests: [],
    };
    const input = { ctor: [], ops: ["integer", "fraction", "write"], args: [[], [], [[3]]] };
    assert.ok(judgeSpecOutput(design, input, [2, 0.50000001, [3]], [2, 0.5, [3]]));
    assert.ok(judgeSpecOutput(design, input, [2, 1_000_000_001, [3]], [2, 1_000_000_000, [3]]));
    assert.ok(!judgeSpecOutput(design, input, [2.000001, 0.5, [3]], [2, 0.5, [3]]));
    assert.ok(!judgeSpecOutput(design, input, [2, 0.5, [3.000001]], [2, 0.5, [3]]));
  });
});
