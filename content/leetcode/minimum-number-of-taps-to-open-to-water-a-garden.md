# Minimum Number of Taps to Open to Water a Garden

A garden occupies the interval from 0 through n.
Tap i can water the interval from i - ranges[i] to i + ranges[i].
Return the fewest taps needed to cover the entire garden, or -1 if a gap cannot be covered.

## Examples

### Example 1

```text
Input: n = 5, ranges = [3, 4, 1, 1, 0, 0]
Output: 1
Explanation: Tap 1 covers the whole garden.
```

### Example 2

```text
Input: n = 3, ranges = [0, 0, 0, 0]
Output: -1
Explanation: Point-sized watering ranges cannot cover the gaps.
```

## Constraints

- 1 <= n <= 10000.
- ranges.length == n + 1.
- 0 <= ranges[i] <= 100.
