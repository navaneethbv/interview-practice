import { LearningShell } from "@/components/learning/LearningShell";
import { Readiness } from "@/components/learning/Readiness";
import { practiceCatalog } from "@/lib/practice-catalog";
export const metadata = { title: "Readiness evidence" };
export default function ReadinessPage() {
  const { entries } = practiceCatalog();
  return (
    <LearningShell
      title="Readiness evidence"
      description="See the difference between lessons you've read, skills you've tested and rounds you've practiced."
    >
      <Readiness codingIds={Object.keys(entries)} codingEntries={entries} />
    </LearningShell>
  );
}
