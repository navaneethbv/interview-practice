# Split Array Largest Sum

Split nums into exactly k nonempty contiguous subarrays.
Minimize the largest sum among the subarrays and return that minimum value.

## Examples

### Example 1

```text
Input: nums = [7, 2, 5, 10, 8], k = 2
Output: 18
Explanation: Split after 5 to obtain sums 14 and 18.
```

### Example 2

```text
Input: nums = [1, 2, 3], k = 3
Output: 3
Explanation: Each element becomes its own subarray.
```

## Constraints

- 1 <= nums.length <= 1000.
- 1 <= k <= min(50, nums.length).
- 0 <= nums[i] <= 1000000.
