# Next Greater Element I

Every value in nums1 also appears in nums2, whose values are distinct.
For each value in nums1, locate its occurrence in nums2 and find the first strictly greater value to its right.
Return -1 when no such value exists, preserving the order of nums1.

## Examples

### Example 1

```text
Input: nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]
Output: [-1, 3, -1]
Explanation: Only 1 has a later greater value, namely 3.
```

### Example 2

```text
Input: nums1 = [2, 4], nums2 = [1, 2, 3, 4]
Output: [3, -1]
Explanation: 3 follows 2 and is greater; nothing follows 4.
```

## Constraints

- 1 <= nums1.length <= nums2.length <= 1000.
- 0 <= values <= 10000.
- Each array contains distinct values, and nums1 is a subset of nums2.
