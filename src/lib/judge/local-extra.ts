import ts from "typescript";
import { buildCppProgram, mapCppCompileErrors } from "./cpp";
import { grade } from "./grade";
import { buildGoProgram, mapGoCompileErrors } from "./go";
import { buildJsProgram, splitCompileError, TS_COMPILER_OPTIONS } from "./javascript";
import type { ExtraLang } from "./languages";
import { runCppLocally, runGoLocally, runJsLocally } from "./local-java";
import type { AnyTestCase, ProblemSpec, RunOutcome } from "./types";

/** Transpiles TypeScript with the same options as the browser worker; returns syntax errors as a compile error. */
export function transpileTypeScript(code: string): { js: string; error?: string } {
  const out = ts.transpileModule(code, { compilerOptions: TS_COMPILER_OPTIONS, reportDiagnostics: true, fileName: "solution.ts" });
  const errors = (out.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    const message = errors
      .map((d) => {
        const line = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : undefined;
        const prefix = line ? `Line ${line}: ` : "";
        return prefix + ts.flattenDiagnosticMessageText(d.messageText, "\n");
      })
      .join("\n");
    return { js: "", error: message };
  }
  return { js: out.outputText };
}

/** Runs a solution in one of the extra languages with local toolchains (scripts and tests only). */
export async function runExtraLocally(
  spec: ProblemSpec,
  lang: ExtraLang,
  code: string,
  tests: AnyTestCase[],
  timeoutMs = 20_000,
): Promise<RunOutcome> {
  if (lang === "javascript" || lang === "typescript") {
    let js = code;
    if (lang === "typescript") {
      const t = transpileTypeScript(code);
      if (t.error) return grade({ spec, tests, stdout: "", compileError: t.error });
      js = t.js;
    }
    const r = await runJsLocally(buildJsProgram(spec, js, tests), timeoutMs);
    const split = splitCompileError(r.stdout);
    if (split.compileError) return grade({ spec, tests, stdout: "", compileError: split.compileError });
    return grade({ spec, tests, stdout: r.stdout, timedOut: r.timedOut, fatal: r.stderr.trim() || undefined });
  }
  const r = lang === "cpp"
    ? await runCppLocally(buildCppProgram(spec, code, tests), timeoutMs)
    : await runGoLocally(buildGoProgram(spec, code, tests), timeoutMs);
  if (r.compileError) {
    const mapped = lang === "cpp" ? mapCppCompileErrors(r.compileError) : mapGoCompileErrors(r.compileError);
    return grade({ spec, tests, stdout: "", compileError: mapped });
  }
  return grade({ spec, tests, stdout: r.stdout, timedOut: r.timedOut, fatal: r.stderr.trim() || undefined });
}

export const EXTRA_EXTENSIONS: Record<ExtraLang, string> = { javascript: "js", typescript: "ts", cpp: "cpp", go: "go" };
