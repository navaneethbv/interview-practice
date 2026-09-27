import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SetTable } from "@/components/SetTable";
import { SetTabs } from "@/components/SetTabs";
import { getSet, listSets, setRows } from "@/lib/content";
import { lcProgressId } from "@/lib/content-types";

export const dynamicParams = false;

export function generateStaticParams() {
  return listSets().map((s) => ({ setId: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ setId: string }> }): Promise<Metadata> {
  return { title: getSet((await params).setId)?.title ?? "Problems" };
}

export default async function SetPage({ params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params;
  const set = getSet(setId);
  if (!set) notFound();
  const rows = setRows(set);

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <SetTabs sets={listSets()} active={set.id} />
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">{set.title}</h1>
        <p className="mb-6 text-fg-2">
          {set.description} Solve coding problems in Python or Java and database problems in SQLite; progress is tracked for this list on its own.
        </p>
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
    </>
  );
}
