# Number of Islands II

An m-by-n grid starts entirely as water.
For each position, turn that cell into land and report the number of islands afterward.
An island connects land through shared edges.
Adding land to an already-land cell has no effect.

## Constraints

- `1 <= m, n <= 10000`.
- There are 1 to 10000 valid positions.

## Examples

### Example 1

```text
Input: m = 2, n = 2, positions = [[0, 0], [1, 1], [0, 1]]
Output: [1, 2, 1]
Explanation: The third cell connects the two previous islands.
```

### Example 2

```text
Input: m = 1, n = 1, positions = [[0, 0], [0, 0]]
Output: [1, 1]
Explanation: Repeated additions preserve the count.
```
