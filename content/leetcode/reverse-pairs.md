# Reverse Pairs

Count pairs of indices i < j for which nums[i] is strictly greater than twice nums[j].
Use mathematical integer multiplication when comparing, even when twice a value exceeds the signed 32-bit range.

## Examples

### Example 1

```text
Input: nums = [1, 3, 2, 3, 1]
Output: 2
Explanation: The 3 at index 1 and the 3 at index 3 each pair with the final 1.
```

### Example 2

```text
Input: nums = [2, 4, 3, 5, 1]
Output: 3
Explanation: The values 4, 3, and 5 each form a qualifying pair with the final 1.
```

## Constraints

- 1 <= nums.length <= 50000.
- Values are signed 32-bit integers.
