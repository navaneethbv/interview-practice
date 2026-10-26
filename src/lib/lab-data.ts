export interface Lab {
  id: string;
  title: string;
  level: string;
  minutes: number;
  summary: string;
  brief: string;
  deliverables: {
    title: string;
    prompt: string;
    template: string;
    model: string;
  }[];
  rubric: string[];
}
export const glossary = [
  ["Stakeholder", "A person affected by, or able to influence, a change."],
  [
    "Requirement",
    "A verifiable need or capability, with a source and purpose.",
  ],
  ["AS-IS / TO-BE", "The current process and the proposed future process."],
  [
    "Acceptance criterion",
    "An observable condition that determines whether a story is accepted.",
  ],
  [
    "Traceability",
    "Links from a business objective to requirements, delivery and tests.",
  ],
  [
    "UAT",
    "User acceptance testing: business users validate that the solution supports real work.",
  ],
  [
    "NFR",
    "A nonfunctional requirement such as response time, availability or accessibility.",
  ],
  [
    "RACI",
    "Who is Responsible, Accountable, Consulted and Informed for a decision.",
  ],
  ["Baseline", "An agreed version used to assess changes."],
  [
    "Benefit owner",
    "The named person accountable for measuring and achieving a business benefit.",
  ],
];
export const prerequisites = [
  "I can explain a business problem without naming a solution.",
  "I can distinguish a stakeholder need from an assumption.",
  "I can write one measurable acceptance criterion.",
];
export const labs: Lab[] = [
  {
    id: "returns-transformation",
    title: "From brief to business acceptance",
    level: "Beginner → intermediate",
    minutes: 120,
    summary:
      "Own a retail returns project from discovery through UAT. Build a portfolio of six connected BA artifacts.",
    brief:
      "Northstar Retail receives 1,200 online return requests per month. Agents copy email details into a spreadsheet; warehouse staff update a separate tracker. Median request-to-refund is 8 working days. 18% of cases need a second contact. The sponsor wants median refund time ≤4 working days within 90 days of launch, without increasing incorrect refunds above the current 0.5%. Budget: £60,000. Delivery window: 10 weeks. Payments integration has a 3-week lead time. Refunds above £200 need finance approval. Fraud review and statutory policy decisions remain with existing teams. All numbers are fictional training data.",
    deliverables: [
      {
        title: "1. Discovery and scope",
        prompt:
          "Identify affected roles, decision rights, evidence gaps and the smallest useful release. Separate facts, assumptions and questions. Write three discovery questions that could change scope.",
        template:
          "Problem / baseline / target:\nIn scope / out of scope:\nStakeholders (role, need, influence, approach):\nFacts / assumptions / open questions:\nDecision owner / sign-off:",
        model:
          "Operations owns the outcome; finance owns refund controls; agents and warehouse staff validate workflow; security reviews access. Include intake, status tracking and approval routing; defer automated fraud decisions. Validate whether 8 days includes customer shipping time before promising a 4-day SLA. Interview agents and sample timestamps, rather than treating a sponsor request as a proven root cause.",
      },
      {
        title: "2. AS-IS and TO-BE process",
        prompt:
          "Map at least five current steps and five future steps. Label handoffs, wait states, exception paths and control owners. Define where the clock starts and stops.",
        template:
          "AS-IS: actor → action → handoff / wait → outcome\nPain point and evidence:\nTO-BE: actor → action → decision → outcome\nException / recovery / owner:\nMetric boundary:",
        model:
          "AS-IS: customer emails → agent rekeys → warehouse checks item → agent chases status → finance refunds → customer informed. TO-BE: validated intake → case ID → warehouse scan → rule-based approval queue → finance confirms payment → status notification. Missing item and failed payment go to named exception queues. Measure accepted return request to confirmed refund; separately track shipping delays so an apparent improvement cannot hide backlog.",
      },
      {
        title: "3. Requirements and business rules",
        prompt:
          "Write three functional requirements and two NFRs with stable IDs, sources, priority and verification method. Resolve the £200 boundary explicitly.",
        template:
          "ID | requirement | source | priority | acceptance evidence\nBR-01 | approval boundary:\nNFR-01 | measurable condition:\nAssumptions and unresolved decisions:",
        model:
          "FR-01: issue a unique case ID after valid intake (agent workshop, Must). FR-02: route amounts >£200 to finance before payment (finance policy, Must). Exactly £200 follows standard approval; confirm policy currency conversion. FR-03: expose latest case status to agents. NFR-01: 95% of case lookups complete within 2 seconds under agreed peak load. NFR-02: agent can complete intake using keyboard only, verified in accessibility testing. Avoid vague words such as fast or user-friendly.",
      },
      {
        title: "4. Stories and acceptance criteria",
        prompt:
          "Produce two user stories, at least three Given/When/Then criteria per story, including a negative case and a boundary case. Include dependencies and a discussion point.",
        template:
          "US-01: As a … I want … so that …\nGiven … When … Then …\nNegative / boundary case:\nDependency / unresolved question:",
        model:
          "As a finance approver I want high-value returns queued so that unauthorized refunds cannot be sent. Given a £200.01 request, when warehouse receipt is confirmed, then the case awaits finance approval and payment is blocked. Given exactly £200, it follows the agreed standard path. Given approval is rejected, no payment is submitted and the reason is visible to the agent. Add a second story for agent status lookup, including unknown case ID and stale warehouse updates.",
      },
      {
        title: "5. Traceability and change impact",
        prompt:
          "Connect objective → requirement → story → test. Assess a late request for instant refunds before warehouse receipt. Record the decision and affected artifacts.",
        template:
          "Objective | requirement ID | story ID | UAT test ID | owner | status\nChange / reason / benefit:\nImpact: scope, cost, time, risk, control:\nOptions / decision / approver / date:",
        model:
          "O-01 shorter refund cycle → FR-02 approval routing → US-01 → UAT-03 £200.01 hold. Instant refunds alter fraud exposure and finance controls, not merely a screen. Compare a low-risk customer pilot with deferral; quantify expected value, seek finance/sponsor decision, and update baseline, tests and support guidance. A traceability matrix should reveal uncovered requirements rather than claim that every link is already passed.",
      },
      {
        title: "6. UAT and benefits handover",
        prompt:
          "Create four UAT cases with realistic inputs and expected outcomes. State entry/exit criteria, severity rules and sign-off ownership. Define post-launch measurement and operational support.",
        template:
          "Test ID | requirement | precondition | steps | data | expected | actual | status | evidence | defect\nEntry / exit criteria:\nDefect severity / retest owner:\nBusiness sign-off / residual risks:\nBenefit metric / baseline / target / owner / review date:",
        model:
          "UAT covers standard refund, exactly £200, £200.01 awaiting approval, and failed payment retry without duplicate refund. Entry: stable build, representative masked data, trained users. Exit: all critical scenarios pass, no unresolved critical/high defects, accepted residual risks documented by sponsor. Finance signs control behavior, operations signs usability. Operations tracks median, 90th percentile, incorrect-refund rate and second-contact rate weekly; compare cohorts and disclose seasonality. Training completion alone is not a business benefit.",
      },
    ],
    rubric: [
      "Problem and measurable baseline are clear",
      "Stakeholders and decision rights are explicit",
      "AS-IS and TO-BE include exceptions",
      "Requirements are testable and prioritized",
      "Boundary and negative criteria are present",
      "Every Must requirement links to a test",
      "UAT exit and business sign-off are defined",
      "Benefits have owners and measurement dates",
    ],
  },
];
const seniorScenarios: [string, string, string, string, string][] = [
  [
    "scope-conflict",
    "Negotiate a scope conflict",
    "Sales promises a new corporate returns portal in the same 10-week release. Finance will not relax approval controls; engineering has capacity for only one of portal access or warehouse integration.",
    "Create a one-page decision brief with stakeholder interests, non-negotiables, three options, evidence needed, recommendation and escalation route. Rebaseline scope and acceptance criteria after a decision.",
    "A staged warehouse-first release may improve the bottleneck but disappoint sales; a manual corporate pilot can test demand cheaply but adds operational load. Compare customer volume, contractual commitments, control risk and cost of delay. Use the accountable sponsor to decide, and record dissent and assumptions. Do not decide by the loudest stakeholder or silently remove controls.",
  ],
  [
    "business-case",
    "Build a defensible business case",
    "A workflow tool costs £60,000 implementation plus £12,000 annually. It could save 7 minutes on each of 1,200 monthly cases; loaded labor is £24/hour. Adoption may be 60–90%. A claimed £20,000 retention benefit lacks evidence.",
    "Calculate gross and net annual value, simple payback and 3-year undiscounted ROI at both adoption levels. Separate cash savings from released capacity and propose a validation plan.",
    "100% labor capacity value = 1,200×12×7/60×£24 = £40,320/year. At 60%: £24,192 gross, £12,192 net after license; payback ≈4.92 years, 3-year ROI ≈−39.04% using (3×net−60,000)/60,000. At 90%: £36,288 gross, £24,288 net; payback ≈2.47 years and ROI ≈21.44%. Timing, tax and discounting are excluded. Capacity is not cash unless redeployed or removed; exclude speculative retention from the base case.",
  ],
  [
    "operating-model",
    "Design ownership after launch",
    "The project team disbands in two weeks. Agents, warehouse and finance each assume another team owns stuck cases. Daily reports disagree.",
    "Design a RACI for exception queues, access, process changes and metric definitions. Propose escalation thresholds, service targets and a governance meeting that can make decisions.",
    "Name one accountable process owner, with finance retaining refund-control accountability. Assign responsible queue owners and a service desk escalation path. A centralized owner improves consistency but may slow local decisions; delegated decisions need clear guardrails. Agree one metric dictionary, review aged cases daily, and review benefits monthly. Avoid assigning everyone accountable.",
  ],
  [
    "dependencies-migration",
    "Plan dependencies and migration",
    "The payments API is ready in week 8, warehouse integration in week 6, and 4,000 open spreadsheet cases have duplicate IDs and missing status timestamps. Launch is week 10.",
    "Build a dependency map and critical decision dates. Define data profiling, mapping, deduplication, trial migration, reconciliation, cutover, rollback and ownership. State go/no-go criteria.",
    "Use a stub for early integration tests but reserve end-to-end payment tests after week 8. Preserve source IDs in an audit field; send ambiguous duplicate cases to business owners rather than deleting them. Reconcile record counts, monetary totals and open-case states by cohort. Pilot before full cutover; freeze or delta-sync writes. Roll back only with a plan for payments already sent, since database rollback cannot reverse external money movement.",
  ],
  [
    "vendor-selection",
    "Select a vendor transparently",
    "Vendor A costs £42k/year with strong workflow but weak export. B costs £55k with accessible UI and open APIs. C costs £30k with limited audit logs. Finance requires immutable approval evidence.",
    "Define pass/fail controls before weighted scoring. Create criteria, weights totaling 100%, a proof-of-concept script, TCO assumptions and exit requirements. Explain sensitivity to weights.",
    "Treat evidence retention and security as gates. Compare workflow fit, accessibility, integration, support and 3-year TCO including migration and exit. A low price cannot compensate for failing a mandatory audit control. Ask vendors to run the same £200.01 approval, failed payment and export scenarios with evidence. B may reduce integration risk; A may still win with a proven export remedy. Record conflict-of-interest and procurement review.",
  ],
  [
    "benefits-realization",
    "Investigate a disappointing launch",
    "Median refund time fell from 8 to 5 days, but the 90th percentile rose from 12 to 17. Volume grew 25%, incorrect refunds rose to 0.8%, and 40% of agents bypass the new intake. The sponsor asks you to declare success.",
    "Prepare a benefits review with segmentation, leading and lagging indicators, causal hypotheses, corrective experiments, guardrails, owners and review dates.",
    "The median improved but target and refund guardrail failed. Segment high-value, missing-item and bypass cases; inspect backlog age and workflow adoption. Growth and seasonal case mix may confound before/after comparison. Pilot training plus intake fixes, set a stop threshold for incorrect refunds, and assign finance to review control failures. Distinguish a product defect, process gap and unrealistic benefit assumption before proposing new automation.",
  ],
];
for (const [id, title, brief, prompt, model] of seniorScenarios)
  labs.push({
    id,
    title,
    level: "Senior simulation",
    minutes: 35,
    summary: prompt,
    brief,
    deliverables: [
      {
        title: "Decision brief",
        prompt,
        template:
          "Problem / evidence / assumptions:\nOptions and tradeoffs:\nRecommendation and rationale:\nDecision owner / governance:\nDependencies / risks / mitigations:\nSuccess measure / review date:",
        model,
      },
    ],
    rubric: [
      "Evidence and assumptions are separated",
      "At least two viable options are compared",
      "Financial or operational impact is quantified",
      "Decision rights and escalation are explicit",
      "Risks, dependencies and reversibility are addressed",
      "Outcome measures and follow-up are defined",
    ],
  });
