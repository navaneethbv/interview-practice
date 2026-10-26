# Senior Business Analyst Track Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Add a separate interactive Senior Business Analyst course with eight advanced chapters, quizzes, a 30-session plan and an integrated capstone while preserving the beginner track.

**Architecture:** Generalize the existing BA content loader and shared overview/chapter/final UI with a track configuration. Store advanced progress in the existing BA state under unique senior chapter IDs and senior-final, and add separate overview, chapter, exam and study-plan routes.

**Tech Stack:** Next.js App Router, React, TypeScript, JSON and Markdown course content, Tailwind CSS, existing localStorage progress store.

**Spec:** docs/superpowers/specs/2026-10-25-senior-ba-track-design.md

## Global Constraints

- Keep the beginner chapter order, quiz unlocks and 39-session plan unchanged.
- Keep the senior path separate and optional.
- Use eight senior chapters and a 30-session plan at about 60–75 minutes per session.
- Use unique senior chapter IDs and senior-final.
- Keep the senior capstone self-reviewed and ungraded; the senior final exam assesses course knowledge.
- Keep the scope on senior BA/lead BA individual-contributor work, distinguishing it from formal people management.

## Review Focus

- Unknown or invalid track IDs must not read arbitrary filesystem paths; restrict track selection to the two supported track values.
- A senior chapter must not unlock based on a beginner quiz; derive chapter status from only the current track's IDs.
- The senior final exam must not unlock from beginner quiz results; give it the senior-final attempt ID and senior chapter bank list.
- Resetting one track must preserve the other track's reads, notes, positions and quiz history in the shared BA state.
- Senior route links and schedule links must always stay inside the senior track, except explicit links back to the beginner course.

---

### Task 1: Track-aware course content loading

**Files:**
- Modify: src/lib/ba-content.ts
- Create: content/business-analyst/senior/index.json
- Create: content/business-analyst/senior/<chapter>.md for the eight curriculum chapters
- Create: content/business-analyst/senior/<chapter>.quiz.json for each chapter

**Interfaces:**
- Produces: BaTrack = "beginner" | "senior"; getBaIndex(track?: BaTrack), getBaChapter(id: string, track?: BaTrack), getBaBank(id: string, track?: BaTrack), listBaChapters(track?: BaTrack), baOutline(track?: BaTrack). Default track remains "beginner".
- Senior index uses quizSize 10, passPercent 80, final size 30 and final passPercent 80. Each chapter has 5–7 short lessons and a bank of at least 20 questions, with correct answer first.

- [ ] Add track type, safe track-to-directory/index mapping and optional track arguments while preserving beginner defaults.
- [ ] Author the eight Markdown chapters and chapter question banks in the approved curriculum order.
- [ ] Check lesson headings, quiz question lesson references and the 10/80/30/80 course settings against the source files.

### Task 2: Track-aware shared course UI and progress

**Files:**
- Modify: src/components/ba/BaOverview.tsx
- Modify: src/components/ba/ChapterView.tsx
- Modify: src/components/ba/FinalView.tsx
- Modify: src/lib/ba-store.ts

**Interfaces:**
- Consumes: BaTrack and track-specific content from Task 1.
- Produces: Shared components accept a route base, overview URL, track title, final exam ID and chapter IDs; defaults preserve the beginner experience.
- Produces: resetCourse(chapterIds: string[], finalId: string) removes only the selected track's state entries and leaves other track data intact.

- [ ] Add configurable navigation and labels to the overview, chapter and final components, retaining beginner route defaults.
- [ ] Key the senior final exam as senior-final and derive unlock status from only the senior chapter IDs.
- [ ] Change course reset to selectively clear reads, quiz attempts, notes and positions for the supplied track IDs.
- [ ] Review every shared UI link for correct beginner and senior destinations.

### Task 3: Senior course routes and overview

**Files:**
- Create: src/app/business-analyst/senior/page.tsx
- Create: src/app/business-analyst/senior/[chapter]/page.tsx
- Create: src/app/business-analyst/senior/final/page.tsx
- Modify: src/app/business-analyst/page.tsx or its overview component
- Modify: README.md

**Interfaces:**
- Consumes: Task 1 loader functions and Task 2 configurable shared UI.
- Produces: /business-analyst/senior, /business-analyst/senior/<chapter-id> and /business-analyst/senior/final.

- [ ] Add the Senior BA overview, chapter and final-exam pages using the shared components with track "senior".
- [ ] Add an optional Senior BA entry point to the beginner overview and a return link from senior to beginner.
- [ ] Update README course description to mention the advanced track.

### Task 4: Senior study plan and integrated case

**Files:**
- Create: src/components/ba/SeniorStudyPlan.tsx
- Create: src/app/business-analyst/senior/study-plan/page.tsx
- Modify: senior overview page/component

**Interfaces:**
- Consumes: Senior chapter IDs and route base from Task 1 and Task 2.
- Produces: 30 sessions linked to existing senior chapter routes, with chapter quizzes, capstone work, mock interview and final exam scheduled in order.

- [ ] Write a 30-session plan with reading, applied practice and recall time.
- [ ] Build a continuing multi-region reconciliation modernization case with one artifact/decision per chapter.
- [ ] Add the self-review checklist for strategic fit, evidence, traceability, decision ownership, risks and measurable benefits.
- [ ] Add a link to the senior study plan from the senior overview.

### Task 5: Review and PR

**Files:**
- Review: all files created or modified above.

- [ ] Check the diff for beginner default behavior, distinct senior IDs, complete chapter links and the capstone assessment described in the spec.
- [ ] Inspect the automatic PR checks and deployment result; resolve any reported failures.
- [ ] Open a follow-up PR against main and report its URL and check status.
