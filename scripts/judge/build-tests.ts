/**
 * Fills in and verifies expected outputs for problem specs.
 *
 * For every content/problems/<id>.json:
 *  - runs the Python reference (<id>.py) against every test case with the same harness the site uses;
 *  - fills `expected` where it is missing (or everywhere with --regen);
 *  - fails when a hand-written `expected` disagrees with the reference;
 *  - with --java, also runs the Java reference (<id>.java) and requires every case to pass.
 *
 * Usage: npm run tests:build -- [--java] [--regen] [id ...]
 */
import fs from "node:fs";
import path from "node:path";
import { buildPythonScript } from "../../src/lib/judge/python";
import { buildJavaProgram, mapJavaCompileErrors } from "../../src/lib/judge/java";
import { grade, parseHarnessOutput } from "../../src/lib/judge/grade";
import { judgeOutput } from "../../src/lib/judge/compare";
import { runJavaLocally, runPythonLocally } from "../../src/lib/judge/local-java";
import type { AnyTestCase, ProblemSpec } from "../../src/lib/judge/types";

const DIR = path.join(process.cwd(), "content/problems");
const args = process.argv.slice(2);
const withJava = args.includes("--java");
const regen = args.includes("--regen");
const only = new Set(args.filter((a) => !a.startsWith("--")));

function formatSpec(spec: ProblemSpec): string {
  const { tests, ...rest } = spec;
  const head = JSON.stringify(rest, null, 2).replace(/\n}$/, "");
  const lines = (tests as AnyTestCase[]).map((t) => `    ${JSON.stringify(t)}`);
  return `${head},\n  "tests": [\n${lines.join(",\n")}\n  ]\n}\n`;
}

async function processSpec(file: string): Promise<string[]> {
  const errors: string[] = [];
  const spec = JSON.parse(fs.readFileSync(file, "utf8")) as ProblemSpec;
  const id = spec.id;
  const pyRef = path.join(DIR, `${id}.py`);
  if (!fs.existsSync(pyRef)) return [`${id}: missing Python reference ${id}.py`];
  const tests = spec.tests as AnyTestCase[];

  const py = await runPythonLocally(buildPythonScript(spec, fs.readFileSync(pyRef, "utf8"), tests));
  if (py.timedOut) return [`${id}: Python reference timed out`];
  const { results, stray } = parseHarnessOutput(py.stdout);
  if (py.stderr.trim()) errors.push(`${id}: python stderr: ${py.stderr.trim().slice(0, 500)}`);
  if (stray) errors.push(`${id}: python printed: ${stray.slice(0, 200)}`);

  let changed = false;
  const compare = spec.kind === "design" ? "exact" : spec.compare;
  tests.forEach((t, i) => {
    const r = results.get(i);
    if (!r || r.status !== "ok") {
      errors.push(`${id}#${i}: reference failed: ${r?.error ?? "no result"}`);
      return;
    }
    if (t.expected === undefined || regen) {
      if (JSON.stringify(t.expected) !== JSON.stringify(r.output)) {
        (t as { expected?: unknown }).expected = r.output;
        changed = true;
      }
    } else if (!judgeOutput(compare, t.input, r.output, t.expected)) {
      errors.push(`${id}#${i}: expected ${JSON.stringify(t.expected)} but reference gave ${JSON.stringify(r.output)}`);
    }
  });
  if (changed) fs.writeFileSync(file, formatSpec(spec));

  const javaRef = path.join(DIR, `${id}.java`);
  if (withJava && fs.existsSync(javaRef)) {
    const program = buildJavaProgram(spec, fs.readFileSync(javaRef, "utf8"), tests);
    const run = await runJavaLocally(program, 20_000);
    const outcome = grade({
      spec,
      tests,
      stdout: run.stdout,
      timedOut: run.timedOut,
      compileError: run.compileError && mapJavaCompileErrors(run.compileError),
      fatal: run.stderr,
    });
    if (outcome.verdict !== "Accepted") {
      const bad = outcome.cases.find((c) => !c.passed);
      const detail = bad ? `case ${bad.index}: ${bad.error ?? JSON.stringify(bad.output)}` : "";
      errors.push(`${id}: Java reference ${outcome.verdict} ${outcome.compileError ?? ""} ${detail} ${outcome.message ?? ""}`);
    }
  }
  return errors;
}

async function main() {
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !only.size || only.has(f.replace(/\.json$/, "")))
    .map((f) => path.join(DIR, f));
  const errors: string[] = [];
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
  if (errors.length) process.exit(1);
}

main();
