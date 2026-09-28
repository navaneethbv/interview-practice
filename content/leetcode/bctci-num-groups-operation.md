# Num Groups Operation

Implement `UnionFind` for integer elements.
`add(x)` introduces a new singleton group; `union(x, y)` combines two groups if they differ.
`size()` counts elements and `num_groups()` (Java: `numGroups()`) counts groups.
`find(x)` returns the smallest element in x's group, our deterministic representative convention.

## Constraints

- At most 1,000,000 operations and elements; elements are signed 32-bit integers.
- Each element is added exactly once before it is used by find or union.
- Aim for amortized O(log n) or better per operation.


## Examples

### Example 1

```text
Input: {"ctor": [], "ops": ["size", "num_groups", "add", "find", "size", "num_groups", "add", "find", "size", "num_groups", "union", "find", "num_groups", "union", "size"], "args": [[], [], [4], [4], [], [], [2], [2], [], [], [4, 2], [2], [], [4, 2], []]}
Output: [0, 0, null, 4, 1, 1, null, 2, 2, 2, null, 2, 1, null, 2]
```

### Example 2

```text
Input: {"ctor": [], "ops": ["size", "num_groups", "add", "find", "size", "num_groups", "add", "find", "size", "num_groups", "add", "find", "size", "num_groups", "union", "find", "num_groups", "union", "size", "union", "find", "num_groups", "union", "size"], "args": [[], [], [-3], [-3], [], [], [0], [0], [], [], [8], [8], [], [], [-3, 0], [0], [], [-3, 0], [], [0, 8], [8], [], [-3, 8], []]}
Output: [0, 0, null, -3, 1, 1, null, 0, 2, 2, null, 8, 3, 3, null, -3, 2, null, 3, null, -3, 1, null, 3]
```
