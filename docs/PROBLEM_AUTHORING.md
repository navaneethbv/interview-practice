# Workbook problem content

Import the workbook with `python3 scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx` after installing `openpyxl` in your Python environment.
The importer writes `content/sets/sets.json` and `content/sets/problems.json`.
Authored lists and metadata live in `scripts/ingest/custom_problem_sets.json` and are merged into the workbook catalog on every import.
Update this source for CTCI catalog changes; list IDs and problem slugs must not collide with workbook entries.
The workbook contains 10 lists and 879 unique problems; its NeetCode 150 sheet contains 141 distinct entries.
LC 659 is merged into LC 271 as the workbook's duplicate entry.

For each slug, author an original `content/leetcode/<slug>.md` statement, a `<slug>.json` spec, and a Python `<slug>.py` reference.
Set `id` to the filename slug and `style` to `leetcode`.
Include two or three sample cases with independently calculated expected values and eight to fifteen hidden cases covering valid boundary inputs.
Use the original LeetCode method and parameter names.
A Java reference is optional but is required to claim that a particular problem's Java reference has been checked.
Run `npm run tests:build -- --java <slugs...>` after each batch.
The builder checks fixed sample expectations and fills missing outputs from the Python reference.
Only problems with a statement, reference, and all expected outputs appear as available.

## Helper types and adapters

- `ListNode` uses `val` for LeetCode specs and `value` for the original course.
- `GraphNode` renders `Node` and uses adjacency arrays indexed by labels starting at 1.
  Graph clone outputs are checked for reused input nodes and serialize in label order with sorted neighbors.
- `RandomNode` renders `Node` and uses `[value, randomIndex]` rows, with `null` for no random target.
  Clones must use new nodes and their random pointers must stay within the cloned list.
- `NaryNode` renders `Node` and uses LeetCode level-order groups separated by `null`.
  A spec can select only one `Node` definition.
- `NextNode` supplies binary-tree `Node` links, including `next`.
- `ParentNode` uses a hidden `parentTree` fixture and numeric node selectors.
- `DoublyNode` checks a circular doubly linked result against original BST nodes.
- `CircularNode` supplies a circular singly linked list.
- `MultiNode` uses nested `{val, child}` rows and checks flattened next/previous links, cleared children, and original node identities.
- `NestedInteger` and `List<NestedInteger>` wrap ordinary nested JSON arrays.
- `IntIterator`, `List<Employee>`, and `HtmlParser` provide iterator, employee-row, and local directed-crawl fixtures.
- `Robot` uses `{room, start}` and `Master` uses `{words, secret, allowedGuesses}` fixtures.
  Their methods enforce operation limits; `output: {arg, as: "interaction"}` reads the resulting cleaned cells or successful guess.
- A `ListNode` parameter with `fromList: 0` accepts `{values, tail}` to append an existing suffix from argument 0.
  `{values, at}` passes a selected node; `output: {arg: 0, root: true}` grades the full original list after mutation.
  `output: {as: "listIndex"}` grades a returned node by its original index, including cyclic lists with duplicate values.
- A `TreeNode` parameter with `fromTree: 0` resolves its numeric input to an existing node in argument 0, preserving identity.
  `returnTree: 1` requires the result to come from a different tree argument, as in a cloned-tree lookup.
- `roundTrip: {className: "Codec", encode: "serialize", decode: "deserialize"}` checks lossless serialization with a fresh decoder instance.
  Set `sameInstance: true` for stateful URL codecs.
- `output: {arg: 0, prefix: true}` grades only the returned-count prefix of a mutated buffer.
- `output: {as: "unsigned32"}` preserves Java's signed `int` signature while comparing an unsigned bit result.
- `environment: {kind, param}` configures `badVersion`, `guess`, `celebrity`, or `read4` APIs from a trailing testcase input that is not passed to the solution method.
  Design problems place their configuration in `input.environment` and retain it across operations within that case.

## SQLite

