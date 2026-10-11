import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, CalendarRange, Sparkles } from "lucide-react";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { PracticeHub } from "@/components/practice/PracticeHub";
import { practiceCatalog } from "@/lib/practice-catalog";

export const metadata: Metadata = { title: "Practice" };

const GUIDES = [
  { href: "/practice/plan", icon: CalendarRange, title: "16-week study plan", text: "Week-by-week topics, problems and system design deep dives, with your progress." },
  { href: "/system-design/ai-assisted", icon: Sparkles, title: "AI-assisted coding rounds", text: "Practice the newer interview format: extend an unfamiliar codebase with an AI assistant and review its output." },
  { href: "/system-design/behavioral", icon: BookOpenCheck, title: "Behavioral prep", text: "Build a story bank and rehearse the questions every loop includes." },
];

export default function PracticePage() {
  const { entries, sources } = practiceCatalog();
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Practice" title="Practice">
        Turn solved problems into interview readiness: timed mock rounds, spaced-repetition reviews and a structured plan. Everything is
        saved in this browser.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="rounded-2xl border border-line bg-layer-1 p-4 shadow-card transition hover:-translate-y-px hover:border-line-strong hover:shadow-raised">
              <g.icon size={18} className="mb-2 text-brand" aria-hidden />
              <div className="font-medium">{g.title}</div>
              <p className="mt-1 text-sm text-fg-2">{g.text}</p>
            </Link>
          ))}
        </div>
        <PracticeHub entries={entries} sources={sources} />
      </main>
      <SiteFooter />
    </>
  );
}
