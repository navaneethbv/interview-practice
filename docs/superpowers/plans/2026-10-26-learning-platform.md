# Complete Learning Platform Implementation Plan

> **For agentic workers:** Use focused independent implementation domains, then whole-branch integration and review. Track completion here and in the ledger.

**Goal:** Deliver all twelve approved study platform improvements and beginner/senior BA practice.
**Architecture:** Extend the existing Next.js app using guarded local stores, content modules, browser workers and optional Supabase snapshots. Keep routes independently useful and integrate navigation, backup, search and readiness.
**Tech Stack:** Next.js, React, TypeScript, SQLite through Pyodide, service workers, Supabase REST, Python workbook generation.
**Spec:** docs/superpowers/specs/2026-10-26-learning-platform-design.md

## Global constraints
Preserve browser progress; no account required for local features. Use CSS theme tokens and accessible responsive controls. Do not invent source dates or readiness guarantees. Never cache API/auth data. Sync needs explicit user confirmation and owner-only access.

## Review focus
Storage blocked or corrupt; missed days and timezone boundaries; speech callbacks after navigation; offline route/assets missing; concurrent cloud revisions and session expiry.

## Tasks
- [x] 1. Daily dashboard, bookmarks, mistake notebook and evidence-based readiness; pure scheduling/validation tests and persisted responsive routes.
- [x] 2. BA project and senior simulations, SQL labs and Excel workbooks; editable artifacts, worked examples, bounded query execution, validated content and downloadable answer workbooks.
- [x] 3. Structured interview mocks; deadline/resume tests, rubrics, prompts, debrief and saved history.
- [x] 4. Reading accessibility and offline installation; safe cache boundaries, explicit downloads, preferences, speech and keyboard checks.
- [x] 5. Optional account sync; Auth/RLS migration, validated snapshots, previewed restore, revision conflicts, deployment docs and mocked integration tests.
- [x] 6. Source freshness and faster CI; honest provenance and complete deterministic reference shards.
- [x] 7. Integrate all new routes in navigation, search, course sections and backups; verify cross-feature readiness and no loss during restore.
- [x] 8. Run lint, typecheck, unit/content checks, production build and browser regression at representative viewports; fix failures and review complete diff.
- [ ] 9. Commit/push branch, open reviewable PR(s), inspect checks and report current outcomes and configuration prerequisites.
