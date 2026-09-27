"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Difficulty } from "@/lib/content-types";
import { resetScope, statusOf, summarize, useProgress } from "@/lib/progress";

const LABELS: { key: Difficulty; label: string; color: string; bar: string }[] = [
  { key: "easy", label: "Easy", color: "text-easy", bar: "bg-easy" },
  { key: "medium", label: "Medium", color: "text-medium", bar: "bg-medium" },
  { key: "hard", label: "Hard", color: "text-hard", bar: "bg-hard" },
];

/**
 * Solved count, per-difficulty bars and submission accuracy for one progress scope (a problem
 * set or the course), with an optional control to start the scope over.
 */
export function ProgressPanel({
  ids,
  difficulties,
  scope,
  scopeLabel,
  resettable = false,
}: {
  ids: string[];
  difficulties: Difficulty[];
  scope: string;
  scopeLabel?: string;
  resettable?: boolean;
}) {
  const progress = useProgress();
  const summary = summarize(progress, ids, scope);
  const pct = ids.length ? (summary.solved / ids.length) * 100 : 0;
  const accuracy = summary.submissions ? Math.round((summary.accepted / summary.submissions) * 1000) / 10 : null;

  return (
    <section
      className="grid gap-5 rounded-2xl border border-line bg-layer-1 p-5 sm:grid-cols-[auto_1fr_auto] sm:gap-8"
      aria-label={scopeLabel ? `${scopeLabel} progress` : "Your progress"}
    >
      <div
        className="grid size-24 shrink-0 place-items-center rounded-full"
        style={{ background: `conic-gradient(var(--green) ${pct}%, var(--layer-3) 0)` }}
        role="img"
        aria-label={`${summary.solved} of ${ids.length} problems solved`}
      >
        <div className="grid size-[84px] place-items-center rounded-full bg-layer-1 text-center">
          <div>
            <div className="text-2xl font-semibold tabular-nums">{summary.solved}</div>
            <div className="text-xs text-fg-3">/ {ids.length} solved</div>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-3">
        {LABELS.map(({ key, label, color, bar }) => {
          const group = ids.filter((_, i) => difficulties[i] === key);
          if (!group.length) return null;
          const done = group.filter((id) => statusOf(progress, id, scope) === "solved").length;
          return (
            <div key={key}>
              <div className="mb-1 flex justify-between text-sm">
                <span className={`font-medium ${color}`}>{label}</span>
                <span className="text-fg-3 tabular-nums">
                  {done}/{group.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-layer-3">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${(done / group.length) * 100}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center gap-3 border-t border-line pt-4 sm:min-w-44 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
        <div>
          <div className="text-xs text-fg-3">Accuracy</div>
          <div className="text-xl font-semibold tabular-nums">{accuracy === null ? "–" : `${accuracy}%`}</div>
          <div className="text-xs text-fg-3 tabular-nums">
            {summary.accepted} accepted / {summary.submissions} submissions
          </div>
        </div>
        <div className="text-xs text-fg-3 tabular-nums">{summary.attempted} attempted, not yet solved</div>
        {resettable && <ResetControl scope={scope} ids={ids} resetAt={progress.resets[scope]} label={scopeLabel} />}
      </div>
    </section>
  );
}

function ResetControl({ scope, ids, resetAt, label }: { scope: string; ids: string[]; resetAt?: number; label?: string }) {
  const [confirming, setConfirming] = useState(false);
  const [clearCode, setClearCode] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const wasConfirming = useRef(false);

  // Move focus into the confirmation when it opens and back to the trigger when it closes.
  useEffect(() => {
    if (confirming) confirmRef.current?.focus();
    else if (wasConfirming.current) openRef.current?.focus();
    wasConfirming.current = confirming;
  }, [confirming]);

  if (!confirming) {
    return (
      <div>
        <button
          ref={openRef}
          onClick={() => { setClearCode(false); setConfirming(true); }}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg-1"
        >
          <RotateCcw size={14} /> Reset progress
        </button>
        {resetAt ? <p className="mt-1.5 text-xs text-fg-3">Last reset {new Date(resetAt).toLocaleDateString()}</p> : null}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Confirm reset"
      className="max-w-72 rounded-lg border border-line bg-layer-2 p-3 text-sm"
      onKeyDown={(e) => e.key === "Escape" && setConfirming(false)}
    >
      <p className="mb-2 text-fg-1">
        Start {label ?? "this list"} over? Solved marks and accuracy restart from zero. Other lists keep their progress.
      </p>
      <label className="mb-3 flex items-center gap-2 text-fg-2">
        <input type="checkbox" checked={clearCode} onChange={(e) => setClearCode(e.target.checked)} className="size-4" />
        Also clear my saved code
      </label>
      {clearCode ? <p className="mb-3 text-xs text-fg-2">Saved code is shared across lists. This also clears it wherever these problems appear.</p> : null}
      <div className="flex gap-2">
        <button
          ref={confirmRef}
          onClick={() => {
            resetScope(scope, ids, clearCode);
            setConfirming(false);
          }}
          className="h-8 rounded-lg bg-fg-1 px-3 font-medium text-layer-1 hover:opacity-90"
        >
          Reset
        </button>
        <button onClick={() => setConfirming(false)} className="h-8 rounded-lg px-3 text-fg-2 hover:bg-layer-3">
          Cancel
        </button>
      </div>
    </div>
  );
}
