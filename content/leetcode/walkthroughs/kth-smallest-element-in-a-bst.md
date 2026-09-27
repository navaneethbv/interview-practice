## Intuition

Inorder traversal visits a valid binary search tree in increasing value order.
The kth visited node therefore holds the requested value.
An explicit stack lets the traversal stop as soon as that node is reached, without storing all sorted values.

## Brute force

Traverse the entire tree, collect every value, sort the collection, and select the kth entry.
This takes O(n log n) time and O(n) extra space.
Even collecting a full inorder list does unnecessary work when k is small.

## Approach

1. Initialize an empty `stack` and set `node` to the root.
2. Push nodes while following left children to the smallest unvisited position.
3. Pop the next inorder node and decrement k.
4. Return its value when k becomes zero.
5. Otherwise set `node` to its right child and repeat the left descent.

The stack remembers ancestors whose own visit or right subtree is still pending.
Following left children before each pop ensures that no smaller unvisited value is skipped.
The valid-k guarantee ensures the method reaches a return inside the traversal.

## Walkthrough

Example 1 uses `[5, 2, 8, 1, 3]` and `k = 3`.

| Action | Stack from bottom to top | Remaining k |
| --- | --- | --- |
| Descend left from root | `[5, 2, 1]` | 3 |
| Pop node 1 | `[5, 2]` | 2 |
| Pop node 2 | `[5]` | 1 |
| Descend into node 2's right child | `[5, 3]` | 1 |
| Pop node 3 | `[5]` | 0 |

Return 3 without visiting nodes 5 and 8 as output candidates.

## Complexity

- Time: O(h + k), for tree height h and the first k inorder visits; worst case O(n).
- Space: O(h), retaining the pending ancestor path.

## Edge cases

For k equal to one, the answer is the leftmost node.
For k equal to the node count, the traversal reaches the largest value.
A singleton returns its only value, including zero.
Skewed trees remain safe from recursion-depth limits.

## Common mistakes

- Returning the kth node in preorder does not produce sorted order.
- Counting the dummy notion of an empty child as a visit shifts k incorrectly.
- Forgetting the popped node's right subtree skips values.

## Language notes

Python uses a list as the stack; Java uses `ArrayDeque<TreeNode>`.
Java includes an exception after the loop to satisfy the required return path for invalid k, but valid inputs always return earlier.
Neither reference mutates the tree or allocates a full sorted-value array.
