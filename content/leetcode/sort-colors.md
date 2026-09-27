# Sort Colors

Sort `nums` in place so that all 0 entries precede all 1 entries, which precede all 2 entries.
Do not call a built-in sorting routine.
The displayed output is the modified array.

## Examples

### Example 1

```text
Input: nums = [2, 0, 1, 2, 0]
Output: [0, 0, 1, 2, 2]
Explanation: Group equal values in ascending order.
```

### Example 2

```text
Input: nums = [1]
Output: [1]
Explanation: A single entry needs no movement.
```

## Constraints

- 1 <= nums.length <= 300
- Every entry is 0, 1, or 2.
