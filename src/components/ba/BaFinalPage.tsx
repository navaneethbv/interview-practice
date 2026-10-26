import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { FinalView } from "@/components/ba/FinalView";
import { getBaBank, getBaIndex, type BaTrack } from "@/lib/ba-content";

export const BA_FINAL_METADATA: Record<BaTrack, Metadata> = {
  beginner: {
    title: "Final exam · Business Analyst Prep",
    description: "Thirty questions drawn from every chapter of the Business Analyst course.",
  },
  senior: {
    title: "Senior BA Final Exam · Business Analyst Prep",
    description: "Test senior-level Business Analyst skills across all eight chapters.",
  },
};

export function BaFinalPage({ track }: Readonly<{ track: BaTrack }>) {
  const index = getBaIndex(track);
  const senior = track === "senior";
  const banks = index.chapters.map((chapter, i) => ({
    chapter: chapter.id,
    title: chapter.title,
    number: i + 1,
    questions: getBaBank(chapter.id, track),
  }));

  return (
    <>
      <NavBar />
      <main className="px-4 pt-6 pb-16 sm:pt-8">
        <FinalView
          banks={banks}
          size={index.final.size}
          passPercent={index.final.passPercent}
          {...(senior ? {
            routeBase: "/business-analyst/senior",
            finalId: "senior-final",
            examTitle: "Senior Business Analyst",
          } : {})}
        />
      </main>
      <SiteFooter />
    </>
  );
}
