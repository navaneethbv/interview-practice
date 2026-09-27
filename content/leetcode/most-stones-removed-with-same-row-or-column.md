# Most Stones Removed with Same Row or Column

Remove stones one at a time.
A stone may be removed only when another remaining stone shares its row or its column.
Return the largest number of stones that can be removed.

## Constraints

- `1 <= stones.length <= 1000`.
- Coordinates range from 0 to 10000.
- Stone positions are distinct.

## Examples

### Example 1

```text
Input: stones = [[0, 0], [0, 1], [1, 1]]
Output: 2
Explanation: Remove 0,0 and then 0,1, leaving one stone.
```

### Example 2

```text
Input: stones = [[0, 0], [1, 1]]
Output: 0
Explanation: Neither stone shares a row or column.
```
