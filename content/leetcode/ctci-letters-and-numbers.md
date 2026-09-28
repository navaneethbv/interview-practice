# Letters and Numbers

`array` holds single-character strings, each a letter or a digit.
Return the longest contiguous subarray that contains equally many letters and digits.
If several have the maximum length, return the one that starts earliest.
Return an empty array when no such subarray exists.

## Examples

### Example 1

```text
Input: array = ["a", "1", "b", "c", "2", "3", "d"]
Output: ["a", "1", "b", "c", "2", "3"]
```

### Example 2

```text
Input: array = ["a", "b"]
Output: []
```

## Constraints

- `0 <= array.length <= 100,000`
- Each element is one ASCII letter or digit.
