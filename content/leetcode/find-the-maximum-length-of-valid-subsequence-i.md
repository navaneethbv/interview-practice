# Find the Maximum Length of Valid Subsequence I

Choose a subsequence so the sums of every two consecutive selected values all have the same parity.
Return the greatest possible subsequence length.
Selected values keep their original order.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4]
Output: 4
Explanation: Every neighboring sum is odd.
```

### Example 2

```text
Input: nums = [2, 4, 1, 6]
Output: 3
Explanation: Select the three even values to make all neighboring sums even.
```

## Constraints

- 2 <= nums.length <= 200000.
- 1 <= nums[i] <= 10000000.