export const careerAnswers = [
  {
    question: "How do I explain a career break?",
    answer:
      "“I took a career break for [brief explanation you are comfortable sharing]. I am now ready to return. To refresh my analysis skills, I completed a fictional returns-process case study, documented requirements and UAT, and practised SQL and Excel. My earlier experience in [actual role] gives me relevant examples of [real transferable skill].” Replace brackets with truthful details; disclose only what you choose.",
  },
  {
    question: "Tell me about a recent BA project.",
    answer:
      "“My most recent practice project was a simulated retail returns transformation. I mapped the current handoffs, identified assumptions, wrote measurable requirements and linked them to UAT cases. I did not deploy this in a company. A useful lesson was that faster median refunds can hide worse exceptions, so I added tail latency and incorrect-refund guardrails.” Then connect to a genuine work example if you have one.",
  },
  {
    question: "What if I have never held a BA title?",
    answer:
      "“I have not yet held a BA title. In [actual context], I clarified needs with [real people] and organized [real task or evidence]. I am building formal requirements, process-mapping and data skills through practice.” Explain your own contribution and a real outcome; never present model artifacts or invented savings as employment experience.",
  },
];
export const workbooks = [
  {
    id: "returns-analysis",
    title: "Returns operations dashboard",
    tasks: [
      "Clean channel labels with TRIM/LOWER, calculate handling cost and flag SLA breaches.",
      "Use a lookup to assign team owners and explicitly identify unmatched channels.",
      "Build a pivot by channel: cases, total handling cost and average days. Add a chart and recommend one intervention.",
    ],
    answer:
      "Totals: 48 cases, 24 SLA breaches (>4 days), £170.40 handling cost. Pivot source is Prepared; filter headers and refresh after edits.",
  },
  {
    id: "invoice-reconciliation",
    title: "Invoice and payment reconciliation",
    tasks: [
      "Match payments to invoices by ID using SUMIF; do not assume one payment per invoice.",
      "Calculate unpaid balances, distinguish overpayments from unpaid invoices, and find orphan payments.",
      "Reconcile source invoice total to payments allocated plus outstanding balance. Summarize exceptions for finance.",
    ],
    answer:
      "Invoices total £10,200; allocated payments £9,200; outstanding net £1,000. One orphan payment INV-999 (£125) is excluded from allocation; investigate it. INV-108 is overpaid £100.",
  },
  {
    id: "business-case",
    title: "Business case and sensitivity",
    tasks: [
      "Calculate labor capacity value at 60%, 75% and 90% adoption with editable assumptions.",
      "Calculate annual net benefit, payback and 3-year ROI, separating capacity from cash savings.",
      "Chart net benefit by adoption; state which assumptions need validation and what a negative ROI means.",
    ],
    answer:
      "60% adoption: £12,192 annual net, 4.92-year payback, −39.04% 3-year ROI. 90%: £24,288, 2.47 years, 21.44%. License costs recur annually; implementation occurs once.",
  },
];
