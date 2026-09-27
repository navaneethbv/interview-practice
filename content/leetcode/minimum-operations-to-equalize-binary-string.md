# Minimum Operations to Equalize Binary String

One operation flips exactly k distinct positions in the binary string.
Return the fewest operations needed to make every bit 1, or -1 if no sequence of operations can do so.

## Examples

### Example 1

```text
Input: s = "001", k = 2
Output: 1
Explanation: Flip the first two positions.
```

### Example 2

```text
Input: s = "011", k = 2
Output: -1
Explanation: Flipping two bits preserves the parity of the number of zeroes, which starts odd.
```

## Constraints

- 1 <= s.length <= 100000
- s contains only 0 and 1.
- 1 <= k <= s.length
