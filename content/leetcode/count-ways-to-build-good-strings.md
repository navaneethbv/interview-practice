# Count Ways To Build Good Strings

Starting with an empty string, repeatedly append either zero copies of the character 0 or one copies of the character 1, where zero and one are the positive block lengths supplied as parameters.
Count distinct resulting strings whose lengths lie from low through high inclusive.
Return the count modulo 1000000007.

## Constraints

- `1 <= low <= high <= 100000`.
- `1 <= zero, one <= low`.

## Examples

### Example 1

```text
Input: low = 2, high = 2, zero = 1, one = 1
Output: 4
Explanation: Every two-bit string is reachable.
```

### Example 2

```text
Input: low = 3, high = 3, zero = 2, one = 3
Output: 1
Explanation: Only the string 111 has length 3.
```
