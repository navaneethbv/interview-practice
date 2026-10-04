## Intuition

Each BST already represents a sorted sequence through inorder traversal.
After extracting those two sequences, merging them is the same operation used by merge sort.
Equal values are preserved rather than collapsed.

## Brute force

Collecting every value and sorting the combined collection would take O((n + m) log(n + m)) time.
The ordering already guaranteed by the trees makes that extra sorting unnecessary.

## Approach

Call `_inorder` on each root to produce `first` and `second`.
The helper uses an explicit stack to visit left subtree, node, then right subtree.
Maintain indices i and j and append the smaller current value to `merged`.
When one list is exhausted, continue taking values from the other.
On equality, the reference takes from the first list, leaving the second occurrence available for a later iteration.
Each merge step emits the smallest value not yet emitted, proving the final array is sorted and complete.

## Walkthrough

```text
Input: root1 = [5, 2, 9, null, 4, 9, 11, null, null, null, 9], root2 = [3, 1, 6]
Output: [1, 2, 3, 4, 5, 6, 9, 9, 9, 11]
```

Example 1 yields first-tree values `[2, 4, 5, 9, 9, 9, 11]` and second-tree values `[1, 3, 6]`.
The merge begins 1, 2, 3, 4, 5, 6.
At that point the second sequence is exhausted.
Appending the remaining first-tree values produces `[1, 2, 3, 4, 5, 6, 9, 9, 9, 11]`.

## Complexity

Every node is visited once and every extracted value is merged once, so time is O(n + m).
The reference materializes both inorder lists as well as the result, requiring O(n + m) space beyond the input trees.

## Edge cases

Either tree may be empty.
If both are empty, the result is empty.
Repeated values within or across trees must all survive.

## Common mistakes

Do not claim this reference uses only two traversal stacks; it explicitly stores complete intermediate lists.
Do not stop the merge when only one list ends.

## Language notes

Python returns a list of integers.
Java uses `List<Integer>` and an `ArrayDeque` traversal stack, with equivalent index-based merge decisions.
