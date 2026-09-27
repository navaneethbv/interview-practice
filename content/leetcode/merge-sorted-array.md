# Merge Sorted Array

The first m entries of nums1 and all n entries of nums2 are sorted in nondecreasing order.
nums1 has total length m + n, with extra trailing storage that is not part of its initial values.
Merge the arrays into nums1 in place and return nothing.

## Examples

### Example 1

```text
Input: nums1 = [1, 4, 0, 0], m = 2, nums2 = [2, 3], n = 2
Output: [1, 2, 3, 4]
Explanation: The trailing zeros are storage, not input values.
```

### Example 2

```text
Input: nums1 = [0], m = 0, nums2 = [7], n = 1
Output: [7]
Explanation: The first array initially has no values.
```

## Constraints

- 0 <= m, n <= 200, and 1 <= m + n <= 200.
- nums1.length == m + n and nums2.length == n.
- Values are between -1000000000 and 1000000000.
