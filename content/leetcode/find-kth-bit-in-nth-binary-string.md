# Find Kth Bit in Nth Binary String

Define S1 as 0.
For every later term, Sn is S(n-1), followed by 1, followed by the reversed bitwise inversion of S(n-1).
Return the kth character of Sn, using one-based positions.

## Examples

### Example 1

```text
Input: n = 3, k = 1
Output: "0"
Explanation: Every term begins with 0.
```

### Example 2

```text
Input: n = 3, k = 4
Output: "1"
Explanation: The middle character added while constructing S3 is 1.
```

## Constraints

- 1 <= n <= 20
- 1 <= k <= 2^n - 1
