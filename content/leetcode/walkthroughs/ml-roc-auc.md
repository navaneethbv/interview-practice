## Intuition

AUC has a probabilistic meaning: pick one positive and one negative example at random; the AUC is the chance the positive scores higher, with ties counting half. Sorting by score lets us count those pairs through ranks instead of comparing every pair.

## Approach

1. Sort indices by score.
2. Assign ranks 1..n, giving tied scores the average of their ranks.
3. Sum the ranks of the positives: `R`.
4. Return `(R - P(P + 1) / 2) / (P · N)` for P positives and N negatives.

## Walkthrough

In Example 1 the sorted scores are 0.1 (neg), 0.35 (pos), 0.4 (neg), 0.8 (pos) with ranks 1 to 4. The positives' rank sum is 2 + 4 = 6, so U = 6 - 3 = 3 out of 2 · 2 = 4 pairs: 0.75.

## Complexity

- Time: O(n log n).
- Space: O(n).

## Edge cases

- All scores tied gives 0.5.
- A perfect ranking gives 1 and a reversed one gives 0.
- Ties between two positives do not matter; only positive-negative ties count half.

## Common mistakes

- Ignoring ties, which biases the result.
- Integer division in the final ratio.
- Computing accuracy at a 0.5 threshold instead of a ranking metric.

## Notes

The Java reference counts pairs directly in O(P · N); it is slower but independent, which is useful for checking the rank-sum version.
