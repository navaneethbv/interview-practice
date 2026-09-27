# Subarray Sum Equals K

Count the nonempty contiguous segments of `nums` whose entries sum to `k`.
Segments with different boundaries count separately.

## Examples

### Example 1

```text
Input: nums = [1, 1, 1], k = 2
Output: 2
Explanation: The first two and last two entries each sum to 2.
```

### Example 2

```text
Input: nums = [1, -1, 0], k = 0
Output: 3
Explanation: The matching segments are [1,-1], [0], and the full array.
```

## Constraints

- 1 <= nums.length <= 20,000
- -1,000 <= nums[i] <= 1,000
- -10^7 <= k <= 10^7
