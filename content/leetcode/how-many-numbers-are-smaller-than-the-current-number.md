# How Many Numbers Are Smaller Than the Current Number

For each index, count the input entries whose values are strictly smaller than the value at that index.
Return the counts in the original order.

## Examples

### Example 1

```text
Input: nums = [8, 1, 2, 2, 3]
Output: [4, 0, 1, 1, 3]
Explanation: The duplicate 2 values receive the same count.
```

### Example 2

```text
Input: nums = [5, 5, 5]
Output: [0, 0, 0]
Explanation: No value is strictly smaller than 5.
```

## Constraints

- 2 <= nums.length <= 500.
- 0 <= nums[i] <= 100.
