import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

test("loads optional solution content without publishing walkthroughs as problems", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "solution-content-"));
  const originalCwd = process.cwd();
  const content = path.join(directory, "content");
  const problems = path.join(content, "leetcode");
  fs.mkdirSync(path.join(problems, "walkthroughs"), { recursive: true }); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  fs.mkdirSync(path.join(content, "sets")); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  const metadata: Record<string, { title: string }> = {};
  for (const slug of ["both", "java-only", "walkthrough-only", "neither", "sql-example"]) {
    metadata[slug] = { title: slug };
    const sql = slug === "sql-example";
    fs.writeFileSync(path.join(problems, `${slug}.json`), JSON.stringify({ // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
      id: slug, kind: sql ? "sql" : "function", tests: [{ input: [], expected: 1 }],
    }));
    fs.writeFileSync(path.join(problems, `${slug}.md`), "# Title\n\nStatement."); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
    fs.writeFileSync(path.join(problems, `${slug}.${sql ? "sql" : "py"}`), sql ? "SELECT 1;" : "class Solution: pass"); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
    if (["both", "java-only", "sql-example"].includes(slug)) {
      fs.writeFileSync(path.join(problems, `${slug}.java`), "class Solution {}"); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
    }
    if (["both", "walkthrough-only", "sql-example"].includes(slug)) {
      fs.writeFileSync(path.join(problems, "walkthroughs", `${slug}.md`), "## Intuition\n\nUse **state**."); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
    }
  }
  fs.writeFileSync(path.join(content, "sets", "problems.json"), JSON.stringify(metadata)); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  fs.writeFileSync(path.join(problems, "walkthroughs", "orphan.md"), "## Intuition\n"); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  try {
    process.chdir(directory);
    const { getLcProblem, lcAuthored } = await import("./content");
    process.chdir(originalCwd);
    assert.deepEqual([...lcAuthored()].sort(), Object.keys(metadata).sort());
    for (const slug of ["both", "java-only", "walkthrough-only", "neither"]) {
      const problem = getLcProblem(slug)!;
      assert.equal(problem.javaReference, ["both", "java-only"].includes(slug) ? "class Solution {}" : null);
      assert.equal(problem.walkthroughHtml, ["both", "walkthrough-only"].includes(slug)
        ? "<h2>Intuition</h2>\n<p>Use <strong>state</strong>.</p>\n" : null);
      assert.equal(problem.statementHtml, "<p>Statement.</p>\n");
    }
    assert.equal(getLcProblem("sql-example")!.reference, "SELECT 1;");
    assert.equal(getLcProblem("sql-example")!.javaReference, null);
    assert.match(getLcProblem("sql-example")!.walkthroughHtml!, /Intuition/);
    for (const slug of ["../both", "walkthroughs/both", "both.java", "Both", "missing"]) {
      assert.equal(getLcProblem(slug), null);
    }
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
