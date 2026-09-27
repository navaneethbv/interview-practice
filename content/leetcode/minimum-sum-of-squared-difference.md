# Minimum Sum of Squared Difference

Minimize the sum of squared differences between corresponding entries of two arrays.
You may increment or decrement one nums1 entry by one at most k1 times, and do the same to nums2 at most k2 times.
Operations are optional, and modified values may become negative.

## Examples

### Example 1

```text
Input: nums1 = [1, 4], nums2 = [3, 8], k1 = 1, k2 = 1
Output: 8
Explanation: Reduce the difference 4 to 2, leaving squared differences 4 and 4.
```

### Example 2

```text
Input: nums1 = [1], nums2 = [2], k1 = 2, k2 = 0
Output: 0
Explanation: One operation makes the values equal; the extra operation is unnecessary.
```

## Constraints

- 1 <= nums1.length == nums2.length <= 100000.
- 0 <= nums1[i], nums2[i] <= 100000.
- 0 <= k1, k2 <= 1000000000.
