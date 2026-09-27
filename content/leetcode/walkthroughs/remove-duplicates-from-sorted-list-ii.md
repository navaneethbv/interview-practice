## Intuition

A value should remain only when its run has length one.
Scan one run at a time and append a run's first node only when its next distinct node is immediately after it.

## Brute force

Counting every value separately and building a new list uses extra nodes.
The sorted links already place equal values together, so one pass can splice the original nodes.

## Approach

1. Use a dummy head and a tail for retained nodes.
2. Find the first node after the current equal-value run.
3. Link the current node only when no duplicate followed it.
4. Terminate the retained list with null.

## Walkthrough

Example 1:

For [1,2,2,3], the run 1 is unique and is retained.
The run 2 has two nodes and is skipped.
The run 3 is retained, producing [1,3].

## Complexity

Each node is visited while scanning its run, so time is O(n).
The dummy and tail use O(1) auxiliary space.
Both references reuse existing list nodes and do not allocate output nodes beyond the dummy.

## Edge cases

If every value is duplicated, the result is empty.
A one-node list is retained.
Duplicates at the head are handled by the dummy predecessor.

## Common mistakes

Do not retain the first node of a duplicate run.
Clear tail.next after the final retained node.
Use sorted order to justify run scanning.

## Language notes

Python and Java use the supplied ListNode class.
The Java code keeps pointer statements separate so links are easy to audit.
