import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";

import { describe, it } from "node:test";
import { grade } from "./grade";
import { buildJavaProgram } from "./java";
import { languagesFor } from "./languages";
import { runExtraLocally } from "./local-extra";
import { runJavaLocally } from "./local-java";
import { generateStarter } from "./starter";
import type { FunctionSpec, RunOutcome } from "./types";

const has = (cmd: string, flag: string) => {
  try {
    execFileSync(cmd, [flag], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};
const available = { java: has("javac", "-version"), cpp: has("g++", "--version"), go: has("go", "version") };

const spec = (id: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error("Invalid problem ID");
  return JSON.parse(fs.readFileSync(new URL(`../../../content/leetcode/${id}.json`, import.meta.url), "utf8")) as FunctionSpec;
};

async function run(lang: "java" | "cpp" | "go", s: FunctionSpec, code: string): Promise<RunOutcome> {
  if (lang !== "java") return runExtraLocally(s, lang, code, s.tests);
  const r = await runJavaLocally(buildJavaProgram(s, code, s.tests), 30_000);
  return grade({ spec: s, tests: s.tests, stdout: r.stdout, compileError: r.compileError, fatal: r.stderr || undefined });
}

/** FooBar where both threads wait for the other first: it can never make progress. */
const DEADLOCK = {
  java: "class FooBar {\n  private final Semaphore a = new Semaphore(0), b = new Semaphore(0);\n  public FooBar(int n) {}\n  public void foo(Runnable p) throws InterruptedException { b.acquire(); p.run(); a.release(); }\n  public void bar(Runnable p) throws InterruptedException { a.acquire(); p.run(); b.release(); }\n}",
  cpp: "class FooBar {\n  mutex m; condition_variable cv;\npublic:\n  FooBar(int n) {}\n  void foo(function<void()> p) { unique_lock<mutex> l(m); cv.wait(l, [] { return false; }); }\n  void bar(function<void()> p) { unique_lock<mutex> l(m); cv.wait(l, [] { return false; }); }\n};",
  go: "type FooBar struct{ ch chan struct{} }\n\nfunc NewFooBar(n int) *FooBar { return &FooBar{make(chan struct{})} }\nfunc (f *FooBar) Foo(p func()) { <-f.ch }\nfunc (f *FooBar) Bar(p func()) { <-f.ch }",
};

/** Foo that prints immediately: threads started in reverse order print in the wrong order. */
const UNORDERED = {
  java: "class Foo {\n  public void first(Runnable p) { p.run(); }\n  public void second(Runnable p) { p.run(); }\n  public void third(Runnable p) { p.run(); }\n}",
  cpp: "class Foo {\npublic:\n  void first(function<void()> p) { p(); }\n  void second(function<void()> p) { p(); }\n  void third(function<void()> p) { p(); }\n};",
  go: "type Foo struct{}\n\nfunc NewFoo() *Foo { return &Foo{} }\nfunc (f *Foo) First(p func())  { p() }\nfunc (f *Foo) Second(p func()) { p() }\nfunc (f *Foo) Third(p func())  { p() }",
};

describe("concurrency problems", () => {
  it("are offered only in languages with real threads", () => {
    const s = spec("print-in-order");
    assert.deepEqual(languagesFor(s), ["java", "cpp", "go"]);
    assert.match(generateStarter(s, "java"), /public void first\(Runnable printFirst\) throws InterruptedException/);
    assert.match(generateStarter(s, "cpp"), /void first\(function<void\(\)> printFirst\)/);
    assert.match(generateStarter(s, "go"), /func \(this \*Foo\) First\(printFirst func\(\)\)/);
    assert.match(generateStarter(spec("print-zero-even-odd"), "go"), /func NewZeroEvenOdd\(n int\) \*ZeroEvenOdd/);
  });

  for (const lang of ["java", "cpp", "go"] as const) {
    const options = { skip: !available[lang] && `${lang} toolchain not installed` };
    it(`${lang}: reports a deadlock instead of hanging`, options, async () => {
      const outcome = await run(lang, spec("print-foobar-alternately"), DEADLOCK[lang]);
      assert.equal(outcome.verdict, "Runtime Error", JSON.stringify(outcome));
      assert.match(outcome.cases[0].error ?? "", /did not finish/);
    });
    it(`${lang}: catches output in the wrong order`, options, async () => {
      const s = spec("print-in-order");
      const reversed = { ...s, tests: s.tests.filter((t) => JSON.stringify(t.input) === "[[3,2,1]]") };
      assert.equal(reversed.tests.length, 1);
      const outcome = await run(lang, reversed, UNORDERED[lang]);
      assert.equal(outcome.verdict, "Wrong Answer", JSON.stringify(outcome));
    });
  }
});
