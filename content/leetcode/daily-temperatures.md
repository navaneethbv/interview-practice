# Daily Temperatures

For each day, find how many days you must wait until a strictly warmer temperature occurs.
Return 0 for a day that has no warmer day later in the input.

## Examples

### Example 1

```text
Input: temperatures = [60, 65, 63, 70]
Output: [1, 2, 1, 0]
Explanation: Day 1 must wait two days to reach a temperature above 65.
```

### Example 2

```text
Input: temperatures = [80, 80, 70]
Output: [0, 0, 0]
Explanation: Equal temperatures do not count as warmer.
```

## Constraints

- 1 <= temperatures.length <= 100000.
- 30 <= temperatures[i] <= 100.
