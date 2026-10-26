import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { BaOverview } from "@/components/ba/BaOverview";
import { baOutline, getBaIndex, getBaTips } from "@/lib/ba-content";

export const metadata: Metadata = {
  title: "Business Analyst Prep",
  description: "A step-by-step Business Analyst course with bite-size lessons, gated chapter quizzes and a final exam.",
};

export default function BusinessAnalystPage() {
  const index = getBaIndex();
  return (
    <>
      <NavBar />
      <BaOverview outline={baOutline()} tips={getBaTips()} quizSize={index.quizSize} passPercent={index.passPercent} finalSize={index.final.size} otherTrack={{ href: "/business-analyst/senior", title: "Already know the BA fundamentals?", description: "Explore the senior track for strategy alignment, enterprise change, governance, value realization, coaching and senior interview practice." }} />
      <SiteFooter />
    </>
  );
}
