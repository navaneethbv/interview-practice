## Intuition

A closing parenthesis can be retained only if an earlier unmatched opener exists.
Pairing it immediately cannot reduce the maximum number of pairs, and using the nearest available opener follows the problem's explicit rule for selecting a unique answer.

## Brute force

Enumerate all subsequences and select the longest balanced one.
There are exponentially many choices, and an arbitrary longest answer may still violate the specified nearest-opener matching convention.

## Approach

Create a boolean `keep` array and an `openers` stack of indices.
Push the index of each opening parenthesis.
For a closer with a nonempty stack, pop the nearest unmatched opener and mark both positions to keep.
Ignore a closer when no opener exists.
Finally scan the original string and join only marked characters.
The stack enforces valid nesting while the final scan preserves original character order, rather than emitting pairs in the order they close.

## Walkthrough

Example 1 is `))(())(()`.
The initial two closers have no available openers and are discarded.
The next `(())` forms two nested matched pairs.
In the final `(()`, the closer matches the nearer of its two openers, leaving the earlier one unmarked.
Reading marked characters in their original order yields `(())()`.

## Complexity

Both scans take O(n) time for n characters.
The keep array, opener stack, and constructed output require O(n) space.

## Edge cases

An empty string returns empty.
All-open or all-close strings also return empty.
Already balanced input keeps every character.
Surplus openers remain on the stack and are naturally omitted.

## Common mistakes

Do not append both matched characters immediately when a closer appears, because that changes nested ordering.
Do not pair with the oldest opener when the contract requires the nearest.

## Language notes

Python builds the final string with a filtered join.
Java uses `ArrayDeque` for opener indices and a `StringBuilder` for the second-pass output, with an equivalent boolean keep array.
