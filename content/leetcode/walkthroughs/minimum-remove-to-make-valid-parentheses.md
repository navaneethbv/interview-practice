## Intuition

A closing parenthesis is invalid when there is no unmatched opening parenthesis before it.
An opening parenthesis left on the stack after the scan is also unmatched and must be removed.
Marking only those indexes preserves every letter and every matched parenthesis in original order.

## Brute force

Trying subsets of parentheses and validating each candidate is exponential in the number of parentheses.
A repeated scan that removes one invalid character at a time can also rescan the whole string many times.
The stack identifies all removals in one pass.

## Approach

1. Push every opening parenthesis index onto unmatched_open.
2. For a closing parenthesis, pop a matching opening index when possible.
3. Mark an unmatched closing index for removal when the stack is empty.
4. Mark every opening index remaining after the scan.
5. Build the result from characters whose indexes are not marked.

## Walkthrough

Example 1 uses s = "a)b(c)d".

| character | stack | removals |
| --- | --- | --- |
| a | [] | {} |
| ) | [] | {1} |
| b | [] | {1} |
| ( | [3] | {1} |
| c | [3] | {1} |
| ) | [] | {1} |
| d | [] | {1} |

The only removal is the closing parenthesis at index 1, producing "ab(c)d".

## Complexity

Let n be the string length.
The scan and final reconstruction each visit the string once, so time is O(n).
The unmatched stack, removal markers, and result builder use O(n) space.
The output itself can also contain O(n) characters.

## Edge cases

A string with no parentheses is returned unchanged.
A closing parenthesis at the beginning is removed.
Opening parentheses left at the end are removed.
The string "))((" produces an empty result.

## Common mistakes

- Treating every closing parenthesis as invalid ignores earlier unmatched openings.
- Keeping leftover openings after the scan leaves an unbalanced suffix.
- Removing characters while scanning shifts indexes and complicates the logic.
- Changing letters violates the requirement to preserve them.

## Language notes

Python stores removal indexes in a set and filters the original string.
Java uses a boolean array indexed by character position and a StringBuilder.
Both keep stack indexes rather than storing only parenthesis counts so exact deletions are known.
