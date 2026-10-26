"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, CheckCircle2, Clock, Compass, GraduationCap, Lock, RotateCcw, Trophy } from "lucide-react";
import { BA_KEY, bestScore, chapterStatuses, finalUnlocked, FINAL_ID, hasPassed, lessonsRead, parseBa, type BaState } from "@/lib/ba-data";
import { finishTour, resetCourse, useBa, useHydrated } from "@/lib/ba-store";
import { safeGet } from "@/lib/storage";
import type { BaOutline } from "@/lib/ba-content";
import { Tour } from "./Tour";
import { TipCard } from "./TipCard";

const SESSION_KEY = "ip:ba:session";

/** How this visit started, read once per page load: a returning visitor opening a new browser session gets a welcome back. */
interface Visit { welcomeBack: boolean }
let visit: Visit | null = null;
function getVisit(): Visit {
  if (visit) return visit;
  let newSession = true;
  try {
    newSession = !window.sessionStorage.getItem(SESSION_KEY);
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Session storage can be unavailable; treat the visit as a new session.
  }
  visit = { welcomeBack: newSession && !!parseBa(safeGet(BA_KEY)).tourDone };
  return visit;
}
const noop = () => () => {};

type ChapterStatus = ReturnType<typeof chapterStatuses>[number];

function continueFor(opts: { finalPassed: boolean; finalOpen: boolean; current?: BaOutline[number]; started: boolean; coursePath: string }) {
  const { finalPassed, finalOpen, current, started, coursePath } = opts;
  if (finalPassed) return null;
  if (current) return { href: `${coursePath}/${current.id}`, label: started ? `Continue chapter ${current.number}` : "Start chapter 1" };
  return finalOpen ? { href: `${coursePath}/final`, label: "Take the final exam" } : null;
}

function welcomeMessage(finalPassed: boolean, percent: number, current?: BaOutline[number]) {
  if (finalPassed) return "You've completed the course — revisit any chapter to refresh before an interview.";
  const next = current ? ` Next up: chapter ${current.number}, ${current.title}.` : "";
  return `You're ${percent}% of the way through.${next}`;
}

function chapterBadgeTone(status: ChapterStatus) {
  return status === "passed" ? "bg-ok-soft text-ok" : "bg-brand-soft text-brand";
}

function chapterBadgeIcon(status: ChapterStatus, number: number) {
  return status === "passed" ? <CheckCircle2 size={19} /> : number;
}

function finalTone(open: boolean, passed: boolean) {
  if (passed) return "bg-ok-soft text-ok";
  return open ? "bg-violet-soft text-violet" : "bg-layer-2 text-fg-3";
}

function finalMessage(open: boolean, passed: boolean, best: ReturnType<typeof bestScore>, chapters: number) {
  if (passed) {
    const score = best ? ` — best ${best.score}/${best.total}` : "";
    return `Passed${score}.`;
  }
  return open ? "Unlocked — you're ready!" : `Unlocks after you take all ${chapters} chapter quizzes.`;
}

interface Props {
  outline: BaOutline;
  tips: string[];
  quizSize: number;
  passPercent: number;
  finalSize: number;
  coursePath?: string;
  studyPlanPath?: string;
  trackLabel?: string;
  headline?: string;
  finalId?: string;
  planTitle?: string;
  planDescription?: string;
  otherTrack?: { href: string; title: string; description: string };
}

