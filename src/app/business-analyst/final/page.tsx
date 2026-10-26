import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { FinalView } from "@/components/ba/FinalView";
import { getBaBank, getBaIndex } from "@/lib/ba-content";

export const metadata: Metadata = {
  title: "Final exam · Business Analyst Prep",
  description: "Thirty questions drawn from every chapter of the Business Analyst course.",
};

export default function BaFinalPage() {
  const index = getBaIndex();
  const banks = index.chapters.map((c, i) => ({ chapter: c.id, title: c.title, number: i + 1, questions: getBaBank(c.id) }));
  return (
    <>
      <NavBar />
      <main className="px-4 pt-6 pb-16 sm:pt-8">
        <FinalView banks={banks} size={index.final.size} passPercent={index.final.passPercent} />
      </main>
      <SiteFooter />
    </>
  );
}
