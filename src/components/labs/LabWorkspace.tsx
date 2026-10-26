"use client";
import { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Download,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  careerAnswers,
  glossary,
  labs,
  prerequisites,
  workbooks,
  type Lab,
} from "@/lib/lab-data";
import { saveLabAttempt, useLabState } from "@/lib/lab-storage";
const panel = "rounded-2xl border border-line bg-layer-1 p-5 sm:p-7";
export function LabsIndex() {
  const state = useLabState();
  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          [
            "01",
            "Discover & define",
            "Turn an ambiguous brief into requirements and a testable plan.",
          ],
          [
            "02",
            "Explore the data",
            "Use real SQL and downloadable Excel cases to validate a decision.",
          ],
          [
            "03",
            "Make the call",
            "Practice senior tradeoffs, governance and measurable outcomes.",
          ],
        ].map(([n, t, d]) => (
          <div className={panel} key={n}>
            <p className="font-mono text-sm text-brand">
              {n} / LEARNING BY DOING
            </p>
            <h2 className="mt-3 text-lg font-semibold">{t}</h2>
            <p className="mt-2 text-sm text-fg-2">{d}</p>
          </div>
        ))}
      </section>
      <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Start here · 2 hours · Portfolio project
          </span>
          <h2 className="mt-3 text-3xl font-semibold">
            A brief is only the beginning.
          </h2>
          <p className="mt-4 max-w-xl text-fg-2">
            Follow Northstar Retail from slow refunds to a proposed future
            process. Build six connected artifacts, compare worked examples and
            keep your own drafts.
          </p>
          <Link
            href="/practice/labs/returns-transformation"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-fg-1 px-4 py-3 font-medium text-layer-1"
          >
            Open the project <ArrowRight size={17} />
          </Link>
          <p className="mt-4 text-sm text-fg-2">
            {state["returns-transformation"]?.checks.length ?? 0} of 8 review
            checks complete
          </p>
        </div>
        <BeginnerGuide />
      </section>
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand">
              Data skills
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              From rows to a recommendation
            </h2>
          </div>
          <Link
            href="/practice/labs/sql"
            className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm hover:bg-layer-2"
          >
            Open SQL playground <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {workbooks.map((w) => (
            <article key={w.id} className={panel}>
              <p className="text-xs font-medium text-brand">
                EXCEL · HANDS-ON WORKBOOK
              </p>
              <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
              <ol className="my-4 list-decimal space-y-2 pl-5 text-sm text-fg-2">
                {w.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-2 rounded-lg bg-fg-1 px-3 py-2 text-sm font-medium text-layer-1"
                  href={`/practice-workbooks/${w.id}-practice.xlsx`}
                  download
                >
                  <Download size={14} />
                  Practice
                </a>
                <a
                  className="rounded-lg border border-line px-3 py-2 text-sm hover:bg-layer-2"
                  href={`/practice-workbooks/${w.id}-answers.xlsx`}
                  download
                >
                  Answer workbook
                </a>
              </div>
              <details className="mt-4 text-sm">
                <summary className="cursor-pointer text-brand">
                  Check your conclusion
                </summary>
                <p className="mt-2 leading-6 text-fg-2">{w.answer}</p>
              </details>
            </article>
          ))}
        </div>
        <p className="mt-3 text-xs text-fg-3">
          Fictional datasets. Work in a spreadsheet app; answer files include
          editable formulas and pivot-ready data. Formulas recalculate when
          opened in Excel or LibreOffice.
        </p>
      </section>
      <section>
        <p className="text-xs uppercase tracking-widest text-brand">
          Senior practice · 35 minutes each
        </p>
        <h2 className="mb-5 mt-2 text-2xl font-semibold">
          Decisions with consequences
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {labs.slice(1).map((l) => (
            <Link
              href={`/practice/labs/${l.id}`}
              className={`${panel} transition hover:border-brand/50 hover:shadow-card`}
              key={l.id}
            >
              <div className="flex items-center justify-between gap-2">
                <BookOpen size={19} className="text-brand" />
                {state[l.id]?.checks.length === l.rubric.length && (
                  <CheckCircle2 size={18} className="text-brand" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{l.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-2">{l.summary}</p>
              <p className="mt-5 text-sm font-medium text-brand">
                Enter simulation →
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className={panel}>
        <p className="text-xs uppercase tracking-widest text-brand">
          Returning to work
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Explain your experience honestly
        </h2>
        <p className="mt-3 text-sm text-fg-2">
          Use these as structures, then adapt them to your actual history.
          Practice projects demonstrate preparation; real work stories
          demonstrate experience.
        </p>
        <div className="mt-4 divide-y divide-line">
          {careerAnswers.map((a) => (
            <details key={a.question} className="py-4">
              <summary className="cursor-pointer font-medium">
                {a.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-fg-2">
                {a.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
function BeginnerGuide() {
  const state = useLabState();
  const attempt = state["beginner-readiness"] ?? {
    draft: "",
    checks: [],
    updated: 0,
  };
  return (
    <section className={panel}>
      <p className="text-xs uppercase tracking-widest text-brand">
        New to business analysis?
      </p>
      <h2 className="mt-2 text-xl font-semibold">Your starting toolkit</h2>
      <p className="mt-2 text-sm text-fg-2">
        Read the glossary, then try these checks. Unchecked items are a learning
        route, not a gate.
      </p>
      <div className="mt-4 space-y-3">
        {prerequisites.map((p, i) => (
          <label className="flex items-start gap-3 text-sm" key={p}>
            <input
              type="checkbox"
              className="mt-1 accent-[var(--brand)]"
              checked={attempt.checks.includes(String(i))}
              onChange={(e) =>
                saveLabAttempt("beginner-readiness", {
                  ...attempt,
                  checks: e.target.checked
                    ? [...attempt.checks, String(i)]
                    : attempt.checks.filter((c) => c !== String(i)),
                  updated: Date.now(),
                })
              }
            />
            {p}
          </label>
        ))}
      </div>
      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-brand">
          Open the BA glossary
        </summary>
        <dl className="mt-4 space-y-3">
          {glossary.map(([t, d]) => (
            <div key={t}>
              <dt className="text-sm font-semibold">{t}</dt>
              <dd className="mt-1 text-sm text-fg-2">{d}</dd>
            </div>
          ))}
        </dl>
      </details>
    </section>
  );
}
export function LabWorkspace({ lab }: Readonly<{ lab: Lab }>) {
  const state = useLabState();
  const [message, setMessage] = useState("");
  const attempt = state[lab.id] ?? { draft: "", checks: [], updated: 0 };
  function update(p: Partial<typeof attempt>) {
    const saved = saveLabAttempt(lab.id, {
      ...attempt,
      ...p,
      updated: Date.now(),
    });
    setMessage(
      saved
        ? "Saved in this browser."
        : "Could not save: storage is unavailable or the lab limit was reached. Export your data and copy your draft before leaving.",
    );
  }
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <section className={panel}>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            Stakeholder brief
          </p>
          <p className="mt-4 text-base leading-8 text-fg-2">{lab.brief}</p>
        </section>
        {lab.deliverables.map((d) => (
          <section className={panel} key={d.title}>
            <h2 className="text-xl font-semibold">{d.title}</h2>
            <p className="mt-3 text-sm leading-7 text-fg-2">{d.prompt}</p>
            <details className="mt-4 rounded-xl border border-line p-4">
              <summary className="cursor-pointer text-sm font-medium">
                Deliverable template
              </summary>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-6 text-fg-2">
                {d.template}
              </pre>
              <button
                type="button"
                className="mt-3 rounded-lg border border-line px-3 py-2 text-xs"
                onClick={() =>
                  update({
                    draft:
                      attempt.draft +
                      (attempt.draft ? "\n\n" : "") +
                      d.title +
                      "\n" +
                      d.template,
                  })
                }
              >
                Add template to my draft
              </button>
            </details>
            <details className="mt-3 rounded-xl bg-layer-2 p-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-brand">
                Worked example & tradeoffs <ChevronDown size={16} />
              </summary>
              <p className="mt-3 text-sm leading-7 text-fg-2">{d.model}</p>
              <p className="mt-3 text-xs text-fg-3">
                One defensible approach. Your decision can differ if your
                evidence and tradeoffs support it.
              </p>
            </details>
          </section>
        ))}
        <section className={panel}>
          <label htmlFor="lab-draft" className="text-xl font-semibold">
            Your working draft
          </label>
          <p className="mb-4 mt-2 text-sm text-fg-2">
            Write the artifacts in your own words. Use identifiers to connect
            the objective, requirements and tests.
          </p>
          <textarea
            id="lab-draft"
            maxLength={50000}
            rows={18}
            value={attempt.draft}
            onChange={(e) => update({ draft: e.target.value })}
            placeholder="Start with the business problem and what you need to learn…"
            className="w-full rounded-xl border border-line bg-layer-0 p-4 font-mono text-sm leading-7 outline-none focus:border-brand"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <output className="text-xs text-fg-3">
              {message || "Drafts and review progress stay in this browser."}
            </output>
            <button
              type="button"
              onClick={() => {
                const reviewChecks = lab.rubric
                  .map((criterion, index) => {
                    const marker = attempt.checks.includes(String(index))
                      ? "[x]"
                      : "[ ]";
                    return `${marker} ${criterion}`;
                  })
                  .join("\n");
                const blob = new Blob(
                  [
                    `${lab.title}\n\n${attempt.draft}\n\nReview checks:\n${reviewChecks}`,
                  ],
                  { type: "text/plain" },
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${lab.id}-draft.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm"
            >
              <Download size={15} />
              Export draft
            </button>
          </div>
        </section>
      </div>
      <aside className={`${panel} lg:sticky lg:top-24`}>
        <p className="text-xs uppercase tracking-widest text-brand">
          Self-review rubric
        </p>
        <h2 className="mt-2 text-xl font-semibold">Ready to explain it?</h2>
        <p className="mt-2 text-sm text-fg-2">
          {attempt.checks.length} / {lab.rubric.length} checks complete.
          Self-assessment, not an automatic grade.
        </p>
        <div className="my-4 h-1.5 overflow-hidden rounded-full bg-layer-3">
          <div
            className="h-full bg-brand transition-all"
            style={{
              width: `${(attempt.checks.length / lab.rubric.length) * 100}%`,
            }}
          />
        </div>
        <div className="space-y-4">
          {lab.rubric.map((r, i) => (
            <label
              className="flex cursor-pointer items-start gap-3 text-sm leading-6"
              key={r}
            >
              <input
                type="checkbox"
                className="mt-1.5"
                checked={attempt.checks.includes(String(i))}
                onChange={(e) =>
                  update({
                    checks: e.target.checked
                      ? [...attempt.checks, String(i)]
                      : attempt.checks.filter((v) => v !== String(i)),
                  })
                }
              />
              {r}
            </label>
          ))}
        </div>
        <p className="mt-6 border-t border-line pt-4 text-xs leading-6 text-fg-3">
          Rehearse a 2-minute walkthrough: problem → evidence → options →
          decision → outcome. Explain what you would validate next.
        </p>
      </aside>
    </div>
  );
}
