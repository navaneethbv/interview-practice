import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileUp } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { listDesignArticles } from "@/lib/content";

export const metadata: Metadata = { title: "System Design" };

export default function SystemDesignPage() {
  const articles = listDesignArticles();
  const groups = articles.reduce<Map<string, typeof articles>>((map, article) => {
    let label = "Imported designs";
    if (article.verbatim) label = "Verbatim source archives";
    else if (article.source?.toLowerCase().includes("advanced")) label = "Advanced distributed systems";
    else if (article.source?.toLowerCase().includes("system design")) label = "System design case studies";
    map.set(label, [...(map.get(label) ?? []), article]);
    return map;
  }, new Map());
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">System Design</h1>
        <p className="mb-8 max-w-2xl text-fg-2">
          Read the prompt, draft your own design with the interview checklist, then compare it with the reference
          design.
        </p>

        {articles.length ? (
          <div className="space-y-10">
            {[...groups.entries()].map(([label, entries]) => (
              <section key={label} aria-labelledby={`design-group-${label.replaceAll(" ", "-").toLowerCase()}`}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h2 id={`design-group-${label.replaceAll(" ", "-").toLowerCase()}`} className="text-lg font-semibold">
                    {label}
                  </h2>
                  <span className="text-xs text-fg-3">{entries.length} pages</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {entries.map((a) => (
                    <Link
                      key={a.id}
                      href={`/system-design/${a.id}`}
                      className="group rounded-xl border border-line bg-layer-1 p-5 transition-colors hover:border-line-strong"
                    >
                      <h3 className="mb-1 flex items-center gap-1.5 font-semibold">
                        {a.title}
                        <ArrowRight size={15} className="text-fg-3 transition-transform group-hover:translate-x-0.5" />
                      </h3>
                      {a.summary && <p className="line-clamp-3 text-sm text-fg-2">{a.summary}</p>}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line-strong bg-layer-1 px-6 py-12 text-center">
            <FileUp size={28} className="mx-auto mb-3 text-fg-3" />
            <h2 className="mb-2 font-semibold">No system design problems yet</h2>
            <p className="mx-auto max-w-md text-sm text-fg-2">
              Import a PDF or HTML file and it becomes a practice page here:
            </p>
            <pre className="mx-auto mt-4 w-fit max-w-full overflow-x-auto rounded-lg bg-layer-2 px-4 py-2.5 text-left font-mono text-[13px] text-fg-1">
              npm run ingest:doc -- ./design-a-url-shortener.pdf
            </pre>
          </div>
        )}
      </main>
    </>
  );
}
