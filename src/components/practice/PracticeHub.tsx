"use client";

import Link from "next/link";
import { CalendarClock, CheckCircle2, Circle, History, RotateCcw, Timer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DifficultyText } from "@/components/ui";
import type { Difficulty } from "@/lib/content-types";
import { finishMock, rateLastMock, reviewHard, reviewRemove, startMock, useMock, useReview } from "@/lib/practice";
import type { CatalogEntry, CatalogSource } from "@/lib/practice-catalog";
import {
  DAY_MS,
  dueReviews,
  pickProblems,
  REVIEW_INTERVALS_DAYS,
  RUBRIC,
  sessionDeadline,
  solvedDuring,
  upcomingReviews,
  type MockSession,
} from "@/lib/practice-data";
import { statusOf, useProgress } from "@/lib/progress";

interface Props {
  entries: Record<string, CatalogEntry>;
  sources: CatalogSource[];
}

type DifficultyChoice = "any" | "mixed" | Difficulty;
const DURATIONS = [30, 45, 60, 90];
const RATING_LABEL = ["", "Needs work", "Getting there", "Solid", "Strong"];

/** Ticks once a second so countdowns and due dates stay current. */
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function clock(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function relativeDays(due: number, now: number) {
  const days = Math.round((due - now) / DAY_MS);
  if (days <= 0) return "today";
  return days === 1 ? "tomorrow" : `in ${days} days`;
}

export function PracticeHub({ entries, sources }: Readonly<Props>) {
  return (
    <div className="space-y-10">
      <MockInterview entries={entries} sources={sources} />
      <ReviewQueue entries={entries} />
    </div>
  );
}

/* ---------------------------------------------------------------- mock interview */

function MockInterview({ entries, sources }: Readonly<Props>) {
  const mock = useMock();
  const progress = useProgress();
  const now = useNow();
  const [source, setSource] = useState(sources[0]?.id ?? "");
  const [difficulty, setDifficulty] = useState<DifficultyChoice>("mixed");
  const [count, setCount] = useState(2);
  const [minutes, setMinutes] = useState(45);
  const [error, setError] = useState("");

  function start() {
    const ids = sources.find((s) => s.id === source)?.ids ?? [];
    const solved = (id: string) => statusOf(progress, id) === "solved";
    let problems: string[];
    if (difficulty === "mixed") {
      const medium = pickProblems(ids.filter((id) => entries[id]?.difficulty === "medium").map((id) => ({ id, difficulty: "medium" as const })), solved, Math.max(1, count - 1), Math.random);
      const rest = pickProblems(ids.filter((id) => entries[id]?.difficulty !== "medium").map((id) => ({ id, difficulty: entries[id].difficulty })), solved, count - medium.length, Math.random);
      problems = [...medium, ...rest];
    } else {
      const pool = ids.filter((id) => difficulty === "any" || entries[id]?.difficulty === difficulty);
      problems = pickProblems(pool.map((id) => ({ id, difficulty: entries[id].difficulty })), solved, count, Math.random);
    }
    if (problems.length < count) {
      setError("This list does not have enough problems for that choice. Pick another list or difficulty.");
      return;
    }
    setError("");
    startMock({ minutes, source, problems });
  }

  const active = mock.active;
  const last = mock.history[0];

  return (
    <section id="mock" aria-labelledby="mock-heading" className="scroll-mt-20">
      <h2 id="mock-heading" className="mb-1 flex items-center gap-2 text-lg font-semibold">
        <Timer size={18} className="text-brand" aria-hidden /> Mock interview
      </h2>
      <p className="mb-4 text-sm text-fg-2">
        A timed round with problems you have not solved yet. Walkthroughs stay hidden until it ends. Talk through your approach out
        loud, state the complexity, and test your code before you submit, as you would with an interviewer.
      </p>

      {active ? (
        <ActiveMock session={active} entries={entries} now={now} log={progress.log} />
      ) : (
        <div className="rounded-lg border border-line bg-layer-1 p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Problem list">
              <select value={source} onChange={(e) => setSource(e.target.value)} className={SELECT}>
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.ids.length})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Difficulty">
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as DifficultyChoice)} className={SELECT}>
                <option value="mixed">Interview mix (mostly medium)</option>
                <option value="any">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Field>
            <Field label="Problems">
              <select value={count} onChange={(e) => setCount(Number(e.target.value))} className={SELECT}>
                {[1, 2, 3].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Time">
              <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className={SELECT}>
                {DURATIONS.map((m) => (
                  <option key={m} value={m}>
                    {m} minutes
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {error && <p className="mt-3 text-sm text-bad">{error}</p>}
          <button onClick={start} className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Start interview
          </button>
        </div>
      )}

      {!active && last && !last.ratings && <Debrief session={last} entries={entries} />}
      {mock.history.length > 0 && <MockHistory history={mock.history} sources={sources} />}
    </section>
  );
}

const SELECT = "h-9 w-full rounded-md border border-line bg-layer-2 px-2 text-sm text-fg-1 outline-none focus:border-line-strong";

function Field({ label, children }: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-fg-2">
      {label}
      {children}
    </label>
  );
}

