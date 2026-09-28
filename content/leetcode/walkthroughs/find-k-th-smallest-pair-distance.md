## Intuition
After sorting, count how many pairs have distance at most a candidate value.
This count is monotone, so binary search the smallest distance whose count reaches k.

## Brute force
Generating and sorting all O(n^2) pair distances uses quadratic time and space.
A sliding window counts pairs under a limit without materializing them.

## Approach
1. Sort `nums`.
2. Binary-search distance from zero through the maximum endpoint difference.
3. For each candidate, move a left pointer so `nums[right] - nums[left]` is at most the candidate.
4. Add `right - left` pairs ending at each right index.
5. Keep the lower half when the count reaches k, otherwise move the lower bound up.

## Walkthrough
For Example 1, sorted values are `[1,1,3]` and k is 1.
Distance 0 counts the pair of equal 1s, so the binary search returns 0.
For `[1,1,6]` and k 3, the distances are 0, 5, and 5, so the smallest distance whose count reaches 3 is 5.

## Complexity
Sorting costs O(n log n).
Each binary-search step counts pairs in O(n), and the distance range has `log(D+1)` steps, giving O(n log n + n log(D+1)) time where D is the maximum value difference.
Python sorting may use O(n) temporary workspace, while Java primitive sorting uses an implementation-dependent O(log n) stack; the sliding-window state is O(1).

## Edge cases
Equal values create zero-distance pairs.
The window count includes every pair exactly once.

## Common mistakes
Count `right - left`, not just one pair per right endpoint.
Use a lower-bound binary search for the first feasible distance.
Sort before using the sliding-window inequality.

## Language notes
Python sorts the input list in place.
Java sorts the primitive array and uses integer bounds.
