## Intuition

The desired order alternates nodes from the beginning and end of the original list.
Splitting the list in half and reversing the second half turns both required directions into forward traversals.
We can then weave the halves together without storing all nodes in an array.

## Brute force

Store the nodes in an array and select alternating indices from its front and back.
This takes O(n) time but O(n) extra space.
Repeatedly walking to the tail avoids that array but can take O(n²) time.

## Approach

1. Use slow and fast pointers to find the end of the first half.
2. Reverse the list beginning at `slow.next` with the usual `previous`, `current`, and `following` pointers.
3. Set `slow.next` to null to separate the halves.
4. Start `first` at the original head and `second` at the reversed-half head.
5. Save both next pointers, link `first` to `second` and `second` to the saved first successor, then advance both streams.
6. Stop when the second half is exhausted.

The first half is at least as long as the second, so the merge always has a first-half partner available.
For odd lengths, the middle node remains last.

## Walkthrough

Example 1 starts with `1 -> 2 -> 3 -> 4`.

| Stage | List structure |
| --- | --- |
| Find midpoint | `slow` is node 2 |
| Split and reverse | First half `1 -> 2`; second half `4 -> 3` |
| First weave | `1 -> 4 -> 2`; remaining second node 3 |
| Second weave | `1 -> 4 -> 2 -> 3` |

The method returns nothing; the judge reads the rewired list from the original node 1.

## Complexity

- Time: O(n), for midpoint discovery, reversal, and weaving.
- Space: O(1), with a fixed number of node references.

## Edge cases

A singleton has an empty second half and stays unchanged.
Two nodes are already in the desired order.
Odd lengths leave the first half with one extra node.
Repeated values are handled by node positions rather than value comparisons.

## Common mistakes

- Forgetting to separate the halves can leave a cycle.
- Replacing values instead of links violates the in-place node-reordering requirement.
- Overwriting next pointers before saving them loses unmerged nodes.

## Language notes

Both implementations extract iterative reversal into a helper.
Java saves `nextFirst` and `nextSecond`; Python uses `next_first` and `next_second` for the same dependencies.
Neither version uses recursion, which matters for the allowed 50,000-node lists.
