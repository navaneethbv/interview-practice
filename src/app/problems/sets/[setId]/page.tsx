import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListSwitcher } from "@/components/lists/ListSwitcher";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SetTable } from "@/components/SetTable";
import { ContentFreshness } from "@/components/ContentFreshness";
import { switcherOptions } from "@/lib/catalog";
import { getSet, listSets, setRows } from "@/lib/content";
import { lcProgressId } from "@/lib/content-types";

export const dynamicParams = false;

export function generateStaticParams() {
  return listSets().map((s) => ({ setId: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ setId: string }> }): Promise<Metadata> {
  return { title: getSet((await params).setId)?.title ?? "Problems" };
}

export default async function SetPage({ params }: Readonly<{ params: Promise<{ setId: string }> }>) {
  const { setId } = await params;
  const set = getSet(setId);
  if (!set) notFound();
  const rows = setRows(set);

  return (
    <>
      <NavBar />
      <PageHeader
        crumbs={[{ href: "/problems", label: "Problems" }]}
        eyebrow={set.kind === "company" ? "Company list" : undefined}
        title={set.title}
        actions={<ListSwitcher options={switcherOptions()} current={`/problems/sets/${set.id}`} />}
      >
        {set.description}{" "}
        {set.sourceUrl && (
          <a href={set.sourceUrl} target="_blank" rel="noreferrer" className="text-blue underline-offset-2 hover:underline">
            {set.sourceLabel ?? "Source"}
          </a>
        )}
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <ContentFreshness contentId={`set:${setId}`} />
        {set.snapshotDate && (
          <p className="mb-4 text-sm text-fg-3">
            “Last 30 days”, “Last 3 months” and “Last 6 months” refer to the snapshot ending on{" "}
            <time dateTime={set.snapshotDate}>{set.snapshotDate}</time>. Website report dates appear under each problem’s sources.
          </p>
        )}
        <div className="mb-6">
          <ProgressPanel
            ids={rows.map((r) => lcProgressId(r.slug))}
            difficulties={rows.map((r) => r.difficulty)}
            scope={set.id}
            scopeLabel={set.title}
            resettable
          />
        </div>
        <SetTable setId={set.id} kind={set.kind} rows={rows} />
      </main>
      <SiteFooter />
    </>
  );
}
