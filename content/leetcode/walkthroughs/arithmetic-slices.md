## Intuition

When a new value continues the previous arithmetic run, every arithmetic slice ending at the prior index extends into one new slice.
The `ending` count therefore tracks how many valid slices end at the current index.

## Brute force

Checking every subarray and its differences takes O(n²) time or more.
The rolling count reuses the previous run's equal-difference status.

## Approach

1. Compare the newest adjacent difference with the previous adjacent difference.
2. If equal, increment `ending`; otherwise reset it to zero.
3. Add `ending` to `total` at every index.
4. Return the accumulated count.

## Walkthrough

This is Example 1 from the local statement.
For `[1,2,3,4]`, the differences are 1 and 1 at index 2, so one length-three slice ends there.
At index 3 the difference still matches, extending the prior slice and creating a second length-three slice plus the length-four slice.
The ending counts are 1 and 2, totaling 3.

## Complexity

The array is scanned once, giving O(n) time and O(1) auxiliary space.

## Edge cases

Arrays shorter than three elements produce zero because no slice qualifies.
Equal values form an arithmetic sequence with difference zero.
One mismatching difference resets the current run and later values can start a new one.

## Common mistakes

Add the current `ending` count, not just one, because longer slices also end here.
Compare adjacent differences using the current and previous pair.
Reset only the current run, not the total answer.

## Language notes

Python and Java use the same two counters and do not allocate a DP array.
The input bounds keep the count within the local integer return type.
