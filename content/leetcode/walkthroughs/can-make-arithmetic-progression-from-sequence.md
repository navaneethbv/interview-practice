## Intuition
An arithmetic progression has the same difference between every adjacent pair.
Because reordering is allowed, sort the values and check that single condition.
Any progression can be listed in increasing order, decreasing order, or as equal values, so the sorted arrangement is sufficient.

## Brute force
Try every permutation and test whether all adjacent differences agree.
There are n factorial permutations and O(n) work per check, for O(n*n!) time with O(n) storage for a candidate arrangement.
Sorting replaces that search with one canonical order.

## Approach
1. Copy the input and sort the copy in ascending order.
2. Compute the difference between its first two values.
3. Compare every remaining adjacent difference with that first difference.
4. Return false on the first mismatch, or true after all differences match.

If the scan succeeds, the sorted array itself supplies a valid progression.
Conversely, any possible progression with nonzero difference lists the same values in ascending or descending order.
Reversing a descending progression only changes the sign of its common difference.
Thus a failure in sorted order rules out every ordering.

## Walkthrough
Example 1 contains `[5,1,3]`.
The sorted copy is `[1,3,5]`.
The first adjacent difference is `3 - 1 = 2`.
The remaining difference is `5 - 3 = 2`, which agrees.
The method returns true, and the original array remains `[5,1,3]`.

## Complexity
Sorting dominates the O(n) verification scan, giving O(n log n) time.
The copied array requires O(n) auxiliary space.
Any sorting workspace fits within that overall O(n) bound for these implementations.
The answer itself is a single boolean.

## Edge cases
Every two-element array forms an arithmetic progression.
All equal values have common difference zero and are valid.
Duplicates mixed with unequal values cannot form a nonzero-difference progression and fail the scan.
Negative values require no special treatment.

## Common mistakes
- Checking the original order ignores the permission to rearrange values.
- Comparing only the smallest and largest values does not verify the intermediate gaps.
- Treating a zero common difference as invalid rejects arrays of equal values.

## Language notes
Python uses `sorted`, which creates a new list.
Java clones the array before `Arrays.sort`, preserving the input in the same way.
Differences fit Java `int` because the local value bounds are between negative and positive one million.
