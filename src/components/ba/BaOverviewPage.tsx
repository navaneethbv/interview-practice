import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { BaOverview } from "@/components/ba/BaOverview";
import { baOutline, getBaIndex, getBaTips, type BaTrack } from "@/lib/ba-content";

export const BA_OVERVIEW_METADATA: Record<BaTrack, Metadata> = {
  beginner: {
    title: "Business Analyst Prep",
    description: "A step-by-step Business Analyst course with bite-size lessons, gated chapter quizzes and a final exam.",
  },
  senior: {
    title: "Senior Business Analyst Track",
    description: "Advanced Business Analyst lessons, quizzes, a guided study plan and an integrated capstone.",
  },
};

export function BaOverviewPage({ track }: Readonly<{ track: BaTrack }>) {
  const index = getBaIndex(track);
  const senior = track === "senior";

  return (
    <>
      <NavBar />
      <BaOverview
        outline={baOutline(track)}
        tips={getBaTips(track)}
        quizSize={index.quizSize}
        passPercent={index.passPercent}
        finalSize={index.final.size}
        {...(senior ? {
          coursePath: "/business-analyst/senior",
          studyPlanPath: "/business-analyst/senior/study-plan",
          trackLabel: "Senior BA Track",
          headline: "Lead complex change and connect enterprise strategy to measurable business value.",
          finalId: "senior-final",
          planTitle: "Build senior BA depth",
          planDescription: "Follow a 30-session advanced path at about 60–75 minutes per session, with senior-level practice, a multi-region capstone and interview preparation.",
          otherTrack: { href: "/business-analyst", title: "Want to revisit the fundamentals?", description: "Return to the beginner course for core BA concepts, foundational tools and practice." },
        } : {
          otherTrack: { href: "/business-analyst/senior", title: "Already know the BA fundamentals?", description: "Explore the senior track for strategy alignment, enterprise change, governance, value realization, coaching and senior interview practice." },
        })}
      />
      <SiteFooter />
    </>
  );
}
