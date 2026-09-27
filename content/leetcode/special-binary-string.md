# Special Binary String

A special binary string has equally many 1s and 0s, and every prefix contains at least as many 1s as 0s.
You may swap any two adjacent nonempty substrings that are both special.
Return the lexicographically largest string reachable through such swaps.

## Examples

### Example 1

```text
Input: s = "11011000"
Output: "11100100"
Explanation: Reordering special blocks inside the outer pair produces a larger string.
```

### Example 2

```text
Input: s = "10"
Output: "10"
Explanation: The smallest special string cannot improve.
```

## Constraints

- 1 <= s.length <= 50
- s is a special binary string.
