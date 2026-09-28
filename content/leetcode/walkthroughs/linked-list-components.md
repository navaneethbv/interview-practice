## Intuition

A component is a maximal consecutive run whose values belong to nums.
The boolean `inside` records whether the previous node was selected, so a selected node starts a component only after an unselected node or the list head.

## Brute force

For every selected value, searching list neighbors would repeat membership and adjacency checks.
One scan handles both conditions directly.

## Approach

1. Put nums values in a set.
2. Walk the linked list once.
3. Increment when the current node is selected and the previous node was not.
4. Update `inside` and continue.

## Walkthrough

For Example 1, list values are `[0,1,2,3]` and selected values are `{0,1,3}`.
Nodes 0 and 1 form one run, node 2 breaks it, and node 3 starts a second run.
The count is 2.

## Complexity

For n list nodes and m selected values, expected time is O(n+m) and set space is O(m).
The traversal uses O(1) additional state beyond the set and does not copy the list.

## Edge cases

A selected head starts a component.
A selected tail ends one without special handling.
All selected nodes form one component even when nums lists them in another order.
An unselected node between two selected nodes forces a new component after the gap.

## Common mistakes

Count transitions into selected runs, not every selected node.
Use value membership rather than node identity.
Reset the previous-state flag on unselected nodes.

## Language notes

Python uses a set and `head.val` attribute access.
Java uses `HashSet<Integer>` and follows `next` references until null.
