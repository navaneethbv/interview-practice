import Link from "next/link";

const days: [string, string, string][] = [
  ["BA foundations", "Read the first foundations lessons. Start a glossary of 10 terms and write, in your own words, what a BA does.", "60 min"],
  ["BABOK concepts", "Finish foundations. Explain Change, Need, Solution, Stakeholder, Value and Context using one familiar business process. Take the chapter quiz.", "60 min"],
  ["Stakeholder discovery", "List everyone affected by a delayed expense reimbursement: employees, approvers, finance, IT, support and compliance.", "60 min"],
  ["Stakeholder analysis", "Use a power/interest grid and make a small RACI for requirements, approval, delivery and UAT.", "60 min"],
  ["Elicitation", "Compare interviews, workshops, observation, documents, surveys and prototypes. Choose two methods and explain why. Take the chapter quiz.", "60 min"],
  ["Interview practice", "Draft 8 open questions for an employee, approver and finance analyst. Practice neutral follow-ups.", "60 min"],
  ["Requirements overview", "Study business, stakeholder, functional, non-functional and transition requirements. Write one example of each.", "60 min"],
  ["Testable requirements", "Improve vague requests. Add measurable outcomes, rules, permissions, error cases and performance needs.", "60 min"],
  ["Stories and acceptance criteria", "Write 3 user stories with Given/When/Then acceptance criteria. Check each is small and testable.", "60 min"],
  ["Prioritization and traceability", "Link a business goal to requirements and tests. Practice prioritization and change control; take the chapter quiz.", "60 min"],
  ["As-is process", "Draw the current expense process. Include decisions, handoffs, waits, rework and exceptions.", "60 min"],
  ["To-be process", "Draw an improved process with swimlanes. Label who owns each step and what changes.", "60 min"],
  ["BPMN, SIPOC and value stream", "Study the symbols and purpose of each method. Choose the simplest useful model for a given question.", "60 min"],
  ["Use cases and data models", "Define 5 important fields in a data dictionary: name, meaning, type, allowed values and source. Take the chapter quiz.", "60 min"],
  ["Root cause", "Use 5 Whys and a fishbone diagram. Stop at a cause that can be checked with evidence.", "60 min"],
  ["Pareto and gap analysis", "Rank sample delay reasons and identify the gap between today's process and the target.", "60 min"],
  ["Strategy tools", "Study SWOT, PESTLE and feasibility. Compare two solution options by cost, benefit, risk and time.", "60 min"],
  ["Business case", "Estimate one-time and ongoing costs, benefits, assumptions and risks. Define how success will be measured; take the quiz.", "60 min"],
  ["Delivery methods", "Compare Waterfall, Agile and hybrid. Explain how a BA contributes in each.", "60 min"],
  ["Scrum and Kanban", "Study roles, events, artifacts, stories, refinement and flow. Practice explaining the BA's role; take the quiz.", "60 min"],
  ["Coordination and risk", "Create a RAID log with an owner, next action and date. Write a clear status update with a decision request.", "60 min"],
  ["Testing", "Turn 3 acceptance criteria into test scenarios and test cases with expected results.", "60 min"],
  ["UAT and release", "Practice severity versus priority. Make a go/no-go checklist with cutover, rollback and hypercare; take the quiz.", "60 min"],
  ["Data and Excel basics", "Learn rows, columns, tables, keys and data types. Practice sort, filter, SUM, COUNTIF and cleanup.", "60 min"],
  ["Excel analysis", "Practice IF, XLOOKUP or VLOOKUP, and pivot tables. Summarize sample expenses by department and status.", "60 min"],
  ["SQL fundamentals", "Practice SELECT, WHERE, ORDER BY, COUNT, SUM, GROUP BY and HAVING. Predict results before running queries.", "60 min"],
  ["SQL joins and data quality", "Practice INNER/LEFT JOIN, NULL, CASE and a simple CTE. Check duplicates and missing values; take the quiz.", "60 min"],
  ["KPIs and dashboards", "Define a KPI with formula, baseline, target, owner, data source and reporting frequency. Sketch a simple dashboard.", "60 min"],
  ["Process improvement and banking", "Review Lean, DMAIC and PDCA, then accounting, reconciliation, payments and controls. Take both chapter quizzes.", "60 min"],
  ["Communication and interview case", "Practice a 90-second introduction and two STAR answers. Present a mini-case from problem to requirements, UAT and success measures. Take remaining quizzes and the final exam when unlocked.", "60–90 min"],
];

export function BaStudyPlan() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Link href="/business-analyst" className="text-sm font-medium text-brand hover:underline">← Back to Business Analyst Prep</Link>
      <header className="mt-5 rounded-3xl border border-line bg-layer-1 p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Beginner study plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">30 study sessions from zero to interview-ready</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-2">Plan for about 60 minutes per study day. These are 30 study sessions, not a deadline; take rest or catch-up days whenever you need them. Each session combines course reading with a small task so you can apply the ideas.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">20 min</b><span className="text-sm text-fg-2">Read the assigned lessons</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">30 min</b><span className="text-sm text-fg-2">Complete the practice task</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">10 min</b><span className="text-sm text-fg-2">Recall key ideas without notes</span></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-2">Take each chapter quiz after its lessons and review every explanation, including correct answers. If a topic is new, repeat that session before moving on.</p>
      </header>
      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-layer-1 shadow-card">
        <h2 className="border-b border-line bg-layer-2 px-5 py-4 text-lg font-semibold">Daily schedule</h2>
        <ol className="divide-y divide-line">
          {days.map(([title, task, time], index) => (
            <li key={title} className="grid gap-2 px-5 py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-start">
              <span className="text-sm font-semibold text-brand">Day {index + 1}</span>
              <div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-fg-2">{task}</p></div>
              <span className="text-xs text-fg-3 sm:pt-1">{time}</span>
            </li>
          ))}
        </ol>
      </section>
      <aside className="mt-8 rounded-2xl border border-brand/30 bg-brand-soft p-5">
        <h2 className="font-semibold">You are ready to apply when you can…</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-fg-2">
          <li>Explain a problem, its cause, stakeholders and value in plain language.</li>
          <li>Map a process, write requirements and acceptance criteria, and prioritize sensibly.</li>
          <li>Use basic Excel and SQL to answer a business question and check data quality.</li>
          <li>Support UAT, communicate risks and walk through a case from discovery to measured results.</li>
        </ul>
      </aside>
    </main>
  );
}
