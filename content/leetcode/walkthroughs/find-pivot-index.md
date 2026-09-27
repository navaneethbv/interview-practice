## Intuition

At any position, the total array sum consists of the left side, the current value, and the right side.
If the total is already known, the right sum follows by subtraction from the accumulated left sum.
Scanning from left to right makes the first equality the required leftmost pivot.

## Brute force

For every candidate index, independently sum all elements before it and after it.
Each candidate may scan almost the whole array, giving O(n²) time and O(1) extra space.
A running prefix sum removes this repeated work without storing a separate prefix array.

## Approach

1. Compute `total`, the sum of every array entry.
2. Initialize `left_sum` (Java: `leftSum`) to zero.
3. For the current `index`, compute `right_sum = total - left_sum - value`.
4. Return the index immediately if the two side sums match.
5. Otherwise add the current value to the left sum before moving forward.
6. Return -1 if every candidate fails.

## Walkthrough

Example 1 is `nums = [1,7,3,6,5,6]`, whose total is 28.

| Index | Current value | Left sum before comparison | Right sum |
| --- | --- | --- | --- |
| 0 | 1 | 0 | 27 |
| 1 | 7 | 1 | 20 |
| 2 | 3 | 8 | 17 |
| 3 | 6 | 11 | 11 |

At index 3, both sides sum to 11, so the method returns 3 without inspecting later candidates.
The pivot value 6 belongs to neither side.

## Complexity

- Time: O(n), for the total-sum pass and at most one candidate pass.
- Space: O(1), because only scalar sums and an index are retained.

## Edge cases

A single element has two empty sides and returns index zero.
The first or last entry can be a pivot because an empty side has sum zero.
Negative values are fully supported; the method makes no monotonicity assumption about the sums.
If multiple positions qualify, the early return selects the leftmost one.

## Common mistakes

- Adding the current value before the comparison incorrectly includes the pivot on the left.
- Forgetting to subtract the current value incorrectly includes it on the right.
- Using a two-pointer balancing heuristic fails when negative values are allowed.

## Language notes

Python uses `sum` and `enumerate`; Java uses an explicit summation loop and indexed access.
The given limits bound the absolute sum by ten million, which fits in Java `int`.
Neither version changes the input array.
