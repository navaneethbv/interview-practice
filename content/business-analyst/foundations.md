Start here. This chapter explains what business analysis is, the vocabulary every interviewer expects you to know, and where your own experience already fits. Read each lesson, mark it as read, then pass the quiz to unlock the next chapter.

## What a business analyst actually does

> **In short:** A BA works out what an organization really needs, describes it clearly, and checks the result delivers value.

A **business analyst (BA)** helps an organization change for the better. The organization has a problem or an opportunity: a slow process, too many errors, a new regulation, a new product idea. The BA works out what is really needed, describes it clearly enough that people can build it, and checks that what was built delivers the value that was promised.

The IIBA (International Institute of Business Analysis) defines business analysis as *the practice of enabling change in an enterprise by defining needs and recommending solutions that deliver value to stakeholders.* Remember three words from that sentence: **needs**, **solutions** and **value**.

A typical week for a BA includes:

- **Asking questions.** Interviews, workshops and observation sessions to understand how work is done today and what people need.
- **Writing things down precisely.** Requirements, user stories, acceptance criteria, process maps and data definitions.
- **Translating.** Business people speak in goals and problems; developers speak in systems and data. The BA makes sure each side understands the other.
- **Analyzing.** Finding root causes, comparing options, estimating costs and benefits.
- **Supporting delivery.** Answering developer questions, reviewing test cases, running user acceptance testing (UAT) and triaging defects.
- **Measuring.** Reports and dashboards that show whether the change actually worked.

### What a BA is *not*

- A BA is not the person who decides the budget or the deadline. That is usually the sponsor or project manager.
- A BA does not usually write production code, although technical BAs may write SQL or read code.
- A BA does not simply write down what people ask for. "Order taking" is a classic weak-BA behavior. A good BA asks *why* until the real need is clear.

### Common job titles

You will see the same core skills under many titles: Business Analyst, Business Systems Analyst, IT Business Analyst, Functional Analyst, Process Analyst, Product Analyst, Requirements Analyst, Data/Reporting Analyst and, in agile teams, Product Owner. Read the job description, not the title, to see which mix of skills the employer wants.

> **Connect it to your experience:** If you have run interviews, written requirements, supported releases or built reports, you have already worked across the whole BA life cycle. In interviews, describe that work using the standard vocabulary in this course.

## The BABOK Guide and the six core concepts

> **In short:** Six core concepts sit behind every piece of BA work: Change, Need, Solution, Stakeholder, Value and Context.

The **BABOK Guide** (*A Guide to the Business Analysis Body of Knowledge*, currently version 3) is the IIBA's reference book for the profession. IIBA also publishes a shorter, free **Business Analysis Standard** that summarizes it. You do not need to memorize the BABOK, but interviewers and the IIBA certification exams use its terms.

The heart of the BABOK is the **Business Analysis Core Concept Model (BACCM)**. It has six concepts, and every piece of BA work touches all six:

| Concept | Plain meaning | Example from a reconciliation project |
| --- | --- | --- |
| **Change** | The act of transforming something in response to a need. | Introducing new automated matching rules. |
| **Need** | A problem or opportunity to be addressed. | Too many unmatched transactions ("breaks") each day. |
| **Solution** | A specific way of satisfying one or more needs. | A rules engine plus a revised exception procedure. |
| **Stakeholder** | A person or group with a relationship to the change, need or solution. | Reconciliation analysts, team leads, finance controllers, auditors, IT. |
| **Value** | The worth, importance or usefulness of something to a stakeholder. | Fewer manual hours, lower risk of financial misstatement. |
| **Context** | The circumstances that influence and are influenced by the change. | Regulations in each country, the existing ledger system, team skills, time zones. |

A simple way to remember them: **C-N-S-S-V-C** — "Change Needs Solutions; Stakeholders Value Context."

> **Interview tip:** If you are asked "How do you approach a new project?", you can structure the answer with the core concepts: understand the need and the context, identify stakeholders, explore solution options, and define how value will be measured.

