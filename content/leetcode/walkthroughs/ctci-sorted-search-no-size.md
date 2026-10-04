## Intuition

Binary search needs an upper boundary, but it does not need the array's exact length.
Probe exponentially increasing positions until reaching a value at least as large as the target.
The reader's large out-of-range sentinel behaves like an ordered value above every legal target.

## Brute force

Read positions one at a time until finding the target or a greater value.
That may require O(n) reader calls, even though sorted order permits a logarithmic search.

## Approach

Initialize `bound` to one and inspect `reader.get(bound - 1)`.
While the returned value is below target, double `bound`.
Search the interval from `bound // 2` through `bound - 1` with ordinary binary search.
The last unsuccessful exponential probe proves the target cannot lie before that lower boundary.
A reader value below target moves `low` right; a greater value, including the sentinel, moves `high` left.
An empty search interval returns -1.

## Walkthrough

Example 1 hides `[1, 3, 5, 8, 13, 21]` and seeks 8.
Bounds 1 and 2 probe indices 0 and 1, returning 1 and 3.
Bound 4 probes index 3 and finds 8, ending expansion.
Binary search over indices 2 through 3 first sees 5 at index 2, then 8 at index 3.
Return 3.

## Complexity

For n hidden elements, the number of reader calls is O(log(n + 1)).
Auxiliary space is O(1).
This assumes each reader access is constant time.

## Edge cases

An empty reader immediately supplies the sentinel and eventually returns -1.
A target below the first element also fails without scanning the array.

## Common mistakes

This exercise uses a large sentinel, not -1.
Treating out-of-range values as small would make exponential expansion continue incorrectly.
The probed position is `bound - 1`, so its matching interval endpoints must remain consistent.

## Language notes

Python receives positive infinity beyond the array.
Java receives `Integer.MAX_VALUE`, which exceeds every legal target under the stated constraints.
