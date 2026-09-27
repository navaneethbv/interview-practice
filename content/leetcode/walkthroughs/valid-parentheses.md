## Intuition

Correct nesting means the most recently opened bracket must be the next one closed.
A stack directly models that last-in, first-out obligation.
Matching the counts of bracket kinds alone cannot detect crossing pairs.

## Brute force

Repeatedly remove adjacent matching pairs until no more can be removed.
Repeated string scans and reconstruction can take O(n²) time.
A stack performs each bracket's work once during a single scan.

## Approach

1. Map each closing bracket to its required opening bracket in `pairs`.
2. Scan `s` from left to right.
3. Push an opening bracket onto `stack`.
4. For a closing bracket, return false if the stack is empty or its popped top does not match.
5. After the scan, return true only if the stack is empty.

At each position, the stack stores exactly the unmatched openings in their encounter order.
A matching pop discharges the newest obligation, preserving the nesting rule.
Any leftover opening still needs a closing bracket, so reaching the end is not by itself sufficient.

## Walkthrough

Example 1 uses `s = "{[()]}"`.

| Character | Stack after processing |
| --- | --- |
| `{` | `{` |
| `[` | `{ [` |
| `(` | `{ [ (` |
| `)` | `{ [` |
| `]` | `{` |
| `}` | Empty |

Every closing bracket matches the stack top, and no openings remain.
Return true.

## Complexity

- Time: O(n), with at most one push or pop per character.
- Space: O(n), when many opening brackets appear before their closings.

## Edge cases

A leading closing bracket fails immediately.
A string consisting only of opening brackets fails the final emptiness check.
Different bracket kinds can nest as long as they close in reverse order.
The input contains only the six allowed bracket characters.

## Common mistakes

- Comparing totals of opening and closing brackets accepts crossing pairs such as `([)]`.
- Popping without an empty-stack check fails on an unmatched closing bracket.
- Returning true immediately after one matched pair ignores the rest of the string.

## Language notes

Python uses a list with `append` and `pop`.
Java uses `ArrayDeque<Character>` as a stack and explicitly compares primitive character values when matching boxed entries.
The small closing-to-opening map contains only three fixed pairs in both versions.
