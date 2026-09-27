# Permutations II

Return every distinct ordering of the entries in `nums`, which may contain duplicates.
Use every occurrence exactly once per ordering.
The ordering list may appear in any order.

## Examples

### Example 1

```text
Input: nums = [1, 1, 2]
Output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
Explanation: Repeated 1 entries do not create duplicate output orderings.
```

### Example 2

```text
Input: nums = [2, 2]
Output: [[2, 2]]
Explanation: Only one ordering is distinct.
```

## Constraints

- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10
