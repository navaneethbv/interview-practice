## Intuition

Imagine a complete binary tree and assign each node the position its children would occupy.
The width of a level is the last position minus the first position plus one, including gaps.
Normalize positions by the first position at every level so the stored indices stay small while preserving that width.

## Brute force

Building a complete-array representation and scanning each level uses O(2^h) space for height h, even when most positions are missing.
Recording only real nodes with their conceptual positions keeps work proportional to the actual tree nodes.

## Approach

1. Start `pending` with `(root, 0)`.
2. For each level, subtract its first `offset` from every position.
3. Track `last_index` and compute `last_index + 1` as the normalized width.
4. Enqueue children at `normalized_index * 2` and `normalized_index * 2 + 1`.
5. Keep the largest width and return it.

## Walkthrough

Example 1 uses `[1,3,2,5,3,null,9]`.

| level | normalized positions | width |
| ---: | --- | ---: |
| 0 | root at `[0]` | 1 |
| 1 | nodes 3 and 2 at `[0,1]` | 2 |
| 2 | nodes 5, 3, and 9 at `[0,1,3]` | 4 |

The gap at position 2 counts, so the answer is 4 rather than the three real nodes.

## Complexity

- Time: O(n), because every real node is processed once.
- Space: O(n), for the level lists or queue and their normalized position values.

## Edge cases

A single node has width one.
A one-sided chain has width one at every level after normalization.
Missing children create gaps without entering the queue.
Java uses `long` positions so multiplication cannot overflow before normalization.

## Common mistakes

- Counting only real nodes ignores gaps inside a level.
- Carrying unnormalized indices through a deep tree can overflow fixed-width integers.
- Resetting positions to consecutive numbers destroys the complete-tree geometry.

## Language notes

Python integers grow as needed and uses a deque of node-position pairs.
Java stores positions as `long` and normalizes them before generating children.
Both references include output width but use only actual nodes in their working lists.
