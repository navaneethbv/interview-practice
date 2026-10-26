# Senior Business Analyst Track — Design

Date: 2026-10-25

## Intent

Add a senior-level learning path to Business Analyst Prep for learners who already understand BA fundamentals. It should teach what a senior or lead BA is accountable for on complex initiatives and help learners explain that work in senior-level interviews.

The beginner course and its 39-session plan remain intact. The senior path is separate and optional.

## Goals

- Teach senior-level work through practical lessons, not just advanced terminology.
- Cover strategy alignment, enterprise context, complex discovery, solution evaluation, cross-team delivery, governance, value realization, executive communication, coaching and senior interview cases.
- Use the same one-lesson-at-a-time, chapter quiz and final exam experience as the beginner course.
- Give the senior track its own day-by-day plan and practical capstone.
- Keep senior progress and quiz identifiers separate from beginner chapters and exams.

## Non-goals

- Do not change beginner chapter order, quiz unlocks or its 39-session plan.
- Do not position this as a substitute for IIBA certification study.
- Do not imply that every senior BA is a people manager; distinguish lead/principal individual-contributor work from formal management.
- Do not teach advanced analysis as a pile of methods without business outcomes, decision rights and measurement.

## Proposed curriculum

Eight senior-level chapters, each with short lessons and a question bank:

1. **From project support to strategic partnership** — senior scope, enterprise goals, operating models, capability/value-stream thinking, and connecting requests to measurable outcomes.
2. **Complex discovery and decision leadership** — multi-level stakeholder strategy, executive facilitation, conflict and decision rights, ambiguity, assumptions, and inclusive/distributed engagement.
3. **Enterprise requirements and solution shaping** — options and trade-offs, business rules, quality attributes, integration/data flows, security, privacy, controls and architecture partnership.
4. **Business architecture and target operating models** — capability maps, value streams, current/future state, organizational/process impacts, roadmaps and transition states.
5. **Portfolio delivery, governance and risk** — cross-team dependencies, scope and requirements governance, scaled delivery, change control, auditability, risk and escalation.
6. **Business cases and value realization** — options analysis, costs/benefits, baselines, benefits maps, KPI ownership, adoption measures and post-implementation review.
7. **Leading change and raising team capability** — organizational readiness, communication/adoption, mentoring analysts, facilitation standards, reusable practices and communities of practice.
8. **Senior BA interviews and integrated case** — executive-level storytelling, leadership scenarios and a capstone that takes a complex initiative from strategy through measured value.

Use a continuing case: modernizing reconciliation across multiple regions and systems, with competing operations, finance, control and technology priorities. Each chapter adds an artifact or decision to the capstone. The capstone is a self-reviewed portfolio exercise, not a graded submission: learners assemble a short decision pack (problem and strategic fit, stakeholder/decision map, current and target state, options and risks, delivery/governance outline, and benefits measures) and use a checklist to assess traceability, evidence, ownership and measurable value. The separate senior final exam scores course knowledge; the capstone does not gate course completion.

## Study plan

Provide 30 study sessions at about 60–75 minutes each, with rest/catch-up days allowed. Balance reading, applied work and recall. Schedule one chapter quiz after each chapter, then reserve the final sessions for the capstone, mock interview and separate senior final exam. Link sessions directly to chapters.

## Approaches considered

- **Separate interactive track (selected):** Add a senior overview and chapter routes, reuse the current lesson and quiz experience, and use unique senior chapter and final-exam IDs in the existing progress store. This preserves the beginner sequence while keeping the experience consistent.
- **Static senior handbook:** Faster to add, but it would omit quiz feedback, progress and the study flow the user asked to extend.
- **Append senior chapters to the existing index:** Rejected because the current course locks chapters in one sequence; it would make beginners complete senior material before their final exam.

## Implementation calls

- Add a dedicated senior route under /business-analyst/senior, with separate chapter routes and study-plan page.
- Store senior lesson and quiz content alongside the existing BA material, with a distinct track index.
- Make shared course UI configurable for track title, route base, chapter IDs, final-exam ID and overview link. Keep beginner defaults unchanged.
- Give senior IDs a senior- prefix and use senior-final so existing local progress and backups remain valid and separate.
- Link the beginner overview to the optional senior track and link the senior overview back to the beginner course.
- Keep the scope focused on a senior BA/lead BA individual-contributor path; include management distinctions where relevant.

## Validation

- Confirm beginner routes, IDs, progress key, chapter ordering and exam behavior remain unchanged.
- Confirm senior routes resolve, senior chapters unlock only within their own track, and the senior final unlocks after the senior quizzes.
- Confirm every lesson has a corresponding well-formed quiz question and every study-plan link targets an existing route.
- Review the rendered overview, chapters and schedule at mobile and desktop widths.
