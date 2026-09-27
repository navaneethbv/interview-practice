# Check If a String Contains All Binary Codes of Size K

Return whether every possible binary string of length k occurs as a contiguous substring of s.

## Examples

### Example 1

```text
Input: s = "00110110", k = 2
Output: true
Explanation: The substrings include 00, 01, 10, and 11.
```

### Example 2

```text
Input: s = "0110", k = 2
Output: false
Explanation: The code 00 is absent.
```

## Constraints

- 1 <= s.length <= 500,000
- s contains only 0 and 1.
- 1 <= k <= 20
