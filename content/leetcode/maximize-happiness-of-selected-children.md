# Maximize Happiness of Selected Children

Select exactly k children, one at a time, and add each selected child's current happiness to your score.
After each selection, every unselected child's happiness decreases by one, but never below zero.
Return the largest score possible.

## Examples

### Example 1

```text
Input: happiness = [1, 2, 3], k = 2
Output: 4
Explanation: Select happiness 3, then the child whose happiness fell from 2 to 1.
```

### Example 2

```text
Input: happiness = [1, 1, 1], k = 3
Output: 1
Explanation: Only the first selection contributes a positive value.
```

## Constraints

- 1 <= k <= happiness.length <= 200000.
- 1 <= happiness[i] <= 100000000.
