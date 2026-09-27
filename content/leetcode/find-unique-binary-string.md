# Find Unique Binary String

The input contains n distinct binary strings, each of length n.
Return any binary string of length n that is absent from nums.

## Examples

### Example 1

```text
Input: nums = ["01", "10"]
Output: "11"
Explanation: 11 has length two and is absent.
```

### Example 2

```text
Input: nums = ["0"]
Output: "1"
Explanation: The other one-bit string is absent.
```

## Constraints

- 1 <= nums.length <= 16
- Every string has length nums.length and contains only 0 and 1.
- All input strings are distinct.
