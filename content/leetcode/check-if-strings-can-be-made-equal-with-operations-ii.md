# Check if Strings Can be Made Equal With Operations II

You may swap any two characters of s1 whose indices differ by an even number.
Return whether repeated swaps can transform s1 into s2.

## Examples

### Example 1

```text
Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: Swap the even positions and then the odd positions.
```

### Example 2

```text
Input: s1 = "abcd", s2 = "abdc"
Output: false
Explanation: The last two letters would need to cross index parity.
```

## Constraints

- 1 <= s1.length == s2.length <= 100,000
- Both strings contain lowercase English letters.