## The six knowledge areas

> **In short:** The BABOK groups BA work into six knowledge areas that you move between, not phases done in order.

The BABOK groups BA tasks into six **knowledge areas**. They are *not* phases that happen in order; on a real project you move between them constantly.

1. **Business Analysis Planning and Monitoring** — deciding how you will do the BA work: which stakeholders to involve, which techniques to use, how requirements will be approved and changed, and how you will measure your own performance.
2. **Elicitation and Collaboration** — drawing information out of stakeholders and other sources (interviews, workshops, observation, documents), confirming it, and keeping stakeholders engaged.
3. **Requirements Life Cycle Management** — managing requirements from creation to retirement: tracing them, maintaining them, prioritizing them, assessing changes and getting approval.
4. **Strategy Analysis** — understanding the current state, defining the future state, assessing risks, and defining the change strategy (how to get from here to there).
5. **Requirements Analysis and Design Definition (RADD)** — specifying and modeling requirements, verifying and validating them, defining the architecture of requirements, and recommending solution options. This is the largest area on the CCBA and CBAP exams.
6. **Solution Evaluation** — measuring how a solution performs after (or while) it is delivered, finding limitations, and recommending actions to increase value.

### Verify versus validate

Two words that interviewers love:

- **Verify** requirements: are they *well written*? Clear, consistent, complete, testable, correctly formatted. ("Did we write the requirement right?")
- **Validate** requirements: do they *support the business goal*? Will they deliver the value? ("Did we write the right requirement?")

### Requirements versus designs

In BABOK language, a **requirement** is a usable representation of a need (what is needed), and a **design** is a usable representation of a solution (how it will look or work). A screen mock-up is a design; "the agent must see the customer's last five transactions" is a requirement.

## BA, project manager, product owner and other roles

> **In short:** The BA owns the what and why; the PM owns when and how much; the product owner orders the backlog.

Interviewers often ask how a BA differs from neighboring roles. Learn this table.

| Role | Main question they own | Typical outputs |
| --- | --- | --- |
| **Business Analyst** | *What* is needed and *why*? | Requirements, process models, analysis, acceptance criteria |
| **Project Manager (PM)** | *When*, *how much* and *who*? Delivering the project on time, scope and budget. | Plan, schedule, budget, risk log, status reports |
| **Product Owner (PO)** | Which backlog items deliver the most value next? Owns the product backlog in Scrum. | Ordered backlog, sprint goals, acceptance decisions |
| **Product Manager** | Which product should we build for the market, and why? Long-term product strategy. | Vision, roadmap, market research |
| **Data Analyst** | What does the data say? | Queries, analyses, reports, dashboards |
| **Systems Analyst** | How should the system be designed to meet the requirements? | Technical specifications, data and interface designs |
| **Developer / QA** | Building and testing the solution. | Code, test cases, defect reports |

On small teams one person may play several roles. You coordinated initiatives *and* wrote requirements — that is a BA with project-coordination responsibilities, which is very common and worth saying out loud.

### Where a BA sits in the software development life cycle (SDLC)

The **SDLC** is the sequence of stages a software change goes through: **planning → requirements/analysis → design → build → test → deploy → maintain**. The BA is most active in planning and analysis, stays involved in design (reviewing mock-ups and specifications), supports build (answering questions), is heavily involved in test (test scenarios, UAT) and helps after deployment (measuring value, handling production issues).

## Underlying competencies

> **In short:** Interviewers test the skills behind the work: thinking, communication, interaction and trustworthiness.

The BABOK lists **underlying competencies** — the skills and behaviors behind good BA work. Interviewers test these through behavioral questions.

