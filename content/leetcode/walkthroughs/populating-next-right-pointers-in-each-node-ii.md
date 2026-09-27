## Intuition

The next pointers already completed for one level can serve as its traversal chain.
Walking that chain from left to right exposes the next level's children in the correct order.
A temporary dummy node and tail pointer assemble those children without a breadth-first queue.
The tree may omit either child at any position, so only existing children are appended.

## Brute force

A queue-based breadth-first traversal can collect every level and link its nodes consecutively.
It takes O(n) time but can retain O(n) queued nodes in a wide tree.
Reusing the required next links keeps the same linear time with constant live auxiliary storage.

## Approach

1. Return immediately for a null root; otherwise clear `root.next` to initialize a one-node first level.
2. Set `level_start` (Java: `levelStart`) to the root.
3. The per-level helper creates a dummy node and points `tail` at it.
4. Walk `current` along the current level, appending each existing left child and then right child after `tail`.
5. Terminate the completed child chain with null and return `dummy.next`.
6. Repeat from that returned level start until no children remain.

The dummy is never included in the returned tree; it only avoids special handling for the first child.

## Walkthrough

Example 1 is `[1,2,3,4,null,null,7]`.
While processing node 1, the helper appends 2 then 3, establishing `2 -> 3 -> null`.
On the next level, node 2 contributes child 4 and node 3 contributes child 7.
The missing children are skipped, so the next chain is `4 -> 7 -> null`.
Neither leaf has children, and the following level start becomes null.
The completed chains are `[[1],[2,3],[4,7]]`.

## Complexity

- Time: O(n), since every original node is visited once and its two child fields are checked once.
- Space: O(1) live auxiliary storage, including the temporary dummy and a constant number of pointers.

A new dummy is allocated for each level, but previous dummies are not retained, so cumulative allocations do not increase the live-space bound.
The mutated next links belong to the required output tree.

## Edge cases

A null root returns null.
A single root ends with a null next pointer.
A level containing one child still produces a valid one-node chain.
Clearing the root's next pointer and terminating every generated level prevents stale next links from joining unrelated levels.

## Common mistakes

- Appending right before left reverses siblings in the next chain.
- Advancing `current` through child pointers loses the current level's order.
- Returning the dummy itself inserts an extra node into the output.
- Omitting the final null link can leave an invalid chain.

## Language notes

Python examines the two child references in a small tuple; Java uses separate child checks.
Both construct the temporary dummy with the harness-provided `Node` class.
The method mutates and returns the original root rather than copying its nodes.
