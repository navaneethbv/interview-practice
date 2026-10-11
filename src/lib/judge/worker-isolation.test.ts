import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { it } from "node:test";
import ts from "typescript";
import { buildJsProgram, splitCompileError } from "./javascript";
import { grade } from "./grade";
import type { FunctionSpec } from "./types";

type Message = { type: string; line?: string; error?: string; js?: string };
async function request(data: object) {
  const messages: Message[] = [];
  let done!: () => void;
  const finished = new Promise<void>((resolve) => { done = resolve; });
  const self = { ts, postMessage: (message: Message) => {
    messages.push(message);
    if (message.type === "done" || message.type === "transpiled") done();
  }, onmessage: (event: unknown) => { void event; } };
  const context = vm.createContext({ self, fetch: () => {}, importScripts: () => {}, WebAssembly, TextDecoder, TextEncoder, atob, performance, console, setTimeout, clearTimeout });
  vm.runInContext(fs.readFileSync("public/js-worker.js", "utf8"), context);
  self.onmessage({ data: { id: 1, ...data } });
  await finished;
  return { messages, result: messages.at(-1)!, stdout: messages.filter((m) => m.type === "line").map((m) => m.line).join("\n") };
}

const spec: FunctionSpec = { id: "add", style: "leetcode", function: { python: "add", java: "add" }, params: [{ name: "a", type: "int" }, { name: "b", type: "int" }], returns: "int", tests: [{ input: [2, 3], expected: 5 }] };

it("runs JavaScript without exposing worker networking or message capabilities", async () => {
  const r = await request({ type: "run", program: '__emit(JSON.stringify([typeof fetch, typeof self, typeof importScripts, typeof WebSocket]));' });
  assert.equal(r.result.error, undefined);
  assert.equal(r.stdout, '["undefined","undefined","undefined","undefined"]');
});

it("runs the generated harness in the isolated interpreter", async () => {
  const r = await request({ type: "run", program: buildJsProgram(spec, "function add(a,b) { console.log('sum'); return a+b; }", spec.tests) });
  const outcome = grade({ spec, tests: spec.tests, stdout: r.stdout, fatal: r.result.error });
  assert.equal(outcome.verdict, "Accepted", JSON.stringify(outcome));
});

it("preserves syntax and runtime error verdicts in the isolated interpreter", async () => {
  const syntax = await request({ type: "run", program: buildJsProgram(spec, "function add( {", spec.tests) });
  assert.ok(splitCompileError(syntax.stdout).compileError);
  const crash = await request({ type: "run", program: buildJsProgram(spec, "function add(a,b) {\n throw new Error('broken');\n}", spec.tests) });
  const outcome = grade({ spec, tests: spec.tests, stdout: crash.stdout, fatal: crash.result.error });
  assert.equal(outcome.verdict, "Runtime Error", JSON.stringify(outcome));
  assert.ok(outcome.cases[0].error?.includes("line 2"), JSON.stringify(outcome));
});

it("transpiles TypeScript and executes it with the same isolation", async () => {
  const transpiled = await request({ type: "transpile", code: "function add(a: number, b: number): number { return a+b; }" });
  assert.equal(transpiled.result.error, undefined);
  const r = await request({ type: "run", program: buildJsProgram(spec, transpiled.result.js!, spec.tests) });
  assert.equal(grade({ spec, tests: spec.tests, stdout: r.stdout, fatal: r.result.error }).verdict, "Accepted");
});
