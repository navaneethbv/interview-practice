## Intuition

The compared prefix lengths grow at different rates: one gains one element each iteration, while the other gains two.
Keep their sums incrementally instead of building every prefix from scratch.
After iteration k, the two counters represent exactly the first k and first 2k values.

## Brute force

For each k, independently sum the first k and first 2k entries.
Repeatedly adding the same prefix values takes O(n squared) total time.

## Approach

Initialize `slow_sum` and `fast_sum` to zero, with a fast index also at zero.
Iterate the slow index through the first half of the array.
Add one new entry to slow_sum and the next two entries to fast_sum.
Advance the fast index by two, then test the required strict inequality.
If slow_sum is greater than or equal to fast_sum, return false immediately.
If every comparison succeeds, return true.
The even-length contract ensures the fast pair is always available and the final comparison covers the full array on its larger side.

## Walkthrough

Example 1 is `[1, 2, 2, -1]`.
For k equal to one, slow_sum becomes 1 and fast_sum becomes 3, so the first condition passes.
For k equal to two, slow_sum adds 2 and becomes 3.
Fast_sum adds the next pair, 2 and -1, becoming 4.
The second comparison is 3 less than 4, so every required prefix relation holds and the result is true.

## Complexity

Both references perform one iteration per two array entries, taking O(n) time.
Only indices and two totals are stored, giving O(1) auxiliary space.
An early failed comparison may finish sooner.

## Edge cases

An empty array satisfies all zero required comparisons and returns true.
Negative entries are allowed, so larger prefixes need not have larger sums automatically.
Equality fails because the comparison is strict.

## Common mistakes

Do not compare individual elements or assume increasing prefix length implies increasing sum.
Check every k, not only the final half-versus-whole comparison.

## Language notes

Python totals have arbitrary precision.
Java uses `long` and casts before adding the fast pair, preventing overflow even in an intermediate two-element sum.
