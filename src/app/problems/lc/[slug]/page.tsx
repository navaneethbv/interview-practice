import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonContent } from "@/components/LessonContent";
import { Workspace, type WorkspaceNav } from "@/components/workspace/Workspace";
import { DifficultyPill, Tag } from "@/components/ui";
import { getLcProblem, lcAuthored, renderBlocks, setsContaining } from "@/lib/content";
import { lcProgressId } from "@/lib/content-types";
import { generateStarter } from "@/lib/judge/starter";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...lcAuthored()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const problem = getLcProblem((await params).slug);
  return { title: problem ? `${problem.meta.number}. ${problem.meta.title}` : "Problem" };
}

/** Default header links follow the first list containing the problem; ?set= overrides them in the browser. */
function defaultNav(slug: string): WorkspaceNav {
  const set = setsContaining(slug)[0];
  if (!set) return { list: "/problems", prev: null, next: null };
  const authored = lcAuthored();
  const order = set.items.map((it) => it.slug).filter((s) => authored.has(s));
  const i = order.indexOf(slug);
  const href = (s: string) => `/problems/lc/${s}?set=${set.id}`;
  return {
    list: `/problems/sets/${set.id}`,
    prev: i > 0 ? href(order[i - 1]) : null,
    next: i >= 0 && i < order.length - 1 ? href(order[i + 1]) : null,
  };
}

export default async function LcProblemPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const problem = getLcProblem(slug);
  if (!problem) notFound();
  const { meta, spec, reference } = problem;
  const title = `${meta.number}. ${meta.title}`;
  const referenceBlocks = reference && spec.kind !== "sql" ? await renderBlocks([{ t: "code", python: reference }]) : [];

  return (
    <Workspace
      id={lcProgressId(slug)}
      listSlug={slug}
      title={title}
      spec={spec}
      reference={reference}
      starters={spec.kind === "sql" ? { sql: generateStarter(spec, "sql") } : { python: generateStarter(spec, "python"), java: generateStarter(spec, "java") }}
      nav={defaultNav(slug)}
      description={
        <>
          <h1 className="mb-3 text-xl font-semibold tracking-tight">{title}</h1>
          <div className="mb-5 flex flex-wrap gap-2">
            <DifficultyPill difficulty={meta.difficulty} />
            {meta.acceptance !== undefined && <Tag>Acceptance {meta.acceptance.toFixed(1)}%</Tag>}
            {meta.topics.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <LessonContent blocks={[{ t: "html", html: problem.statementHtml }]} />
          {meta.pattern && (
            <details className="mt-6 rounded-lg border border-line px-4 py-2.5 text-sm">
              <summary className="cursor-pointer font-medium text-fg-1">Hint</summary>
              <p className="mt-2 text-fg-2">Think about: {meta.pattern}.</p>
            </details>
          )}
        </>
      }
      solution={
        <div className="prose-lesson">
          <h2>Approach</h2>
          <p>{meta.hint ?? "No written approach for this problem yet."}</p>
          {(meta.time || meta.space) && (
            <p>
              Time complexity: <code>{meta.time ?? "?"}</code>. Space complexity: <code>{meta.space ?? "?"}</code>.
            </p>
          )}
          {referenceBlocks.length > 0 && <h2>Reference solution</h2>}
          <LessonContent blocks={referenceBlocks} />
          {spec.kind === "sql" && reference && <><h2>SQLite reference</h2><pre className="overflow-x-auto"><code>{reference}</code></pre></>}
        </div>
      }
    />
  );
}
