"use client";
import Link from "next/link";
import { useState } from "react";
import { useBa, useHydrated } from "@/lib/ba-store";
import { useReview } from "@/lib/practice";
import { useProgress } from "@/lib/progress";
import { learningPlan, mistakes, useLocalDay } from "@/lib/learning-store";
import {
  BUDGETS,
  dailyTasks,
  demonstratedTasks,
  exposureTasks,
  learningReviewTasks,
  taskCompletionDates,
  type Goal,
  type LearningTask,
  type PlanState,
} from "@/lib/learning-data";
import { BookmarkButton } from "./BookmarkButton";
const input =
  "mt-1 w-full rounded-lg border border-line bg-layer-1 px-3 py-2 text-sm";
export function DailyDashboard({ tasks }: { tasks: LearningTask[] }) {
  const plan = learningPlan.use();
  const p = useProgress();
  const review = useReview();
  const allTasks = [...tasks, ...learningReviewTasks(tasks, review)];
  const ba = useBa();
  const notebook = mistakes.use();
  const hydrated = useHydrated();
  const [message, setMessage] = useState("");
  const today = useLocalDay();
  const demonstrated = demonstratedTasks(allTasks, p, ba);
  const evidenceDates = taskCompletionDates(allTasks, p, ba);
  const daily = dailyTasks(
    allTasks,
    plan,
    today,
    demonstrated,
    evidenceDates,
    exposureTasks(allTasks, p, ba),
  );
  const due = notebook.filter((m) => !m.resolved && m.dueDate <= today);
  function change(patch: Partial<PlanState>) {
    const next = { ...plan, ...patch };
    if (next.startDate && next.targetDate && next.targetDate < next.startDate) {
      setMessage("Target date must be on or after the start date.");
      return;
    }
    learningPlan.write(next);
    setMessage("");
  }
  return (
    <>
      <section className="rounded-2xl border border-line bg-layer-1 p-5">
        <h2 className="text-xl font-semibold">Make a plan that fits today</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            Goal
            <select
              className={input}
              value={plan.goal}
              onChange={(e) => change({ goal: e.target.value as Goal })}
            >
              <option value="coding">Coding</option>
              <option value="ba">Business analyst</option>
              <option value="mixed">Mixed</option>
            </select>
          </label>
          <label className="text-sm">
            Daily budget
            <select
              className={input}
              value={plan.minutes}
              onChange={(e) =>
                change({
                  minutes: Number(e.target.value) as PlanState["minutes"],
                })
              }
            >
              {BUDGETS.map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Start date
            <input
              type="date"
              className={input}
              value={plan.startDate}
              onChange={(e) => change({ startDate: e.target.value })}
            />
          </label>
          <label className="text-sm">
            Target interview date
            <input
              type="date"
              className={input}
              value={plan.targetDate}
              min={plan.startDate}
              onChange={(e) => change({ targetDate: e.target.value })}
            />
          </label>
        </div>
        <p className="mt-4 text-sm text-fg-2">
          Dates follow your local calendar. Mixed plans alternate which track
          comes first each day. Missed work stays in the remaining pool; the
          next day always keeps your chosen time budget. Estimates are planning
          timeboxes, not deadlines.
        </p>
        <p role="status" className="mt-2 text-sm text-red">
          {message}
        </p>
      </section>
      <section className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold">
            Today{today ? ` · ${today}` : ""}
          </h2>
          <span className="text-sm text-fg-2">
            {daily.reduce((n, t) => n + t.minutes, 0)} / {plan.minutes} minutes
            planned
          </span>
        </div>
        {daily.reduce((sum, task) => sum + task.minutes, 0) > plan.minutes && (
          <p className="text-sm text-fg-2">
            Today&apos;s recorded work exceeds this budget. No additional tasks
            are assigned.
          </p>
        )}
        <p className="text-sm text-fg-2">
          Due reviews take priority within your daily budget. Plan checkmarks
          record your work session; read checks record exposure, not
          demonstrated skill. Accepted submissions and passed quizzes mark the
          matching task verified today and keep its time in today&apos;s
          allocation. These results provide separate evidence on Readiness.
        </p>
        {!hydrated ? (
          <p>Loading your saved plan…</p>
        ) : daily.length === 0 ? (
          <p className="rounded-xl border border-line p-5">
            {plan.startDate && today < plan.startDate
              ? "Your plan begins on your start date."
              : plan.targetDate && today > plan.targetDate
                ? "Your target date has passed. Update it to continue your daily plan."
                : "No remaining tasks fit this budget. Adjust the estimate or increase your budget to continue."}
          </p>
        ) : (
          daily.map((t) => (
            <article
              key={t.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-layer-1 p-4"
            >
              <label className="flex w-full min-w-0 items-center gap-3 sm:w-auto sm:flex-1">
                <input
                  type="checkbox"
                  aria-label={`Complete ${t.title}`}
                  checked={
                    plan.completed[t.id] === today ||
                    evidenceDates[t.id] === today
                  }
                  disabled={evidenceDates[t.id] === today}
                  onChange={(e) => {
                    const completed = { ...plan.completed };
                    if (e.target.checked) completed[t.id] = today;
                    else delete completed[t.id];
                    change({ completed });
                  }}
                />
                <span>
                  <Link href={t.href} className="font-medium hover:text-brand">
                    {t.title}
                  </Link>
                  <span className="mt-1 block text-xs text-fg-3">
                    {evidenceDates[t.id] === today
                      ? t.kind === "read"
                        ? "Read today · "
                        : "Verified today · "
                      : ""}
                    {t.track === "ba" ? "Business analyst" : "Coding"} ·{" "}
                    {t.kind === "read"
                      ? "Lesson + reflection"
                      : t.kind === "review"
                        ? "Due revision · re-solve"
                        : t.kind === "solve"
                          ? "Problem practice"
                          : "Chapter quiz (after reading lessons)"}
                  </span>
                </span>
              </label>
              <label className="text-xs text-fg-2">
                Minutes
                <input
                  aria-label={`Estimated minutes for ${t.title}`}
                  type="number"
                  min={5}
                  max={120}
                  step={5}
                  className="ml-2 w-16 rounded border border-line bg-layer-1 px-2 py-1"
                  value={t.minutes}
                  onChange={(e) => {
                    const m = Number(e.target.value);
                    if (Number.isInteger(m) && m >= 5 && m <= 120)
                      change({ estimates: { ...plan.estimates, [t.id]: m } });
                  }}
                />
              </label>
              <BookmarkButton href={t.href} title={t.title} section={t.track} />
            </article>
          ))
        )}
      </section>
      {due.length > 0 && (
        <section className="rounded-xl border border-line bg-layer-1 p-5">
          <h2 className="font-semibold">
            {due.length} mistake review{due.length === 1 ? "" : "s"} due
          </h2>
          <p className="mt-1 text-sm text-fg-2">
            Review these within your chosen budget; they do not automatically
            add extra study time.
          </p>
          <Link
            className="mt-3 inline-block text-sm text-brand"
            href="/practice/notebook"
          >
            Open mistake notebook →
          </Link>
        </section>
      )}
      <details className="rounded-xl border border-line p-4">
        <summary className="cursor-pointer text-sm font-medium">
          Self-recorded sessions ({Object.keys(plan.completed).length})
        </summary>
        <ul className="mt-3 space-y-2 text-sm">
          {Object.entries(plan.completed).map(([id, date]) => (
            <li key={id} className="flex justify-between gap-3">
              <span>
                {allTasks.find((t) => t.id === id)?.title ?? id} · {date}
              </span>
              <button
                className="text-brand"
                onClick={() => {
                  const completed = { ...plan.completed };
                  delete completed[id];
                  change({ completed });
                }}
              >
                Undo
              </button>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
