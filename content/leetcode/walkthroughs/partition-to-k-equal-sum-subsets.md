## Intuition
Every valid group must sum to `total / k`, so the problem becomes placing each number into one of k bins without exceeding that target.
Sorting large numbers first makes failed branches appear early, while skipping equal bucket sums avoids equivalent placements.

## Brute force
Trying every assignment of every number to every group explores up to k^N placements.
The bucket search still has exponential worst-case behavior, but it prunes placements that have identical current capacities.

## Approach
1. Reject the input when the total is not divisible by k or the largest number exceeds the target.
2. Sort numbers in descending order and recursively place each next value into a bucket that stays at or below the target.
3. When a bucket reaches the target, continue filling the remaining buckets.
4. Skip buckets with the same current sum and stop trying equivalent empty buckets after an unsuccessful placement.

## Walkthrough
Example 1 is `[4,3,2,3,5,2,1]` with `k = 4`.
The total is `20`, so every group must sum to `5`.
The descending order tries `5` as a completed group, then `4` with `1`, then `3` with `2`, and the remaining `3` with `2`.
All four bins reach `5`, so the search returns true.
The duplicate-sum rule prunes branches that have the same remaining capacity arrangement without storing a mask.

## Complexity
The bucket backtracking has O(k^N) worst-case placements, although equal-sum and capacity pruning remove many equivalent branches.
Sorting adds O(N log N) time, and each search node scans at most k buckets.
A safe time bound is O(k^(N + 1) + N log N).
The bucket array uses O(k) space; O(N) active frames can each retain a set of up to k seen sums, giving O(Nk) auxiliary space, including sorting workspace.

## Edge cases
If `k` is one, divisibility is enough because the sole group contains all numbers.
An indivisible total or an item larger than the target can be rejected immediately.
Equal values are interchangeable, so skipping duplicate placements avoids repeated branches.

## Common mistakes
The search may fill several buckets partially; only their final sums must equal the target.
Because every value is positive, no partial bucket may exceed the target.
Using a used-mask memoization complexity claim for this implementation is misleading because the references do not memoize masks.
Treating zero as a normal item can create unnecessary duplicate branches, though the stated inputs are positive.

## Language notes
Python mutates a bucket-sum list in a recursive helper.
Java uses an integer bucket array and applies the same duplicate-sum pruning from the largest value downward.
