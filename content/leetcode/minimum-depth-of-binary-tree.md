# Minimum Depth of Binary Tree

Return the smallest number of nodes on a path from the root to a leaf.
A leaf has neither a left child nor a right child.
An empty tree has depth zero.

## Examples

```text
Input: root = [3,9,20,null,null,15,7]
Output: 2
Explanation: The node holding 9 is a leaf at depth 2.
```

```text
Input: root = [1,null,2,null,3]
Output: 3
Explanation: Missing left children are not leaves; the chain ends at depth 3.
```

## Constraints

- The tree contains between 0 and 100,000 nodes.
- Values are signed 32-bit integers.
