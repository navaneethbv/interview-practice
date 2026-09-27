# Combination Sum

Find every distinct combination of candidate values whose sum is `target`.
You may reuse each candidate any number of times.
Return each combination once; the order of combinations and of their values does not matter.

## Examples

### Example 1

```text
Input: candidates = [2, 5, 7], target = 7
Output: [[2, 5], [7]]
Explanation: Either use 2 with 5 or use one 7.
```

### Example 2

```text
Input: candidates = [4, 6], target = 5
Output: []
Explanation: No combination has the required sum.
```

## Constraints

- 1 <= candidates.length <= 30.
- 2 <= candidates[i] <= 40, and all candidates are distinct.
- 1 <= target <= 40.
- There are fewer than 150 valid combinations.
