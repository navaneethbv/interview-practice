import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { BaOverview } from "@/components/ba/BaOverview";
import { baOutline, getBaIndex, getBaTips } from "@/lib/ba-content";

export const metadata: Metadata = {
  title: "Senior Business Analyst Track",
  description: "Advanced Business Analyst lessons, quizzes, a guided study plan and an integrated capstone.",
};

export default function SeniorBusinessAnalystPage() {
  const index = getBaIndex("senior");
  return (
    <>
      <NavBar />
      <BaOverview
        outline={baOutline("senior")}
        tips={getBaTips("senior")}
        quizSize={index.quizSize}
        passPercent={index.passPercent}
        finalSize={index.final.size}
        coursePath="/business-analyst/senior"
        studyPlanPath="/business-analyst/senior/study-plan"
        trackLabel="Senior BA Track"
        headline="Lead complex change and connect enterprise strategy to measurable business value."
        finalId="senior-final"
        planTitle="Build senior BA depth"
        planDescription="Follow a 30-session advanced path at about 60–75 minutes per session, with senior-level practice, a multi-region capstone and interview preparation."
        otherTrack={{ href: "/business-analyst", title: "Want to revisit the fundamentals?", description: "Return to the beginner course for core BA concepts, foundational tools and practice." }}
      />
      <SiteFooter />
    </>
  );
}
