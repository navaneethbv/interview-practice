# Boats to Save People

Each boat can carry at most two people and total weight at most limit.
Return the fewest boats needed to carry everyone.
Every person fits in a boat alone.

## Examples

### Example 1

```text
Input: people = [1, 2, 2, 3], limit = 3
Output: 3
Explanation: Pair weights 1 and 2, then use separate boats for 2 and 3.
```

### Example 2

```text
Input: people = [1, 1, 1, 1], limit = 2
Output: 2
Explanation: Each boat carries two people.
```

## Constraints

- 1 <= people.length <= 50000.
- 1 <= people[i] <= limit <= 30000.
