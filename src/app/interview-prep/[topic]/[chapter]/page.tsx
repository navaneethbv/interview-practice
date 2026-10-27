import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import { ReaderTools } from "@/components/ReaderTools";
import { StudyActions } from "@/components/StudyActions";
import { ComplexityNote } from "@/components/interview-prep/ComplexityNote";
import { prepChapters, prepTopic, chaptersFor } from "@/lib/technical-prep";
type Props = Readonly<{ params: Promise<{ topic: string; chapter: string }> }>;
export function generateStaticParams() {
  return prepChapters.map((c) => ({ topic: c.topic, chapter: c.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  return {
    title:
      prepChapters.find((c) => c.topic === p.topic && c.id === p.chapter)
        ?.title ?? "Chapter",
  };
}
export default async function ChapterPage({ params }: Props) {
  const p = await params;
  const topic = prepTopic(p.topic);
  const chapter = prepChapters.find(
    (c) => c.topic === p.topic && c.id === p.chapter,
  );
  if (!topic || !chapter) notFound();
  const siblings = chaptersFor(topic.id);
  const position = siblings.findIndex((c) => c.id === chapter.id);
  const previous = siblings[position - 1];
  const next = siblings[position + 1];
  const href = `/interview-prep/${topic.id}/${chapter.id}`;
  return (
    <>
      <NavBar />
      <PageHeader
        crumbs={[
          { href: "/interview-prep", label: "Interview Prep" },
          { href: `/interview-prep/${topic.id}`, label: topic.title },
        ]}
        eyebrow={`Chapter ${position + 1} of ${siblings.length}`}
        title={chapter.title}
      >
        {chapter.goal}
      </PageHeader>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <article className="reader-page min-w-0 rounded-2xl border border-line bg-layer-1 p-4 sm:p-8">
          <StudyActions
            href={href}
            title={chapter.title}
            section={topic.title}
          />
          <ReaderTools targetId="technical-chapter" />
          <div
            data-reader-content
            id="technical-chapter"
            className="min-w-0 space-y-7"
          >
            {chapter.sections.map((section, i) => (
              <section
                key={section.title}
                id={`section-${i + 1}`}
                className="scroll-mt-20"
              >
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 leading-8 text-fg-2">{section.body}</p>
              </section>
            ))}
            <section>
              <h2 className="text-xl font-semibold">Worked Java example</h2>
              <p className="mt-2 text-sm text-fg-3">
                Illustrative snippet: imports, surrounding types or
                collaborators may be omitted. Read the assumptions before
                adapting it.
              </p>
              <pre className="mt-4 max-w-full overflow-x-auto rounded-xl border border-line bg-layer-2 p-4 text-sm leading-6">
                <code>{chapter.code}</code>
              </pre>
              <h3 className="mt-5 font-semibold">Walkthrough</h3>
              <p className="mt-2 leading-8 text-fg-2">{chapter.walkthrough}</p>
              <ComplexityNote value={chapter.complexity} />
            </section>
            <section className="rounded-xl border border-line p-5">
              <h2 className="text-xl font-semibold">Practice it yourself</h2>
              <p className="mt-3 leading-8 text-fg-2">{chapter.exercise}</p>
              <details className="mt-3">
                <summary className="cursor-pointer py-2 font-medium text-brand">
                  Check your reasoning
                </summary>
                <p className="mt-2 leading-8 text-fg-2">{chapter.solution}</p>
              </details>
            </section>
            <section>
              <h2 className="text-xl font-semibold">Recall checklist</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-fg-2">
                <li>Explain the main invariant or contract without looking.</li>
                <li>Trace the example and test an edge case.</li>
                <li>
                  State time, space, input variables and assumptions where
                  relevant.
                </li>
                <li>Explain one alternative and when you would choose it.</li>
              </ul>
            </section>
          </div>
          <nav
            aria-label="Chapter navigation"
            className="reader-hide mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-5 text-sm"
          >
            {previous && (
              <Link
                className="text-brand underline"
                href={`/interview-prep/${topic.id}/${previous.id}`}
              >
                ← {previous.title}
              </Link>
            )}
            {next ? (
              <Link
                className="text-brand underline"
                href={`/interview-prep/${topic.id}/${next.id}`}
              >
                {next.title} →
              </Link>
            ) : (
              <Link
                className="text-brand underline"
                href={`/interview-prep/${topic.id}#question-bank`}
              >
                Practice the interview questions →
              </Link>
            )}
          </nav>
        </article>
        <section className="mt-6 text-sm text-fg-3">
          <h2 className="font-medium">Read further</h2>
          <ul className="mt-2 space-y-2">
            {topic.sources.map((s) => (
              <li key={s.url}>
                <a
                  className="text-brand underline"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
