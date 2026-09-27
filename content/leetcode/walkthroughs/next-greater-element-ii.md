## Intuition

The array is circular, so each value can inspect the array a second time after its own position.
A decreasing stack stores indices whose next greater value is still unknown.
The first pass adds original indices, while the second pass supplies wraparound candidates.

## Brute force

For each index, scanning forward around the circle can take O(n) time.
Doing that for all indices costs O(n squared).
The monotonic stack resolves each index at most once.

## Approach

1. Fill the result with -1.
2. Iterate virtual indices from zero through two times the array length.
3. Pop smaller stack values when the current circular value is greater.
4. Push indices only during the first pass.
5. Leave unresolved entries as -1.

## Walkthrough

Example 1 is [1,2,1].
The first pass sees 1 and then 2, so 2 resolves index 0.
The final 1 is smaller than 2 and stays pending.
During the virtual second pass, value 2 resolves the original index 2.
Index 1 has no greater value, so the result is [2,-1,2].

## Complexity

Each index is pushed once and popped at most once.
The time complexity is O(n), and the stack uses O(n) auxiliary space.
The result array uses O(n) output space.
The circular second pass does not duplicate stored indices.

## Edge cases

A circular array with all equal values leaves every entry at -1.
A strictly descending array lets each lower value find a larger value after wrapping, except for the global maximum.
A maximum value has no greater value.
Equal values do not count as greater and remain stacked.
A one-element array returns [-1].

## Common mistakes

- Pushing indices during the second pass duplicates work and can overwrite answers.
- Comparing values with less-than-or-equal resolves equal values incorrectly.
- Forgetting modulo indexing loses wraparound candidates.
- Clearing the stack between passes prevents circular matches.

## Language notes

Python stores integer indices in a list.
Java uses ArrayDeque as a decreasing index stack.
Both preserve the original index when writing results.
