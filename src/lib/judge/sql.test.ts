import assert from "node:assert/strict";
import { it } from "node:test";
import { grade } from "./grade";
import { runPythonLocally } from "./local-java";
import { buildPythonScript } from "./python";
import type { SqlSpec } from "./types";
import { fieldNames, parseCase, toEditable } from "../../components/workspace/cases";

const spec: SqlSpec = {
  kind: "sql", id: "sql-regression", resultColumns: ["id", "name"], compare: "unordered",
  tables: [{ name: "Person", columns: [{ name: "id", type: "INTEGER" }, { name: "name", type: "TEXT" }] }],
  tests: [
    { input: { tables: { Person: [[2, null], [1, "O'Brien"], [3, "🙂"], [4, "same"], [5, "same"]] } }, expected: [[2, null], [1, "O'Brien"], [3, "🙂"], [4, "same"], [5, "same"]] },
    { input: { tables: { Person: [] } }, expected: [] },
  ],
};
async function check(query: string, s = spec) {
  const r = await runPythonLocally(buildPythonScript(s, query, s.tests));
  return grade({ spec: s, tests: s.tests, stdout: r.stdout, fatal: r.stderr, timedOut: r.timedOut });
}

it("SQLite handles nulls, text, row order and isolated fixtures", async () => {
  assert.equal((await check("SELECT name, id FROM Person ORDER BY id DESC")).verdict, "Accepted");
  assert.equal((await check("SELECT id, name FROM Person WHERE id <> 2")).verdict, "Wrong Answer");
  assert.equal((await check("SELECT id AS wrong, name FROM Person")).verdict, "Runtime Error");
});

it("SQLite preserves duplicate rows and checks ordered results", async () => {
  const s: SqlSpec = { ...spec, resultColumns: ["name"], tests: [{ input: { tables: { Person: [[1, "same"], [2, "same"]] } }, expected: [["same"], ["same"]] }] };
  assert.equal((await check("SELECT DISTINCT name FROM Person", s)).verdict, "Wrong Answer");
  const ordered: SqlSpec = { ...spec, compare: "exact" };
  assert.equal((await check("SELECT id, name FROM Person ORDER BY id", ordered)).verdict, "Wrong Answer");
});

it("SQLite supports named query parameters and DELETE result inspection", async () => {
  const s: SqlSpec = { ...spec, resultQuery: "SELECT id, name FROM Person", tests: [{ input: { tables: { Person: [[1, "first"], [2, "second"]] }, params: { id: 1 } }, expected: [[2, "second"]] }] };
  assert.equal((await check("DELETE FROM Person WHERE id = :id", s)).verdict, "Accepted");
});

it("SQLite rejects filesystem attachment, multiple statements and unbounded recursion", async () => {
  assert.equal((await check("ATTACH DATABASE '/tmp/interview-sql-escape' AS external")).verdict, "Runtime Error");
  assert.equal((await check("SELECT * FROM Person; DROP TABLE Person")).verdict, "Runtime Error");
  assert.equal((await check("WITH RECURSIVE x(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM x) SELECT sum(n) AS id, NULL AS name FROM x")).verdict, "Runtime Error");
});

it("SQL custom cases round trip and validate row shape", () => {
  const editable = toEditable(spec, spec.tests[0], 0);
  assert.deepEqual(fieldNames(spec), ["tables", "query parameters"]);
  assert.deepEqual(parseCase(spec, editable), { input: { ...spec.tests[0].input, params: {} } });
  assert.ok("error" in parseCase(spec, { fields: ['{"Person":[[1]]}', '{}'] }));
});
