"use client";

import type { CodeLang } from "../content-types";
import { grade, parseHarnessOutput } from "./grade";
import { buildJavaProgram, mapJavaCompileErrors } from "./java";
import { buildPythonProgram } from "./python";
import type { AnyTestCase, ProblemSpec, RunOutcome } from "./types";

const PYTHON_TIME_LIMIT_MS = 10_000;
/** Upper bound for downloading and starting Pyodide on a slow connection. */
const PYTHON_LOAD_LIMIT_MS = 90_000;

/* ---------------------------------------------------------------- python (browser) */

let worker: Worker | null = null;
let nextId = 1;

function getWorker() {
  worker ??= new Worker("/pyodide-worker.js");
  return worker;
}

/** Warm up Pyodide in the background so the first Run is fast. */
export function preloadPython() {
  if (typeof window === "undefined") return;
  getWorker().postMessage({ id: 0, prelude: "", user: "", runner: "" });
}

interface PyRun {
  stdout: string;
  timedOut: boolean;
  compileError?: string;
  error?: string;
}

function runPythonProgram(program: { prelude: string; user: string; runner: string; packages?: string[] }): Promise<PyRun> {
  return new Promise((resolve) => {
    const w = getWorker();
    const id = nextId++;
    const lines: string[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined = setTimeout(() => {
      w.terminate();
      worker = null;
      finish({ timedOut: false, error: "The Python runtime took too long to load. Check your connection and try again." });
    }, PYTHON_LOAD_LIMIT_MS);
    const finish = (r: Omit<PyRun, "stdout">) => {
      clearTimeout(timer);
      w.removeEventListener("message", onMessage);
      w.removeEventListener("error", onError);
      resolve({ stdout: lines.join("\n"), ...r });
    };
    const onMessage = (e: MessageEvent) => {
      const msg = e.data as { id: number; type: string; line?: string; compileError?: string; error?: string };
      if (msg.id !== id) return;
      if (msg.type === "ready") {
        // The time limit starts once the runtime is loaded, so first-load time doesn't count.
        clearTimeout(timer);
        timer = setTimeout(() => {
          w.terminate();
          worker = null;
          finish({ timedOut: true });
        }, PYTHON_TIME_LIMIT_MS);
      } else if (msg.type === "line") lines.push(msg.line ?? "");
      else if (msg.type === "done") finish({ timedOut: false, compileError: msg.compileError, error: msg.error });
    };
    const onError = (e: ErrorEvent) => {
      worker = null;
      finish({ timedOut: false, error: e.message || "The Python runtime failed to load." });
    };
    w.addEventListener("message", onMessage);
    w.addEventListener("error", onError);
    w.postMessage({ id, ...program });
  });
}

/* ---------------------------------------------------------------- java (server) */

interface JavaResponse {
  compileError?: string;
  stdout?: string;
  stderr?: string;
  timedOut?: boolean;
  error?: string;
}

async function runJavaProgram(source: string): Promise<JavaResponse> {
  try {
    const res = await fetch("/api/run/java", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source }),
    });
    const body = (await res.json().catch(() => ({}))) as JavaResponse;
    if (!res.ok) return { error: body.error ?? `Java runner returned HTTP ${res.status}` };
    return body;
  } catch (e) {
    return { error: `Could not reach the Java runner: ${(e as Error).message}` };
  }
}

/* ---------------------------------------------------------------- public API */

export async function runCode(
  spec: ProblemSpec,
  lang: CodeLang,
  code: string,
  tests: AnyTestCase[],
): Promise<RunOutcome> {
  if (lang === "python" || lang === "sql") {
    const r = await runPythonProgram(buildPythonProgram(spec, code, tests));
    if (r.compileError) return grade({ spec, tests, stdout: "", compileError: r.compileError });
    return grade({ spec, tests, stdout: r.stdout, timedOut: r.timedOut, fatal: r.error });
  }
  const r = await runJavaProgram(buildJavaProgram(spec, code, tests));
  if (r.error) {
    return { verdict: "Internal Error", message: r.error, cases: [], passed: 0, total: tests.length };
  }
  if (r.compileError) {
    return grade({ spec, tests, stdout: "", compileError: mapJavaCompileErrors(r.compileError) });
  }
  return grade({ spec, tests, stdout: r.stdout ?? "", timedOut: r.timedOut, fatal: r.stderr?.trim() || undefined });
}

/**
 * Computes expected outputs for custom test cases by running the Python reference solution.
 * Returns one entry per test: the output, or an error message when the input is invalid.
 */
export async function expectedFor(
  spec: ProblemSpec,
  reference: string,
  tests: AnyTestCase[],
): Promise<{ output?: unknown; error?: string }[]> {
  const r = await runPythonProgram(buildPythonProgram(spec, reference, tests));
  const { results } = parseHarnessOutput(r.stdout);
  return tests.map((_, i) => {
    const res = results.get(i);
    if (!res) return { error: r.timedOut ? "The reference solution timed out on this input." : (r.error ?? "No result") };
    if (res.status === "error") return { error: `Invalid input: ${res.error?.replace(/ \(line \d+\)$/, "")}` };
    return { output: res.output };
  });
}
