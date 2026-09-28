## Intuition

The signed sum starts at the total `1 + ... + n`.
Negating a value reduces the sum by twice that value, so the problem becomes choosing a subset with sum `(total - target) / 2`, then placing negative values first for lexicographic minimality.

## Brute force

Trying every sign assignment takes `O(2^n)` time.
The consecutive values 1 through n make descending greedy subset selection sufficient for the lexicographically smallest arrangement.

## Approach

1. Compute `total` and reject impossible magnitude or parity conditions.
2. Set `remaining = (total - target) / 2`.
3. Visit values from `n` down to 1, negating a value whenever it fits in `remaining`.
4. Append unused positive values in ascending order after the negative values.

## Walkthrough

For Example 1, `n = 4` has total 10 and target 0, so the negated subset must sum to 5.
Descending greedy picks 4, leaving 1, then picks 1, leaving zero.
The signed values are `-4, -1, 2, 3`, already lexicographically smallest.

## Complexity

The descending scan and result construction take `O(n)` time.
The returned array uses `O(n)` space, and Python also keeps negative and positive lists before concatenating a reversed copy, for `O(n)` auxiliary storage.

## Edge cases

An odd `total - target` cannot be formed by sign flips and returns an empty array.
Targets outside `[-total, total]` are impossible, while target equal to total leaves every value positive.

## Common mistakes

- Forgetting the factor of two in the reduction computes the wrong subset sum.
- Selecting small negative values first can produce a valid but lexicographically larger result.
- Returning a value arrangement without placing positives in ascending order breaks lexicographic minimality.

## Language notes

Python integers are unbounded, while Java uses `long` for `total`, `target`, and `remaining`.
Both references return an `int[]` or list of signed values in sorted order.
