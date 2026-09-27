# Sum of Subarray Ranges

For every nonempty contiguous subarray, compute its largest value minus its smallest value.
Return the sum of these ranges.

## Constraints

- `1 <= nums.length <= 1000`.
- Values range from -1000000000 to 1000000000.
- Use a 64-bit result in Java.

## Examples

### Example 1

```text
Input: nums = [1, 3, 2]
Output: 5
Explanation: The two adjacent pairs contribute 2 and 1; the full array contributes 2.
```

### Example 2

```text
Input: nums = [4, 4]
Output: 0
Explanation: All subarrays have equal minimum and maximum.
```
