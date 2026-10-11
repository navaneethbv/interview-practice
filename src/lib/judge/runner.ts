"use client";

import type { CodeLang } from "../content-types";
import { grade, parseHarnessOutput } from "./grade";
import { buildCppProgram, mapCppCompileErrors } from "./cpp";
import { buildGoProgram, mapGoCompileErrors } from "./go";
import { buildJavaProgram, mapJavaCompileErrors } from "./java";
import { buildJsProgram, splitCompileError } from "./javascript";
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

/* ---------------------------------------------------------------- javascript & typescript (browser) */

const JS_TIME_LIMIT_MS = 10_000;
/** Upper bound for downloading the TypeScript compiler on a slow connection. */
const TS_LOAD_LIMIT_MS = 60_000;

let jsWorker: Worker | null = null;

function getJsWorker() {
  jsWorker ??= new Worker("/js-worker.js");
  return jsWorker;
}

/** Download the TypeScript compiler in the background so the first Run is fast. */
export function preloadTypeScript() {
  if (typeof window === "undefined") return;
  getJsWorker().postMessage({ id: 0, type: "transpile", code: "" });
}

function killJsWorker() {
  jsWorker?.terminate();
  jsWorker = null;
}

/** Sends one request to the JavaScript worker and resolves with its final message. */
function jsRequest<T>(message: object, limitMs: number, onLine?: (line: string) => void): Promise<T | { timedOut: true } | { error: string }> {
  return new Promise((resolve) => {
    const w = getJsWorker();
    const id = nextId++;
    const timer = setTimeout(() => {
      killJsWorker();
      cleanup();
      resolve({ timedOut: true });
    }, limitMs);
    const cleanup = () => {
      clearTimeout(timer);
      w.removeEventListener("message", onMessage);
      w.removeEventListener("error", onError);
    };
    const onMessage = (e: MessageEvent) => {
      const msg = e.data as { id: number; type: string; line?: string };
      if (msg.id !== id) return;
      if (msg.type === "line") {
        onLine?.(msg.line ?? "");
        return;
      }
      cleanup();
      resolve(msg as T);
    };
    const onError = (e: ErrorEvent) => {
      killJsWorker();
      cleanup();
      resolve({ error: e.message || "The JavaScript runner failed." });
    };
    w.addEventListener("message", onMessage);
    w.addEventListener("error", onError);
    w.postMessage({ id, ...message });
  });
}

async function runJs(spec: ProblemSpec, lang: "javascript" | "typescript", code: string, tests: AnyTestCase[]): Promise<RunOutcome> {
  let js = code;
  if (lang === "typescript") {
    const t = await jsRequest<{ js?: string; error?: string }>({ type: "transpile", code }, TS_LOAD_LIMIT_MS);
    if ("timedOut" in t) return internalError("The TypeScript compiler took too long to load. Check your connection and try again.", tests);
    if (t.error && !("js" in t && t.js)) {
      return t.error.startsWith("Could not load") ? internalError(t.error, tests) : grade({ spec, tests, stdout: "", compileError: t.error });
    }
    js = (t as { js: string }).js;
  }
  const lines: string[] = [];
  const r = await jsRequest<{ error?: string }>({ type: "run", program: buildJsProgram(spec, js, tests) }, JS_TIME_LIMIT_MS, (l) => lines.push(l));
  const split = splitCompileError(lines.join("\n"));
  if (split.compileError) return grade({ spec, tests, stdout: "", compileError: split.compileError });
  return grade({ spec, tests, stdout: split.stdout, timedOut: "timedOut" in r, fatal: "error" in r ? r.error : undefined });
}

/* ---------------------------------------------------------------- java, c++, go (server) */

interface ServerResponse {
  compileError?: string;
  stdout?: string;
  stderr?: string;
  timedOut?: boolean;
  error?: string;
}

const SERVER_NAME = { java: "Java", cpp: "C++", go: "Go" } as const;

async function runOnServer(lang: keyof typeof SERVER_NAME, body: object): Promise<ServerResponse> {
  try {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    };
    let res: Response;
    switch (lang) {
      case "java": res = await fetch("/api/run/java", options); break;
      case "cpp": res = await fetch("/api/run/cpp", options); break;
      case "go": res = await fetch("/api/run/go", options); break;
    }
    const data = (await res.json().catch(() => ({}))) as ServerResponse;
    if (!res.ok) return { error: data.error ?? `${SERVER_NAME[lang]} runner returned HTTP ${res.status}` };
    return data;
  } catch (e) {
    return { error: `Could not reach the ${SERVER_NAME[lang]} runner: ${(e as Error).message}` };
  }
}

function internalError(message: string, tests: AnyTestCase[]): RunOutcome {
  return { verdict: "Internal Error", message, cases: [], passed: 0, total: tests.length };
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
  if (lang === "javascript" || lang === "typescript") return runJs(spec, lang, code, tests);
  let r: ServerResponse;
  let mapErrors: (stderr: string) => string;
  if (lang === "cpp") {
    r = await runOnServer("cpp", { source: buildCppProgram(spec, code, tests) });
    mapErrors = mapCppCompileErrors;
  } else if (lang === "go") {
    r = await runOnServer("go", buildGoProgram(spec, code, tests));
    mapErrors = mapGoCompileErrors;
  } else {
    r = await runOnServer("java", { source: buildJavaProgram(spec, code, tests) });
    mapErrors = mapJavaCompileErrors;
  }
  if (r.error) return internalError(r.error, tests);
  if (r.compileError) {
    return grade({ spec, tests, stdout: "", compileError: mapErrors(r.compileError) });
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
