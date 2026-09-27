## Intuition

The middle value of a sorted interval can be the root of a balanced search tree.
Values before it belong to the left subtree and values after it belong to the right subtree.
Recursing on half-open index intervals keeps the boundaries unambiguous.

## Brute force

Choosing the first value as each subtree root preserves search order but can create a skewed tree with O(n) height.
Trying every possible root arrangement is much more expensive, while the midpoint gives a balanced construction immediately.

## Approach

1. Call `build(0, len(nums))` using the half-open interval `[left, right)`.
2. Return `None` when the interval is empty.
3. Set `middle = (left + right) // 2` and recursively build both subtrees around it.
4. Return a `TreeNode` containing `nums[middle]` and the two constructed children.

## Walkthrough

Example 1, the first statement block, uses `nums = [-8, -2, 3, 9, 12]`.

| interval | middle value | resulting work |
| --- | ---: | --- |
| `[0,5)` | 3 | root, recurse on `[0,2)` and `[3,5)` |
| `[0,2)` | -2 | left child, recurse on `[-8]` |
| `[0,1)` | -8 | leaf |
| `[3,5)` | 12 | right child, recurse on `[9]` |
| `[3,4)` | 9 | leaf |

The resulting tree has root 3, left subtree rooted at -2, and right subtree rooted at 12.

## Complexity

- Time: O(n), because every input value becomes one tree node.
- Space: O(log n) auxiliary recursion for the balanced tree, plus O(n) storage for the returned tree.

## Edge cases

An empty array returns null.
A one-element array creates a leaf.
Even-sized intervals choose the lower middle under integer division, which remains balanced.
The method uses index arithmetic rather than copying subarrays.

## Common mistakes

- Using inclusive and half-open bounds together can skip or duplicate values.
- Always choosing an endpoint creates an unbalanced tree.
- Copying slices at every recursive call adds avoidable O(n log n) data movement.

## Language notes

Python's nested `build` function closes over `nums` and returns `None` for empty intervals.
Java's private helper uses `TreeNode` constructors supplied by the judge and computes the middle without overflow.
The validator checks balanced BST structure, so the exact choice between equally valid middle positions is contract-sensitive only when expected output is fixed by the local spec.