SQL specs use `kind: "sql"`, a `tables` schema, `resultColumns`, and tests with `input.tables` mapping table names to rows.
Their source of truth is `<slug>.sql`.
Use `compare: "unordered"` unless row order is part of the problem.
Named query parameters, such as `:n`, come from `input.params`.
For a DELETE exercise, set `resultQuery` to a trusted SELECT that inspects the result.
Each test uses a fresh in-memory SQLite database in both local verification and the browser.
The browser loads Pyodide's `sqlite3` package and offers only SQLite in the language selector.
Use SQLite syntax and document dialect differences from LeetCode's MySQL examples.

## Progress and validation

Problem progress keys are `lc:<slug>`.
Cumulative submission counts are independent of the recent event and code-history limits.
List resets record their own count baselines, leaving other lists' progress intact.
Saved code is shared per problem, so choosing to clear it also clears the code shown when that problem is opened from another list.
Legacy events already discarded before cumulative counts were introduced cannot be recovered.

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run tests:build -- --java`, and `npm run build` for the final gate.
Run `python3 scripts/judge/content-status.py` for current availability, completed slugs, and the next missing slug in priority order.
The JSON checkpoint records file completeness; reference checks and browser checks must be reported separately.
JavaScript-only problems 2619, 2620, 2667, 2703, and 2704, shell problem 193, and pandas problem 2879 remain unavailable because they have no suitable runner.
The threaded web crawler checks reachable URLs and hostname filtering, not scheduling or network throughput.
Use Java for threaded submissions; Python in the browser supports the sequential traversal contract.

## Coverage

The BCTCI list includes all 37 online-chapter problems, using labels S.1-S.6, M.1-M.8, U.1-U.7, B.1, and P.1-P.15.
Its 232 entries still exclude book problems 34.9 and 39.8, which need additional harness support.
Sliding Maximum and Matrix Rotation reuse the existing matching problems.
The other online problems have original statements, Python and Java references, two fixed samples, and at least eight hidden cases.
Run `python3 -B scripts/judge/test_bctci_online.py` for independent exhaustive and fixed small-instance reference checks, in addition to the normal judge gates.

The online statements document their runner conventions explicitly.
Map lookups return an empty list for a missing key or a singleton list for a stored integer, preserving the distinction without a nullable primitive type.
Collection enumeration is ordered, union-find representatives are component minima, and MST reconstruction uses input order to break equal-weight ties.
The string-labeled binary-tree problem uses child-index arrays so labels retain their original type without changing the shared numeric TreeNode helper.

All 872 problems supported by the Python, Java, and SQLite runners are authored.
The remaining seven require JavaScript, shell, or pandas runners.
`problem-content-checkpoint.json` is a saved snapshot of `content-status.py` output; rerun the script for current coverage.

## Solution walkthroughs

Store original solution explanations in `content/leetcode/walkthroughs/<slug>.md`.
This directory is separate from top-level statements and specs, so explanations do not publish extra problems or enter judge discovery.
The Solution tab renders the walkthrough when present and otherwise retains the workbook hint and complexity summary.
Walkthroughs supply their own complexity analysis in place of the workbook summary.
Coding references display Python and, when present, Java; SQL problems display only their SQLite reference.

Use these level-two headings in order: Intuition, Brute force (optional for trivial problems), Approach, Walkthrough, Complexity, Edge cases, Common mistakes, and Language notes.
For SQL, replace Language notes with SQLite notes.
Aim for 250 to 600 words, with each full sentence on its own source line.
Use Example 1 from the local statement for the dry run and match variable names and complexity claims to the reference code.
Do not include raw HTML, images, external links, or em dash punctuation.
Use language-tagged fenced blocks for code examples.

References should use descriptive names, one statement per line, and small methods with cognitive complexity below 15.
Java references must preserve the spec's contract and use the harness-provided imports and helper classes.
Python remains the expected-output source of truth; readability edits must preserve all stored expectations.
Never use `--regen` for solution authoring.
Run the targeted judge for every touched slug and verify that no problem JSON changed, then run the full judge and production build before opening a PR.

The coverage report includes walkthrough counts, Java counts, and readable-Java counts per list, plus the next missing slug in workbook priority order.
Readable-Java coverage is a conservative formatting heuristic, not proof of algorithm quality or judge correctness.
It checks for more than three nonblank lines, a maximum line length of 120 characters, and no inline statements except for-loop headers.
Manual review must still check names, explanations, complexity, and edge cases.
