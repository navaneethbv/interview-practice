## Intuition

The brackets describe nested repetitions, so the most recent unfinished bracketed section must be completed first.
A stack stores the text and repetition count that were active before each opening bracket.
When a closing bracket appears, the finished inner text is repeated and attached to its saved outer text.

## Brute force

A naive method could repeatedly search for the innermost bracket pair, expand it, and rebuild the surrounding string.
Each rebuild can copy a large portion of the partially decoded result, so nested or repeated expansions can cause quadratic or worse copying.
The stack processes each bracket boundary while retaining the same output-sensitive expansion work.

## Approach

1. Scan the encoded string from left to right while accumulating a possibly multi-digit repetition count.
2. On an opening bracket, push the current text and count, then start a fresh inner text buffer.
3. Append ordinary letters to the current text buffer.
4. On a closing bracket, pop the saved prefix and count, repeat the current text, and attach it to that prefix.
5. Return the final text after every nested frame has been closed.

## Walkthrough

Example 1 is 3[a2[c]].
The scan first reads count 3 and saves an empty prefix when it sees the outer opening bracket.
It then reads a and saves the prefix a with count 2 at the inner opening bracket.
The inner c closes to cc, so the current text becomes acc.
The outer closing bracket repeats acc three times and returns accaccacc.

## Complexity

Let n be the encoded length and C be the total character volume materialized across all intermediate and final expansions.
The time complexity is O(n + C), which is safely bounded by O(n times k) when k is the final decoded length.
The stack uses O(n) auxiliary space for nesting, while the current, saved, and returned text buffers can occupy O(n + k) space.
Python prefix concatenation can create intermediate copies, so its actual temporary text is included in C rather than hidden by the final output size.

## Edge cases

A single unbracketed letter is returned unchanged.
Multi-digit counts are accumulated before the opening bracket.
Nested groups close in last-in-first-out order.
An empty input produces an empty output under the reference contract.

## Common mistakes

- Resetting the count before saving it loses the multiplier for the new frame.
- Reusing the outer buffer for inner characters mixes nesting levels.
- Repeating only the last character instead of the entire completed group breaks multi-character groups.
- Treating every digit as output would retain syntax that should control repetition.

## Language notes

Python stores mutable character lists inside stack frames and joins the final list.
Java keeps StringBuilder objects for prefixes and reads characters with charAt to avoid a separate input array.
Both references preserve the judge method name decodeString.
