# Single Number II

Every value in `nums` occurs exactly three times except one value occurring once.
Return that single value using linear time and constant extra space.

## Examples

### Example 1

```text
Input: nums = [2, 2, 3, 2]
Output: 3
Explanation: Only 3 occurs once.
```

### Example 2

```text
Input: nums = [0, 1, 0, 1, 0, 1, 99]
Output: 99
Explanation: The zeroes and ones occur three times each.
```

## Constraints

- 1 <= nums.length <= 30,000
- Values fit signed 32-bit integers.
- Exactly one value occurs once; all others occur three times.
