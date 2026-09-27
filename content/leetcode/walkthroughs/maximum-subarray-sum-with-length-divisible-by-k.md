## Intuition

A subarray length divisible by `k` has equal prefix-index remainders at its two endpoints.
For each remainder, keep the smallest prefix sum seen so far, so subtracting it maximizes the current subarray sum.

## Brute force

Enumerating all subarrays and checking their lengths costs `O(n^2)` time.
Prefix sums plus remainder minima reduce each endpoint to constant work.

## Approach

1. Initialize `minimum_prefix[0] = 0` and all other remainders to infinity.
2. Add values into `prefix` while tracking the one-based index remainder.
3. Combine the current prefix with the smallest earlier prefix of the same remainder.
4. Update that remainder's minimum and return `best`.

## Walkthrough

For Example 1, `nums = [1, 2, -5, 4, 3]` and `k = 2`.
The final prefix index 5 has remainder 1, so it pairs with the smallest earlier prefix at an index with remainder 1.
The resulting interval is the final two values `[4, 3]`, whose sum is 7.
That is the maximum allowed sum, so the result is `7`.

## Complexity

Each value performs constant work, giving `O(n)` time.
The remainder minima array uses `O(k)` space, and prefix sums use `long` in Java.

## Edge cases

Negative values require initializing `best` to negative infinity rather than zero.
When `k` equals `n`, the only eligible subarray is the full array.

## Common mistakes

- Matching different remainders produces a length that is not divisible by `k`.
- Keeping the largest prefix sum minimizes the desired subarray instead of maximizing it.
- Allowing the empty prefix as an answer can incorrectly return zero for all-negative input.

## Language notes

Python uses floating infinity sentinels, while Java uses `Long.MAX_VALUE` and checks it before subtraction.
Java's `long` is required because prefix sums can exceed the `int` range.
