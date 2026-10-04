## Intuition

The first occurrence of each value belongs in the answer, so traversal order already tells us which node to keep.
Remembering encountered values lets us decide whether a node contributes anything new without searching the retained prefix.

## Brute force

For each retained node, scan the remainder and unlink every equal value.
This uses constant auxiliary space but can compare almost every pair of nodes, taking quadratic time when values are distinct.

## Approach

Maintain `seen`, the values already retained, and `previous`, the last retained node.
When `node.val` is new, add it to `seen` and advance `previous` to `node`.
Otherwise redirect `previous.next` around `node` while leaving `previous` in place.
Advance `node` on every iteration and return the original `head`.
The processed prefix always contains exactly one occurrence of each value, in its original order.

## Walkthrough

Example 1 starts with `[3, 1, 3, 2, 1]`.
Keep the first 3 and then 1, giving `seen = {3, 1}`.
The second 3 is already present, so link the retained 1 directly to 2.
Keep 2, then unlink the final 1 because its value was already retained.
The resulting chain is `[3, 1, 2]`.

## Complexity

For n nodes and u distinct values, expected time is O(n) and auxiliary space is O(u), assuming ordinary hash-set operations.
The algorithm relinks existing nodes rather than allocating a second list.

## Edge cases

An empty list returns its original null head.
A chain of equal values retains only its first node.
Consecutive duplicates work because `previous` stays on the retained node.

## Common mistakes

Advancing `previous` after deleting a node can reconnect later deletions through an already removed node.
Comparing node identities instead of `val` would fail to remove equal values stored in different nodes.

## Language notes

Python uses a set and Java uses `HashSet<Integer>`.
Both references use the harness-provided `ListNode.val` field and preserve the retained nodes' identities.
