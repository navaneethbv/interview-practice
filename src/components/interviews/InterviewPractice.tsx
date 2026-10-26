"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import {
  useInterviews,
  changeInterviews,
  checkInterviewDeadline,
} from "@/lib/interview-store";
import {
  INTERVIEW_TRACKS,
  INTERVIEW_SCENARIOS,
  INTERVIEW_DURATIONS,
  RATING_ANCHORS,
  interviewScenario,
  startInterview,
  updateInterview,
  finishInterview,
  assessInterview,
  interviewScore,
  interviewReadiness,
  type InterviewTrack,
  type CompletedInterview,
} from "@/lib/interview-data";

const panel = "rounded-2xl border border-line bg-layer-1 p-5 sm:p-6";
const button =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-bg transition hover:opacity-85 disabled:opacity-50";
const secondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-layer-1 px-4 py-2 text-sm font-medium hover:bg-layer-2";
const field =
  "mt-2 w-full rounded-lg border border-line-strong bg-bg px-3 py-2.5 text-sm text-fg-1";

function Debrief({
  session,
  retake,
}: Readonly<{
  session: CompletedInterview;
  retake: () => void;
}>) {
  const scenario = interviewScenario(session.scenarioId)!;
  const track = INTERVIEW_TRACKS[scenario.track];
  const score = interviewScore(session);
  return (
    <section className={panel} aria-labelledby="debrief-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ok">
            Completed ·{" "}
            {session.reason === "expired" ? "Time elapsed" : "Submitted"}
          </p>
          <h2 id="debrief-heading" className="mt-2 text-xl font-semibold">
            {scenario.title}: debrief
          </h2>
          <p className="mt-1 text-sm text-fg-2">
            {new Date(session.finishedAt).toLocaleString()} · {session.duration}{" "}
            minute round
          </p>
        </div>
        <button type="button" className={secondary} onClick={retake}>
          <RotateCcw size={16} aria-hidden />
          Retake scenario
        </button>
      </div>
      <div className="mt-6 rounded-xl bg-blue-soft p-4">
        <p className="font-medium">
          {score === null
            ? "Complete all four ratings to record your assessment."
            : `${score}% self-assessed rubric score`}
        </p>
        <p className="mt-1 text-sm text-fg-2">
          Self-rated practice evidence, not an objective hiring prediction. Each
          dimension has equal weight; the score is the mean rating divided by 4.
        </p>
      </div>
      <h3 className="mt-6 font-semibold">Compare your approach</h3>
      <p className="mt-1 text-sm text-fg-2">
        These are discussion points, not a single required answer.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-2">
        {scenario.debrief.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h3 className="mt-6 font-semibold">Assess the evidence in your answer</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {track.stages.map((stage) => (
          <div key={stage.id} className="rounded-xl border border-line p-4">
            <label
              htmlFor={`rating-${session.id}-${stage.id}`}
              className="font-medium"
            >
              {stage.title}
            </label>
            <p className="mt-1 text-sm text-fg-2">{stage.evidence}</p>
            <select
              id={`rating-${session.id}-${stage.id}`}
              className={field}
              value={session.ratings[stage.id] ?? ""}
              onChange={(e) => {
                const ratings = { ...session.ratings };
                if (e.target.value === "") delete ratings[stage.id];
                else ratings[stage.id] = Number(e.target.value);
                changeInterviews((s) =>
                  assessInterview(s, session.id, ratings, session.reflection),
                );
              }}
            >
              <option value="">Select a rating</option>
              {RATING_ANCHORS.map((anchor, i) => (
                <option key={anchor} value={i}>
                  {i} — {anchor}
                </option>
              ))}
            </select>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer text-blue">
                Your saved answer
              </summary>
              <p className="mt-2 whitespace-pre-wrap text-fg-2">
                {session.answers[stage.id] || "No answer recorded."}
              </p>
            </details>
          </div>
        ))}
      </div>
      <label
        className="mt-5 block font-medium"
        htmlFor={`reflection-${session.id}`}
      >
        One change for your next round
      </label>
      <textarea
        id={`reflection-${session.id}`}
        rows={3}
        maxLength={20000}
        className={field}
        value={session.reflection}
        onChange={(e) =>
          changeInterviews((s) =>
            assessInterview(s, session.id, session.ratings, e.target.value),
          )
        }
        placeholder="Name a concrete gap and the practice you will do next."
      />
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer text-blue">
          Round notes and follow-up questions
        </summary>
        <p className="mt-3 whitespace-pre-wrap text-fg-2">
          {session.notes || "No notes recorded."}
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-fg-2">
          {scenario.followUps.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </details>
      <p className="mt-4 text-xs text-fg-3">
        Answers and assessments save as you type in this browser. Keep a backup
        for long-term records.
      </p>
    </section>
  );
}

export function InterviewPractice() {
  const state = useInterviews();
  const [track, setTrack] = useState<InterviewTrack>("system-design");
  const [duration, setDuration] = useState(30);
  const [scenarioId, setScenarioId] = useState(INTERVIEW_SCENARIOS[0].id);
  const [stageIndex, setStageIndex] = useState(0);
  const [now, setNow] = useState(0);
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null);
  const [confirmFinish, setConfirmFinish] = useState(false);
  useEffect(() => {
    const tick = () => {
      setNow(Date.now());
      checkInterviewDeadline();
    };
    const initial = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 500);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const active = state.active;
  const scenario = active ? interviewScenario(active.scenarioId)! : null;
  const stages = scenario ? INTERVIEW_TRACKS[scenario.track].stages : [];
  const stage = stages[Math.min(stageIndex, stages.length - 1)];
  const remaining = active
    ? Math.max(
        0,
        Math.ceil((active.deadline - (now || active.startedAt)) / 1000),
      )
    : 0;
  const completed =
    state.history.find((h) => h.id === selectedHistory) ?? state.history[0];
  const begin = (id = scenarioId, minutes = duration) => {
    setStageIndex(0);
    setSelectedHistory(null);
    setConfirmFinish(false);
    changeInterviews((s) =>
      startInterview(s, id, minutes, Date.now(), crypto.randomUUID()),
    );
  };
  return (
    <div className="space-y-7">
      {active && scenario ? (
        <>
          <section
            className={`${panel} border-brand/40`}
            aria-labelledby="round-title"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {INTERVIEW_TRACKS[scenario.track].title} · in progress
                </p>
                <h2 id="round-title" className="mt-2 text-2xl font-semibold">
                  {scenario.title}
                </h2>
              </div>
              <div className="rounded-xl bg-layer-2 px-4 py-3">
                <p
                  className="flex items-center gap-2 font-mono text-xl tabular-nums"
                  role="timer"
                  aria-label={`${Math.floor(remaining / 60)} minutes ${remaining % 60} seconds remaining`}
                >
                  <Clock3 size={18} aria-hidden />
                  {Math.floor(remaining / 60)}:
                  {String(remaining % 60).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs text-fg-2">
                  Ends{" "}
                  {new Date(active.deadline).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <p className="mt-4 leading-relaxed">{scenario.brief}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-2">
              {scenario.context.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-fg-3">
              The clock continues if you close this tab or your device sleeps.
              Answers save as you type. Scoring and discussion points unlock
              when the round ends.
            </p>
          </section>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <section className={panel} aria-label="Structured interview answer">
              <div
                className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4"
                aria-label="Interview stages"
              >
                {stages.map((s, i) => (
                  <button
                    type="button"
                    key={s.id}
                    className={`rounded-lg border px-3 py-2 text-left text-sm ${i === stageIndex ? "border-brand bg-brand-soft" : "border-line hover:bg-layer-2"}`}
                    onClick={() => setStageIndex(i)}
                    aria-pressed={i === stageIndex}
                  >
                    <span className="text-xs text-fg-2">
                      Stage {i + 1} · ~{Math.round(active.duration / 4)}m
                    </span>
                    <span className="mt-1 block font-medium">{s.title}</span>
                    {active.answers[s.id]?.trim() && (
                      <CheckCircle2
                        size={13}
                        className="mt-2 text-ok"
                        aria-label="Answer recorded"
                      />
                    )}
                  </button>
                ))}
              </div>
              <h3 className="text-lg font-semibold">{stage.title}</h3>
              <p
                id="stage-prompt"
                className="mt-2 text-sm leading-relaxed text-fg-2"
              >
                {stage.prompt}
              </p>
              <label
                htmlFor="stage-answer"
                className="mt-5 block text-sm font-medium"
              >
                Your answer · speak aloud, then capture the evidence
              </label>
              <textarea
                id="stage-answer"
                aria-describedby="stage-prompt"
                rows={12}
                className={field}
                value={active.answers[stage.id] ?? ""}
                maxLength={20000}
                onChange={(e) =>
                  changeInterviews((s) =>
                    updateInterview(
                      s,
                      {
                        answers: {
                          ...s.active?.answers,
                          [stage.id]: e.target.value,
                        },
                      },
                      Date.now(),
                    ),
                  )
                }
                placeholder="Capture assumptions, decisions, evidence and tradeoffs…"
              />
              <div className="mt-3 flex justify-between gap-3">
                <button
                  type="button"
                  className={secondary}
                  disabled={stageIndex === 0}
                  onClick={() => setStageIndex((i) => i - 1)}
                >
                  Previous stage
                </button>
                <button
                  type="button"
                  className={secondary}
                  disabled={stageIndex === stages.length - 1}
                  onClick={() => setStageIndex((i) => i + 1)}
                >
                  Next stage
                  <ArrowRight size={15} aria-hidden />
                </button>
              </div>
            </section>
            <aside className="space-y-5">
              <section className={panel}>
                <h3 className="flex items-center gap-2 font-semibold">
                  <MessageSquare size={17} aria-hidden />
                  Interviewer follow-ups
                </h3>
                <p className="mt-2 text-sm text-fg-2">
                  Reveal a question when ready to pressure-test your answer.
                  Follow-ups are optional and do not change your score.
                </p>
                <ol className="mt-4 list-decimal space-y-4 pl-5 text-sm leading-relaxed">
                  {scenario.followUps.slice(0, active.revealed).map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ol>
                <button
                  type="button"
                  className={`${secondary} mt-4 w-full`}
                  disabled={active.revealed >= scenario.followUps.length}
                  onClick={() =>
                    changeInterviews((s) =>
                      updateInterview(
                        s,
                        { revealed: (s.active?.revealed ?? 0) + 1 },
                        Date.now(),
                      ),
                    )
                  }
                >
                  {active.revealed >= scenario.followUps.length
                    ? "All questions revealed"
                    : "Reveal next question"}
                </button>
              </section>
              <section className={panel}>
                <label className="font-semibold" htmlFor="round-notes">
                  Scratch notes
                </label>
                <textarea
                  id="round-notes"
                  rows={6}
                  maxLength={20000}
                  className={field}
                  value={active.notes}
                  onChange={(e) =>
                    changeInterviews((s) =>
                      updateInterview(s, { notes: e.target.value }, Date.now()),
                    )
                  }
                  placeholder="Questions to ask, estimates, story cues…"
                />
                <p className="mt-2 text-xs text-fg-3">
                  Saved separately from your structured answers.
                </p>
              </section>
              <section className={panel}>
                {confirmFinish ? (
                  <>
                    <p className="text-sm">
                      Finish now? Your answer will be frozen and the debrief
                      will open.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={button}
                        onClick={() => {
                          setSelectedHistory(null);
                          setConfirmFinish(false);
                          changeInterviews((s) =>
                            finishInterview(s, Date.now()),
                          );
                        }}
                      >
                        Finish round
                      </button>
                      <button
                        type="button"
                        className={secondary}
                        onClick={() => setConfirmFinish(false)}
                      >
                        Keep practicing
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className={`${button} w-full`}
                    onClick={() => setConfirmFinish(true)}
                  >
                    Finish & debrief
                  </button>
                )}
              </section>
            </aside>
          </div>
        </>
      ) : (
        <>
          <section className={panel} aria-labelledby="choose-track">
            <h2 id="choose-track" className="text-xl font-semibold">
              Choose your next conversation
            </h2>
            <p className="mt-2 text-sm text-fg-2">
              A guided round with an exact deadline, realistic follow-ups and an
              evidence-based self-assessment. No microphone or AI service
              required.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {(
                Object.entries(INTERVIEW_TRACKS) as [
                  InterviewTrack,
                  (typeof INTERVIEW_TRACKS)[InterviewTrack],
                ][]
              ).map(([id, info]) => (
                <button
                  type="button"
                  key={id}
                  aria-pressed={track === id}
                  className={`rounded-xl border p-4 text-left ${track === id ? "border-brand bg-brand-soft" : "border-line hover:bg-layer-2"}`}
                  onClick={() => {
                    setTrack(id);
                    setScenarioId(
                      INTERVIEW_SCENARIOS.find((s) => s.track === id)!.id,
                    );
                  }}
                >
                  <span className="font-semibold">{info.title}</span>
                  <span className="mt-2 block text-sm text-fg-2">
                    {info.description}
                  </span>
                  <span className="mt-3 block text-xs font-medium text-brand">
                    4 authored scenarios
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-5 grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
              <label className="text-sm font-medium" htmlFor="scenario">
                <span>Scenario</span>
                <select
                  id="scenario"
                  className={field}
                  value={scenarioId}
                  onChange={(e) => setScenarioId(e.target.value)}
                >
                  {INTERVIEW_SCENARIOS.filter((s) => s.track === track).map(
                    (s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label className="text-sm font-medium" htmlFor="duration">
                <span>Duration</span>
                <select
                  id="duration"
                  className={field}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  {INTERVIEW_DURATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d} minutes
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className={button} onClick={() => begin()}>
                Start timed round
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </section>
          {completed && (
            <Debrief
              key={completed.id}
              session={completed}
              retake={() => begin(completed.scenarioId, completed.duration)}
            />
          )}
        </>
      )}
      <section className={panel} aria-labelledby="evidence-title">
        <h2 id="evidence-title" className="text-xl font-semibold">
          Your practice evidence
        </h2>
        <p className="mt-2 text-sm text-fg-2">
          Scores reflect your own assessment of completed rounds. Unrated rounds
          do not contribute to the average.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {interviewReadiness(state).map((e) => (
            <div key={e.track} className="rounded-xl bg-layer-2 p-4">
              <p className="text-sm font-medium">
                {INTERVIEW_TRACKS[e.track].title}
              </p>
              <p className="mt-2 text-2xl font-semibold">
                {e.score === null ? "—" : `${e.score}%`}
              </p>
              <p className="mt-1 text-xs text-fg-2">
                {e.completed} completed · {e.assessed} fully self-rated
              </p>
            </div>
          ))}
        </div>
        {state.history.length > 0 ? (
          <>
            <h3 className="mt-6 font-semibold">Saved rounds</h3>
            <p className="mt-1 text-xs text-fg-3">
              The most recent 50 rounds are retained.
            </p>
            <div className="mt-3 divide-y divide-line">
              {state.history.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {interviewScenario(h.scenarioId)!.title}
                    </p>
                    <p className="mt-1 text-xs text-fg-2">
                      {new Date(h.finishedAt).toLocaleDateString()} ·{" "}
                      {h.duration}m ·{" "}
                      {h.reason === "expired" ? "Time elapsed" : "Submitted"} ·{" "}
                      {interviewScore(h) === null
                        ? "Awaiting self-assessment"
                        : `${interviewScore(h)}% self-rated`}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!!active}
                    className={secondary}
                    onClick={() => {
                      setSelectedHistory(h.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {active ? "Available after round" : "Review round"}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-5 text-sm text-fg-2">
            Your first completed round will appear here with its answers, notes
            and self-assessment.
          </p>
        )}
      </section>
    </div>
  );
}
