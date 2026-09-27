## Intuition

For a value seen before, only its most recent index can give the smallest distance to the current index.
Store that index while scanning from left to right.
If the current index minus the stored index is at most k, a valid nearby duplicate exists.
Then replace the stored index with the current one for future positions.

## Brute force

A direct solution could compare every pair of equal values and test their index distance.
Checking all pairs takes O(n²) time in the worst case.
It also repeats comparisons with older occurrences that are farther away than the newest occurrence.
The last-index map keeps exactly the useful occurrence.

## Approach

1. Create last_index as an empty map.
2. At each index, look up the current value.
3. If a previous index exists within k positions, return true immediately.
4. Otherwise, store the current index as the newest occurrence.
5. If the scan ends without a match, return false.

## Walkthrough

For Example 1, nums is [1,2,1] and k is 2.
The first 1 is stored at index 0.
The value 2 is stored at index 1.
At index 2, the previous index for 1 is 0, and the distance is 2.
The method returns true.
With k equal to 1 in Example 2, that same distance is too large, so the scan returns false.

## Complexity

The scan takes expected O(n) time with hash-map operations.
The map stores at most one index for each distinct value, so extra space is O(n).
Replacing an index is sufficient because older occurrences are never closer to a later index.

## Edge cases

When k is zero, distinct indices can never be close enough, so duplicates return false.
A one-element input has no pair.
Negative values use the same map behavior as positive values.
A duplicate exactly k positions away is accepted.

## Common mistakes

Do not store only a set when the distance limit is larger than one.
Do not compare against the first occurrence instead of the latest occurrence.
Do not use a strict less-than check, because distance k is allowed.
Do not return true for the same index.

## Language notes

Python uses a dictionary keyed by each integer value.
Java uses a HashMap from Integer to its latest index.
Both methods preserve the required containsNearbyDuplicate signature.
