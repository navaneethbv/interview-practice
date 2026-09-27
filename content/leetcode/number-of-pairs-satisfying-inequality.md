# Number of Pairs Satisfying Inequality

Count index pairs i < j satisfying nums1[i] - nums1[j] <= nums2[i] - nums2[j] + diff.

## Examples

### Example 1

```text
Input: nums1 = [3, 2, 5], nums2 = [2, 2, 1], diff = 1
Output: 3
Explanation: All three index pairs satisfy the inequality.
```

### Example 2

```text
Input: nums1 = [3, 1], nums2 = [1, 3], diff = 0
Output: 0
Explanation: The only pair fails because 2 is not at most -2.
```

## Constraints

- 2 <= nums1.length == nums2.length <= 100000
- -10000 <= nums1[i], nums2[i], diff <= 10000
