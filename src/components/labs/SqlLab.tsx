"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Square, Database, CheckCircle2 } from "lucide-react";
import {
  buildLabSqlProgram,
  sameSqlResult,
  sqlExercises,
  sqlTables,
  type SqlResult,
} from "@/lib/lab-sql";
import { saveLabAttempt, useLabState } from "@/lib/lab-storage";
const panel = "rounded-2xl border border-line bg-layer-1 p-5";
function keyedValues<T>(values: T[], identify: (value: T) => string) {
  const occurrences = new Map<string, number>();
  return values.map((value) => {
    const identity = identify(value);
    const occurrence = occurrences.get(identity) ?? 0;
    occurrences.set(identity, occurrence + 1);
    return { key: JSON.stringify([identity, occurrence]), value };
  });
}
function ResultTable({ result }: Readonly<{ result: SqlResult }>) {
  const columns = keyedValues(result.columns, (column) => column);
  const rows = keyedValues(result.rows, (row) => JSON.stringify(row));
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-left text-xs">
        <thead className="bg-layer-2">
          <tr>
            {columns.map((column) => (
              <th className="whitespace-nowrap px-3 py-2 font-medium" key={column.key}>
                {column.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={row.key}>
              {columns.map((column, position) => (
                <td
                  className="whitespace-nowrap px-3 py-2 font-mono text-fg-2"
                  key={column.key}
                >
                  {row.value[position] === null ? (
                    <span className="italic text-fg-3">NULL</span>
                  ) : (
                    String(row.value[position])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!result.rows.length && <p className="p-3 text-sm text-fg-3">0 rows</p>}
    </div>
  );
}
export function SqlLab() {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<SqlResult | null>(null);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const worker = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const state = useLabState();
  const item = sqlExercises[index];
  const key = `sql-exercise-${index + 1}`;
  const attempt = state[key] ?? { draft: "", checks: [], updated: 0 };
  const query = state[key] ? attempt.draft : "SELECT * FROM orders LIMIT 10;";
  function cleanup() {
    worker.current?.terminate();
    worker.current = null;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  useEffect(
    () => () => {
      worker.current?.terminate();
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function run() {
    cleanup();
    setBusy(true);
    setPassed(null);
    setResult(null);
    setStatus(
      "Loading the browser SQLite runtime… The first run downloads Python and SQLite.",
    );
    const w = new Worker("/pyodide-worker.js");
    worker.current = w;
    const fail = (s: string) => {
      cleanup();
      setBusy(false);
      setStatus(s);
    };
    timer.current = setTimeout(
      () =>
        fail(
          "Runtime download timed out. Check your connection and allow cdn.jsdelivr.net, then run again.",
        ),
      60000,
    );
    w.onerror = () =>
      fail(
        "The browser could not start the SQL runtime. Check your connection, then try again.",
      );
    let gotResult = false;
    function showQueryResult(line: string) {
      try {
        const actual = JSON.parse(line.slice(11)) as SqlResult;
        const correct = sameSqlResult(actual, item.expected);
        setResult(actual);
        setPassed(correct);
        setStatus(
          correct
            ? "Matches expected columns and rows. Explain what this means for the business."
            : "Query ran. Compare column aliases and values with the expected result; row order is ignored.",
        );
        if (correct) {
          const saved = saveLabAttempt(key, {
            draft: query,
            checks: ["passed"],
            updated: Date.now(),
          });
          setSaveError(!saved);
        }
      } catch {
        setStatus("The query returned a result that could not be read.");
      }
    }
    function handleWorkerLine(line: string) {
      if (line.startsWith("LAB_ERROR:")) {
        setStatus(line.slice(10));
        gotResult = true;
      } else if (line.startsWith("LAB_RESULT:")) {
        showQueryResult(line);
        gotResult = true;
      }
    }
    function handleWorkerReady() {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => fail("Query stopped after 8 seconds. Simplify the join or add LIMIT."),
        8000,
      );
      setStatus("Running your read-only SQLite query…");
    }
    w.onmessage = (event: MessageEvent) => {
      const msg = event.data;
      if (msg.type === "ready") handleWorkerReady();
      if (msg.type === "line") handleWorkerLine(String(msg.line));
      if (msg.type === "done") {
        if (msg.error || msg.compileError)
          setStatus(String(msg.error ?? msg.compileError));
        else if (!gotResult)
          setStatus("No result returned. Use a SELECT query.");
        cleanup();
        setBusy(false);
      }
    };
    w.postMessage({ id: Date.now(), ...buildLabSqlProgram(query) });
  }
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-layer-1 p-4 text-sm leading-6 text-fg-2">
        SQL runs locally in a Web Worker using SQLite through the existing
        Pyodide runtime. Only read operations are allowed; each run starts with
        fresh data. Results are limited to 200 rows and execution is bounded. No
        server executes your SQL.
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className={panel}>
          <h2 className="font-semibold">Practice route</h2>
          <p className="mt-1 text-xs text-fg-3">
            {
              sqlExercises.filter((_, i) =>
                state[`sql-exercise-${i + 1}`]?.checks.includes("passed"),
              ).length
            }{" "}
            / 12 matched
          </p>
          <div className="mt-4 space-y-1">
            {sqlExercises.map((e, i) => (
              <button type="button"
                key={e.title}
                disabled={busy}
                onClick={() => {
                  setIndex(i);
                  setResult(null);
                  setPassed(null);
                  setRevealed(false);
                  setStatus("");
                }}
                aria-current={index === i ? "step" : undefined}
                className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm disabled:opacity-50 ${index === i ? "bg-brand/10 font-medium text-brand" : "text-fg-2 hover:bg-layer-2"}`}
              >
                <span className="w-5 shrink-0 font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{e.title}</span>
                {state[`sql-exercise-${i + 1}`]?.checks.includes("passed") && (
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-brand"
                  />
                )}
              </button>
            ))}
          </div>
        </aside>
        <section className={`${panel} space-y-5`}>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand">
              Exercise {index + 1} / 12
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-fg-2">{item.prompt}</p>
          </div>
          <div>
            <label
              htmlFor="sql-query"
              className="mb-2 block text-sm font-medium"
            >
              Your query
            </label>
            <textarea
              id="sql-query"
              spellCheck={false}
              value={query}
              maxLength={10000}
              disabled={busy}
              onChange={(e) =>
                setSaveError(
                  !saveLabAttempt(key, {
                    draft: e.target.value,
                    checks: attempt.checks,
                    updated: Date.now(),
                  }),
                )
              }
              rows={7}
              className="w-full rounded-xl border border-line bg-layer-0 p-4 font-mono text-sm leading-7 outline-none focus:border-brand"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button"
                disabled={busy}
                onClick={run}
                className="inline-flex items-center gap-2 rounded-lg bg-fg-1 px-4 py-2 text-sm font-medium text-layer-1 disabled:opacity-50"
              >
                <Play size={15} />
                {busy ? "Running…" : "Run query"}
              </button>
              {busy && (
                <button type="button"
                  onClick={() => {
                    cleanup();
                    setBusy(false);
                    setStatus("Query cancelled.");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm"
                >
                  <Square size={14} />
                  Cancel
                </button>
              )}
              <button type="button"
                disabled={busy}
                onClick={() => {
                  setRevealed(!revealed);
                }}
                className="rounded-lg border border-line px-3 py-2 text-sm"
              >
                {revealed ? "Hide solution" : "Reveal solution"}
              </button>
            </div>
            {saveError && (
              <p role="alert" className="mt-2 text-xs text-fg-2">
                Storage unavailable: this draft is held in this tab. Export a
                backup before leaving.
              </p>
            )}
          </div>
          {revealed && (
            <div className="rounded-xl bg-layer-2 p-4">
              <p className="mb-2 text-xs font-medium text-fg-2">
                Study the approach, then write your own query.
              </p>
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7">
                {item.solution}
              </pre>
            </div>
          )}
          <output
            className={`block text-sm leading-6 ${passed ? "text-brand" : "text-fg-2"}`}
          >
            {status}
          </output>
          {result && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">
                Your result · {result.rows.length} rows
              </h3>
              <ResultTable result={result} />
            </div>
          )}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Expected result</h3>
            <ResultTable result={item.expected} />
            <p className="mt-2 text-xs text-fg-3">
              Column names and order must match. Row order is ignored; duplicate
              rows still count.
            </p>
          </div>
        </section>
      </div>
      <section className={panel}>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Database size={18} className="text-brand" />
          Schema & seed data
        </h2>
        <p className="my-3 text-sm text-fg-2">
          customers.customer_id → orders.customer_id; orders.order_id →
          returns.order_id. A return can be partial; pending refunds have NULL
          days_to_refund. SQL uses SQLite syntax.
        </p>
        <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-3">
          {sqlTables.map((t) => (
            <details open key={t.name} className="min-w-0">
              <summary className="mb-3 cursor-pointer font-mono text-sm font-semibold">
                {t.name} ({t.rows.length} rows)
              </summary>
              <p className="mb-2 text-xs leading-6 text-fg-3">
                {t.columns.map((c) => `${c[0]} ${c[1]}`).join(" · ")}
              </p>
              <ResultTable
                result={{ columns: t.columns.map((c) => c[0]), rows: t.rows }}
              />
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
