import { ContentFreshness } from "@/components/ContentFreshness";
import type { Metadata } from "next";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { LabsIndex } from "@/components/labs/LabWorkspace";
export const metadata: Metadata = { title: "BA project labs" };
export default function Page() {
  return (
    <>
      <NavBar />
      <PageHeader
        eyebrow="Practice / Business analysis"
        title="Build the work. Explain the decisions."
      >
        Hands-on project labs, SQL exercises, Excel workbooks and senior
        simulations. Move from knowing the terms to producing the evidence.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <LabsIndex />
        <ContentFreshness contentId="practice:labs" />
      </main>
      <SiteFooter />
    </>
  );
}
