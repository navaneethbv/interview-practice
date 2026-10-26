import Link from "next/link";

const days: [string, string, string][] = [
  ["Foundations · BA role", "Read What a Business Analyst Does. Start a glossary of 10 terms and explain, in your own words, the need, solution and value in a familiar process.", "60 min"],
  ["Foundations · BABOK", "Finish the foundations chapter. Explain the six core concepts with one example each, then take the chapter quiz and review every answer.", "60 min"],
  ["Stakeholders · discovery", "List everyone affected by a delayed expense reimbursement: employees, approvers, finance, IT, support, compliance and customers.", "60 min"],
  ["Stakeholders · analysis", "Use a power/interest grid and make a small RACI for discovery, requirements, approval, delivery and UAT.", "60 min"],
  ["Stakeholders · elicitation", "Compare interviews, workshops, observation, documents, surveys and prototypes. Choose two methods and explain why.", "60 min"],
  ["Stakeholders · practice", "Draft 8 open questions for an employee, approver and finance analyst. Summarize findings, open questions and decisions; take the chapter quiz.", "60 min"],
  ["Requirements · types", "Study business, stakeholder, functional, non-functional and transition requirements. Write one example of each.", "60 min"],
  ["Requirements · quality", "Improve vague requests. Add measurable outcomes, rules, permissions, error cases and performance needs.", "60 min"],
  ["Requirements · stories", "Write 3 user stories with Given/When/Then acceptance criteria. Check that each is small and testable.", "60 min"],
  ["Requirements · lifecycle", "Link a business goal to requirements and tests. Practice prioritization, traceability and change control; take the chapter quiz.", "60 min"],
  ["Process modeling · as-is", "Draw the current expense process. Include decisions, handoffs, waits, rework and exceptions.", "60 min"],
  ["Process modeling · to-be", "Draw an improved process with swimlanes. Label who owns each step and what changes.", "60 min"],
  ["Process modeling · notation", "Study flowcharts, swimlanes and BPMN. Explain the meaning of the key symbols using your own example.", "60 min"],
  ["Process modeling · data and scope", "Study SIPOC, use cases and data models. Define 5 data fields with meaning, type, allowed values and source; take the chapter quiz.", "60 min"],
  ["Analysis · root cause", "Use 5 Whys and a fishbone diagram. Stop at a cause that can be checked with evidence.", "60 min"],
  ["Analysis · prioritize", "Use Pareto to rank sample delay reasons. Identify the gap between today's process and the target.", "60 min"],
  ["Analysis · strategy", "Study SWOT, PESTLE and feasibility. Compare two options by cost, benefit, risk, time and operational impact.", "60 min"],
  ["Analysis · business case", "Estimate one-time and ongoing costs, benefits, assumptions and risks. Define success measures; take the chapter quiz.", "60 min"],
  ["Agile · delivery methods", "Compare Waterfall, Agile and hybrid. Explain when each fits and how a BA contributes.", "60 min"],
  ["Agile · Scrum and Kanban", "Study roles, events, artifacts, stories, refinement, estimation and flow. Explain the BA's role; take the chapter quiz.", "60 min"],
  ["Coordination · status and priorities", "Practice tracking several initiatives. Write a status update with progress, next steps, risks and a clear decision request.", "60 min"],
  ["Coordination · RAID and change", "Create a RAID log with owner, next action and due date. Study dependencies, escalation and organizational change; take the chapter quiz.", "60 min"],
  ["Testing · test design", "Review test levels and types. Turn 3 acceptance criteria into test scenarios and test cases with expected results.", "60 min"],
  ["Testing · UAT and release", "Practice severity versus priority, defect triage, UAT, cutover, rollback and hypercare. Make a go/no-go checklist; take the quiz.", "60 min"],
  ["Excel and SQL · data basics", "Learn rows, columns, tables, keys and data types. Practice sorting, filtering, SUM, COUNTIF and basic cleanup.", "60 min"],
  ["Excel and SQL · formulas", "Practice IF, XLOOKUP or VLOOKUP, text/date cleanup and error checks on a small sample.", "60 min"],
  ["Excel and SQL · pivot tables", "Summarize sample expenses by department, status and month. Write one useful finding and one data-quality caveat.", "60 min"],
  ["Excel and SQL · SQL basics", "Practice SELECT, WHERE, ORDER BY, COUNT, SUM, GROUP BY and HAVING. Predict the result before running queries.", "60 min"],
  ["Excel and SQL · joins and quality", "Practice INNER/LEFT JOIN, NULL, CASE and a simple CTE. Check for duplicates and missing values; take the chapter quiz.", "60 min"],
  ["KPIs · choose measures", "Study metrics, KPIs, OKRs and leading/lagging indicators. Define formula, baseline, target, owner and data source for one KPI.", "60 min"],
  ["KPIs · report and explain", "Sketch a simple dashboard and choose appropriate charts. Present one insight, evidence and recommendation; take the chapter quiz.", "60 min"],
  ["Process improvement · Lean", "Learn common waste, DMAIC, PDCA and Kaizen. Choose one waste in the case process and propose a measurable experiment; take the quiz.", "60 min"],
  ["Banking and finance · basics", "Review assets, liabilities, equity, debits, credits, general ledger and reconciliation. Explain one example in plain language.", "60 min"],
  ["Banking and finance · controls", "Study payments, reconciliation breaks, maker-checker controls and financial statements. Explain risks of a bad process change; take the quiz.", "60 min"],
  ["Communication · clear writing", "Write a short decision email using bottom line first. Record a 2-minute explanation of a process map for a non-technical audience.", "60 min"],
  ["Communication · conflict and influence", "Practice a response to two stakeholders who disagree. Find their interests, use evidence, offer options and document the decision; take the quiz.", "60 min"],
  ["Interview prep · your story", "Draft a 60–90 second introduction and four STAR stories: elicitation, conflict, improvement and data. Use truthful results only.", "60 min"],
  ["Interview prep · case and mock", "Walk through a case from problem and stakeholders to requirements, process map, UAT and success measures. Answer common questions aloud; take the chapter quiz.", "60 min"],
  ["Final review", "Take the final exam in one sitting. Review missed answers, revisit the weakest chapter and explain your case study in 5 minutes.", "60–90 min"],
];

