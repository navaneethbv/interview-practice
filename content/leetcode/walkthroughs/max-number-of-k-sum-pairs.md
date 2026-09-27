## Intuition
After sorting, the smallest remaining value can only pair with the largest value that may reach the target.
If their sum is too small, the smallest cannot pair with anyone; if it is too large, the largest cannot pair with anyone.

## Brute force
For each unused value, scanning all later values for a complement takes O(N^2) time.
A frequency map can count complements in O(N) expected time without sorting.

## Approach
1. Sort `nums` and place `left` and `right` at its ends.
2. If the endpoint sum equals k, count one pair and move both pointers.
3. If the sum is smaller, move `left` because the smallest value needs a larger partner.
4. Otherwise move `right` because the largest value needs a smaller partner.

## Walkthrough
Example 1 is `[1,2,3,4]` with `k = 5`.
The endpoints `1 + 4` make one pair, so the pointers move inward.
The remaining endpoints `2 + 3` make a second pair, after which the pointers cross.
The answer is `2`.

## Complexity
Sorting costs O(N log N), and the two-pointer scan costs O(N).
The Python reference uses the sorted copy returned by `sorted`, so its auxiliary space is O(N).
Java sorts the input array in place and uses O(1) extra space beyond the sort implementation.

## Edge cases
If the array has fewer than two values, no pair can be formed.
Duplicate values are handled by moving both pointers only after a valid pair.
Values that cannot reach k are discarded one at a time by the corresponding pointer move.

## Common mistakes
Moving both pointers when the sum is not k can skip a valid partner.
Using a set loses multiplicity when the same value appears several times.
The target condition applies to the original pair values, not their indices.

## Language notes
Python's `sorted` leaves the caller's list untouched and allocates the sorted result.
Java's `Arrays.sort` rearranges the supplied array, while the pair count remains an `int`.
