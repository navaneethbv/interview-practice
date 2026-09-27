# Maximum Length of a Concatenated String with Unique Characters

Choose a subsequence of strings from arr and concatenate them.
Return the largest resulting length with no repeated character anywhere in the concatenation.
Choosing no strings is allowed.

## Constraints

- There are 1 to 16 strings, each length 1 to 26.
- All characters are lowercase English letters.

## Examples

### Example 1

```text
Input: arr = ["ab", "cd", "aa"]
Output: 4
Explanation: Concatenating ab and cd uses four distinct letters.
```

### Example 2

```text
Input: arr = ["aa", "bb"]
Output: 0
Explanation: Neither string can be used without repetition.
```
