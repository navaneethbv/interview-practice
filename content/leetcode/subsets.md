# Subsets

Return every subset of the distinct integers in `nums`, including the empty subset and the full set.
Each subset must appear once.
The order of subsets and the order of values inside a subset do not matter.

## Examples

### Example 1

```text
Input: nums = [1, 3]
Output: [[], [1], [3], [1, 3]]
Explanation: Each value can be included or omitted independently.
```

### Example 2

```text
Input: nums = [0]
Output: [[], [0]]
Explanation: A single value has two subsets.
```

## Constraints

- 1 <= nums.length <= 10.
- -10 <= nums[i] <= 10.
- All input values are distinct.
