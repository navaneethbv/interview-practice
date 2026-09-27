# Candy Crush

Repeatedly remove every horizontal or vertical run of at least three equal positive candies, doing all removals in a round simultaneously.
Then let remaining candies fall downward within each column, filling vacated cells with zeros at the top.
Stop when no run remains and return the stable board.

## Constraints

- Board dimensions range from 3 to 50.
- Initial candy values range from 1 to 2000.

## Examples

### Example 1

```text
Input: board = [[1, 1, 1], [2, 3, 4], [5, 6, 7]]
Output: [[0, 0, 0], [2, 3, 4], [5, 6, 7]]
Explanation: The top row is removed without affecting the rows below.
```

### Example 2

```text
Input: board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Explanation: No three equal candies align.
```
