# Divide an Array Into Subarrays With Minimum Cost II

Partition the array into exactly k nonempty contiguous pieces.
A piece costs its first value.
The starting indices of the second and final pieces must differ by at most dist.
Return the minimum total cost.

## Examples

### Example 1

```text
Input: nums = [5, 2, 4, 1, 3], k = 3, dist = 2
Output: 8
Explanation: Start pieces at indices 0, 1, and 3 for cost 5+2+1.
```

### Example 2

```text
Input: nums = [4, 3, 2], k = 3, dist = 1
Output: 9
Explanation: Every piece must contain one entry.
```

## Constraints

- 3 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000000
- 3 <= k <= nums.length
- k-2 <= dist <= nums.length-2
