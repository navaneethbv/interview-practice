# 132 Pattern

Determine whether there are three indices i < j < k such that nums[i] < nums[k] < nums[j].
The three chosen values need not be adjacent, and both value inequalities must be strict.

## Examples

### Example 1

```text
Input: nums = [2, 5, 3]
Output: true
Explanation: Indices 0, 1, and 2 give 2 < 3 < 5.
```

### Example 2

```text
Input: nums = [1, 2, 3, 4]
Output: false
Explanation: An increasing sequence cannot provide the required middle peak.
```

## Constraints

- 1 <= nums.length <= 200000
- -1000000000 <= nums[i] <= 1000000000
