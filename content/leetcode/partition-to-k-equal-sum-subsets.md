# Partition to K Equal Sum Subsets

Divide all input entries into exactly k nonempty groups whose sums are equal.
Entries need not be adjacent, and duplicate values still represent separate entries.
Return whether such a partition exists.

## Examples

### Example 1

```text
Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: true
Explanation: Use groups [5], [4,1], [3,2], and [3,2].
```

### Example 2

```text
Input: nums = [1, 2, 3, 4], k = 3
Output: false
Explanation: The total is not divisible by 3.
```

## Constraints

- 1 <= k <= nums.length <= 16.
- 1 <= nums[i] <= 10000.
