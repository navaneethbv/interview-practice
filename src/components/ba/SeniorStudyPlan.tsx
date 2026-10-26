import Link from "next/link";

const days: [string, string][] = [
  ["Senior scope and strategic outcomes", "Read chapter 1 lessons on senior accountability and strategy. Map one strategic objective to a measurable outcome and a change hypothesis."],
  ["Operating model and capabilities", "Study operating models, capabilities and value streams. Sketch how reconciliation moves from statement receipt to exception resolution."],
  ["Roadmap and chapter quiz", "Study proportionate analysis and roadmaps. Add dependencies and decision gates to the case, take chapter 1 quiz and review explanations."],
  ["Stakeholder strategy", "Read chapter 2 on stakeholder mapping. Identify decision-makers, frontline experts, control owners and affected groups across three regions."],
  ["Executive discovery", "Draft a one-page executive pre-read. Practice questions that clarify outcomes, constraints, decisions and trade-offs."],
  ["Ambiguity and chapter quiz", "Test one risky hypothesis, facilitate a disagreement and record decision rights. Take chapter 2 quiz and review explanations."],
  ["Compare solution options", "Read chapter 3 on options and architecture partnership. Compare improve-current, shared-service and phased-replacement options."],
  ["Quality, controls and data", "Define measurable performance, availability, access, audit and exception-handling needs. Sketch a source-to-report data flow."],
  ["Rules and chapter quiz", "Write a decision table for matching and overrides. Trace one outcome to a requirement and test; take chapter 3 quiz."],
  ["Business architecture", "Read chapter 4 on capabilities, value streams and current-state evidence. List data needed to compare regions fairly."],
  ["Target operating model", "Define future roles, processes, systems, information and controls. Validate a regional variation with a plausible business reason."],
  ["Transitions and chapter quiz", "Create two intermediate states with entry/exit criteria and rollback needs. Take chapter 4 quiz and review explanations."],
  ["Governance", "Read chapter 5 on decision forums and decision records. Decide what teams can choose and what requires sponsor or control-owner approval."],
  ["Dependencies and risk", "Map data feeds, identity, ledger and control dependencies. Add triggers, response owners and escalation paths."],
  ["Portfolio delivery and chapter quiz", "Align work across teams using shared outcomes and evidence. Review scope-change impacts; take chapter 5 quiz."],
  ["Business case", "Read chapter 6 and compare cost, benefit, risk and time to value for two options. List the assumptions that could change your recommendation."],
  ["Benefits map and baseline", "Connect outputs to changed capabilities and outcomes. Define a baseline population, formula, period and data source."],
  ["Ownership and chapter quiz", "Assign business owners, targets and review dates to benefits. Run a sensitivity check; take chapter 6 quiz."],
  ["Readiness and adoption", "Read chapter 7. Identify adoption risks by region and define observable readiness criteria."],
  ["Communication and training", "Write role-based messages and a realistic training scenario for normal work and exceptions."],
  ["Coaching and chapter quiz", "Create a mentoring plan for an analyst and propose one lightweight practice standard. Take chapter 7 quiz."],
  ["Senior interview stories", "Read chapter 8. Draft STAR stories for strategy, ambiguity, conflict, governance, value and mentoring."],
  ["Executive recommendation", "Prepare a one-page decision brief with options, evidence, risks, assumptions, owner and next steps."],
  ["Integrated case and chapter quiz", "Complete the capstone from problem framing through options, target model, roadmap and benefits. Use the checklist and take chapter 8 quiz."],
  ["Capstone: frame and discover", "Assemble the strategic fit, measurable problem, stakeholder map, decision rights and evidence plan."],
  ["Capstone: shape the solution", "Add current/target states, credible options, quality needs, controls, integration and transition choices."],
  ["Capstone: plan delivery", "Add a roadmap, governance, dependencies, risk responses, pilot criteria and fallback plan."],
  ["Capstone: prove value", "Add a benefits map with baselines, targets, sources, owners and review dates. Check assumptions and evidence."],
  ["Mock interview", "Present the case in five minutes, then practice follow-ups about cost, risk, controls, regional variation and what you would change."],
  ["Final exam and self-review", "Take the 30-question senior final exam. Review missed answers and self-review the decision pack for evidence, traceability, owners, risks and measurable value. Allow 90 minutes."],
];

const chapterIds = [
  "senior-strategic-partnership", "senior-strategic-partnership", "senior-strategic-partnership",
  "senior-complex-discovery", "senior-complex-discovery", "senior-complex-discovery",
  "senior-solution-shaping", "senior-solution-shaping", "senior-solution-shaping",
  "senior-business-architecture", "senior-business-architecture", "senior-business-architecture",
  "senior-governance-delivery", "senior-governance-delivery", "senior-governance-delivery",
  "senior-value-realization", "senior-value-realization", "senior-value-realization",
  "senior-change-coaching", "senior-change-coaching", "senior-change-coaching",
  "senior-interview-capstone", "senior-interview-capstone", "senior-interview-capstone",
  "senior-interview-capstone", "senior-interview-capstone", "senior-interview-capstone",
  "senior-interview-capstone", "senior-interview-capstone", "final",
];

export function SeniorStudyPlan() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Link href="/business-analyst/senior" className="text-sm font-medium text-brand hover:underline">← Back to Senior BA Track</Link>
      <header className="mt-5 rounded-3xl border border-line bg-layer-1 p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Advanced study plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">30 sessions for senior BA practice</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-2">Plan for 60–75 minutes per session; take rest or catch-up days as needed. Each session combines short lessons, applied work and recall. At five sessions a week, this is about six weeks. The final exam session takes about 90 minutes.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">20 min</b><span className="text-sm text-fg-2">Read and take notes</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">30 min</b><span className="text-sm text-fg-2">Apply the ideas to the case</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">10 min</b><span className="text-sm text-fg-2">Recall and reflect</span></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-2">Take each chapter quiz when scheduled and review every explanation. The ungraded capstone is a self-reviewed portfolio exercise; passing all eight chapter quizzes unlocks the separate 30-question final exam.</p>
      </header>
      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-layer-1 shadow-card">
        <h2 className="border-b border-line bg-layer-2 px-5 py-4 text-lg font-semibold">Daily schedule</h2>
        <ol className="divide-y divide-line">
          {days.map(([title, task], index) => (
            <li key={title} className="grid gap-2 px-5 py-4 sm:grid-cols-[5rem_1fr]">
              <span className="text-sm font-semibold text-brand">Day {index + 1}</span>
              <div>
                <h3 className="font-medium">
                  <Link href={chapterIds[index] === "final" ? "/business-analyst/senior/final" : `/business-analyst/senior/${chapterIds[index]}`} className="hover:text-brand hover:underline">{title}</Link>
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-2">{task}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside className="mt-8 rounded-2xl border border-brand/30 bg-brand-soft p-5">
        <h2 className="font-semibold">Self-review before you present the capstone</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-fg-2">
          <li>Recommendations have evidence or a clearly labeled assumption.</li>
          <li>Decisions have owners, rationale and conditions.</li>
          <li>Requirements trace from the need to verification.</li>
          <li>Risks have triggers, responses and owners.</li>
          <li>Benefits have a baseline, target, source, owner and review date.</li>
        </ul>
      </aside>
    </main>
  );
}
