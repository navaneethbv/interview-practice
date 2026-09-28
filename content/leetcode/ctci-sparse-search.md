# Sparse Search

`words` is a sorted array of distinct non-empty strings with empty strings scattered between them.
The empty strings do not affect the sorted order of the other words.
Return the index of `target`, or `-1` if it is absent.

## Examples

### Example 1

```text
Input: words = ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], target = "ball"
Output: 4
```

### Example 2

```text
Input: words = ["", "", ""], target = "a"
Output: -1
```

## Constraints

- `0 <= words.length <= 100,000`
- `target` is non-empty.
- Strings contain lowercase English letters.
