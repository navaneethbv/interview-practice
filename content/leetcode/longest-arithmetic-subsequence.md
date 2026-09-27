# Longest Arithmetic Subsequence

Return the length of the longest subsequence with a constant difference between consecutive selected values.
Selected entries retain their original order but need not be adjacent.

## Examples

### Example 1

```text
Input: nums = [3, 6, 9, 12]
Output: 4
Explanation: The full sequence has difference 3.
```

### Example 2

```text
Input: nums = [9, 4, 7, 2, 10]
Output: 3
Explanation: The subsequence 4,7,10 has difference 3.
```

## Constraints

- 2 <= nums.length <= 1000.
- 0 <= nums[i] <= 500.
