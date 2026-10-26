"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { drawFinalExam, finalUnlocked, FINAL_ID, type BaQuestion } from "@/lib/ba-data";
import { useBa, useHydrated } from "@/lib/ba-store";
import { Quiz } from "./Quiz";

interface Props {
  banks: { chapter: string; title: string; number: number; questions: BaQuestion[] }[];
  size: number;
  passPercent: number;
  routeBase?: string;
  finalId?: string;
  examTitle?: string;
}

export function FinalView({ banks, size, passPercent, routeBase = "/business-analyst", finalId = FINAL_ID, examTitle = "Business Analyst" }: Readonly<Props>) {
  const ba = useBa();
  const hydrated = useHydrated();
  const ids = banks.map((b) => b.chapter);
  const total = banks.reduce((sum, b) => sum + b.questions.length, 0);
  const byId = new Map(banks.map((b) => [b.chapter, b]));

  if (!hydrated) return <div className="min-h-[60vh]" aria-busy="true" />;

  return (
    <div className="mx-auto max-w-[46rem]">
      <Link href={routeBase} className="inline-flex items-center gap-1 text-sm text-fg-3 hover:text-fg-1">
        <ArrowLeft size={14} /> All chapters
      </Link>
      <h1 className="mt-4 mb-6 text-3xl font-semibold tracking-tight">Final exam</h1>
      {finalUnlocked(ba, ids) ? (
        <Quiz
          id={finalId}
          title={`${examTitle} final exam`}
          size={size}
          bankSize={total}
          passPercent={passPercent}
          draw={(recent) => drawFinalExam(banks.map((b) => ({ chapter: b.chapter, questions: b.questions })), size, recent)}
          reviewFor={(q) => {
            const b = q.chapter ? byId.get(q.chapter) : undefined;
            return b ? { label: `Chapter ${b.number}: ${b.title}`, href: `${routeBase}/${b.chapter}` } : { label: "Course overview", href: "/business-analyst" };
          }}
          next={{ href: routeBase, label: "Back to the course" }}
        />
      ) : (
        <section className="rounded-2xl border border-line bg-layer-1 p-7 text-center shadow-card">
          <span className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-layer-2 text-fg-3"><Lock size={22} /></span>
          <p className="text-fg-2">The final exam unlocks after you pass all {banks.length} chapter quizzes.</p>
          <Link href={routeBase} className="mt-5 inline-flex h-10 items-center rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90">See your chapters</Link>
        </section>
      )}
    </div>
  );
}
