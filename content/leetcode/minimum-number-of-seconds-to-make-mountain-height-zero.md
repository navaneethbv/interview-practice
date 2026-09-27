# Minimum Number of Seconds to Make Mountain Height Zero

Workers reduce a mountain simultaneously.
Worker i takes workerTimes[i] seconds for their first unit, twice that for their second unit, and so on.
Return the earliest time at which their combined reductions can remove mountainHeight units.

## Examples

### Example 1

```text
Input: mountainHeight = 4, workerTimes = [2, 1, 1]
Output: 3
Explanation: The workers can remove one, two, and two units respectively by time 3, enough to remove four units.
```

### Example 2

```text
Input: mountainHeight = 3, workerTimes = [2]
Output: 12
Explanation: The only worker spends 2 + 4 + 6 seconds.
```

## Constraints

- 1 <= mountainHeight <= 100000
- 1 <= workerTimes.length <= 10000
- 1 <= workerTimes[i] <= 1000000
