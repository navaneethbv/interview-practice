# Maximum Sum of Distinct Subarrays With Length K

Among contiguous subarrays of exactly k elements with all values distinct, return the largest sum.
Return 0 if no such subarray exists.

## Examples

### Example 1

```text
Input: nums = [1, 5, 4, 2, 9, 9, 9], k = 3
Output: 15
Explanation: The valid window [4,2,9] has the largest sum.
```

### Example 2

```text
Input: nums = [4, 4, 4], k = 3
Output: 0
Explanation: Every length-3 window repeats a value.
```

## Constraints

- 1 <= k <= nums.length <= 100000.
- 1 <= nums[i] <= 100000.
