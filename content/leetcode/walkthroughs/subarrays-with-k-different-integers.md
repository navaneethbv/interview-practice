## Intuition

Counting exactly `k` distinct values directly makes the left boundary awkward.
The identity `exactly(k) = atMost(k) - atMost(k - 1)` turns the task into two monotonic sliding-window counts.

## Brute force

Enumerating every start and extending every end while maintaining a set takes O(n^2) time in the worst case.
The same subarrays are reconsidered for each possible left boundary.

## Approach

1. Define `at_most(limit)` with a frequency map and a left pointer.
2. Add each value at `right`, then advance `left` until the window has at most `limit` keys.
3. Add `right - left + 1`, the number of valid subarrays ending at `right`.
4. Return `at_most(k) - at_most(k - 1)`.

## Walkthrough

For Example 1, `nums = [1,2,1,2,3]` and `k = 2`, the at-most-2 scan counts every suffix ending at each right index that uses no more than two values.
At right 0, the count added is 1.
At right 1, the window `[1,2]` adds 2.
At right 2, `[1,2,1]` adds 3, and at right 3 it adds 4.
When value 3 arrives, the left boundary moves from 0 to 3, removing 1, 2, and 1, so only `{2,3}` remains and 2 is added.
The at-most-2 total is 12, the at-most-1 total is 5, and their difference is 7.

## Complexity

Each at-most scan advances both pointers at most n times, so the two scans take O(n) expected time.
The frequency map stores O(n) distinct values in the worst case, and the result uses O(1) extra space.

## Edge cases

When `k` is one, subtracting at-most zero correctly removes every nonempty window.
Repeated values remain one map key while their frequency changes.
The method assumes the statement's positive `k`, so the helper is never asked to count an invalid negative limit.

## Common mistakes

Do not count only windows whose current map size equals k, since smaller windows ending at the same right index also contribute to at-most counts.
Delete a key when its frequency reaches zero, or the window will appear to contain too many values.
Use the difference of two counts, not a second distinctness condition on the final window.

## Language notes

Python uses `defaultdict(int)`, while Java uses `HashMap<Integer,Integer>` and `merge`.
Java's total is an `int`, which matches the reference contract and the supplied output range.
