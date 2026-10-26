"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, PartyPopper, RotateCcw, Target, XCircle } from "lucide-react";
import { bestScore, hasPassed, passMark, scoreAnswers, type PresentedQuestion } from "@/lib/ba-data";
import { recordAttempt, useBa } from "@/lib/ba-store";

export interface QuizProps {
  /** Chapter id, or "final". */
  id: string;
  title: string;
  size: number;
  bankSize: number;
  passPercent: number;
  draw: (recent: ReadonlySet<string>) => PresentedQuestion[];
  /** Where a missed question can be reviewed. */
  reviewFor: (q: PresentedQuestion) => { label: string; href?: string; onClick?: () => void };
  next?: { href: string; label: string };
}

type Phase = "intro" | "running" | "done";
const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * One question at a time with instant feedback. Each attempt draws a fresh set of questions
 * (preferring ones not shown last time) and shuffles the answer order.
 */
export function Quiz({ id, title, size, bankSize, passPercent, draw, reviewFor, next }: Readonly<QuizProps>) {
  const ba = useBa();
  const attempts = ba.quizzes[id] ?? [];
  const passed = hasPassed(ba, id);
  const best = bestScore(ba, id);
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<PresentedQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const top = useRef<HTMLDivElement>(null);

  const total = questions.length || Math.min(size, bankSize);
  const needed = passMark(total, passPercent);

  const start = () => {
    const recent = new Set(attempts.at(-1)?.ids ?? []);
    const drawn = draw(recent);
    setQuestions(drawn);
    setAnswers(drawn.map(() => null));
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setPhase("running");
    top.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const check = () => {
    if (choice === null) return;
    const nextAnswers = [...answers];
    nextAnswers[index] = choice;
    setAnswers(nextAnswers);
    setChecked(true);
  };

  const advance = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setChoice(null);
      setChecked(false);
      return;
    }
    const { correct, total: count } = scoreAnswers(questions, answers);
    recordAttempt(id, { at: Date.now(), score: correct, total: count, passed: correct >= passMark(count, passPercent), ids: questions.map((q) => q.id) });
    setPhase("done");
    top.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div ref={top} className="scroll-mt-20">
      {phase === "intro" && (
        <section className="rounded-2xl border border-line bg-layer-1 p-5 shadow-card sm:p-7">
          <span className="mb-3 grid size-11 place-items-center rounded-xl bg-violet-soft text-violet"><Target size={22} /></span>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg-2">
            <li>• <b className="text-fg-1">{total} questions</b>, picked at random from a bank of {bankSize}.</li>
            <li>• Answer choices are shuffled every time, so you can&apos;t rely on remembering positions.</li>
            <li>• You&apos;ll see whether you were right, with an explanation, after each question.</li>
            <li>• You need <b className="text-fg-1">{needed} of {total}</b> ({passPercent}%) to pass{id === "final" ? " and finish the course" : " and unlock the next chapter"}.</li>
            <li>• Retakes are unlimited. Each retake prefers questions you didn&apos;t see last time.</li>
          </ul>
          {attempts.length > 0 && (
            <p className="mt-4 text-sm text-fg-3">
              {attempts.length} attempt{attempts.length === 1 ? "" : "s"} so far
              {best && <> · best {best.score}/{best.total}</>}
              {passed && <span className="ml-2 rounded-full bg-ok-soft px-2 py-0.5 text-xs font-medium text-ok">Passed</span>}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={start} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 shadow-raised hover:opacity-90">
              {attempts.length ? "Take it again" : "Start the quiz"} <ArrowRight size={16} />
            </button>
            {passed && next && (
              <Link href={next.href} className="inline-flex h-10 items-center rounded-xl border border-line-strong bg-layer-1 px-4 text-sm font-medium hover:bg-layer-2">
                {next.label}
              </Link>
            )}
          </div>
        </section>
      )}

      {phase === "running" && questions[index] && (
        <QuestionCard
          q={questions[index]}
          index={index}
          total={questions.length}
          correctSoFar={answers.slice(0, checked ? index + 1 : index).filter((a, i) => a === questions[i].correct).length}
          choice={choice}
          checked={checked}
          onChoose={setChoice}
          onCheck={check}
          onNext={advance}
        />
      )}

      {phase === "done" && (
        <Results
          questions={questions}
          answers={answers}
          needed={needed}
          onRetry={start}
          reviewFor={reviewFor}
          next={next}
          isFinal={id === "final"}
        />
      )}
    </div>
  );
}

function QuestionCard({ q, index, total, correctSoFar, choice, checked, onChoose, onCheck, onNext }: Readonly<{
  q: PresentedQuestion;
  index: number;
  total: number;
  correctSoFar: number;
  choice: number | null;
  checked: boolean;
  onChoose: (i: number) => void;
  onCheck: () => void;
  onNext: () => void;
}>) {
  const right = checked && choice === q.correct;
  return (
    <section className="rounded-2xl border border-line bg-layer-1 p-5 shadow-card sm:p-7" aria-live="polite">
      <div className="mb-4 flex items-center justify-between gap-3 text-xs text-fg-3">
        <span>Question {index + 1} of {total}</span>
        <span>{correctSoFar} correct</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-layer-3">
        <div className="h-full rounded-full bg-violet transition-all" style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }} />
      </div>
      <h3 className="text-lg leading-snug font-semibold text-balance">{q.q}</h3>
      <fieldset className="mt-4 space-y-2" disabled={checked}>
        <legend className="sr-only">Choose one answer</legend>
        {q.choices.map((c, i) => {
          const isChoice = choice === i;
          let tone = "border-line hover:border-line-strong hover:bg-layer-2";
          if (!checked && isChoice) tone = "border-blue bg-blue-soft";
          if (checked && i === q.correct) tone = "border-ok bg-ok-soft";
          else if (checked && isChoice) tone = "border-bad bg-bad-soft";
          return (
            <label key={c} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-[15px] leading-snug transition-colors ${tone} ${checked ? "cursor-default" : ""}`}>
              <input type="radio" name={`q-${q.id}`} className="sr-only" checked={isChoice} onChange={() => onChoose(i)} />
              <span className={`mt-px grid size-6 shrink-0 place-items-center rounded-md text-xs font-semibold ${isChoice ? "bg-fg-1 text-layer-1" : "bg-layer-2 text-fg-2"}`}>{LETTERS[i]}</span>
              <span className="min-w-0 flex-1">{c}</span>
              {checked && i === q.correct && <CheckCircle2 size={18} className="shrink-0 text-ok" aria-label="Correct answer" />}
              {checked && isChoice && i !== q.correct && <XCircle size={18} className="shrink-0 text-bad" aria-label="Your answer" />}
            </label>
          );
        })}
      </fieldset>
      {checked && (
        <div className={`mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${right ? "bg-ok-soft" : "bg-bad-soft"}`}>
          <p className={`font-semibold ${right ? "text-ok" : "text-bad"}`}>{right ? "Correct!" : "Not quite."}</p>
          <p className="mt-1 text-fg-1">{q.why}</p>
        </div>
      )}
      <div className="mt-5 flex justify-end">
        {checked ? (
          <button onClick={onNext} autoFocus className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90">
            {index + 1 < total ? "Next question" : "See my results"} <ArrowRight size={16} />
          </button>
        ) : (
          <button onClick={onCheck} disabled={choice === null} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            Check answer
          </button>
        )}
      </div>
    </section>
  );
}

function Results({ questions, answers, needed, onRetry, reviewFor, next, isFinal }: Readonly<{
  questions: PresentedQuestion[];
  answers: (number | null)[];
  needed: number;
  onRetry: () => void;
  reviewFor: QuizProps["reviewFor"];
  next?: QuizProps["next"];
  isFinal: boolean;
}>) {
  const { correct, total, percent } = scoreAnswers(questions, answers);
  const passed = correct >= needed;
  const missed = questions.map((q, i) => ({ q, a: answers[i] })).filter(({ q, a }) => a !== q.correct);
  // Group missed questions by where to review them, so each lesson is listed once.
  const review = new Map<string, ReturnType<QuizProps["reviewFor"]>>();
  for (const { q } of missed) {
    const target = reviewFor(q);
    review.set(target.label, target);
  }

  return (
    <section className="space-y-4">
      <div className={`rounded-2xl border p-5 shadow-card sm:p-7 ${passed ? "border-ok/40 bg-ok-soft" : "border-line bg-layer-1"}`}>
        <span className={`mb-3 grid size-11 place-items-center rounded-xl ${passed ? "bg-layer-1 text-ok" : "bg-bad-soft text-bad"}`}>
          {passed ? <PartyPopper size={22} /> : <RotateCcw size={22} />}
        </span>
        <p className="text-sm text-fg-2">Your score</p>
        <p className="text-4xl font-semibold tabular-nums">{correct}/{total} <span className="text-xl text-fg-3">({percent}%)</span></p>
        <p className="mt-2 text-base font-medium">
          {passed
            ? isFinal ? "You passed the final exam. Congratulations — you've completed the course!" : "You passed! The next chapter is unlocked."
            : `Not yet — you need ${needed} of ${total} to pass. Review the lessons below, then try again with a new set of questions.`}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {passed && next && (
            <Link href={next.href} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 shadow-raised hover:opacity-90">
              {next.label} <ArrowRight size={16} />
            </Link>
          )}
          <button onClick={onRetry} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-layer-1 px-4 text-sm font-medium hover:bg-layer-2">
            <RotateCcw size={15} /> {passed ? "Practice again" : "Retry with new questions"}
          </button>
        </div>
      </div>

      {review.size > 0 && (
        <div className="rounded-2xl border border-line bg-layer-1 p-5 shadow-card sm:p-6">
          <h3 className="font-semibold">Review these {isFinal ? "chapters" : "lessons"}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {[...review.values()].map((t) => (
              <li key={t.label}>
                {t.href ? (
                  <Link href={t.href} className="inline-block rounded-full border border-line bg-layer-2 px-3 py-1.5 text-sm hover:border-line-strong">{t.label}</Link>
                ) : (
                  <button onClick={t.onClick} className="rounded-full border border-line bg-layer-2 px-3 py-1.5 text-sm hover:border-line-strong">{t.label}</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {missed.length > 0 && (
        <details className="rounded-2xl border border-line bg-layer-1 p-5 shadow-card sm:p-6">
          <summary className="cursor-pointer font-semibold">Questions you missed ({missed.length})</summary>
          <ol className="mt-4 space-y-4">
            {missed.map(({ q, a }) => (
              <li key={q.id} className="border-t border-line pt-4 text-sm leading-relaxed first:border-0 first:pt-0">
                <p className="font-medium text-fg-1">{q.q}</p>
                {a !== null && <p className="mt-1 text-bad">Your answer: {q.choices[a]}</p>}
                <p className="mt-1 text-ok">Correct answer: {q.choices[q.correct]}</p>
                <p className="mt-1 text-fg-2">{q.why}</p>
              </li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}
