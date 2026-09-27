# Subarray Product Less Than K

Count nonempty contiguous subarrays whose product is strictly less than k.

## Constraints

- `1 <= nums.length <= 30000`.
- `1 <= nums[i] <= 1000`.
- `0 <= k <= 1000000`.

## Examples

### Example 1

```text
Input: nums = [2, 3, 4], k = 10
Output: 4
Explanation: The three single elements and the pair 2,3 qualify.
```

### Example 2

```text
Input: nums = [1, 1], k = 1
Output: 0
Explanation: Products equal to the threshold do not qualify.
```
