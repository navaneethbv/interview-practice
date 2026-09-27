## Intuition

The array must have exactly three nonempty monotonic runs: rising, falling, and rising.
Walking each phase and checking that both turning points occur strictly inside the array verifies the structure in one pass.

## Brute force

Trying every pair of turning points and checking all three ranges costs `O(n^3)` in a naive implementation.
Greedy phase walks identify the only possible transitions directly.

## Approach

1. Walk upward from index zero and require at least one increase.
2. Walk downward and require at least one decrease.
3. Walk upward again and require that the final index is reached.
4. Reject if either turning point is at an invalid boundary.

## Walkthrough

For Example 1, `[1, 4, 2, 5]` rises from 1 to 4, falls to 2, and rises to 5.
The first walk stops at index 1, the downward walk stops at index 2, and the final upward walk reaches index 3.
All three runs are nonempty, so the result is `true`.

## Complexity

Each phase advances monotonically and visits each index at most once, so time is `O(n)`.
Only index variables are stored, using `O(1)` extra space.

## Edge cases

An all-increasing array has no decreasing section and returns false.
Equal adjacent values fail every strict phase comparison.

## Common mistakes

- Allowing an empty middle phase accepts arrays with only two trends.
- Allowing the final rise to stop early ignores the required full-array coverage.
- Using non-strict comparisons permits plateaus.

## Language notes

Python and Java use separate helpers for rising and falling walks.
The references do not mutate the input array.
