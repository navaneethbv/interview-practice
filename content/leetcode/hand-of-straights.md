# Hand of Straights

Determine whether all cards in `hand` can be divided into groups of exactly `groupSize` cards, where each group consists of consecutive integer values.
Each card must be used once, including repeated values.

## Examples

### Example 1

```text
Input: hand = [1, 2, 3, 2, 3, 4], groupSize = 3
Output: true
Explanation: Make groups [1,2,3] and [2,3,4].
```

### Example 2

```text
Input: hand = [1, 2, 4, 5], groupSize = 4
Output: false
Explanation: The four cards do not form one consecutive group.
```

## Constraints

- 1 <= hand.length <= 10,000
- 0 <= hand[i] <= 10^9
- 1 <= groupSize <= hand.length
