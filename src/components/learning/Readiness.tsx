"use client";
import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { useBa } from "@/lib/ba-store";
import { useMock, useReview } from "@/lib/practice";
import { useInterviews } from "@/lib/interview-store";
import {
  interviewReadiness,
  interviewScenario,
  INTERVIEW_TRACKS,
} from "@/lib/interview-data";
import { useLabState } from "@/lib/lab-storage";
import { labs } from "@/lib/lab-data";
import { sqlExercises } from "@/lib/lab-sql";
import {
  mistakes,
  startIndependentAttempt,
  useLearningEvidence,
} from "@/lib/learning-store";
import {
  learningEvidenceSummary,
  readinessEvidence,
} from "@/lib/learning-data";
import type { CatalogEntry } from "@/lib/practice-catalog";

const panel = "rounded-xl border border-line bg-layer-1 p-5";
export function Readiness({
  codingIds,
  codingEntries = {},
}: Readonly<{
  codingIds: string[];
  codingEntries?: Record<string, CatalogEntry>;
}>) {
  const progress = useProgress();
  const ba = useBa();
  const mock = useMock();
  const review = useReview();
  const notes = mistakes.use();
  const interviews = useInterviews();
  const labState = useLabState();
  const evidence = useLearningEvidence();
  const [selected, setSelected] = useState(codingIds[0] ?? "");
  const [message, setMessage] = useState("");
  const summary = readinessEvidence(progress, ba, mock, codingIds);
  const assistance = learningEvidenceSummary(
    evidence,
    codingIds.filter((id) => !!progress.solved[id]),
  );
  const interviewTracks = interviewReadiness(interviews);
  const draftCount = labs.filter((lab) =>
    labState[lab.id]?.draft.trim(),
  ).length;
  const reviewedCount = labs.filter((lab) =>
    lab.rubric.every((_, index) =>
      labState[lab.id]?.checks.includes(String(index)),
    ),
  ).length;
  const sqlPassed = sqlExercises.filter((_, index) =>
    labState[`sql-exercise-${index + 1}`]?.checks.includes("passed"),
  ).length;
  const cards = [
    [
      "Read / self reported",
      summary.read,
      "Lessons marked read across coding and BA. Reading does not demonstrate recall or problem solving.",
    ],
    [
      "Coding problems accepted",
      summary.accepted,
      `${summary.attempted} attempted from ${codingIds.length} runnable catalog problems. Acceptance confirms test results, not independent interview performance.`,
    ],
    [
      "BA quizzes passed",
      summary.quizPassed,
      `${summary.quizAttempts} recorded attempts. Includes chapter and final exams; personal plan checkmarks do not count.`,
    ],
    [
      "Completed coding mocks",
      summary.completedMocks,
      `${summary.mockSolves} accepted problem results during completed sessions; ${summary.ratedMocks} sessions have self ratings.`,
    ],
    [
      "SQL exercise results matched",
      sqlPassed,
      `Of ${sqlExercises.length} exercises, using stored checks from actual query results. Viewing a solution is not tracked for these labs; independent work is not inferred.`,
    ],
    [
      "BA lab drafts / self reviewed",
      draftCount,
      `${reviewedCount} of ${labs.length} labs have all self-review checks marked. Drafts and rubric checks are self-assessment, not an automatic grade.`,
    ],
  ] as const;

  return (
    <>
      <p className={`${panel} text-sm text-fg-2`}>
        This is a record of practice evidence, not a hiring prediction. It
        separates exposure from tested results and self-assessment. Personal
        plan checkmarks and bookmarks do not increase demonstrated readiness.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(([title, count, description]) => (
          <section key={title} className={panel}>
            <h2 className="font-medium">{title}</h2>
            <p className="my-3 text-4xl font-semibold tabular-nums">{count}</p>
            <p className="text-sm leading-relaxed text-fg-2">{description}</p>
          </section>
        ))}
      </div>
      <section className={panel}>
        <h2 className="text-xl font-semibold">
          Coding assistance & independent attempts
        </h2>
        <p className="mt-2 text-sm text-fg-2">
          Independence is your declaration before a fresh attempt. Hint and
          solution views stay attached to the current attempt. A reveal after
          acceptance starts another unclassified attempt and preserves the
          earlier result; only an explicit new independent declaration clears
          prior assistance. Accepted results without a declaration stay
          unclassified. Assistance outside this site cannot be detected.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <EvidenceCount
            label="Accepted after independent declaration"
            value={assistance.independent}
          />
          <EvidenceCount label="Accepted with hints" value={assistance.hints} />
          <EvidenceCount
            label="Accepted after viewing solution"
            value={assistance.solutions}
          />
          <EvidenceCount
            label="Acceptance independence unknown"
            value={assistance.unknown}
          />
        </dl>
        <p className="mt-3 text-xs text-fg-3">
          Counts classify accepted catalog problems from retained attempt
          evidence. An independent declaration with no recorded assistance takes
          priority over assisted attempts for the same problem. These are
          self-assessed conditions, not proof of unaided ability.
        </p>
        <label className="mt-5 block text-sm">
          <span>Problem for a new independent attempt</span>
          <select
            value={selected}
            onChange={(event) => {
              setSelected(event.target.value);
              setMessage("");
            }}
            className="mt-2 w-full rounded-lg border border-line bg-layer-1 px-3 py-2"
          >
            {codingIds.map((id) => (
              <option key={id} value={id}>
                {codingEntries[id]?.title ?? id}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <button
            type="button"
            disabled={!selected}
            className="rounded-lg bg-fg-1 px-4 py-2 text-sm text-layer-1 disabled:opacity-50"
            onClick={() => {
              startIndependentAttempt(selected);
              setMessage(
                "New independent attempt declared. A new accepted submission is needed before it counts.",
              );
            }}
          >
            Declare a new independent attempt
          </button>
          {codingEntries[selected] && (
            <Link
              href={codingEntries[selected].href}
              className="text-sm text-brand"
            >
              Open selected problem →
            </Link>
          )}
        </div>
        <output className="mt-3 text-sm text-fg-2">{message}</output>
      </section>
      <section className={panel}>
        <h2 className="text-xl font-semibold">
          Interview skills · self-assessment
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {interviewTracks.map((track) => (
            <div key={track.track} className="rounded-lg bg-layer-2 p-4">
              <h3 className="font-medium">
                {INTERVIEW_TRACKS[track.track].title}
              </h3>
              <p className="mt-2 text-sm">
                {track.completed} completed · {track.assessed} rated
              </p>
              <p className="mt-1 text-sm text-fg-2">
                {track.score === null
                  ? "No complete rubric assessment yet."
                  : `Average self-rating: ${track.score}%`}
              </p>
              <dl className="mt-3 space-y-2 border-t border-line pt-3 text-xs">
                {INTERVIEW_TRACKS[track.track].stages.map((stage) => {
                  const ratings = interviews.history
                    .filter(
                      (session) =>
                        interviewScenario(session.scenarioId)?.track ===
                        track.track,
                    )
                    .map((session) => session.ratings[stage.id])
                    .filter(
                      (rating): rating is number => typeof rating === "number",
                    );
                  const average = ratings.length
                    ? (
                        ratings.reduce((sum, rating) => sum + rating, 0) /
                        ratings.length
                      ).toFixed(1)
                    : null;
                  const ratingNoun =
                    ratings.length === 1 ? "self-rating" : "self-ratings";
                  const ratingLabel =
                    average === null
                      ? "No rating yet"
                      : `${average} / 4 · ${ratings.length} ${ratingNoun}`;
                  return (
                    <div key={stage.id}>
                      <dt className="text-fg-2">{stage.title}</dt>
                      <dd className="mt-0.5">{ratingLabel}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-2 text-xs text-fg-3">{track.caveat}</p>
            </div>
          ))}
        </div>
        <Link
          href="/practice/interviews"
          className="mt-4 inline-block text-sm text-brand"
        >
          Practice interview rounds →
        </Link>
      </section>
      <section className={panel}>
        <h2 className="text-xl font-semibold">Next evidence to collect</h2>
        <ul className="mt-4 space-y-3 text-sm text-fg-2">
          <li>
            <Link className="text-brand" href="/practice">
              Run a timed mock
            </Link>{" "}
            and explain your decisions aloud; saved ratings are self
            assessments.
          </li>
          <li>
            <Link className="text-brand" href="/practice">
              Re-solve from your review queue
            </Link>{" "}
            · {Object.keys(review).length} problems scheduled.
          </li>
          <li>
            <Link className="text-brand" href="/practice/notebook">
              Review your mistakes
            </Link>{" "}
            · {notes.filter((mistake) => !mistake.resolved).length} unresolved.
          </li>
          <li>
            <Link className="text-brand" href="/business-analyst">
              Check BA understanding with a quiz
            </Link>{" "}
            after reading the lessons.
          </li>
        </ul>
      </section>
    </>
  );
}
function EvidenceCount({
  label,
  value,
}: Readonly<{ label: string; value: number }>) {
  return (
    <div>
      <dt className="text-fg-2">{label}</dt>
      <dd className="mt-2 text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
