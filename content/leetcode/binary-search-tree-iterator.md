# Binary Search Tree Iterator

Iterate over a binary search tree in ascending order.
`next()` returns the next smallest value and advances the iterator.
`hasNext()` reports whether an unvisited value remains.
Every next call is valid.
Target O(h) memory for tree height h and amortized O(1) work per operation.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [[2, 1, 3]], ops = ["hasNext", "next", "next", "next", "hasNext"], args = [[], [], [], [], []]
Output: [true, 1, 2, 3, false]
Explanation: Ascending traversal returns 1, 2, and 3, after which no values remain.
```

### Example 2

```text
Input: ctor = [[5]], ops = ["next", "hasNext"], args = [[], []]
Output: [5, false]
Explanation: The only value is 5, so the iterator is exhausted after one next call.
```

## Constraints

- The tree contains 1 to 100000 nodes.
- 0 <= node.val <= 1000000.
- At most 100000 operations occur per test.
