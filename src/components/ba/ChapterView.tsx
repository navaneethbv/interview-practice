"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock, Lock, Target } from "lucide-react";
import { chapterStatuses, drawChapterQuiz, hasPassed, lessonKey, lessonsRead, type BaQuestion } from "@/lib/ba-data";
import { savePosition, setLessonRead, useBa, useHydrated } from "@/lib/ba-store";
import type { BaLesson } from "@/lib/ba-content";
import { LessonContent } from "@/components/LessonContent";
import { ReaderTools } from "@/components/ReaderTools";
import { StudyActions } from "@/components/StudyActions";
import { Quiz } from "./Quiz";
import { NotesBox } from "./NotesBox";
import { TipCard } from "./TipCard";

interface Props {
  chapter: { id: string; number: number; title: string; summary: string; introHtml: string; lessons: BaLesson[]; minutes: number };
  bank: BaQuestion[];
  chapterIds: string[];
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
  quizSize: number;
  passPercent: number;
  tips: string[];
  notesPlaceholder?: string;
  routeBase?: string;
}

function subscribeLessonHash(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}
function getLessonHash() { return window.location.hash; }

export function ChapterView({ chapter, bank, chapterIds, prev, next, quizSize, passPercent, tips, notesPlaceholder, routeBase = "/business-analyst" }: Readonly<Props>) {
  const ba = useBa();
  const hydrated = useHydrated();
  const { id, lessons } = chapter;
  const quizStep = lessons.length + 1;
  const hash = useSyncExternalStore(subscribeLessonHash, getLessonHash, () => "");
  const top = useRef<HTMLDivElement>(null);

  const status = chapterStatuses(ba, chapterIds)[chapter.number - 1];
  const readCount = lessonsRead(ba, id, lessons.length);
  const allRead = readCount === lessons.length;
  const saved = ba.position[id];
  const requestedLesson = /^#lesson-([1-9][0-9]*)$/.exec(hash)?.[1];
  const linkedStep = hash === "#quiz" ? quizStep : requestedLesson ? Number(requestedLesson) : 0;
  const step = linkedStep > 0 && linkedStep <= quizStep ? linkedStep : saved && saved <= quizStep ? saved : 1;
  const passed = hasPassed(ba, id);

  const go = (n: number) => {
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${n <= lessons.length ? `#lesson-${n}` : "#quiz"}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    savePosition(id, n);
    top.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  if (!hydrated) return <div className="min-h-[60vh]" aria-busy="true" />;

  if (status === "locked") return <LockedChapter number={chapter.number} title={chapter.title} prev={prev} routeBase={routeBase} />;

  const lesson = lessons[step - 1];
  const isRead = lesson ? !!ba.read[lessonKey(id, lesson.n)] : false;
  const firstUnread = lessons.find((l) => !ba.read[lessonKey(id, l.n)]);

  return (
    <div ref={top} className="mx-auto max-w-[46rem] scroll-mt-20">
      <header className="mb-6">
        <Link href={routeBase} className="inline-flex items-center gap-1 text-sm text-fg-3 hover:text-fg-1">
          <ArrowLeft size={14} /> All chapters
        </Link>
        <p className="mt-4 text-sm font-medium text-brand">Chapter {chapter.number} of {chapterIds.length}</p>
        <h1 className="mt-1 text-3xl leading-tight font-semibold tracking-tight text-balance">{chapter.title}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fg-3">
          <span className="inline-flex items-center gap-1"><Clock size={14} /> about {chapter.minutes} min of reading</span>
          <span>{readCount}/{lessons.length} lessons read</span>
          {passed && <span className="inline-flex items-center gap-1 font-medium text-ok"><CheckCircle2 size={14} /> Quiz passed</span>}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-layer-3" aria-hidden>
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${((readCount + (passed ? 1 : 0)) / (lessons.length + 1)) * 100}%` }} />
        </div>
      </header>

      <LessonNav lessons={lessons} chapterId={id} step={step} quizStep={quizStep} allRead={allRead} passed={passed} read={ba.read} onGo={go} />

      {lesson && (
        <article className="reader-page rounded-2xl border border-line bg-layer-1 p-5 shadow-card sm:p-8">
          <StudyActions href={`${routeBase}/${id}#lesson-${lesson.n}`} title={`${chapter.title}: ${lesson.title}`} section={routeBase.includes("senior") ? "Senior BA" : "Business Analyst"} />
          <ReaderTools key={`ba-reader-${id}-${lesson.n}`} targetId={`ba-reader-${id}-${lesson.n}`} />
          <div id={`ba-reader-${id}-${lesson.n}`} data-reader-content>
          {step === 1 && (
            <LessonContent blocks={[{ t: "html", html: chapter.introHtml }]} className="prose-ba mb-6 border-b border-line pb-5" />
          )}
          <p className="text-xs font-medium tracking-wide text-fg-3 uppercase">Lesson {lesson.n} of {lessons.length} · {lesson.minutes} min</p>
          <h2 id={`lesson-${lesson.n}`} className="mt-1 mb-4 scroll-mt-20 text-2xl font-semibold tracking-tight text-balance">{lesson.title}</h2>
          <LessonContent blocks={[{ t: "html", html: lesson.html }]} className="prose-reader prose-ba" />
          </div>

          <div className="reader-hide mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <button
              onClick={() => go(step - 1)}
              disabled={step === 1}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-fg-2 hover:bg-layer-2 disabled:invisible"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="flex flex-wrap items-center gap-2">
              {isRead && (
                <button onClick={() => setLessonRead(id, lesson.n, false)} className="px-2 text-sm text-fg-3 hover:text-fg-1">Mark unread</button>
              )}
              <button
                onClick={() => {
                  if (!isRead) setLessonRead(id, lesson.n, true);
                  go(step + 1);
                }}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 shadow-raised hover:opacity-90"
              >
                {isRead ? "Next" : "Mark as read & continue"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>
      )}

      {step === quizStep && (
        allRead ? (
          <Quiz
            id={id}
            title={`Chapter ${chapter.number} quiz: ${chapter.title}`}
            size={quizSize}
            bankSize={bank.length}
            passPercent={passPercent}
            draw={(recent) => drawChapterQuiz(bank, quizSize, recent)}
            reviewFor={(q) => ({ label: `Lesson ${q.lesson}: ${lessons[q.lesson - 1]?.title ?? ""}`, onClick: () => go(q.lesson) })}
            next={next ? { href: `${routeBase}/${next.id}`, label: `Start chapter ${chapter.number + 1}: ${next.title}` } : { href: `${routeBase}/final`, label: "Go to the final exam" }}
          />
        ) : (
          <section className="rounded-2xl border border-line bg-layer-1 p-6 shadow-card">
            <span className="mb-3 grid size-11 place-items-center rounded-xl bg-layer-2 text-fg-3"><Lock size={20} /></span>
            <h2 className="text-xl font-semibold tracking-tight">Finish the lessons first</h2>
            <p className="mt-2 text-fg-2">The quiz opens once every lesson in this chapter is marked as read. You have {lessons.length - readCount} to go.</p>
            {firstUnread && (
              <button onClick={() => go(firstUnread.n)} className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90">
                Continue with lesson {firstUnread.n} <ArrowRight size={16} />
              </button>
            )}
          </section>
        )
      )}

      <div className="mt-6 space-y-4">
        <TipCard tips={tips} compact />
        <NotesBox chapter={id} placeholder={notesPlaceholder} />
      </div>
    </div>
  );
}

