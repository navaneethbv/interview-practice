# Remove Duplicates from Sorted Array

Compact the nondecreasing array in place so its first k entries contain each distinct value exactly once, in increasing order.
Return k.
Entries after position k - 1 are ignored.
The displayed output is the retained prefix.

## Examples

### Example 1

```text
Input: nums = [1, 1, 2, 3, 3]
Output: [1, 2, 3]
Explanation: Return 3 after placing 1, 2, and 3 in the first three entries.
```

### Example 2

```text
Input: nums = [4, 4, 4]
Output: [4]
Explanation: Only one distinct value remains.
```

## Constraints

- 1 <= nums.length <= 30000.
- -100 <= nums[i] <= 100.
