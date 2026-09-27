# Find K Pairs with Smallest Sums

Form pairs by choosing one occurrence from each sorted array.
Return the `k` pairs with smallest sums, or all pairs if fewer exist.
Pair multiplicity follows input occurrences.
Any order is accepted, and ties at the cutoff may be resolved arbitrarily.

## Examples

### Example 1

```text
Input: nums1 = [1, 7, 11], nums2 = [2, 4, 6], k = 3
Output: [[1, 2], [1, 4], [1, 6]]
Explanation: These are the three smallest sums.
```

### Example 2

```text
Input: nums1 = [1, 1], nums2 = [2], k = 3
Output: [[1, 2], [1, 2]]
Explanation: There are only two index pairs, and both must be retained.
```

## Constraints

- 1 <= nums1.length, nums2.length <= 100,000
- Arrays are sorted in nondecreasing order.
- -10^9 <= nums1[i], nums2[i] <= 10^9
- 1 <= k <= 10,000
