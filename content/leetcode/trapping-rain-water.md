# Trapping Rain Water

The nonnegative values in `height` describe adjacent bars, each one unit wide.
After rain settles, water can remain in depressions enclosed by taller bars.
Return the total number of unit squares of water held above the bars.

## Examples

### Example 1

```text
Input: height = [3, 0, 2, 0, 3]
Output: 7
Explanation: The three interior positions hold 3, 1, and 3 units.
```

### Example 2

```text
Input: height = [1, 2, 3]
Output: 0
Explanation: An increasing profile cannot retain water.
```

## Constraints

- 1 <= height.length <= 20000.
- 0 <= height[i] <= 100000.
