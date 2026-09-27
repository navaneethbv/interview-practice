# Clone Graph

Create a deep copy of the connected, undirected graph reachable from `node`.
Every node has an integer `val` and a list called `neighbors`.
Return the copied node corresponding to the input node, or `null` for an empty graph.
Every returned node must be newly allocated, and its neighbors must refer only to copied nodes.

The test format is an adjacency list: row `i` lists the labels adjacent to node `i + 1`, and the input node has label 1.
Neighbor order does not matter.

## Examples

### Example 1

```text
Input: node = [[2, 3], [1, 3], [1, 2]]
Output: [[2, 3], [1, 3], [1, 2]]
Explanation: The copied triangle has the same edges and new node objects.
```

### Example 2

```text
Input: node = []
Output: []
Explanation: There is no starting node to copy.
```

## Constraints

- There are 0 to 100 nodes with distinct labels 1 through n.
- The graph is connected when nonempty.
- There are no duplicate edges or self-loops.
