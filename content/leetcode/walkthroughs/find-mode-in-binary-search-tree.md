## Intuition

Inorder traversal of a binary search tree is nondecreasing.
Equal values therefore form contiguous runs, so one running count is enough to find all modes without a frequency map.

## Brute force

A map of every value works but uses O(n) additional key storage.
Iterative inorder traversal keeps only the stack and current run.

## Approach

1. Traverse left, node, right with an explicit stack.
2. Extend the run when the current value equals the previous value, otherwise reset it to one.
3. Clear modes on a new larger run and append on a tied run.
4. Return the mode list or primitive array.

## Walkthrough

For Example 1, inorder traversal of `[1,null,2,2]` is `1,2,2`.
Value 1 has run length 1, then value 2 starts a run of 2 after its duplicate.
That run exceeds the best length, so the result is `[2]`.

## Complexity

Each node is pushed and popped once, giving O(n) time and O(h) stack space for height h.
The mode output can use O(n) space when every value ties.
Python returns a list; Java copies its list into an `int[]`.

## Edge cases

A one-node tree has one mode.
Equal values may occur on either side but remain contiguous in inorder under the contract.
Several runs can tie for the maximum.

## Common mistakes

Use inorder order rather than preorder.
Clear previous modes when a strictly larger run appears.
Do not assume only one mode exists.

## Language notes

Both references avoid recursion, which keeps skewed trees safe.
Java tracks a nullable `Integer previous` before the first value.
