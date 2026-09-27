# Can Place Flowers

Existing flowers are 1 and empty plots are 0.
Return whether at least `n` additional flowers can be planted without any two flowers occupying neighboring plots.
Existing flowers already obey this rule.

## Examples

### Example 1

```text
Input: flowerbed = [1, 0, 0, 0, 1], n = 1
Output: true
Explanation: Plant one flower in the center plot.
```

### Example 2

```text
Input: flowerbed = [1, 0, 0, 0, 1], n = 2
Output: false
Explanation: Only one additional flower can fit.
```

## Constraints

- 1 <= flowerbed.length <= 20,000
- 0 <= n <= flowerbed.length
- flowerbed is binary and has no adjacent 1 entries.
