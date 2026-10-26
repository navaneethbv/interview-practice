import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { BaStudyPlan } from "@/components/ba/BaStudyPlan";

export const metadata: Metadata = {
  title: "30-Day Beginner Study Plan · Business Analyst Prep",
  description: "A day-by-day beginner plan with 30 study sessions, practice tasks and interview preparation.",
};

export default function BusinessAnalystStudyPlanPage() {
  return (
    <>
      <NavBar />
      <BaStudyPlan />
      <SiteFooter />
    </>
  );
}
