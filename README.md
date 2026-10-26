# Interview Practice

A LeetCode-style website for practicing software engineering interviews: coding problems with a real editor and hidden test cases, pattern lessons, and system design books.

Live: https://interview-practice-sandy-eight.vercel.app

## Features

- **Problems**: every coding problem from the Grokking pattern course, plus curated and company lists (Blind 75, NeetCode 150, Grind, CTCI, BCTCI, SQL 50, Concurrency, Object-Oriented Design, ML Coding and company lists), with difficulty, pattern and status filters.
- **Workspace**: problem description, worked solution and your submission history on the left; a Monaco editor (Python 3, Java, JavaScript, TypeScript, C++ or Go) and a Testcase / Test Result console on the right.
- **Hints and complexity check**: hints reveal one step at a time (topics, pattern, approach), and you state the time and space complexity before comparing with the reference.
- **Run** checks your code against the sample cases and any cases you add or edit (expected output comes from a tested reference solution).
- **Submit** checks it against every case, including hidden edge cases, and reports Accepted, Wrong Answer, Runtime Error, Compile Error or Time Limit Exceeded.
- **Patterns**: the course lessons, with diagrams, math and highlighted code in both languages.
- **Practice**: timed mock interviews drawn from any list (walkthroughs stay hidden until the round ends, followed by a self-rated debrief), a spaced-repetition review queue for solved problems, and a 16-week study plan.
  Mock rounds finish automatically at their deadline, including after a reload or device sleep; late submissions do not count toward the round. Interview mix fills from the remaining questions when a list has only one difficulty.
- **Interview Guides**: system design books plus focused practice for low-level design, AI architecture, testing and debugging, and behavioral interviews.
- **Business Analyst prep** (`/business-analyst`): a 14-chapter course for BA roles (requirements, elicitation, process modeling, Agile, testing, SQL and Excel, KPIs, Lean Six Sigma, banking and finance, interviews). Lessons are shown one at a time; each chapter ends with a 10-question quiz drawn at random from a bank of about 30, with shuffled answers and instant explanations. A score of 80% unlocks the next chapter, and passing all 14 unlocks a 30-question final exam. Includes a first-visit tour, a tip of the day, private per-chapter notes and a 39-session beginner study plan and a separate advanced Senior BA track with eight interactive chapters, quizzes, a 30-session plan and a capstone.
- **Search and navigation**: `Ctrl/⌘ + K` (or `/`) opens a site-wide search across problems, lists, lessons and guides; `/problems` groups study plans, topic tracks and company lists with per-list progress.
- Light and dark themes with low-glare colors, keyboard shortcuts (`Ctrl/⌘ + '` to run, `Ctrl/⌘ + Enter` to submit) and progress saved in the browser.

## How code runs

