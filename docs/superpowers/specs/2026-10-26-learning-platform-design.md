# Complete learning platform

The user approved building all twelve improvements proposed in the conversation. Extend the existing Next.js application and retain all browser progress. Keep the UI responsive from 320px through wide desktop displays, use existing theme tokens and accessible keyboard controls. All learning features work without an account. Optional account sync uses a configured Supabase project with email OTP and owner-only RLS; deployment provisioning and public environment configuration are explicit prerequisites rather than fabricated credentials.

## Deliverables and acceptance
1. Daily plan: 30/60/120 minute budgets, coding/BA/mixed goals, dated completion and rescheduling without an overwhelming overdue backlog.
2. BA projects: editable artifacts from elicitation through UAT, model answers, checklists, glossary, prerequisites, and honest career-break examples.
3. SQL: business datasets, runnable read-only SQLite queries in a bounded browser worker, expected results and solutions.
4. Excel: downloadable datasets and answer workbooks with usable formulas and exercises for cleaning, lookups, aggregation, reconciliation and reporting.
5. Senior BA: decisions and deliverables for scope conflict, ROI, governance, dependencies, migration, vendors and benefits.
6. Readiness: evidence by skill, read versus independently demonstrated, with self-assessment clearly labeled.
7. Notebook: bookmarks to lesson sections, editable mistake reasoning/corrections, due dates and review completion.
8. Structured mocks: system design, BA and behavioral prompts, persisted deadlines, follow-ups, hidden debrief until finish, rubric and history.
9. Optional sync: authentication, explicit backup comparison/restore, revision conflicts preserved, signout and cloud deletion, guarded size/schema validation.
10. Offline: install manifest/icons, explicitly downloaded lessons, offline library and removal; no API, authentication or private response caching.
11. Reading: size/spacing/width/voice/speed preferences, pause/resume and saved position, highlighted reading, reader focus management and exit controls.
12. Freshness: real dates and sources, unknown dates honestly labeled, reviewed versus reported versus added dates and a change history.

## Approach
Extend the existing app with focused modules and content files. Reuse guarded storage and backup validation, existing course/progress APIs and the Pyodide runtime. Alternative external learning platforms would split progress and UI; rebuilding the site would endanger existing functionality. New modules use separate schemas with bounded validation and are included in export/import. Root navigation and shared pages integrate all modules. A feature branch and PR preserve reviewability.

## Verification
Run lint, typecheck, unit tests, production build and browser regression tests. Add focused tests for scheduling boundaries, storage corruption, deadline expiry, sync conflicts and worker/cache policies. Sharded reference checks preserve the entire original verification set. Review the full diff and record external setup prerequisites accurately.
