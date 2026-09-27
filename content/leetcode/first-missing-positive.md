# First Missing Positive

Return the smallest positive integer absent from `nums`.
Use O(n) time and constant additional space; modifying the input is allowed.

## Examples

### Example 1

```text
Input: nums = [3, 4, -1, 1]
Output: 2
Explanation: The values 1, 3, and 4 occur, but 2 does not.
```

### Example 2

```text
Input: nums = [1, 2, 0]
Output: 3
Explanation: The first two positive integers are present.
```

## Constraints

- 1 <= nums.length <= 100,000
- -2^31 <= nums[i] <= 2^31 - 1
