"use client";

import { Plus, X } from "lucide-react";
import type { AnyTestCase, RunOutcome } from "@/lib/judge/types";
import { formatValue, type EditableCase } from "./cases";

export interface ResultView {
  mode: "run" | "submit";
  outcome: RunOutcome;
  tests: AnyTestCase[];
  /** Field labels and text for each test's input. */
  inputs: { name: string; value: string }[][];
  note?: string;
}

/* ---------------------------------------------------------------- testcase editor */

export function TestcaseEditor({
  names,
  cases,
  active,
  onActive,
  onChange,
  onAdd,
  onRemove,
}: {
  names: string[];
  cases: EditableCase[];
  active: number;
  onActive: (i: number) => void;
  onChange: (i: number, field: number, value: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}) {
  const current = cases[active];
  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2" role="tablist" aria-label="Test cases">
        {cases.map((_, i) => (
          <div key={i} className="group relative">
            <button
              role="tab"
              aria-selected={i === active}
              onClick={() => onActive(i)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                i === active ? "bg-layer-2 font-medium text-fg-1" : "text-fg-2 hover:bg-layer-2/60"
              }`}
            >
              Case {i + 1}
            </button>
            {cases.length > 1 && (
              <button
                onClick={() => onRemove(i)}
                aria-label={`Remove case ${i + 1}`}
                className="absolute -top-1.5 -right-1.5 hidden size-4 place-items-center rounded-full bg-layer-3 text-fg-2 group-hover:grid focus-visible:grid"
              >
                <X size={10} />
              </button>
            )}
          </div>
        ))}
        {cases.length < 8 && (
          <button
            onClick={onAdd}
            aria-label="Add test case"
            title="Add a test case (copies the current one)"
            className="grid size-8 place-items-center rounded-lg text-fg-3 hover:bg-layer-2 hover:text-fg-1"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      {current && (
        <div className="space-y-3">
          {names.map((name, f) => (
            <label key={name} className="block">
              <span className="mb-1.5 block text-xs font-medium text-fg-3">{name} =</span>
              <textarea
                value={current.fields[f] ?? ""}
                onChange={(e) => onChange(active, f, e.target.value)}
                spellCheck={false}
                rows={Math.min(6, Math.max(1, Math.ceil((current.fields[f]?.length ?? 0) / 70)))}
                className="w-full resize-y rounded-lg border border-transparent bg-layer-2 px-3 py-2 font-mono text-[13px] text-fg-1 outline-none focus:border-line-strong"
              />
            </label>
          ))}
          <p className="text-xs text-fg-3">
            Values are JSON. Edited cases are checked against the reference solution.
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- results */

const VERDICT_COLOR: Record<string, string> = {
  Accepted: "text-ok",
  "Wrong Answer": "text-bad",
  "Runtime Error": "text-bad",
  "Compile Error": "text-bad",
  "Time Limit Exceeded": "text-bad",
  "Internal Error": "text-medium",
};

function Field({ label, value, tone }: { label: string; value: string; tone?: "bad" }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-fg-3">{label}</div>
      <pre
        className={`max-h-60 overflow-auto rounded-lg bg-layer-2 px-3 py-2 font-mono text-[13px] break-all whitespace-pre-wrap ${
          tone === "bad" ? "text-bad" : "text-fg-1"
        }`}
      >
        {value || " "}
      </pre>
    </div>
  );
}

export function ResultPanel({
  view,
  active,
  onActive,
  running,
}: {
  view: ResultView | null;
  active: number;
  onActive: (i: number) => void;
  running: string | null;
}) {
  if (running) {
    return (
      <div className="flex h-full min-h-32 items-center justify-center gap-3 text-sm text-fg-2" role="status">
        <span className="size-4 animate-spin rounded-full border-2 border-fg-3 border-t-transparent" aria-hidden />
        {running}
      </div>
    );
  }
  if (!view) {
    return (
      <div className="flex h-full min-h-32 items-center justify-center p-6 text-center text-sm text-fg-3">
        You must run your code first.
      </div>
    );
  }
  const { outcome, mode } = view;
  const color = VERDICT_COLOR[outcome.verdict] ?? "text-fg-1";

  if (outcome.verdict === "Compile Error" || (outcome.verdict === "Internal Error" && !outcome.cases.length)) {
    return (
      <div className="p-4" role="status">
        <h3 className={`mb-3 text-lg font-semibold ${color}`}>{outcome.verdict}</h3>
        <pre className="overflow-x-auto rounded-lg bg-bad-soft px-3 py-2.5 font-mono text-[13px] whitespace-pre-wrap text-bad">
          {outcome.compileError ?? outcome.message}
        </pre>
      </div>
    );
  }

  // Submissions reveal only the first failing case, like LeetCode.
  const shown = mode === "submit" ? outcome.cases.filter((c) => !c.passed).slice(0, 1) : outcome.cases;
  const current = shown.find((c) => c.index === active) ?? shown[0];
  const failed = current && !current.passed;

  return (
    <div className="p-4" role="status">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className={`text-lg font-semibold ${color}`}>{outcome.verdict}</h3>
        {mode === "submit" && (
          <span className="text-sm text-fg-3">
            {outcome.passed} / {outcome.total} testcases passed
          </span>
        )}
        {outcome.verdict === "Accepted" && outcome.runtimeMs !== undefined && (
          <span className="text-sm text-fg-3">Runtime: {outcome.runtimeMs.toFixed(1)} ms</span>
        )}
      </div>
      {outcome.message && <p className="mb-3 text-sm text-fg-2">{outcome.message}</p>}
      {view.note && outcome.verdict === "Wrong Answer" && <p className="mb-3 text-xs text-fg-3">{view.note}</p>}

      {mode === "run" && shown.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Case results">
          {shown.map((c) => (
            <button
              key={c.index}
              role="tab"
              aria-selected={c.index === current?.index}
              onClick={() => onActive(c.index)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                c.index === current?.index ? "bg-layer-2 font-medium text-fg-1" : "text-fg-2 hover:bg-layer-2/60"
              }`}
            >
              <span className={`size-1.5 rounded-full ${c.passed ? "bg-ok" : "bg-bad"}`} aria-hidden />
              Case {c.index + 1}
              <span className="sr-only">{c.passed ? "passed" : "failed"}</span>
            </button>
          ))}
        </div>
      )}

      {mode === "submit" && outcome.verdict === "Accepted" && (
        <p className="rounded-lg bg-ok-soft px-3 py-2.5 text-sm text-ok">
          All {outcome.total} test cases passed, including the hidden edge cases.
        </p>
      )}

      {current && (
        <div className="space-y-3">
          {mode === "submit" && <p className="text-xs font-medium text-fg-3">Failing test case</p>}
          <div className="space-y-2">
            {view.inputs[current.index]?.map((f) => (
              <Field key={f.name} label={`${f.name} =`} value={f.value} />
            ))}
          </div>
          {current.error ? (
            <Field label="Error" value={current.error} tone="bad" />
          ) : current.notRun ? (
            <Field label="Output" value="(not run)" />
          ) : (
            <Field label="Output" value={formatValue(current.output)} tone={failed ? "bad" : undefined} />
          )}
          {current.stdout ? <Field label="Stdout" value={current.stdout} /> : null}
          <Field label="Expected" value={formatValue(view.tests[current.index]?.expected)} />
        </div>
      )}
      {outcome.stdout && (
        <div className="mt-3">
          <Field label="Other output" value={outcome.stdout} />
        </div>
      )}
    </div>
  );
}
