# Subsets II

Return every distinct subset that can be selected from `nums`, including the empty subset.
An entry can be selected at most as many times as it occurs in the input.
Repeated input values must not produce duplicate subsets.
Subset order and order within a subset do not matter.

## Examples

### Example 1

```text
Input: nums = [2, 2]
Output: [[], [2], [2, 2]]
Explanation: There are three possible counts of the value 2.
```

### Example 2

```text
Input: nums = [0, 1]
Output: [[], [0], [1], [0, 1]]
Explanation: Each value can independently be selected or skipped.
```

## Constraints

- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
