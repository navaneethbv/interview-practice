## Intuition

Every permitted operation moves to a smaller positive integer.
The best answer for a value therefore depends only on answers for smaller values.
Compute those answers once in increasing order rather than repeatedly solving the same reduction paths.

## Brute force

Recursively try subtraction and every permitted division, returning the shortest path.
Without memoization, many branches revisit the same smaller numbers and the search can grow exponentially.

## Approach

Allocate `steps` through index n, with `steps[1] = 0`.
For each `value` from 2 through n, begin with `best = steps[value - 1]` because subtraction is always legal.
If value is divisible by two, compare against `steps[value // 2]`.
If it is divisible by three, compare against `steps[value // 3]`.
Store `best + 1` to include the first operation from the current value.
Each legal first move is considered, and the remainder of its path is optimal by the previously computed table entry.

## Walkthrough

Example 1 asks for n = 10.
The table gives `steps[3] = 1` from the direct division to 1.
Thus `steps[9] = 2` via 9 to 3 to 1.
At 10, subtraction considers that two-step solution for 9, while division by two considers `steps[5] = 3`.
Choosing the smaller continuation yields `steps[10] = 3`.
The corresponding route is 10, 9, 3, 1.

## Complexity

Each of n values checks at most three transitions, giving O(n) time.
The table stores n + 1 integers, requiring O(n) auxiliary space.

## Edge cases

For n = 1, the loop is skipped and the result is zero.
A value divisible by both two and three must consider both options.

## Common mistakes

Always dividing when possible is not optimal: Example 1 benefits from subtracting first.
Only use a division transition when the division is exact.

## Language notes

Python uses integer division `//`.
Java's int division is exact after the divisibility check, and the operation count fits comfortably in int.