const chapterIds = [
  "foundations", "foundations",
  "stakeholders-elicitation", "stakeholders-elicitation", "stakeholders-elicitation", "stakeholders-elicitation",
  "requirements", "requirements", "requirements", "requirements",
  "process-modeling", "process-modeling", "process-modeling", "process-modeling",
  "analysis-techniques", "analysis-techniques", "analysis-techniques", "analysis-techniques",
  "agile-delivery", "agile-delivery",
  "project-coordination", "project-coordination",
  "testing-uat", "testing-uat",
  "data-sql-excel", "data-sql-excel", "data-sql-excel", "data-sql-excel", "data-sql-excel",
  "kpis-reporting", "kpis-reporting",
  "process-improvement",
  "banking-finance", "banking-finance",
  "communication", "communication",
  "interview-prep", "interview-prep",
  "final",
];

export function BaStudyPlan() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Link href="/business-analyst" className="text-sm font-medium text-brand hover:underline">← Back to Business Analyst Prep</Link>
      <header className="mt-5 rounded-3xl border border-line bg-layer-1 p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Beginner study plan</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">39 study sessions from zero to interview-ready</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-fg-2">Plan for about 60 minutes per study day. These are 39 study sessions, not a deadline; take rest or catch-up days whenever you need them. Each session combines course reading with a small task so you can apply the ideas. At five sessions a week, the plan takes about eight weeks.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">20 min</b><span className="text-sm text-fg-2">Read the assigned lessons</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">30 min</b><span className="text-sm text-fg-2">Complete the practice task</span></div>
          <div className="rounded-xl bg-layer-2 p-3"><b className="block text-sm">10 min</b><span className="text-sm text-fg-2">Recall key ideas without notes</span></div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-2">Take each chapter quiz after its lessons and review every explanation, including correct answers. If a topic is new, repeat that session before moving on. The final exam unlocks after all chapter quizzes are passed.</p>
      </header>
      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-layer-1 shadow-card">
        <h2 className="border-b border-line bg-layer-2 px-5 py-4 text-lg font-semibold">Daily schedule</h2>
        <ol className="divide-y divide-line">
          {days.map(([title, task, time], index) => (
            <li key={title} className="grid gap-2 px-5 py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-start">
              <span className="text-sm font-semibold text-brand">Day {index + 1}</span>
              <div><h3 className="font-medium"><Link href={chapterIds[index] === "final" ? "/business-analyst/final" : `/business-analyst/${chapterIds[index]}`} className="hover:text-brand hover:underline">{title}</Link></h3><p className="mt-1 text-sm leading-relaxed text-fg-2">{task}</p></div>
              <span className="text-xs text-fg-3 sm:pt-1">{time}</span>
            </li>
          ))}
        </ol>
      </section>
      <details className="mt-6 rounded-2xl border border-line bg-layer-1 p-5">
        <summary className="cursor-pointer font-semibold">Starter data for the Excel and SQL sessions</summary>
        <p className="mt-2 text-sm leading-relaxed text-fg-2">These fictional rows are enough to practice formulas, pivot tables, grouping, joins and basic data checks. Add a duplicate or blank value to practice finding quality issues.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[38rem] text-left text-sm">
            <thead className="border-b border-line text-fg-2"><tr><th className="p-2">Expense ID</th><th className="p-2">Department</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Submitted</th></tr></thead>
            <tbody className="divide-y divide-line">
              <tr><td className="p-2">E-101</td><td className="p-2">Finance</td><td className="p-2">$125.00</td><td className="p-2">Paid</td><td className="p-2">2026-09-04</td></tr>
              <tr><td className="p-2">E-102</td><td className="p-2">Sales</td><td className="p-2">$48.50</td><td className="p-2">Pending</td><td className="p-2">2026-09-05</td></tr>
              <tr><td className="p-2">E-103</td><td className="p-2">Operations</td><td className="p-2">$310.00</td><td className="p-2">Rejected</td><td className="p-2">2026-09-07</td></tr>
              <tr><td className="p-2">E-104</td><td className="p-2">Finance</td><td className="p-2">$72.25</td><td className="p-2">Pending</td><td className="p-2">2026-09-08</td></tr>
              <tr><td className="p-2">E-105</td><td className="p-2">Sales</td><td className="p-2">$180.00</td><td className="p-2">Paid</td><td className="p-2">2026-09-09</td></tr>
              <tr><td className="p-2">E-106</td><td className="p-2">Operations</td><td className="p-2">$95.00</td><td className="p-2">Pending</td><td className="p-2">2026-09-10</td></tr>
              <tr><td className="p-2">E-107</td><td className="p-2">Finance</td><td className="p-2">$42.00</td><td className="p-2">Paid</td><td className="p-2">2026-09-10</td></tr>
              <tr><td className="p-2">E-108</td><td className="p-2">Sales</td><td className="p-2">$215.00</td><td className="p-2">Pending</td><td className="p-2">2026-09-12</td></tr>
            </tbody>
          </table>
        </div>
      </details>
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
