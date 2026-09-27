# Search in a Binary Search Tree

Find the node whose value equals val in a binary search tree.
Return that node as the root of its existing subtree, or null if the value is absent.
The judge displays the returned subtree in level order.

## Examples

```text
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
Explanation: The matching node owns the subtree containing 2,1,3.
```

```text
Input: root = [4,2,7,1,3], val = 5
Output: null
Explanation: No node holds 5.
```

## Constraints

- The input tree contains between 1 and 5000 nodes.
- Tree values are distinct positive integers.
- All node values and val are at most 100,000,000.
