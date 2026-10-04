## Intuition

Keep the actual traversal order of every level left to right, and reverse only the values emitted for odd-depth levels.
This separates discovering the next level from deciding how the current level should appear in the answer.

## Brute force

Repeatedly searching the tree for all nodes at each depth can take quadratic time on a long chain.
A level-order traversal visits every node once and already groups the required output segments.

## Approach

Initialize level with root when nonempty and depth with zero.
Collect the current level's values.
Append them normally at even depths and in reverse at odd depths.
Construct the next level by visiting current nodes left to right and adding each left child before its right child.
Increment depth and repeat.
The traversal list remains in geometric left-to-right order even when its displayed values are reversed, preventing the following level from inheriting an unintended reversal.

## Walkthrough

```text
Input: root = [1, 2, 3, 4, 5, null, 6]
Output: [1, 3, 2, 4, 5, 6]
```

Example 1 begins with level `[1]` at depth zero and emits 1.
Depth one has nodes `[2, 3]`, whose values are emitted as 3, 2.
The next level is still built from nodes 2 then 3, producing `[4, 5, 6]`.
Depth two is even, so those values are emitted normally.
Combining the levels gives `[1, 3, 2, 4, 5, 6]`.

## Complexity

Every node contributes to one level and one output position, giving O(n) time.
Current and next levels plus temporary values use O(w) working space for maximum width w.
The returned flat list uses O(n) space.

## Edge cases

An empty tree returns an empty list.
A single-node level looks identical in either direction.
Missing children are skipped without placeholders.

## Common mistakes

Do not reverse the node level before generating children unless the traversal logic compensates for it.
Return one flat list rather than a list of level lists.

## Language notes

Python uses reversed for odd-level values.
Java reverses a temporary values list with Collections.reverse, while keeping the node-level list and child discovery order unchanged.
