# Median of Two Sorted Arrays

Find the median of all the values from two nondecreasing arrays.
For an odd total length, the median is the middle value; for an even total length, it is the average of the two middle values.
Target O(log(m + n)) running time.

## Examples

### Example 1

```text
Input: nums1 = [1, 5], nums2 = [2]
Output: 2.0
Explanation: The combined order is 1, 2, 5.
```

### Example 2

```text
Input: nums1 = [1, 3], nums2 = [2, 4]
Output: 2.5
Explanation: The central values are 2 and 3.
```

## Constraints

- 0 <= nums1.length, nums2.length <= 1000.
- 1 <= total number of elements <= 2000.
- -1000000 <= each value <= 1000000.
