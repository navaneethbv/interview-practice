# Greatest Common Divisor of Strings

A nonempty string divides another string when repeating it some positive number of times produces that string.
Return the longest string that divides both inputs, or the empty string if none exists.

## Examples

### Example 1

```text
Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Explanation: Repeating ABC generates both inputs.
```

### Example 2

```text
Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Explanation: AB is the longest shared repeating block.
```

## Constraints

- 1 <= str1.length, str2.length <= 1,000
- Both strings contain uppercase English letters.
