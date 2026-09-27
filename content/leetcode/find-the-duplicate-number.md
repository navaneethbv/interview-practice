# Find the Duplicate Number

The array has n + 1 entries, each an integer from 1 through n.
Exactly one distinct value occurs more than once, although it may occur more than twice.
Return that duplicated value without changing the array and using constant additional space.

## Examples

### Example 1

```text
Input: nums = [1, 4, 2, 3, 2]
Output: 2
Explanation: Only the value 2 is repeated.
```

### Example 2

```text
Input: nums = [3, 3, 3, 3]
Output: 3
Explanation: The same value may occur more than twice.
```

## Constraints

- 1 <= n <= 100000.
- nums.length == n + 1.
- 1 <= nums[i] <= n.
