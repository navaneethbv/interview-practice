"use client";

import { Lightbulb, Gauge } from "lucide-react";
import { useState } from "react";
import { normalizeComplexity } from "@/lib/practice-data";
import { recordLearningAssistance } from "@/lib/learning-store";

export interface CoachInfo {
  topics?: string[];
  pattern?: string;
  hint?: string;
  time?: string;
  space?: string;
}

const COMMON = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(n^3)", "O(2^n)", "O(n!)", "O(m * n)", "O(V + E)", "O(k)", "O(h)"];

/**
 * Hints that reveal one step at a time (topic, pattern, approach) and a complexity check that
 * asks for your own answer before showing the reference.
 */
export function ProblemCoach({ info, progressId }: Readonly<{ info: CoachInfo; progressId?: string }>) {
  const hints = [
    info.topics?.length ? `Topics: ${info.topics.join(", ")}.` : undefined,
    info.pattern ? `Pattern to consider: ${info.pattern}.` : undefined,
    info.hint && info.hint !== info.pattern ? info.hint.replace(/^[^:]+:\s*/, "Approach: ") : undefined,
  ].filter((h): h is string => Boolean(h));
  const [shown, setShown] = useState(0);
  const hasComplexity = Boolean(info.time || info.space);
  if (!hints.length && !hasComplexity) return null;

  return (
    <div className="mt-6 space-y-3">
      {hints.length > 0 && (
        <section className="rounded-lg border border-line px-4 py-3 text-sm" aria-label="Hints">
          <div className="flex items-center gap-2">
            <Lightbulb size={15} className="text-medium" aria-hidden />
            <h2 className="font-medium text-fg-1">Hints</h2>
            <span className="text-xs text-fg-3">
              {shown} of {hints.length} shown
            </span>
            {shown < hints.length && (
              <button
                type="button"
                onClick={() => { if (progressId) recordLearningAssistance(progressId, "hint"); setShown(shown + 1); }}
                className="ml-auto rounded-md bg-layer-2 px-2.5 py-1 text-xs font-medium text-fg-1 hover:bg-layer-3"
              >
                {shown === 0 ? "Show a hint" : "Next hint"}
              </button>
            )}
          </div>
          {shown > 0 && (
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-fg-2">
              {hints.slice(0, shown).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          )}
        </section>
      )}
      {hasComplexity && <ComplexityCheck time={info.time} space={info.space} />}
    </div>
  );
}

function ComplexityCheck({ time, space }: Readonly<{ time?: string; space?: string }>) {
  const [answer, setAnswer] = useState({ time: "", space: "" });
  const [checked, setChecked] = useState(false);
  const rows = [
    { key: "time" as const, label: "Time", expected: time },
    { key: "space" as const, label: "Space", expected: space },
  ].filter((r) => r.expected);

  return (
    <section className="rounded-lg border border-line px-4 py-3 text-sm" aria-label="Complexity check">
      <div className="flex items-center gap-2">
        <Gauge size={15} className="text-blue" aria-hidden />
        <h2 className="font-medium text-fg-1">Complexity check</h2>
      </div>
      <p className="mt-1 text-xs text-fg-3">State the complexity of your approach before you look, as you would in an interview.</p>
      <form
        className="mt-2 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setChecked(true);
        }}
      >
        <datalist id="complexity-options">
          {COMMON.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {rows.map((r) => (
          <label key={r.key} className="flex flex-col gap-1 text-xs text-fg-2">
            {r.label}
            <input
              list="complexity-options"
              value={answer[r.key]}
              onChange={(e) => {
                setAnswer({ ...answer, [r.key]: e.target.value });
                setChecked(false);
              }}
              placeholder="O(...)"
              className="h-8 w-36 rounded-md border border-line bg-layer-2 px-2 font-mono text-sm text-fg-1 outline-none focus:border-line-strong"
            />
          </label>
        ))}
        <button type="submit" className="h-8 rounded-md bg-layer-2 px-3 text-xs font-medium text-fg-1 hover:bg-layer-3">
          Check
        </button>
      </form>
      {checked && (
        <ul className="mt-2 space-y-1" aria-live="polite">
          {rows.map((r) => {
            const mine = answer[r.key].trim();
            const match = mine && normalizeComplexity(mine) === normalizeComplexity(r.expected!);
            return (
              <li key={r.key} className="text-fg-2">
                {r.label}: reference <code>{r.expected}</code>
                {mine ? (
                  <span className={match ? "text-ok" : "text-medium"}>
                    {match ? " (matches yours)" : ` (yours: ${mine}; check whether they agree)`}
                  </span>
                ) : (
                  <span className="text-fg-3"> (you left this blank)</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
