## Intuition
Although rotation breaks the global order, at least one half around the midpoint is sorted unless duplicates hide that fact.
If the endpoints, midpoint, and target region are indistinguishable, shrinking both endpoints is the only safe progress.
Otherwise ordinary binary-search range tests identify which half can contain the target.

## Brute force
A linear scan always works and costs O(N) time with O(1) space.
The rotated binary search is faster on informative inputs, although duplicates can reduce its worst case to linear time.

## Approach
1. Inspect the midpoint and return true if it equals `target`.
2. When left, middle, and right values are equal, increment left and decrement right.
3. If the left half is sorted, keep it only when the target lies inside its half-open value range.
4. Otherwise the right half is sorted, and apply the symmetric range test.
5. Continue until the search interval is empty.

## Walkthrough
Example 1 is `[2, 2, 3, 0, 1, 2]` with target 0.
The first midpoint is index 2 with value 3, and the left half is sorted from 2 through 3.
Target 0 is outside that range, so the search moves to the right half.
The remaining range is indices 3 through 5, whose midpoint is index 4 with value 1.
That left half is sorted and contains target 0, so the right boundary moves to index 3.
The next midpoint is index 3 with value 0, and the method returns true.

## Complexity
The normal binary-search path takes O(log N) time.
When duplicates repeatedly force endpoint shrinking, worst-case time is O(N).
The algorithm uses O(1) additional space.

## Edge cases
A one-element array is handled by the midpoint comparison.
An array of equal values may require shrinking one endpoint at a time.
The target can be at the rotation pivot or at either endpoint.

## Common mistakes
Assuming one half is sorted when all three boundary values match can discard the target.
Using closed ranges inconsistently causes endpoints to be skipped.
Claiming guaranteed logarithmic time ignores duplicate-induced shrinking.

## Language notes
Python and Java use integer midpoint arithmetic without allocating slices.
Java's `int` values safely cover the stated range, and its explicit branches mirror Python's comparisons.
Neither implementation mutates the input array.