function LockedChapter({ number, title, prev, routeBase }: Readonly<{ number: number; title: string; prev: Props["prev"]; routeBase: string }>) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-line bg-layer-1 p-7 text-center shadow-card">
      <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-layer-2 text-fg-3"><Lock size={22} /></span>
      <p className="text-sm text-fg-3">Chapter {number}</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-fg-2">This chapter unlocks when you pass the quiz for the previous chapter{prev ? <>, <b className="text-fg-1">{prev.title}</b></> : ""}.</p>
      <div className="mt-6 flex justify-center gap-2">
        {prev && (
          <Link href={`${routeBase}/${prev.id}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90">
            Go to {prev.title} <ArrowRight size={16} />
          </Link>
        )}
        <Link href={routeBase} className="inline-flex h-10 items-center rounded-xl border border-line-strong px-4 text-sm font-medium hover:bg-layer-2">All chapters</Link>
      </div>
    </div>
  );
}

function chipTone(active: boolean, done: boolean) {
  if (active) return "border-fg-1 bg-fg-1 text-layer-1";
  return done ? "border-ok/40 bg-ok-soft text-ok" : "border-line bg-layer-1 text-fg-2 hover:border-line-strong";
}

function quizTone(active: boolean, passed: boolean) {
  if (active) return "border-violet bg-violet text-white";
  return passed ? "border-ok/40 bg-ok-soft text-ok" : "border-line bg-layer-1 text-fg-2 hover:border-line-strong";
}

function LessonNav({ lessons, chapterId, step, quizStep, allRead, passed, read, onGo }: Readonly<{
  lessons: BaLesson[];
  chapterId: string;
  step: number;
  quizStep: number;
  allRead: boolean;
  passed: boolean;
  read: Record<string, number>;
  onGo: (n: number) => void;
}>) {
  return (
    <nav aria-label="Lessons in this chapter" className="mb-6 flex flex-wrap gap-1.5">
      {lessons.map((l) => {
        const done = !!read[lessonKey(chapterId, l.n)];
        const active = step === l.n;
        return (
          <button
            key={l.n}
            onClick={() => onGo(l.n)}
            title={l.title}
            aria-current={active ? "step" : undefined}
            aria-label={`Lesson ${l.n}: ${l.title}${done ? " (read)" : ""}`}
            className={`grid size-9 place-items-center rounded-lg border text-sm font-medium transition-colors ${chipTone(active, done)}`}
          >
            {done && !active ? <Check size={15} /> : l.n}
          </button>
        );
      })}
      <button
        onClick={() => onGo(quizStep)}
        aria-current={step === quizStep ? "step" : undefined}
        className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors ${quizTone(step === quizStep, passed)}`}
      >
        {allRead ? <Target size={15} /> : <Lock size={14} />} Quiz
      </button>
    </nav>
  );
}
