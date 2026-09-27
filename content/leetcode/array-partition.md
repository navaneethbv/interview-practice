# Array Partition

Partition the 2n integers into n pairs.
Maximize the sum of the smaller value in each pair and return that sum.

## Examples

### Example 1

```text
Input: nums = [1, 4, 3, 2]
Output: 4
Explanation: Pair 1 with 2 and 3 with 4, contributing 1 + 3.
```

### Example 2

```text
Input: nums = [-3, -2, 1, 4]
Output: -2
Explanation: The best pairing contributes -3 + 1.
```

## Constraints

- nums.length is even, between 2 and 20000.
- -10000 <= nums[i] <= 10000.
