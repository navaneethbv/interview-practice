## Intuition

A linked list cannot use random access efficiently, but it can be split with slow and fast pointers.
Merge sort recursively sorts the two halves, then relinks their nodes in ascending order.
The merge step reuses nodes, so no array conversion is necessary.

## Brute force

Copying all values into an array, sorting it, and writing values back takes O(n log n) time and O(n) extra space.
Repeatedly finding the minimum remaining node takes O(n²) time, while merge sort keeps the linked structure and logarithmic recursion depth.

## Approach

1. Return immediately for an empty or one-node list.
2. Use `slow` and `fast` to split the list into two shorter lists.
3. Recursively sort both halves as `left_sorted` and `right_sorted`.
4. Merge them with `_merge`, always linking the smaller current node to `tail`.
5. Attach the nonempty remainder and return after the dummy node.

## Walkthrough

Example 1 sorts `[4,2,1,3]`.

| recursive stage | lists being merged | result |
| --- | --- | --- |
| split | `[4,2]` and `[1,3]` | recurse on two equal halves |
| left merge | `[4]` and `[2]` | `[2,4]` |
| right merge | `[1]` and `[3]` | `[1,3]` |
| final merge | `[2,4]` and `[1,3]` | `[1,2,3,4]` |

Each row changes links rather than copying node values.

## Complexity

- Time: O(n log n), because merge sort makes log n levels and processes n nodes per level.
- Space: O(log n) auxiliary recursion stack, excluding the reused nodes and returned list.

## Edge cases

An empty list and a singleton are already sorted.
Duplicate values remain in a valid nondecreasing order.
Negative values compare normally.
The split sets `slow.next = None`, preventing the recursive halves from remaining connected.

## Common mistakes

- Forgetting to sever the split causes recursion to revisit the same nodes.
- Advancing `tail` before assigning its next node can lose the merged prefix.
- Claiming O(1) total space overlooks the recursive stack, which is O(log n).

## Language notes

Python uses a private `_merge` method and the judge-provided `ListNode` constructor.
Java uses a private `merge` helper and the same recursive stack bound.
Neither implementation allocates an array or replaces existing list nodes.