function ActiveMock({ session, entries, now, log }: Readonly<{ session: MockSession; entries: Record<string, CatalogEntry>; now: number; log: Record<string, [number, 0 | 1][]> }>) {
  const left = sessionDeadline(session) - now;
  const solved = new Set(solvedDuring(session, log));
  return (
    <div className="rounded-lg border border-line bg-layer-1 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-2xl font-semibold tabular-nums ${left <= 0 ? "text-bad" : left < 5 * 60_000 ? "text-medium" : "text-fg-1"}`}>
          {left > 0 ? clock(left) : "Time's up"}
        </span>
        <span className="text-sm text-fg-3">
          {solved.size} of {session.problems.length} solved
        </span>
        <button
          onClick={() => finishMock(log)}
          className="ml-auto rounded-lg bg-layer-2 px-3 py-1.5 text-sm font-medium text-fg-1 hover:bg-layer-3"
        >
          End interview
        </button>
      </div>
      <ol className="mt-3 space-y-2">
        {session.problems.map((id, i) => {
          const entry = entries[id];
          return (
            <li key={id} className="flex items-center gap-2 text-sm">
              {solved.has(id) ? <CheckCircle2 size={16} className="text-ok" aria-label="Solved" /> : <Circle size={16} className="text-fg-3" aria-label="Not solved yet" />}
              <span className="text-fg-3">{i + 1}.</span>
              {entry ? (
                <Link href={entry.href} className="font-medium text-blue hover:underline">
                  {entry.title}
                </Link>
              ) : (
                <span>{id}</span>
              )}
              {entry && <DifficultyText difficulty={entry.difficulty} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Debrief({ session, entries }: Readonly<{ session: MockSession; entries: Record<string, CatalogEntry> }>) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const used = (session.endedAt ?? session.startedAt) - session.startedAt;
  return (
    <form
      className="mt-4 rounded-lg border border-line bg-layer-1 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        rateLastMock(ratings, notes);
      }}
    >
      <h3 className="font-medium">Debrief</h3>
      <p className="mt-1 text-sm text-fg-2">
        Solved {session.solved?.length ?? 0} of {session.problems.length} in {clock(used)} (of {session.minutes} minutes). The walkthroughs
        are available again:{" "}
        {session.problems.map((id, i) => (
          <span key={id}>
            {i > 0 && ", "}
            <Link href={entries[id]?.href ?? "#"} className="text-blue hover:underline">
              {entries[id]?.title ?? id}
            </Link>
          </span>
        ))}
        .
      </p>
      <p className="mt-3 text-sm text-fg-2">Rate yourself the way an interviewer would score each signal.</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {RUBRIC.map((signal) => (
          <fieldset key={signal} className="rounded-md border border-line px-3 py-2">
            <legend className="px-1 text-xs font-medium text-fg-2">{signal}</legend>
            <div className="flex flex-wrap gap-1">
              {[1, 2, 3, 4].map((r) => (
                <label key={r} className={`cursor-pointer rounded-md px-2 py-1 text-xs ${ratings[signal] === r ? "bg-brand text-white" : "bg-layer-2 text-fg-2 hover:bg-layer-3"}`}>
                  <input type="radio" name={signal} value={r} className="sr-only" checked={ratings[signal] === r} onChange={() => setRatings({ ...ratings, [signal]: r })} />
                  {RATING_LABEL[r]}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <label className="mt-3 block text-xs font-medium text-fg-2">
        What would you do differently next time?
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          maxLength={5000}
          className="mt-1 w-full rounded-md border border-line bg-layer-2 p-2 text-sm text-fg-1 outline-none focus:border-line-strong"
        />
      </label>
      <button type="submit" className="mt-3 rounded-lg bg-layer-2 px-3 py-1.5 text-sm font-medium text-fg-1 hover:bg-layer-3">
        Save debrief
      </button>
    </form>
  );
}

function MockHistory({ history, sources }: Readonly<{ history: MockSession[]; sources: CatalogSource[] }>) {
  return (
    <details className="mt-4 rounded-lg border border-line px-4 py-2.5">
      <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <History size={15} aria-hidden /> Past interviews ({history.length})
      </summary>
      <table className="mt-2 w-full text-sm">
        <thead className="text-left text-xs text-fg-3">
          <tr>
            <th className="pb-1 font-medium">Date</th>
            <th className="pb-1 font-medium">List</th>
            <th className="pb-1 font-medium">Solved</th>
            <th className="pb-1 font-medium">Self-rating</th>
          </tr>
        </thead>
        <tbody>
          {history.map((s) => {
            const scores = Object.values(s.ratings ?? {});
            const average = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "—";
            return (
              <tr key={s.startedAt} className="border-t border-line">
                <td className="py-1.5 text-fg-2">{new Date(s.startedAt).toLocaleDateString()}</td>
                <td className="py-1.5 text-fg-2">{sources.find((x) => x.id === s.source)?.title ?? s.source}</td>
                <td className="py-1.5 tabular-nums text-fg-2">
                  {s.solved?.length ?? 0}/{s.problems.length}
                </td>
                <td className="py-1.5 tabular-nums text-fg-2">{average}{scores.length ? " / 4" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </details>
  );
}

/* ---------------------------------------------------------------- review queue */

function ReviewQueue({ entries }: Readonly<{ entries: Record<string, CatalogEntry> }>) {
  const review = useReview();
  const now = useNow();
  const due = dueReviews(review, now).filter(([id]) => entries[id]);
  const upcoming = upcomingReviews(review, now).filter(([id]) => entries[id]);

  return (
    <section id="review" aria-labelledby="review-heading" className="scroll-mt-20">
      <h2 id="review-heading" className="mb-1 flex items-center gap-2 text-lg font-semibold">
        <CalendarClock size={18} className="text-blue" aria-hidden /> Review queue
      </h2>
      <p className="mb-4 text-sm text-fg-2">
        Every accepted problem comes back for a re-solve after {REVIEW_INTERVALS_DAYS.slice(0, -1).join(", ")} and then every{" "}
        {REVIEW_INTERVALS_DAYS.at(-1)} days. Solving it again from scratch while it is due moves it to the next interval; if it was a
        struggle, restart its schedule.
      </p>
      {due.length === 0 ? (
        <p className="rounded-lg border border-line bg-layer-1 px-4 py-6 text-center text-sm text-fg-3">
          {upcoming.length ? "Nothing is due right now." : "Solve a problem to start your review queue."}
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-layer-1">
          {due.map(([id, item]) => (
            <li key={id} className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm">
              <Link href={entries[id].href} className="font-medium text-blue hover:underline">
                {entries[id].title}
              </Link>
              <DifficultyText difficulty={entries[id].difficulty} />
              <span className="text-xs text-fg-3">review {item.step + 1} of {REVIEW_INTERVALS_DAYS.length}</span>
              <span className="ml-auto flex gap-1">
                <button onClick={() => reviewHard(id)} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-layer-2" title="Start this problem's schedule over">
                  <RotateCcw size={13} aria-hidden /> Struggled
                </button>
                <button onClick={() => reviewRemove(id)} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-fg-2 hover:bg-layer-2" title="Stop reviewing this problem">
                  <Trash2 size={13} aria-hidden /> Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {upcoming.length > 0 && (
        <details className="mt-3 rounded-lg border border-line px-4 py-2.5 text-sm">
          <summary className="cursor-pointer font-medium">Coming up ({upcoming.length})</summary>
          <ul className="mt-2 space-y-1">
            {upcoming.slice(0, 50).map(([id, item]) => (
              <li key={id} className="flex items-center gap-2 text-fg-2">
                <Link href={entries[id].href} className="hover:underline">
                  {entries[id].title}
                </Link>
                <span className="text-xs text-fg-3">{relativeDays(item.due, now)}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
