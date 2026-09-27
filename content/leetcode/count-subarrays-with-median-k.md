# Count Subarrays With Median K

Count contiguous nonempty subarrays whose median equals k.
For an even-length subarray, define its median as the smaller of its two middle values after sorting.
All input values are distinct, and k appears in the input.

## Examples

### Example 1

```text
Input: nums = [3, 2, 1, 4, 5], k = 4
Output: 3
Explanation: The qualifying subarrays are [4], [4,5], and [1,4,5].
```

### Example 2

```text
Input: nums = [2, 3, 1], k = 3
Output: 1
Explanation: Only the singleton [3] has median 3.
```

## Constraints

- 1 <= nums.length <= 100000.
- nums is a permutation of 1 through nums.length.
- 1 <= k <= nums.length.
