# Number of Ways to Split Array

A split at index `i` (with `0 <= i < n - 1`) is valid if the sum of the first `i + 1` elements is greater than or equal to the sum of the remaining elements.
Return the number of valid splits.

## Constraints

- 2 <= nums.length <= 10^5
- -10^5 <= nums[i] <= 10^5

## Examples

### Example 1

```text
Input: nums = [10, 4, -8, 7]
Output: 2
Explanation: Splits after 10 and after 4 are valid; after -8 the left sum 6 is less than 7.
```

### Example 2

```text
Input: nums = [2, 3, 1, 0]
Output: 2
Explanation: Splits after 3 and after 1 are valid.
```
