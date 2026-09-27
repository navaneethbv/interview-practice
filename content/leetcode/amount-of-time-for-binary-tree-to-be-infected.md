# Amount of Time for Binary Tree to Be Infected

Initially only the node with value start is infected.
Every minute, each infected node infects its parent and children if they are not infected already.
Return how many minutes are needed to infect the entire tree.
Node values are unique, and root is given as a level-order array with null for missing children.

## Examples

### Example 1

```text
Input: root = [4, 2, 7, 1, 3, null, 9], start = 3
Output: 4
Explanation: The farthest node is 9 along the path 3, 2, 4, 7, 9.
```

### Example 2

```text
Input: root = [8], start = 8
Output: 0
Explanation: The only node is already infected.
```

## Constraints

- The tree contains 1 through 100000 nodes.
- 1 <= Node.val <= 100000; node values are distinct.
- start is the value of a node in the tree.
