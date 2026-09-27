# Convert Sorted Array To Binary Search Tree

Build a binary search tree containing exactly the values in the strictly increasing array `nums`.
For every node, the heights of its left and right subtrees must differ by at most one.
Return the root.
Any tree that satisfies both the search ordering and height balance requirements is accepted.
Examples show level-order arrays, using `null` for missing children.

## Examples

```text
Input: nums = [-8,-2,3,9,12]
Output: [3,-2,12,-8,null,9]
Explanation: Inorder traversal gives nums and each node is balanced.
```

```text
Input: nums = [1,4]
Output: [4,1]
Explanation: A root of 1 with right child 4 is also valid.
```

## Constraints

- 1 <= nums.length <= 10,000
- nums is strictly increasing.
- Each value fits a signed 32-bit integer.
