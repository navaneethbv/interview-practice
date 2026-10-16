import assert from "node:assert/strict";
import { afterEach, it, mock } from "node:test";
import { runCode } from "./runner";
import { RESULT_MARKER, type ProblemSpec } from "./types";

const spec: ProblemSpec = {
  id: "echo", style: "leetcode", function: { python: "echo", java: "echo" },
  params: [{ name: "value", type: "int" }], returns: "int",
  tests: [{ input: [1], expected: 1 }],
};
afterEach(() => mock.restoreAll());

it("treats invalid successful responses as infrastructure errors, not wrong answers", async () => {
  for (const body of ["null", "{}", "[]", "<html>Unavailable</html>", '{"stdout":12}', '{"stdout":"","timedOut":"false"}']) {
    mock.method(globalThis, "fetch", async () => new Response(body));
    const result = await runCode(spec, "java", "class Solution {}", spec.tests);
    assert.equal(result.verdict, "Internal Error", body);
    assert.match(result.message ?? "", /invalid response/i);
    mock.restoreAll();
  }
});

it("provides actionable unavailability guidance for each compiled language", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ error: "secret server details" }, { status: 503 }));
  for (const lang of ["java", "cpp", "go"] as const) {
    const result = await runCode(spec, lang, "", spec.tests);
    assert.equal(result.verdict, "Internal Error");
    assert.match(result.message ?? "", /unavailable.*try again/i);
    assert.doesNotMatch(result.message ?? "", /secret server details/);
  }
});

it("bounds requests and reports network timeouts without marking the code incorrect", async () => {
  mock.method(globalThis, "fetch", async (_url: unknown, options: RequestInit) => {
    assert.ok(options.signal instanceof AbortSignal);
    throw new DOMException("expired", "TimeoutError");
  });
  const result = await runCode(spec, "java", "", spec.tests);
  assert.equal(result.verdict, "Internal Error");
  assert.match(result.message ?? "", /took too long.*try again/i);
});

it("preserves compiler diagnostics and successful judge output", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ compileError: "bad syntax", stdout: "", stderr: "", timedOut: false }));
  const compile = await runCode(spec, "java", "", spec.tests);
  assert.equal(compile.verdict, "Compile Error");
  mock.restoreAll();
  mock.method(globalThis, "fetch", async () => Response.json({
    stdout: RESULT_MARKER + JSON.stringify({ i: 0, status: "ok", output: 1 }), stderr: "", timedOut: false,
  }));
  const accepted = await runCode(spec, "java", "", spec.tests);
  assert.equal(accepted.verdict, "Accepted");
});
