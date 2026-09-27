# Maximize Fixed Points After Deletions

Delete any number of entries while preserving the order of those kept.
Indices of the remaining array start at 0.
Return the maximum number of positions whose value equals their new index.

## Examples

### Example 1

```text
Input: nums = [9, 0, 1, 2]
Output: 3
Explanation: Delete the first entry to obtain [0,1,2].
```

### Example 2

```text
Input: nums = [4, 1, 2]
Output: 2
Explanation: Keeping everything preserves fixed points at indices 1 and 2.
```

## Constraints

- 1 <= nums.length <= 100000
- 0 <= nums[i] <= 100000
