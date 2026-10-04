## Intuition

A binary heap stores a complete tree in an array, with each parent outranking its children.
Only one root-to-leaf path can violate that invariant after inserting or removing a value.

## Brute force

Keeping the entire collection sorted makes insertion linear.
Building a heap by repeated insertion takes O(n log n), while bottom-up heapification meets the required linear construction time.

## Approach

Copy initial values and sift down every internal node in reverse order.
`_before` defines higher priority according to min or max mode.
Push appends a value and swaps it upward while it outranks its parent.
Pop saves the root, moves the final element to the root, and sifts it down by choosing the better child.
Top and size read stored state without restructuring.
Already-heapified child subtrees make each bottom-up construction step valid.

## Walkthrough

```text
Input: ctor = ["min", []], ops = ["push", "push", "push", "pop", "top", "size"], args = [[4], [8], [2], [], [], []]
Output: [null, null, null, 2, 4, 2]
```

Example 1 builds a min heap from empty input.
Pushing 4 then 8 leaves 4 at the root.
Pushing 2 swaps it above 4, making 2 the highest-priority value.
Pop returns 2 and restores heap order among 4 and 8.
Top then returns 4 and size returns 2.

## Complexity

Construction is O(n), since most nodes have very small subtree height.
Push and pop perform O(log n) heap work; array growth makes push amortized O(log n), with an occasional O(n) resize.
Top and size are O(1).
Storage is linear in allocated capacity.

## Edge cases

Empty top and pop return -1.
Duplicate values remain separate heap elements.
Removing the final value leaves an empty heap without a valid root to inspect.

## Common mistakes

During sift-down, choose the best child rather than the first child violating order.
Use `(index - 1) / 2` for the parent.

## Language notes

Python uses a list; Java explicitly doubles its backing array.
Java retains capacity after removals, so allocated space reflects peak size.
