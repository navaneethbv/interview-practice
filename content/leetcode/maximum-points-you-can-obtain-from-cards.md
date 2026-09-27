# Maximum Points You Can Obtain from Cards

Take exactly k cards, choosing the leftmost or rightmost remaining card on each turn.
Return the greatest possible sum of their point values.

## Examples

### Example 1

```text
Input: cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3
Output: 12
Explanation: Take the last three cards with values 5,6,1.
```

### Example 2

```text
Input: cardPoints = [2, 2, 2], k = 2
Output: 4
Explanation: Every pair of selected cards totals 4.
```

## Constraints

- 1 <= k <= cardPoints.length <= 100000.
- 1 <= cardPoints[i] <= 10000.
