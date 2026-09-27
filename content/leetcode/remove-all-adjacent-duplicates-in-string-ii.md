# Remove All Adjacent Duplicates in String II

Repeatedly remove any group of exactly k equal adjacent characters.
New adjacent groups formed by a deletion can also be removed.
Return the final string after no more deletions are possible.

## Examples

### Example 1

```text
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: Removing eee and ccc exposes bbb, then ddd, leaving aa.
```

### Example 2

```text
Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There are no repeated adjacent pairs.
```

## Constraints

- 1 <= s.length <= 100000.
- 2 <= k <= 10000.
- s contains lowercase English letters.
