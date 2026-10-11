"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, History, Timer } from "lucide-react";
import { useState } from "react";
import { ListCard } from "@/components/lists/ListHub";
import type { ListSummary } from "@/lib/catalog";
import { useMock, useReview } from "@/lib/practice";
import { dueReviews } from "@/lib/practice-data";
import { useProgress } from "@/lib/progress";

/** Headline numbers across every list: problems solved, reviews due and mock interviews done. */
export function HomeStats() {
  const progress = useProgress();
  const review = useReview();
  const mock = useMock();
  const [now] = useState(() => Date.now());
  const due = dueReviews(review, now).length;
  const stats = [
    { label: "Solved", value: Object.keys(progress.solved).length, icon: <CheckCircle2 size={16} />, tone: "text-ok" },
    { label: "Reviews due", value: due, icon: <History size={16} />, tone: "text-blue" },
    { label: "Mocks done", value: mock.history.length, icon: <Timer size={16} />, tone: "text-violet" },
  ];
  return (
    <dl className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-layer-1/80 px-3 py-3 shadow-card backdrop-blur sm:px-4">
          <dt className={`flex items-center gap-1.5 text-xs text-fg-3 ${s.tone}`}>
            {s.icon}
            <span className="text-fg-3">{s.label}</span>
          </dt>
          <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Next actions for today: due reviews, a timed mock and the week's plan. */
export function TodayActions() {
  const review = useReview();
  const mock = useMock();
  const [now] = useState(() => Date.now());
  const due = dueReviews(review, now).length;
  const reviewTitle = due === 1 ? "1 review due" : `${due} reviews due`;
  const actions = [
    {
      href: "/practice#review",
      icon: <History size={18} />,
      tone: "bg-blue-soft text-blue",
      title: due ? reviewTitle : "Review queue",
      body: due ? "Re-solve problems at spaced intervals while they are still fresh." : "Solved problems come back here at 1, 3, 7, 21 and 60 days.",
    },
    {
      href: "/practice#mock",
      icon: <Timer size={18} />,
      tone: "bg-violet-soft text-violet",
      title: mock.active ? "Resume your mock interview" : "Start a mock interview",
      body: mock.active ? "A timed session is in progress." : "Timed problems from any list, then a self-graded debrief.",
    },
    {
      href: "/practice/plan",
      icon: <CalendarDays size={18} />,
      tone: "bg-brand-soft text-brand",
      title: "16-week study plan",
      body: "One topic per week, mixing problems, lessons and guides.",
    },
  ];
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {actions.map((a) => (
        <li key={a.href}>
          <Link
            href={a.href}
            className="group flex h-full gap-3 rounded-2xl border border-line bg-layer-1 p-4 shadow-card transition hover:-translate-y-px hover:border-line-strong hover:shadow-raised"
          >
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${a.tone}`}>{a.icon}</span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 font-semibold">
                {a.title}
                <ArrowRight size={15} aria-hidden className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-0.5 block text-sm text-fg-2">{a.body}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FeaturedLists({ lists }: Readonly<{ lists: ListSummary[] }>) {
  const progress = useProgress();
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {lists.map((l) => (
        <li key={l.id}>
          <ListCard list={l} progress={progress} compact />
        </li>
      ))}
    </ul>
  );
}
