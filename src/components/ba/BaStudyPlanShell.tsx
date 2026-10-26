import type { ReactNode } from "react";
import Link from "next/link";

export interface BaStudySession {
  title: string;
  task: string;
  href: string;
  time?: string;
}

interface Props {
  backHref: string;
  backLabel: string;
  levelLabel: string;
  title: string;
  intro: string;
  timeBlocks: ReadonlyArray<{ duration: string; label: string }>;
  note: string;
  sessions: ReadonlyArray<BaStudySession>;
  children: ReactNode;
}

/** Shared layout for the beginner and senior day-by-day study plans. */
export function BaStudyPlanShell({
  backHref,
  backLabel,
  levelLabel,
  title,
  intro,
  timeBlocks,
  note,
  sessions,
  children,
}: Readonly<Props>) {
  const showSessionTime = sessions.some((session) => session.time);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Link href={backHref} className="text-sm font-medium text-brand hover:underline">← Back to {backLabel}</Link>
      <header className="mt-5 rounded-3xl border border-line bg-layer-1 p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{levelLabel}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-2">{intro}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {timeBlocks.map((block) => (
            <div key={block.duration} className="rounded-xl bg-layer-2 p-3">
              <b className="block text-sm">{block.duration}</b>
              <span className="text-sm text-fg-2">{block.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-2">{note}</p>
      </header>
      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-layer-1 shadow-card">
        <h2 className="border-b border-line bg-layer-2 px-5 py-4 text-lg font-semibold">Daily schedule</h2>
        <ol className="divide-y divide-line">
          {sessions.map((session, index) => (
            <li
              key={session.title}
              className={`grid gap-2 px-5 py-4 ${showSessionTime ? "sm:grid-cols-[5rem_1fr_auto] sm:items-start" : "sm:grid-cols-[5rem_1fr]"}`}
            >
              <span className="text-sm font-semibold text-brand">Day {index + 1}</span>
              <div>
                <h3 className="font-medium"><Link href={session.href} className="hover:text-brand hover:underline">{session.title}</Link></h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-2">{session.task}</p>
              </div>
              {session.time && <span className="text-xs text-fg-3 sm:pt-1">{session.time}</span>}
            </li>
          ))}
        </ol>
      </section>
      {children}
    </main>
  );
}