- **Analytical thinking and problem solving:** creative thinking, decision making, learning, systems thinking, conceptual thinking, visual thinking.
- **Behavioral characteristics:** ethics, personal accountability, trustworthiness, organization and time management, adaptability.
- **Business knowledge:** business acumen, industry knowledge, organization knowledge, solution knowledge, methodology knowledge.
- **Communication skills:** verbal, non-verbal, written and listening.
- **Interaction skills:** facilitation, leadership and influencing, teamwork, negotiation and conflict resolution, teaching.
- **Tools and technology:** office productivity tools, BA tools (modeling, requirements management), communication and collaboration tools.

Notice **teaching** under interaction skills. Any teaching, tutoring, training or mentoring you have done is a genuine BA competency: explaining complex ideas simply, checking understanding, adapting to the learner and giving constructive feedback.

### The BA mindset

Modern IIBA material emphasizes a **mindset**: curiosity, being outcome-focused rather than document-focused, thinking about the whole system, being comfortable with ambiguity, and putting the stakeholder's value first. Being *impartial* — weighing facts without taking sides — is part of this, and it is in your professional summary.

## Tools a BA uses

> **In short:** Know the main tool families and name the specific tools you have used.

You do not need to be expert in every tool, but you should recognize them and say which you have used.

| Purpose | Common tools |
| --- | --- |
| Requirements and backlog | Jira, Azure DevOps (Boards), Confluence, SharePoint, Jama, IBM DOORS |
| Process and diagram modeling | Microsoft Visio, Lucidchart, draw.io (diagrams.net), Miro, Bizagi, Signavio |
| Mock-ups and prototypes | Figma, Balsamiq, Axure, PowerPoint |
| Data and reporting | Excel, SQL, Power BI, Tableau, Looker |
| Collaboration | Microsoft Teams, Slack, Zoom, Outlook |
| Case and ticket systems | ServiceNow, Jira Service Management, Salesforce, Zendesk |

> **Interview tip:** Name the tools you have actually used (for example Jira or ServiceNow) — interviewers like specifics. If you used an internal tool, say "an internal case-management tool similar to ServiceNow."

## Certifications and career path

> **In short:** IIBA offers ECBA (entry), CCBA (experienced) and CBAP (senior); pick the one your experience supports.

Certifications are optional but help a career-changer or someone entering a new country's job market show commitment and standard vocabulary.

| Certification | Body | Experience needed | Exam (as of 2025–2026) |
| --- | --- | --- | --- |
| **ECBA** – Entry Certificate in Business Analysis | IIBA | None | 50 questions, 75 minutes, online; situation-based questions on the core concepts and BA mindset |
| **CCBA** – Certification of Capability in Business Analysis | IIBA | 3,750 hours of BA work in 7 years; 21 professional-development hours | 130 multiple-choice scenario questions, 3 hours |
| **CBAP** – Certified Business Analysis Professional | IIBA | 7,500 hours of BA work in 10 years; 35 professional-development hours | 120 questions, 3.5 hours, case-study style |
| **IIBA-AAC** – Agile Analysis Certification | IIBA | Recommended agile experience | Scenario-based agile questions |
| **PMI-PBA** – Professional in Business Analysis | PMI | Varies; check pmi.org for current availability | Varies |
| **CSPO / PSPO** – Scrum product owner certificates | Scrum Alliance / Scrum.org | None | Course or online assessment |

Requirements and fees change, so always confirm on iiba.org before applying.

> **Which one?** Full-time work is roughly 1,800–2,000 hours a year, so about four years of hands-on BA work typically clears the 7,500-hour CBAP threshold. CCBA or CBAP signals seniority; ECBA is the quickest win if you want a certificate within a few weeks.

### Typical career path

Junior/Associate BA → Business Analyst → Senior BA → Lead BA / BA Manager, with side paths into Product Owner/Product Manager, Business Architect, Project/Program Manager, Data Analyst or Process Excellence (Lean Six Sigma) roles. A finance or banking background is a strong fit for **financial-services BA** roles (banks, payments, insurance, fintech), where domain knowledge is highly valued.
