# Alien Dictionary

The words of an unfamiliar language are supplied in lexicographic order, but its alphabet uses an unknown ordering of lowercase English letters.
Return one valid ordering containing every distinct letter that appears in `words`, exactly once.
Return an empty string if no ordering can explain the supplied word order.
When two words share a prefix, the shorter word must come first.

## Examples

### Example 1

```text
Input: words = ["za", "zb", "ca", "cb"]
Output: "abzc"
Explanation: The required relations are a before b and z before c; this ordering satisfies both.
```

### Example 2

```text
Input: words = ["abc", "ab"]
Output: ""
Explanation: A longer word cannot appear before its own prefix.
```

## Constraints

- 1 <= words.length <= 100.
- 1 <= words[i].length <= 100.
- Words contain lowercase English letters.
