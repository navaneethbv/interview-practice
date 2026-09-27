# Maximum Sum BST in Binary Tree

Among all subtrees that obey strict binary search ordering, return the greatest sum of node values.
A subtree consists of a node and all its descendants.
The empty subtree is permitted and has sum zero.

## Examples

### Example 1

```text
Input: root = [2, 1, 3]
Output: 6
Explanation: The whole tree is a BST with sum 6.
```

### Example 2

```text
Input: root = [-2, -3, -1]
Output: 0
Explanation: The empty subtree beats every negative sum.
```

## Constraints

- The tree has 1 to 40000 nodes.
- -40000 <= node.val <= 40000.
- In a valid BST subtree, left values are strictly smaller and right values strictly larger.
