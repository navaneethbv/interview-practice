import { ContentFreshness } from "@/components/ContentFreshness";
import type { Metadata } from "next";
import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { InterviewPractice } from "@/components/interviews/InterviewPractice";
export const metadata: Metadata = { title: "Interview simulations" };
export default function InterviewSimulationsPage() {
  return (
    <>
      <NavBar />
      <PageHeader
        eyebrow="Practice · structured interviews"
        title="Practice the conversation"
      >
        Build confidence in system design, business analysis and behavioral
        rounds. Think aloud, record your reasoning and reflect on the evidence.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/practice"
          className="mb-6 inline-block text-sm text-blue hover:underline"
        >
          ← All practice modes
        </Link>
        <InterviewPractice />
        <ContentFreshness contentId="practice:interviews" />
      </main>
      <SiteFooter />
    </>
  );
}
