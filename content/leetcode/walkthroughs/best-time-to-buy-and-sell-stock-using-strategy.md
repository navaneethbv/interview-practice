## Intuition

The original strategy contributes a known baseline sum.
For a candidate length-`k` block, prefix sums replace its first half by zero contributions and its second half by prices, allowing every start to be evaluated in constant time.

## Brute force

Recomputing the changed block's contribution for every start costs `O(nk)` time.
Two prefix arrays reduce each replacement calculation to `O(1)`.

## Approach

1. Build `original` for the original strategy and `price_totals` for raw prices.
2. For each block start, find the replacement sum in its second half.
3. Subtract the original block contribution and add the replacement to the baseline.
4. Keep the greatest result, including the option to make no modification.

## Walkthrough

For Example 1, prices are `[4, 2, 8]`, strategy is `[-1, 0, 1]`, and `k = 2`.
The original contribution is `-4 + 0 + 8 = 4`.
Replacing the first two days gives zero for day 0 and price 2 for day 1, while day 2 remains 8.
The resulting total is `0 + 2 + 8 = 10`, which improves the baseline.

## Complexity

Prefix construction and scanning all possible starts take `O(n)` time.
The two prefix arrays use `O(n)` space, and Java stores sums in `long`.

## Edge cases

The unmodified strategy remains a candidate when every block decreases the result.
The statement guarantees even `k`, so the two replacement halves have equal length.

## Common mistakes

- Replacing the whole block with prices instead of only its second half violates the operation.
- Forgetting to subtract the original block double-counts its old contribution.
- Omitting the baseline rejects the legal choice to make no modification.

## Language notes

Python integers are unbounded, while Java uses `long` prefix arrays because prices and length can make totals exceed `int`.
Both references preserve the exact contiguous-block and at-most-once contract.
