# Interview Practice

A LeetCode-style website for practicing software engineering interviews: coding problems with a real editor and hidden test cases, pattern lessons, and system design books.

Live: https://interview-practice-sandy-eight.vercel.app

## Features

- **Problems**: every coding problem from the Grokking pattern course, with difficulty, pattern and status filters.
- **Workspace**: problem description, worked solution and your submission history on the left; a Monaco editor (Python 3 or Java) and a Testcase / Test Result console on the right.
- **Run** checks your code against the sample cases and any cases you add or edit (expected output comes from a tested reference solution).
- **Submit** checks it against every case, including hidden edge cases, and reports Accepted, Wrong Answer, Runtime Error, Compile Error or Time Limit Exceeded.
- **Patterns**: the course lessons, with diagrams, math and highlighted code in both languages.
- **Interview Guides**: system design books plus focused practice for low-level design, AI architecture, testing and debugging, and behavioral interviews.
- Light and dark themes with low-glare colors, keyboard shortcuts (`Ctrl/⌘ + '` to run, `Ctrl/⌘ + Enter` to submit) and progress saved in the browser.

## How code runs

| Language | Where | Notes |
| --- | --- | --- |
| Python 3.13 | In the browser, with [Pyodide](https://pyodide.org) in a Web Worker | No server needed. The first run downloads the runtime (about 10 MB); later runs are instant. |
| Java 21 | `/api/run/java` on Vercel, inside a [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) microVM | Booted from a snapshot with the JDK installed, no network access, 10 second run limit. About 5 seconds per run. |

Both languages use the same test data.
A problem's spec (`content/problems/<id>.json`) declares the signature and test inputs.
The site generates a harness for each language that converts JSON inputs into typed arguments (including `ListNode`, `TreeNode` and `Interval`), calls your `Solution`, and prints JSON results.
Outputs are compared in TypeScript, with order-insensitive checks and validators for problems that have several correct answers.

## Getting started

Requirements: Node.js 22+, Python 3.12+ (for generating test data), and for Java locally a JDK 17+ on your `PATH`.

```bash
npm install
npm run dev
```

Open http://localhost:3000.
In development, Java runs with your local JDK unless `JAVA_SANDBOX_SNAPSHOT_ID` is set.

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
npm run tests:build -- some-id   # only some problems
```

### System design books

The Interview Guides section is a read-only reader: pick a collection, then a chapter from the contents on the left.
The original practice collections are maintained as Markdown sources under `scripts/ingest/` and imported into `content/system-design/`.
They include worked exercises for parking lots, elevators, vending machines, task schedulers, retrieval-augmented generation, bounded assistants, incident diagnosis, SLO alerting, and behavioral stories.
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

## Deployment

The project deploys to Vercel; pushes to `main` deploy to production.

One-time setup for the Java runner:

```bash
vercel link
vercel env pull .env.local          # provides VERCEL_OIDC_TOKEN for the Sandbox SDK
npm run sandbox:snapshot            # prints JAVA_SANDBOX_SNAPSHOT_ID=snap_...
vercel env add JAVA_SANDBOX_SNAPSHOT_ID production
```

Sandbox usage is billed to the Vercel account.
The Java endpoint accepts only same-origin browser requests, but it is not authenticated; enable Vercel Deployment Protection if the site should be private.

## Project layout

```
content/                  course lessons, problem specs, system design books (JSON + Markdown)
public/pyodide-worker.js  Python runner (Web Worker)
scripts/ingest/           course and document importers
scripts/judge/            expected-output generator and verifier
scripts/sandbox/          Java snapshot builder
src/app/                  pages and the /api/run/java route
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
