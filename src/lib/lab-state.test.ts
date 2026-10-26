import test from "node:test";
import assert from "node:assert/strict";
import { isLabState, parseLabState, LABS_KEY } from "./lab-state";
import { buildLabSqlProgram, sameSqlResult } from "./lab-sql";
test("lab backup accepts drafts and rejects unsafe or oversized content", () => {
  assert.equal(LABS_KEY, "ip:labs:v1");
  assert.equal(
    isLabState({
      a: { draft: "my requirements", checks: ["scope"], updated: 1 },
    }),
    true,
  );
  for (const bad of [
    { a: { draft: 4, checks: [], updated: 1 } },
    { a: { draft: "a".repeat(50001), checks: [], updated: 1 } },
    { a: { draft: "x", checks: [4], updated: 1 } },
    { a: { draft: "x", checks: [], updated: -1 } },
  ])
    assert.equal(isLabState(bad), false);
  assert.deepEqual(parseLabState("{broken"), {});
});
test("SQL results compare columns and sorted rows while retaining duplicate multiplicity", () => {
  assert.equal(
    sameSqlResult(
      { columns: ["a"], rows: [[2], [1]] },
      { columns: ["a"], rows: [[1], [2]] },
    ),
    true,
  );
  assert.equal(
    sameSqlResult(
      { columns: ["a"], rows: [[1], [1]] },
      { columns: ["a"], rows: [[1]] },
    ),
    false,
  );
});
test("SQL program encodes user query as data and restricts database authorizer", () => {
  const p = buildLabSqlProgram("SELECT 1");
  assert.deepEqual(p.packages, ["sqlite3"]);
  assert.match(p.runner, /SQLITE_SELECT/);
  assert.match(p.runner, /fetchmany\(201\)/);
  assert.match(p.runner, /set_progress_handler/);
  assert.equal(p.user, "");
});

import { spawnSync } from "node:child_process";
import { sqlExercises } from "./lab-sql";
function runSql(query: string) {
  const p = buildLabSqlProgram(query);
  const run = spawnSync("python3", ["-c", p.runner], {
    encoding: "utf8",
    timeout: 5000,
  });
  assert.equal(run.status, 0, run.stderr);
  return run.stdout.trim();
}
test("every SQL reference runs against the actual seed data and matches its expected table", () => {
  for (const e of sqlExercises) {
    const line = runSql(e.solution);
    assert.match(line, /^LAB_RESULT:/, e.title);
    assert.equal(
      sameSqlResult(JSON.parse(line.slice(11)), e.expected),
      true,
      e.title,
    );
  }
});
test("SQLite refuses mutation, attachment, pragmas, multiple statements and oversized results", () => {
  for (const query of [
    "DELETE FROM orders",
    "DROP TABLE orders",
    "ATTACH DATABASE ':memory:' AS other",
    "PRAGMA table_info(orders)",
    "SELECT 1; SELECT 2;",
    "WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM n WHERE x<201) SELECT * FROM n",
    "SELECT zeroblob(100001)",
  ]) {
    assert.match(runSql(query), /^LAB_ERROR:/, query);
  }
});
