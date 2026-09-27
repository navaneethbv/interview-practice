# H-Index

Given citation counts for a researcher's papers, return the greatest integer h for which at least h papers have at least h citations each.

## Constraints

- `1 <= citations.length <= 5000`.
- `0 <= citations[i] <= 1000`.

## Examples

### Example 1

```text
Input: citations = [4, 0, 5, 2, 3]
Output: 3
Explanation: Three papers have at least three citations.
```

### Example 2

```text
Input: citations = [0, 0]
Output: 0
Explanation: No paper has even one citation.
```
