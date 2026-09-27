# Fruit Into Baskets

Pick a contiguous sequence of trees while collecting at most two distinct fruit types.
Return the maximum number of fruits collected when each tree contributes one fruit.

## Examples

### Example 1

```text
Input: fruits = [1, 2, 1]
Output: 3
Explanation: The entire sequence uses only two types.
```

### Example 2

```text
Input: fruits = [0, 1, 2, 2]
Output: 3
Explanation: The suffix [1,2,2] is the longest valid segment.
```

## Constraints

- 1 <= fruits.length <= 100,000
- 0 <= fruits[i] < fruits.length
