# Combination Sum II

Find every distinct combination of numbers in `candidates` that sums to `target`.
Each input position can be used at most once.
The input may contain duplicate values, but identical value combinations must appear only once in the result.
The order of combinations and of values inside each combination does not matter.

## Examples

### Example 1

```text
Input: candidates = [1, 1, 2, 3], target = 4
Output: [[1, 1, 2], [1, 3]]
Explanation: The two copies of 1 can both be used, but equivalent selections are not repeated.
```

### Example 2

```text
Input: candidates = [2, 2, 2], target = 3
Output: []
Explanation: No available selection sums to 3.
```

## Constraints

- 1 <= candidates.length <= 100.
- 1 <= candidates[i] <= 50.
- 1 <= target <= 30.
