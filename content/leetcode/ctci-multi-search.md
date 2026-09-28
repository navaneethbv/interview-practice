# Multi Search

Given a string `big` and an array `smalls`, find where each small string occurs in `big`.
Return a list with one entry per small string, in the same order, holding every starting index of an occurrence in increasing order.
Occurrences may overlap.

## Examples

### Example 1

```text
Input: big = "mississippi", smalls = ["is", "ppi", "hi", "sis", "i", "ssippi"]
Output: [[1, 4], [8], [], [3], [1, 4, 7, 10], [5]]
```

### Example 2

```text
Input: big = "", smalls = ["a"]
Output: [[]]
```

## Constraints

- `0 <= big.length <= 10,000`
- `0 <= smalls.length <= 1,000`
- `1 <= smalls[i].length <= 100`
- All strings are lowercase English letters; small strings may repeat.
