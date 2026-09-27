## Intuition

Breadth-first search already visits a tree one level at a time.
Keep each level in its natural left-to-right order, then reverse only the levels whose depth is odd.
The queue still stores children in ordinary left-to-right order, so the traversal structure stays simple.

## Brute force

Collecting every node with a depth label and sorting by depth and position takes O(n log n) time and O(n) storage.
A recursive traversal that builds separate lists by depth is correct in O(n) time, but the queue-based level boundary gives the same result directly.

## Approach

1. Return an empty list when `root` is missing.
2. Store `root` in `pending` and process exactly its current size for each level.
3. Append each node value to `level_values` and enqueue its children.
4. Reverse `level_values` when the number of completed `levels` is odd.
5. Append the level and continue until `pending` is empty.

## Walkthrough

Example 1 uses `root = [3, 9, 20, null, null, 15, 7]`.

| level | queue before processing | natural values | returned values |
| ---: | --- | --- | --- |
| 0 | `[3]` | `[3]` | `[3]` |
| 1 | `[9, 20]` | `[9, 20]` | `[20, 9]` |
| 2 | `[15, 7]` | `[15, 7]` | `[15, 7]` |

The output is `[[3], [20, 9], [15, 7]]`.

## Complexity

- Time: O(n), because each node enters and leaves the queue once and each level is reversed once.
- Space: O(n), for the queue and returned level lists, with the queue itself bounded by the widest level.

## Edge cases

An empty tree returns `[]`.
A one-node tree creates one level without reversal.
Missing children simply do not enter the queue.
Negative and duplicate node values are treated like any other values.

## Common mistakes

- Reversing the queue instead of the finished level changes future traversal order.
- Processing until the queue is empty inside one level combines several depths.
- Reversing every level produces the wrong direction on even depths.

## Language notes

Python uses `collections.deque` for O(1) left removal.
Java uses `ArrayDeque<TreeNode>` and reverses each odd level with `Collections.reverse`.
Both references store complete level output, so output storage is included in the space bound.
