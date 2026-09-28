# Rank from Stream

Integers arrive one at a time, and at any moment you may be asked for the rank of a value.
The rank of `x` is the number of tracked values that are less than or equal to `x`, not counting one occurrence of `x` itself.

- `StreamRank()` starts with no values.
- `track(x)` records one more occurrence of `x`.
- `getRankOfNumber(x)` returns the rank of `x`, or `-1` if `x` has never been tracked.

Construct one instance per test, then execute the listed operations in order; `track` produces null.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["track", "track", "track", "track", "getRankOfNumber", "getRankOfNumber", "getRankOfNumber"], args = [[5], [1], [4], [4], [1], [4], [5]]
Output: [null, null, null, null, 0, 2, 3]
Explanation: Values at most 4 are 1, 4, and 4; excluding one 4 leaves 2.
```

### Example 2

```text
Input: ctor = [], ops = ["getRankOfNumber", "track", "getRankOfNumber"], args = [[3], [9], [3]]
Output: [-1, null, -1]
```

## Constraints

- `0 <= x <= 100,000`
- At most 20,000 operations.
