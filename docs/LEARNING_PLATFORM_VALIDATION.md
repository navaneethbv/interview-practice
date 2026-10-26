# Learning platform delivery and verification

This branch implements the twelve approved improvements. The feature map is in the README and the design/plan is under `docs/superpowers/`.

## Delivered behavior

| Area | Evidence and behavior |
| --- | --- |
| Daily plan | Coding/BA/mixed goals, 30/60/120 minute budgets, individual lessons, due revision, date gates and persisted completion. Completed or reviewed work stays in today's allocation after new results and reloads. |
| BA projects | One six-stage end-to-end project and six senior decision simulations with editable artifacts, templates, worked examples and self-review rubrics. |
| SQL | Twelve real SQLite exercises with schema, expected results, solution reveal, read-only authorizer, bounded result size and worker cancellation/timeouts. |
| Excel | Three practice/answer pairs. All six downloads open as real XLSX archives; 405 answer-workbook formulas have non-error cached results after LibreOffice recalculation. Practice scaffold formulas recalculate on open. |
| Beginner/senior coverage | Glossary/prerequisite checks and honest career-break answer structures; senior scope, business case, governance, dependency/migration, vendor and benefits cases. |
| Readiness | Separate reading exposure, judged acceptance, quiz results, SQL checks, lab self-reviews and interview skill self-ratings. Independent declarations are explicit; later assistance cannot rewrite prior acceptance. |
| Notebook | Section bookmarks and editable reasoning/corrections, internal source links, review dates and resolve/reopen controls. |
| Interview simulations | Twelve authored scenarios across three tracks; exact persisted deadlines, follow-ups, answer stages, frozen debriefs and retained history. |
| Account sync | Optional email-OTP client, validated snapshot comparison, explicit confirmations and recovery downloads, revision-precondition writes/deletes, owner-only RLS SQL and setup instructions. Live deployment requires configuration (below). |
| Offline | Install manifest and icons, explicit lesson download/library/removal, bounded public asset caches, offline hydration and no API/auth/private caching. |
| Reader | Guarded size/spacing/width/voice/speed preferences, pause/resume, saved position, paragraph highlighting, cancellation guards, focus trap/restore and Escape/right-click/visible exit. |
| Freshness | 43 catalog collection records with honest source/review/reported/added dates, unknown-date labels, links and recorded history. |
| CI | Parallel quality/build/browser/oracle jobs and four complete deterministic reference shards, with the stable final Quality checks aggregate. |

## Verification run in this workspace

- `npm run lint`: zero errors; one existing exhaustive-deps warning in the unchanged BA tour.
- `npm run typecheck`: passed.
- `npm test`: 272 Node tests, 266 passed and 6 skipped because Go is not installed locally; all 60 Python importer and 4 practice-addition tests passed. Java compilation used the installed real JDK 17 compiler module; CI provisions JDK 21.
- Independent BCTCI oracle suite: all 14 tests passed.
- `npm run tests:build -- --java`: 1,227 specs processed, zero problems; 1,158 Python, 1,164 Java and 63 SQLite executions. No expected-output changes.
- `npm run build`: passed after replacing a damaged local Turbopack persistence cache. No source configuration change was needed.
- Production Playwright suite: 43 passed, 3 intentionally skipped for unavailable production compiled-language runner infrastructure. Phone/tablet/laptop/large checks span 320, 768, 1366 and 2560 pixels.
- Browser SQL test ran the real pinned Pyodide 0.28.3 runtime and SQLite package, including mutation rejection. Local CDN copies were used because browser network access is restricted; execution was not mocked.
- Offline download, disconnect, navigation, hydration, removal and cache privacy checks passed. A separate review also navigated between BA lessons entirely offline.
- Workbook downloads, draft/checkbox restoration, editable notebook data, appearance migration, quota/cross-tab behavior and structured interview reload/debrief flows passed.
- Fresh-context branch review found budgeting, assistance chronology, narrow-layout and bounded-store issues; regression tests and fixes are included. No known Critical/Important review finding remains.

## Setup and remaining external verification

There is no connected Supabase project named for this application. No unrelated project was modified and no paid project was created. To enable live account sync, choose/provision a dedicated project, apply the reviewed SQL, configure email OTP delivery and set the public deployment variables in `docs/ACCOUNT_SYNC.md`. Run the documented two-account RLS, OTP and concurrent-device checks in staging before enabling it publicly. Mocked HTTP tests do not establish deployed policy behavior.

Device voice availability, audible pronunciation, iOS home-screen installation and platform-specific install prompts need real-device checks. Browser API lifecycle and offline behavior are covered by automated tests.

The latest main-branch Vercel policy (`vercel.json`) deploys only main. This branch preserves that policy and does not enable preview deployments.
