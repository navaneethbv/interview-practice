# Two Sum II: Input Array Is Sorted

In the sorted array `numbers`, locate the two distinct positions whose values add to `target`.
Return their one-based indices in increasing order.
Exactly one pair of indices is a solution.
Use constant additional space.

## Examples

### Example 1

```text
Input: numbers = [1, 3, 6, 10], target = 9
Output: [2, 3]
Explanation: The values at one-based indices 2 and 3 sum to 9.
```

### Example 2

```text
Input: numbers = [-2, 0, 4], target = 2
Output: [1, 3]
Explanation: The first and third values sum to 2.
```

## Constraints

- 2 <= numbers.length <= 30000.
- -1000 <= numbers[i], target <= 1000.
- numbers is sorted in nondecreasing order.
