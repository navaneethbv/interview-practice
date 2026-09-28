# Shift Word to Back

`word` is guaranteed to appear in `arr` as a subsequence.
Take the earliest occurrence, the one found by matching `word` greedily from left to right, and move those letters to the end of `arr`.
Keep the moved letters in order and keep the remaining letters in their original relative order.
Work in place with O(1) extra space.

## Examples

### Example 1

```text
Input: arr = ["b", "a", "c", "b"], word = "ab"
Output: ["b", "c", "a", "b"]
```

### Example 2

```text
Input: arr = ["b", "a", "b", "c"], word = "b"
Output: ["a", "b", "c", "b"]
```

## Constraints

- `0 <= word.length <= arr.length <= 10^6`
- Letters are lowercase English letters.
