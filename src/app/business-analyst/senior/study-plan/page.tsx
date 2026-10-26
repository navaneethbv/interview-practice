import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { SeniorStudyPlan } from "@/components/ba/SeniorStudyPlan";

export const metadata: Metadata = {
  title: "Senior BA Study Plan · Business Analyst Prep",
  description: "A 30-session advanced Business Analyst study plan with a multi-region capstone and interview preparation.",
};

export default function SeniorStudyPlanPage() {
  return (
    <>
      <NavBar />
      <SeniorStudyPlan />
      <SiteFooter />
    </>
  );
}
