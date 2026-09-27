# Minimum Number of Days to Make m Bouquets

Flower i becomes usable on day `bloomDay[i]`.
Each bouquet requires k adjacent usable flowers, and no flower may belong to more than one bouquet.
Return the earliest day when m bouquets can be formed, or -1 if impossible.

## Examples

### Example 1

```text
Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 1
Output: 3
Explanation: By day 3, three separate flowers are usable.
```

### Example 2

```text
Input: bloomDay = [1, 10, 3, 10, 2], m = 3, k = 2
Output: -1
Explanation: Six flowers are required, but only five exist.
```

## Constraints

- 1 <= bloomDay.length <= 100,000
- 1 <= bloomDay[i] <= 10^9
- 1 <= m <= 10^6
- 1 <= k <= bloomDay.length
