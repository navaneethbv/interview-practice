/* Runs JavaScript judge programs off the main thread and transpiles TypeScript.
 * Protocol:
 *   in:  { id, type: "transpile", code }  -> out: { id, type: "transpiled", js?, error? }
 *   in:  { id, type: "run", program }     -> out: { id, type: "line", line } per output line,
 *                                                  { id, type: "done", error? } when finished.
 * The page terminates this worker on timeout, which is the only reliable way to stop
 * an infinite loop in user code.
 */
const TYPESCRIPT_VERSION = "5.9.3"; // same version the test generator uses locally
let tsLoadError = null;

function loadTypeScript() {
  if (self.ts || tsLoadError) return;
  try {
    importScripts(`https://cdn.jsdelivr.net/npm/typescript@${TYPESCRIPT_VERSION}/lib/typescript.js`);
  } catch (e) {
    tsLoadError = e;
  }
}

function transpile(code) {
  loadTypeScript();
  if (!self.ts) return { error: `Could not load the TypeScript compiler: ${tsLoadError?.message ?? "unknown error"}` };
  const ts = self.ts;
  const out = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None, removeComments: false, noEmitOnError: false },
    reportDiagnostics: true,
    fileName: "solution.ts",
  });
  const errors = (out.diagnostics || []).filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    return {
      error: errors
        .map((d) => {
          const line = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : undefined;
          return `${line ? `Line ${line}: ` : ""}${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`;
        })
        .join("\n"),
    };
  }
  return { js: out.outputText };
}

self.onmessage = (event) => {
  const { id, type } = event.data;
  if (type === "transpile") {
    self.postMessage({ id, type: "transpiled", ...transpile(event.data.code) });
    return;
  }
  const emit = (line) => self.postMessage({ id, type: "line", line });
  try {
    new Function("__emit", event.data.program)(emit);
    self.postMessage({ id, type: "done" });
  } catch (e) {
    self.postMessage({ id, type: "done", error: String(e && e.stack ? e.stack : e) });
  }
};
