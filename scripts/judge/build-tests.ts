/**
 * Fills in and verifies expected outputs for problem specs.
 *
 * For every content/problems/<id>.json and content/leetcode/<slug>.json:
 *  - runs the Python reference (<id>.py) against every test case with the same harness the site uses;
 *  - fills `expected` where it is missing (or everywhere with --regen);
 *  - fails when a hand-written `expected` disagrees with the reference;
 *  - with --java, also runs the Java reference (<id>.java) and requires every case to pass;
 *  - with --langs, also runs any JavaScript, TypeScript, C++ and Go references (<id>.js/.ts/.cpp/.go).
 *
 * Usage: npm run tests:build -- [--java] [--langs] [--regen] [id ...]
 */
import fs from "node:fs";
import path from "node:path";
import { buildPythonScript } from "../../src/lib/judge/python";
import { buildJavaProgram, mapJavaCompileErrors } from "../../src/lib/judge/java";
import { grade, parseHarnessOutput } from "../../src/lib/judge/grade";
import { judgeSpecOutput } from "../../src/lib/judge/compare";
import { runJavaLocally, runPythonLocally } from "../../src/lib/judge/local-java";
import { EXTRA_EXTENSIONS, runExtraLocally } from "../../src/lib/judge/local-extra";
import { EXTRA_LANGS, languagesFor } from "../../src/lib/judge/languages";
import type { AnyTestCase, ProblemSpec } from "../../src/lib/judge/types";

const DIRS = ["content/problems", "content/leetcode"].map((d) => path.join(process.cwd(), d));
const args = process.argv.slice(2);
const withJava = args.includes("--java");
const withLangs = args.includes("--langs");
const regen = args.includes("--regen");
const only = new Set(args.filter((a) => !a.startsWith("--")));
const executions = { python: 0, java: 0, sqlite: 0, other: 0 };

function formatSpec(spec: ProblemSpec): string {
  const { tests, ...rest } = spec;
  const head = JSON.stringify(rest, null, 2).replace(/\n}$/, "");
  const lines = (tests as AnyTestCase[]).map((t) => `    ${JSON.stringify(t)}`);
  return `${head},\n  "tests": [\n${lines.join(",\n")}\n  ]\n}\n`;
}

type HarnessResult = ReturnType<typeof parseHarnessOutput>["results"] extends Map<number, infer R> ? R : never;

/** Checks one reference result, filling `expected` when missing or regenerating; returns true when the test changed. */
function applyReference(spec: ProblemSpec, t: AnyTestCase, i: number, r: HarnessResult | undefined, errors: string[]): boolean {
  const label = `${spec.id}#${i}`;
  if (r?.status !== "ok") {
    errors.push(`${label}: reference failed: ${r?.error ?? "no result"}`);
    return false;
  }
  if (!judgeSpecOutput(spec, t.input, r.output, r.output)) {
    errors.push(`${label}: reference output violates its declared result contract`);
    return false;
  }
  if (t.expected !== undefined && !regen) {
    if (!judgeSpecOutput(spec, t.input, r.output, t.expected)) {
      errors.push(`${label}: expected ${JSON.stringify(t.expected)} but reference gave ${JSON.stringify(r.output)}`);
    }
    return false;
  }
  if (JSON.stringify(t.expected) === JSON.stringify(r.output)) return false;
  (t as { expected?: unknown }).expected = r.output;
  return true;
}

async function processSpec(file: string): Promise<string[]> {
  const errors: string[] = [];
  const spec = JSON.parse(fs.readFileSync(file, "utf8")) as ProblemSpec;
  const id = spec.id;
  const dir = path.dirname(file);
  if (id !== path.basename(file, ".json")) return [`${id}: spec id does not match its file name ${path.basename(file)}`];
  const tests = spec.tests as AnyTestCase[];
  if (spec.kind !== "sql" && spec.kind !== "design" && spec.concurrency) return processConcurrency(spec, dir, tests);
  const extension = spec.kind === "sql" ? "sql" : "py";
  const pyRef = path.join(dir, `${id}.${extension}`);
  if (!fs.existsSync(pyRef)) return [`${id}: missing reference ${id}.${extension}`]; // nosemgrep -- build script reading repo problem files

  const py = await runPythonLocally(buildPythonScript(spec, fs.readFileSync(pyRef, "utf8"), tests));
  executions[spec.kind === "sql" ? "sqlite" : "python"]++;
  if (py.timedOut) return [`${id}: Python reference timed out`];
  const { results, stray } = parseHarnessOutput(py.stdout);
  if (py.stderr.trim()) errors.push(`${id}: python stderr: ${py.stderr.trim().slice(0, 500)}`);
  if (stray) errors.push(`${id}: python printed: ${stray.slice(0, 200)}`);

  const changed = tests.map((t, i) => applyReference(spec, t, i, results.get(i), errors)).some(Boolean);
  if (changed) fs.writeFileSync(file, formatSpec(spec));

  const javaRef = path.join(dir, `${id}.java`);
  if (withJava && spec.kind !== "sql" && fs.existsSync(javaRef)) { // nosemgrep -- build script reading repo problem files
    const javaError = await verifyJava(spec, fs.readFileSync(javaRef, "utf8"), tests); // nosemgrep -- build script reading repo problem files
    if (javaError) errors.push(javaError);
  }
  if (withLangs && spec.kind !== "sql") errors.push(...(await verifyExtraLanguages(spec, dir, tests)));
  return errors;
}

