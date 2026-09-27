# Running Sum of 1d Array

Return an array whose entry i equals the sum of input entries from index 0 through i, inclusive.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4]
Output: [1, 3, 6, 10]
Explanation: Each output extends the previous prefix by one value.
```

### Example 2

```text
Input: nums = [-1, 2, -3]
Output: [-1, 1, -2]
Explanation: Negative entries may decrease the running total.
```

## Constraints

- 1 <= nums.length <= 1,000
- -10^6 <= nums[i] <= 10^6
