# Rotate Array

Rotate `nums` right by `k` positions, modifying the array in place.
Entries shifted beyond the last index wrap to the front.
The displayed output is the updated array.
Try to use constant extra space.

## Examples

### Example 1

```text
Input: nums = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
Explanation: Move the last two entries to the front.
```

### Example 2

```text
Input: nums = [-1, -100, 3, 99], k = 2
Output: [3, 99, -1, -100]
Explanation: The two halves exchange positions.
```

## Constraints

- 1 <= nums.length <= 100,000
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 100,000
