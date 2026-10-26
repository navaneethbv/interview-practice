Reports and dashboards are how a BA proves value and helps leaders decide. This chapter covers choosing the right measures, designing dashboards people actually use, and the basics of Power BI and Tableau.

## Metrics, KPIs and OKRs

> **In short:** Every KPI is a metric, but only a few metrics are KPIs.

- A **metric** is any measurement: number of transactions, average handling time, emails sent.
- A **KPI (key performance indicator)** is a metric tied directly to a **goal**, with a **target**, that tells you whether you're succeeding. Few, important, watched regularly.
- An **OKR (Objectives and Key Results)** is a goal-setting framework: an inspiring **objective** plus 2–5 measurable **key results**.
  *Objective: Make reconciliation effortless. Key results: auto-match ≥ 90%; aged breaks < 100; SLA compliance ≥ 95%.*

### Examples of operations KPIs

| KPI | Formula |
| --- | --- |
| Auto-match rate | auto-matched items ÷ total items × 100 |
| SLA compliance | items closed within SLA ÷ items closed × 100 |
| Average turnaround (cycle) time | total time to resolve ÷ number resolved |
| Aged items | count of open items older than X days |
| First-time-right / accuracy | items correct first time ÷ total × 100 |
| Backlog | open items at period end |
| Defect leakage | defects found after release ÷ total defects × 100 |

### Percentage change versus percentage points

If auto-match rises from 70% to 85%:

- The change is **15 percentage points** (85 − 70).
- The relative increase is **about 21%** ((85 − 70) ÷ 70 ≈ 0.214).

Mixing these up is a common interview slip. Say "percentage points" for differences between percentages.

## Designing good KPIs

> **In short:** Make KPIs SMART, balance leading and lagging, and watch for gaming.

### SMART

- **Specific** — clearly defined.
- **Measurable** — data exists to calculate it.
- **Achievable** — realistic.
- **Relevant** — linked to a business goal.
- **Time-bound** — measured over a defined period, with a target date.

*Weak:* "Improve reconciliation." *SMART:* "Raise the monthly auto-match rate for APAC nostro accounts from 70% to 90% by 31 December."

### Leading versus lagging indicators

- **Lagging** — measures outcomes after the fact (month-end aged breaks, customer complaints). Easy to measure, hard to influence directly.
- **Leading** — predicts future outcomes and can be acted on now (items unmatched more than 3 days today, staff trained on new rules). They give early warning.

A good scorecard uses both.

### Define each KPI precisely

For every KPI, document: name, purpose, formula, data source, owner, frequency, target, thresholds (green/amber/red) and caveats. Two teams calculating "turnaround time" differently is a classic source of conflict — a **KPI definition sheet** prevents it.

### Beware of gaming

**Goodhart's law:** *"When a measure becomes a target, it ceases to be a good measure."* If analysts are judged only on items closed, they may close easy items first and leave hard ones aging. Pair KPIs (volume **and** aging; speed **and** accuracy) to balance behavior.

## Dashboard design principles

> **In short:** Answer the reader's key questions in five seconds.

1. **Know the audience and their decisions.** An executive dashboard shows a few KPIs and trends; an operational dashboard shows today's queue and exceptions.
2. **Most important at the top left** — people read in a Z or F pattern.
3. **Few KPIs** — 5–9 on a page. More becomes noise.
4. **Show context** — compare to target, last period or trend, not just a number. "Aged breaks: 640 (target 500, ▲ 12% vs last month)."
5. **Consistent colors** — red only means bad; don't use red for decoration. Remember color-blind users: add icons or labels, not color alone.
6. **Remove clutter** — no 3D charts, heavy gridlines or decorative images.
7. **Drill down** — summary first, details on click.
8. **Show data freshness** — "Data as of 06:00 today".
9. **Test with real users** and iterate.

### Types of dashboards

- **Strategic** — executives, long-term KPIs, monthly/quarterly.
- **Operational** — teams, real-time or daily, what needs action now.
- **Analytical** — analysts, exploring trends and causes with filters.

## Choosing the right chart

> **In short:** Pick the chart that matches the question.

