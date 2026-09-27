# Remove Element

Remove all occurrences of val from nums in place and return the number k of retained elements.
The first k positions must contain exactly the retained values, in any order.
Entries after that prefix are ignored.
The displayed output is the retained prefix.

## Examples

### Example 1

```text
Input: nums = [3, 1, 3, 2], val = 3
Output: [1, 2]
Explanation: Return 2 and place 1 and 2 in the retained prefix.
```

### Example 2

```text
Input: nums = [5, 5], val = 5
Output: []
Explanation: Removing all elements leaves a prefix of length zero.
```

## Constraints

- 0 <= nums.length <= 100.
- 0 <= nums[i] <= 50.
- 0 <= val <= 100.