| Language | Where | Notes |
| --- | --- | --- |
| Python 3.13 | In the browser, with [Pyodide](https://pyodide.org) in a Web Worker | No server needed. The first run downloads the runtime (about 10 MB); later runs are instant. |
| JavaScript, TypeScript | In the browser, in an isolated QuickJS WebAssembly interpreter inside a Web Worker | TypeScript is transpiled in the worker by the TypeScript compiler, downloaded on first use; type errors do not block a run, as on LeetCode. |
| Java 21, C++17, Go | `/api/run/<lang>` on Vercel, inside a [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) microVM | Booted from one snapshot with the JDK, g++ and Go installed, no network access, 10 second run limit. About 5 seconds per run. |

Every language uses the same test data.
JavaScript, TypeScript, C++ and Go cover problems built from the core types (numbers, strings, arrays, lists, `ListNode`, `TreeNode`, `Interval`) and design classes, which is about 96% of the problems; the rest, which need graph nodes, interactive APIs or codecs, offer Python and Java.
A problem's spec (`content/problems/<id>.json`) declares the signature and test inputs.
The site generates a harness for each language that converts JSON inputs into typed arguments (including `ListNode`, `TreeNode` and `Interval`), calls your `Solution`, and prints JSON results.
Outputs are compared in TypeScript, with order-insensitive checks and validators for problems that have several correct answers.

## Back up practice data

Code drafts, progress, submissions, review queues, mock interviews, preferences, and last-opened pages are stored in this browser.
They are not synchronized between browsers or devices, and clearing site data removes them.
Open **Back up or restore practice data** in the footer of a browsing or reading page and choose **Export backup** to download a JSON copy.
To restore it, choose the backup file, inspect the confirmation, and select **Restore backup**.
Matching records are replaced while unrelated records remain, so export the current data first when keeping both versions matters.
Backups are limited to 20 MiB and remain on your device.

## Getting started

Requirements: Node.js 22+, Python 3.12+ (for generating test data), and for Java locally a JDK 17+ on your `PATH`.

```bash
npm install
npm run dev
```

Open http://localhost:3000.
In development, Java, C++ and Go run with your local `javac`, `g++` and `go` unless `CODE_SANDBOX_SNAPSHOT_ID` is set.

## Content

Content is plain JSON in `content/`, generated from source files and committed to the repo.

### Coding course

```bash
npm run ingest:grokking -- "/path/to/Grokking the Coding Interview folder"
```

This parses the saved Educative pages (one copy per language tab), keeps the Java and Python code, re-renders math with KaTeX and extracts diagrams to `public/course-assets/`.

### Test cases

Each problem has a spec and a Python reference solution in `content/problems/`:

- `<id>.json`: signature, comparison mode and test inputs (`"sample": true` marks the visible cases)
- `<id>.py`: reference solution used to compute expected outputs
- `<id>.java` (optional): Java reference used to verify the Java harness

```bash
npm run tests:build              # fill in missing expected outputs and verify the rest
npm run tests:build -- --java    # also compile and run the Java references
npm run tests:build -- --langs   # also run JavaScript, TypeScript, C++ and Go references (<id>.js/.ts/.cpp/.go)
npm run tests:build -- some-id   # only some problems
```

### Company lists

Company lists (Meta, Google, Amazon, Apple, Microsoft, Uber, NVIDIA, OpenAI, Anthropic) combine dated LeetCode tag snapshots, retained workbook entries and reviewed website reports.
Recency buckets refer to the displayed snapshot date, **not today**. The latest upstream snapshot checked on October 13, 2026 is dated July 12, 2026. Original workbook entries remain available; rows absent from the selected snapshot buckets are labeled with their unknown date.

```bash
python3 scripts/ingest/company_lists.py <snapshot-dir> nvidia=NVIDIA openai=OpenAI anthropic=Anthropic
python3 scripts/ingest/company_crawler.py --cache /tmp/company-crawl > /tmp/discovery.json
python3 scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
```

The crawler stores facts only (problem, company, how many sources mention it), honours robots.txt, rate-limits each host and skips login or paywalled pages.
LeetCode tags and exact, visible 1point3acres coding-list links are verified for extraction. The other three websites require manual review; explicit `--sources` opts into discovery. A whole catalog title must match a 1point3acres question link unambiguously: guide prose and longer variants never count.

Live runs always print discovery JSON to stdout and **cannot overwrite the reviewed report**. Caches expire after 24 hours; `--cache-max-age 0` forces fresh requests, while `--offline` replays cached pages without changing their retrieval dates. Denied or rate-limited robots responses block the host. No cookies or credentials are sent.

The [October 13 source review](docs/COMPANY_CRAWL_2026-10-13.md) adds 1,076 company-list entries, records 59 website observations on 57 company/problem pairs, and adds a runnable recipe-dependency exercise. It builds on the [October 12 refresh](docs/COMPANY_CRAWL_2026-10-12.md). interviewDB remains checked but unmapped where public titles do not identify a precise problem contract.

To reproduce this reviewed refresh without a network crawl:

```bash
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
python3 -B scripts/ingest/company_crawler.py --reviewed
python3 -B scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx
```

`company_report_observations.json` preserves exact source links, retrieval dates and source-reported last-asked labels where available. `--reviewed` imports the complete manifest offline and retains evidence even for problems already in a snapshot. A filtered `--reviewed` run requires `--dry-run`; it cannot erase other companies or silently truncate the saved manifest. Expand **Sources and dates** on a table row to inspect its evidence. “Website reports” does not assert that undated interviews happened recently.

### System design books

The Interview Guides section is a read-only reader: pick a collection, then a chapter from the contents on the left.
The original practice collections are maintained as Markdown sources under `scripts/ingest/` and imported into `content/system-design/`.
They include worked exercises for parking lots, elevators, vending machines, task schedulers, retrieval-augmented generation, bounded assistants, incident diagnosis, SLO alerting, and behavioral stories, plus:

- System Design Case Studies: payments, job scheduling, collaborative editing, leaderboards, a matching engine, ad click aggregation, metrics, object storage, hotel booking, a distributed cache and email.
- AI-Assisted Coding Interviews, CS Fundamentals, Frontend Interviews, and Resume, Job Search and Offers.
Each book is imported once into `content/system-design/<book>/` (an `index.json` plus one Markdown file per chapter).

```bash
python3 -m pip install pdfplumber   # once; MIT-licensed PDF layout reader
npm run ingest:system-design -- grokking "./Grokking-the-system-design-interviewpdf-5-pdf-free.pdf"
npm run ingest:system-design -- advanced "./Grokking the Advanced System Design Interview.pdf"
npm run ingest:system-design -- notes "./Grokking the System Design Interview.md"   # Awesome-Senior-Engineer-Algorithms-Review
```

The Kafka chapters in the advanced collection include a version-scoped update for Kafka 4.0 and later, where ZooKeeper mode has been removed in favor of KRaft.
The reviewed NeetCode 150 snapshot is stored in `scripts/ingest/neetcode_150.json` so workbook imports retain all 150 official entries while preserving existing slugs and saved progress.

The importer has layout rules per book: it rebuilds paragraphs and lists, keeps bold, italic and inline code, restores the ligatures the advanced PDF drops, and removes course boilerplate ("We'll cover the following", Back/Next links, page numbers) and inline URL dumps.
Diagrams, including the advanced guide's vector drawings, are rendered from their page region into WebP files under `public/course-assets/system-design/<book>/`.
The original document is published under `public/course-assets/system-design/sources/` for download.
It uses `/usr/share/dict/words` (present on macOS) to repair ligatures and hyphenation.
The LibreOffice export of the classic course is the same text as the `pdf-free` edition, which is used because its diagrams and tables survive intact.

### Business Analyst course

The course lives in `content/business-analyst/` and is hand-authored:

- `index.json`: chapter order, titles, summaries, skill tags, quiz size, pass mark and final exam size.
- `<chapter>.md`: text before the first `##` is the chapter introduction; every `##` section is one lesson (keep each to about 1–3 minutes of reading, starting with a `> **In short:**` line).
- `<chapter>.quiz.json`: the question bank. Each question has `lesson` (the 1-based `##` section it tests), `q`, four `options` with **the correct answer first** (choices are shuffled when shown), and `why`. Avoid positional options such as "all of the above".
- `tips.json`: tips shown in the tip-of-the-day card.

`src/lib/ba-content.test.ts` checks that every lesson is short and tested and every question is well formed. Progress, quiz attempts and notes are stored under the `ip:ba:v1` key and are included in practice backups.

## Deployment

The project deploys to Vercel; pushes to `main` deploy to production.

One-time setup for the Java, C++ and Go runner:

```bash
vercel link
vercel env pull .env.local          # provides VERCEL_OIDC_TOKEN for the Sandbox SDK
npm run sandbox:snapshot            # prints CODE_SANDBOX_SNAPSHOT_ID=snap_...
vercel env add CODE_SANDBOX_SNAPSHOT_ID production
```

An existing `JAVA_SANDBOX_SNAPSHOT_ID` keeps Java working; C++ and Go need the new snapshot.
If a compiled-language runner is unavailable, users receive retry guidance and keep their draft; infrastructure errors do not count as failed submissions. Requests time out after 65 seconds. For operators, a 503 indicates missing snapshot configuration; a 502 requires checking the server logs and snapshot/toolchain availability.
Sandbox usage is billed to the Vercel account.
The run endpoint accepts only same-origin browser requests, but it is not authenticated; enable Vercel Deployment Protection if the site should be private.

## Project layout

```
content/                  course lessons, problem specs, system design books (JSON + Markdown)
public/pyodide-worker.js  Python runner (Web Worker)
scripts/judge/js-worker.mjs  authored isolated JavaScript runner and TypeScript transpiler
public/js-worker.js       generated QuickJS worker bundle (npm run worker:build)
scripts/ingest/           course and document importers
scripts/judge/            expected-output generator and verifier
scripts/sandbox/          snapshot builder for the Java, C++ and Go runner
src/app/                  pages and the /api/run/[lang] route
src/components/           UI, including the problem workspace
src/lib/judge/            spec types, harness generators, grading and runners
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Judge unit tests |
| `npm run tests:build` | Generate and verify expected outputs |
| `npm run ingest:grokking` | Import the coding course |
| `npm run ingest:system-design` | Import a system design book |
| `npm run sandbox:snapshot` | Build the Java Sandbox snapshot |

The JavaScript worker is generated before development, production builds and unit tests. Submitted code runs in a fresh QuickJS context with no browser globals, networking or module loader; only output and a clock are exposed. The interpreter has a 128 MiB memory limit, and the page terminates the worker after 10 seconds. TypeScript is transpiled before execution.
