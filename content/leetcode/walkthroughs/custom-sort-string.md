## Intuition

The output needs the same character counts as `s`, but only the characters listed in `order` have relative-order restrictions.
Counting occurrences separates multiplicity from placement.
We can emit each ranked character's entire group in the required order, then append the unrestricted characters.

## Brute force

Trying every arrangement requires up to O(n!) candidates for n characters, followed by validation of their relative ranks.
A comparison sort using a rank table is simpler but still costs O(n log n) comparisons.
With a fixed lowercase alphabet, counting and grouped emission avoid comparisons entirely.

## Approach

1. Count every character in `s` using `counts`.
2. Visit the characters of `order` from left to right.
3. Emit all copies of each visited character and remove or clear its count.
4. Emit the remaining character groups, which have no required ordering.
5. Join the collected pieces into the result.

The groups may contain zero copies when a ranked character does not appear in `s`.
Clearing processed counts ensures every occurrence is emitted exactly once.

## Walkthrough

Example 1 uses `order = "cba"` and `s = "abcd"`.

| Stage | Emitted prefix | Remaining nonzero counts |
| --- | --- | --- |
| Count input | empty | `a:1, b:1, c:1, d:1` |
| Process c | `c` | `a:1, b:1, d:1` |
| Process b | `cb` | `a:1, d:1` |
| Process a | `cba` | `d:1` |
| Emit leftovers | `cbad` | none |

The result contains all four original characters and respects c before b before a.

## Complexity

- Time: O(n + m + A), for input length n, order length m, and alphabet size A = 26.
- Space: O(n + A), including the constructed output; character counts alone need O(A).

## Edge cases

Repeated characters must preserve their full multiplicity.
Characters absent from `order` may appear anywhere in a valid answer.
An order character absent from the input contributes an empty group.
The input and order contain only lowercase English letters, and order characters are distinct.

## Common mistakes

- Dropping unranked characters loses part of the input.
- Leaving emitted counts active duplicates ranked characters in the final pass.
- Requiring a specific leftover order rejects otherwise valid answers.

## Language notes

Python builds string pieces with `Counter` and joins once, avoiding repeated growth of one immutable string.
Java uses a 26-entry array and `StringBuilder`.
Python preserves encounter order for leftover keys, while Java emits leftovers alphabetically; both satisfy the validator.
