import assert from "node:assert/strict";
import { it } from "node:test";
import { judgeOutput } from "./compare";
import type { ValidatorName } from "./types";

const check = (validator: ValidatorName, input: unknown, output: unknown, expected: unknown) => judgeOutput({ validator }, input, output, expected);

it("validates alternate answers without accepting malformed ones", () => {
  assert.ok(check("balancedBST", [[1, 2]], [1, null, 2], [2, 1]));
  assert.ok(!check("balancedBST", [[1, 2, 3]], [1, null, 2, null, 3], [2, 1, 3]));
  assert.ok(check("peakIndex", [[1, 3, 2, 4, 1]], 3, 1));
  assert.ok(!check("peakIndex", [[1, 3, 2, 4, 1]], 2, 1));
  assert.ok(check("courseOrder", [2, [[1, 0]]], [0, 1], [0, 1]));
  assert.ok(!check("courseOrder", [2, [[1, 0]]], [1, 0], [0, 1]));
  assert.ok(check("customSort", ["cba", "abcd"], "dcba", "cbad"));
  assert.ok(!check("customSort", ["cba", "abcd"], "abcd", "cbad"));
  assert.ok(check("minimalParentheses", ["a)b(c)d"], "ab(c)d", "ab(c)d"));
  assert.ok(!check("minimalParentheses", ["a)b(c)d"], "a)b(cd", "ab(c)d"));
  assert.ok(!check("minimalParentheses", ["a(b)"], "(b)", "a(b)"));
  assert.ok(check("divisibleSubset", [[1, 2, 3]], [1, 3], [1, 2]));
  assert.ok(!check("divisibleSubset", [[1, 2, 3]], [2, 3], [1, 2]));
  assert.ok(check("smallestPairs", [[1, 2], [1, 2], 2], [[1, 1], [2, 1]], [[1, 1], [1, 2]]));
  assert.ok(!check("smallestPairs", [[1, 2], [1, 2], 2], [[1, 1], [1, 1]], [[1, 1], [1, 2]]));
  assert.ok(check("bstDelete", [[2, 1, 3], 2], [1, null, 3], [3, 1]));
  assert.ok(!check("bstDelete", [[2, 1, 3], 2], [1, 3], [3, 1]));
});

it("randomized designs accept valid draws and reject invalid or constant outputs", () => {
  const weighted = { ctor: [[1, 1]], ops: Array(600).fill("pickIndex"), args: Array.from({ length: 600 }, () => []) };
  assert.ok(check("weightedPick", weighted, Array.from({ length: 600 }, (_, i) => i % 2), []));
  assert.ok(!check("weightedPick", weighted, Array(600).fill(0), []));
  assert.ok(!check("weightedPick", weighted, Array(600).fill(-1), []));
  const set = { ctor: [], ops: ["insert", "insert", ...Array(600).fill("getRandom")], args: [[4], [7], ...Array.from({ length: 600 }, () => [])] };
  assert.ok(check("randomizedSet", set, [true, true, ...Array.from({ length: 600 }, (_, i) => i % 2 ? 4 : 7)], []));
  assert.ok(!check("randomizedSet", set, [true, true, ...Array(600).fill(4)], []));
  assert.ok(!check("randomizedSet", set, [true, true, ...Array(600).fill(99)], []));
});

it("validates nonunique preorder/postorder trees and tied AllOne keys", () => {
  assert.ok(check("prePostTree", [[1,2],[2,1]], [1,null,2], [1,2]));
  assert.ok(!check("prePostTree", [[1,2],[2,1]], [1,3], [1,2]));
  const input={ctor:[],ops:["inc","inc","getMinKey","getMaxKey","dec","getMinKey"],args:[["a"],["b"],[],[],["a"],[]]};
  assert.ok(check("allOne", input, [null,null,"b","a",null,"b"], []));
  assert.ok(!check("allOne", input, [null,null,"b","a",null,"a"], []));
});

it("accepts alternate circular insertions and zero-sum removals",()=>{
  assert.ok(check("circularInsertion",[[5,5,5],3],[5,5,5,3],[5,3,5,5]));
  assert.ok(!check("circularInsertion",[[1,2,3],2],[1,3,2,2],[1,2,2,3]));
  assert.ok(check("zeroSumList",[[1,2,-3,3,1]],[1,2,1],[3,1]));
  assert.ok(check("zeroSumList",[[1,2,-3,3,1]],[3,1],[3,1]));
  assert.ok(!check("zeroSumList",[[1,2,-3,3,1]],[4],[3,1]));
  assert.ok(!check("zeroSumList",[[1,-1]],[1,-1],[]));
  assert.ok(check("peakGrid",[[[1,4],[3,2]]],[1,0],[0,1]));
  assert.ok(!check("peakGrid",[[[1,4],[3,2]]],[1,1],[0,1]));
});

it("validates Gray cycles, missing binary strings, balanced trees and operation-level ordering",()=>{
  assert.ok(check("grayCode",[2],[0,2,3,1],[0,1,3,2]));
  assert.ok(!check("grayCode",[2],[0,1,2,3],[0,1,3,2]));
  assert.ok(check("uniqueBinary",[["00","11"]],"10","01"));
  assert.ok(!check("uniqueBinary",[["00","11"]],"00","01"));
  assert.ok(check("balancedTree",[[1,null,2,null,3]],[2,1,3],[2,1,3]));
  assert.ok(!check("balancedTree",[[1,null,2,null,3]],[1,null,2,null,3],[2,1,3]));
  const log={ctor:[],ops:["put","retrieve"],args:[[1,"t"],["a","z","Year"]]};
  assert.ok(check("logStorage",log,[null,[2,1]],[null,[1,2]]));
  assert.ok(!check("logStorage",log,[[2,1],null],[null,[1,2]]));
  const shuffled={ctor:[[1,2]],ops:["shuffle","reset"],args:[[],[]]};
  assert.ok(check("shuffle",shuffled,[[2,1],[1,2]],[]));
  assert.ok(!check("shuffle",shuffled,[[2,1],[2,1]],[]));
});

it("rejects biased shuffles even when they vary",()=>{
  const input={ctor:[[1,2,3]],ops:Array(600).fill("shuffle"),args:Array.from({length:600},()=>[])};
  const biased=Array.from({length:600},(_,i)=>i%2?[1,2,3]:[1,3,2]);
  assert.ok(!check("shuffle",input,biased,[]));
  const all=[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]];
  assert.ok(check("shuffle",input,Array.from({length:600},(_,i)=>all[i%6]),[]));
});

it("rejects rotation-only shuffles despite uniform position frequencies", () => {
  const values = [1, 2, 3];
  const input = { ctor: [values], ops: Array(600).fill("shuffle"), args: Array.from({ length: 600 }, () => []) };
  const rotations = Array.from({ length: 600 }, (_, i) => values.slice(i % 3).concat(values.slice(0, i % 3)));
  assert.ok(!check("shuffle", input, rotations, []));
  const permutations = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]];
  assert.ok(check("shuffle", input, Array.from({ length: 600 }, (_, i) => permutations[i % permutations.length]), []));
});
