# Max Dot Product of Two Subsequences

Choose a nonempty subsequence from each array, with equal selected lengths.
Multiply corresponding selected entries and sum the products.
Return the greatest possible sum, preserving original order inside each subsequence.

## Examples

### Example 1

```text
Input: nums1 = [2, 1, -2, 5], nums2 = [3, 0, -6]
Output: 18
Explanation: Choose [2,-2] and [3,-6], giving 6+12.
```

### Example 2

```text
Input: nums1 = [-1, -1], nums2 = [1, 1]
Output: -1
Explanation: Selecting one pair is better than a longer negative sum.
```

## Constraints

- 1 <= nums1.length, nums2.length <= 500.
- -1000 <= values <= 1000.
