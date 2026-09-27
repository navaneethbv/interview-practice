## Intuition

A valid prefix never contains more closing parentheses than opening ones.
Rather than generating invalid complete strings and rejecting them, extend only prefixes that can still lead to a balanced result.
Track how many parentheses of each kind have already been used.

## Brute force

Generate every length-2n string of opening and closing parentheses, then validate each one.
There are 2^(2n) candidates, giving O(n × 4^n) time when each candidate is checked independently.
Most fail before the end, so backtracking can prune them much earlier.

## Approach

1. Use backtracking with counters `opened` and `closed`, a mutable `path`, and a `result` list.
2. If `closed == n`, copy the completed path into the result.
3. If `opened < n`, append an opening parenthesis, recurse with one more opening, and undo the append.
4. If `closed < opened`, append a closing parenthesis, recurse with one more closing, and undo that append.
5. Start with both counters zero and return all completed strings.

Every generated prefix satisfies `closed <= opened <= n`.
When `closed` reaches n, that invariant also forces `opened` to equal n, so the copied string is balanced and complete.
Each decision sequence is unique, so no duplicate-removal set is needed.

## Walkthrough

Example 1 has `n = 1`.

| `path` | `opened` | `closed` | Action |
| --- | --- | --- | --- |
| Empty | 0 | 0 | Only an opening is legal |
| `(` | 1 | 0 | Opening quota reached; append closing |
| `()` | 1 | 1 | Copy into `result` |
| `(` | 1 | 0 | Undo closing while returning |
| Empty | 0 | 0 | Undo opening; search complete |

The result contains exactly `["()"]`.
For larger n, the same undo operations allow a prefix to explore multiple legal continuations.

## Complexity

- Time: O(n × Cn), where Cn is the nth Catalan number, accounting for traversal and copying each length-2n result.
- Space: O(n) auxiliary path and recursion depth, plus O(n × Cn) to store the returned strings.

## Edge cases

For n = 1 there is one result.
Nested and adjacent pairs are both explored when legal.
The bound n <= 8 keeps recursion depth at most 16; zero pairs are outside the stated contract.

## Common mistakes

- Allowing a closing parenthesis whenever `closed < n` generates invalid prefixes.
- Forgetting to undo an append contaminates sibling branches.
- Saving the mutable path object itself makes earlier results change later.

## Language notes

Python joins the character list into a new string at each leaf.
Java uses `StringBuilder.toString()` to create the corresponding snapshot, then removes the last character during backtracking.
Both avoid allocating a new prefix string at every recursive call.
