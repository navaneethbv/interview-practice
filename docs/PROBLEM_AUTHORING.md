# Workbook problem content

Import the workbook with `python3 scripts/ingest/problem_sets.py Interview_Prep_Plan_ENRICHED.xlsx` after installing `openpyxl` in your Python environment.
The importer writes `content/sets/sets.json` and `content/sets/problems.json`.
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

## Current implementation checkpoint

All 872 problems supported by the Python, Java, and SQLite runners are authored.
The remaining seven require JavaScript, shell, or pandas runners.
See `problem-content-checkpoint.json` for the latest saved coverage snapshot.
The protected pre-existing README, document importer, importer tests, and package test script remain unchanged by this work.
