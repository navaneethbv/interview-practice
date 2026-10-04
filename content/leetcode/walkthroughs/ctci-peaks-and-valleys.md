## Intuition

It is enough to make every odd index a local peak.
Each even interior index then has peaks on both sides and is a valley.
A local swap can establish one peak without destroying the previously established peak two positions earlier.

## Brute force

Sort the numbers and swap neighboring pairs to create an alternating arrangement.
That takes O(n log n) time, while the reference needs only local comparisons and swaps.

## Approach

Copy the input into `result`.
For each odd `index`, find the largest value among that index and its existing immediate neighbors.
Swap that value into the odd position.
Its neighbors are now no larger, satisfying the peak condition.
If the swap uses the shared even neighbor of an earlier peak, that neighbor only becomes smaller or equal, so the earlier peak remains valid.
Return the rearranged copy after processing all odd positions.

## Walkthrough

Example 1 starts with `[5, 3, 1, 2, 3]`.
At index 1, the largest nearby value is 5 at index 0, giving `[3, 5, 1, 2, 3]`.
At index 3, the largest nearby value is 3 at index 4, giving `[3, 5, 1, 3, 2]`.
This differs from the statement's illustrative output but is also valid: 5 and 3 are peaks, and the middle 1 is a valley.

## Complexity

Each visited index examines at most three values, so time is O(n).
The returned copy uses O(n) space; the rearrangement itself needs O(1) additional workspace.

## Edge cases

Empty and one-element inputs already satisfy the requirement.
Equal neighbors are allowed because the inequalities are non-strict.
A final odd index may have only a left neighbor.

## Common mistakes

Do not require the exact illustrative permutation when the validator accepts any valid arrangement.
Comparing only one neighbor can leave the other larger than the intended peak.

## Language notes

Both references copy the input before swapping.
Python selects the maximum neighbor through a short loop; Java uses explicit bounds-aware comparisons.
