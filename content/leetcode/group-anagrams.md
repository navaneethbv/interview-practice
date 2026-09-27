# Group Anagrams

Partition `strs` into groups in which all strings have the same character counts.
Every input occurrence must appear in exactly one group.
You may return groups and their members in any order.

## Constraints

- `1 <= strs.length <= 10000`.
- `0 <= strs[i].length <= 100`.
- Strings contain lowercase English letters.

## Examples

### Example 1

```text
Input: strs = ["ab", "ba", "cd"]
Output: [["ab", "ba"], ["cd"]]
Explanation: ab and ba share counts, while cd forms its own group.
```

### Example 2

```text
Input: strs = ["", ""]
Output: [["", ""]]
Explanation: Both empty strings belong to one group.
```
