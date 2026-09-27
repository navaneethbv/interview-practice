import { judgeSpecOutput } from "./compare";
import type { AnyTestCase, CaseResult, ProblemSpec, RawCaseResult, RunOutcome } from "./types";
import { RESULT_MARKER } from "./types";

/** Split harness stdout into per-case results and any stray output printed outside test calls. */
export function parseHarnessOutput(stdout: string): { results: Map<number, RawCaseResult>; stray: string } {
  const results = new Map<number, RawCaseResult>();
  const stray: string[] = [];
  for (const line of stdout.split("\n")) {
    const at = line.indexOf(RESULT_MARKER);
    if (at === -1) {
      stray.push(line);
      continue;
    }
    if (at > 0) stray.push(line.slice(0, at));
    try {
      const r = JSON.parse(line.slice(at + RESULT_MARKER.length)) as RawCaseResult;
      results.set(r.i, r);
    } catch {
      stray.push(line);
    }
  }
  return { results, stray: stray.join("\n").trim() };
}

export interface GradeInput {
  spec: ProblemSpec;
  tests: AnyTestCase[];
  stdout: string;
  /** The process was killed for exceeding the time limit. */
  timedOut?: boolean;
  compileError?: string;
  /** Non-harness failure (e.g. the runner itself crashed). */
  fatal?: string;
}

export function grade({ spec, tests, stdout, timedOut, compileError, fatal }: GradeInput): RunOutcome {
  const total = tests.length;
  if (compileError) {
    return { verdict: "Compile Error", compileError, cases: [], passed: 0, total };
  }
  const { results, stray } = parseHarnessOutput(stdout);
  const cases: CaseResult[] = tests.map((t, index) => {
    const r = results.get(index);
    if (!r) return { index, passed: false, notRun: true };
    if (r.status === "error") return { index, passed: false, error: r.error, stdout: r.stdout };
    return {
      index,
      passed: judgeSpecOutput(spec, t.input, r.output, t.expected),
      output: r.output,
      stdout: r.stdout,
      ms: r.ms,
    };
  });
  const passed = cases.filter((c) => c.passed).length;
  const runtimeMs = cases.reduce((a, c) => a + (c.ms ?? 0), 0);
  const firstBad = cases.find((c) => !c.passed);

  let verdict: RunOutcome["verdict"] = "Accepted";
  let message: string | undefined;
  if (firstBad?.error) verdict = "Runtime Error";
  else if (firstBad?.notRun) {
    verdict = timedOut ? "Time Limit Exceeded" : "Internal Error";
    message = timedOut
      ? "Your code took too long. Look for an infinite loop or a slower-than-needed approach."
      : (fatal ?? "The program exited before finishing all test cases.");
  } else if (firstBad) verdict = "Wrong Answer";

  return { verdict, cases, passed, total, message, stdout: stray || undefined, runtimeMs };
}
