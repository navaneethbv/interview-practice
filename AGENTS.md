<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Interview Practice: agent guide

LeetCode-style practice site: coding problems with an in-browser editor and hidden tests, pattern lessons, and a read-only system design book reader.
Next.js App Router on Vercel, Tailwind CSS v4, Monaco editor, Shiki, KaTeX.
See README.md for features and setup.

## Commands

- `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`
- `npm run tests:build [-- --java] [-- --langs] [ids...]` fills and verifies expected outputs for problem specs; `--langs` also runs `<id>.js/.ts/.cpp/.go` references.
- `python3 scripts/ingest/company_lists.py <snapshot-dir> nvidia=NVIDIA ...` rebuilds `scripts/ingest/company_lists.json` from a LeetCode company-tag snapshot (facts only: which problems, how recently); `company_extras.json` adds problems from candidate write-ups. Then rerun `problem_sets.py`.
- `python3 scripts/ingest/study_plan.py` regenerates `content/study-plan.json` from `Interview_Prep_Plan_ENRICHED.xlsx`.
- `npm run ingest:grokking -- <folder>` regenerates `content/courses/grokking/` and `public/course-assets/grokking/`.
- `npm run ingest:system-design -- <grokking|advanced|notes> <source>` regenerates one system design book in `content/system-design/<book>/` (needs `pip install pdfplumber`).
  Do not hand-edit `content/system-design/**`; change `scripts/ingest/system_design.py` and re-run it.

Run lint, typecheck and `npm test` before committing.
After touching the judge or any spec, run `npm run tests:build -- --java`.

## Architecture

- `content/` holds generated JSON; the site reads it at build time through `src/lib/content.ts`.
  Do not hand-edit `content/courses/**`; change `scripts/ingest/grokking.ts` and re-run it.
- Problem specs (`content/problems/<id>.json`) are language-neutral: signature, `compare` mode, and test inputs.
  The Python reference `<id>.py` is the source of truth for expected outputs.
  Tests marked `"sample": true` are shown in the Testcase panel; the rest stay hidden until they fail.
- `src/lib/judge/`:
  - `types.ts` spec, value type and result types
  - `languages.ts` decides which languages a spec supports: JavaScript, TypeScript, C++ and Go cover specs that only use the core types (`usesCoreFeatures`)
  - `javascript.ts`, `cpp.ts`, `go.ts` generate harnesses for those languages; `local-extra.ts` runs them with local toolchains for scripts and tests
  - `python.ts` / `java.ts` generate harnesses that convert JSON into typed args, call `Solution`, and print one `RESULT_MARKER` JSON line per test
  - `grade.ts` parses those lines into verdicts; `compare.ts` holds comparison modes and validators
  - `runner.ts` (browser) runs Python in `public/pyodide-worker.js`, JavaScript and TypeScript in `public/js-worker.js`, and Java, C++ and Go through `POST /api/run/[lang]`
  - `starter.ts` generates the LeetCode-style starter code shown in the editor
- `src/app/api/run/[lang]/route.ts` runs Java, C++ and Go in a Vercel Sandbox booted from `CODE_SANDBOX_SNAPSHOT_ID` (Java also accepts `JAVA_SANDBOX_SNAPSHOT_ID`) with networking disabled; in development without a snapshot it uses the local toolchains.
- Practice modes (`/practice`): `src/lib/practice-data.ts` holds the pure review-queue and mock-interview logic, `src/lib/practice.ts` its guarded storage; both keys are validated by `practice-backup.ts`.
- Per-user state (progress, code, submissions, notes) lives in localStorage via `src/lib/progress.ts`.
  Always go through its guarded helpers; storage can be unavailable.

## Adding a coding problem's tests

Workbook lists use `content/sets/` and their authored problems use `content/leetcode/`.
See `docs/PROBLEM_AUTHORING.md` for the importer command, SQLite specs, helper types, interactive environments, and progress semantics.
Run `python3 scripts/judge/content-status.py` to report list coverage and the next missing slug.

1. Write `content/problems/<id>.json` with `function`, `params`, `returns`, optional `output`/`compare`, and `tests` with inputs only.
2. Write `content/problems/<id>.py` with a correct `class Solution`.
3. Optionally add `<id>.java` (and `<id>.js`, `.ts`, `.cpp`, `.go`) to exercise the other harnesses.
4. Run `npm run tests:build -- --java --langs <id>`; it writes `expected` values and fails on disagreements.

Helper classes use the course's field names: `ListNode.value/next`, `TreeNode.val/left/right/next`, `Interval.start/end`.
Linked lists are JSON arrays, or `{"values": [...], "pos": k}` for a cycle; trees are LeetCode level-order arrays with `null`.
Use `compare: "unordered"` or `"unorderedDeep"` when result order is free, and a validator when many answers are valid.

## Conventions

- Keep colors in the CSS tokens in `src/app/globals.css`; components use the `bg-layer-*`, `text-fg-*`, `border-line` utilities so both themes stay consistent.
- Ingested HTML is sanitized at import time; keep it that way when changing importers (no scripts, event handlers, or non-http links).
- Do not commit `.env*` files or the `.vercel/` folder.
