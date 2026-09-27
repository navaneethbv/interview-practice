# Maximum Population Year

Each log `[birth,death]` describes a person alive from birth inclusive until death exclusive.
Return the earliest year having the largest living population.

## Constraints

- There are 1 to 100 logs.
- `1950 <= birth < death <= 2050`.

## Examples

### Example 1

```text
Input: logs = [[1950, 1960], [1955, 1965]]
Output: 1955
Explanation: Both people are alive starting in 1955.
```

### Example 2

```text
Input: logs = [[1950, 1951], [1951, 1952]]
Output: 1950
Explanation: The population ties at one and the earlier year wins.
```
