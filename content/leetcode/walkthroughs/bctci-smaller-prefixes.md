## Intuition

The condition compares the sum of the first `k` values with the sum of the first `2k` values.
As `k` grows, the first sum gains one element while the second sum gains the next pair of elements.
Two running sums check each required prefix without recomputing earlier values.

## Brute force

Summing both prefixes from the beginning for every `k` can take quadratic time.
Incremental sums make the complete check linear.

## Approach

1. Keep `slow_sum` for the first `k` values and `fast_sum` for the first `2k` values.
2. On each loop, add `arr[slow]` to `slow_sum`.
3. Add `arr[fast]` and `arr[fast + 1]` to `fast_sum`, then advance `fast` by two.
4. Return false as soon as `slow_sum >= fast_sum`; otherwise return true after all pairs pass.

## Walkthrough

Example 1 is `[1, 2, 2, -1]`.
For `k = 1`, the running sums are 1 and 3, so the condition holds.
For `k = 2`, they become 3 and 4, so it still holds and the method returns true.
The second example fails at `k = 2` because the first two values sum to 3 while the first four sum to 2.

## Complexity

- Time: O(n), with one pass through the array.
- Space: O(1), using two sums and two indices.

## Edge cases

An empty array has no failing `k` and returns true.
The first comparison uses the first two values exactly.
Negative values are valid, so the check must use the actual sums rather than counts.
The even-length constraint guarantees `fast + 1` is valid on every loop.

## Common mistakes

- Comparing `slow_sum > fast_sum` accepts equality even though the condition is strict.
- Advancing `fast` by one compares the wrong prefix lengths.
- Replacing sums with averages changes the requested inequality.
- Returning false for an empty array ignores the vacuous condition.

## Language notes

Python integers grow as needed for large intermediate sums.
Java uses `long` for both running sums because two 32-bit values can accumulate beyond `int` range.
