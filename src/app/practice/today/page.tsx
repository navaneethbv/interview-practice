import { LearningShell } from "@/components/learning/LearningShell";
import { DailyDashboard } from "@/components/learning/DailyDashboard";
import { learningCatalog } from "@/lib/learning-catalog";
export const metadata = { title: "Today's study plan" };
export default function TodayPage() {
  return (
    <LearningShell
      title="Today's study plan"
      description="A realistic daily plan built from the site's coding and business analyst catalog, with your remaining work and time budget."
    >
      <DailyDashboard tasks={learningCatalog()} />
    </LearningShell>
  );
}
