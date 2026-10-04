"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import { parsePracticeVisits, RESUME_KEY } from "@/lib/practice-resume";
import { safeGet } from "@/lib/storage";

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === RESUME_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
const getSnapshot = () => safeGet(RESUME_KEY);
const getServerSnapshot = () => null;

export function ResumePractice() {
  const visits = Object.values(parsePracticeVisits(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)))
    .sort((a, b) => b.at - a.at);
  if (!visits.length) return null;

  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-2" aria-label="Resume practice">
      {visits.map((visit) => (
        <Link key={visit.kind} href={visit.href}
          className="group flex min-w-0 items-center gap-3 rounded-xl border border-line bg-layer-1 p-4 transition-colors hover:bg-layer-2">
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-fg-3">{visit.kind === "problem" ? "Last problem" : "Last chapter"} · {visit.context}</span>
            <span className="mt-1 block truncate font-medium">{visit.title}</span>
          </span>
          <ArrowRight size={17} aria-hidden className="shrink-0 text-blue transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}
