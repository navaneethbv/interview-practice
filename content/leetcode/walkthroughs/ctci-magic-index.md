## Intuition

Sorted order restricts where a value equal to its index can occur, even when duplicates are allowed.
A midpoint value can eliminate part of each side, but duplicates mean the usual single-branch binary-search decision is unsafe.
Search the left candidate region first to obtain the smallest matching index.

## Brute force

Scan every index and return the first one whose value equals that index.
This is O(n) time and constant space, and remains a useful baseline because duplicates can force the reference to inspect linearly many positions too.

## Approach

At midpoint `mid`, search the left interval ending at `min(mid - 1, A[mid])`.
Sortedness proves that excluded left indices above A[mid] cannot equal their values.
Return a match found there before considering the midpoint.
If `A[mid] == mid`, return mid.
Otherwise search right starting at `max(mid + 1, A[mid])`.
An interval with start greater than end returns -1.
Every recursive candidate interval is smaller than its parent.

## Walkthrough

In Example 1, midpoint 5 contains 3, so the left search is restricted to indices 0 through 3 and finds nothing.
The right search spans 6 through 10 and first examines index 8, whose value is 9.
Its left region includes index 7.
Index 6 does not match, then index 7 is found to contain 7.
Return 7 before examining later candidates.

## Complexity

Worst-case time is O(n) with duplicate-heavy inputs.
Recursive depth is O(log n) because each branch remains within a half interval, so stack space is O(log n).
Pruning can reduce the actual work substantially.

## Edge cases

An empty array returns -1.
When several indices match, searching left first preserves the smallest answer.
Negative values can discard entire left regions.

## Common mistakes

Applying the distinct-values binary-search rule can skip a valid index when repeated values appear.
Checking the midpoint before searching left can return a later match.

## Language notes

Both references pass interval indices rather than copying array slices.
Java uses unsigned shift for midpoint division; Python uses integer division on the nonnegative index sum.
