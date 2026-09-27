# Binary Tree Longest Consecutive Sequence II

Find the greatest number of nodes on a tree path whose values change by exactly one in a single direction.
The path may move from a child through its parent and into another child.
Values along the path must be entirely increasing or entirely decreasing; changing direction partway through is not allowed.

## Examples

```text
Input: root = [2,1,3]
Output: 3
Explanation: The path 1,2,3 crosses the root and has length three.
```

```text
Input: root = [1,2,3]
Output: 2
Explanation: Only the path 1,2 is consecutive.
```

## Constraints

- The tree contains between 1 and 30,000 nodes.
- Node values are signed 32-bit integers.
- A path cannot visit a node twice.
