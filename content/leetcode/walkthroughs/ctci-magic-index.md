## Intuition

For a sorted array, the value at the midpoint bounds where a magic index can still occur.
With duplicate values, the left side may need to extend as far as `A[mid]`, and the right side may begin after that value.
Searching the left branch first guarantees the smallest valid index is returned.

## Approach

Recursively search the current inclusive interval.
At midpoint `mid`, search the left range through `min(mid - 1, A[mid])` because larger indices cannot be forced below the sorted value boundary.
If the left search fails, test `A[mid] == mid`.
Finally search from `max(mid + 1, A[mid])` through the right boundary.
The two clamped ranges preserve correctness with duplicates while skipping impossible positions.

## Walkthrough

In Example 1, the array's midpoint checks narrow the search toward the first index where the value catches up with the index.
The left-first recursion eventually tests index seven, where the value is seven, and returns it before any later match is considered.
In Example 2, the repeated value two makes the left boundary clamp important, and index two is found as the first magic index.

## Complexity

With distinct values, the pruning behaves like binary search and takes `O(log n)` time.
With duplicates, the worst case can revisit many indices, so the guaranteed time is `O(n)`.
The recursion uses `O(log n)` stack space in favorable cases and `O(n)` in the worst case.

## Edge cases

An empty array starts with an invalid interval and returns `-1`.
Index zero is checked normally, so an initial value of zero is an immediate answer.
Repeated values may produce several magic indices, but left-first traversal preserves the smallest one.

## Common mistakes

Using the distinct-value binary-search bounds with duplicates can skip a valid earlier index.
Checking the midpoint before the left branch can return a larger magic index than required.
Forgetting the `start > end` base case causes invalid recursive intervals to continue.

## Language notes

Python uses floor division for the midpoint and the same clamped bounds as the Java version.
Java uses an unsigned right shift for midpoint calculation, which avoids overflow for nonnegative indices.
Both implementations pass the sorted array and interval bounds without allocating a copy.
