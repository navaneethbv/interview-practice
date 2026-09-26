/* Runs judge programs with Pyodide off the main thread.
 * Protocol:
 *   in:  { id, prelude, user, runner }
 *   out: { id, type: "ready" } once Pyodide is loaded,
 *        { id, type: "line", line } for every stdout line,
 *        { id, type: "done", compileError?, error? } when the program finishes.
 * The page terminates this worker on timeout, which is the only reliable way to stop
 * an infinite loop in user code.
 */
const PYODIDE_VERSION = "0.28.3"; // Python 3.13, same major version the test generator uses locally
let loadError = null;
try {
  importScripts(`https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`);
} catch (e) {
  loadError = e;
}

let pyodideReady = null;
let currentId = null;
let pending = "";

function flushLine(text) {
  pending += text;
  let nl;
  while ((nl = pending.indexOf("\n")) !== -1) {
    self.postMessage({ id: currentId, type: "line", line: pending.slice(0, nl) });
    pending = pending.slice(nl + 1);
  }
}

async function getPyodide() {
  if (loadError) throw loadError;
  if (!pyodideReady) {
    pyodideReady = loadPyodide({ indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/` }).then(
      (py) => {
        const decoder = new TextDecoder();
        py.setStdout({ write: (buf) => (flushLine(decoder.decode(buf)), buf.length) });
        py.setStderr({ write: (buf) => (flushLine(decoder.decode(buf)), buf.length) });
        return py;
      },
    );
  }
  return pyodideReady;
}

const COMPILE_CHECK = `
__compile_error = None
try:
    __user_code = compile(__user_src, "<solution>", "exec")
except SyntaxError as e:
    __compile_error = f"{type(e).__name__}: {e.msg} (line {e.lineno})"
    if e.text:
        __compile_error += "\\n    " + e.text.strip()
`;

self.onmessage = async (event) => {
  const { id, prelude, user, runner } = event.data;
  let py;
  try {
    py = await getPyodide();
  } catch (e) {
    pyodideReady = null;
    self.postMessage({ id, type: "done", error: `Could not load the Python runtime: ${e && e.message ? e.message : e}` });
    return;
  }
  // Everything below runs synchronously, so output can't interleave with another message.
  currentId = id;
  pending = "";
  self.postMessage({ id, type: "ready" });
  const ns = py.globals.get("dict")();
  try {
    ns.set("__name__", "__main__");
    ns.set("__user_src", user);
    py.runPython(prelude, { globals: ns });
    py.runPython(COMPILE_CHECK, { globals: ns });
    const compileError = ns.get("__compile_error");
    if (compileError) {
      self.postMessage({ id, type: "done", compileError });
      return;
    }
    try {
      py.runPython("exec(__user_code, globals())", { globals: ns });
    } catch (e) {
      // Errors while defining the solution (e.g. a NameError at class level).
      const msg = String(e && e.message ? e.message : e);
      const last = msg.trim().split("\n").pop();
      const line = [...msg.matchAll(/File "<solution>", line (\d+)/g)].pop();
      self.postMessage({ id, type: "done", compileError: `${last}${line ? ` (line ${line[1]})` : ""}` });
      return;
    }
    py.runPython(runner, { globals: ns });
    if (pending) flushLine("\n");
    self.postMessage({ id, type: "done" });
  } catch (e) {
    if (pending) flushLine("\n");
    const msg = String(e && e.message ? e.message : e);
    self.postMessage({ id, type: "done", error: msg.trim().split("\n").slice(-3).join("\n") });
  } finally {
    ns.destroy();
  }
};
