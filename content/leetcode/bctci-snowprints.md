# Snowprints

A fox crossed a snowy field from left to right, leaving a trail in a binary grid `field`, where `1` marks a snowprint.
Every column contains exactly one `1`, and between adjacent columns the row of the print changes by at most one.
A river runs just above row 0.
Return the smallest row index the fox reached, which is how many rows separated it from the river at its closest.

## Examples

### Example 1

```text
Input: field = [[0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0], [1, 1, 0, 1, 0, 0], [0, 0, 0, 0, 1, 1]]
Output: 1
```

### Example 2

```text
Input: field = [[1, 1, 1]]
Output: 0
```

## Constraints

- `1 <= rows, columns <= 1,000`