| Question | Best chart |
| --- | --- |
| How does a value change over time? | **Line chart** |
| How do categories compare? | **Bar chart** (horizontal bars when labels are long) |
| What makes up the whole? (few parts) | **Stacked bar**, or a pie/donut with no more than 3–5 slices |
| Is there a relationship between two numbers? | **Scatter plot** |
| How are values distributed? | **Histogram**, box plot |
| Which causes matter most? | **Pareto chart** |
| Where is the problem? (two dimensions) | **Heat map** |
| One key number vs target | **KPI card**, bullet chart |
| How did we get from A to B? | **Waterfall chart** |

Rules of thumb:

- Bar charts should **start at zero** — truncated axes exaggerate differences.
- Sort bars by value unless the categories have a natural order (months, age buckets).
- Avoid pie charts with many slices; humans compare lengths better than angles.
- Label directly instead of relying on legends.

## Power BI and Tableau basics

> **In short:** Connect to data, model it, build visuals, share and refresh.

**Power BI** (Microsoft) and **Tableau** (Salesforce) are the two most common BI tools. The workflow is similar:

1. **Connect** to data sources — Excel, SQL databases, SharePoint, cloud services.
2. **Prepare** — clean and shape data (Power Query in Power BI; Tableau Prep).
3. **Model** — relate tables (for example a **star schema**: a central **fact** table of transactions linked to **dimension** tables like account, date and country).
4. **Calculate** — measures and calculated fields.
5. **Visualize** — drag fields onto charts; add filters and slicers.
6. **Publish and share** — Power BI Service / Tableau Server or Cloud, with access controls.
7. **Schedule refresh** so reports update automatically.

### Key terms

- **Measure** (Power BI) — a calculation evaluated in context, written in **DAX**: `Unmatched Count = CALCULATE(COUNTROWS(Transactions), Transactions[Status] = "UNMATCHED")`.
- **Calculated column** — computed for each row and stored in the table.
- **Slicer / filter** — lets users narrow the data.
- **Dimensions and measures** (Tableau) — dimensions are categories (country); measures are numbers (amount).
- **Row-level security (RLS)** — users only see rows they're allowed to (each country manager sees their country).

You don't need deep expertise for most BA roles, but you should be able to explain a dashboard you built: audience, KPIs, data source, refresh, and the decision it supports.

## Routine reports, ad-hoc requests and automation

> **In short:** Automate the routine so you can spend time on real analysis.

- **Routine (scheduled) reports** — produced on a fixed schedule (daily breaks report, monthly SLA pack).
- **Ad-hoc reports** — one-off questions ("How many breaks did we have with Bank X last quarter?").

### Reducing ad-hoc requests

When the same ad-hoc question keeps arriving, it's a signal to build a **self-service** dashboard. Steps:

1. **Log ad-hoc requests** for a few weeks: who asked, what, why, how long it took.
2. **Group them** into themes; find the questions asked repeatedly.
3. **Design a dashboard** that answers the top themes, with filters for the variations.
4. **Automate** the data refresh from source systems (no manual copy-paste).
5. **Train users** and publish a short guide.
6. **Measure** the drop in ad-hoc requests and the time saved.

Faster access to trusted data shortens **decision turnaround** — leaders don't wait days for a custom report.

### Report specification

Before building any report, write a short spec: purpose and audience, questions it answers, KPIs and definitions, data sources, filters, layout sketch, frequency, refresh time, access/security and owner.

## Telling a story with data

> **In short:** Lead with the insight, support it with evidence, end with a recommendation.

Numbers alone rarely persuade. Structure findings as a story:

1. **Context** — what question were we answering, and why it matters.
2. **Insight** — the key finding, stated in one sentence. *"Three break reasons cause 86% of our aged items."*
3. **Evidence** — the one or two charts that prove it.
4. **Implication** — what happens if we do nothing (cost, risk).
5. **Recommendation** — what we should do and what it will achieve.

### Tips

- Put the **conclusion in the title** of the chart: "Reference mismatches cause 42% of breaks", not "Breaks by reason".
- Highlight the one bar or line that matters; grey out the rest.
- Tailor detail to the audience — executives want the "so what"; analysts want the method.
- Be honest about **data limitations** and uncertainty.
- Remember **correlation is not causation** — two things moving together doesn't prove one causes the other.
