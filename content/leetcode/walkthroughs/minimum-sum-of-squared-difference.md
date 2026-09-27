## Intuition

Each operation reduces one absolute difference by one, so the best use of operations always targets the largest differences.
After reducing all values above a common cap, any leftover operations can lower equal capped values one at a time.

## Brute force

Choosing one difference to reduce at every operation can take O(k n) time and makes the large operation budget impractical.
Sorting and leveling differences in bulk avoids simulating each unit operation.

## Approach

1. Build the absolute `differences` and combine the operation budgets.
2. Binary-search the smallest cap whose total excess above the cap fits the budget.
3. Square each difference after capping it and track how many operations were spent on excess.
4. Use any remaining operations to lower capped values, applying the corresponding square reduction.

## Walkthrough

This is Example 1 from the local statement.
The arrays `[1,4]` and `[3,8]` produce differences `[2,4]` with two operations available.
The smallest feasible cap is 2 because reducing 4 to 2 spends two operations in total, while cap 1 would require four.
The squared values are then `2² + 2² = 8`, which is the result.

## Complexity

If D is the largest difference, binary search performs O(log D) scans of n values, for O(n log D) time.
The difference array uses O(n) auxiliary space, and all sums use wide integer arithmetic.

## Edge cases

If operations cover the total difference, the answer is zero immediately.
Equal arrays need no changes.
Negative modified values are allowed, but only absolute differences matter.

## Common mistakes

Combine k1 and k2 because both budgets can reduce either side of a pair.
Use the smallest feasible cap, then account for leftover operations below that cap.
Compute the final square sum with a wide type to avoid overflow.

## Language notes

Python uses arbitrary-precision integers, while Java stores differences and the result in `long` where products can exceed `int`.
Both implementations binary-search a difference cap instead of sorting every level explicitly.
