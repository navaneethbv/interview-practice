# Restore IP Addresses

Insert exactly three dots into `s` to form every valid IPv4 address while preserving all digits in order.
Each of the four parts must be an integer from 0 through 255 and cannot have leading zeros unless it is exactly 0.
Return addresses in any order.

## Examples

### Example 1

```text
Input: s = "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]
Explanation: Only these two placements keep every part within range.
```

### Example 2

```text
Input: s = "0000"
Output: ["0.0.0.0"]
Explanation: Each zero must be its own part.
```

## Constraints

- 1 <= s.length <= 20
- s contains decimal digits only.
