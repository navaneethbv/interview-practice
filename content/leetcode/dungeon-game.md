# Dungeon Game

Move from the top-left to the bottom-right cell, moving only right or down.
Each cell changes your health by its signed value as you enter it, including the start and final cells.
Health must remain at least 1 throughout.
Return the smallest starting health that permits some valid path.

## Constraints

- Dimensions range from 1 to 200.
- Cell values range from -1000 to 1000.

## Examples

### Example 1

```text
Input: dungeon = [[-2, -3], [5, -1]]
Output: 3
Explanation: Start with 3, go down to gain 5, then right.
```

### Example 2

```text
Input: dungeon = [[5]]
Output: 1
Explanation: Positive health gain still requires at least one starting point.
```
