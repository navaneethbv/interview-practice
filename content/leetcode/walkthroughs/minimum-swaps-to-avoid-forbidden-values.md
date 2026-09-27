## Intuition

Only positions where `nums[i] == forbidden[i]` need repair.
Conflicts with the same value can be paired with different values when possible, while the largest conflict group may force one swap per position in that group.

## Brute force

Trying permutations of the array is factorial in length.
Even searching swap sequences directly does not exploit that only conflict counts and value availability matter.

## Approach

1. Count values across both `nums` and `forbidden`; if any value appears more than n times, return -1.
2. Count conflicting positions by their current value.
3. At least `ceil(conflicts / 2)` swaps are needed because one swap can fix at most two conflicts.
4. A value group of size m needs at least m swaps when no other conflict can safely absorb it, so return the larger lower bound.

## Walkthrough

This is Example 1 from the local statement.
With `nums = [1,2,3]` and `forbidden = [1,2,3]`, all three positions conflict.
The total-conflict bound is `ceil(3/2) = 2`, and each value appears in only one conflict, so the largest-group bound is 1.
Two swaps can perform a three-cycle and move every value away from its forbidden position, giving answer 2.

## Complexity

Counter construction scans n positions, so expected time is O(n) and map space is O(n).
The formula avoids constructing the final permutation, while the input arrays remain unchanged.

## Edge cases

No conflicts require zero swaps.
A single conflicting position is impossible unless another position can receive its value safely, which the availability check captures.
Repeated values can make a valid rearrangement impossible even when the total number of conflicts is small.

## Common mistakes

Do not assume every pair of conflicts can be swapped independently.
Check global value availability before applying the conflict formula.
Use ceiling division for an odd number of conflicts.

## Language notes

Python uses `Counter`, while Java uses `HashMap` frequency tables.
Both return the count formula without mutating the arrays or simulating swaps.