/** Runs the optional Java reference against the now-complete tests; returns an error line on failure. */
async function verifyJava(spec: ProblemSpec, reference: string, tests: AnyTestCase[]): Promise<string | undefined> {
  const run = await runJavaLocally(buildJavaProgram(spec, reference, tests), 20_000);
  executions.java++;
  const outcome = grade({
    spec,
    tests,
    stdout: run.stdout,
    timedOut: run.timedOut,
    compileError: run.compileError && mapJavaCompileErrors(run.compileError),
    fatal: run.stderr,
  });
  if (outcome.verdict === "Accepted") return undefined;
  const bad = outcome.cases.find((c) => !c.passed);
  const detail = bad ? `case ${bad.index}: ${bad.error ?? JSON.stringify(bad.output)}` : "";
  return `${spec.id}: Java reference ${outcome.verdict} ${outcome.compileError ?? ""} ${detail} ${outcome.message ?? ""}`;
}

/**
 * Concurrency problems have no Python reference (Pyodide has no threads): their expected outputs are
 * written by hand and the Java reference, required, is checked with --java; C++ and Go with --langs.
 */
async function processConcurrency(spec: ProblemSpec, dir: string, tests: AnyTestCase[]): Promise<string[]> {
  const errors: string[] = [];
  const javaRef = path.join(dir, `${spec.id}.java`);
  if (!fs.existsSync(javaRef)) return [`${spec.id}: missing reference ${spec.id}.java`]; // nosemgrep -- build script reading repo problem files
  tests.forEach((t, i) => {
    if (t.expected === undefined) errors.push(`${spec.id}#${i}: concurrency tests need a hand-written expected value`);
  });
  if (errors.length) return errors;
  if (withJava) {
    const javaError = await verifyJava(spec, fs.readFileSync(javaRef, "utf8"), tests); // nosemgrep -- build script reading repo problem files
    if (javaError) errors.push(javaError);
  }
  if (withLangs) errors.push(...(await verifyExtraLanguages(spec, dir, tests)));
  return errors;
}

/** Runs every extra-language reference that exists for a spec; returns error lines. */
async function verifyExtraLanguages(spec: ProblemSpec, dir: string, tests: AnyTestCase[]): Promise<string[]> {
  const errors: string[] = [];
  for (const lang of EXTRA_LANGS) {
    const file = path.join(dir, `${spec.id}.${EXTRA_EXTENSIONS[lang]}`);
    if (!fs.existsSync(file)) continue; // nosemgrep -- build script reading repo problem files
    if (!languagesFor(spec).includes(lang)) {
      errors.push(`${spec.id}: has a ${lang} reference but uses features ${lang} does not support`);
      continue;
    }
    const outcome = await runExtraLocally(spec, lang, fs.readFileSync(file, "utf8"), tests); // nosemgrep -- build script reading repo problem files
    executions.other++;
    if (outcome.verdict === "Accepted") continue;
    const bad = outcome.cases.find((c) => !c.passed);
    const detail = bad ? `case ${bad.index}: ${bad.error ?? JSON.stringify(bad.output)}` : "";
    errors.push(`${spec.id}: ${lang} reference ${outcome.verdict} ${outcome.compileError ?? ""} ${detail} ${outcome.message ?? ""}`);
  }
  return errors;
}

async function main() {
  const files = DIRS.filter((d) => fs.existsSync(d)).flatMap((dir) => // nosemgrep -- build script reading repo problem files
    fs // nosemgrep -- build script reading repo problem files
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .filter((f) => !only.size || only.has(f.replace(/\.json$/, "")))
      .map((f) => path.join(dir, f)),
  );
  const errors: string[] = [];
  for (const id of only) {
    if (!files.some((file) => path.basename(file, ".json") === id)) errors.push(`${id}: no matching spec`);
  }
  let done = 0;
  const queue = [...files];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length) {
        const f = queue.shift()!;
        try {
          errors.push(...(await processSpec(f)));
        } catch (e) {
          errors.push(`${path.basename(f)}: ${(e as Error).message}`);
        }
        done++;
      }
    }),
  );
  for (const e of errors) console.error(`✗ ${e}`);
  console.log(`${done} specs processed, ${errors.length} problems found.`);
  console.log(`Reference executions: ${executions.python} Python, ${executions.java} Java, ${executions.sqlite} SQLite, ${executions.other} other languages.`);
  if (errors.length) process.exit(1);
}

main();
