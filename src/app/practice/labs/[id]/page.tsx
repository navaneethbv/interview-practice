import { ContentFreshness } from "@/components/ContentFreshness";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { LabWorkspace } from "@/components/labs/LabWorkspace";
import { SqlLab } from "@/components/labs/SqlLab";
import { labs } from "@/lib/lab-data";
export function generateStaticParams() {
  return [...labs.map((l) => ({ id: l.id })), { id: "sql" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title:
      id === "sql"
        ? "BA SQL lab"
        : (labs.find((l) => l.id === id)?.title ?? "Lab"),
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lab = labs.find((l) => l.id === id);
  if (id !== "sql" && !lab) notFound();
  return (
    <>
      <NavBar />
      <PageHeader
        eyebrow={
          lab
            ? `${lab.level} · ${lab.minutes} minutes`
            : "Data skills · 12 exercises"
        }
        title={lab?.title ?? "Explore a business with SQL"}
      >
        {lab?.summary ??
          "Query a fictional retailer’s customers, orders and returns in a real browser-based SQLite database."}
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/practice/labs"
          className="mb-6 inline-block text-sm text-brand"
        >
          ← All project labs
        </Link>
        {lab ? <LabWorkspace lab={lab} /> : <SqlLab />}
        <ContentFreshness contentId="practice:labs" />
      </main>
      <SiteFooter />
    </>
  );
}
