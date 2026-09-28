## Intuition

Equal prefix sums identify a consecutive segment whose values sum to zero.
The last occurrence of each prefix sum lets the second pass skip every node in that zero-sum segment, including segments exposed by earlier removals.

## Brute force

Repeatedly checking every start and end pair for a zero sum costs `O(n^2)` per possible round and makes pointer updates difficult.
Two prefix-sum passes remove all resolvable segments in linear time.

## Approach

1. Add a zero-valued `dummy` before `head`.
2. In the first pass, record the last node reached for each `prefix_sum`.
3. In the second pass, recompute each prefix sum and set `node.next` to the successor of the last node with that sum.
4. Return `dummy.next` after all zero-sum ranges have been bypassed.

## Walkthrough

For Example 1, the list is `[1, 2, -3, 3, 1]`.
The prefix sums from the dummy are `0, 1, 3, 0, 3, 4`.
The repeated sum 0 at the node containing `-3` means the segment `[1, 2, -3]` sums to zero.
In the second pass, the dummy's next pointer jumps to node 3, leaving `[3, 1]`.

## Complexity

Both passes visit at most `n + 1` nodes, so time is `O(n)`.
The last-prefix map uses `O(n)` extra space, and nodes are relinked in place.

## Edge cases

If the whole list sums to zero, the dummy bypasses every node and returns null.
Zero-valued nodes and adjacent zero-sum segments are handled by repeated prefix sums.

## Common mistakes

- Recording the first prefix occurrence cannot skip the longest required segment.
- Mutating links during the first pass changes which prefix nodes should be recorded.
- Forgetting the dummy misses a zero-sum prefix that begins at the head.

## Language notes

Python uses the supplied `ListNode` constructor, while Java uses the harness-provided `ListNode` with field `val`.
Neither reference allocates replacement data nodes, so the returned list preserves the original node links that remain.
