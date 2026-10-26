import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { FinalView } from "@/components/ba/FinalView";
import { getBaBank, getBaIndex } from "@/lib/ba-content";

export const metadata: Metadata = {
  title: "Senior BA Final Exam · Business Analyst Prep",
  description: "Test senior-level Business Analyst skills across all eight chapters.",
};

export default function SeniorBaFinalPage() {
  const index = getBaIndex("senior");
  const banks = index.chapters.map((chapter, i) => ({
    chapter: chapter.id,
    title: chapter.title,
    number: i + 1,
    questions: getBaBank(chapter.id, "senior"),
  }));

  return (
    <>
      <NavBar />
      <main className="px-4 pt-6 pb-16 sm:pt-8">
        <FinalView
          banks={banks}
          size={index.final.size}
          passPercent={index.final.passPercent}
          routeBase="/business-analyst/senior"
          finalId="senior-final"
          examTitle="Senior Business Analyst"
        />
      </main>
      <SiteFooter />
    </>
  );
}
