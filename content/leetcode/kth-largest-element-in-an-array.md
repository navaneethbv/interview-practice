# Kth Largest Element in an Array

Return the kth largest value in `nums`, counting duplicate occurrences separately.
For example, in descending order `[5, 5, 2]`, the second largest value is 5.
Try to solve the problem without sorting the entire array.

## Examples

### Example 1

```text
Input: nums = [7, 2, 5, 5, 1], k = 3
Output: 5
Explanation: Descending order is 7, 5, 5, 2, 1.
```

### Example 2

```text
Input: nums = [-2, -8, -1], k = 1
Output: -1
Explanation: The maximum negative value is -1.
```

## Constraints

- 1 <= k <= nums.length <= 100000.
- -10000 <= nums[i] <= 10000.
