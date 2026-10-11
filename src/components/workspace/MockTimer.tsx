"use client";

import Link from "next/link";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useMock } from "@/lib/practice";
import { sessionDeadline } from "@/lib/practice-data";

/** Whether this problem belongs to the running mock interview (walkthroughs stay hidden). */
export function useInMock(id: string) {
  const { active } = useMock();
  return !!active && active.problems.includes(id);
}

function format(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Countdown for the running mock interview, shown in the workspace header. */
export function MockTimer({ id }: Readonly<{ id: string }>) {
  const { active } = useMock();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!active || !active.problems.includes(id)) return null;
  const left = sessionDeadline(active) - now;
  const index = active.problems.indexOf(id) + 1;
  return (
    <Link
      href="/practice#mock"
      className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium tabular-nums ring-1 ring-line hover:bg-layer-2 ${
        left <= 0 ? "text-bad" : left < 5 * 60_000 ? "text-medium" : "text-fg-1"
      }`}
      title="Mock interview: walkthroughs are hidden until you finish"
    >
      <Timer size={15} aria-hidden />
      <span className="sr-only">Mock interview time left:</span>
      {left > 0 ? format(left) : "Time's up"}
      <span className="hidden text-xs font-normal text-fg-3 sm:inline">
        Problem {index}/{active.problems.length}
      </span>
    </Link>
  );
}