export function BaOverview({ outline, tips, quizSize, passPercent, finalSize, coursePath = "/business-analyst", studyPlanPath = "/business-analyst/study-plan", trackLabel = "Business Analyst Prep", headline = "From the basics to interview-ready, one short lesson at a time.", finalId = FINAL_ID, planTitle = "New to business analysis?", planDescription = "Follow a beginner-friendly 39-session path: about an hour a day for foundations, hands-on practice, data skills and interview prep. Take rest days as needed; the plan tells you what to study and practice each session.", otherTrack }: Readonly<Props>) {
  const ba = useBa();
  const hydrated = useHydrated();
  const [tourRequested, setTourRequested] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const thisVisit = useSyncExternalStore(noop, getVisit, () => null);
  // The tour opens by itself until it has been completed or dismissed once.
  const tourOpen = tourRequested || (hydrated && !ba.tourDone);
  const welcomeBack = !!thisVisit?.welcomeBack && !welcomeDismissed;
  const ids = outline.map((c) => c.id);
  const statuses = chapterStatuses(ba, ids);
  const passedCount = statuses.filter((s) => s === "passed").length;
  const totalLessons = outline.reduce((sum, c) => sum + c.lessons.length, 0);
  const readTotal = outline.reduce((sum, c) => sum + lessonsRead(ba, c.id, c.lessons.length), 0);
  const finalOpen = finalUnlocked(ba, ids);
  const finalPassed = hasPassed(ba, finalId);
  const percent = Math.round(((readTotal + passedCount + (finalPassed ? 1 : 0)) / (totalLessons + ids.length + 1)) * 100);
  const current = outline.find((_, i) => statuses[i] === "open");
  const started = readTotal > 0 || ids.some((id) => (ba.quizzes[id]?.length ?? 0) > 0) || (ba.quizzes[finalId]?.length ?? 0) > 0;

  const closeTour = () => {
    setTourRequested(false);
    if (!ba.tourDone) finishTour();
  };

  const continueTarget = continueFor({ finalPassed, finalOpen, current, started, coursePath });

  return (
    <>
      {tourOpen && <Tour onClose={closeTour} courseTitle={trackLabel} chapterCount={outline.length} quizSize={quizSize} passPercent={passPercent} finalSize={finalSize} bankSize={Math.min(...outline.map((c) => c.questions))} />}

      <div className="hero-glow border-b border-line">
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:py-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">{trackLabel}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-[2.4rem] sm:leading-[1.1]">
              {headline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-2">
              {outline.length} chapters · {totalLessons} bite-size lessons · a {quizSize}-question quiz after each chapter
              (pass with {passPercent}%) and a {finalSize}-question final exam.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {hydrated && continueTarget && (
                <Link href={continueTarget.href} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 shadow-raised hover:opacity-90">
                  {continueTarget.label} <ArrowRight size={16} />
                </Link>
              )}
              <button onClick={() => setTourRequested(true)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-layer-1 px-4 text-sm font-medium hover:bg-layer-2">
                <Compass size={16} /> Take the tour
              </button>
            </div>
          </div>
          <ProgressCard hydrated={hydrated} percent={percent} passed={passedCount} chapters={ids.length} read={readTotal} lessons={totalLessons} finalPassed={finalPassed} />
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {welcomeBack && (
          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-blue-soft/60 p-4">
            <p className="min-w-0 flex-1 text-[15px]">
              <b>Welcome back!</b>{" "}
              {welcomeMessage(finalPassed, percent, current)}
            </p>
            <button onClick={() => setWelcomeDismissed(true)} className="text-sm text-fg-3 hover:text-fg-1">Dismiss</button>
          </div>
        )}

        <div className="mb-8">
          <TipCard tips={tips} />
        </div>

        {finalPassed && (
          <div className="mb-8 flex items-center gap-4 rounded-2xl border border-ok/40 bg-ok-soft p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-layer-1 text-ok"><Trophy size={24} /></span>
            <div>
              <p className="font-semibold">Course complete!</p>
              <p className="text-sm text-fg-2">You passed every chapter and the final exam. Review chapter {outline.length} and retake any quiz to stay sharp.</p>
            </div>
          </div>
        )}

        <h2 className="mb-4 text-lg font-semibold tracking-tight">Chapters</h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {outline.map((c, i) => (
            <li key={c.id}>
              <ChapterCard chapter={c} status={hydrated ? statuses[i] : "open"} upNext={c === current} ba={ba} hydrated={hydrated} coursePath={coursePath} />
            </li>
          ))}
          <li className="md:col-span-2">
            <FinalCard open={hydrated && finalOpen} passed={finalPassed} best={bestScore(ba, finalId)} size={finalSize} chapters={ids.length} href={`${coursePath}/final`} />
          </li>
        </ol>

        <StudyPlan title={planTitle} description={planDescription} href={studyPlanPath} />
        {otherTrack && (
          <div className="mt-6 rounded-2xl border border-line bg-layer-1 p-5 shadow-card">
            <h2 className="font-semibold">{otherTrack.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-fg-2">{otherTrack.description}</p>
            <Link href={otherTrack.href} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline">Explore this track <ArrowRight size={15} /></Link>
          </div>
        )}
        {hydrated && started && <ResetCourse chapterIds={ids} finalId={finalId} />}
      </main>
    </>
  );
}

function ProgressCard({ hydrated, percent, passed, chapters, read, lessons, finalPassed }: Readonly<{
  hydrated: boolean; percent: number; passed: number; chapters: number; read: number; lessons: number; finalPassed: boolean;
}>) {
  let finalValue = "–";
  if (hydrated && finalPassed) finalValue = "Passed";
  return (
    <div className="rounded-2xl border border-line bg-layer-1/85 p-5 shadow-card backdrop-blur">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-fg-2">Your progress</p>
        <p className="text-2xl font-semibold tabular-nums">{hydrated ? percent : 0}%</p>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-layer-3" aria-hidden>
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${hydrated ? percent : 0}%` }} />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat label="Chapters passed" value={hydrated ? `${passed}/${chapters}` : "–"} />
        <Stat label="Lessons read" value={hydrated ? `${read}/${lessons}` : "–"} />
        <Stat label="Final exam" value={finalValue} />
      </dl>
    </div>
  );
}

function Stat({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-xl bg-layer-2 px-2 py-2.5">
      <dd className="text-base font-semibold tabular-nums">{value}</dd>
      <dt className="mt-0.5 text-[11px] leading-tight text-fg-3">{label}</dt>
    </div>
  );
}

function ChapterCard({ chapter: c, status, upNext, ba, hydrated, coursePath }: Readonly<{ chapter: BaOutline[number]; status: ChapterStatus; upNext: boolean; ba: BaState; hydrated: boolean; coursePath: string }>) {
  const read = lessonsRead(ba, c.id, c.lessons.length);
  const best = bestScore(ba, c.id);
  const body = (
    <>
      <div className="flex items-start gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-sm font-semibold ${chapterBadgeTone(status)}`}>
          {chapterBadgeIcon(status, c.number)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-fg-3">Chapter {c.number}</p>
          <h3 className="font-semibold leading-snug">{c.title}</h3>
        </div>
        {status === "passed" && best && <span className="shrink-0 rounded-full bg-ok-soft px-2.5 py-0.5 text-xs font-medium text-ok">Best {best.score}/{best.total}</span>}
        {status === "taken" && best && <span className="shrink-0 rounded-full bg-layer-2 px-2.5 py-0.5 text-xs font-medium text-fg-2">Best {best.score}/{best.total}</span>}
        {status === "open" && hydrated && (read > 0 || upNext) && <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand">{read ? "In progress" : "Up next"}</span>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-fg-2">{c.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {c.skills.map((s) => <span key={s} className="rounded-full bg-layer-2 px-2.5 py-0.5 text-xs text-fg-2">{s}</span>)}
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-fg-3">
        <span className="inline-flex items-center gap-1"><Clock size={13} /> {c.minutes} min</span>
        <span>{hydrated ? `${read}/` : ""}{c.lessons.length} lessons</span>
        <span>{c.questions} quiz questions</span>
      </div>
      {hydrated && c.lessons.length > 0 && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-layer-3" aria-hidden>
          <div className={`h-full rounded-full ${status === "passed" ? "bg-ok" : "bg-brand"}`} style={{ width: `${status === "passed" ? 100 : (read / (c.lessons.length + 1)) * 100}%` }} />
        </div>
      )}
    </>
  );
  const base = "block h-full rounded-2xl border p-5 shadow-card transition";
  return <Link href={`${coursePath}/${c.id}`} className={`${base} border-line bg-layer-1 hover:-translate-y-px hover:border-line-strong hover:shadow-raised`}>{body}</Link>;
}

function FinalCard({ open, passed, best, size, chapters, href }: Readonly<{ open: boolean; passed: boolean; best: ReturnType<typeof bestScore>; size: number; chapters: number; href: string }>) {
  const body = (
    <div className="flex items-center gap-4">
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${finalTone(open, passed)}`}>
        {open || passed ? <GraduationCap size={24} /> : <Lock size={20} />}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">Final exam</h3>
        <p className="text-sm text-fg-2">
          {size} questions drawn from every chapter. {finalMessage(open, passed, best, chapters)}
        </p>
      </div>
      {open && <ArrowRight size={18} className="shrink-0 text-fg-3" />}
    </div>
  );
  if (!open && !passed) return <div aria-disabled="true" className="rounded-2xl border border-dashed border-line-strong bg-layer-1/60 p-5">{body}</div>;
  return <Link href={href} className="block rounded-2xl border border-line bg-layer-1 p-5 shadow-card transition hover:border-line-strong hover:shadow-raised">{body}</Link>;
}

function StudyPlan({ title, description, href }: Readonly<{ title: string; description: string; href: string }>) {
  return (
    <section className="mt-12 rounded-2xl border border-brand/30 bg-brand-soft p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-fg-2">{description}</p>
        </div>
        <Link href={href} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90">
          Open daily plan <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function ResetCourse({ chapterIds, finalId }: Readonly<{ chapterIds: string[]; finalId: string }>) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6 text-sm">
      {confirming ? (
        <>
          <span className="text-fg-2">Erase all course progress, quiz scores and notes in this browser?</span>
          <button onClick={() => { resetCourse(chapterIds, finalId); setConfirming(false); }} className="rounded-lg bg-bad px-3 py-1.5 font-medium text-white hover:opacity-90">Yes, reset</button>
          <button onClick={() => setConfirming(false)} className="rounded-lg px-3 py-1.5 text-fg-2 hover:bg-layer-2">Cancel</button>
        </>
      ) : (
        <button onClick={() => setConfirming(true)} className="inline-flex items-center gap-1.5 text-fg-3 hover:text-fg-1"><RotateCcw size={14} /> Reset course progress</button>
      )}
    </div>
  );
}
