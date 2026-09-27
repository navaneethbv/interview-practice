# Number of Nodes in the Sub-Tree With the Same Label

An undirected tree on nodes 0 through n - 1 is rooted at node 0.
Each node i carries the lowercase letter labels[i].
For each node, count nodes in its subtree, including itself, whose label matches its own.

## Examples

### Example 1

```text
Input: n = 4, edges = [[0, 1], [0, 2], [1, 3]], labels = "abaa"
Output: [3, 1, 1, 1]
Explanation: The root subtree has three a labels; each other matching count is one.
```

### Example 2

```text
Input: n = 3, edges = [[0, 1], [1, 2]], labels = "aaa"
Output: [3, 2, 1]
Explanation: Each subtree is a suffix of the path.
```

## Constraints

- 1 <= n <= 100000.
- edges contains n - 1 distinct edges forming a tree.
- labels.length == n.
