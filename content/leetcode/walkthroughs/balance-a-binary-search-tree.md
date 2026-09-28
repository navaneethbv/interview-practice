## Intuition
A binary search tree already gives its values in sorted order when visited inorder.
A balanced tree can therefore be built by choosing the middle sorted value as the root, then doing the same for each half.
This preserves the search-tree ordering while keeping the two subtree ranges nearly equal.

## Brute force
Trying every possible rearrangement of the nodes is unnecessary and grows explosively.
Repeatedly rotating an unbalanced tree can work, but it requires careful rotation cases and gives less direct control over the final height.

## Approach

1. Perform iterative inorder traversal and store values in sorted order.
2. Let `build` treat a half-open value interval as one subtree.
3. Choose its middle value as the root.
4. Recursively build the lower interval as the left child and upper interval as the right child.
5. Return null for an empty interval.

## Walkthrough

For Example 1, `root = [1, null, 2, null, 3, null, 4]`, inorder traversal records `[1, 2, 3, 4]`.
The middle index is 2, so value 3 becomes the new root.
The left interval contains `[1, 2]`, whose middle value 2 becomes the left child and value 1 becomes its left child.
The right interval contains `[4]`, so 4 becomes the right child.
The serialized result is `[3, 2, 4, 1]`, which has the same sorted values and balanced subtree heights.
If the input is already balanced, selecting medians can reproduce an equally valid balanced arrangement.

## Complexity
The traversal takes O(n) time and stores O(n) values.
Building visits every node once, so it takes O(n) additional time.
The recursive build stack is O(log n) for the balanced result, while the value list is O(n) auxiliary space.

## Edge cases
A single node produces the same single-node tree.
An empty interval in the helper returns null.
The method does not assume that a particular valid balanced shape is required.

## Common mistakes
Do not sort the values independently if the input contract is a BST and node values must be preserved through traversal.
Do not choose an endpoint as each subtree root, because that recreates a skewed tree.
Use half-open intervals consistently so no value is skipped or duplicated.

## Language notes
The Python and Java versions use iterative inorder traversal, then a recursive median builder.
Java uses `ArrayDeque` for the traversal stack and `ArrayList` for sorted values.
